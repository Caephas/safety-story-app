import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  googleId: string; // Store Google account ID
  children: mongoose.Schema.Types.ObjectId[]; // References to child profiles
}

const UserSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String, required: true, unique: true },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChildProfile' }],
});

export default mongoose.model<IUser>('User', UserSchema);