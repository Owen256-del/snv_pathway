const express = require("express");
const {
  getCareers,
  getCareerById,
  getCareerSkills,
} = require("../controllers/careerController");
const router = express.Router();

router.get("/", getCareers);
router.get("/field/:fieldId", getCareerById);
router.get("/:careerId/skills", getCareerSkills);

module.exports = router;
