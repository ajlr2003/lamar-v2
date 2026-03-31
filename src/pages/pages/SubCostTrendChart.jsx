import { useEffect, useRef, useState } from 'react'

const DATA = [
  { m: 'Jan', budget: 3.3, actual: 3.1 },
  { m: 'Feb', budget: 3.7, actual: 3.5 },
  { m: 'Mar', budget: 4.0, actual: 3.8 },
  { m: 'Apr', budget: 4.2, actual: 4.0 },
  { m: 'May', budget: 4.5, actual: 4.2 },
  { m: 'Jun', budget: 4.8, actual: 4.4 },
]

const W = 520, H = 240
const PL = 46, PR = 16, PT = 16, PB = 38
const DW = W - PL - PR, DH = H - PT - PB
const MIN_V = 2.6, MAX_V = 5.2

const xOf = i => PL + (i / (DATA.length - 1)) * DW
const yOf = v => PT + DH - ((v - MIN_V) / (MAX_V - MIN_V)) * DH

export default function SubCostTrendChart() {
  const svgRef = useRef(null)
  const [tooltip, setTooltip] = useState(null)

  useEffect(() => {
    const NS = 'http://www.w3.org/2000/svg'
    const svg = svgRef.current
    if (!svg) return
    while (svg.firstChild) svg.removeChild(svg.firstChild)

    function mk(tag, attrs, text) {
      const e = document.createElementNS(NS, tag)
      Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v))
      if (text !== undefined) e.textContent = text
      return e
    }

    // Grid + Y labels
    ;[3.0, 3.5, 4.0, 4.5, 5.0].forEach(g => {
      const yy = yOf(g)
      svg.appendChild(mk('line', { x1: PL, y1: yy, x2: W - PR, y2: yy, stroke: '#f0f0f0', 'stroke-width': '1' }))
      svg.appendChild(mk('text', { x: PL - 6, y: yy + 4, 'font-size': '10', fill: '#94a3b8', 'text-anchor': 'end' }, `${g.toFixed(1)}`))
    })

    // Budget line (blue)
    const bPath = DATA.map((d, i) => `${i === 0 ? 'M' : 'L'}${xOf(i).toFixed(1)},${yOf(d.budget).toFixed(1)}`).join(' ')
    svg.appendChild(mk('path', { d: bPath, fill: 'none', stroke: '#3b82f6', 'stroke-width': '2.5', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }))

    // Actual line (green)
    const aPath = DATA.map((d, i) => `${i === 0 ? 'M' : 'L'}${xOf(i).toFixed(1)},${yOf(d.actual).toFixed(1)}`).join(' ')
    svg.appendChild(mk('path', { d: aPath, fill: 'none', stroke: '#10b981', 'stroke-width': '2.5', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }))

    // Budget dots
    DATA.forEach((d, i) =>
      svg.appendChild(mk('circle', { cx: xOf(i).toFixed(1), cy: yOf(d.budget).toFixed(1), r: '4', fill: '#3b82f6', 'pointer-events': 'none' }))
    )
    // Actual dots
    DATA.forEach((d, i) =>
      svg.appendChild(mk('circle', { cx: xOf(i).toFixed(1), cy: yOf(d.actual).toFixed(1), r: '4', fill: '#10b981', 'pointer-events': 'none' }))
    )

    // X labels
    DATA.forEach((d, i) =>
      svg.appendChild(mk('text', { x: xOf(i).toFixed(1), y: PT + DH + 18, 'font-size': '10', fill: '#94a3b8', 'text-anchor': 'middle' }, d.m))
    )
  }, [])

  function onMouseMove(e) {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const mx = (e.clientX - rect.left) * (W / rect.width)
    let best = 0, bd = Infinity
    DATA.forEach((_, i) => { const d = Math.abs(xOf(i) - mx); if (d < bd) { bd = d; best = i } })
    if (bd < 40) {
      setTooltip({ i: best, x: xOf(best) * (rect.width / W), y: 8 })
    } else {
      setTooltip(null)
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        style={{ display: 'block', width: '100%', height: 'auto' }}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setTooltip(null)}
      />
      {tooltip && (
        <div className="sct-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          <div className="sct-tt-title">{DATA[tooltip.i].m}</div>
          <div className="sct-tt-row">
            <span className="sct-tt-dot" style={{ background: '#3b82f6' }} />
            Budget: ${DATA[tooltip.i].budget.toFixed(1)}B
          </div>
          <div className="sct-tt-row">
            <span className="sct-tt-dot" style={{ background: '#10b981' }} />
            Actual: ${DATA[tooltip.i].actual.toFixed(1)}B
          </div>
        </div>
      )}
    </div>
  )
}
