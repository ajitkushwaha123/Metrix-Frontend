import mongoose, { Schema } from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        title: {
          type: String,
          default : "dummy",
          required: true,
        },
        shortDescription: {
          type: String,
        },
        category: {type : Array}, 
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
        images : {type : String},
      },
      { timestamps: true }
);

export const Product = mongoose.model('Product' , ProductSchema);