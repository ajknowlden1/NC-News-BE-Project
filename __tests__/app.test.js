const app = require("../app");
const connection = require("../db/connection");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");

beforeEach(() => seed(testData));

describe("GET /api/topics", () => {
  it("should return an array", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((result) => {
        let { body } = result;
        expect(Array.isArray(body)).toBe(true);
      });
  });
  it("should return an array of objects with the correct keys", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((result) => {
        let { body } = result;
        body.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
  afterAll(() => connection.end());
});
