const selectTopics = require("../models/nc-news-model");

const getTopics = (req, res, next) => {
  selectTopics().then((result, err) => {
    if (err) next(err);
    else res.status(200).send(result);
  });
};

module.exports = getTopics;
