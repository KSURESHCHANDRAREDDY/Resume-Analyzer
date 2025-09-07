const express = require('express');
const multer = require('multer');
const { uploadResume, getAllResumes, getResumeById } = require('../controllers/resumeController');

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== 'application/pdf') return cb(new Error('Only PDF allowed'));
    cb(null, true);
  }
});

router.post('/upload', upload.single('resume'), uploadResume);
router.get('/', getAllResumes);
router.get('/:id', getResumeById);

module.exports = router;
