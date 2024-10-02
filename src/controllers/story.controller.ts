import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ChildProfile from '../models/child.model';
import SafetyTopic from '../models/topic.model';
import Story from '../models/story.model';

export const generateStory = async (req: Request, res: Response): Promise<void> => {
  const { childProfileId, selectedTopic } = req.body;

  try {
    // Fetch the child profile and safety topic
    const childProfile = await ChildProfile.findById(childProfileId);
    const topic = await SafetyTopic.findById(selectedTopic);

    if (!childProfile) {
      res.status(404).json({ error: 'Child profile not found' });
      return;
    }

    if (!topic) {
      res.status(404).json({ error: 'Safety topic not found' });
      return;
    }

    // Initialize the Google Generative AI with your API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

    // Define the model to use for generating the content
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Construct the story prompt
    const prompt = `Write a story for a child named ${childProfile.name} learning about ${topic.name}, make it short and concise for a ${childProfile.age} year old child to easily follow.`;

    // Generate the story using the Google Generative AI API
    const result = await model.generateContent(prompt);

    if (!result.response || !result.response.text) {
      res.status(500).json({ error: 'Error generating story from the Gemini API' });
      return;
    }

    const storyText = result.response.text();

    // Check if a story for this child and topic already exists
    const existingStory = await Story.findOne({
      childProfileId: childProfile._id,
      safetyLesson: topic.name  // Using the topic name as the unique identifier for a story
    });

    if (existingStory) {
      // Overwrite the existing story
      existingStory.narrative = storyText;
      existingStory.title = `A Story About ${topic.name}`;
      await existingStory.save();
      res.status(200).json(existingStory);
    } else {
      // Create a new story
      const newStory = new Story({
        childProfileId: childProfile._id,
        title: `A Story About ${topic.name}`,
        narrative: storyText,
        safetyLesson: topic.name,  // Using the topic name as the safety lesson
      });
  
      await newStory.save();
      res.status(200).json(newStory);
    }
  } catch (error) {
    console.error("Error generating story:", error);
    res.status(500).json({ error: 'Error generating story' });
  }
};
// controllers/story.controller.ts

export const getStoriesByChildProfile = async (req: Request, res: Response): Promise<void> => {
    const { childProfileId } = req.params;
  
    try {
      const stories = await Story.find({ childProfileId }).sort({ createdAt: -1 }); // Retrieve all stories by child profile, sorted by latest
  
      if (stories.length === 0) {
        res.status(404).json({ error: 'No stories found for this child profile' });
        return;
      }
  
      res.status(200).json(stories);
    } catch (error) {
      console.error("Error fetching stories:", error);
      res.status(500).json({ error: 'Error fetching stories' });
    }
  };