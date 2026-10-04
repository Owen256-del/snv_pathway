const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getAlumniByCareer,
  getAlumniById,
  sendMentorshipRequest,
} = require("../controllers/alumni");
const router = express.Router();

router.get("/career/:careerId", getAlumniByCareer);
router.get("/:alumniId", getAlumniById);
router.post("/:alumniId/mentorship", protect, sendMentorshipRequest);
module.exports = router;
