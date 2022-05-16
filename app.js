const express = require("express");
const app = express();
const getTopics = require("./controllers/nc-news-controller");
app.use(express.json());

app.get("/api/topics", getTopics);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).send("bad request!");
});

app.listen(6500, console.log("server listening on port 6500..."));

module.exports = app;
