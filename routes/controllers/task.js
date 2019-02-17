const express = require("express");

const tasks = require("../../db/task");

var router = express.Router();

router.get("/", (req, res) => res.send(tasks.getAll()));

router.post("/", (req, res) => {
  if (!req.body.text) res.status(404).send({ error: "Text missing" });
  const task = tasks.create(req.body.text);
  res.send(task);
});

router.get("/:id", (req, res) => {
  const task = tasks.getById(req.params.id);
  if (!task) res.status(404).send({ error: "Task not found" });
  res.send(task);
});

router.put("/:id", (req, res) => {
  const task = tasks.update(req.params.id, req.body);

  if (!task) res.status(404).send({ error: "Task not found" });
  res.send(task);
});

router.delete("/:id", (req, res) => {
  const task = tasks.remove(req.params.id);
  if (!task) res.status(404).send({ error: "Task not found" });
  res.send(task);
});

module.exports = router;
