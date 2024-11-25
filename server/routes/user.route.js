const express = require("express");
const router = express.Router();

const authController = require("../controllers/user.controller");
const verifyAccessToken = require("../middlewares/token.middleware");
const authorize = require("../middlewares/authorize.middleware");

// User Profile Route (User)
router.get("/profile", verifyAccessToken, authorize("User"), authController.getProfile);

// All Profile Listing Route (Admin and Moderator)
router.get("/all-profile", verifyAccessToken, authorize("Admin", "Moderator"), authController.getAllProfile);

// Delete User Route (Admin)
router.delete("/profile/:userId", verifyAccessToken, authorize("Admin"), authController.deleteProfile); 


module.exports = router;
