import { OAuth2Client } from 'google-auth-library';
import User from '../models/user.model';  // Import your User model
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config(); // Load environment variables

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Function to generate JWT
const generateJWT = (userId: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign({ userId }, secret, { expiresIn: '1h' });
};

// Controller for Google Sign-In
export const googleSignIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get the Google ID token from the frontend
    const token = req.body.token;
    if (!token) {
      res.status(400).json({ error: 'Token is required' });
      return;
    }

    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app
    });

    const payload = ticket.getPayload();  // Extract user info from the token

    if (!payload) {
      res.status(400).json({ error: 'Invalid token' });
      return;
    }

    const { sub: googleId, email, name } = payload;

    if (!googleId || !email || !name) {
      res.status(400).json({ error: 'Missing information from Google account' });
      return;
    }

    // Check if the user exists in the database
    let user = await User.findOne({ googleId });

    if (!user) {
      // If user does not exist, create a new user
      user = new User({
        name,
        email,
        googleId,
        children: [],  // Initialize an empty children array
      });
      await user.save();
    }

    // Generate a JWT for session management
    const jwtToken = generateJWT(user._id?.toString() || '');    

    // Send the user and JWT token back to the frontend
    res.status(200).json({ user, token: jwtToken });
  } catch (error) {
    console.error('Error during Google Sign-In:', error);
    res.status(500).json({ error: 'An error occurred during Google Sign-In. Please try again.' });
  }
};