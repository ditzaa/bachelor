const express = require("express");

const router = express.Router();

const { userController, friendController } = require("../controllers");

router.post("/add/:userId/:friendId", friendController.addFriend);
router.delete("/remove/:userId/:friendId", friendController.removeFriend);
router.get(
  "/check-friendship/:userId/:friendId",
  friendController.checkFriendship
);

module.exports = router;
