const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
// const { check, validationResult } = require("express-validator/check"); // password validator

// const User = require("../models/User");
const Wallet = require("../models/Wallet");

// GET /wallets
// Get all users wallets
// Private page
router.get("/", auth, async (req, res) => {
  //res.send('Get all Wallets');
  try {
    const wallets = await Wallet.find({ user: req.user.id })
    
    // .sort({
    //   date: -1
    
    res.json(wallets);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// POST /wallets
// Add new wallet
// Private page
router.post("/", auth, async (req, res) => {
  //res.send("Add wallet");

  const { amount } = req.body;

  try {
    const newWallet = new Wallet({
      amount,
      user: req.user.id
    });

    const wallet = await newWallet.save();
   
    res.json(wallet);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// PUT /wallets/:id
// Update wallet
// Private page
router.put("/:id", auth, async (req, res) => {
  //res.send("Update wallet");
  
});
// DELETE /wallets/:id
// Delete wallet
// Private page
router.delete("/:id", (req, res) => {
  res.send("Delete ");
});

module.exports = router;
