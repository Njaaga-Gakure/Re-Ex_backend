const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/");

class Auth {
  static async register(req, res) {
    const user = await User.create({ ...req.body });
    const token = user.createToken();
    res.status(StatusCodes.CREATED).json({
      user: {
        name: user.name,
        email: user.email,
        lastName: user.lastName,
        token,
      },
    });
  }

  static async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("Please provide email and password");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthenticatedError("Invalid credentials");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid credentials");
    }

    const token = user.createToken();
    res.status(StatusCodes.OK).json({
      user: {
        name: user.name,
        email: user.email,
        lastName: user.lastName,
        token,
      },
    });
  }
  static async updateUser(req, res) {
    const { name, email, lastName } = req.body;
    if (!name || !email || !lastName) {
      throw new BadRequestError("Please provide all fields");
    }
    const { userId } = req.user;
    const user = await User.findByIdAndUpdate({ _id: userId }, req.body, {
      new: true,
      runValidators: true,
    });
    const token = user.createToken();
    res.status(StatusCodes.OK).json({
      user: {
        name: user.name,
        email: user.email,
        lastName: user.lastName,
        token,
      },
    });
  }
}

module.exports = Auth;
