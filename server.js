const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;

// -- routes

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/te", (req, res) => {
  res.send("Hello Teteco!");
});

mongoose
  .connect(
    "mongodb+srv://root69:root69@cluster0.hduktsv.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to Mongo DB");
    app.listen(port, () => {
      console.log(`NODE API is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
