const express = require("express");
const app = express();
const { getTreasures } = require("./controllers/controllers");
app.use(express.json());

app.get("/api/treasures", getTreasures);
app.post("/api/treasures", postTreasure)

app.use((err, req, res, next) => {
  res.status(err.status).send({ msg: err.msg });
});

module.exports = app;
