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

describe("PATCH /api/treasures/:treasure_id", () => {
  it("Should return updated object", () => {
    return request(app)
      .patch("/api/treasures/1")
      .send({
        cost_at_auction: 500.0,
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.treasure).toMatchObject({
          cost_at_auction: 500,
          treasure_id: 1,
        });
      });
  });

  it("Should return error if passed treasure_id that does not exist and not table mutation takes place", () => {
    return request(app)
      .patch("/api/treasures/999")
      .send({
        cost_at_auction: 500.0,
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid ID");
      });
  });

  it("Should reject update if not passed 'cost_at_auction parameter in body", () => {
    return request(app)
      .patch("/api/treasures/1")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Update field missing or inaccurate");
      });
  });

  it("Should return error if passed anything other than 'cost_at_auction' in body", () => {
    return request(app)
      .patch("/api/treasures/1")
      .send({
        some_other_field: 748,
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Update field missing or inaccurate");
      });
  });

  it("Should return error if 'cost_at_auction' body value not a number", () => {
    return request(app)
      .patch("/api/treasures/1")
      .send({
        cost_at_auction: "34 trash pandas",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Update value must be a number");
      });
  });
});
