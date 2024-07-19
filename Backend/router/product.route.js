import { Product } from "../models/Product.model.js";
import Auth from "../middleware/auth.js";
import express from "express";
import { v2 as cloudinary } from "cloudinary";
import { upload } from "../middleware/multer.js";

const products = express();

// Create a new product
products.post("/", upload.array("photos", 4), Auth, async (req, res) => {
  try {
    const {
      productName,
      discountPrice,
      orderType,
      longDescription,
      variant,
      shortDescription,
      category,
      price,
      stock,
      // photos,
    } = req.body;
    
    console.log(req.body);

    // console.log("req.files", req.files);

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        cloudinary.uploader.upload(file.path)
      );
      const results = await Promise.all(uploadPromises);
      console.log("results", results);

      const photoUrls = results.map((result) => result.url);

      const newProduct = new Product({
        productName,
        discountPrice, 
        orderType,
        longDescription,
        variant,
        shortDescription,
        category,
        price,
        stock,
        photos: photoUrls, // Store array of photo URLs
      });

      console.log("newProduct", newProduct);

      console.log("newProduct", newProduct);
      const savedProduct = await newProduct.save();
      console.log("savedProduct", savedProduct);
      res.status(200).json(savedProduct);
    } else {
      res.status(400).json({ error: "No photos uploaded" });
    }
  } catch (err) {
    console.error("Error saving product:", err);
    res.status(500).json({ error: err.message });
  }
});

//Update
products.put("/:id", upload.array("photos"), Auth, async (req, res, next) => {
  const { id } = req.params; // Corrected destructuring

  console.log(id);
  console.log(req.body);

  if (req.files && req.files.length > 0) {
    try {
      const uploadPromises = req.files.map((file) =>
        cloudinary.uploader.upload(file.path)
      );
      const results = await Promise.all(uploadPromises);
      console.log("results", results);

      const photoUrls = results.map((result) => result.url);
      req.body.photos = photoUrls; // Add photo URLs to the request body
      console.log("body", req.body);
    } catch (error) {
      return res.status(500).json({ error: "Error uploading photos" });
    }
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    console.log("updatedProduct", updatedProduct);
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
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
products.get("/:id", Auth, async (req, res) => {
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
