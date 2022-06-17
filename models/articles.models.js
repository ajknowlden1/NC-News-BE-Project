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

const insertArticle = (author, title, body, topic) => {
  return db
    .query(
      `INSERT INTO articles (author, title, body, topic) VALUES ($1, $2, $3, $4) RETURNING *`,
      [author, title, body, topic]
    )
    .then((result) => {
      return result.rows[0];
    });
};

const selectAndDeleteArticle = (id) => {
  return db
    .query(`DELETE FROM articles WHERE article_id = $1`, [id])
    .then(() => {
      return;
    });
};

const selectAllArticles = (query) => {
  let queryStr = `SELECT articles.*, CAST((COUNT(comments.article_id))AS INT) AS comment_count from articles LEFT JOIN comments ON articles.article_id = comments.article_id`;
  const validSorts = ["votes", "comment_count", "created_at"];

  let sort_by =
    typeof query.sort_by !== "undefined" ? query.sort_by : "created_at";
  let order = typeof query.order !== "undefined" ? query.order : "desc";
  let topic = typeof query.topic !== "undefined" ? query.topic : null;

  if (!validSorts.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "bad sort request" });
  }
  if (!["asc", "desc"].includes(order)) {
    return Promise.reject({ status: 400, msg: "bad order request" });
  }
  if (topic !== null) {
    queryStr += ` WHERE topic = '${topic}' GROUP BY articles.article_id ORDER BY ${sort_by} ${order}`;
  } else
    queryStr += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order}`;

  return db
    .query(queryStr)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => console.log(err));
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
            `SELECT comment_id, body, author, votes, created_at FROM comments WHERE comments.article_id = $1 ORDER BY created_at DESC`,
            [id]
          )
          .then((result) => {
            return result.rows;
          });
    });
};

const insertComment = (id, username, body) => {
  return db
    .query(
      `INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3 ) RETURNING *`,
      [body, username, id]
    )
    .then((result) => {
      return result.rows;
    });
};

const selectAndDeleteComment = (id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [id])
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({ status: 404, msg: "not found" });
      } else return result.rows;
    })
    .catch((err) => next(err));
};

module.exports = {
  selectArticleById,
  updateArticleVotes,
  selectAllArticles,
  selectArticleComments,
  insertComment,
  selectAndDeleteComment,
  insertArticle,
  selectAndDeleteArticle,
};
