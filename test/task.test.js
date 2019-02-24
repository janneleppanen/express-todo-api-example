const request = require("supertest");

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

  it("lists all tasks", done => {
    request(app)
      .get("/api/v1/tasks/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toEqual(fixtures.tasks);
        done();
      });
  });

  it("fetches task by id", async () => {
    const response = await request(app)
      .get("/api/v1/tasks/2")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toEqual(fixtures.tasks[1]);
  });

  it("shows correct error when could't fetch a task", async () => {
    const response = await request(app)
      .get("/api/v1/tasks/10")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(response.body).toEqual({ error: "Task not found" });
  });

  it("deletes a task", async () => {
    const task = await request(app)
      .delete("/api/v1/tasks/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    const tasks = await knex.select().from("task");
    expect(tasks.length).toBe(fixtures.tasks.length - 1);
  });

  it("creates a new task", async () => {
    const response = await request(app)
      .post("/api/v1/tasks")
      .send({ description: "Create a new task" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    const tasks = await knex("task");
    expect(tasks.length).toBe(fixtures.tasks.length + 1);
  });

  it("returns correct error when cannot create a new task", async () => {
    const response = await request(app)
      .post("/api/v1/tasks")
      .send({ incorrect: "Create a new task" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toEqual({ error: "Description not given" });
    const tasks = await knex("task");
    expect(tasks.length).toBe(fixtures.tasks.length);
  });

  it("updates a task", async () => {
    const response = await request(app)
      .put("/api/v1/tasks/1")
      .send({ description: "Updated text", done: true })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.description).toBe("Updated text");
    expect(response.body.done).toEqual(1);

    const task = await knex("task")
      .where("id", 1)
      .first();
    expect(task.description).toBe("Updated text");
    expect(task.done).toBe(1);
  });
});
