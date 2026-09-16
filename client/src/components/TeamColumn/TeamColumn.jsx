import TeddyBear from '../TeddyBear/TeddyBear.jsx'
import VoteCard from '../VoteCard/VoteCard.jsx'
import './TeamColumn.css'

function TeamColumn({ team, votes, revealResult, onDeleteVote }) {
  const isWinner = revealResult === team.guess

  return (
    <section className={`team-column team-column--${team.guess}${isWinner ? ' team-column--winner' : ''}`}>
      <header className="team-column__header">
        <TeddyBear color={team.color} accent={team.accent} size={48} />
        <h2 className="team-column__title">
          {team.title}
          {isWinner && ' 🏆'}
        </h2>
      </header>
      {votes.length === 0 ? (
        <p className="team-column__empty">עדיין אין הימורים</p>
      ) : (
        <ul className="team-column__list">
          {votes.map((vote) => (
            <VoteCard key={vote.id} vote={vote} revealResult={revealResult} onDelete={onDeleteVote} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default TeamColumn
