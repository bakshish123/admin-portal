// models/Alumni.ts
import mongoose, { Document, Schema } from 'mongoose';
import { IAlumni } from '../../interfaces/alumni';

// Extend the Mongoose Document with our Alumni interface
export interface AlumniDocument extends IAlumni, Document {}

// Define the Mongoose schema for Alumni
const AlumniSchema: Schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  graduationYear: {
    type: Number,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  currentCompany: {
    type: String,
    trim: true,
  },
  jobTitle: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  linkedInProfile: {
    type: String,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the Alumni model
const Alumni = mongoose.models.Alumni || mongoose.model<AlumniDocument>('Alumni', AlumniSchema);
export default Alumni;
