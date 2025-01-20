const express = require("express");
const router = express.Router();
const Category = require("../models/Category.js");
const {
  createModel,
  getModel,
  getModelAccordingToId,
  deleteModel,
  updateModel,
} = require("../helpers/commonControllers.js");

router.post("/", createModel(Category));

router.get("/", getModel(Category));

router.get("/:id", getModelAccordingToId(Category));

router.put("/:id", updateModel(Category));

router.delete("/:id", deleteModel(Category));

module.exports = router;
