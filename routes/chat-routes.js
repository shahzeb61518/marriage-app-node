const express = require("express");
const router = express.Router();
const Controller = require("../controllers/chat-controller");

// Create
router.post("/create", Controller.create);

// get
router.post("/get", Controller.get);

// update
router.post("/update", Controller.update);

// update
router.post("/getchat", Controller.getPreChat);

router.post("/getusers", Controller.getUserChat);

// get blog by user id
router.post("/get-by-user-id", Controller.getById);

// delete
router.post("/delete", Controller.delete);
// router.post('/delete', checkAuth, Controller.delete);

module.exports = router;
