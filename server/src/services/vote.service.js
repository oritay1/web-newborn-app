import { Vote, GUESSES } from '../models/vote.model.js';
import { HttpError } from '../middlewares/errorHandler.js';

export async function createVote({ voterId, relation, photo, guess }) {
  if (!voterId || !relation || !photo || !GUESSES.includes(guess)) {
    throw new HttpError(400, 'Missing or invalid fields');
  }
  if (await Vote.exists({ voterId })) {
    throw new HttpError(409, 'Already voted');
  }
  return Vote.create({ voterId, relation, photo, guess });
}

export async function hasVoted(voterId) {
  return Boolean(await Vote.exists({ voterId }));
}

export async function getAllVotes() {
  return Vote.find({}, { voterId: 0 }).sort({ createdAt: 1 }).lean();
}
