const res = require("express/lib/response");
const { selectUsers } = require("../models/users.models");

const getUsers = (req, res, next) => {
  selectUsers()
    .then((response) => {
      res.status(200).send({ users: response });
    })
    .catch((err) => next(err));
};

module.exports = { getUsers };
