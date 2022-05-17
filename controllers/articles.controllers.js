const { selectArticleById } = require("../models/articles.models");

const getArticles = (req, res, next) => {
  const id = req.params.article_id;

  selectArticleById(id)
    .then((result, err) => {
      res.status(200).send({ article: result });
    })
    .catch((err) => next(err));
};

module.exports = { getArticles };
