import { NavLink } from 'react-router-dom'
import { navItems } from '../content/site'
import type { NavItem } from '../content/site'

function TabLink({ item }: { item: NavItem }) {
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) => `tabLink ${isActive ? 'tabLinkActive' : ''} topNavLink`}
      end={item.to === '/'}
    >
      {item.label}
    </NavLink>
  )
}

export default function TopNav() {
  return (
    <>
      <a className="skipLink" href="#main-content">
        Skip to content
      </a>
      <header className="siteHeader">
        <div className="topLogoBar">
          <div className="container topLogoInner">
            <NavLink to="/" className="brand" aria-label="Go to Home">
              <span className="brandMark" aria-hidden="true" />
              <span className="brandText">
                <strong>HarborBridge</strong>
                <span>Business Brokerage</span>
              </span>
            </NavLink>

            <div className="topLogoRight" aria-hidden="true">
              EN
            </div>
          </div>
        </div>

        <div className="navBar">
          <div className="container navBarInner">
            <nav className="tabNav topNavTabs" aria-label="Primary navigation">
              {navItems.map((item) => (
                <TabLink key={item.key} item={item} />
              ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}

