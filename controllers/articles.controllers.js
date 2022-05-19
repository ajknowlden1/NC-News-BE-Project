const {
  selectArticleById,
  updateArticleVotes,
} = require("../models/articles.models");

const getArticles = (req, res, next) => {
  const id = req.params.article_id;

  if (req.method === "GET") {
    selectArticleById(id)
      .then((result, err) => {
        const resArt = result.find((article) => article.article_id == id);
        if (!resArt) res.status(404).send({ status: 404, msg: "not found" });
        else res.status(200).send({ article: resArt });
      })
      .catch((err) => next(err));
  }

  if (req.method === "PATCH") {
    const increment = req.body.inc_vote;

    updateArticleVotes(id, increment)
      .then((result, err) => {
        res.status(201).send({ updated_article: result });
      })
      .catch((err) => next(err));
  }
};

module.exports = { getArticles };
