const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const databaseConnection = require("./configs/dataBaseConnection");
const app = express();
const todos = require("./routes/todosRoutes");
dotenv.config();
app.use(cors());
app.use(express.json());
databaseConnection();
app.use("/api/todolist", todos);

app.get("/api/todolist", function (req, res) {
  res.status(200).json({ message: "todo list " });
});

PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`sever ${PORT} portuna baglandi`);
});
