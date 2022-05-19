const {
  selectArticleById,
  updateArticleVotes,
  selectAllArticles,
} = require("../models/articles.models");


const getArticle = (req, res, next) => {

  const id = req.params.article_id;
  selectArticleById(id)
    .then((result, err) => {
      const resArt = result.find((article) => article.article_id == id);
      if (!resArt) res.status(404).send({ status: 404, msg: "not found" });
      else res.status(200).send({ article: resArt });
    })
    .catch((err) => next(err));
};

const patchArticle = (req, res, next) => {
  const increment = req.body.inc_vote;
  const id = req.params.article_id;

  updateArticleVotes(id, increment)
    .then((result, err) => {
      res.status(201).send({ updated_article: result });
    })
    .catch((err) => next(err));
};

const getAllArticles = (req, res, next) => {
  selectAllArticles()
    .then((result, err) => {
      res.status(200).send({ articles: result });
    })
    .catch((err) => next(err));
};
module.exports = { getArticle, patchArticle, getAllArticles };
