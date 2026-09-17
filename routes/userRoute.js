const express = require("express");

const {
  getProfile,
  updateProfile,
  updateCareer,
  getMyCareer,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/career", protect, updateCareer);
router.get("/career", protect, getMyCareer);
module.exports = router;
