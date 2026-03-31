import { useState, useEffect, useRef } from 'react'
import './Header.css'

const NOTIFS = [
  { id: 1, text: 'Marina Bay Complex delayed by 45 days', time: '2 hours ago', unread: true },
  { id: 2, text: 'Budget overrun alert: Lamar Commercial',  time: '5 hours ago', unread: true },
  { id: 3, text: 'Q4 2024 report has been generated',       time: 'Yesterday',   unread: false },
]

export default function Header() {
  const [notifOpen,   setNotifOpen]   = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const notifRef   = useRef(null)
  const profileRef = useRef(null)

  useEffect(() => {
    function handler(e) {
      if (notifRef.current   && !notifRef.current.contains(e.target))   setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header className="hdr">
      <div className="hdr-right">
        <button className="ask-ai-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          Ask AI
        </button>

        <div className="dd-wrap" ref={notifRef}>
          <button className="icon-btn" onClick={() => { setNotifOpen(v => !v); setProfileOpen(false) }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
            <span className="notif-dot" />
          </button>
          {notifOpen && (
            <div className="dropdown">
              <div className="dd-title">Notifications</div>
              {NOTIFS.map(n => (
                <div key={n.id} className={`dd-notif-item${n.unread ? ' unread' : ''}`}>
                  <span className={`dd-notif-bullet${n.unread ? '' : ' empty'}`} />
                  <div>
                    <div className="dd-notif-text">{n.text}</div>
                    <div className="dd-notif-time">{n.time}</div>
                  </div>
                </div>
              ))}
              <button className="dd-footer">View all notifications</button>
            </div>
          )}
        </div>

        <div className="dd-wrap" ref={profileRef}>
          <button className="profile-btn" onClick={() => { setProfileOpen(v => !v); setNotifOpen(false) }}>
            <div className="avatar">MC</div>
            <div>
              <div className="profile-name">Michael C.</div>
              <div className="profile-role">CEO</div>
            </div>
          </button>
          {profileOpen && (
            <div className="dropdown dropdown-sm">
              <div className="dd-title">Michael Chen</div>
              <button className="dd-item">My Profile</button>
              <button className="dd-item">Account Settings</button>
              <button className="dd-item">Preferences</button>
              <div className="dd-divider" />
              <button className="dd-item danger">Sign Out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
