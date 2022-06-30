import mongoose from "mongoose";

// const env = process.env.NODE_ENV;

const connectionString = process.env.MONGODB_URL;
mongoose.connect(connectionString);

export const port = process.env.PORT || 8080;
