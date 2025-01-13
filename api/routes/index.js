const express = require("express");
const router = express.Router();

const categoryRoute = require("./categories.js");
const productRoute = require("./products.js");
const billRoute = require("./bills.js");
const authRoute = require("./auth.js");
const userRoute = require("./users.js");

router.use("/categories", categoryRoute);
router.use("/products", productRoute);
router.use("/bills", billRoute);
router.use("/auth", authRoute);
router.use("/users", userRoute);


module.exports = router;
