// src/models/resume.ts
import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  name: String,
  dob: String,
  phone: String,
  file: String, // saved filename
});

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
