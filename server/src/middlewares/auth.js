import { isValidAdminToken } from '../services/admin.service.js';
import { HttpError } from './errorHandler.js';

// Marks the request as admin when it carries a valid "Authorization: Bearer <token>" header
export function attachAdmin(req, res, next) {
  const [scheme, token] = (req.get('authorization') || '').split(' ');
  req.isAdmin = scheme === 'Bearer' && isValidAdminToken(token);
  next();
}

export function requireAdmin(req, res, next) {
  if (!req.isAdmin) throw new HttpError(401, 'Admin only');
  next();
}
