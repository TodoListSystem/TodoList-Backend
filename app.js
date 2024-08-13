const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const databaseConnection = require("./configs/dataBaseConnection");
const app = express();

app.use(cors());

dotenv.config();

databaseConnection();

app.get("/todo/api", function (req, res) {
  res.status(200).json({ message: "todo list " });
});

PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`sever ${PORT} portuna baglandi`);
});
