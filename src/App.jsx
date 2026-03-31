import { useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import Header from './components/Header/Header.jsx'
import PortfolioOverview from './pages/pages/PortfolioOverview.jsx'
import SubsidiariesPage from './pages/pages/SubsidiariesPage.jsx'

const Placeholder = ({ title }) => (
  <div style={{ padding: 32 }}>
    <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>{title}</h2>
    <p style={{ color: '#64748b' }}>Coming soon.</p>
  </div>
)

const PAGES = {
  portfolio:    PortfolioOverview,
  subsidiaries: SubsidiariesPage,
  projects:     () => <Placeholder title="Projects" />,
  dashboards:   () => <Placeholder title="Dashboards" />,
  reports:      () => <Placeholder title="Reports" />,
  aiCopilot:    () => <Placeholder title="AI Copilot" />,
  settings:     () => <Placeholder title="Settings" />,
}

export default function App() {
  const [activePage, setActivePage] = useState('portfolio')
  const Page = PAGES[activePage] || PAGES.portfolio
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar activePage={activePage} goPage={setActivePage} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Header />
        <main style={{ flex: 1, overflowY: 'auto', background: '#f4f5f7' }}>
          <Page />
        </main>
      </div>
    </div>
  )
}
