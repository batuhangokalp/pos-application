const express = require("express");
const router = express.Router();

const categoryRoute = require("./categories.js");

router.use("/categories", categoryRoute);

module.exports = router;
