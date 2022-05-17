const express = require("express");

const req = require("express/lib/request");
const app = express();
const { getArticles } = require("./controllers/articles.controllers");
const { getTopics } = require("./controllers/topics.controllers");


app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticles);

app.use((err, req, res, next) => {

  // console.log(err);
  if (err.status === 404) {
    res.status(404).send(err);
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res
      .status(400)
      .send({ status: 400, msg: "bad request - invalid input type" });
  } else res.status(500).send({ status: 500, msg: "internal server error" });
}); 


module.exports = app;
