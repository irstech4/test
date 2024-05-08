const express = require("express");
const router = express.Router();

const verifyUser = require("../middleware/userVerify");

const authController = require("../controllers/authController");
const loginLimiter = require("../utils/rateLimiter");

router.post("/register", authController.register);
router.post("/login", loginLimiter, authController.login);
router.get("/user", verifyUser, authController.users);

module.exports = router;
