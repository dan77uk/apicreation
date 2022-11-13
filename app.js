const express = require("express");
const app = express();
const {
  getTreasures,
  postTreasure,
  patchTreasure,
  deleteTreasure,
  getShops,
} = require("./controllers/controllers");
app.use(express.json());

app.get("/api/treasures", getTreasures);
app.post("/api/treasures", postTreasure);
app.patch("/api/treasures/:treasure_id", patchTreasure);
app.delete("/api/treasures/:treasure_id", deleteTreasure);
app.get("/api/shops", getShops);

app.use((err, req, res, next) => {
  res.status(err.status).send({ msg: err.msg });
});

module.exports = app;
