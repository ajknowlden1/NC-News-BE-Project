const express = require("express");
const app = express();
const { getTopics, getArticles } = require("./controllers/nc-news-controller");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticles);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).send("bad request!");
});

app.listen(5000, console.log("server listening on port 5000..."));

module.exports = app;
