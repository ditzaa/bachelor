const express = require("express");

const router = express.Router();

const { userController, friendController } = require("../controllers");

router.post("/add/:userId/:friendId", friendController.addFriend);
router.delete("/remove/:userId/:friendId", friendController.removeFriend);
router.get(
  "/check-friendship/:userId/:friendId",
  friendController.checkFriendship
);
router.get("/check-getAllFriends/:userId/", friendController.checkFriendship);
router.get("/getAllFriends/:userId/", friendController.getAllFriends);

module.exports = router;
