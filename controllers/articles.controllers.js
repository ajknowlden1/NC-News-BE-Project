const {
  selectArticleById,
  updateArticleVotes,
} = require("../models/articles.models");

const getArticles = (req, res, next) => {
  const id = req.params.article_id;

  if (req.method === "GET") {
    selectArticleById(id)
      .then((result, err) => {
        res.status(200).send({ article: result });
      })
      .catch((err) => next(err));
  } else if (req.method === "PATCH") {
    const increment = req.body.inc_vote;

    updateArticleVotes(id, increment)
      .then((result, err) => {
        res.status(201).send({ updated_article: result });
      })
      .catch((err) => next(err));
  }
};

module.exports = { getArticles };
