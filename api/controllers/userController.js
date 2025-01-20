const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const { getModel, deleteModel } = require("../helpers/commonControllers.js");

router.get("/", getModel(User));

router.delete("/:email", deleteModel(User));

module.exports = router;
