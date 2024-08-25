const axios = require("axios");

// POST isteği için veri ve yapılandırma
const postData = {
  email: "firass.hus@gmail.com",
  password: "12345",
};

axios
  .post("http://localhost:5000/api/todolist/user/login", postData)
  .then((response) => {
    // Yanıtın durum kodunu ve verisini konsola yazdırma
    console.log(response);
  })
  .catch((error) => {
    if (error.response) {
      // Yanıt alındı, ancak durum kodu hata olabilir
      console.error("Error Status:", error.response.status);
      console.error("Error Data:", error.response.data);
    } else {
      // Yanıt alınamadı, ağ hatası veya başka bir sorun
      console.error("Error Message:", error.message);
    }
  });
