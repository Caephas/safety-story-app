import { Request, Response } from 'express';
import ChildProfile from '../models/child.model';
import SafetyTopic from '../models/topic.model';

// Controller for creating or updating a child's profile
export const createChildProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // Destructure the fields from the request body
    const { name, age, interests, preferredTopics } = req.body;

    // Fetch ObjectIds for preferredTopics based on names or existing IDs
    const topics = await SafetyTopic.find({ _id: { $in: preferredTopics } });
    const topicIds = topics.map(topic => topic._id);

    // Extract userId from the JWT (assuming it's added by an authentication middleware)
    const userId = (req as any).user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized. User not found in request.' });
      return;
    }

    // Check if a child profile already exists for the given parentId (userId)
    let childProfile = await ChildProfile.findOne({ parentId: userId });

    if (childProfile) {
      // Update existing child profile
      childProfile.name = name;
      childProfile.age = age;
      childProfile.interests = interests;
      childProfile.preferredTopics = preferredTopics;
    } else {
      // Create a new child profile
      childProfile = new ChildProfile({
        parentId: userId,
        name,
        age,
        interests,
        preferredTopics,
      });
    }

    // Save the profile to the database
    await childProfile.save();

    // Send the saved/updated child profile as a response
    res.status(200).json(childProfile);
  } catch (error) {
    console.error('Error creating/updating child profile:', error);
    res.status(500).json({ error: 'Server error occurred while saving the child profile.' });
  }
};

export const getChildProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const childProfile = await ChildProfile.findById(req.params.childId).populate('preferredTopics');  // Populate the preferredTopics
        if (!childProfile) {
          res.status(404).json({ error: 'Child profile not found' });
          return;
        }
        res.status(200).json(childProfile);
      } catch (error) {
        console.error('Error fetching child profile:', error);
        res.status(500).json({ error: 'Server error occurred while fetching the child profile.' });
      }
}