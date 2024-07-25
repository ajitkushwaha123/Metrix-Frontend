import { Customer } from "../models/Customer.model.js";
import Auth from "../middleware/auth.js";
import express from "express";

const customers = express();

// Create a new Customer
customers.post("/", Auth, async (req, res) => {
  try {
    const { userId } = req.user;
    console.log(userId);
    const { customerName, phone, imageColor , OrderPrice, status , customerImage, order } = req.body;
    const newCustomer = new Customer({
      userId: userId,
      phone,
      OrderPrice,
      imageColor,
      customerImage,
      customerName,
      status,
      order,
    });
    const savedCustomer = await newCustomer.save();
    res.status(200).json(savedCustomer);
  } catch (err) {
    console.error("Error saving Customer:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update
customers.put("/:id", Auth, async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCustomer);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
customers.delete("/:id", Auth, async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json("Customer has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Customers
customers.get("/find/:Id", Auth, async (req, res) => {
  try {
    console.log(req.params.Id);
    const customer = await Customer.findById(req.params.Id);
    res.status(200).json(customer);
  } catch (err) {
    console.error("Error fetching customers:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch customers", error: err.message });
  }
});

// Get all customers
customers.get("/", Auth, async (req, res) => {
  try {
    console.log(req.user.userId);
    const customers = await Customer.find({ userId: req.user.userId });
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get monthly income
customers.get("/income", Auth, async (req, res) => {
  const previousMonth = new Date();
  previousMonth.setMonth(previousMonth.getMonth() - 1);

  try {
    const income = await Customer.aggregate([
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

export default customers;
