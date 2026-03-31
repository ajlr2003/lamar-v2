import { useEffect, useRef, useState } from 'react'

const DATA = [
  { w: 'Week 1', v: 80 },
  { w: 'Week 2', v: 82 },
  { w: 'Week 3', v: 83 },
  { w: 'Week 4', v: 85 },
  { w: 'Week 5', v: 87 },
  { w: 'Week 6', v: 89 },
]

const W = 520, H = 240
const PL = 46, PR = 16, PT = 16, PB = 38
const DW = W - PL - PR, DH = H - PT - PB
const MIN_V = 60, MAX_V = 100

const xOf = i => PL + (i / (DATA.length - 1)) * DW
const yOf = v => PT + DH - ((v - MIN_V) / (MAX_V - MIN_V)) * DH

export default function SubScheduleChart() {
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

    // Gradient
    const defs = mk('defs', {})
    const grad = mk('linearGradient', { id: 'sub-sg', x1: '0', y1: '0', x2: '0', y2: '1' })
    grad.appendChild(mk('stop', { offset: '0%',   'stop-color': '#f59e0b', 'stop-opacity': '0.22' }))
    grad.appendChild(mk('stop', { offset: '100%', 'stop-color': '#f59e0b', 'stop-opacity': '0.02' }))
    defs.appendChild(grad)
    svg.appendChild(defs)

    // Grid + Y labels
    ;[60, 70, 80, 90, 100].forEach(g => {
      const yy = yOf(g)
      svg.appendChild(mk('line', { x1: PL, y1: yy, x2: W - PR, y2: yy, stroke: '#f0f0f0', 'stroke-width': '1' }))
      svg.appendChild(mk('text', { x: PL - 6, y: yy + 4, 'font-size': '10', fill: '#94a3b8', 'text-anchor': 'end' }, `${g}`))
    })

    // Area + line
    const pts = DATA.map((d, i) => [xOf(i), yOf(d.v)])
    const lCmd = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
    const aCmd = `${lCmd} L${pts[pts.length - 1][0].toFixed(1)},${(PT + DH).toFixed(1)} L${pts[0][0].toFixed(1)},${(PT + DH).toFixed(1)} Z`
    svg.appendChild(mk('path', { d: aCmd, fill: 'url(#sub-sg)' }))
    svg.appendChild(mk('path', { d: lCmd, fill: 'none', stroke: '#f59e0b', 'stroke-width': '2.5', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }))

    // Dots
    pts.forEach(p =>
      svg.appendChild(mk('circle', { cx: p[0].toFixed(1), cy: p[1].toFixed(1), r: '4', fill: '#f59e0b', 'pointer-events': 'none' }))
    )

    // X labels
    DATA.forEach((d, i) =>
      svg.appendChild(mk('text', { x: xOf(i).toFixed(1), y: PT + DH + 18, 'font-size': '10', fill: '#94a3b8', 'text-anchor': 'middle' }, d.w))
    )
  }, [])

  function onMouseMove(e) {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const mx = (e.clientX - rect.left) * (W / rect.width)
    let best = 0, bd = Infinity
    DATA.forEach((_, i) => { const d = Math.abs(xOf(i) - mx); if (d < bd) { bd = d; best = i } })
    if (bd < 50) {
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
          <div className="sct-tt-title">{DATA[tooltip.i].w}</div>
          <div className="sct-tt-row">
            <span className="sct-tt-dot" style={{ background: '#f59e0b' }} />
            On-Time: {DATA[tooltip.i].v}%
          </div>
        </div>
      )}
    </div>
  )
}