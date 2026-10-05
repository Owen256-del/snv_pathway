const pool = require("../config/db");

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

const getMyMentorshipRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const results = await pool.query(
      `
        SELECT
    mentorship_requests.student_id,
    mentorship_requests.alumni_id,
    mentorship_requests.message,
    mentorship_requests.status,
    alumni.name AS alumni_name
FROM mentorship_requests
JOIN alumni
    ON mentorship_requests.alumni_id = alumni.id
WHERE mentorship_requests.student_id = $1;
            `,
      [userId],
    );
    if (results.rows.length === 0) {
      return res.status(404).json({
        message: "No mentorship requests found for this user",
      });
    }
    res.status(200).json({
      message: "Mentorship requests found",
      data: results.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch mentorship requests",
    });
  }
};

module.exports = {
  getMyMentorshipRequests,
  sendMentorshipRequest,
};
