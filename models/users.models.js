const { getUsers } = require("../controllers/users.controllers");
const db = require("../db/connection");

const selectUsers = () => {
  return db.query(`SELECT username FROM users;`).then((result) => result.rows);
};

module.exports = { selectUsers };
