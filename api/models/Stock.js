const mongoose = require("mongoose");
const StockSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
  },
  { timestamps: true }
);
const Stock = mongoose.model("stocks", StockSchema);
module.exports = Stock;
