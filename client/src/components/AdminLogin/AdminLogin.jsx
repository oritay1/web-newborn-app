import { useState } from 'react'
import { login } from '../../api/adminApi.js'
import { setAdminToken } from '../../utils/adminToken.js'
import './AdminLogin.css'

const ERRORS = {
  401: 'שם משתמש או סיסמה שגויים',
  429: 'יותר מדי ניסיונות, נסו שוב בעוד כמה דקות',
}

function AdminLogin({ onSuccess, onCancel }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const { token } = await login(username, password)
      setAdminToken(token)
      onSuccess()
    } catch (err) {
      setError(ERRORS[err.status] || 'משהו השתבש, נסו שוב')
      setSubmitting(false)
    }
  }

  return (
    <form className="admin-login" onSubmit={handleSubmit}>
      <h2 className="admin-login__title">כניסת מנהל 🔐</h2>
      <label className="admin-login__field">
        שם משתמש
        <input
          className="admin-login__input"
          type="text"
          autoComplete="username"
          autoCapitalize="none"
          dir="ltr"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="admin-login__field">
        סיסמה
        <input
          className="admin-login__input"
          type="password"
          autoComplete="current-password"
          dir="ltr"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {error && <p className="admin-login__error">{error}</p>}
      <button className="admin-login__submit" type="submit" disabled={!username || !password || submitting}>
        {submitting ? 'מתחבר...' : 'כניסה'}
      </button>
      <button className="admin-login__cancel" type="button" onClick={onCancel}>
        חזרה
      </button>
    </form>
  )
}

export default AdminLogin
