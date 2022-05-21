const fs = require("fs/promises");

const getAllEndpoints = (req, res, next) => {
  fs.readFile("endpoints.json", "utf8").then((data) => {
    const endpoints = JSON.parse(data);

    res.status(200).send({ endpoints: endpoints });
  });
};
module.exports = { getAllEndpoints };
