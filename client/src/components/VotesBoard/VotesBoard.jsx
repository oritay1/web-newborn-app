import { useEffect, useState } from 'react'
import { getAllVotes } from '../../api/votesApi.js'
import Loader from '../Loader/Loader.jsx'
import ScoreBar from '../ScoreBar/ScoreBar.jsx'
import TeamColumn from '../TeamColumn/TeamColumn.jsx'
import './VotesBoard.css'

const REFRESH_INTERVAL_MS = 10_000

const TEAMS = [
  { guess: 'girl', title: 'צוות בת', color: '#f7a8c4', accent: '#fbd3e2' },
  { guess: 'boy', title: 'צוות בן', color: '#9ccbf2', accent: '#cfe6f9' },
]

function VotesBoard() {
  const [votes, setVotes] = useState(null)
  const [error, setError] = useState('')

  // Refresh periodically so new votes show up without reloading the page
  useEffect(() => {
    const load = () =>
      getAllVotes()
        .then((data) => {
          setVotes(data)
          setError('')
        })
        .catch(() => setError('לא הצלחנו לטעון את ההימורים'))

    load()
    const interval = setInterval(load, REFRESH_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  if (!votes) {
    return error ? <p className="votes-board__error">{error}</p> : <Loader />
  }

  const votesByTeam = (guess) => votes.filter((vote) => vote.guess === guess)

  return (
    <section className="votes-board">
      <p className="votes-board__thanks">תודה! ההצבעה שלך נקלטה 🎉</p>
      <ScoreBar girls={votesByTeam('girl').length} boys={votesByTeam('boy').length} />
      <div className="votes-board__teams">
        {TEAMS.map((team) => (
          <TeamColumn key={team.guess} team={team} votes={votesByTeam(team.guess)} />
        ))}
      </div>
    </section>
  )
}

export default VotesBoard
