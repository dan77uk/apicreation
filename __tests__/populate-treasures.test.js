// const data = require("../db/data/test-data");
// const seed = require("../db/seed");

// const db = require("../db/index");

// beforeEach(() => {
//   return seed(data);
// });

// afterAll(() => {
//   return db.end();
// });

describe.skip("Shop_id utility", () => {
  it("I dont know", () => {
    return db
      .query("SELECT * FROM shops")
      .then((shops) => {
        const refObj = {};
        // shops.rows.forEach((shop) => {
        //   refObj[shop.shop_name] = shop.shop_id;
        // });
        shops.rows.map((shop) => {
          return (refObj[shop.shop_name] = shop.shop_id);
        });
        return refObj;
      })
      .then((refObj) => {
        const stock = data.treasureData.map((item) => {
          return { ...item };
        });
        stock.map((item) => {
          item.shop_id = refObj[item.shop];
          delete item.shop;
        });
        return stock;
      });
  });
  r;
});

//inputArray.forEach((shop) => { refObj[shop.shop_name] = shop.shop_id})
