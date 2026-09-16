import TeddyBear from '../TeddyBear/TeddyBear.jsx'
import './BearChoice.css'

const OPTIONS = [
  { guess: 'girl', label: 'בת', color: '#f7a8c4', accent: '#fbd3e2' },
  { guess: 'boy', label: 'בן', color: '#9ccbf2', accent: '#cfe6f9' },
]

function BearChoice({ value, onChange }) {
  return (
    <div className="bear-choice" role="radiogroup" aria-label="ההימור שלי">
      {OPTIONS.map(({ guess, label, color, accent }) => (
        <button
          key={guess}
          type="button"
          role="radio"
          aria-checked={value === guess}
          className={`bear-choice__option bear-choice__option--${guess}${
            value === guess ? ' bear-choice__option--selected' : ''
          }`}
          onClick={() => onChange(guess)}
        >
          <TeddyBear color={color} accent={accent} />
          <span className="bear-choice__label">{label}</span>
        </button>
      ))}
    </div>
  )
}

export default BearChoice
