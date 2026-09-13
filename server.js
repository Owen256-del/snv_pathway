const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const careerRoutes = require("./routes/careerRoute");
app.use("/api/careers", careerRoutes);

const PORT = 5000;

const pool = require("./config/db");

// protected route test
const protect = require("./middleware/authMiddleware");

app.get("/api/protected", protect, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

// actual protected rooute

const userRoutes = require("./routes/userRoute");
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "SNV Pathway API is running 🚀",
  });
});

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Database connection successful",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Database connection failed", error: error.message });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
