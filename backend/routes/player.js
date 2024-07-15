const express = require("express");

const router = express.Router();

const { playerController } = require("../controllers");

router.post("/add", playerController.addFavoritePlayer);
router.delete("/remove", playerController.removeFavoritePlayer);
router.get("/favorites/:userId", playerController.getFavoritePlayers);
router.get(
  "/favorites/:userId/:idTransfermarkt",
  playerController.isFavoritePlayer
);
router.get(
  "/friends-favorites/:userId",
  playerController.getFriendsFavoritePlayers
);

module.exports = router;
