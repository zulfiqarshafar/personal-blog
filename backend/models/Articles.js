import mongoose from "mongoose";

const instance = mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: String,
    publishedAt: { type: Date, default: undefined },
    isPublished: { type: Boolean, default: false },
    viewCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Articles = mongoose.model("articles", instance);

export default Articles;
