const express = require("express");
const router = express.Router();

const authController = require("../controllers/user.controller");
const verifyAccessToken = require("../middlewares/token.middleware");

// Profile Route
router.get("/profile", verifyAccessToken, authController.getProfile);


module.exports = router;
