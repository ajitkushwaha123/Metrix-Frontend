import mongoose, { Schema } from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        _id : mongoose.Schema.Types.ObjectId,
        title: {
          type: String,
          default : "dummy",
          required: true,
        },
        shortDescription: {
          type: String,
        //   required: true,
        },
        category: [String], // Assuming category is an array of strings
        price: {
          type: Number,
        },
        discountPercentage: {
          type: Number,
        },
        stock: {
          type: Number,
        },
        longDescription: {
          type: String,
        },
        images : [
          {
            type : Array,
          },
        ],
      },
      { timestamps: true }
);

export const Product = mongoose.model('Product' , ProductSchema);