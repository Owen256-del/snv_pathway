const express = require("express");
const { getCareers } = require("../controllers/CareerController");
const router = express.Router();

router.get("/", getCareers);

module.exports = router;
