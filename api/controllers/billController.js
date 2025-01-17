const express = require("express");
const router = express.Router();
const Bill = require("../models/Bill.js");

// #region Creating new bill
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const newBill = new Bill(body);
    await newBill.save();
    res.status(201).json(newBill);
  } catch (error) {
    console.log("Creating bill error:", error);
    res.status(500).json({ error: "Server error!" });
  }
});
//#endregion

// #region Getting all bills
router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (error) {
    console.log("Getting bill error:", error);
    res.status(500).json({ error: "Server Error!" });
  }
});
//#endregion

// #region Getting bill according to id
router.get("/:billId", async (req, res) => {
  try {
    const billId = req.params.billId;
    const bill = await Bill.findById(billId);
    if (!bill) {
      return res.status(404).json({ error: "Bill not found!" });
    }
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({ error: "Server error!" });
  }
});
//#endregion

// #region Updating bill
router.put("/:billId", async (req, res) => {
  try {
    const billId = req.params.billId;
    const updateBody = req.body;

    const existingBill = await Bill.findById(billId);
    if (!existingBill) {
      return res.status(404).json({ error: "Bill not found!" });
    }

    const updatedBill = await Bill.findByIdAndUpdate(billId, updateBody, {
      new: true,
    });

    res.status(200).json(updatedBill);
  } catch (error) {
    res.status(500).json({ error: "Server error!" });
  }
});
// #endregion

// #region Deleting bill
router.delete("/:billId", async (req, res) => {
  try {
    const billId = req.params.billId;

    const existingBill = await Bill.findById(billId);
    if (!existingBill) {
      return res.status(404).json({ error: "Bill not found!" });
    }

    await Bill.findByIdAndDelete(billId);

    res.status(200).json({ message: "Deleting is successful!" });
  } catch (error) {
    res.status(500).json({ error: "Server error!" });
  }
});
// #endregion
module.exports = router;
