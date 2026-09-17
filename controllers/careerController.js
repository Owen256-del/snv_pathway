const pool = require("../config/db");
const getCareers = async (req, res) => {
  try {
    const result = await pool.query(
      " SELECT careers.id, careers.title , careers.description, fields.name AS field FROM careers JOIN fields ON careers.field_id = fields.id ORDER BY careers.id; ",
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCareerById = async (req, res) => {
  try {
    const { fieldId } = req.params;
    const results = await pool.query(
      `SELECT careers.id, careers.title, careers.description, fields.name AS field FROM careers JOIN fields ON careers.field_id = fields.id WHERE careers.id = $1 ORDER BY careers.id;`,
      [fieldId],
    );
    res.json(results.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failed to fetch career" });
  }
};

const getCareerSkills = async (req, res) => {
  try {
    const { careerId } = req.params;
    const results = await pool.query(
      `SELECT  skills.id, skills.name, skills.category, career_skills.importance FROM career_skills
    JOIN skills ON career_skills.skill_id = skills.id WHERE career_skills.career_id = $1`,
      [careerId],
    );
    res.json({ careerId, skills: results.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch career skills",
    });
  }
};

module.exports = {
  getCareers,
  getCareerById,
  getCareerSkills,
};
