const express = require("express");
const router = express.Router();
const Bill = require("../models/Bill.js");
const {
  getModel,
  createModel,
  getModelAccordingToId,
  updateModel,
  deleteModel,
} = require("../helpers/commonControllers.js");
const authMiddleware = require("../helpers/authMiddleware.js");

router.post("/", createModel(Bill));

router.get("/", authMiddleware, getModel(Bill));

router.get("/:id", getModelAccordingToId(Bill));

router.put("/:id", updateModel(Bill));

router.delete("/:id", deleteModel(Bill));
module.exports = router;
