import mongoose, { Document, Schema } from 'mongoose';

export interface ISafetyTopic extends Document {
  name: string;
  description: string;
}

const SafetyTopicSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model<ISafetyTopic>('SafetyTopic', SafetyTopicSchema);