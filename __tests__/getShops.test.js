const request = require("supertest");
const app = require("../app");
const db = require("../db/index");
const data = require("../db/data/test-data");
const seed = require("../db/seed");

beforeEach(() => {
  return seed(data);
});
// afterAll(() => {
//   return db.end();
// });

describe("GET /api/shops", () => {
  it("Should return an array of shops", () => {
    return request(app)
      .get("/api/shops")
      .expect(200)
      .then(({ body }) => {
        console.log(body.shops);
        expect(body.shops).toHaveLength(11);
        body.shops.forEach((shop) => {
          expect(shop).toMatchObject({
            shop_id: expect.any(Number),
            shop_name: expect.any(String),
            slogan: expect.any(String),
            stock_value: expect.any(Number),
          });
        });
      });
  });
});
