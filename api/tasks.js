const express = require("express");
const router = express.Router();

const queries = require("../db/queries");

router.get("/", (req, res) => {
  queries.getAll().then(tasks => res.send(tasks));
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

module.exports = router;
