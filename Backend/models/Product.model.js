import mongoose, { Schema } from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        productName : {
          type: String,
          // default: "",  
          required: true,
        },
        shortDescription: {
          type: String,
        },
        category: {type : String}, 
        price: {
          type: Number,
        },
        discountPrice: {
          type: Number,
        },
        stock: {
          type: Number,
        },
        longDescription: {
          type: String,
        },
        orderType: {
          type: String,
        },
        variant: {
          type: String,
        },
        photos : {type : Array},
      },
      { timestamps: true }
);

export const Product = mongoose.model('Product' , ProductSchema);