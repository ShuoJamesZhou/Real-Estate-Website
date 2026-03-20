import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navItems } from '../content/site'
import type { NavItem } from '../content/site'

function TabLink({ item }: { item: NavItem }) {
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) => `tabLink ${isActive ? 'tabLinkActive' : ''}`}
      end={item.to === '/'}
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
              <div key={item.key} onClick={handleNavClick}>
                <TabLink item={item} />
              </div>
            ))}
          </nav>

          <div className="navCtas">
            <Link className="btn btnPrimary navDesktop" to="/contact">
              Talk to an Advisor
              <span aria-hidden="true">→</span>
            </Link>

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

            <Link className="btn btnPrimary mobileCta" to="/contact" onClick={() => setOpen(false)}>
              Talk to an Advisor <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}

