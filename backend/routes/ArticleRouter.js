import express from "express";
import articleController from "../controllers/ArticleController.js";
import protect from "../middlewares/AuthMiddleware.js";

const articleRouter = express.Router();

articleRouter.get("/", articleController.get_articles);
articleRouter.get("/top", articleController.get_top_articles);
articleRouter.post("/", protect, articleController.post_article);
// articleRouter.put("/", protect, articleController.post_article);

export default articleRouter;
