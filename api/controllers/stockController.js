const express = require("express");
const router = express.Router();
const Stock = require("../models/Stock.js");
const {
  getModel,
  createModel,
  getModelAccordingToId,
  updateModel,
  deleteModel,
} = require("../helpers/commonControllers.js");

router.post("/", createModel(Stock));

router.get("/", getModel(Stock));

router.get("/:id", getModelAccordingToId(Stock));

router.put("/:id", updateModel(Stock));

router.delete("/:id", deleteModel(Stock));

module.exports = router;
