import express from "express";
import imageController from "../controllers/ImageController.js";
import protect from "../middlewares/AuthMiddleware.js";
import upload from "../middlewares/UploadFileMiddleware.js";

const imageRouter = express.Router();

imageRouter.post(
  "/",
  protect,
  upload.single("image"),
  imageController.post_image
);

export default imageRouter;
