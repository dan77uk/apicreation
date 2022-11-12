const db = require("../db/index");

exports.updateTreasure = (id, body) => {
  const { cost_at_auction } = body;

  if (cost_at_auction === undefined) {
    return Promise.reject({
      status: 400,
      msg: "Update field missing or inaccurate",
    });
  }

  if (/[A-Za-z]/g.test(cost_at_auction)) {
    return Promise.reject({
      status: 400,
      msg: "Update value must be a number",
    });
  }
  return db
    .query(
      `UPDATE treasures SET cost_at_auction = $1 WHERE treasure_id = $2 RETURNING *;`,
      [cost_at_auction, id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Invalid ID",
        });
      }
      return result.rows[0];
    });
};
