const express = require("express");

const router = express.Router();

const { playerController } = require("../controllers");

router.post("/add", playerController.addFavoritePlayer);
router.post("/remove", playerController.removeFavoritePlayer);

module.exports = router;
