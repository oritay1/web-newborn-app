import { request } from './httpClient.js'

export const getReveal = () => request('/reveal')

export const setReveal = (result) => request('/reveal', { method: 'PUT', body: JSON.stringify({ result }) })

export const clearReveal = () => request('/reveal', { method: 'DELETE' })
