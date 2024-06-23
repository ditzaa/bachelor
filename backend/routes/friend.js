const express = require("express");

const router = express.Router();

const { userController, friendController } = require("../controllers");

router.post("/add/:userId/:friendId", friendController.addFriend);

module.exports = router;
