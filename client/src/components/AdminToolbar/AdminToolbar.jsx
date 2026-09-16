import './AdminToolbar.css'

function AdminToolbar({ votesCount, onResetAll }) {
  function handleReset() {
    if (window.confirm(`למחוק את כל ${votesCount} ההימורים? אי אפשר לבטל את הפעולה.`)) {
      onResetAll()
    }
  }

  return (
    <div className="admin-toolbar">
      <span className="admin-toolbar__label">🔐 מצב מנהל</span>
      <button className="admin-toolbar__reset" type="button" onClick={handleReset} disabled={votesCount === 0}>
        איפוס כל ההימורים
      </button>
    </div>
  )
}

export default AdminToolbar
