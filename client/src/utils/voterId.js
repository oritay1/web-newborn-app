const KEY = 'newborn-bets-voter-id'

// Anonymous per-browser id, used by the server to allow a single vote
export function getVoterId() {
  let id = localStorage.getItem(KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(KEY, id)
  }
  return id
}
