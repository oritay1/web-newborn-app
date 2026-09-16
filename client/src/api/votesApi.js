import { getVoterId } from '../utils/voterId.js'

async function request(path, options = {}) {
  const res = await fetch(`/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-voter-id': getVoterId(),
      ...options.headers,
    },
  })
  const data = await res.json()
  if (!res.ok) {
    const error = new Error(data.message || 'Request failed')
    error.status = res.status
    throw error
  }
  return data
}

export const getVoteStatus = () => request(`/votes/status/${getVoterId()}`)

export const getAllVotes = () => request('/votes')

export const createVote = ({ relation, photo, guess }) =>
  request('/votes', {
    method: 'POST',
    body: JSON.stringify({ voterId: getVoterId(), relation, photo, guess }),
  })
