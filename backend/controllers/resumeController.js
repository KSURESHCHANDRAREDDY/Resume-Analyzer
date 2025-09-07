const { pool } = require('../db');
const { analyzeResume } = require('../services/analysisService');

async function uploadResume(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const analysis = await analyzeResume(req.file.buffer);
    const {
      name, email, phone, linkedin_url, portfolio_url, summary,
      work_experience, education, technical_skills, soft_skills,
      projects, certifications, resume_rating, improvement_areas, upskill_suggestions
    } = analysis;

    const insert = `
      INSERT INTO resumes (
        file_name, name, email, phone, linkedin_url, portfolio_url, summary,
        work_experience, education, technical_skills, soft_skills, projects,
        certifications, resume_rating, improvement_areas, upskill_suggestions
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,
        $8,$9,$10,$11,$12,$13,$14,$15,$16
      )
      RETURNING *;
    `;
    const values = [
      req.file.originalname, name, email, phone, linkedin_url, portfolio_url, summary,
      JSON.stringify(work_experience||[]), JSON.stringify(education||[]),
      JSON.stringify(technical_skills||[]), JSON.stringify(soft_skills||[]),
      JSON.stringify(projects||[]), JSON.stringify(certifications||[]),
      resume_rating || null, improvement_areas || null, JSON.stringify(upskill_suggestions||[])
    ];

    const { rows } = await pool.query(insert, values);
    return res.status(201).json(rows[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}

async function getAllResumes(_req, res) {
  try {
    const { rows } = await pool.query(
      'SELECT id, file_name, name, email, uploaded_at FROM resumes ORDER BY uploaded_at DESC'
    );
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getResumeById(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM resumes WHERE id = $1', [id]);
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { uploadResume, getAllResumes, getResumeById };
