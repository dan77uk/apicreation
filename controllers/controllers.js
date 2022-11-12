const { selectTreasures } = require("../models/models");

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
