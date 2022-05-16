const express = require("express");
const app = express();
const getTopics = require("./controllers/nc-news-controller");
app.use(express.json());

app.get("/api/topics", getTopics);

app.listen(6500, console.log("server listening on port 6500..."));

module.exports = app;
