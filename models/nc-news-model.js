const db = require("../db/connection");
const selectTopics = () => {
  return db.query(`SELECT * FROM topics`).then((result) => result.rows);
};

const selectArticleById = (id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [id])
    .then((result) => result.rows[0]);
};

module.exports = { selectTopics, selectArticleById };
