const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const friendRouter = require("./friend");
const playerRouter = require("./player");

router.use("/user", userRouter);
router.use("/friend", friendRouter);
router.use("/player", playerRouter);

module.exports = router;
