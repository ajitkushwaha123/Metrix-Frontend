import { Order } from "../models/Order.models.js";
import Auth from "../middleware/auth.js";
import express from "express";

const orders = express();

// Create a new Order
orders.post("/", Auth, async (req, res) => {
  try {
    const { userId } = req.user;
    const { products , newCustomer , quantity , customerName , paymentType , price , phone , status , orderNote} = req.body;
    const newOrder = new Order({
      userId,
      products,
      quantity,
      newCustomer,
      customerName,
      phone,
      paymentType,
      price,
      status,
      orderNote,
    });
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    console.error("Error saving Order:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update
orders.put("/:id", Auth, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
orders.delete("/:id", Auth, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Orders
orders.get("/find/:orderId", Auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    res.status(200).json(order);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: err.message });
  }
});


// Get all orders
orders.get("/:userId", Auth, async (req, res) => {
  try {
    const orders = await Order.find( {
      userId: req.params.userId
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get monthly income
orders.get("/income", Auth, async (req, res) => {
  const previousMonth = new Date();
  previousMonth.setMonth(previousMonth.getMonth() - 1);

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$amount" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default orders;