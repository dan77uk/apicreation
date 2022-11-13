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

describe("/api/treasures", () => {
  test("Should return a list of treasures", () => {
    return request(app)
      .get("/api/treasures")
      .expect(200)
      .then(({ body }) => {
        expect(body.treasures).toHaveLength(26);
        body.treasures.forEach((item) => {
          expect(item).toMatchObject({
            treasure_id: expect.any(Number),
            treasure_name: expect.any(String),
            colour: expect.any(String),
            cost_at_auction: expect.any(Number),
            shop_name: expect.any(String),
          });
        });
      });
  });

  test("GET: 200 - array of treasures sorted by age by default", () => {
    return request(app)
      .get("/api/treasures")
      .expect(200)
      .then(({ body }) => {
        expect(body.treasures).toBeSortedBy("age");
      });
  });

  test("GET: 200 - can sort array of treasures by cost_at_auction", () => {
    return request(app)
      .get("/api/treasures?sort_by=cost_at_auction")
      .expect(200)
      .then(({ body }) => {
        expect(body.treasures).toBeSortedBy("cost_at_auction");
      });
  });

  test("GET: 200 - can sort array of treasures by treasure_name", () => {
    return request(app)
      .get("/api/treasures?sort_by=treasure_name")
      .expect(200)
      .then(({ body }) => {
        expect(body.treasures).toBeSortedBy("treasure_name");
      });
  });

  test("GET: 200 - allow client to change the sort order with an order query", () => {
    return request(app)
      .get("/api/treasures?order=desc")
      .expect(200)
      .then(({ body }) => {
        expect(body.treasures).toBeSorted({ key: "age", descending: true });
      });
  });

  test("GET: 400 - reject order query when passed invalid term  ", () => {
    return request(app)
      .get("/api/treasures?order=dog")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Unacceptable sort query");
      });
  });

  test("GET: 200 - can sort an array of treasures by specified colour query", () => {
    return request(app)
      .get("/api/treasures?colour=gold")
      .expect(200)
      .then(({ body }) => {
        body.treasures.forEach((item) => {
          expect(item.colour).toBe("gold");
        });
      });
  });

  test("GET: 200 - can sort an array of treasures by specified colour query", () => {
    return request(app)
      .get("/api/treasures?colour=magenta")
      .expect(200)
      .then(({ body }) => {
        body.treasures.forEach((item) => {
          expect(item.colour).toBe("magenta");
        });
      });
  });

  test("GET: 404 - returns no resource found when query value does not exist in column ", () => {
    return request(app)
      .get("/api/treasures?colour=dog")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No resource found");
      });
  });

  test("GET: 200 - can filter an array of treasures by max_age query", () => {
    return request(app)
      .get("/api/treasures?max_age=13")
      .expect(200)
      .then(({ body }) => {
        body.treasures.forEach((item) => {
          expect(item.age).toBeLessThan(14);
        });
      });
  });

  test("GET: 200 - can filter an array of treasures by min_age query", () => {
    return request(app)
      .get("/api/treasures?min_age=50")
      .expect(200)
      .then(({ body }) => {
        // console.log(body.treasures);
        body.treasures.forEach((item) => {
          expect(item.age).toBeGreaterThan(50);
        });
      });
  });

  test.only("GET: 200 - can filter an array of treasures by min_age query", () => {
    return request(app)
      .get("/api/treasures?sort_by=treasure_name&limit=10&colour=turquoise")
      .expect(200)
      .then(({ body }) => {
        console.log(body.treasures);
        body.treasures.forEach((item) => {});
      });
  });
});
