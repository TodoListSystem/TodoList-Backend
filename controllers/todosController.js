const asyncHandler = require("express-async-handler");
const joi = require("joi");
const ModelTodos = require("../models/Todos");

const validateCreateTodo = (obj) => {
  const schema = joi.object({
    baslik: joi.string().required().min(3).max(255),
    icerik: joi.string().max(255),
    note: joi.string().max(255),
    yapildi: joi.boolean().default(false),
  });
  return schema.validate(obj);
};
const createTodo = asyncHandler(async function (req, res) {
  const { error } = validateCreateTodo(req.body);
  let todo = await ModelTodos.findOne({ baslik: req.body.baslik });

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  if (todo) {
    return res.status(400).json({ msg: "baslik unique olamsi gerekiyor" });
  }
  todo = new ModelTodos({
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
  res.status(200).json(todos);
});
module.exports = {
  createTodo,
  getTodos,
};
