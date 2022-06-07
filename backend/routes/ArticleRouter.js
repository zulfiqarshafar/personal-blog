import express from "express";
import articleController from "../controllers/ArticleController.js";
import protect from "../middlewares/AuthMiddleware.js";
import upload from "../middlewares/UploadFileMiddleware.js";

const articleRouter = express.Router();

articleRouter.get("/published", articleController.get_published_articles);
articleRouter.get("/top", articleController.get_top_articles);
articleRouter.get("/:id", protect, articleController.get_article);
articleRouter.delete("/:id", protect, articleController.delete_article);
articleRouter.get("/", protect, articleController.get_articles);
articleRouter.post("/", protect, articleController.post_article);
articleRouter.put("/", protect, articleController.put_article);
articleRouter.post(
  "/images",
  protect,
  upload.single("image"),
  articleController.post_image
);

export default articleRouter;
