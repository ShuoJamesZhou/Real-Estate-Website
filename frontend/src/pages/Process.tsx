import SectionHeader from '../components/SectionHeader'

export default function Process() {
  return (
    <div>
      <div className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <SectionHeader
            title="Our Process"
            description="A repeatable workflow designed to reduce surprises and improve decision quality."
          />

          <div className="steps" style={{ marginTop: 14 }}>
            <div className="step">
              <p className="stepNum">01</p>
              <h3>Discovery call</h3>
              <p>We clarify goals, deal constraints, and what “success” looks like for your transfer.</p>
            </div>
            <div className="step">
              <p className="stepNum">02</p>
              <h3>Valuation & sourcing</h3>
              <p>We screen opportunities and organize documentation paths—so diligence begins with momentum.</p>
            </div>
            <div className="step">
              <p className="stepNum">03</p>
              <h3>Diligence coordination</h3>
              <p>Operational questions, retention risk, and transition dependencies get documented and addressed.</p>
            </div>
            <div className="step">
              <p className="stepNum">04</p>
              <h3>Negotiation & closing</h3>
              <p>We support deal execution and handoff planning to reduce post-transfer friction.</p>
            </div>
          </div>

          <div className="grid3" style={{ marginTop: 14 }}>
            <div className="card">
              <h3>What we ask for</h3>
              <p style={{ marginTop: 8 }}>
                Financial summaries, operational overview, and a clear view of customer/vendor continuity.
              </p>
            </div>
            <div className="card">
              <h3>What you get</h3>
              <p style={{ marginTop: 8 }}>
                A decision-ready process: organized diligence, negotiated terms, and a transfer plan that holds.
              </p>
            </div>
            <div className="card">
              <h3>What to expect</h3>
              <p style={{ marginTop: 8 }}>
                Most timelines progress in 8–16 weeks once documentation is prepared; complexity varies per deal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

