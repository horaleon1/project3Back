const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
// const { check, validationResult } = require("express-validator/check"); // password validator

const User = require("../models/User");
const Wallet = require("../models/Wallet");

// GET /contacts
// Get all users contacts ( own contacts )
// Private page
router.get("/", auth, async (req, res) => {
  //res.send('Get all contacts');
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

// POST /contacts
// Add new contact
// Private page
router.post("/", auth, async (req, res) => {
  //res.send("Add contact");

  const { amount } = req.body;

  try {
    const newWallet = new Contact({
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

// PUT /contacts/:id
// Update contact
// Private page
router.put("/:id", auth, async (req, res) => {
  //res.send("Update contact");
  
});
// DELETE /contacts/:id
// Delete contact
// Private page
router.delete("/:id", (req, res) => {
  res.send("Delete contact");
});

module.exports = router;
