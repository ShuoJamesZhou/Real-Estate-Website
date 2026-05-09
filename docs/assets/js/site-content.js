window.SITE_CONFIG = {
  brand: {
    name: 'APP REAL ESTATE',
    logo: './assets/images/logos/logo-extended-ttransparent.png',
    mark: 'CN',
    tagline: '澳心地产生意买卖代理',
    phone: '0479 028 863',
    phoneHref: 'tel:0000000000',
    email: '',
    address: '2 Gilda Ct, Mulgrave VIC 3170',
    hours: 'Mon-Fri 9:00am-5:00pm',
  },

  formEndpoint: 'https://formspree.io/f/mrejyovb',

  legalLinks: [
    { label: 'Confidential Agreement', href: 'https://forms.gle/PVaDnvDpSq6rp8UX7' },
    { label: 'Privacy Policy', href: './privacy-policy.html' },
    { label: 'Disclaimer', href: './disclaimer.html' },
  ],

  sections: [
    {
      id: 'home',
      nav: 'Home',
      type: 'hero',
      introTitle: 'Business sales should feel informed, structured, and seamless.',
      introText: 'We specialise in brokering businesses through targeted buyer matching, confidential marketing, and end-to-end support throughout negotiation and settlement—helping position businesses effectively in the market while ensuring smooth, well-managed transactions for both buyers and sellers.',
      title: 'A sharper way to buy and sell businesses.',
      text: 'Clear guidance, strategic positioning, and a sales process focused on the key drivers that maximise value and secure the right outcome for you.',
      backgroundImage: './assets/images/home-background.jpg',
      actions: [
        { label: 'Contact us', href: '#contact', style: 'primary' },
        { label: 'About us', href: '#about', style: 'secondary' },
      ],
    },
    {
      id: 'about',
      nav: 'About Us',
      type: 'statement',
      backgroundImage: './assets/images/aboutUs-background.png',
      cards: [
        {
          title: 'About App Real Estate',
          text: 'Established in 2016, App Real Estate is a dedicated business brokerage specialising in the sale and acquisition of businesses in retail, hospitality, wholesale, and service sectors. With over a decade of operation, we have built a strong understanding of market dynamics, valuation strategies, and buyer behaviour, allowing us to position businesses effectively and manage transactions with clarity and confidence.',
        },
        {
          title: 'Our Team & Why Us',
          text: 'Our team brings more than 25 years of industry experience, offering practical insight and hands-on guidance at every stage. We focus on clear communication, structured execution, and tailored strategies that align with your goals. Whether buying or selling, we provide a professional approach that simplifies the process, protects your interests, and delivers a well-aligned outcome.',
        },
      ],
      reviews: [
        {
          name: 'Seller, hospitality business',
          text: 'The process was clear from the first meeting. We understood what mattered, what needed preparing, and how the sale would be managed.',
        },
        {
          name: 'Buyer, retail business',
          text: 'APP Real Estate handled the sale with discretion and kept communication steady throughout negotiation and settlement.',
        },
        {
          name: 'Business owner, services sector',
          text: 'They gave practical advice, positioned the business properly, and helped us move forward with confidence.',
        },
      ],
    },
    {
      id: 'faq',
      nav: 'FAQ',
      type: 'faq',
      backgroundImage: './assets/images/faq-background.jpg',
      title: '',
      text: '',
      items: [
        {
          question: 'Why should I choose your brokerage to sell my business?',
          answer: 'We combine accurate valuations, targeted buyer networks, and confidential marketing with hands-on support from listing through to settlement. We work with a diverse network of buyers and sellers across various cultural and business backgrounds, ensuring an inclusive, respectful, and well-aligned transaction that achieves the best possible outcome.',
        },
        {
          question: 'How do you value my business?',
          answer: 'We assess financial performance, industry benchmarks, growth potential, and market demand to provide a realistic, data-driven valuation.',
        },
        {
          question: 'How do you keep the sale confidential?',
          answer: 'We use controlled marketing, anonymous listings, and only share sensitive information with qualified buyers under NDA.',
        },
        {
          question: 'How long does it take to sell a business?',
          answer: 'The process typically takes between 8 to 16 weeks, with a structured approach to maintain momentum and achieve a strong outcome.',
        },
        {
          question: 'What support do you provide during the sale?',
          answer: 'We manage the entire sales process end-to-end, from preparing your business and guiding valuation to marketing, buyer outreach, and screening. We handle enquiries, coordinate inspections, support negotiations, and assist with key steps such as lease transfer applications—ensuring a smooth path through to settlement.'
        },
      ],
    },
    {
      id: 'contact',
      nav: 'Contact Us',
      type: 'contact',
      backgroundImage: './assets/images/contactUs-background.png',
      title: 'Tell us about your plans.',
      text: 'Whether you’re buying or selling, share a few details and we’ll come back with clear, practical next steps.',
    },
  ],
};
