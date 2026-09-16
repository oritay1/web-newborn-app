const KEY = 'newborn-bets-reveal-seen'

// Remembers which reveal this browser already celebrated, so the overlay shows once per reveal
export const getSeenRevealAt = () => localStorage.getItem(KEY)

export const setSeenRevealAt = (revealedAt) => localStorage.setItem(KEY, revealedAt)
