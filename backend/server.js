import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { port } from "./config/config.js";
import articleRouter from "./routes/ArticleRouter.js";
import userRouter from "./routes/UserRouter.js";

// app config
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

mongoose.connection.once("open", () => {
  console.log("DB Connected");
});

app.use("/api/articles", articleRouter);
app.use("/api/users", userRouter);

// listen
app.listen(port, () => console.log(`listening on localhost:${port}`));
