const db = require("./");
const format = require("pg-format");
const { createRef } = require("../utils/createRef");

const seed = ({ shopData, treasureData }) => {
  return db
    .query(`DROP TABLE IF EXISTS treasures;`)
    .then(() => {
      return db.query("DROP TABLE IF EXISTS shops;");
    })
    .then(() => {
      return db.query(`CREATE TABLE shops (
		shop_id SERIAL PRIMARY KEY,
		shop_name VARCHAR (100) NOT NULL,
		owner VARCHAR(100) NOT NULL,
		slogan TEXT  
	)`);
    })
    .then(() => {
      return db.query(`CREATE TABLE treasures(
      	treasure_id SERIAL PRIMARY KEY,
      	treasure_name VARCHAR (1000) NOT NULL,
      	colour VARCHAR (1000) NOT NULL,
      	age INT NOT NULL,
      	cost_at_auction FLOAT4 NOT NULL,
      	shop_id INT REFERENCES shops (shop_id) NOT NULL
      )`);
    })
    .then(() => {
      const formattedShops = shopData.map((shop) => {
        return [shop.shop_name, shop.owner, shop.slogan];
      });
      const insertQueryStr = format(
        `
		INSERT INTO shops
		(shop_name, owner, slogan)
		VALUES 
		%L RETURNING *
		`,
        formattedShops
      );
      return db.query(insertQueryStr);
    })
    .then((results) => {
      const rows = results.rows;
      const refObj = createRef(rows);

      const formattedStock = treasureData.map((item) => {
        const { treasure_name, colour, age, cost_at_auction, shop } = item;
        item.shop_id = refObj[item.shop];
        const shop_id = refObj[shop];
        return [treasure_name, colour, age, cost_at_auction, shop_id];
      });

      const treasureString = format(
        `
          INSERT INTO treasures (
            treasure_name,
            colour,
            age,
            cost_at_auction,
            shop_id
          ) VALUES %L RETURNING *;
          `,
        formattedStock
      );

      return db.query(treasureString);
    });

  // then: create some new tables - but which first and why?
  // then: insert the raw data into the tables.
};

module.exports = seed;
