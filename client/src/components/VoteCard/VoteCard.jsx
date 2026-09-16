import TeddyBear from '../TeddyBear/TeddyBear.jsx'
import { TEAMS } from '../../constants/teams.js'
import './VoteCard.css'

function VoteCard({ vote, revealResult, onDelete }) {
  function handleDelete() {
    if (window.confirm(`למחוק את ההימור של "${vote.relation}"?`)) {
      onDelete(vote.id)
    }
  }

  const classes = [
    'vote-card',
    `vote-card--${vote.guess}`,
    vote.isMine && 'vote-card--mine',
    revealResult && (vote.guess === revealResult ? 'vote-card--correct' : 'vote-card--wrong'),
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <li className={classes}>
      {vote.photo ? (
        <img className="vote-card__photo" src={vote.photo} alt={vote.relation} />
      ) : (
        <span className="vote-card__photo vote-card__photo--placeholder">
          <TeddyBear color={TEAMS[vote.guess].color} accent={TEAMS[vote.guess].accent} size={48} />
        </span>
      )}
      <span className="vote-card__relation">{vote.relation}</span>
      {vote.isMine && <span className="vote-card__badge">אני</span>}
      {revealResult === vote.guess && (
        <span className="vote-card__winner" aria-label="ניחש/ה נכון">
          🏆
        </span>
      )}
      {onDelete && (
        <button className="vote-card__delete" type="button" onClick={handleDelete} aria-label={`מחיקת ${vote.relation}`}>
          ✕
        </button>
      )}
    </li>
  )
}

export default VoteCard
