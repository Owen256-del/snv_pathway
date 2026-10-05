const express = require("express");
const protect = require("../middleware/authMiddleware");
const { getAlumniByCareer, getAlumniById } = require("../controllers/alumni");
const router = express.Router();

router.get("/career/:careerId", getAlumniByCareer);
router.get("/:alumniId", getAlumniById);

module.exports = router;
