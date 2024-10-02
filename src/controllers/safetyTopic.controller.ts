import { Request, Response } from 'express';
import SafetyTopic from '../models/topic.model';

const safetyTopics = [
  { name: 'Stranger Danger', description: 'Teaching children how to avoid dangerous situations with strangers.' },
  { name: 'Fire Safety', description: 'Teaching children about fire prevention and emergency procedures.' },
  { name: 'Internet Safety', description: 'Helping children stay safe while using the internet.' },
  { name: 'Road Safety', description: 'Teaching children how to stay safe when crossing streets or walking near traffic.' },
  { name: 'Emergency Preparedness', description: 'Helping children understand what to do in emergency situations.' },
  { name: 'Water Safety', description: 'Teaching children about staying safe near water.' },
  { name: 'Bullying Prevention', description: 'Helping children identify and handle bullying situations.' },
  { name: 'Safe Play', description: 'Ensuring children know how to play safely in various environments.' },
  {name: 'Personal Hygiene', description: 'Teaching children the importance of personal hygiene, including handwashing and dental care'},
  {name: 'Food Safety', description: 'Educating children on safe eating practices, such as avoiding choking hazards and understanding allergies'}
];

export const seedSafetyTopics = async (req: Request, res: Response) => {
  try {
    // Insert predefined safety topics into the database
    await SafetyTopic.insertMany(safetyTopics);
    res.status(201).json({ message: 'Safety topics inserted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error inserting safety topics' });
  }
};

export const getSafetyTopics = async (req: Request, res: Response) => {
  try {
    const topics = await SafetyTopic.find();
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};