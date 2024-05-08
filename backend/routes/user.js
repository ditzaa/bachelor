const express = require("express");

const router = express.Router();

const { userController } = require("../controllers");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/login", userController.getUser);
router.get("/isUserAuth", userController.verifyJWT, userController.isUserAuth);

module.exports = router;
