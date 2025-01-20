const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");
const {
  getModel,
  createModel,
  getModelAccordingToId,
  updateModel,
  deleteModel,
} = require("../helpers/commonControllers.js");

router.post("/", createModel(Product));

router.get("/", getModel(Product));

router.get("/:id", getModelAccordingToId(Product));

router.put("/:id", updateModel(Product));

router.delete("/:id", deleteModel(Product));

module.exports = router;
