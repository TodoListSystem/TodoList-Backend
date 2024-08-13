const express = require("express");
const app = express();

app.get("/todo/api", function (req, res) {
  res.status(200).json({ message: "todo list" });
});

PORT = 5000;
app.listen(PORT, function () {
  console.log(`sever ${PORT} portuna baglandi`);
});
