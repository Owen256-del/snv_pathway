const pool = require("../config/db");

const getOpportunities = async (req, res) => {
  try {
    const results = await pool.query(
      `SELECT opportunities.id, opportunities.title, opportunities.description, opportunities.type, opportunities.location, opportunities.country, opportunities.deadline, opportunities.url, opportunities.career_id FROM opportunities`,
    );
    if (results.rows.length === 0) {
      return res.status(404).json({
        message: "No Opportunities available at the moment",
      });
    }
    res.json(results.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch opportunities",
    });
  }
};

const getOpportunitiesByCareer = async (req, res) => {
  try {
    const { careerId } = req.params;
    const results = await pool.query(
      `SELECT
        careers.title AS career,
        opportunities.id,
        opportunities.title,
        opportunities.description,
        opportunities.organization,
        opportunities.type,
        opportunities.location,
        opportunities.country,
        opportunities.deadline,
        opportunities.url
     FROM opportunities
     JOIN careers
        ON opportunities.career_id = careers.id
     WHERE careers.id = $1`,
      [careerId],
    );
    if (results.rows.length === 0) {
      return res.status(404).json({
        message: "No Opportunities available at the moment",
      });
    }

    res.json(results.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Can not fetch opportunies",
    });
  }
};

const filterOpportunities = async (req, res) => {
  try {
    const { type, location, country } = req.query;

    // filtering the conditions

    const conditions = [];
    const values = [];
    if (type) {
      conditions.push(`opportunities.type ILIKE $${values.length + 1}`);
      values.push(type);
    }

    if (location) {
      conditions.push(`opportunities.location ILIKE $${values.length + 1}`);
      values.push(location);
    }

    if (country) {
      conditions.push(`opportunities.country ILIKE $${values.length + 1}`);
      values.push(country);
    }
    const results = await pool.query(
      `
        SELECT 
        opportunities.id,
        opportunities.title,
        opportunities.description,
        opportunities.organization,
        opportunities.type,
        opportunities.location,
        opportunities.country,
        opportunities.deadline,
        opportunities.url
     FROM opportunities 
     WHERE ${conditions.join(" AND ")}
        `,
      values,
    );

    if (results.rows.length === 0) {
      return res.status(404).json({
        message: "No Opportunities available at the moment",
      });
    }

    res.json(results.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to filter opportunities",
    });
  }
};

const getMyCareerOpportunities = async (req, res) => {
  try {
    const results = await pool.query(
      `SELECT
                opportunities.id,
                opportunities.title,
                opportunities.description,
                opportunities.organization,
                opportunities.type,
                opportunities.location,
                opportunities.country,
                opportunities.deadline,
                opportunities.url,
                careers.title AS career
             FROM users
             JOIN opportunities
                ON users.career_id = opportunities.career_id
             JOIN careers
                ON opportunities.career_id = careers.id
             WHERE users.id = $1
             ORDER BY opportunities.deadline ASC`,
      [req.user.id],
    );

    if (results.rows.length === 0) {
      return res.status(404).json({
        message: "No opportunities found for your selected career",
      });
    }

    res.json(results.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch career opportunities",
    });
  }
};

module.exports = {
  getOpportunities,
  getOpportunitiesByCareer,
  filterOpportunities,
  getMyCareerOpportunities,
};
