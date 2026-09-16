import { useEffect, useState } from 'react'
import { deleteAllVotes, deleteVote, getAllVotes } from '../../api/votesApi.js'
import AdminToolbar from '../AdminToolbar/AdminToolbar.jsx'
import Loader from '../Loader/Loader.jsx'
import ScoreBar from '../ScoreBar/ScoreBar.jsx'
import TeamColumn from '../TeamColumn/TeamColumn.jsx'
import './VotesBoard.css'

const REFRESH_INTERVAL_MS = 10_000

const TEAMS = [
  { guess: 'girl', title: 'צוות בת', color: '#f7a8c4', accent: '#fbd3e2' },
  { guess: 'boy', title: 'צוות בן', color: '#9ccbf2', accent: '#cfe6f9' },
]

// Admin session expired or voter lost access (e.g. votes were reset)
const isAccessError = (err) => err.status === 401 || err.status === 403

function VotesBoard({ isAdmin, hasVoted, onUnauthorized }) {
  const [votes, setVotes] = useState(null)
  const [error, setError] = useState('')

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
  }, [isAdmin, onUnauthorized])

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
      await deleteAllVotes()
      setVotes([])
    } catch (err) {
      handleError(err, 'האיפוס נכשל')
    }
  }

  if (!votes) {
    return error ? <p className="votes-board__error">{error}</p> : <Loader />
  }

  const votesByTeam = (guess) => votes.filter((vote) => vote.guess === guess)

  return (
    <section className="votes-board">
      {isAdmin && <AdminToolbar votesCount={votes.length} onResetAll={handleResetAll} />}
      {hasVoted && !isAdmin && <p className="votes-board__thanks">תודה! ההצבעה שלך נקלטה 🎉</p>}
      {error && <p className="votes-board__error">{error}</p>}
      <ScoreBar girls={votesByTeam('girl').length} boys={votesByTeam('boy').length} />
      <div className="votes-board__teams">
        {TEAMS.map((team) => (
          <TeamColumn
            key={team.guess}
            team={team}
            votes={votesByTeam(team.guess)}
            onDeleteVote={isAdmin ? handleDeleteVote : undefined}
          />
        ))}
      </div>
    </section>
  )
}

export default VotesBoard
