const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");
const Bill = require("../models/Bill.js");

const {
  getModel,
  createModel,
  getModelAccordingToId,
  updateModel,
  deleteModel,
} = require("../helpers/commonControllers.js");

router.post("/", createModel(Product));

router.get("/", getModel(Product));

router.get("/bestSeller", async (req, res) => {
  try {
    const bills = await Bill.find();
    const cartItems = bills.flatMap((bill) => bill.cartItems);

    const salesMap = cartItems.reduce((acc, item) => {
      const productId = item.productId._id;
      if (!acc[productId]) {
        acc[productId] = {
          product: item.productId,
          totalSold: 0,
        };
      }
      acc[productId].totalSold += item.quantity;
      return acc;
    }, {});

    const bestSellingProducts = Object.values(salesMap).sort(
      (a, b) => b.totalSold - a.totalSold
    );

    res.status(200).json(bestSellingProducts);
  } catch (error) {
    console.error("Error fetching best sellers:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", getModelAccordingToId(Product));

router.get("/:id", getModelAccordingToId(Product));

router.put("/:id", updateModel(Product));

router.delete("/:id", deleteModel(Product));

module.exports = router;
