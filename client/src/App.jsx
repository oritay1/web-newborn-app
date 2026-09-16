import { useCallback, useEffect, useState } from 'react'
import { getVoteStatus } from './api/votesApi.js'
import { getSession } from './api/adminApi.js'
import { getReveal } from './api/revealApi.js'
import { clearAdminToken, getAdminToken } from './utils/adminToken.js'
import { getSeenRevealAt, setSeenRevealAt } from './utils/revealSeen.js'
import Header from './components/Header/Header.jsx'
import Loader from './components/Loader/Loader.jsx'
import VoteForm from './components/VoteForm/VoteForm.jsx'
import VotesBoard from './components/VotesBoard/VotesBoard.jsx'
import AdminLogin from './components/AdminLogin/AdminLogin.jsx'
import RevealOverlay from './components/RevealOverlay/RevealOverlay.jsx'
import Footer from './components/Footer/Footer.jsx'

const REVEAL_POLL_INTERVAL_MS = 5_000
const NO_REVEAL = { result: null, revealedAt: null }

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
  const [voteStatus, isAdmin, reveal] = await Promise.all([
    getVoteStatus().catch(() => ({ voted: false })),
    checkAdminSession(),
    getReveal().catch(() => NO_REVEAL),
  ])
  return { hasVoted: voteStatus.voted, isAdmin, reveal }
}

function App() {
  // null = still checking with the server
  const [hasVoted, setHasVoted] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [reveal, setReveal] = useState(NO_REVEAL)
  const [seenRevealAt, setSeenRevealAtState] = useState(getSeenRevealAt)
  const [showAdminLogin, setShowAdminLogin] = useState(false)

  const applyStatus = useCallback((status) => {
    setIsAdmin(status.isAdmin)
    setReveal(status.reveal)
    setHasVoted(status.hasVoted)
  }, [])

  useEffect(() => {
    fetchStatus().then(applyStatus)
  }, [applyStatus])

  const refreshReveal = useCallback(() => {
    getReveal()
      .then(setReveal)
      .catch(() => {})
  }, [])

  // Everyone on the site sees the reveal within a few seconds of the admin pressing the button
  useEffect(() => {
    const interval = setInterval(refreshReveal, REVEAL_POLL_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [refreshReveal])

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

  function handleCloseReveal() {
    setSeenRevealAt(reveal.revealedAt)
    setSeenRevealAtState(reveal.revealedAt)
  }

  const showRevealOverlay = reveal.result && seenRevealAt !== reveal.revealedAt

  function renderContent() {
    if (hasVoted === null) return <Loader />
    if (showAdminLogin) {
      return <AdminLogin onSuccess={handleAdminLogin} onCancel={() => setShowAdminLogin(false)} />
    }
    if (isAdmin || hasVoted || reveal.result) {
      return (
        <VotesBoard
          isAdmin={isAdmin}
          hasVoted={hasVoted}
          reveal={reveal}
          onRevealChange={setReveal}
          onUnauthorized={handleAdminLogout}
        />
      )
    }
    return <VoteForm onVoted={() => setHasVoted(true)} onVotingClosed={refreshReveal} />
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
      {showRevealOverlay && <RevealOverlay result={reveal.result} onClose={handleCloseReveal} />}
    </main>
  )
}

export default App
