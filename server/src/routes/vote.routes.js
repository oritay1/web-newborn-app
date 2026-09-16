import { Router } from 'express';
import * as voteController from '../controllers/vote.controller.js';

const router = Router();

router.get('/', voteController.getAllVotes);
router.get('/status/:voterId', voteController.getVoteStatus);
router.post('/', voteController.createVote);

export default router;
