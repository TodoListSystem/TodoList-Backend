const express = require("express");
const router = express.Router();
const { createTodo, getTodos } = require("../controllers/todosController");
router.post("/todo", createTodo);
router.get("/todo", getTodos);
module.exports = router;
