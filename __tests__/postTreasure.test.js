const request = require("supertest");
const app = require("../app");
const db = require("../db/index");
const data = require("../db/data/test-data");
const seed = require("../db/seed");

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  return db.end();
});

describe("POST /api/treasures", () => {
  it("Should return the POSTED object with a new generated treasure_id", () => {
    return request(app)
      .post("/api/treasures")
      .send({
        treasure_name: "Martin Guitar",
        colour: "guitar-colour",
        age: 60,
        cost_at_auction: 5000,
        shop_id: 1,
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.treasure).toMatchObject({
          treasure_name: "Martin Guitar",
          colour: "guitar-colour",
          age: 60,
          cost_at_auction: 5000,
          shop_id: 1,
          treasure_id: expect.any(Number),
        });
      });
  });

  it("Treasures table size should increase by 1 insertion", () => {
    return db
      .query(`SELECT COUNT (treasure_id) FROM treasures;`)
      .then(({ rows }) => {
        const originalTableSize = Number(rows[0].count);
        return request(app)
          .post("/api/treasures")
          .send({
            treasure_name: "Martin Guitar",
            colour: "guitar-colour",
            age: 60,
            cost_at_auction: 5000,
            shop_id: 1,
          })
          .expect(201)
          .then(() => {
            return db
              .query(`SELECT COUNT (treasure_id) FROM treasures;`)
              .then(({ rows }) => {
                expect(Number(rows[0].count)).toBe(originalTableSize + 1);
              });
          });
      });
  });
});
