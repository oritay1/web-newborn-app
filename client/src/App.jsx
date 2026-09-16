import { useCallback, useEffect, useState } from 'react'
import { getVoteStatus } from './api/votesApi.js'
import { getSession } from './api/adminApi.js'
import { clearAdminToken, getAdminToken } from './utils/adminToken.js'
import Header from './components/Header/Header.jsx'
import Loader from './components/Loader/Loader.jsx'
import VoteForm from './components/VoteForm/VoteForm.jsx'
import VotesBoard from './components/VotesBoard/VotesBoard.jsx'
import AdminLogin from './components/AdminLogin/AdminLogin.jsx'
import Footer from './components/Footer/Footer.jsx'

async function checkAdminSession() {
  if (!getAdminToken()) return false
  try {
    await getSession()
    return true
  } catch {
    clearAdminToken()
    return false
  }
}

async function fetchStatus() {
  const [voteStatus, isAdmin] = await Promise.all([
    getVoteStatus().catch(() => ({ voted: false })),
    checkAdminSession(),
  ])
  return { hasVoted: voteStatus.voted, isAdmin }
}

function App() {
  // null = still checking with the server
  const [hasVoted, setHasVoted] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)

  const applyStatus = useCallback((status) => {
    setIsAdmin(status.isAdmin)
    setHasVoted(status.hasVoted)
  }, [])

  useEffect(() => {
    fetchStatus().then(applyStatus)
  }, [applyStatus])

  function handleAdminLogin() {
    setIsAdmin(true)
    setShowAdminLogin(false)
  }

  // Votes may have been reset while in admin mode, so check the voter status again
  const handleAdminLogout = useCallback(() => {
    clearAdminToken()
    setHasVoted(null)
    fetchStatus().then(applyStatus)
  }, [applyStatus])

  function renderContent() {
    if (hasVoted === null) return <Loader />
    if (showAdminLogin) {
      return <AdminLogin onSuccess={handleAdminLogin} onCancel={() => setShowAdminLogin(false)} />
    }
    if (isAdmin || hasVoted) {
      return <VotesBoard isAdmin={isAdmin} hasVoted={hasVoted} onUnauthorized={handleAdminLogout} />
    }
    return <VoteForm onVoted={() => setHasVoted(true)} />
  }

  return (
    <main className="app">
      <Header />
      {renderContent()}
      {!showAdminLogin && hasVoted !== null && (
        <Footer
          isAdmin={isAdmin}
          onAdminLogin={() => setShowAdminLogin(true)}
          onAdminLogout={handleAdminLogout}
        />
      )}
    </main>
  )
}

export default App
