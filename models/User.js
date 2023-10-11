const { Schema, model } = require("mongoose");
const { genSalt, hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 3,
  },
});

UserSchema.pre("save", async function () {
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

UserSchema.methods.createToken = function () {
  return sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFESPAN,
  });
};

UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await compare(userPassword, this.password);
  return isMatch;
};
module.exports = model("User", UserSchema);
