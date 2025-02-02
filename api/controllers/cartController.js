const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const router = express.Router();

// #region Get Cart
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) return res.status(404).json({ message: "Sepet bulunamadı" });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Sepeti getirme hatası", error });
  }
});
// #endregion

// #region Add To Cart
router.post("/add", async (req, res) => {
  try {
    const {
      userId,
      quantity,
      price,
      title,
      img,
      stock,
      _id: productId,
    } = req.body;

    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      if (existingItem.quantity > 10) {
        existingItem.price = price * 0.8;
      } else {
        existingItem.price = price;
      }
    } else {
      cart.items.push({ productId, quantity, price, title, img, stock });
    }
    await cart.save();

    await cart.populate("items.productId");
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Sepete ekleme hatası", error });
  }
});
// #endregion

// #region Remove From Cart
router.post("/decrease", async (req, res) => {
  try {
    const { userId, quantity, productId } = req.body;

    let cart = await Cart.findOne({ userId });
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      if (existingItem.quantity === 1) {
        cart.items = cart.items.filter(
          (item) => item.productId.toString() !== productId
        );
      } else {
        existingItem.quantity -= 1;
        if (existingItem.quantity <= 10) {
          existingItem.price = product.price;
        } else {
          existingItem.price = product.price * 0.8;
        }
      }

      await cart.save();
      await cart.populate("items.productId");

      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Sepetten çıkarma hatası", error });
  }
});

// #endregion

// #region Clear Cart
router.delete("/delete/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOneAndDelete({ userId });

    res.status(200).json({ cart, message: "Sepet temizlendi" });
  } catch (error) {
    res.status(500).json({ message: "Sepeti temizleme hatası", error });
  }
});
// #endregion

module.exports = router;
