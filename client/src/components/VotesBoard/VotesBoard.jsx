import { useEffect, useState } from 'react'
import { deleteAllVotes, deleteVote, getAllVotes } from '../../api/votesApi.js'
import { clearReveal, setReveal } from '../../api/revealApi.js'
import { TEAMS } from '../../constants/teams.js'
import AdminToolbar from '../AdminToolbar/AdminToolbar.jsx'
import Loader from '../Loader/Loader.jsx'
import RevealBanner from '../RevealBanner/RevealBanner.jsx'
import ScoreBar from '../ScoreBar/ScoreBar.jsx'
import TeamColumn from '../TeamColumn/TeamColumn.jsx'
import './VotesBoard.css'

const REFRESH_INTERVAL_MS = 10_000

// Admin session expired or voter lost access (e.g. votes were reset)
const isAccessError = (err) => err.status === 401 || err.status === 403

function VotesBoard({ isAdmin, hasVoted, reveal, onRevealChange, onUnauthorized }) {
  const [votes, setVotes] = useState(null)
  const [error, setError] = useState('')
  const revealResult = reveal.result

  function handleError(err, message) {
    if (isAccessError(err)) return onUnauthorized()
    setError(message)
  }

  // Refresh periodically so new votes show up without reloading the page
  useEffect(() => {
    const load = () =>
      getAllVotes()
        .then((data) => {
          setVotes(data)
          setError('')
        })
        .catch((err) => (isAccessError(err) ? onUnauthorized() : setError('לא הצלחנו לטעון את ההימורים')))

    load()
    const interval = setInterval(load, REFRESH_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [isAdmin, revealResult, onUnauthorized])

  async function handleDeleteVote(id) {
    try {
      await deleteVote(id)
      setVotes((current) => current.filter((vote) => vote.id !== id))
    } catch (err) {
      handleError(err, 'המחיקה נכשלה')
    }
  }

  async function handleResetAll() {
    try {
      await Promise.all([deleteAllVotes(), clearReveal()])
      setVotes([])
      onRevealChange({ result: null, revealedAt: null })
    } catch (err) {
      handleError(err, 'האיפוס נכשל')
    }
  }

  async function handleReveal(result) {
    try {
      onRevealChange(await setReveal(result))
    } catch (err) {
      handleError(err, 'החשיפה נכשלה')
    }
  }

  async function handleUndoReveal() {
    try {
      await clearReveal()
      onRevealChange({ result: null, revealedAt: null })
    } catch (err) {
      handleError(err, 'ביטול החשיפה נכשל')
    }
  }

  if (!votes) {
    return error ? <p className="votes-board__error">{error}</p> : <Loader />
  }

  const votesByTeam = (guess) => votes.filter((vote) => vote.guess === guess)

  return (
    <section className="votes-board">
      {isAdmin && (
        <AdminToolbar
          votesCount={votes.length}
          revealResult={revealResult}
          onResetAll={handleResetAll}
          onReveal={handleReveal}
          onUndoReveal={handleUndoReveal}
        />
      )}
      {revealResult && <RevealBanner result={revealResult} votes={votes} />}
      {hasVoted && !isAdmin && !revealResult && <p className="votes-board__thanks">תודה! ההצבעה שלך נקלטה 🎉</p>}
      {error && <p className="votes-board__error">{error}</p>}
      <ScoreBar girls={votesByTeam('girl').length} boys={votesByTeam('boy').length} />
      <div className="votes-board__teams">
        {Object.values(TEAMS).map((team) => (
          <TeamColumn
            key={team.guess}
            team={team}
            votes={votesByTeam(team.guess)}
            revealResult={revealResult}
            onDeleteVote={isAdmin ? handleDeleteVote : undefined}
          />
        ))}
      </div>
    </section>
  )
}

export default VotesBoard
