const request = require("supertest");
const expect = require("chai").expect;
const assert = require("chai").assert;

const knex = require("../db/knex");
const app = require("../app");
const fixtures = require("../test/fixtures");

describe("Task endpoint", () => {
  before(done => {
    knex.migrate
      .latest()
      .then(() => {
        return knex.seed.run();
      })
      .then(() => done());
  });

  it("list all tasks", done => {
    request(app)
      .get("/api/v1/tasks/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response.body).to.be.a("array");
        assert.deepEqual(response.body, fixtures.tasks);
        done();
      });
  });
});
