const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/usersController");
router.post("/user/register", register);
router.post("/user/login", login);
router.post("/user/logout", logout);
module.exports = router;
