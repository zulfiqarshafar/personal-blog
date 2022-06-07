import express from "express";
import userController from "../controllers/UserController.js";
import protect from "../middlewares/AuthMiddleware.js";

const userRouter = express.Router();

userRouter.post("/login", userController.post_login_user);
userRouter.post("/register", userController.post_register_user);
userRouter.post("/logout", userController.post_logout_user);
userRouter.post("/refresh-token", userController.post_refresh_token);
userRouter.get("/", protect, userController.get_user);

export default userRouter;
