import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { HttpError } from '../middlewares/errorHandler.js';

const TOKEN_TTL = '12h';

function isAdminConfigured() {
  return Boolean(env.adminUsername && env.adminPassword && env.adminTokenSecret);
}

// Compares hashes so the check takes the same time regardless of where the strings differ
function safeEqual(a, b) {
  const hash = (value) => crypto.createHash('sha256').update(String(value)).digest();
  return crypto.timingSafeEqual(hash(a), hash(b));
}

export function login({ username, password }) {
  if (!isAdminConfigured()) {
    throw new HttpError(503, 'Admin login is not configured');
  }
  // Evaluate both so a wrong username and a wrong password take the same time
  const usernameOk = safeEqual(username, env.adminUsername);
  const passwordOk = safeEqual(password, env.adminPassword);
  if (!usernameOk || !passwordOk) {
    throw new HttpError(401, 'Invalid username or password');
  }
  return jwt.sign({ role: 'admin' }, env.adminTokenSecret, { expiresIn: TOKEN_TTL });
}

export function isValidAdminToken(token) {
  if (!token || !isAdminConfigured()) return false;
  try {
    return jwt.verify(token, env.adminTokenSecret).role === 'admin';
  } catch {
    return false;
  }
}
