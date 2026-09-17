const express = require("express");
const {
  getStudentSkills,
  currentSkills,
  getSkillGap,
} = require("../controllers/skillController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/my-skills", protect, getStudentSkills);
router.get("/gap/:careerId", protect, getSkillGap);
router.post("/current-skills", protect, currentSkills);
module.exports = router;
