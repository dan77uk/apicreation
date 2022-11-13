const db = require("../db/index");

exports.selectShops = () => {
  return db
    .query(`ALTER TABLE shops ADD COLUMN stock_value FLOAT;`)
    .then((result) => {
      return db
        .query("SELECT * FROM shops;")

        .then((result) => {
          result.rows.forEach((shop) => {
            return db
              .query(
                `SELECT SUM(cost_at_auction) FROM treasures WHERE shop_id = ${shop.shop_id};`
              )

              .then((result) => {
                const queryStr = `UPDATE shops SET stock_value = '${result.rows[0].sum}' WHERE shop_id = ${shop.shop_id} RETURNING *;`;
                return db.query(queryStr);
              })
              .then(() => {
                return db.query("SELECT * FROM shops;");
              })
              .then((result) => {
                return result.rows;
              });
          });
          return result.rows;
        });
    });
};
