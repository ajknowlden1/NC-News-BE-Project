const app = require("../app");
const connection = require("../db/connection");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");

beforeEach(() => seed(testData));

afterAll(() => connection.end());

describe("GET /api/topics", () => {
  it("should return an array", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((result) => {
        let { body } = result;
        expect(Array.isArray(body.topics)).toBe(true);
      });
  });
  it("should return an array of objects with the correct keys", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((result) => {
        let { body } = result;

        expect(body.topics).toHaveLength(3);
        body.topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  it("should return an object", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then((response) => {
        expect(typeof response).toBe("object");
      });
  });
  it("should return an object with the correct properties", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then((response) => {
        const { body } = response;
        expect(body.article[0]).toEqual(
          expect.objectContaining({
            article_id: expect.any(Number),
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
          })
        );
      });
  });
  it("should return with a 404 - not found error if an invalid id is given", () => {
    return request(app)
      .get("/api/articles/0")
      .then((response) => {
        expect(response.body.status).toBe(404);
        expect(response.body.msg).toBe("not found");
      });
  });
  it("should return with a 400 - bad request error if the id is of an invalid type", () => {
    return request(app)
      .get("/api/articles/some_id")
      .then((response) => {
        expect(response.body.status).toBe(400);
        expect(response.body.msg).toBe("bad request - invalid input type");
      });
  });
});
