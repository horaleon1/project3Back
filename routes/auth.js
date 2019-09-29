const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 
const config = require("config");
const auth = require('../middleware/auth');
const { check, validationResult } = require("express-validator/check"); // password validator

const User = require("../models/User");

// GET /auth
// GEt logged in user
// Privatepage
router.get("/", auth, async (req, res) => {
//res.send("Log in user");
try {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
} catch (err) {
  console.error(err.message);
  res.status(500).send('Server Error');
}
});



// POST /auth
// Auth user and get token
// Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    //res.send('Get logged in user');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try{
      let user = await User.findOne({ email });
      if(!user){
        return res.status(400).json({ msg: 'Invalid Credentials'})
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch){
        return res.status(400).json({ msg: 'Invalid Credentials'})
      }

      const payload = {

        user:{
          id: user.id
        }
      };
      jwt.sign(
        payload, config.get('jwtSecret'),{
          //modify when done///////////////////////////////////////////////////
          expiresIn:3600000
        },
        (err,token) => {
          if(err) throw err;
          res.json({ token });
        }
      );
    } catch (err){
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


module.exports = router;
