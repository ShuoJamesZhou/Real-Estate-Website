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
          name: 'Cindy Shen',
          text: [
            '我们是去年年中找彩票生意时遇到的Fong，她非常专业热情，',
            '不仅在我们通过彩票公司的面试环节提供了很专业的指导和建议，',
            '还帮我们和卖家建立了良好的沟通关系，',
            '使我们顺利买到了一个优质的生意，',
            '我会向所有有买卖生意需求的朋友推荐Fong的。',
          ].join(''),
        },
        {
          name: '黄思峰',
          text: [
            '芳，您好!',
            [
              '感谢您一直以来对我们的支持和关心。',
              '2年前您顶着烈日带着我和我太太在墨尔本各处寻找生意的场景还历历在目。',
              '在您专业的建议下我们终于找到了一个非常好的生意，给我带来良好的收益。',
              '我的朋友都羡慕得不得了，都纷纷让我把您介绍给他们，',
              '从他们那得知您都给他们提供了专业热情的服务，我再此也代表他们表示感谢。',
              '随着对墨尔本经验环境的进一步了解，我们也想进一步增加在这边的投资，',
              '前一段时间您给我们推荐的几个项目我们也都正在考虑之中。',
              '另外，我和几个朋友想在汽车零部件销售行业进行投资入，',
              '也麻烦您帮我们收集一下这方面的资料与信息。',
            ].join(''),
          ].join('\n\n'),
        },
        {
          name: 'Chong Tang',
          text: [
            'Fong has been prompt and detailed in all aspects of our business purchase.',
            'She was very helpful advising what was most suitable and guiding us through the whole process.',
            'She was an absolute pleasure to deal with.',
            'We will highly recommend her services.',
          ].join(' '),
        },
        {
          name: 'Richard Yii',
          text: [
            [
              'I recently purchased a business through Fong from APP Real Estate,',
              'a highly professional agent from start to finish.',
              'I would like to thank Fong for her ongoing hard work and her dedicated approach',
              'to her clients’ needs, always maintaining the highest level of service.',
              'I highly recommend Fong for her attitude and passion for her work,',
              'and would encourage anyone looking to buy or sell a business to engage her.',
            ].join(' '),
            'Thank you again to Fong for her help and for a wonderful result.',
          ].join('\n\n'),
        },
        {
          name: 'Brent Manning',
          text: [
            [
              'It is my pleasure to provide a testimonial for Fong, a Hospitality Business Agent',
              'who successfully sold two businesses, Bensons Café & Food Store, Belgrave',
              'and Bensons on Martin, Brighton on our behalf.',
            ].join(' '),
            [
              'I had listed these businesses with many Agents, all large with promises to sell these businesses,',
              'all talk and no results. These Agents did not communicate with me, made false promises',
              'and excuses why the businesses did not sell and looked for the easy option to reduce the sell price.',
            ].join(' '),
            [
              'I then met Fong who was a breath of fresh air.',
              'Fong set a realistic valuation for each business and then worked extremely hard to sell using her contacts,',
              'following up on every lead, and most importantly, communicating with me.',
            ].join(' '),
            'Fong was extremely successful in identifying buyers, matching the right buyer with each property and then worked hard to finalize the sale.',
            'I would have no hesitation recommending Fong to any potential Vendor and feel confident she will get the results you are looking for, and work extremely hard on your behalf.',
          ].join('\n\n'),
        },
        {
          name: 'Le Thanh Tuan Tran',
          text: [
            'Dear Ms. Fong,',
            [
              'I am writing to express my sincere appreciation for the outstanding services provided by you',
              'and your team at APP Real Estate. Your expertise and dedication played a crucial role',
              'in the success of our business purchasing journey.',
            ].join(' '),
            [
              'From our initial consultation to the finalization of the deal, your professionalism and attention to detail were evident.',
              'Your guidance and strategic insights throughout the process were instrumental in navigating the complexities of the market.',
              'Your commitment to achieving the best possible outcome for your clients is truly commendable.',
            ].join(' '),
            [
              'What stood out most during our collaboration was your transparent communication and timely updates.',
              'Your ability to address our concerns and provide clear explanations helped alleviate any apprehensions we had,',
              'making the entire experience smooth and stress-free.',
            ].join(' '),
            [
              'I would not hesitate to recommend your services to anyone in need of a skilled and trustworthy business broker.',
              'Your commitment to client satisfaction and your extensive knowledge of the industry make you a valuable asset',
              'to those seeking assistance in buying a business.',
            ].join(' '),
            'Once again, thank you for your exceptional service. I look forward to the possibility of working together again in the future.',
          ].join('\n\n'),
        },
        {
          name: 'Clare Voitin',
          text: [
            [
              'Fong was very proactive in meeting with us and addressing our needs regarding the sale of our business.',
              'She found our buyer within the week. Fong was confident and successful in achieving the sale price we wanted',
              'and managed the entire sales process with transparency and professionalism for both parties.',
            ].join(' '),
            [
              'Selling a business can be stressful and intimidating, but Fong ensured the process was uncomplicated.',
              'At all times, she was patient, helpful, and readily available.',
            ].join(' '),
            'I would certainly use Fong again and have already recommended her to a number of my colleagues.',
          ].join('\n\n'),
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
