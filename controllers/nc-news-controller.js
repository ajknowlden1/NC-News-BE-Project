const selectTopics = require("../models/nc-news-model");

const getTopics = (req, res) => {
  console.log(req);
  selectTopics().then((result) => {
    res.status(200).send(result);
  });
};

module.exports = getTopics;
