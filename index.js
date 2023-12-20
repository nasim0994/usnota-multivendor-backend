const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const port = process.env.port || 5000;


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));


// Connect Database
mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Database connection is successful");
});



app.get("/", (req, res) => {
  res.send(`Server is Running on port ${port}`);
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});