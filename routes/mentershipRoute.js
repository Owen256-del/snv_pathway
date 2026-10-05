const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getMyMentorshipRequests,
  sendMentorshipRequest,
} = require("../controllers/mentorshipController");

const router = express.Router();
router.post("/:alumniId/mentorship", protect, sendMentorshipRequest);
router.get("/my-requests", protect, getMyMentorshipRequests);

module.exports = router;
