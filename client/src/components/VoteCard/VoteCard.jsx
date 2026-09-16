import './VoteCard.css'

function VoteCard({ vote, onDelete }) {
  function handleDelete() {
    if (window.confirm(`למחוק את ההימור של "${vote.relation}"?`)) {
      onDelete(vote.id)
    }
  }

  return (
    <li className={`vote-card vote-card--${vote.guess}${vote.isMine ? ' vote-card--mine' : ''}`}>
      <img className="vote-card__photo" src={vote.photo} alt={vote.relation} />
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
