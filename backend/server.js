require('dotenv').config();
const express = require('express');
const cors = require('cors');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.use('/api/resumes', resumeRoutes);


app.get('/health', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`API listening on :${port}`));
console.log("Google API Key Loaded:", process.env.GOOGLE_API_KEY ? "✅ Yes" : "❌ No");

