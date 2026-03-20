import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'
import { site } from '../content/site'

export default function Home() {
  return (
    <div>
      <section className="hero">
        <div className="container heroGrid">
          <div>
            <div className="kicker">
              <span className="kickerDot" aria-hidden="true" /> Trusted business brokerage for resellers
            </div>
            <h1>
              Buy, resell, and transfer <span style={{ color: 'var(--accent)' }}>established</span> businesses with confidence.
            </h1>
            <p>
              {site.tagline} We focus on operational continuity, customer retention, and deal execution—not property condition.
            </p>

            <div className="heroCtas">
              <Link className="btn btnPrimary" to="/contact">
                Contact Us <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="trustGrid" aria-label="Trust signals">
              <div className="trustCard">
                <strong>Deal-screened opportunities</strong>
                <span>Curated listings with diligence-ready documentation.</span>
              </div>
              <div className="trustCard">
                <strong>Built for transition risk</strong>
                <span>Teams, customers, and operations accounted for early.</span>
              </div>
            </div>
          </div>

          <aside className="heroSide" aria-label="What we do">
            <div className="heroSideInner">
              <h2 style={{ margin: 0, fontSize: 22, letterSpacing: '-0.02em' }}>How we help</h2>
              <p style={{ margin: '8px 0 14px', color: 'var(--muted)', fontWeight: 700 }}>
                A clear, repeatable path from search to closing.
              </p>

              <div className="steps" style={{ gridTemplateColumns: '1fr', gap: 10 }}>
                <div className="step">
                  <p className="stepNum" style={{ fontSize: 22 }}>
                    01
                  </p>
                  <h3 style={{ marginTop: 6 }}>Sourcing & screening</h3>
                  <p>We shortlist deals that match your goals, timeline, and risk tolerance.</p>
                </div>
                <div className="step">
                  <p className="stepNum" style={{ fontSize: 22 }}>
                    02
                  </p>
                  <h3 style={{ marginTop: 6 }}>Due diligence coordination</h3>
                  <p>Documentation, operational questions, and transition risks—organized and actionable.</p>
                </div>
                <div className="step">
                  <p className="stepNum" style={{ fontSize: 22 }}>
                    03
                  </p>
                  <h3 style={{ marginTop: 6 }}>Deal execution & handoff</h3>
                  <p>We support negotiations and help ensure continuity after transfer.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section" aria-label="Why choose us">
        <div className="container">
          <SectionHeader
            title="Why business reselling works better with a brokerage"
            description="Business transfers are about people, retention, and operations. We help you manage the risk."
          />

          <div className="grid3">
            <div className="card">
              <div className="iconBadge" aria-hidden="true">
                ✓
              </div>
              <h3>Operational continuity</h3>
              <p>Transition plans for staff, vendors, and customer expectations.</p>
            </div>
            <div className="card">
              <div className="iconBadge" aria-hidden="true">
                ◷
              </div>
              <h3>Diligence that drives decisions</h3>
              <p>Documentation organized to answer the questions that matter.</p>
            </div>
            <div className="card">
              <div className="iconBadge" aria-hidden="true">
                ↔
              </div>
              <h3>Structured negotiation</h3>
              <p>Terms and timelines aligned to protect both parties.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

