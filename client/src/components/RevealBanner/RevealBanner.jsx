import { REVEAL_TEXT } from '../../constants/teams.js'
import './RevealBanner.css'

function RevealBanner({ result, votes }) {
  const correct = votes.filter((vote) => vote.guess === result).length
  const myVote = votes.find((vote) => vote.isMine)

  return (
    <div className={`reveal-banner reveal-banner--${result}`}>
      <p className="reveal-banner__title">{REVEAL_TEXT[result]}</p>
      <p className="reveal-banner__stats">
        {correct} מתוך {votes.length} ניחשו נכון
      </p>
      {myVote && (
        <p className="reveal-banner__mine">{myVote.guess === result ? 'ואת/ה ביניהם! 🏆' : 'הפעם לא קלעת 😅'}</p>
      )}
    </div>
  )
}

export default RevealBanner
