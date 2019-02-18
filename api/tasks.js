const express = require("express");
const router = express.Router();

const queries = require("../db/queries");

router.get("/", (req, res) => {
  queries.getAll().then(tasks => res.send(tasks));
});

module.exports = router;
