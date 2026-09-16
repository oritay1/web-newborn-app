import { getVoterId } from '../utils/voterId.js'
import { getAdminToken } from '../utils/adminToken.js'

export async function request(path, options = {}) {
  const adminToken = getAdminToken()
  const res = await fetch(`/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-voter-id': getVoterId(),
      ...(adminToken && { Authorization: `Bearer ${adminToken}` }),
      ...options.headers,
    },
  })
  const data = res.status === 204 ? null : await res.json()
  if (!res.ok) {
    const error = new Error(data?.message || 'Request failed')
    error.status = res.status
    throw error
  }
  return data
}
