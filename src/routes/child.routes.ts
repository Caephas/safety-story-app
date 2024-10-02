import express from 'express';
import { createChildProfile, getChildProfile } from '../controllers/child.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

// Create or update a child profile (Authenticated Route)
router.put('/profile/child', authenticate, createChildProfile);
router.get('/profile/child/:childId', authenticate, getChildProfile);

export default router;