const express = require("express");
const router = express.Router();
const {
  createTodo,
  getTodos,
  getSpaceficTodos,
  upadateTodo,
} = require("../controllers/todosController");
router.post("/todo", createTodo);
router.get("/todo", getTodos);
router.get("/todo/:id", getSpaceficTodos);
router.put("/todo/:id", upadateTodo);
module.exports = router;
