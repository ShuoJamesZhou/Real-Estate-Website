window.SITE_CONFIG = {
  brand: {
    name: 'Company Name',
    mark: 'CN',
    tagline: 'Modern property guidance for Brisbane and beyond.',
    phone: '(03) 9999 9999',
    phoneHref: 'tel:0000000000',
    email: 'hello@company.com',
    address: '123 Property Street, Brisbane QLD',
    hours: 'Mon-Fri 9:00am-5:00pm',
  },

  formEndpoint: 'https://formspree.io/f/xqewnoda',

  sections: [
    {
      id: 'home',
      nav: 'Home',
      type: 'hero',
      title: 'A sharper way to buy and sell property.',
      text: 'Calm advice, strong presentation, and a sales process built around the moments that actually move a result.',
      image: './assets/img/hero-placeholder.svg',
      actions: [
        { label: 'Contact us', href: '#contact', style: 'primary' },
        { label: 'About us', href: '#about', style: 'secondary' },
      ],
      stats: [
        { value: 'Local', label: 'market insight' },
        { value: 'Clear', label: 'campaign strategy' },
        { value: 'Modern', label: 'buyer experience' },
      ],
    },
    {
      id: 'about',
      nav: 'About Us',
      type: 'statement',
      title: 'Real estate should feel informed, composed, and easy to follow.',
      text: 'We combine local market context with polished digital presentation, responsive communication, and a simple one-page experience that is easy to keep fresh as your business grows.',
    },
    {
      id: 'faq',
      nav: 'FAQ',
      type: 'faq',
      title: 'Questions buyers and sellers ask first',
      text: 'Edit these directly in the FAQ section of site-content.js.',
      items: [
        {
          question: 'How do I add or change content?',
          answer: 'Open docs/assets/js/site-content.js and edit the matching section object. The page and navigation update from that file.',
        },
        {
          question: 'Can I change colours without touching every style?',
          answer: 'Yes. The main colours are CSS variables at the top of docs/assets/css/styles.css.',
        },
        {
          question: 'Does the page still use one-page scrolling?',
          answer: 'Yes. Navigation links scroll to sections on the same page, and the active nav item updates as visitors scroll.',
        },
      ],
    },
    {
      id: 'contact',
      nav: 'Contact Us',
      type: 'contact',
      title: 'Let us know what you are planning.',
      text: 'Send a few details and we will come back with a sensible next step.',
    },
  ],
};
