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

  it("deletes a task", async () => {
    const task = await request(app)
      .delete("/api/v1/tasks/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    const tasks = await knex.select().from("task");
    assert.equal(tasks.length, fixtures.tasks.length - 1);
  });
});
