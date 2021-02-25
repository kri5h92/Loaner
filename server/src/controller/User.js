const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const _getHashedPassword = async (password) => {
  try {
    const saltRound = 10;
    return await bcrypt.hash(password, saltRound);
  } catch (err) {
    console.error("Error hashing the password", err);
  }
};

const _createToken = async (userRole) => {
  try {
    const payload = { userRole };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: "2d" };

    return await jwt.sign(payload, secret, options);
  } catch (err) {
    console.error(err);
  }
};

/**
 * GET /user
 * Return the user data
 */
exports.getUser = async (req, res) => {
  let result = {};
  let status = 200;

  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    result.data = user;
    result.status = status;
    res.status(status).json(result);
  } catch (err) {
    console.error(err);

    status = 500;
    result.status = status;
    result.error = err;
    res.status(status).json(result);
  }
};

/**
 * GET /users
 * Return all users from database
 */
exports.getUsers = async (req, res) => {
  let result = {};
  let status = 200;

  try {
    const payload = req.decoded;

    if (payload && payload.userRole === "admin") {
      const users = [...(await User.find({}))];

      result.data = users;
      result.status = status;
      res.status(status).json(result);
    } else {
      status = 401;
      result.status = status;
      result.error = "Authentication error";
      res.status(status).json(result);
    }
  } catch (err) {
    console.error(err);

    status = 500;
    result.status = status;
    result.error = err;
    res.status(status).json(result);
  }
};

/**
 *  GET /login
 *  login using email and password
 */
exports.getLogin = async (req, res) => {
  let result = {};
  let status = 200;
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      //validate passoword
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        //Create a token
        const accessToken = await _createToken(user.role);

        // Update newly generated token in db
        await User.findByIdAndUpdate(user._id, { accessToken });

        result.data = user;
        result.status = status;
      } else {
        status = 401;
        result.status = status;
        result.error = "Authentication error";
      }
      res.status(status).json(result);
    } else {
      status = 404;
      result.status = status;
      result.error = "User not found";
      res.status(status).json(result);
    }
  } catch (err) {
    console.error(err);

    status = 500;
    result.status = status;
    result.error = err;
    res.status(status).json(result);
  }
};

/**
 *  POST /signup
 *  Create a new user account
 */
exports.postSignup = async (req, res) => {
  let result = {};
  let status = 201;

  try {
    let { firstName, lastName, password, email, role } = req.body;
    password = await _getHashedPassword(password);
    role = role || "customer";

    const newUser = new User({ firstName, lastName, email, password, role });

    //Create a token
    const accessToken = await _createToken(newUser.role);
    newUser.accessToken = accessToken;

    //save user
    await newUser.save();

    result.status = status;
    result.data = newUser;
    res.status(status).json(result);
  } catch (err) {
    console.error(err);

    status = 500;
    result.status = status;
    result.error = err;
    res.status(status).json(result);
  }
};
