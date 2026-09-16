import './ScoreBar.css'

function ScoreBar({ girls, boys }) {
  const total = girls + boys
  const girlsPercent = total ? Math.round((girls / total) * 100) : 50

  return (
    <div className="score-bar">
      <div className="score-bar__counts">
        <span className="score-bar__count score-bar__count--girl">בת {girls}</span>
        <span className="score-bar__total">{total} הימורים</span>
        <span className="score-bar__count score-bar__count--boy">בן {boys}</span>
      </div>
      <div
        className="score-bar__track"
        role="img"
        aria-label={`${girls} הימרו בת, ${boys} הימרו בן`}
      >
        <div className="score-bar__fill score-bar__fill--girl" style={{ width: `${girlsPercent}%` }}>
          {total > 0 && `${girlsPercent}%`}
        </div>
        <div className="score-bar__fill score-bar__fill--boy">{total > 0 && `${100 - girlsPercent}%`}</div>
      </div>
    </div>
  )
}

export default ScoreBar
