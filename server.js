const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/productModel.js");
const port = 3000;

// -- para a aplicação ver tipos json
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// -- routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/te", (req, res) => {
  res.send("Hello Teteco!");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findById(id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// -- update a product
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    // -- if cannot find product in DB
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID: ${id}` });
    }
    const updateProduct = await Product.findById(id);
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// -- delete
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID: ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
