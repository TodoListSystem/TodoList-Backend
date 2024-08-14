const express = require("express");
const router = express.Router();
const {
  createTodo,
  getTodos,
  getSpaceficTodos,
} = require("../controllers/todosController");
router.post("/todo", createTodo);
router.get("/todo", getTodos);
router.get("/todo/:id", getSpaceficTodos);
module.exports = router;
