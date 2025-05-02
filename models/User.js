const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/users.json');

function getAllUsers() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function saveUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

function registerUser(userData) {
  const users = getAllUsers();

  const exists = users.find(
    u => u.username === userData.username || u.email === userData.email
  );
  if (exists) throw new Error('User already exists.');

  const newUser = {
    id: Date.now().toString(),
    username: userData.username,
    password: userData.password,
    email: userData.email,
    role: userData.role,
    department: userData.department || null
  };

  users.push(newUser);
  saveUsers(users);
  return newUser;
}

function loginUser({ username, password }) {
  const users = getAllUsers();
  return users.find(u => u.username === username && u.password === password);
}

function findUserById(id) {
  return getAllUsers().find(u => u.id === id);
}

function findUserByEmail(email) {
  return getAllUsers().find(u => u.email === email);
}

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  findUserById,
  findUserByEmail
};
