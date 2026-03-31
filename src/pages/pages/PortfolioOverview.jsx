import CostBarChart from './CostBarChart.jsx'
import ScheduleLineChart from './ScheduleLineChart.jsx'
import '../../styles/PortfolioOverview.css'

export default function PortfolioOverview() {
  return (
    <div className="po">

      <h1 className="page-title">Portfolio Overview</h1>
      <p className="page-sub">Real-time insights across all subsidiaries and projects</p>

      {/* STAT CARDS */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#eff6ff' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
          </div>
          <div className="stat-value" style={{ color: '#1e293b' }}>247</div>
          <div className="stat-label">Total Projects</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fffbeb' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <div className="stat-value" style={{ color: '#d97706' }}>12%</div>
          <div className="stat-label">Projects At Risk</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fef2f2' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
          </div>
          <div className="stat-value" style={{ color: '#dc2626' }}>-8.5%</div>
          <div className="stat-label">Cost Variance</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fffbeb' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div className="stat-value" style={{ color: '#d97706' }}>15%</div>
          <div className="stat-label">Schedule Delay</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f0fdf4' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
          </div>
          <div className="stat-value" style={{ color: '#1e293b' }}>12</div>
          <div className="stat-label">Active Subsidiaries</div>
        </div>
      </div>

      {/* CHARTS */}
      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-header">
            <span className="chart-title">Cost vs Budget</span>
            <div className="legend">
              <span className="legend-item"><span className="legend-dot" style={{ background: '#3b5bdb' }} />Budget</span>
              <span className="legend-item"><span className="legend-dot" style={{ background: '#ef4444' }} />Actual Cost</span>
            </div>
          </div>
          <CostBarChart />
        </div>
        <div className="chart-card">
          <div className="chart-header">
            <span className="chart-title">Schedule Performance</span>
          </div>
          <ScheduleLineChart />
        </div>
      </div>

      {/* SUBSIDIARY PERFORMANCE */}
      <div className="section-card">
        <div className="section-title">Subsidiary Performance</div>
        <table className="tbl">
          <thead>
            <tr>
              <th>Subsidiary</th><th>Projects</th><th>Cost Variance</th><th>Schedule Status</th><th>Risk Level</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><div className="sub-name">Lamar Residential</div><div className="sub-type">Housing Development</div></td>
              <td>47</td>
              <td><span className="variance pos">+2.3%</span></td>
              <td><span className="badge badge-green">On Track</span></td>
              <td><span className="risk-dot risk-green" /></td>
            </tr>
            <tr>
              <td><div className="sub-name">Lamar Commercial</div><div className="sub-type">Office &amp; Retail</div></td>
              <td>23</td>
              <td><span className="variance neg">-12.8%</span></td>
              <td><span className="badge badge-red">Delayed</span></td>
              <td><span className="risk-dot risk-red" /></td>
            </tr>
            <tr>
              <td><div className="sub-name">Lamar Infrastructure</div><div className="sub-type">Roads &amp; Utilities</div></td>
              <td>89</td>
              <td><span className="variance neg">-5.2%</span></td>
              <td><span className="badge badge-orange">Warning</span></td>
              <td><span className="risk-dot risk-yellow" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* CRITICAL PROJECTS */}
      <div className="section-card">
        <div className="section-title">Critical Projects</div>
        <div className="critical-list">
          <div className="critical-item" style={{ background: '#fff5f5', borderColor: '#fed7d7' }}>
            <div>
              <div className="critical-name">Marina Bay Complex</div>
              <div className="critical-type">Commercial Development</div>
            </div>
            <div className="critical-stats">
              <div className="crit-stat"><div className="crit-val">67%</div><div className="crit-lbl">Progress</div></div>
              <div className="crit-stat"><div className="crit-val crit-val-delay">+45 days</div><div className="crit-lbl">Delay</div></div>
              <div className="crit-stat"><div className="crit-val crit-val-low">6.2</div><div className="crit-lbl">Contractor Score</div></div>
            </div>
          </div>
          <div className="critical-item" style={{ background: '#fffbeb', borderColor: '#fde68a' }}>
            <div>
              <div className="critical-name">Sunset Residential Phase 2</div>
              <div className="critical-type">Housing Development</div>
            </div>
            <div className="critical-stats">
              <div className="crit-stat"><div className="crit-val">82%</div><div className="crit-lbl">Progress</div></div>
              <div className="crit-stat"><div className="crit-val crit-val-delay">+12 days</div><div className="crit-lbl">Delay</div></div>
              <div className="crit-stat"><div className="crit-val crit-val-good">8.9</div><div className="crit-lbl">Contractor Score</div></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
