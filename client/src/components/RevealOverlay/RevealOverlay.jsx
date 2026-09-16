import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import TeddyBear from '../TeddyBear/TeddyBear.jsx'
import { REVEAL_TEXT, TEAMS } from '../../constants/teams.js'
import './RevealOverlay.css'

const CONFETTI_DURATION_MS = 4000

function RevealOverlay({ result, onClose }) {
  const team = TEAMS[result]

  useEffect(() => {
    const colors = [team.dark, team.color, team.accent, '#ffffff']
    const end = Date.now() + CONFETTI_DURATION_MS
    let frame

    confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors, disableForReducedMotion: true })

    // Keep shooting from both sides until the time is up
    const shoot = () => {
      confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 }, colors, disableForReducedMotion: true })
      confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 }, colors, disableForReducedMotion: true })
      if (Date.now() < end) frame = requestAnimationFrame(shoot)
    }
    shoot()

    return () => {
      cancelAnimationFrame(frame)
      confetti.reset()
    }
  }, [team])

  return (
    <div className={`reveal-overlay reveal-overlay--${result}`} role="dialog" aria-modal="true" aria-label={REVEAL_TEXT[result]}>
      <div className="reveal-overlay__content">
        <div className="reveal-overlay__bear">
          <TeddyBear color={team.color} accent={team.accent} size={200} />
        </div>
        <h2 className="reveal-overlay__title">{REVEAL_TEXT[result]}</h2>
        <button className="reveal-overlay__close" type="button" onClick={onClose}>
          מי צדק? 👀
        </button>
      </div>
    </div>
  )
}

export default RevealOverlay
