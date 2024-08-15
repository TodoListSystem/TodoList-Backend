const asyncHandler = require("express-async-handler");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const ModelTodos = require("../models/Todos");
const ModelUsers = require("../models/User");
const validateCreateTodo = (obj) => {
  const schema = joi.object({
    baslik: joi.string().required().min(3).max(255),
    icerik: joi.string().max(255),
    note: joi.string().max(255),
    yapildi: joi.boolean().default(false),
  });
  return schema.validate(obj);
};
const validateUpdatedTodo = (obj) => {
  const schema = joi.object({
    baslik: joi.string().max(255),
    icerik: joi.string().max(255),
    note: joi.string().max(255),
    yapildi: joi.boolean().default(false),
  });
  return schema.validate(obj);
};
const createTodo = asyncHandler(async function (req, res) {
  const { error } = validateCreateTodo(req.body);

  let todo = await ModelTodos.findOne({ baslik: req.body.baslik });
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ msg: "senin tokenin yok token yapman gerekiyor" });
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    payload = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return res
      .status(401)
      .json({ msg: "Geçersiz token lutfen tekrar login olabilirmisiniz" });
  }

  const user = await ModelUsers.findById(payload.userId);
  if (!user) {
    return res.status(401).json({
      msg: "senin token ona karsilik bir user yok tekrar register olabilirmisin",
    });
  }
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  if (todo) {
    return res.status(400).json({ msg: "baslik unique olamsi gerekiyor" });
  }

  todo = new ModelTodos({
    userId: payload.userId,
    baslik: req.body.baslik,
    icerik: req.body.icerik,
    note: req.body.note,
    yapildi: req.body.yapildi,
  });
  const result = await todo.save();
  return res.status(201).json(result);
});

const getTodos = asyncHandler(async function (req, res) {
  const todos = await ModelTodos.find();
  return res.status(200).json(todos);
});
const getSpaceficTodos = asyncHandler(async function (req, res) {
  const todo = await ModelTodos.findById(req.params.id);
  if (!todo) {
    return res.status(404).json({ msg: "todo bulunamadi" });
  }
  return res.status(200).json(todo);
});

const upadateTodo = asyncHandler(async function (req, res) {
  const { error } = validateUpdatedTodo(req.body);
  let todo = await ModelTodos.findById(req.params.id);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  if (!todo) {
    return res.status(404).json({ msg: "todo bulunamadi" });
  }
  todo = await ModelTodos.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        baslik: req.body.baslik,
        icerik: req.body.icerik,
        note: req.body.note,
        yapildi: req.body.yapildi,
      },
    },
    { new: true }
  );
  return res.status(200).json(todo);
});
const deleteTodo = asyncHandler(async function (req, res) {
  let todo = await ModelTodos.findById(req.params.id);
  if (!todo) {
    return res.status(404).json({ msg: "todo bulunamadi" });
  }
  todo = await ModelTodos.findByIdAndDelete(req.params.id);
  return res.status(200).json({ msg: "todo silindi", deleteTodo: todo });
});
module.exports = {
  createTodo,
  getTodos,
  getSpaceficTodos,
  upadateTodo,
  deleteTodo,
};
