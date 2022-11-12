const db = require("../db/index");

exports.insertTreasure = (body) => {
  const { treasure_name, colour, age, cost_at_auction, shop_id } = body;
  if (
    treasure_name === undefined ||
    colour === undefined ||
    age === undefined ||
    cost_at_auction === undefined ||
    shop_id === undefined
  ) {
    return Promise.reject({
      status: 400,
      msg: "Missing required fields",
    });
  }
  return db
    .query(
      "INSERT INTO treasures (treasure_name, colour, age, cost_at_auction, shop_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [treasure_name, colour, age, cost_at_auction, shop_id]
    )
    .then((result) => {
      return result.rows[0];
    });
};
