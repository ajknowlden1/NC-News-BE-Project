const app = require("../app");
const connection = require("../db/connection");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
require("jest-sorted");

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
        expect(body.article).toEqual(
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
  it("should return an article object with the correct comment count", () => {
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then((response) => {
        const { body } = response;
        expect(body.article.comment_count).toBe(2);
      });
  });

  it("should return with a 404 - not found error if an id has no data associated with it", () => {
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
        expect(response.body.msg).toBe("bad request - invalid id");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  it("should return an article object", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({ inc_vote: 1 })
      .expect(201)
      .then((response) => {
        expect(response instanceof Object);
      });
  });
  it("should return an updated article object with the votes value updated correctly if the provided inc_vote is positive", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({ inc_vote: 5 })
      .expect(201)
      .then((response) => {
        const updatedVotes = response.body.updated_article.votes;

        expect(updatedVotes).toBe(5);
      });
  });
  it("should return an updated article object with the votes value updated correctly if the provided inc_vote is negative", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_vote: -20 })
      .expect(201)
      .then((response) => {
        const updatedVotes = response.body.updated_article.votes;

        expect(updatedVotes).toBe(80);
      });
  });
  it("should respond with a 404 - not found error if the id has no data associated with it", () => {
    return request(app)
      .patch("/api/articles/5293472")
      .send({ inc_vote: 5 })
      .then((response) => {
        expect(response.res.statusCode).toBe(404);
        expect(response.res.statusMessage).toBe("Not Found");
      });
  });
  it("should respond with a 400 - bad request error if the id is invalid", () => {
    return request(app)
      .patch("/api/articles/an_id")
      .send({ inc_vote: 5 })
      .then((response) => {
        expect(response.body.status).toBe(400);
        expect(response.body.msg).toBe("bad request - invalid id");
      });
  });
  it("should respond with a 400 - bad request error if the request body is invalid", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({ inc_votes: "five" })
      .then((response) => {
        expect(response.body.status).toBe(400);
        expect(response.body.msg).toBe("bad request - invalid request body");
      });
  });
});
describe("GET /api/users", () => {
  it("should return an array", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        const { users } = response.body;
        expect(Array.isArray(users)).toBe(true);
      });
  });
  it("should return an array of user objects with the correct keys", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        const { users } = response.body;
        expect(users.length).not.toBe(0);
        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({ username: expect.any(String) })
          );
        });
      });
  });
});

describe("GET /api/articles", () => {
  it("should return an array", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const { body } = response;
        expect(Array.isArray(body.articles)).toBe(true);
      });
  });
  it("should return the articles sorted in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const { body } = response;
        expect(body.articles).toBeSorted({
          key: "created_at",
          descending: true,
        });
      });
  });
  it("should return the articles with the comment_count key", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const { body } = response;
        expect(body.articles.length).not.toBe(0);
        body.articles.forEach((article) => {
          expect(article.hasOwnProperty("comment_count")).toBe(true);
        });
      });
  });
  it("should return the articles with the correct keys and values", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const { body } = response;
        body.articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  it("should return an array", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then((response) => {
        const { body } = response;
        expect(Array.isArray(body.comments)).toBe(true);
      });
  });
  it("should return an array of comment objects with the correct keys", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then((response) => {
        const { body } = response;
        expect(Array.isArray(body.comments)).toBe(true);
        expect(body.comments.length).not.toBe(0);
        body.comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              body: expect.any(String),
              author: expect.any(String),
              votes: expect.any(Number),
              created_at: expect.any(String),
            })
          );
        });
      });
  });
  it("should return a 400 - bad request error if the id provided is invalid", () => {
    return request(app)
      .get("/api/articles/two/comments")
      .then((response) => {
        const { body } = response;
        expect(body.status).toBe(400);
        expect(body.msg).toBe("bad request - invalid id");
      });
  });
  it("should return 200 - no comments found - if the provided id is valid but has no comments associated with it", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .then((response) => {
        const { body } = response;
        expect(response.statusCode).toBe(200);
        expect(body.comments).toEqual([]);
        expect(body.comments.length).toBe(0);
      });
  });
  it("should return a 404 - not found error if the provided id does not exist in the database", () => {
    return request(app)
      .get("/api/articles/87/comments")
      .then((response) => {
        const { body } = response;
        expect(body.status).toBe(404);
        expect(body.msg).toBe("not found");
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  it("should return an object containing the posted comment", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({ username: "lurker", body: "Simply riveting stuff!" })
      .expect(201)
      .then((response) => {
        const { body } = response;
        expect(body instanceof Object).toBe(true);
        expect(body.comment_posted).toEqual("Simply riveting stuff!");
      });
  });
  it("should respond with 404 - not found if the provided article id does not exist", () => {
    return request(app)
      .post("/api/articles/342/comments")
      .send({ username: "lurker", body: "Simply riveting stuff!" })
      .then((response) => {
        const { body } = response;
        expect(body.status).toBe(404);
        expect(body.msg).toBe("not found");
      });
  });
});
