const express = require("express");
const router = express.Router();

const queries = require("../db/queries");

router.get("/", (req, res) => {
  queries.getAll().then(tasks => res.send(tasks));
});

router.get("/:id", async (req, res) => {
  const task = await queries.find(req.params.id);
  if (!task) res.status(404).send({ error: "Task not found" });
  res.send(task);
});

router.post("/", async (req, res) => {
  const { description } = req.body;
  if (!description) {
    res.send({ error: "Description not given" });
  } else {
    const task = await queries.create({ description });
    res.send(task);
  }
});

router.delete("/:id", async (req, res) => {
  const task = await queries.find(req.params.id);
  const rowsAffected = await queries.delete(req.params.id);

  if (rowsAffected > 0) {
    res.send(task);
  } else {
    res.status(404).send({ error: "Couldn't delete any tasks" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { description, done } = req.body;

  try {
    await queries.update(id, { description, done });
    const task = await queries.find(id);
    res.send(task);
  } catch (e) {
    res.send({ error: "Couldn't update a task" });
  }
});

module.exports = router;
