exports.createExamAssignmentMessage = (lecturerName, subjectCode, date, startTime) => {
    return `Dear ${lecturerName}, you have been assigned to invigilate the exam for ${subjectCode} on ${date} at ${startTime}. Please check your schedule for full details.`;
  };
  
  exports.overrideNotification = (adminName, target, details) => {
    return `${adminName} performed an override on ${target}. Details: ${details}`;
  };
  