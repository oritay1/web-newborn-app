import './TeddyBear.css'

function TeddyBear({ color, accent, size = 120 }) {
  return (
    <svg className="teddy-bear" width={size} height={size} viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="30" cy="30" r="16" fill={color} />
      <circle cx="90" cy="30" r="16" fill={color} />
      <circle cx="30" cy="30" r="8" fill={accent} />
      <circle cx="90" cy="30" r="8" fill={accent} />
      <ellipse cx="60" cy="97" rx="32" ry="22" fill={color} />
      <circle cx="60" cy="55" r="36" fill={color} />
      <ellipse cx="60" cy="68" rx="15" ry="11" fill={accent} />
      <circle cx="47" cy="50" r="4" fill="#3d3346" />
      <circle cx="73" cy="50" r="4" fill="#3d3346" />
      <ellipse cx="60" cy="63" rx="5" ry="3.5" fill="#3d3346" />
      <path d="M55 70 Q60 75 65 70" stroke="#3d3346" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M50 88 L60 95 L70 88 L70 100 L60 95 L50 100 Z" fill={accent} />
    </svg>
  )
}

export default TeddyBear
