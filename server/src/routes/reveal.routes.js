import { Router } from 'express';
import * as revealController from '../controllers/reveal.controller.js';
import { requireAdmin } from '../middlewares/auth.js';

const router = Router();

router.get('/', revealController.getReveal);
router.put('/', requireAdmin, revealController.setReveal);
router.delete('/', requireAdmin, revealController.clearReveal);

export default router;
