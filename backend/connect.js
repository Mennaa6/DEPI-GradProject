const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
