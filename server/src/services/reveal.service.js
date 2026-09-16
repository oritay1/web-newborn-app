import { Reveal } from '../models/reveal.model.js';
import { GUESSES } from '../models/vote.model.js';
import { HttpError } from '../middlewares/errorHandler.js';

export async function getReveal() {
  const reveal = await Reveal.findOne({ key: 'main' }).lean();
  return { result: reveal?.result ?? null, revealedAt: reveal?.revealedAt ?? null };
}

export async function isRevealed() {
  return Boolean(await Reveal.exists({ key: 'main' }));
}

export async function setReveal(result) {
  if (!GUESSES.includes(result)) {
    throw new HttpError(400, 'Invalid result');
  }
  const reveal = await Reveal.findOneAndUpdate(
    { key: 'main' },
    { result, revealedAt: new Date() },
    { upsert: true, returnDocument: 'after', lean: true }
  );
  return { result: reveal.result, revealedAt: reveal.revealedAt };
}

export async function clearReveal() {
  await Reveal.deleteOne({ key: 'main' });
}
