export type DealCardModel = {
  id: string
  title: string
  location: string
  price: string
  highlight: string
  tags: string[]
}

export default function DealCard({ deal }: { deal: DealCardModel }) {
  return (
    <article className="card" aria-label={`${deal.title} deal card`}>
      <div className="pillRow" aria-hidden="true">
        {deal.tags.slice(0, 3).map((t) => (
          <span key={t} className="pill">
            {t}
          </span>
        ))}
      </div>
      <h3 className="listingTitle">{deal.title}</h3>
      <div className="listingMeta">
        <span>{deal.location}</span>
        <span>{deal.price}</span>
      </div>
      <p className="listingHighlight">{deal.highlight}</p>
    </article>
  )
}

