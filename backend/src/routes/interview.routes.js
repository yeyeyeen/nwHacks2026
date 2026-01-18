import express from 'express';
import multer from 'multer';
import {
  startInterview,
  getCurrentQuestion,
  getQuestionAudio,
  submitTextAnswer,
  submitAudioAnswer,
  getInterviewSession,
  getAnswers,
  endInterview
} from '../controllers/interview.controller.js';

const router = express.Router();

// Configure multer for audio file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept audio files
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed'));
    }
  }
});

// Start a new interview session
router.post('/start', startInterview);

// Get current question (text format)
router.get('/:sessionId/question', getCurrentQuestion);

// Get current question as audio (text-to-speech)
router.get('/:sessionId/question/audio', getQuestionAudio);

// Submit answer as text
router.post('/:sessionId/answer', submitTextAnswer);

// Submit answer as audio (speech-to-text)
router.post('/:sessionId/answer/audio', upload.single('audio'), submitAudioAnswer);

// Get interview session details
router.get('/:sessionId', getInterviewSession);

// Get all answers for a session
router.get('/:sessionId/answers', getAnswers);

// End interview session
router.post('/:sessionId/end', endInterview);

export default router;
