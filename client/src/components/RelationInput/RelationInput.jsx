import './RelationInput.css'

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
    </div>
  )
}

export default RelationInput
