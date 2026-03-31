import { useEffect, useRef } from 'react'

export default function ScheduleLineChart() {
  const ref = useRef(null)

  useEffect(() => {
    /* ── EXACT COPY from portfolio-overview.html SCHEDULE LINE CHART block ── */
    const NS  = 'http://www.w3.org/2000/svg'
    const svg = ref.current
    if (!svg) return

    const W = 520, H = 260
    const PL = 54, PR = 16, PT = 16, PB = 44
    const DW = W - PL - PR, DH = H - PT - PB
    const MIN = 80, MAX = 100
    const data = [
      { m: 'Jan 2024', v: 95 },
      { m: 'Feb 2024', v: 92 },
      { m: 'Mar 2024', v: 88 },
      { m: 'Apr 2024', v: 85 },
      { m: 'May 2024', v: 87 },
      { m: 'Jun 2024', v: 90 },
    ]
    const xOf = i => PL + (i / (data.length - 1)) * DW
    const yOf = v => PT + DH - ((v - MIN) / (MAX - MIN)) * DH

    function el(tag, attrs) {
      const e = document.createElementNS(NS, tag)
      Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v))
      return e
    }

    // gradient
    const defs = el('defs', {})
    const grad = el('linearGradient', { id: 'sg', x1: '0', y1: '0', x2: '0', y2: '1' })
    const s1   = el('stop', { offset: '0%',   'stop-color': '#10b981', 'stop-opacity': '0.2'  })
    const s2   = el('stop', { offset: '100%', 'stop-color': '#10b981', 'stop-opacity': '0.02' })
    grad.appendChild(s1); grad.appendChild(s2); defs.appendChild(grad); svg.appendChild(defs)

    // grid lines + Y labels
    ;[80, 85, 90, 95, 100].forEach(g => {
      const yy = yOf(g)
      svg.appendChild(el('line', { x1: PL, y1: yy, x2: W - PR, y2: yy, stroke: '#f0f0f0', 'stroke-width': '1' }))
      const t = el('text', { x: PL - 6, y: yy + 4, 'font-size': '10', fill: '#94a3b8', 'text-anchor': 'end' })
      t.textContent = `${g}%`
      svg.appendChild(t)
    })

    // Y axis label
    const yl = el('text', { x: 11, y: PT + DH / 2, 'font-size': '8.5', fill: '#94a3b8', 'text-anchor': 'middle', transform: `rotate(-90,11,${PT + DH / 2})` })
    yl.textContent = 'On Time Performance (%)'
    svg.appendChild(yl)

    // area + line paths
    const pts  = data.map((d, i) => [xOf(i), yOf(d.v)])
    const lCmd = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
    const aCmd = `${lCmd} L${pts[pts.length-1][0].toFixed(1)},${(PT+DH).toFixed(1)} L${pts[0][0].toFixed(1)},${(PT+DH).toFixed(1)} Z`

    svg.appendChild(el('path', { d: aCmd, fill: 'url(#sg)' }))
    svg.appendChild(el('path', { d: lCmd, fill: 'none', stroke: '#10b981', 'stroke-width': '2.5', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }))

    // dots
    pts.forEach(p => {
      svg.appendChild(el('circle', { cx: p[0].toFixed(1), cy: p[1].toFixed(1), r: '4.5', fill: '#10b981' }))
    })

    // X labels
    data.forEach((d, i) => {
      const t = el('text', { x: xOf(i).toFixed(1), y: PT + DH + 20, 'font-size': '9.5', fill: '#94a3b8', 'text-anchor': 'middle' })
      t.textContent = d.m
      svg.appendChild(t)
    })

    // X axis label
    const xl = el('text', { x: (PL + DW / 2).toFixed(1), y: H - 4, 'font-size': '10', fill: '#94a3b8', 'text-anchor': 'middle' })
    xl.textContent = 'Month'
    svg.appendChild(xl)
  }, [])

  return (
    <svg
      ref={ref}
      viewBox="0 0 520 260"
      style={{ display: 'block', width: '100%', height: 'auto' }}
    />
  )
}
