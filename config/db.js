const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true
    })
    .then(() => console.log("MongoDB is connected"))
    .catch(err => console.log("error"));
};

module.exports = connectDB;
