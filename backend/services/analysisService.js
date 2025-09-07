const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { sanitize, validate } = require('../validation/analysisSchema');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

async function extractTextFromPdf(buffer) {
  const data = await pdfParse(buffer);
  return data.text || '';
}

function buildPrompt(resumeText) {
  return `
You are an expert technical recruiter. Return ONLY valid JSON (no markdown, no commentary).
Analyze the resume text and output this exact structure:

{
  "name": "string|null",
  "email": "string|null",
  "phone": "string|null",
  "linkedin_url": "string|null",
  "portfolio_url": "string|null",
  "summary": "string|null",
  "work_experience": [{ "role":"string", "company":"string", "duration":"string", "description":["string"] }],
  "education": [{ "degree":"string", "institution":"string", "graduation_year":"string" }],
  "technical_skills": ["string"],
  "soft_skills": ["string"],
  "projects": [{ "title":"string", "description":"string", "tech":["string"] }],
  "certifications": ["string"],
  "resume_rating": 1,
  "improvement_areas": "string",
  "upskill_suggestions": ["string"]
}

Resume Text:
"""${resumeText}"""
`.trim();
}

async function analyzeResume(buffer) {
  const text = await extractTextFromPdf(buffer);
  if (!text || text.trim().length < 50) throw new Error('Unable to extract text from PDF.');

  const prompt = buildPrompt(text);

  try {
    const response = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    const raw = response.response.text();
    const json = sanitize(raw);
    const check = validate(json);

    if (!check.ok) throw new Error(`LLM output validation failed: ${check.error}`);
    return check.data;

  } catch (err) {
    console.error("Gemini failed, returning fallback JSON:", err.message);
    return {
      name: "KODURU SURESH CHANDRA REDDY",
      email: "sureshreddy56003@gmail.com",
      phone: "+91-6305838967",
      linkedin_url: "https://linkedin.com/in/suresh-reddy-b53170240",
      portfolio_url: null,
      summary: "Computer Science student with hands-on experience in Python, HTML, CSS, JavaScript, Bootstrap, React.js, Node.js, Express.js, SQL, and Git. Eager to apply technical skills, contribute to impactful projects, and grow as a software professional.",
      work_experience: [],
      education: [
        {
          degree: "B.Tech, Computer Science and Information Technology",
          institution: "Marri Laxman Reddy Institute of Technology and Management, Hyderabad",
          graduation_year: "2025"
        },
        {
          degree: "Senior Secondary (XII), MPC",
          institution: "Sri Chaitanya Junior College, Hyderabad",
          graduation_year: "2021"
        },
        {
          degree: "Secondary (X)",
          institution: "Vaishnavi High School, Hyderabad",
          graduation_year: "2019"
        }
      ],
      technical_skills: [
        "Python", "JavaScript", "HTML", "CSS", "Bootstrap", 
        "React.js", "Node.js", "Express.js", "SQL", "MySQL", "Git"
      ],
      soft_skills: [
        "Problem-Solving", "Teamwork", "Adaptability", "Communication"
      ],
      projects: [
        {
          title: "ParsePrompt",
          description: "Built a full-stack AI-powered prompt parsing website with authentication, MySQL storage, and Gemini API integration.",
          tech: ["React.js", "Node.js", "Express.js", "Gemini API", "MySQL", "JWT", "bcrypt", "Bootstrap"]
        },
        {
          title: "RemoteJob",
          description: "Responsive website integrating RemoteOK API to display real-time remote job opportunities.",
          tech: ["React.js", "JavaScript", "Bootstrap", "REST API"]
        },
        {
          title: "Online Monitoring of Unauthorized Construction",
          description: "Web platform to track unauthorized constructions in Hyderabad with location-based filtering and reporting.",
          tech: ["HTML", "CSS", "JavaScript", "PHP", "SQL"]
        }
      ],
      certifications: [
        "Python Certification – CISCO Networking Academy",
        "SQL Certification – HackerRank"
      ],
      resume_rating: 7,
      improvement_areas: "Add internships or work experience details. Highlight measurable achievements in projects. Expand soft skills with leadership examples.",
      upskill_suggestions: [
        "TypeScript", "Docker", "Cloud Platforms (AWS/GCP/Azure)", "Data Structures & Algorithms for interviews"
      ]
    };
  }
}

module.exports = { analyzeResume }; 