const schema = {
  required: ["name","email","phone","resume_rating","technical_skills","soft_skills"],
  arrays: ["work_experience","education","technical_skills","soft_skills","projects","certifications","upskill_suggestions"]
};

function sanitize(obj) {
  try { return JSON.parse(obj); } catch { return null; }
}

function validate(payload) {
  if (!payload || typeof payload !== 'object') return { ok:false, error:"Invalid JSON" };
  for (const k of schema.required) if (!(k in payload)) return { ok:false, error:`Missing field: ${k}` };
  for (const k of schema.arrays) if (payload[k] && !Array.isArray(payload[k])) payload[k] = [];
  if (typeof payload.resume_rating !== 'number') return { ok:false, error:"resume_rating must be number" };
  return { ok:true, data:payload };
}

module.exports = { schema, sanitize, validate };
