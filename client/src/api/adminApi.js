import { request } from './httpClient.js'

export const login = (username, password) =>
  request('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })

export const getSession = () => request('/admin/session')
