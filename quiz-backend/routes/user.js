const express = require("express");
const { login, register, logout, details } = require("../controllers/user");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/me", protect, details);

module.exports = router;
