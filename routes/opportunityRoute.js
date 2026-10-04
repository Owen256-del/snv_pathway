const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getOpportunities,
  getOpportunitiesByCareer,
  filterOpportunities,
  getMyCareerOpportunities,
} = require("../controllers/opportunities");
const router = express.Router();

router.get("/", getOpportunities);
router.get("/career/:careerId", getOpportunitiesByCareer);
router.get("/my-career", protect, getMyCareerOpportunities);
router.get("/filter", filterOpportunities);
module.exports = router;
