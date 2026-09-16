import { useState } from 'react'
import { createVote } from '../../api/votesApi.js'
import PhotoUpload from '../PhotoUpload/PhotoUpload.jsx'
import RelationInput from '../RelationInput/RelationInput.jsx'
import BearChoice from '../BearChoice/BearChoice.jsx'
import './VoteForm.css'

function VoteForm({ onVoted }) {
  const [photo, setPhoto] = useState('')
  const [relation, setRelation] = useState('')
  const [guess, setGuess] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const isValid = photo && relation.trim() && guess

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isValid) return
    setSubmitting(true)
    setError('')
    try {
      await createVote({ photo, relation: relation.trim(), guess })
      onVoted()
    } catch (err) {
      // Already voted from this browser - just move on to the board
      if (err.status === 409) return onVoted()
      setError('משהו השתבש, נסו שוב')
      setSubmitting(false)
    }
  }

  return (
    <form className="vote-form" onSubmit={handleSubmit}>
      <PhotoUpload value={photo} onChange={setPhoto} />
      <RelationInput value={relation} onChange={setRelation} />

      <div className="vote-form__section">
        <h2 className="vote-form__title">מה ההימור שלך?</h2>
        <BearChoice value={guess} onChange={setGuess} />
      </div>

      <p className="vote-form__note">אפשר להצביע פעם אחת בלבד 🤞</p>
      {error && <p className="vote-form__error">{error}</p>}

      <button className="vote-form__submit" type="submit" disabled={!isValid || submitting}>
        {submitting ? 'שולח...' : 'הצבעה!'}
      </button>
    </form>
  )
}

export default VoteForm
