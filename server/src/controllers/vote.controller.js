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

// Votes are visible only to the admin and to participants who already voted
export async function getAllVotes(req, res) {
  const voterId = req.get('x-voter-id');
  const canView = req.isAdmin || (voterId && (await voteService.hasVoted(voterId)));
  if (!canView) {
    throw new HttpError(403, 'Vote first to see the results');
  }
  res.json(await voteService.getAllVotes(voterId));
}

export async function deleteVote(req, res) {
  await voteService.deleteVote(req.params.id);
  res.status(204).end();
}

export async function deleteAllVotes(req, res) {
  const deletedCount = await voteService.deleteAllVotes();
  res.json({ deletedCount });
}
