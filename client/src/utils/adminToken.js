const KEY = 'newborn-bets-admin-token'

export const getAdminToken = () => localStorage.getItem(KEY)

export const setAdminToken = (token) => localStorage.setItem(KEY, token)

export const clearAdminToken = () => localStorage.removeItem(KEY)
