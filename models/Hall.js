const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/halls.json');

// get halls
function getAllHalls() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

// Save
function saveHalls(halls) {
  fs.writeFileSync(filePath, JSON.stringify(halls, null, 2));
}


// booking a hall
function addBookingToHall(hallName, booking) {
  const halls = getAllHalls();
  const hall = halls.find(h => h.name === hallName);
  if (!hall) throw new Error('Hall not found');

  hall.bookings.push(booking);
  saveHalls(halls);
  return hall;
}

// available halls for timeslot
function getAvailableHalls(date, startTime, endTime) {
  const halls = getAllHalls();
  return halls.filter(hall => {
    return !hall.bookings.some(b =>
      b.date === date &&
      !(endTime <= b.startTime || startTime >= b.endTime)
    );
  });
}

module.exports = {
  getAllHalls,
  createHall,
  updateHall,
  addBookingToHall,
  getAvailableHalls
};
