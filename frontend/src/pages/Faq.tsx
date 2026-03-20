import SectionHeader from '../components/SectionHeader'
import { faqItems } from '../content/site'

export default function Faq() {
  return (
    <div>
      <div className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <SectionHeader
            title="FAQ"
            description="Quick answers about buying, reselling, due diligence, and transfer planning."
          />

          <div style={{ marginTop: 14 }}>
            {faqItems.map((item) => (
              <details key={item.q} className="faqItem">
                <summary>
                  <span style={{ fontWeight: 900 }}>{item.q}</span>
                  <span className="faqChevron" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="faqAnswer">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

