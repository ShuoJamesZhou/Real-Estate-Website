(() => {
  const config = window.SITE_CONFIG || {};
  const sections = Array.isArray(config.sections) ? config.sections : [];
  const brand = config.brand || {};

  const page = document.querySelector('[data-page-sections]');
  const nav = document.querySelector('[data-nav]');
  const footer = document.querySelector('[data-site-footer]');
  const header = document.querySelector('.siteHeader');

  function escapeHtml(value) {
    return String(value || '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function button(action, fallbackStyle = 'secondary') {
    if (!action || !action.href || !action.label) return '';
    const style = action.style || fallbackStyle;
    const classes = ['btn', style === 'primary' ? 'btnPrimary' : 'btnSecondary'];
    return `<a class="${classes.join(' ')}" href="${escapeHtml(action.href)}">${escapeHtml(action.label)}<span aria-hidden="true">+</span></a>`;
  }

  function imageUrl(src, fallback) {
    try {
      return new URL(src || fallback, document.baseURI).href;
    } catch {
      return fallback;
    }
  }

  function sectionIntro(section) {
    if (!section.title && !section.text) return '';
    return `
      <div class="sectionHeader">
        ${section.title ? `<h2>${escapeHtml(section.title)}</h2>` : ''}
        ${section.text ? `<p>${escapeHtml(section.text)}</p>` : ''}
      </div>
    `;
  }

  function renderHero(section) {
    const stats = Array.isArray(section.stats) ? section.stats : [];
    const actions = Array.isArray(section.actions) ? section.actions : [];
    return `
      <section id="${escapeHtml(section.id)}" class="homeHero band">
        <div class="container heroGrid">
          <div class="heroCopy">
            <h1>${escapeHtml(section.title)}</h1>
            <p>${escapeHtml(section.text)}</p>
            <div class="ctaRow">
              ${actions.map((item, index) => button(item, index === 0 ? 'primary' : 'secondary')).join('')}
            </div>
          </div>
          <div class="heroMedia" style="--hero-image: url('${escapeHtml(imageUrl(section.image, './assets/img/hero-placeholder.svg'))}')" role="img" aria-label="${escapeHtml(section.title)}">
            <div class="heroStats">
              ${stats.map((stat) => `
                <div>
                  <strong>${escapeHtml(stat.value)}</strong>
                  <span>${escapeHtml(stat.label)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderCta(section) {
    return `
      <section id="${escapeHtml(section.id)}" class="band bandAccent">
        <div class="container accentBar">
          <div>
            <h2>${escapeHtml(section.title)}</h2>
            ${section.text ? `<p>${escapeHtml(section.text)}</p>` : ''}
          </div>
          ${button(section.action, 'primary')}
        </div>
      </section>
    `;
  }

  function renderStatement(section) {
    return `
      <section id="${escapeHtml(section.id)}" class="section band bandStatement">
        <div class="container statementCopy">
          <h2>${escapeHtml(section.title)}</h2>
          ${section.text ? `<p>${escapeHtml(section.text)}</p>` : ''}
        </div>
      </section>
    `;
  }

  function renderCards(section) {
    const cards = Array.isArray(section.cards) ? section.cards : [];
    return `
      <section id="${escapeHtml(section.id)}" class="section band bandSoft">
        <div class="container">
          ${sectionIntro(section)}
          <div class="grid3">
            ${cards.map((card) => `
              <article class="card">
                <div class="iconBadge" aria-hidden="true">${escapeHtml(card.icon || '')}</div>
                <h3>${escapeHtml(card.title)}</h3>
                <p>${escapeHtml(card.text)}</p>
              </article>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  function renderFeature(section) {
    const points = Array.isArray(section.points) ? section.points : [];
    return `
      <section id="${escapeHtml(section.id)}" class="section band bandFeature">
        <div class="container featureGrid">
          <div class="featureMedia" style="--feature-image: url('${escapeHtml(imageUrl(section.image, './assets/img/insights-placeholder.svg'))}')" role="img" aria-label="${escapeHtml(section.title)}"></div>
          <div class="featureCopy">
            <h2>${escapeHtml(section.title)}</h2>
            ${section.text ? `<p>${escapeHtml(section.text)}</p>` : ''}
            <ul class="checkList">
              ${points.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}
            </ul>
            ${button(section.action, 'secondary')}
          </div>
        </div>
      </section>
    `;
  }

  function renderSteps(section) {
    const steps = Array.isArray(section.steps) ? section.steps : [];
    return `
      <section id="${escapeHtml(section.id)}" class="section band bandDeep">
        <div class="container">
          ${sectionIntro(section)}
          <div class="stepList">
            ${steps.map((step, index) => `
              <article class="stepItem">
                <span>${String(index + 1).padStart(2, '0')}</span>
                <h3>${escapeHtml(step.title)}</h3>
                <p>${escapeHtml(step.text)}</p>
              </article>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  function renderFaq(section) {
    const items = Array.isArray(section.items) ? section.items : [];
    return `
      <section id="${escapeHtml(section.id)}" class="section band bandSoft">
        <div class="container">
          ${sectionIntro(section)}
          <div class="faqList">
            ${items.map((item) => `
              <details class="faqItem">
                <summary>
                  <span>${escapeHtml(item.question)}</span>
                  <span class="faqChevron" aria-hidden="true">+</span>
                </summary>
                <div class="faqAnswer">${escapeHtml(item.answer)}</div>
              </details>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  function renderContact(section) {
    return `
      <section id="${escapeHtml(section.id)}" class="section band bandContact">
        <div class="container contactGrid">
          <div class="contactIntro">
            <h2>${escapeHtml(section.title)}</h2>
            ${section.text ? `<p>${escapeHtml(section.text)}</p>` : ''}
            <div class="contactDetails">
              ${brand.phone ? `<a href="${escapeHtml(brand.phoneHref || '#')}">${escapeHtml(brand.phone)}</a>` : ''}
              ${brand.email ? `<a href="mailto:${escapeHtml(brand.email)}">${escapeHtml(brand.email)}</a>` : ''}
              ${brand.address ? `<span>${escapeHtml(brand.address)}</span>` : ''}
            </div>
          </div>
          <div class="contactCard">
            <form method="post" data-endpoint="${escapeHtml(config.formEndpoint || '')}" novalidate>
              <div class="hpField" aria-hidden="true">
                <label for="website">Website</label>
                <input id="website" name="website" autocomplete="off" tabindex="-1" />
              </div>
              <div class="formGrid">
                <div>
                  <label class="srOnly" for="first_name">First name</label>
                  <input id="first_name" name="first_name" placeholder="First name" autocomplete="given-name" />
                </div>
                <div>
                  <label class="srOnly" for="last_name">Last name</label>
                  <input id="last_name" name="last_name" placeholder="Last name" autocomplete="family-name" />
                </div>
                <div>
                  <label class="srOnly" for="email">Email</label>
                  <input id="email" name="email" placeholder="Email address" inputmode="email" autocomplete="email" />
                </div>
                <div>
                  <label class="srOnly" for="phone">Phone optional</label>
                  <input id="phone" name="phone" placeholder="Phone optional" inputmode="tel" autocomplete="tel" />
                </div>
              </div>
              <div class="contactMessage">
                <label class="srOnly" for="message">Message</label>
                <textarea id="message" name="message" placeholder="Tell us what you are planning"></textarea>
              </div>
              <button class="btn btnPrimary contactSubmit" type="submit">Send enquiry<span aria-hidden="true">+</span></button>
            </form>
          </div>
        </div>
      </section>
    `;
  }

  function renderSection(section) {
    const renderers = {
      hero: renderHero,
      cta: renderCta,
      statement: renderStatement,
      cards: renderCards,
      feature: renderFeature,
      steps: renderSteps,
      faq: renderFaq,
      contact: renderContact,
    };
    const render = renderers[section.type] || renderCards;
    return render(section);
  }

  function renderChrome() {
    document.querySelectorAll('[data-brand-mark]').forEach((el) => { el.textContent = brand.mark || ''; });
    document.querySelectorAll('[data-brand-name]').forEach((el) => { el.textContent = brand.name || 'Company Name'; });
    document.querySelectorAll('[data-brand-tagline]').forEach((el) => { el.textContent = brand.tagline || ''; });

    const phone = document.querySelector('[data-header-phone]');
    if (phone) {
      phone.textContent = brand.phone || '';
      phone.setAttribute('href', brand.phoneHref || '#contact');
    }

    if (nav) {
      nav.innerHTML = sections
        .filter((section) => section.nav)
        .map((section) => `<a class="topNavLink${section.type === 'contact' ? ' topNavCta' : ''}" href="#${escapeHtml(section.id)}">${escapeHtml(section.nav)}</a>`)
        .join('');
    }

    if (footer) {
      footer.innerHTML = `
        <div class="container footerGrid">
          <div class="footerBrand">
            <span class="brandMark" aria-hidden="true">${escapeHtml(brand.mark || '')}</span>
            <div>
              <strong>${escapeHtml(brand.name || 'Company Name')}</strong>
              <span>${escapeHtml(brand.hours || '')}</span>
            </div>
          </div>
          <div class="footerMeta">
            ${brand.address ? `<span>${escapeHtml(brand.address)}</span>` : ''}
            ${brand.email ? `<a href="mailto:${escapeHtml(brand.email)}">${escapeHtml(brand.email)}</a>` : ''}
          </div>
        </div>
      `;
    }
  }

  function headerOffset() {
    return header ? header.getBoundingClientRect().height : 0;
  }

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset() - 8;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  function stripHashFromUrl() {
    if (!window.location.hash) return;
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  function bindNavigation() {
    const links = Array.from(document.querySelectorAll('a[href^="#"]'));
    links.forEach((a) => {
      a.addEventListener('click', (event) => {
        const href = a.getAttribute('href') || '';
        if (!href.startsWith('#') || href === '#') return;
        const id = href.slice(1);
        if (!document.getElementById(id)) return;
        event.preventDefault();
        stripHashFromUrl();
        scrollToId(id);
      });
    });
  }

  function bindActiveNav() {
    const navSections = sections
      .filter((section) => section.nav)
      .map((section) => ({ id: `#${section.id}`, el: document.getElementById(section.id) }))
      .filter((section) => section.el);

    function setActive(id) {
      document.querySelectorAll('.topNavLink').forEach((link) => link.classList.remove('topNavLinkActive'));
      const active = document.querySelector(`.topNavLink[href="${id}"]`);
      if (active) active.classList.add('topNavLinkActive');
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        const y = window.scrollY + headerOffset() + 24;
        let current = navSections[0] ? navSections[0].id : '#home';
        for (const section of navSections) {
          const top = section.el.getBoundingClientRect().top + window.scrollY;
          if (top <= y) current = section.id;
        }
        setActive(current);
      });
    });

    setActive(navSections[0] ? navSections[0].id : '#home');
  }

  function bindContactForm() {
    const contact = document.querySelector('#contact');
    const form = contact ? contact.querySelector('form') : null;
    if (!form) return;

    const fieldIds = ['first_name', 'last_name', 'email', 'phone', 'message'];

    function getField(id) {
      return form.querySelector(`#${CSS.escape(id)}`);
    }

    function removeError(el) {
      if (!el) return;
      el.classList.remove('fieldError');
      const next = el.nextElementSibling;
      if (next && next.classList.contains('errorText')) next.remove();
    }

    function setError(el, msg) {
      if (!el) return;
      el.classList.add('fieldError');
      const next = el.nextElementSibling;
      if (next && next.classList.contains('errorText')) {
        next.textContent = msg;
        return;
      }
      const div = document.createElement('div');
      div.className = 'errorText';
      div.textContent = msg;
      el.insertAdjacentElement('afterend', div);
    }

    function digits(s) {
      return String(s || '').replace(/\D+/g, '');
    }

    function validateField(id) {
      const el = getField(id);
      if (!el) return true;
      const val = String(el.value || '').trim();

      if (id === 'first_name' && val.length < 2) return setError(el, 'Please enter your first name.'), false;
      if (id === 'last_name' && val.length < 2) return setError(el, 'Please enter your last name.'), false;
      if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return setError(el, 'Please enter a valid email address.'), false;
      if (id === 'phone' && val !== '') {
        const d = digits(val);
        if (d.length < 7 || d.length > 20) return setError(el, 'Please enter a valid phone number, or leave it blank.'), false;
      }
      if (id === 'message' && val.length < 10) return setError(el, 'Please enter a message with at least 10 characters.'), false;

      removeError(el);
      return true;
    }

    function clearFormError() {
      const fe = form.querySelector('.formError');
      if (fe) fe.remove();
    }

    function showNotice(type, message) {
      const existing = contact.querySelector('.notice');
      if (existing) existing.remove();
      const notice = document.createElement('div');
      notice.className = `notice notice${type}`;
      notice.setAttribute('role', type === 'Success' ? 'status' : 'alert');
      notice.textContent = message;
      contact.querySelector('.container')?.insertBefore(notice, contact.querySelector('.contactCard'));
    }

    fieldIds.forEach((id) => {
      const el = getField(id);
      if (!el) return;
      el.addEventListener('input', () => {
        removeError(el);
        clearFormError();
      });
      el.addEventListener('blur', () => validateField(id));
    });

    form.addEventListener('submit', (event) => {
      clearFormError();
      let ok = true;
      fieldIds.forEach((id) => {
        if (!validateField(id)) ok = false;
      });
      if (!ok) {
        event.preventDefault();
        return;
      }

      const endpoint = form.getAttribute('data-endpoint') || '';
      if (!endpoint) return;

      event.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;

      fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
        .then((res) => {
          if (!res.ok) throw new Error('submit_failed');
          showNotice('Success', 'Thanks. Your enquiry has been sent.');
          form.reset();
          fieldIds.forEach((id) => removeError(getField(id)));
        })
        .catch(() => {
          showNotice('Error', 'We could not send your message right now. Please try again later.');
        })
        .finally(() => {
          if (btn) btn.disabled = false;
        });
    });
  }

  renderChrome();
  if (page) page.innerHTML = sections.map(renderSection).join('');
  bindNavigation();
  bindActiveNav();
  bindContactForm();

  if (window.location.hash) {
    const id = window.location.hash.slice(1);
    setTimeout(() => {
      scrollToId(id);
      stripHashFromUrl();
    }, 50);
  }
})();
