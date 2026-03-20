import DealCard from '../components/DealCard'
import SectionHeader from '../components/SectionHeader'
import { featuredListings } from '../content/site'

export default function Businesses() {
  return (
    <div>
      <div className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <SectionHeader
            title="Businesses For Sale"
            description="A curated set of opportunities built for diligence, transition planning, and resale execution."
            right={null}
          />

          <div className="listingGrid" style={{ marginTop: 14 }}>
            {featuredListings.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>

          <div className="card" style={{ marginTop: 14 }}>
            <h3 style={{ marginTop: 0 }}>More listings coming soon</h3>
            <p style={{ color: 'var(--muted)' }}>
              If you do not see a perfect match, tell us your target deal size, industry, and timeline. We will
              curate additional opportunities.
            </p>
            <p style={{ marginTop: 10, fontWeight: 800, color: 'var(--muted)' }}>
              Email: <a href="mailto:info@harborbridgebrokers.com">info@harborbridgebrokers.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

