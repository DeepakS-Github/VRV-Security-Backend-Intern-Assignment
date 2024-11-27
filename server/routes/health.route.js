const express = require("express");
const router = express.Router();

const healthController = require("../controllers/health.controller");

// Health Check Route
router.get("/", healthController.healthCheck);

module.exports = router;
