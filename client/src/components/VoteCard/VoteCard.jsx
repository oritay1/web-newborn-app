import './VoteCard.css'

function VoteCard({ vote }) {
  return (
    <li className={`vote-card vote-card--${vote.guess}${vote.isMine ? ' vote-card--mine' : ''}`}>
      <img className="vote-card__photo" src={vote.photo} alt={vote.relation} />
      <span className="vote-card__relation">{vote.relation}</span>
      {vote.isMine && <span className="vote-card__badge">אני</span>}
    </li>
  )
}

export default VoteCard
