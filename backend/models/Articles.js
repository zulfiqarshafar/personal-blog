import mongoose from "mongoose";

const instance = mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "categories" }],
    content: { type: String, required: true, trim: true },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date, default: undefined },
    viewCount: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: undefined },
  },
  {
    timestamps: true,
  }
);

const Articles = mongoose.model("articles", instance);

export default Articles;
