const express = require("express");
const router = express.Router();

const categoryRoute = require("../controllers/categoryController.js");
const productRoute = require("../controllers/productController.js");
const billRoute = require("../controllers/billController.js");
const authRoute = require("../controllers/authController.js");
const userRoute = require("../controllers/userController.js");
const cartRoute = require("../controllers/cartController.js");
const stockRoute = require("../controllers/stockController.js");

router.use("/categories", categoryRoute);
router.use("/products", productRoute);
router.use("/bills", billRoute);
router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/cart", cartRoute);
router.use("/stock", stockRoute);

module.exports = router;
