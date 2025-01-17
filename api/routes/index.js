const express = require("express");
const router = express.Router();

const categoryRoute = require("../controllers/categoryController.js");
const productRoute = require("../controllers/productController.js");
const billRoute = require("../controllers/billController.js");
const authRoute = require("../controllers/authController.js");
const userRoute = require("../controllers/userController.js");

router.use("/categories", categoryRoute);
router.use("/products", productRoute);
router.use("/bills", billRoute);
router.use("/auth", authRoute);
router.use("/users", userRoute);


module.exports = router;
