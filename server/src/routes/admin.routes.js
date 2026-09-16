import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as adminController from '../controllers/admin.controller.js';
import { requireAdmin } from '../middlewares/auth.js';

const router = Router();

// Slow down password guessing
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  message: { message: 'Too many login attempts, try again later' },
});

router.post('/login', loginLimiter, adminController.login);
router.get('/session', requireAdmin, adminController.getSession);

export default router;
