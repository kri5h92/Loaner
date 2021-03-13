const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateLoginInputs } = require("../validation/login");
const { validateSignUpInputs } = require("../validation/signUp");

const _getHashedPassword = async (password) => {
  try {
    if (password) {
      const saltRound = 10;
      return await bcrypt.hash(password, saltRound);
    } else {
      throw new Error("password is undefined");
    }
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
 * GET /user/:id
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

    if (payload) {
      if (payload.userRole !== "admin") {
        const users = [...(await User.find({}))];

        result.data = users;
        result.status = status;
        res.status(status).json(result);
      } else {
        status = 403;
        result.status = status;
        result.error = "Only admin can access this resource";
        res.status(status).json(result);
      }
    } else {
      status = 400;
      result.status = status;
      result.errors = [
        {
          title: "Bad Request",
          message: "Payloads are invalid",
        },
      ];
      res.status(status).json(result);
    }
  } catch (err) {
    console.error(err);

    status = 500;
    result.status = status;
    result.errors = [
      {
        title: "Server error",
        message: "You may try again or wait till the error get resolve.",
      },
    ];
    res.status(status).json(result);
  }
};

/**
 *  POST /login
 *  login using email and password
 */
exports.postLogin = async (req, res) => {
  let result = {};
  let status = 201;

  try {
    // Validation check
    const { isValid, errors } = validateLoginInputs(req.body);
    if (!isValid) {
      status = 422;
      result.errors = errors;
      return res.status(status).json(result);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      //validate passoword
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        //Create a token
        const accessToken = await _createToken(user.role);

        // Update newly generated token in db
        await User.findByIdAndUpdate(user._id, { access_token: accessToken });

        const { _id, type, full_name, role, access_token } = user;
        result.data = [{ _id, type, full_name, role, access_token }];
      } else {
        status = 401;
        result.errors = [
          {
            title: "Authentication error",
            message: "User password is invalid",
          },
        ];
      }
      res.status(status).json(result);
    } else {
      status = 401;
      result.errors = [
        {
          title: "Authentication error",
          message: "Provided email id is not registered",
        },
      ];
      res.status(status).json(result);
    }
  } catch (err) {
    console.error(err);

    status = 500;
    result.errors = [
      {
        title: "Server error",
        message: "You may try again or wait till the error get resolve.",
      },
    ];
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
    // Validation check
    const { isValid, errors } = validateSignUpInputs(req.body);
    if (!isValid) {
      status = 422;
      result.errors = errors;
      return res.status(status).json(result);
    }

    let { first_name, last_name, password, email, role } = req.body;
    password = await _getHashedPassword(password);
    role = role || "customer";

    const newUser = new User({ first_name, last_name, email, password, role });

    //Create a token
    const accessToken = await _createToken(newUser.role);
    newUser.accessToken = accessToken;

    //save user
    await newUser.save();

    const { _id, type } = newUser;
    result.data = [{ _id, type }];
    res.status(status).json(result);
  } catch (err) {
    console.error(err);

    if (err.name === "ValidationError") {
      status = 422;
      result.errors = [{ ...err.errors }];
    } else {
      status = 500;
      result.errors = [
        {
          title: "Server error",
          message: "You may try again or wait till the error get resolve.",
        },
      ];
    }
    res.status(status).json(result);
  }
};

/**
 *  DELETE /user/:id
 *  Delet the user account
 */
exports.deleteAccount = async (req, res) => {
  let result = {};
  let status = 204;

  try {
    const payload = req.decoded;
    if (payload) {
      if (payload.userRole !== "admin") {
        const { id } = req.params;
        const {deletedCount} = await User.deleteOne({ _id: id });
        if (deletedCount) {
          result.data = {};
          result.status = status;
        } else {
          status = 400;
          result.errors = [
            {
              title: "Bad Request",
              message: "No user found for provided id",
            },
          ];
        }
      } else {
        status = 403;
        result.status = status;
        result.error = "Only admin can delete the resource";
      }
    } else {
      status = 400;
      result.status = status;
      result.errors = [
        {
          title: "Bad Request",
          message: "Provided payloads are invalid",
        },
      ];
    }
  } catch (err) {
    console.error(err);
    status = 500;
    result.errors = [
      {
        title: "Server error",
        message: "You may try again or wait till the error get resolve.",
      },
    ];
  }
  return res.status(status).json(result);
};
