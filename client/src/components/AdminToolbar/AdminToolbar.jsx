import { REVEAL_TEXT, TEAMS } from '../../constants/teams.js'
import './AdminToolbar.css'

function AdminToolbar({ votesCount, revealResult, onResetAll, onReveal, onUndoReveal }) {
  function handleReset() {
    if (window.confirm(`למחוק את כל ${votesCount} ההימורים ולבטל את החשיפה? אי אפשר לבטל את הפעולה.`)) {
      onResetAll()
    }
  }

  function handleReveal(result) {
    if (window.confirm(`לחשוף לכולם: ${REVEAL_TEXT[result]}\nאחרי החשיפה אי אפשר להצביע יותר.`)) {
      onReveal(result)
    }
  }

  return (
    <div className="admin-toolbar">
      <div className="admin-toolbar__row">
        <span className="admin-toolbar__label">🔐 מצב מנהל</span>
        <button className="admin-toolbar__reset" type="button" onClick={handleReset}>
          איפוס הכל
        </button>
      </div>
      <div className="admin-toolbar__row">
        {revealResult ? (
          <>
            <span>נחשף: {TEAMS[revealResult].label}</span>
            <button className="admin-toolbar__undo" type="button" onClick={onUndoReveal}>
              ביטול חשיפה
            </button>
          </>
        ) : (
          <>
            <span>רגע החשיפה:</span>
            <div className="admin-toolbar__reveal-buttons">
              <button
                className="admin-toolbar__reveal admin-toolbar__reveal--girl"
                type="button"
                onClick={() => handleReveal('girl')}
              >
                בת 🎀
              </button>
              <button
                className="admin-toolbar__reveal admin-toolbar__reveal--boy"
                type="button"
                onClick={() => handleReveal('boy')}
              >
                בן 💙
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AdminToolbar
