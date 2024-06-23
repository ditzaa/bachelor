const express = require("express");

const router = express.Router();

const { playerController } = require("../controllers");

router.post("/add", playerController.addFavoritePlayer);
router.delete("/remove", playerController.removeFavoritePlayer);
router.get("/favorites/:userId", playerController.getFavoritePlayers);

module.exports = router;
