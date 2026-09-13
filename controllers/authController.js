const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "name, email and password are required",
      });
    }
    // Check if the user already exists
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email],
    );
    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database

    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword],
    );

    // Return a success response
    return res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      message: "Registration failed",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required",
      });
    }
    // find the user by email

    const results = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    if (results.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = results.rows[0];

    // compare password with hashedpassword

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // create jwt
    const jwtSecret = process.env.JWT_SECRET || "dev_secret_key";
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      jwtSecret,
      {
        expiresIn: "1d",
      },
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Login failed",
    });
  }
};

module.exports = {
  register,
  login,
};
