import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  name: { type: String },
  phone: { type: Number },
  address: { type: String },
  profile: { type: String },
  city: {type  : String},
});

// Export the model correctly
export default mongoose.model("User", UserSchema);
