import express from "express";
import categoryController from "../controllers/CategoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.get_categories);

export default categoryRouter;
