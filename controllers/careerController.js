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

module.exports = {
  getCareers,
};
