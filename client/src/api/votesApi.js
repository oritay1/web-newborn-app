import { request } from './httpClient.js'
import { getVoterId } from '../utils/voterId.js'

export const getVoteStatus = () => request(`/votes/status/${getVoterId()}`)

export const getAllVotes = () => request('/votes')

export const createVote = ({ relation, photo, guess }) =>
  request('/votes', {
    method: 'POST',
    body: JSON.stringify({ voterId: getVoterId(), relation, photo, guess }),
  })

export const deleteVote = (id) => request(`/votes/${id}`, { method: 'DELETE' })

export const deleteAllVotes = () => request('/votes', { method: 'DELETE' })
