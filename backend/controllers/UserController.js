import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userController = {};

// @desc    Get one user.
// @route   GET /users
userController.get_user = async (req, res) => {
  const { _id, username } = await Users.findById(req.user.id);

  res.status(200).send({ id: _id, username });
};

// @desc    Register user.
// @route   POST /users/register
userController.post_register_user = async (req, res) => {
  const { username, password } = req.body;

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  Users.create(
    {
      username,
      password: hashedPassword,
    },
    function (err, user) {
      if (err) res.status(500).send(err);

      res.status(201).send({
        _id: user.id,
        username: user.username,
        accessToken: generateAccessToken(user.id),
      });
    }
  );
};

// @desc    Authenticate user.
// @route   POST /users/login
userController.post_login_user = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ username });
    if (!user) return res.sendStatus(400);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.sendStatus(401);

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      path: "/api/users",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      username: user.username,
      accessToken: accessToken,
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

// @desc    Logout user.
// @route   POST /users/logout
userController.post_logout_user = async (req, res) => {
  const refreshToken = req.cookies.refreshtoken;
  if (!refreshToken) return res.status(400);

  const user = await Users.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshtoken", {
      path: "/api/users",
    });

    return res.send(204);
  }

  user.refreshToken = "";
  await user.save();

  res.clearCookie("refreshtoken", { path: "/api/users" });
  res.status(200).json("Logged out");
};

// @DESC    Refresh user token.
// @ROUTE   POST /users/refresh-token
userController.post_refresh_token = async (req, res) => {
  const oldRefreshToken = req.cookies.refreshtoken;
  if (!oldRefreshToken) return res.sendStatus(401);
  res.clearCookie("refreshtoken", { path: "/api/users" });

  const user = await Users.findOne({ refreshToken: oldRefreshToken });

  if (!user) {
    jwt.verify(
      oldRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.sendStatus(403);
        const hackedUser = await Users.findOne({ id: decoded.id });
        hackedUser.refreshToken = "";
        await hackedUser.save();
      }
    );
    return res.sendStatus(403);
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshtoken", refreshToken, {
    httpOnly: true,
    path: "/api/users",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(201).send({ accessToken: accessToken });
};

// Generate access token
const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

// Generate refresh token
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export default userController;
