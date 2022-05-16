const { selectTopics, selectArticleById } = require("../models/nc-news-model");

const getTopics = (req, res, next) => {
  selectTopics().then((result, err) => {
    if (err) next(err);
    else res.status(200).send({ topics: result });
  });
};

const getArticles = (req, res, next) => {
  if (req.params.hasOwnProperty("article_id")) {
    const id = req.params.article_id;
    selectArticleById(id).then((result) => {
      res.status(200).send({ article: result });
    });
  }
};

module.exports = { getTopics, getArticles };
