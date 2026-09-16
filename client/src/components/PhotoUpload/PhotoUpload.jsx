import { useState } from 'react'
import { resizeImage } from '../../utils/resizeImage.js'
import './PhotoUpload.css'

function PhotoUpload({ value, onChange }) {
  const [error, setError] = useState('')

  async function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    try {
      setError('')
      onChange(await resizeImage(file))
    } catch {
      setError('לא הצלחנו לקרוא את התמונה, נסו תמונה אחרת')
    }
  }

  return (
    <div className="photo-upload">
      <label className="photo-upload__circle">
        {value ? (
          <img className="photo-upload__preview" src={value} alt="התמונה שלי" />
        ) : (
          <span className="photo-upload__placeholder">
            📷
            <br />
            העלו תמונה
          </span>
        )}
        <input className="photo-upload__input" type="file" accept="image/*" onChange={handleFile} />
      </label>
      {value && <span className="photo-upload__hint">לחצו להחלפה</span>}
      {error && <span className="photo-upload__error">{error}</span>}
    </div>
  )
}

export default PhotoUpload
