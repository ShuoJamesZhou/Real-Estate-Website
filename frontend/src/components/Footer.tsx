import { NavLink } from 'react-router-dom'
import { navItems, site } from '../content/site'

export default function Footer() {
  return (
    <footer className="siteFooter">
      <div className="container footerGrid">
        <div>
          <div className="footerBrand">
            <span className="brandMark" aria-hidden="true" />
            <div>
              <strong>{site.name}</strong>
              <span>
                {site.tagline} <br />
                {site.hours}
              </span>
            </div>
          </div>

          <p className="mutedText" style={{ marginTop: 12 }}>
            {site.addressLine}
          </p>

          <p className="mutedText" style={{ marginTop: 8 }}>
            <a href={`mailto:${site.email}`}>{site.email}</a> · <a href={`tel:${site.phone.replace(/\D/g, '')}`}>{site.phone}</a>
          </p>
        </div>

        <div className="footerLinks" aria-label="Footer links">
          {navItems.map((item) => (
            <NavLink key={item.key} to={item.to} className="footerLink">
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </footer>
  )
}

