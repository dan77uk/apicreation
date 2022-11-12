const { selectTreasures } = require("../models/selectTreasures");
const { insertTreasure } = require("../models/insertTreasure");
const { updateTreasure } = require("../models/updateTreasure");

exports.getTreasures = (req, res, next) => {
  const { sort_by, order, colour } = req.query;
  selectTreasures(sort_by, order, colour)
    .then((result) => {
      res.status(200).send({ treasures: result });
    })
    .catch(next);
};

exports.postTreasure = (req, res, next) => {
  const body = req.body;
  insertTreasure(body)
    .then((insertedTreasure) => {
      res.status(201).send({ treasure: insertedTreasure });
    })
    .catch(next);
};

exports.patchTreasure = (req, res, next) => {
  const { treasure_id } = req.params;
  updateTreasure(treasure_id, req.body)
    .then((updatedTreasure) => {
      res.status(201).send({ treasure: updatedTreasure });
    })
    .catch(next);
};
