const express = require("express");
require("dotenv").config();

const app = express();
const connectDB = require("./connect");

const cors = require("cors");

const router = require("./routes/products");

app.use(cors());
//initiate a middleware
app.use(express.json());

app.use("/api/products", router);

//start the server if only the connection of the database succeeded
const start = async () => {
  try {
    await connectDB(process.env.DB);
    app.listen(process.env.PORT, () => {
      console.log("server started");
    });
  } catch (err) {
    console.log(err);
  }
};

start();
