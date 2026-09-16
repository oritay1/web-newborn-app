import { useState } from 'react'
import { resizeImage } from '../../utils/resizeImage.js'
import './PhotoUpload.css'

function PhotoUpload({ value, onChange, onProcessingChange }) {
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  function setBusy(busy) {
    setProcessing(busy)
    onProcessingChange?.(busy)
  }

  async function handleFile(e) {
    const file = e.target.files[0]
    // Allow picking the same file again after removing it
    e.target.value = ''
    if (!file) return
    setError('')
    setBusy(true)
    try {
      onChange(await resizeImage(file))
    } catch {
      setError('לא הצלחנו לקרוא את התמונה, נסו תמונה אחרת')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="photo-upload">
      <label className={`photo-upload__circle${processing ? ' photo-upload__circle--processing' : ''}`}>
        {processing ? (
          <span className="photo-upload__placeholder">מעבד תמונה...</span>
        ) : value ? (
          <img className="photo-upload__preview" src={value} alt="התמונה שלי" />
        ) : (
          <span className="photo-upload__placeholder">
            📷
            <br />
            העלו תמונה
            <br />
            <span className="photo-upload__optional">(לא חובה)</span>
          </span>
        )}
        <input
          className="photo-upload__input"
          type="file"
          accept="image/*,.heic,.heif"
          onChange={handleFile}
          disabled={processing}
        />
      </label>
      {value && !processing && (
        <button className="photo-upload__remove" type="button" onClick={() => onChange('')}>
          הסרת תמונה
        </button>
      )}
      {error && <span className="photo-upload__error">{error}</span>}
    </div>
  )
}

export default PhotoUpload
