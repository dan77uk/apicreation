const { selectTreasures } = require("../models/selectTreasures");
const { insertTreasure } = require("../models/insertTreasure");

exports.getTreasures = (req, res, next) => {
  const { sort_by, order, colour } = req.query;
  selectTreasures(sort_by, order, colour)
    .then((result) => {
      res.status(200).send({ treasures: result });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postTreasure = (req, res, next) => {
  const body = req.body;
  insertTreasure(body)
    .then((insertedTreasure) => {
      res.status(201).send({ treasure: insertedTreasure });
    })
    .catch(next);
};
