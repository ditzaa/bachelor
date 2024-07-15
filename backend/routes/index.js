const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const friendRouter = require("./friend");
const playerRouter = require("./player");
const reportRouter = require("./report");

router.use("/user", userRouter);
router.use("/friend", friendRouter);
router.use("/player", playerRouter);
router.use("/report", reportRouter);

module.exports = router;
