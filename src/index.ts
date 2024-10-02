import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes';
import childRoutes from './routes/child.routes';
import safetyTopicRoutes from './routes/safetyTopic.routes';
import storyRoutes from './routes/story.routes';
dotenv.config();
connectDB();

const app = express();
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/auth', childRoutes);
app.use('/auth', safetyTopicRoutes);
app.use('/auth', storyRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));