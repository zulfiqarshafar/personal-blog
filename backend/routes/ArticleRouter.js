import express from "express";
import articleController from "../controllers/ArticleController.js";
import protect from "../middlewares/AuthMiddleware.js";

const articleRouter = express.Router();

// @route /articles
articleRouter.get("/published", articleController.get_published_articles);
articleRouter.get("/published/:id", articleController.get_published_article);
articleRouter.get(
  "/published/sibling/:id",
  articleController.get_sibling_published_article
);
articleRouter.get("/top", articleController.get_top_articles);
articleRouter.get("/", protect, articleController.get_articles);
articleRouter.get("/:id", protect, articleController.get_article);
articleRouter.post("/", protect, articleController.post_article);
articleRouter.put("/", protect, articleController.put_article);
articleRouter.delete("/:id", protect, articleController.delete_article);

export default articleRouter;
