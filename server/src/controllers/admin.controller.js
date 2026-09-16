import * as adminService from '../services/admin.service.js';

export function login(req, res) {
  const token = adminService.login(req.body);
  res.json({ token });
}

export function getSession(req, res) {
  res.json({ isAdmin: true });
}
