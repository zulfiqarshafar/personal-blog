import mongoose from "mongoose";

const instance = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  total: { type: Number, default: 1 },
});

const Categories = mongoose.model("categories", instance);

export default Categories;
