import express from 'express';
import { getSafetyTopics, seedSafetyTopics } from '../controllers/safetyTopic.controller';

const router = express.Router();

// Fetch all safety topics
router.get('/safety-topics', getSafetyTopics);

// Seed predefined safety topics into the database
router.post('/safety-topics/seed', seedSafetyTopics);

export default router;