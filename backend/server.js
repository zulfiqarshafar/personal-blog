import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { port } from "./config/config.js";
import articleRouter from "./routes/ArticleRouter.js";
import userRouter from "./routes/UserRouter.js";

// app config
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connection.once("open", () => {
  console.log("DB Connected");
});

app.use("/api/articles", articleRouter);
app.use("/api/users", userRouter);

// listen
app.listen(port, () => console.log(`listening on localhost:${port}`));
