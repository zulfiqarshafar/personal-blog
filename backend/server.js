import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import path from "path";

import { port } from "./config/config.js";
import articleRouter from "./routes/ArticleRouter.js";
import categoryRouter from "./routes/CategoryRouter.js";
import imageRouter from "./routes/ImageRouter.js";
import userRouter from "./routes/UserRouter.js";

// app config
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.REACT_API_HOST],
    credentials: true,
  })
);

// mongoose.connection.once("open", () => {
//   console.log("DB Connected");
// });

app.use("/api/articles", articleRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/images", imageRouter);
app.use("/api/users", userRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
}

// listen
app.listen(port, () => console.log(`Listening on port :${port}`));
