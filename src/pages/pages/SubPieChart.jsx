import { useState } from 'react'

const CX = 160, CY = 160, R = 130

function polar(angle) {
  const rad = (angle - 90) * Math.PI / 180
  return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
}

function slicePath(startAngle, endAngle) {
  const s = polar(startAngle)
  const e = polar(endAngle)
  const large = endAngle - startAngle > 180 ? 1 : 0
  return `M ${CX} ${CY} L ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${R} ${R} 0 ${large} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)} Z`
}

export default function SubPieChart({ slices }) {
  const [hovered, setHovered] = useState(null)
  const [mouse, setMouse]     = useState({ x: 0, y: 0 })

  let cursor = 0
  const arcs = slices.map(s => {
    const deg   = (s.pct / 100) * 360
    const start = cursor
    const end   = cursor + deg
    cursor      = end
    return { ...s, start, end, mid: (start + end) / 2 }
  })

  function onMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div className="sp-pie-wrap">
      <div className="sp-pie-chart-area" style={{ position: 'relative' }}>
        <svg
          width="320" height="320"
          viewBox="0 0 320 320"
          style={{ display: 'block' }}
          onMouseMove={onMove}
          onMouseLeave={() => setHovered(null)}
        >
          {arcs.map((a, i) => (
            <path
              key={i}
              d={slicePath(a.start, a.end)}
              fill={a.color}
              opacity={hovered === null || hovered === i ? 1 : 0.6}
              stroke="#fff"
              strokeWidth="2"
              style={{ cursor: 'pointer', transition: 'opacity 0.15s' }}
              onMouseEnter={() => setHovered(i)}
            />
          ))}
        </svg>
        {hovered !== null && (
          <div
            className="sp-pie-tooltip"
            style={{ left: mouse.x + 12, top: mouse.y - 10 }}
          >
            <div className="sp-pie-tt-label">{arcs[hovered].label}</div>
            <div className="sp-pie-tt-val">{arcs[hovered].pct}% · {arcs[hovered].value}</div>
          </div>
        )}
      </div>

      <div className="sp-pie-legend">
        {slices.map((s, i) => (
          <div
            key={i}
            className="sp-pie-legend-item"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="sp-pie-legend-dot" style={{ background: s.color }} />
            <span className="sp-pie-legend-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}