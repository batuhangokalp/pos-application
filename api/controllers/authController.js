const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

// #region Register
router.post("/register", async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email is already exist." });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();
  
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Server error!" });
    }
  });
  // #endregion


  // #region Login
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid email!" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password!" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Server error!" });
    }
  });
  // #endregion

  module.exports = router;
