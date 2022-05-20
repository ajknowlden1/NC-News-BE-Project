const res = require("express/lib/response");
const db = require("../db/connection");
const { commentData, articleData } = require("../db/data/test-data");

const selectArticleById = (id) => {
  return db
    .query(
      `SELECT articles.*, CAST ((COUNT(comments.article_id = $1))AS INT) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY  articles.article_id`,

      [id]
    )
    .then((result) => {
      let allArticles = result.rows;

      if (allArticles.length === 0)
        return Promise.reject({ status: 404, msg: "not found" });
      else {
      }

      return allArticles;
    });
};

const updateArticleVotes = (id, increment) => {
  return db
    .query(
      `UPDATE articles SET votes = votes + $2 WHERE article_id = $1 RETURNING *`,
      [id, increment]
    )
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      return result.rows[0];
    });
};

const selectAllArticles = () => {
  return db
    .query(
      `SELECT articles.*, CAST (((COUNT(comments.article_id)))AS INT) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY created_at DESC `
    )
    .then((result) => {
      return result.rows;
    });
};

const selectArticleComments = (id) => {
  return db
    .query(`SELECT * from articles WHERE article_id = $1`, [id])
    .then((result) => {
      if (!result.rows.length)
        return Promise.reject({ status: 404, msg: "not found" });
      else
        return db
          .query(
            `SELECT comment_id, body, author, votes, created_at FROM comments WHERE EXISTS (SELECT * FROM comments WHERE article_id = $1)`,
            [id]
          )
          .then((result) => {
            return result.rows;
          });
    });
};
module.exports = {
  selectArticleById,
  updateArticleVotes,
  selectAllArticles,
  selectArticleComments,
};
