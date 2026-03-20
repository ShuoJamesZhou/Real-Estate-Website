import SectionHeader from '../components/SectionHeader'
import ContactForm from '../components/ContactForm'
import { site } from '../content/site'

export default function Contact() {
  return (
    <div>
      <div className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <SectionHeader
            title="Contact Us"
            description="Tell us what you are looking to buy, resell, or sell. We will respond with next steps."
          />

          <div className="grid3" style={{ gridTemplateColumns: '1.2fr 0.8fr', gap: 14, marginTop: 14 }}>
            <div className="card" style={{ padding: 18 }}>
              <h3 style={{ marginTop: 0 }}>Request an advisor</h3>
              <p style={{ color: 'var(--muted)', marginTop: 6, fontWeight: 700 }}>
                Share your target industry and timeline. We will help you evaluate deal fit.
              </p>

              <div style={{ marginTop: 12 }}>
                <ContactForm />
              </div>
            </div>

            <div style={{ display: 'grid', gap: 14 }}>
              <div className="card">
                <h3 style={{ marginTop: 0 }}>Direct contact</h3>
                <p style={{ color: 'var(--muted)', marginTop: 8, fontWeight: 800 }}>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </p>
                <p style={{ color: 'var(--muted)', marginTop: 8, fontWeight: 800 }}>
                  <a href={`tel:${site.phone.replace(/\D/g, '')}`}>{site.phone}</a>
                </p>
                <p style={{ color: 'var(--muted)', marginTop: 10 }}>{site.hours}</p>
              </div>

              <div className="card">
                <h3 style={{ marginTop: 0 }}>What to include</h3>
                <ul style={{ margin: 10, paddingLeft: 18, color: 'var(--muted)', fontWeight: 700 }}>
                  <li>Business type / industry</li>
                  <li>Target price range</li>
                  <li>Your desired closing window</li>
                  <li>Any non-negotiables (location, team continuity, etc.)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginTop: 14, padding: 18 }}>
            <h3 style={{ marginTop: 0, fontSize: 18 }}>Important note</h3>
            <p style={{ color: 'var(--muted)', margin: 0, fontWeight: 700 }}>
              This demo form either submits to a configured endpoint (optional) or opens your email client with a
              prefilled message. Replace the company details in `src/content/site.ts` to match your business.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

