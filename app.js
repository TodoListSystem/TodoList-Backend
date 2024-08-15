const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const databaseConnection = require("./configs/dataBaseConnection");
const todos = require("./routes/todosRoutes");
const user = require("./routes/userRoutes");
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
databaseConnection();
app.use("/api/todolist", todos);
app.use("/api/todolist", user);

PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`server ${PORT} portuna baglandi`);
});
