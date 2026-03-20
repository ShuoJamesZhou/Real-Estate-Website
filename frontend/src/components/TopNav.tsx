import React from 'react'
import { NavLink } from 'react-router-dom'
import { navItems } from '../content/site'
import type { NavItem } from '../content/site'

function TabLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) => `tabLink ${isActive ? 'tabLinkActive' : ''}`}
      end={item.to === '/'}
      onClick={onNavigate}
    >
      {item.label}
    </NavLink>
  )
}

export default function TopNav() {
  const [open, setOpen] = React.useState(false)

  function handleNavClick() {
    setOpen(false)
  }

  return (
    <>
      <a className="skipLink" href="#main-content">
        Skip to content
      </a>
      <header className="topNav">
        <div className="container topNavInner">
          <NavLink to="/" className="brand" aria-label="Go to Home" onClick={() => setOpen(false)}>
            <span className="brandMark" aria-hidden="true" />
            <span className="brandText">
              <strong>HarborBridge</strong>
              <span>Business Brokerage</span>
            </span>
          </NavLink>

          <nav className="tabNav navDesktop" aria-label="Primary navigation">
            {navItems.map((item) => (
              <TabLink key={item.key} item={item} onNavigate={handleNavClick} />
            ))}
          </nav>

          <div className="navCtas">
            <button
              className="mobileToggle"
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden="true">{open ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        <div className={`mobileMenu ${open ? 'mobileMenuOpen' : ''}`}>
          <div className="container mobileMenuInner">
            {navItems.map((item) => (
              <NavLink
                key={item.key}
                to={item.to}
                className={({ isActive }) => `mobileTab ${isActive ? 'mobileTabActive' : ''}`}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </header>
    </>
  )
}

