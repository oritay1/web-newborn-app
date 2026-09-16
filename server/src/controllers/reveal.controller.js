import * as revealService from '../services/reveal.service.js';

export async function getReveal(req, res) {
  res.json(await revealService.getReveal());
}

export async function setReveal(req, res) {
  res.json(await revealService.setReveal(req.body.result));
}

export async function clearReveal(req, res) {
  await revealService.clearReveal();
  res.status(204).end();
}
