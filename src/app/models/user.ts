
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  dob: Date;
  rollNumber: string;
  isAlumni: boolean;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  rollNumber: { type: String, required: true },
  isAlumni: { type: Boolean, required: true }
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
