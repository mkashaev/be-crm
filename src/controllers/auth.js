const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../modules/User");
const keys = require("../../config/keys");
const errorHandler = require("../utils/errorHandler");

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const candidate = await User.findOne({ email });
  if (candidate) {
    const passwordResult = bcrypt.compare(password, candidate.password);
    if (passwordResult) {
      const token =
        "Bearer " +
        jwt.sign(
          {
            email: candidate.email,
            userId: candidate._id,
          },
          keys.JWT,
          { expiresIn: 60 * 60 }
        );
      res.status(200).json({ token });
    } else {
      res.status(401).json({
        message: "Auth failed",
      });
    }
  } else {
    res.status(404).json({
      message: "Not found",
    });
  }
};

module.exports.register = async (req, res) => {
  const { email, password } = req.body;
  const candidate = await User.findOne({ email });

  if (candidate) {
    res.status(409).json({
      message: "Already exists",
    });
  } else {
    const salt = bcrypt.genSaltSync(10);

    const user = new User({ email, password: bcrypt.hashSync(password, salt) });

    try {
      await user.save();
      res.status(201).json({
        message: "User is created",
      });
    } catch (err) {
      errorHandler(res, err);
    }
  }
};
