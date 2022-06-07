import jwt from "jsonwebtoken";
import Users from "../models/Users.js";

const protect = async (req, res, next) => {
  const authorization =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer");
  if (!authorization) return res.status(401).send("Need to login!");

  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).send("Unauthorized!");

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = await Users.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send("Invalid authorization!");
  }
};

export default protect;
