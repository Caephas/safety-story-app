import mongoose, { Document, Schema } from 'mongoose';

export interface IChildProfile extends Document {
  parentId: mongoose.Schema.Types.ObjectId; // Reference to the parent
  name: string;
  age: number;
  interests: string[];
  preferredTopics: mongoose.Schema.Types.ObjectId[]; // References to safety topics
}

const ChildProfileSchema: Schema = new mongoose.Schema({
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  interests: [{ type: String }],
  preferredTopics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SafetyTopic' }],
});

export default mongoose.model<IChildProfile>('ChildProfile', ChildProfileSchema);