import { Router } from 'express';
import adminRoutes from './admin.routes.js';
import revealRoutes from './reveal.routes.js';
import voteRoutes from './vote.routes.js';
import { attachAdmin } from '../middlewares/auth.js';

const router = Router();

router.use(attachAdmin);
router.get('/health', (req, res) => res.json({ status: 'ok' }));
router.use('/admin', adminRoutes);
router.use('/votes', voteRoutes);
router.use('/reveal', revealRoutes);

export default router;
