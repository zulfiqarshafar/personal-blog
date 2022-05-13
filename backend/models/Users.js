import mongoose from "mongoose";

const instance = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", instance);

export default User;
