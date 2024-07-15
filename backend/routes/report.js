const express = require("express");

const router = express.Router();

const { reportController } = require("../controllers");

router.post("/save-report", reportController.saveReport);
router.post("/save-pdf", reportController.saveAsPdf);
router.get("/getAllReports/:userId", reportController.getAllReports);

module.exports = router;
