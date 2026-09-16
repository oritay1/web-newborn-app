import './RelationInput.css'

const SUGGESTIONS = ['סבא', 'סבתא', 'דוד', 'דודה', 'חבר', 'חברה']

function RelationInput({ value, onChange }) {
  return (
    <div className="relation-input">
      <label className="relation-input__label" htmlFor="relation">
        מי אני בשביל היילוד/ה?
      </label>
      <input
        id="relation"
        className="relation-input__field"
        type="text"
        maxLength={40}
        placeholder="למשל: סבתא רחל"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="relation-input__chips">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            className={`relation-input__chip${value === suggestion ? ' relation-input__chip--active' : ''}`}
            onClick={() => onChange(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}

export default RelationInput
