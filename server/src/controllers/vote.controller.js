import * as voteService from '../services/vote.service.js';
import { HttpError } from '../middlewares/errorHandler.js';

export async function createVote(req, res) {
  const vote = await voteService.createVote(req.body);
  res.status(201).json({ id: vote._id });
}

export async function getVoteStatus(req, res) {
  const voted = await voteService.hasVoted(req.params.voterId);
  res.json({ voted });
}

// Votes are visible only to participants who already voted
export async function getAllVotes(req, res) {
  const voterId = req.get('x-voter-id');
  if (!voterId || !(await voteService.hasVoted(voterId))) {
    throw new HttpError(403, 'Vote first to see the results');
  }
  res.json(await voteService.getAllVotes());
}
