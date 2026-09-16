import mongoose from 'mongoose';
import { GUESSES } from './vote.model.js';

// A single document holding the actual result, once the admin reveals it
const revealSchema = new mongoose.Schema({
  key: { type: String, default: 'main', unique: true },
  result: { type: String, enum: GUESSES, required: true },
  revealedAt: { type: Date, required: true },
});

export const Reveal = mongoose.model('Reveal', revealSchema);
