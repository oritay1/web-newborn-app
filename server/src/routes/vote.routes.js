import { Router } from 'express';
import * as voteController from '../controllers/vote.controller.js';
import { requireAdmin } from '../middlewares/auth.js';

const router = Router();

router.get('/', voteController.getAllVotes);
router.get('/status/:voterId', voteController.getVoteStatus);
router.post('/', voteController.createVote);
router.delete('/', requireAdmin, voteController.deleteAllVotes);
router.delete('/:id', requireAdmin, voteController.deleteVote);

export default router;
