const res = require("express/lib/response");
const fs = require("fs/promises");

const getAllEndpoints = (req, res, next) => {
  fs.readFile("endpoints.json", "utf8").then((data) => {
    const endpoints = JSON.parse(data);

    res.status(200).send({ endpoints: endpoints });
  });
};

const sayHello = () => {
  res.status(200).send({
    msg: "welcome to the nc-news API! visit /api to see a list of endpoints",
  });
};
module.exports = { getAllEndpoints, sayHello };
