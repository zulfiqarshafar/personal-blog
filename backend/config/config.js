import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// const env = process.env.NODE_ENV;

const connectionString = process.env.MONGODB_URL;
mongoose.connect(connectionString);

export const port = process.env.PORT || 8080;
