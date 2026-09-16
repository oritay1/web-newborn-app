import TeddyBear from '../TeddyBear/TeddyBear.jsx'
import VoteCard from '../VoteCard/VoteCard.jsx'
import './TeamColumn.css'

function TeamColumn({ team, votes }) {
  return (
    <section className={`team-column team-column--${team.guess}`}>
      <header className="team-column__header">
        <TeddyBear color={team.color} accent={team.accent} size={48} />
        <h2 className="team-column__title">{team.title}</h2>
      </header>
      {votes.length === 0 ? (
        <p className="team-column__empty">עדיין אין הימורים</p>
      ) : (
        <ul className="team-column__list">
          {votes.map((vote) => (
            <VoteCard key={vote.id} vote={vote} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default TeamColumn
