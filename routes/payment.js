const express = require("express");
const router = express.Router();
const Controller = require("../controllers/payment");

// Create
router.post("/payment", Controller.payment);

module.exports = router;
