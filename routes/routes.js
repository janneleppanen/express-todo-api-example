const express = require("express");

const task = require("./controllers/task");

const router = express.Router();

router.use("/task", task);

module.exports = router;
