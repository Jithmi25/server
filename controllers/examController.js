const Exam = require('../models/Exam');
const Hall = require('../models/Hall');

// Create a new exam session
exports.createExamSession = async (req, res) => {
  try {
    const exam = await Exam.create(req.body);
    res.status(201).json({
      message: 'Exam session created successfully.',
      exam
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create exam.', error: error.message });
  }
};

// Get all exam sessions
exports.getAllExamSessions = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch exams.', error: error.message });
  }
};

exports.getExamsByDepartment = async (req, res) => {
    try {
    
      const department = req.user.department;
  
      const exams = await Exam.find({ 'subjects.department': department });
  
      if (exams.length === 0) {
        return res.status(200).json({ exams: [], message: `No exams found for department: ${department}` });
      }
  
      const examData = [];
  
      exams.forEach(exam => {
        exam.subjects.forEach(subject => {
          if (subject.department === department) {
            examData.push({
              date: exam.date,
              startTime: exam.startTime,
              endTime: exam.endTime,
              subject: subject.name,
              code: subject.code,
              degreeProgram: subject.department,
              totalCount: subject.studentCount + subject.repeaters
            });
          }
        });
      });
  
      res.status(200).json({ exams: examData });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch exams.', error: error.message });
    }
  };
  
  exports.getAvailableHallsAsButtons = async (req, res) => {
    try {
      const { date, startTime, endTime, requiredCount } = req.query;
  
      const halls = await Hall.find();
  
      const availableHalls = halls.filter(hall => {
        const hasConflict = hall.bookings?.some(booking =>
          booking.date === date &&
          !(endTime <= booking.startTime || startTime >= booking.endTime)
        );
        return !hasConflict && hall.capacity >= parseInt(requiredCount);
      });
  
      if (availableHalls.length === 0) {
        return res.status(200).json({ halls: [], message: 'No halls available for the selected time and student count.' });
      }
  
      res.status(200).json({ halls: availableHalls });
    } catch (error) {
      res.status(500).json({ message: 'Failed to load available halls.', error: error.message });
    }
  };
  

// Assign a hall to an exam and update hall capacity
exports.assignHallToExam = async (req, res) => {
    try {
      const { hallId, examId, date, startTime, endTime, requiredCount } = req.body;
  
      const hall = await Hall.findById(hallId);
      if (!hall || hall.capacity < requiredCount) {
        return res.status(400).json({ message: 'Invalid hall or insufficient capacity.' });
      }
  
      // Add booking to hall
      hall.bookings.push({ date, startTime, endTime });
      hall.capacity -= requiredCount;
      await hall.save();
  
    //   //  Link hall to exam 
    //   const exam = await Exam.findById(examId);
    //   if (exam) {
    //     exam.assignedHall = hall.name; // or hall._id
    //     await exam.save();
    //   }
  
      res.status(200).json({ message: 'Hall assigned and capacity updated successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to assign hall.', error: error.message });
    }
  };
    