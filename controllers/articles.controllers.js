const { commentData, articleData } = require("../db/data/test-data");
const { checkIDExists } = require("../db/helpers/utils");
const {
  selectArticleById,
  updateArticleVotes,
  selectAllArticles,
  selectArticleComments,
  insertComment,
  selectAndDeleteComment,
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
  const { query } = req;
  selectAllArticles(query)
    .then((result, err) => {
      res.status(200).send({ articles: result });
    })
    .catch((err) => next(err));
};

const getArticleComments = (req, res, next) => {
  const id = req.params.article_id;

  selectArticleComments(id)
    .then((result) => {
      if (!result.length) {
        res.status(200).send({ comments: [] });
      } else res.status(200).send({ comments: result });
    })
    .catch((err) => next(err));
};

const postNewComment = (req, res, next) => {
  const id = req.params.article_id;
  const { username, body } = req.body;
  insertComment(id, username, body)
    .then((response) => {
      res.status(201).send({ comment_posted: body });
    })
    .catch((err) => next(err));
};

const deleteComment = (req, res, next) => {
  const id = req.params.comment_id;
  if (!Number.parseInt(id)) {
    res.status(400).send({ status: 400, msg: "bad request - invalid id" });
  } else
    selectAndDeleteComment(id)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => next(err));
};
module.exports = {
  getArticle,
  patchArticle,
  getAllArticles,
  getArticleComments,
  postNewComment,
  deleteComment,
};
