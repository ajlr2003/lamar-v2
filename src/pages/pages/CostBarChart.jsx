import { useEffect, useRef } from 'react'

export default function CostBarChart() {
  const ref = useRef(null)

  useEffect(() => {
    /* ── EXACT COPY from portfolio-overview.html COST BAR CHART block ── */
    const svg = ref.current
    if (!svg) return

    const NS  = 'http://www.w3.org/2000/svg'
    const W = 520, H = 260
    const PL = 56, PR = 12, PT = 16, PB = 44
    const DW = W - PL - PR, DH = H - PT - PB
    const MAX = 4000
    const data = [
      { q: 'Q1 2024', b: 2800, a: 3100 },
      { q: 'Q2 2024', b: 3200, a: 3000 },
      { q: 'Q3 2024', b: 2900, a: 3200 },
      { q: 'Q4 2024', b: 3500, a: 3200 },
    ]
    const BW = 32, GAP = 8, PAIR = BW * 2 + GAP, STEP = PAIR + 36
    const TOTAL = data.length * PAIR + (data.length - 1) * 36
    const SX = PL + (DW - TOTAL) / 2
    const y   = v => PT + DH - (v / MAX) * DH
    const fmt = v => `$${(v / 1000).toFixed(1)}B`

    function el(tag, attrs, text) {
      const e = document.createElementNS(NS, tag)
      Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v))
      if (text !== undefined) e.textContent = text
      return e
    }

    // grid lines + Y labels
    ;[0, 1000, 2000, 3000].forEach(g => {
      const yy = y(g)
      svg.appendChild(el('line', { x1: PL, y1: yy, x2: W - PR, y2: yy, stroke: '#f0f0f0', 'stroke-width': '1' }))
      svg.appendChild(el('text', { x: PL - 6, y: yy + 4, 'font-size': '10', fill: '#94a3b8', 'text-anchor': 'end' },
        `$${g === 0 ? '0.0' : (g / 1000) + '.0'}M`))
    })

    // Y axis label
    svg.appendChild(el('text', { x: 12, y: PT + DH / 2, 'font-size': '9.5', fill: '#94a3b8', 'text-anchor': 'middle', transform: `rotate(-90,12,${PT + DH / 2})` }, 'Cost ($)'))

    // bars
    data.forEach((d, i) => {
      const x0  = SX + i * STEP
      const bY  = y(d.b), bH = DH - (bY - PT)
      const aY  = y(d.a), aH = DH - (aY - PT)
      const mx  = x0 + PAIR / 2

      svg.appendChild(el('rect',  { x: x0,              y: bY, width: BW, height: bH, fill: '#3b5bdb', rx: '3' }))
      svg.appendChild(el('text',  { x: x0 + BW / 2,     y: bY + 14, 'font-size': '9.5', fill: '#fff', 'text-anchor': 'middle', 'font-weight': '600' }, fmt(d.b)))
      svg.appendChild(el('rect',  { x: x0 + BW + GAP,   y: aY, width: BW, height: aH, fill: '#ef4444', rx: '3' }))
      svg.appendChild(el('text',  { x: x0 + BW + GAP + BW / 2, y: aY + 14, 'font-size': '9.5', fill: '#fff', 'text-anchor': 'middle', 'font-weight': '600' }, fmt(d.a)))
      svg.appendChild(el('text',  { x: mx,               y: PT + DH + 20, 'font-size': '10', fill: '#94a3b8', 'text-anchor': 'middle' }, d.q))
    })

    // X axis label
    svg.appendChild(el('text', { x: PL + DW / 2, y: H - 4, 'font-size': '10', fill: '#94a3b8', 'text-anchor': 'middle' }, 'Quarter'))
  }, [])

  return (
    <svg
      ref={ref}
      viewBox="0 0 520 260"
      style={{ display: 'block', width: '100%', height: 'auto' }}
    />
  )
}
