const { selectTopics } = require("../models/topics.models");

const getTopics = (req, res, next) => {
  selectTopics().then((result, err) => {
    if (err) next(err);
    else res.status(200).send({ topics: result });
  });
};

module.exports = { getTopics };
