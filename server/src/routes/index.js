import { Router } from 'express';
import voteRoutes from './vote.routes.js';

const router = Router();

router.get('/health', (req, res) => res.json({ status: 'ok' }));
router.use('/votes', voteRoutes);

export default router;
