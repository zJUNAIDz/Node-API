const express = require("express");

const router = express.Router();
router.get("/", (req, res) => {
  res.render("index", { title: "Home page", message: "HOME" });
});
module.exports = router;
