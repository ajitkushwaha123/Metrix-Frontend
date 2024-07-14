import { Product } from "../models/Product.model.js";
import Auth from "../middleware/auth.js";
import express from "express";

const products = express();

// Create a new product
products.post("/", Auth, async (req, res) => {
  try {
    const { title, shortDescription, category, price, stock } = req.body;
    const newProduct = new Product({
      title,
      shortDescription,
      category,
      price,
      stock,
    });
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    console.error("Error saving product:", err); // Log the error
    res.status(500).json({ error: "Internal Server Error" }); // Return an informative response
  }
});

//Update
products.put("/:id", Auth, async (req, res) => {
  // const newProduct = new Product(req.body);

  try {
    const updatedProduct = await product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete
products.delete("/:id", Auth, async (req, res) => {
  // const newProduct = new Product(req.body);

  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Products
products.get("/find/:id", Auth, async (req, res) => {
  //   const newProduct = new Product(req.body);

  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

products.get("/", Auth, async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      // Fetch the latest 5 products based on creation date
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      // Fetch products based on the specified category
      products = await Product.find({
        category: {
          $in: [qCategory],
        },
      });
    } else {
      // Fetch all products
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default products;
