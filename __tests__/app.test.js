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

        expect(response instanceof Object);

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
            article_id: 2,
            title: "Sony Vaio; or, The Laptop",
            topic: "mitch",
            author: "icellusedkars",
            body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
            created_at: "2020-10-16T05:03:00.000Z",
            votes: 0,

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
