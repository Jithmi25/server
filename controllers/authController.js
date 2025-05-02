const User = require('../models/User');
const Exam = require('../models/Exam');
const AssignmentRequest = require('../models/AssignmentRequest');
const { sendEmail, sendPasswordResetEmail, sendNewPasswordEmail } = require('../utils/email');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Secure password reset flow
exports.forgotPassword = async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = await User.findOne({ username, email });
    if (!user) {
      return res.status(404).json({ message: 'User not found or email mismatch' });
    }

    // Generate reset token 
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000;

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Send email with reset link
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3009'}/reset-password?token=${resetToken}`;
    await sendPasswordResetEmail(email, username, resetLink);

    res.status(200).json({ message: 'Password reset link has been sent to your email' });
  } catch (error) {
    console.error('ForgotPassword error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Update password 
    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    
    await sendNewPasswordEmail(user.email, user.username);

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('ResetPassword error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Register User
exports.registerUser = async (req, res) => {
  const { username, password, role, email, department } = req.body;
  
  try {
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const newUser = await User.create({ username, password, role, email, department });
    res.status(201).json({ message: 'User registered', user: newUser });
  } catch (error) {
    console.error('RegisterUser error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, department: user.department }, 
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.json({ token, role: user.role, username: user.username });
  } catch (error) {
    console.error('LoginUser error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get Logged-In User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    console.error('GetUserProfile error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Student: View exam schedule for department
exports.getStudentTimetable = async (req, res) => {
  try {
    const department = req.user.department;

    const exams = await Exam.find({ 'subjects.department': department, status: { $ne: 'Finished' } })
      .select('date startTime endTime subjects');

    const studentView = exams.flatMap(exam => 
      exam.subjects
        .filter(subject => subject.department === department)
        .map(subject => ({
          date: exam.date,
          time: `${exam.startTime} - ${exam.endTime}`,
          subject: subject.name,
          code: subject.code,
          totalStudents: subject.studentCount + subject.repeaters,
          hall: subject.assignedHall || 'TBD'
        }))
    );

    res.status(200).json({
      success: true,
      data: studentView
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch timetable',
      error: error.message
    });
  }
};


// Lecturer: Get assigned supervision notifications
exports.getLecturerNotifications = async (req, res) => {
    try {
      const lecturerId = req.user.id;
  
      // Only get notifications where admin has assigned the lecturer (status === 'Assigned')
      const requests = await AssignmentRequest.find({
        requestedLecturer: lecturerId,
        status: 'Assigned'
      }).populate('examId');
  
      const notifications = requests.map(r => ({
        subject: r.subjectCode,
        date: r.timeSlot.date,
        time: `${r.timeSlot.startTime} - ${r.timeSlot.endTime}`,
        venue: r.timeSlot.venue || 'TBD',
        message: `You have been assigned to supervise ${r.subjectCode} on ${r.timeSlot.date}`
      }));
  
      res.json(notifications);
    } catch (error) {
      console.error('GetLecturerNotifications error:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
  

// Admin: Get detailed exam assignment report
exports.getExamAssignmentReport = async (req, res) => {
    try {
      const exams = await Exam.find();
  
      const report = exams.flatMap(exam =>
        exam.subjects.map(subject => ({
          date: exam.date,
          time: `${exam.startTime} - ${exam.endTime}`,
          subject: subject.name,
          degree: subject.department,
          venue: subject.assignedHall || 'TBD',
          supervisor: subject.supervisor || 'TBD',
          invigilators: subject.invigilators?.join(', ') || 'TBD',
          hallAttendant: subject.hallAttendant || 'TBD'
        }))
      );
  
      res.status(200).json({ success: true, data: report });
    } catch (error) {
      console.error('GetExamAssignmentReport error:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
  