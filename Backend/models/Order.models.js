import mongoose, { Schema } from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    productName : {
      type: String,
    },
    newCustomer: {
      type: Boolean,
      default: false,
    },
    paymentType: { type: String },
    orderType: { type: String },
    amount: { type: Number },
    address: { type: Object },
    status: {
      type: String,
      default: "pending",
    },
    orderNote: { type: String },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", OrderSchema);
