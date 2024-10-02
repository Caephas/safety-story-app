import express from 'express';
import { authenticate } from '../middlewares/auth.middleware'; // Assuming you have JWT authentication middleware
import {generateStory, getStoriesByChildProfile} from '../controllers/story.controller';

const router = express.Router();

// Route to generate a new story
router.post('/story/generate', authenticate, generateStory); // Use authenticate middleware to protect the route

// Route to get all stories for a particular child
router.get('/stories/:childProfileId', authenticate, getStoriesByChildProfile);

export default router;