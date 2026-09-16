import TeddyBear from '../TeddyBear/TeddyBear.jsx'
import './VoteCard.css'

const BEAR_COLORS = {
  girl: { color: '#f7a8c4', accent: '#fbd3e2' },
  boy: { color: '#9ccbf2', accent: '#cfe6f9' },
}

function VoteCard({ vote, onDelete }) {
  function handleDelete() {
    if (window.confirm(`למחוק את ההימור של "${vote.relation}"?`)) {
      onDelete(vote.id)
    }
  }

  return (
    <li className={`vote-card vote-card--${vote.guess}${vote.isMine ? ' vote-card--mine' : ''}`}>
      {vote.photo ? (
        <img className="vote-card__photo" src={vote.photo} alt={vote.relation} />
      ) : (
        <span className="vote-card__photo vote-card__photo--placeholder">
          <TeddyBear {...BEAR_COLORS[vote.guess]} size={48} />
        </span>
      )}
      <span className="vote-card__relation">{vote.relation}</span>
      {vote.isMine && <span className="vote-card__badge">אני</span>}
      {onDelete && (
        <button className="vote-card__delete" type="button" onClick={handleDelete} aria-label={`מחיקת ${vote.relation}`}>
          ✕
        </button>
      )}
    </li>
  )
}

export default VoteCard
