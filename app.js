const express = require("express");
const app = express();
const cors = require("cors");
const {
  getArticle,
  patchArticle,
  getAllArticles,
  getArticleComments,
  postNewComment,
  deleteComment,
} = require("./controllers/articles.controllers");
const { getTopics } = require("./controllers/topics.controllers");
const { getAllEndpoints } = require("./controllers/api.controllers");
const { getUsers } = require("./controllers/users.controllers");

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

app.get("/api", getAllEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id", getArticle);

app.get("/api/articles/:article_id/comments", getArticleComments);

app.get("/api/users", getUsers);

app.patch("/api/articles/:article_id", patchArticle);

app.post("/api/articles/:article_id/comments", postNewComment);

app.delete("/api/comments/:comment_id", deleteComment);

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ status: 400, msg: "bad request - invalid id" });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "23502") {
    res
      .status(400)
      .send({ status: 400, msg: "bad request - invalid request body" });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ status: 404, msg: "not found" });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 400) res.send(err);
  else next(err);
});

app.use((err, req, res, next) => {
  res.status(404).send({ status: 404, msg: "not found" });
});

module.exports = app;
