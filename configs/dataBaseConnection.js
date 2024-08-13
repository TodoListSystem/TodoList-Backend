const mongoose = require("mongoose");

const databaseConnection = () => {
  mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
      console.log(`dataBase baglanmayi tamamlandi`);
    })
    .catch(() => {
      console.log("dataBase baglanmada bir hata oldu");
    });
};

module.exports = databaseConnection;
