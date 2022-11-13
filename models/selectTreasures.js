const db = require("../db/index");

exports.selectTreasures = (
  sort_by = "age",
  userOrder,
  colour,
  max_age,
  min_age,
  limit
) => {
  const validColumns = ["age", "cost_at_auction", "treasure_name"];

  if (!validColumns.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "invalid sort query" });
  }

  let queryStr = `SELECT treasures.treasure_id, 
  treasures.treasure_name, 
  treasures.colour, 
  treasures.age, 
  treasures.cost_at_auction,
  shops.shop_name
  FROM treasures JOIN shops ON treasures.shop_id = shops.shop_id`;

  if (min_age && !/[A-Za-z]/g.test(min_age)) {
    queryStr += ` WHERE treasures.age >= ${min_age}`;
  }

  if (max_age && !/[A-Za-z]/g.test(max_age)) {
    queryStr += ` WHERE treasures.age <= ${max_age}`;
  }

  const queryValues = [];
  if (colour) {
    queryStr += ` WHERE colour = $1`;
    queryValues.push(colour);
  }
  queryStr += ` ORDER BY ${sort_by}`;

  if (!limit) {
    queryStr += " LIMIT 5";
  } else {
    queryStr += ` LIMIT ${limit}`;
  }

  if (userOrder) {
    const validOrder = ["desc", "asc"];
    if (validOrder.includes(userOrder)) {
      queryStr += ` ${userOrder}`;
    } else {
      return Promise.reject({
        status: 400,
        msg: "Unacceptable sort query",
      });
    }
  }
  console.log(queryStr);
  return db.query(queryStr, queryValues).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "No resource found",
      });
    }

    return result.rows;
  });
};
