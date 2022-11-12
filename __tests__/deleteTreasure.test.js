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

describe("DELETE /api/treasure/:treasure_id", () => {
  it("Should return status 204 if item successfully deleted", () => {
    return request(app).delete("/api/treasures/1").expect(204);
  });

  it("Treasures table should reduce in size by one", () => {
    return db
      .query(`SELECT COUNT (treasure_id) FROM treasures;`)
      .then(({ rows }) => {
        const originalTableSize = Number(rows[0].count);
        console.log(originalTableSize);
        return request(app)
          .delete("/api/treasures/1")
          .expect(204)
          .then(() => {
            return db
              .query(`SELECT COUNT (treasure_id) FROM treasures;`)
              .then(({ rows }) => {
                expect(Number(rows[0].count)).toBe(originalTableSize - 1);
              });
          });
      });
  });

  it("Should return 404 error if no treasure exists to delete", () => {
    return request(app)
      .delete("/api/treasures/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No resource to delete");
      });
  });
});
