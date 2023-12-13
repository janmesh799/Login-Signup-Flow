const json = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../Models/User");
const secretKey = process.env.SECRET_KEY;

const Signup = async (req, res) => {
  let errorCode = null;
  try {
    let { firstName, lastName, username, email, password } = req.body;
    let alreadyUser = await User.findOne({ email: email.toLowerCase() });
    if (alreadyUser) {
      errorCode = 409;
      throw new Error("Account with same email already exists.");
    }
    alreadyUser = null;
    alreadyUser = await User.findOne({ username: username.toLowerCase() });
    if (alreadyUser) {
      errorCode = 409;
      throw new Error("Account with same username already exists.");
    }
    const securedPassword = bcrypt.hashSync(password, 10);
    const user = new User({
      email: email.toLowerCase(),
      firstName: firstName,
      lastName: lastName,
      username: username.toLowerCase(),
      password: securedPassword,
    });
    await user
      .save()
      .then((user) => {
        const data = {
          firstName,
          lastName,
          email: email.toLowerCase(),
          userId: user._id,
        };
        const authToken = json.sign(data, secretKey);
        res.status(201).json({
          success: true,
          message: "User created successfully.",
          authToken,
          user,
        });
      })
      .catch((err) => {
        errorCode = 500;
        throw new Error(err.message);
      });
  } catch (err) {
    res.status(errorCode || 500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
module.exports = Signup;
