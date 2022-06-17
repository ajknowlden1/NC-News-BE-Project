const res = require("express/lib/response");
const { selectUsers, insertUser } = require("../models/users.models");

const getUsers = (req, res, next) => {
  selectUsers()
    .then((response) => {
      res.status(200).send({ users: response });
    })
    .catch((err) => next(err));
};

const addUser = (req, res, next) => {
  const { username, name } = req.body;

  insertUser(username, name)
    .then((response) => {
      res.status(201).send({ user: response });
    })
    .catch((err) => next(err));
};

module.exports = { getUsers, addUser };
