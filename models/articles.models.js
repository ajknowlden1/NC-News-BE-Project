const { rows } = require("pg/lib/defaults");
const db = require("../db/connection");

const selectArticleById = (id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [id])
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      return result.rows;
    });
};

module.exports = { selectArticleById };
