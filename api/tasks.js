const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({
    status: "working"
  });
});

module.exports = router;
