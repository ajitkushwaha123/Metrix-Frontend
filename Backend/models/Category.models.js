import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema({
  name: String,
  photo: {
    type : String,
    // required: true,
    // default:
    //   "https://res.cloudinary.com/drku1djt5/image/upload/v1630545255/No_Image_Available_qzq5gk.png",
  },
});

export const Category = mongoose.model("Category", CategorySchema);
