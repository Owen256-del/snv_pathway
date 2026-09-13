const pool = require("../config/db");

const getProfile = async (req, res) => {
  try {
    const results = await pool.query(
      `SELECT users.id, users.name, users.email, users.role, users.career_goal, fields.name AS field
       FROM users
       LEFT JOIN fields ON users.field_id = fields.id
       WHERE users.id = $1`,
      [req.user.id],
    );

    if (results.rows.length === 0) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    res.json(results.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { field_id, career_goal } = req.body;
    const result = await pool.query(
      `UPDATE users SET field_id = $1, career_goal = $2 WHERE id = $3 RETURNING id, name, email, role, field_id, career_goal`,
      [field_id, career_goal, req.user.id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json({
      message: "Profile updated successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update profile",
    });
  }
};

module.exports = { getProfile, updateProfile };
