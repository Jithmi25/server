exports.isTimeOverlap = (slot1, slot2) => {
    const start1 = new Date(`${slot1.date}T${slot1.startTime}`);
    const end1 = new Date(`${slot1.date}T${slot1.endTime}`);
    const start2 = new Date(`${slot2.date}T${slot2.startTime}`);
    const end2 = new Date(`${slot2.date}T${slot2.endTime}`);
  
    return start1 < end2 && start2 < end1;
  };
  
  exports.formatTime = (date) => {
    return date.toISOString().split('T')[1].slice(0, 5);
  };
  
  exports.getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };
  