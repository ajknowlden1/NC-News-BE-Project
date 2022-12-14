const db = require("../db/connection");

const selectUsers = () => {
  return db.query(`SELECT username FROM users;`).then((result) => result.rows);
};

const insertUser = (username, name) => {
  return db
    .query(`INSERT INTO users (username, name) VALUES ($1, $2) RETURNING *`, [
      username,
      name,
    ])
    .then((result) => {
      return result.rows[0];
    });
};

module.exports = { selectUsers, insertUser };
