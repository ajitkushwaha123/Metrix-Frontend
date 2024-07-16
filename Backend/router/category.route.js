import express from "express";
import Auth from "../middleware/auth.js"; // Make sure to import your middleware
import mongoose from "mongoose";
import { Category } from "../models/Category.models.js";
import { v2 as cloudinary } from "cloudinary";
import { upload } from "../middleware/multer.js";

cloudinary.config({
  cloud_name: "drku1djt5",
  api_key: "346414787548979",
  api_secret: "FvALE4F1Cs0Xi1MG0bs0vvCuX7U",
});

const category = express();

category.post("/", upload.single("photo"), Auth, async (req, res, next) => {
  try {
    console.log("hi" , req.file);
    if (req.file) {
      const filePath = req.file.path;
      const result = await cloudinary.uploader.upload(req.file.path);
      // res.status(200).send(result.url);
      const newCategory = new Category({
        name: req.body.name,
        photo: result.url,
      });
      await newCategory.save();
      res.status(200).json({
        category: newCategory,
      });
    } else {
    //   const newCategory = new Category({
    //     name: req.body.name,
    //   });
    //   await newCategory.save();
    //   res.status(200).json({
    //     category: newCategory,
    //   });

    //   console.log("Category added successfully:", newCategory);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

// GET all categories
category.get("/", Auth, (req, res, next) => {
  Category.find()
    .select("_id name photo")
    .then((result) => {
      res.status(200).json({
        category: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//get single category by id
category.get("/:id", Auth, (req, res, next) => {
  const _id = req.params.id;
  Category.findById(_id)
    .select("_id name photo")
    .then((result) => {
      // console.log(result)
      res.status(200).json({
        category: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// update
category.put("/:id", upload.single("photo"), Auth, async (req, res, next) => {
  console.log(req.params.id);
  const file = req.file;
  console.log(file);
      const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
    Category.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          photo: result.url,
        },
      }
    )
      .then((result) => {
        res.status(200).json({
          updated_category: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  // });
});

// category.put("/:id", Auth, (req, res, next) => {
//   console.log(req.params.id); // Log the category ID from the URL parameter
//   const file = req.files.photo; // Get the uploaded photo file
//   console.log(file); // Log the file details
//   cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({
//         error: err,
//       });
//     }
//     // Update the category in the database
//     Category.findOneAndUpdate(
//       { _id: req.params.id }, // Find the category by its ID
//       {
//         $set: {
//           name: req.body.name, // Update the name
//           photo: result.url, // Update the photo URL
//         },
//       },
//       { new: true } // Return the updated document
//     )
//       .then((updatedCategory) => {
//         res.status(200).json({
//           updated_category: updatedCategory,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json({
//           error: err,
//         });
//       });
//   });
// });

category.delete("/", Auth, async (req, res, next) => {
  try {
    const imageUrl = decodeURIComponent(req.query.imageUrl);
    const urlArray = imageUrl.split("/");
    const image = urlArray[urlArray.length - 1];
    const imageName = image.split(".")[0];

    // Validate categoryId (ensure it's a valid ObjectId)
    const categoryId = req.query.id;
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    // Remove the category
    await Category.findByIdAndDelete(categoryId);

    // Destroy the image on Cloudinary
    await cloudinary.uploader.destroy(imageName);

    res.status(200).json({ message: "Category removed successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default category;
