const { selectTopics, selectArticleById } = require("../models/nc-news-model");

const getTopics = (req, res, next) => {
  selectTopics().then((result, err) => {
    if (err) next(err);
    else res.status(200).send({ topics: result });
  });
};

const getArticles = (req, res, next) => {
  const id = req.params.article_id;
  selectArticleById(id).then((result, err) => {
    if (result === undefined) {
      next();
    } else res.status(200).send({ article: result });
  });
};

module.exports = { getTopics, getArticles };
