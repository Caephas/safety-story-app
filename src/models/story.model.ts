import mongoose, { Document, Schema } from 'mongoose';

export interface IStory extends Document {
  childProfileId: mongoose.Schema.Types.ObjectId;
  title: string;
  narrative: string;
  safetyLesson: string;
  createdAt: Date;
}

const StorySchema: Schema = new mongoose.Schema({
  childProfileId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChildProfile', required: true },
  title: { type: String, required: true },
  narrative: { type: String, required: true },
  safetyLesson: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IStory>('Story', StorySchema);