const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
  },
  { timestamps: true }
);
const Category = mongoose.model("categories", CategorySchema);
module.exports = Category;
