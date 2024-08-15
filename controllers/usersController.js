const joi = require("joi");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/User");
const todosModel = require("../models/Todos");
const validationRegisterUser = (obj) => {
  const schema = joi.object({
    firstName: joi.string().trim().required(),
    lastName: joi.string().trim().required(),
    userName: joi.string().trim().required(),
    email: joi.string().trim().required().pattern(/.+@.+/).min(3).max(50),
    password: joi.string().trim().required(),
  });
  return schema.validate(obj);
};
const validationLoginUser = (obj) => {
  const schema = joi.object({
    firstName: joi.string().trim(),
    lastName: joi.string().trim(),
    userName: joi.string().trim(),
    email: joi.string().trim().pattern(/.+@.+/).min(3).max(50).required(),
    password: joi.string().trim().required(),
  });
  return schema.validate(obj);
};
const register = asyncHandler(async function (req, res) {
  const { error } = validationRegisterUser(req.body);
  let user = await userModel.findOne({ email: req.body.email });
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  if (user) {
    return res.status(400).json({ msg: "email unique olamsi gerekiyor" });
  }
  user = new userModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });
  const result = await user.save();
  const token = jwt.sign({ userId: result._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRECE,
  });

  return res.status(201).json({ result, token });
});

const login = asyncHandler(async function (req, res) {
  const { error } = validationLoginUser(req.body);
  const userEmail = await userModel.findOne({ email: req.body.email });
  const userPassword = await userModel.findOne({ password: req.body.password });
  const user = await userModel.findOne({ email: req.body.email });
  let todos = await todosModel.find({ userId: user._id });
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  if (!userEmail) {
    return res.status(401).json({ msg: "emailiniz yada sifreniz yanlis" });
  }
  if (!userPassword) {
    return res.status(401).json({ msg: "emailiniz yada sifreniz yanlis" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRECE,
  });
  return res.status(200).json({ user, token, todos });
});

const logout = asyncHandler(async function (req, body) {
  return res.status.json({ user: "logout yapildi" });
});
module.exports = {
  register,
  login,
  logout,
};
