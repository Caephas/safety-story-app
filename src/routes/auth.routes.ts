import { Request, Response, NextFunction } from 'express';
import { googleSignIn } from '../controllers/auth.controller';
import express from 'express';
const router = express.Router();

// Google callback route
router.post('/google/callback',googleSignIn)

export default router;