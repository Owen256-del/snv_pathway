const pool = require("../config/db");

const getStudentSkills = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT skills.id, skills.name, skills.category, student_skills.level FROM student_skills JOIN skills ON student_skills.skill_id = skills.id WHERE student_skills.user_id = $1`,
      [req.user.id],
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const currentSkills = async (req, res) => {
  try {
    const results = await pool.query(
      `INSERT INTO student_skills (user_id, skill_id, level ) VALUES ($1, $2, $3) RETURNING *`,
      [req.user.id, req.body.skill_id, req.body.level],
    );
    res.json(results.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSkillGap = async (req, res) => {
  const { careerId } = req.params;
  try {
    const results = await pool.query(
      `SELECT skills.id, skills.name, skills.category, career_skills.importance, student_skills.level FROM  career_skills
            JOIN skills ON career_skills.skill_id = skills.id LEFT JOIN student_skills ON skills.id = student_skills.skill_id AND student_skills.user_id = $1
            WHERE career_skills.career_id = $2`,
      [req.user.id, careerId],
    );
    // Filter out skills that the student already has

    const skills = results.rows;

    const totalskills = skills.length;
    const skillsHave = skills.filter((skill) => skill.level !== null).length;
    const skillsGap = skills.filter((skill) => skill.level === null).length;
    const skillDetails = skills.map((skill) => {
      return {
        id: skill.id,
        name: skill.name,
        category: skill.category,
        level: skill.level,
        status: skill.level !== null ? "Have" : "Missing",
      };
    });

    res.json({
      careerId,
      totalSkills: totalskills,
      skillsHave: skillsHave,
      skillsGap: skillsGap,
      skills: skillDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch skill gap" });
  }
};

module.exports = {
  getStudentSkills,
  currentSkills,
  getSkillGap,
};
