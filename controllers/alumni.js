const pool = require("../config/db");

const getAlumniByCareer = async (req, res) => {
  try {
    const { careerId } = req.params;
    const results = await pool.query(
      `
            SELECT alumni.id , alumni.name, alumni.graduation_year, alumni.currentrole, alumni.organization, alumni.country, alumni.bio 
            FROM alumni 
            JOIN alumni_careers ON alumni.id= alumni_careers.alumni_id
            JOIN careers ON  alumni_careers.career_id = careers.id
            WHERE careers.id = $1`,
      [careerId],
    );
    if (results.rows.length === 0) {
      return res.status(404).json({
        message: "No Alumni available at the moment",
      });
    }
    res.json(results.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch alumni by career",
    });
  }
};

const getAlumniById = async (req, res) => {
  try {
    const { alumniId } = req.params;
    const results = await pool.query(
      `SELECT * FROM alumni WHERE alumni.id = $1`,
      [alumniId],
    );
    if (results.rows.length === 0) {
      return res.status(404).json({
        message: "Alumni not found",
      });
    }
    res.json(results.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error:Failed to find alumni by id");
  }
};

const sendMentorshipRequest = async (req, res) => {
  try {
    const { alumniId } = req.params;
    const userId = req.user.id;
    const { message } = req.body;

    const result = await pool.query(
      `
            INSERT INTO mentorship_requests
            (student_id, alumni_id, message)
            VALUES ($1, $2, $3)
            RETURNING *
            `,
      [userId, alumniId, message],
    );

    res.status(201).json({
      message: "Mentorship request sent successfully",
      request: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to send mentorship request",
    });
  }
};
module.exports = {
  getAlumniById,
  getAlumniByCareer,
  sendMentorshipRequest,
};
