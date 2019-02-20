const request = require("supertest");
const expect = require("chai").expect;
const assert = require("chai").assert;

const knex = require("../db/knex");
const app = require("../app");
const fixtures = require("../test/fixtures");

describe("Task endpoint", () => {
  beforeEach(done => {
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

  it("fetch task by id", async () => {
    const response = await request(app)
      .get("/api/v1/tasks/2")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    assert.deepEqual(response.body, fixtures.tasks[1]);
  });

  it("shows correct error when could't fetch a task", async () => {
    const response = await request(app)
      .get("/api/v1/tasks/10")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);

    assert.deepEqual(response.body, { error: "Task not found" });
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

  it("creates a new task", async () => {
    const response = await request(app)
      .post("/api/v1/tasks")
      .send({ description: "Create a new task" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    const tasks = await knex("task");
    assert.equal(tasks.length, fixtures.tasks.length + 1);
  });

  it("returns correct error when cannot create a new task", async () => {
    const response = await request(app)
      .post("/api/v1/tasks")
      .send({ incorrect: "Create a new task" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.deep.equal({ error: "Description not given" });
    const tasks = await knex("task");
    assert.equal(tasks.length, fixtures.tasks.length);
  });
});
