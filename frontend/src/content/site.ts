export type NavItem = {
  key: string
  label: string
  to: string
  description?: string
}

export const site = {
  name: 'HarborBridge Business Brokers',
  tagline: 'Reselling established businesses with clarity, speed, and integrity.',
  email: 'info@harborbridgebrokers.com',
  phone: '(555) 012-3456',
  location: 'United States',
  addressLine: 'Serving founders and operators nationwide.',
  hours: 'Mon–Fri, 9:00am–5:00pm',
}

export const navItems: NavItem[] = [
  { key: 'home', label: 'Home', to: '/' },
  { key: 'about', label: 'About Us', to: '/about' },
  { key: 'contact', label: 'Contact Us', to: '/contact' },
]

export const featuredListings = [
  {
    id: 'l1',
    title: 'Specialty HVAC & Service',
    location: 'Midwest',
    price: '$850,000',
    highlight: 'Recurring maintenance contracts + skilled technician team.',
    tags: ['Recurring Revenue', 'Skilled Team', 'Growing Demand'],
  },
  {
    id: 'l2',
    title: 'Commercial Cleaning Franchise',
    location: 'Southeast',
    price: '$420,000',
    highlight: 'Low churn customer base with enterprise accounts.',
    tags: ['Franchise', 'Enterprise Clients', 'High Margin'],
  },
  {
    id: 'l3',
    title: 'Distribution & Logistics (Niche)',
    location: 'Southwest',
    price: '$1,250,000',
    highlight: 'Strategic supplier relationships and efficient operations.',
    tags: ['Operational Efficiency', 'Diversified Accounts', 'Niche Moat'],
  },
]

export const faqItems = [
  {
    q: 'Are you an agent for buyers, sellers, or both?',
    a: 'We support both sides. Sellers get a structured valuation and marketing plan; buyers get curated opportunities matched to fit, risk tolerance, and timeline.',
  },
  {
    q: 'What makes reselling businesses different than residential real estate?',
    a: 'Business transfers focus on operations, customer retention, team continuity, and deal execution—not property condition. We build plans around diligence and transition risk.',
  },
  {
    q: 'Do you help with due diligence and deal structure?',
    a: 'Yes. We coordinate diligence, help organize documentation, and support negotiations on terms that protect both parties.',
  },
  {
    q: 'How long does the process typically take?',
    a: 'Most transactions progress in 8–16 weeks once documentation is ready, but timelines vary based on deal complexity and buyer financing.',
  },
]

