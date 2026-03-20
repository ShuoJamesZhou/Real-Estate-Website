import SectionHeader from '../components/SectionHeader'
import { site } from '../content/site'

export default function About() {
  return (
    <div>
      <div className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <SectionHeader
            title="About Us"
            description="We specialize in reselling established businesses—helping buyers and sellers execute clean transfers with less uncertainty."
          />

          <div className="grid3" style={{ marginTop: 14 }}>
            <div className="card">
              <div className="iconBadge" aria-hidden="true">
                ⌁
              </div>
              <h3>Business-first thinking</h3>
              <p>
                We focus on operations, retention, and continuity—the elements that determine whether a transfer actually
                sticks.
              </p>
            </div>

            <div className="card">
              <div className="iconBadge" aria-hidden="true">
                ⎔
              </div>
              <h3>Clarity for both sides</h3>
              <p>
                Sellers get a structured plan. Buyers get diligence-ready opportunities mapped to their goals and timeline.
              </p>
            </div>

            <div className="card">
              <div className="iconBadge" aria-hidden="true">
                ◎
              </div>
              <h3>Integrity by design</h3>
              <p>
                Every engagement is built around informed decisions, documented assumptions, and respectful communication.
              </p>
            </div>
          </div>

          <div className="card" style={{ marginTop: 14, padding: 18 }}>
            <h3 style={{ marginTop: 0, fontSize: 18 }}>Serving {site.location}</h3>
            <p style={{ color: 'var(--muted)', margin: 0, maxWidth: 780 }}>
              {site.addressLine} If you are planning a sale, looking for a strategic acquisition, or preparing an operator
              handoff, we help you move forward with confidence and a deal process you can trust.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

