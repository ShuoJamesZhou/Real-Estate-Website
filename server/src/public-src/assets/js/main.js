(() => {
  const header = document.querySelector(".siteHeader");

  function headerOffset() {
    return header ? header.getBoundingClientRect().height : 0;
  }

  function syncHeaderHeight() {
    document.documentElement.style.setProperty("--header-height", `${headerOffset()}px`);
  }

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset() - 8;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  function stripHashFromUrl() {
    if (!window.location.hash) return;
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  function bindNavigation() {
    const links = Array.from(document.querySelectorAll('a[href^="#"]'));
    links.forEach((a) => {
      a.addEventListener("click", (event) => {
        const href = a.getAttribute("href") || "";
        if (!href.startsWith("#") || href === "#") return;
        const id = href.slice(1);
        if (!document.getElementById(id)) return;
        event.preventDefault();
        stripHashFromUrl();
        scrollToId(id);
      });
    });
  }

  function bindActiveNav() {
    const navLinks = Array.from(document.querySelectorAll(".topNavLink")).filter((a) =>
      (a.getAttribute("href") || "").startsWith("#")
    );
    const navSections = navLinks
      .map((a) => {
        const href = a.getAttribute("href") || "";
        const id = href.startsWith("#") ? href.slice(1) : "";
        return { href, el: id ? document.getElementById(id) : null };
      })
      .filter((x) => x.el);

    function setActive(href) {
      navLinks.forEach((link) => link.classList.remove("topNavLinkActive"));
      const active = navLinks.find((a) => (a.getAttribute("href") || "") === href);
      if (active) active.classList.add("topNavLinkActive");
    }

    function updateActiveNav() {
      if (!navSections.length) return;
      const y = window.scrollY + headerOffset() + 24;
      const atPageEnd =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current = navSections[0].href;

      for (const section of navSections) {
        const top = section.el.getBoundingClientRect().top + window.scrollY;
        if (top <= y) current = section.href;
      }

      if (atPageEnd) current = navSections[navSections.length - 1].href;
      setActive(current);
    }

    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        updateActiveNav();
      });
    });

    window.addEventListener("resize", updateActiveNav);
    updateActiveNav();
  }

  function bindReviewCarousels() {
    document.querySelectorAll("[data-review-carousel]").forEach((carousel) => {
      const track = carousel.querySelector("[data-review-track]");
      const slides = Array.from(carousel.querySelectorAll("[data-review-slide]"));
      const dots = Array.from(carousel.querySelectorAll("[data-review-dot]"));
      if (!track || slides.length <= 1) return;

      let current = 0;
      let timer = null;

      function goTo(index) {
        current = (index + slides.length) % slides.length;
        const previous = (current - 1 + slides.length) % slides.length;
        const following = (current + 1) % slides.length;

        slides.forEach((slide, slideIndex) => {
          slide.classList.toggle("reviewSlideActive", slideIndex === current);
          slide.classList.toggle("reviewSlidePrevious", slideIndex === previous);
          slide.classList.toggle("reviewSlideNext", slideIndex === following);
          slide.setAttribute("aria-current", slideIndex === current ? "true" : "false");
        });

        dots.forEach((dot, dotIndex) => {
          const active = dotIndex === current;
          dot.classList.toggle("reviewDotActive", active);
          dot.setAttribute("aria-current", active ? "true" : "false");
        });
      }

      function stop() {
        if (timer) window.clearInterval(timer);
        timer = null;
      }

      function start() {
        stop();
        timer = window.setInterval(() => goTo(current + 1), 5200);
      }

      dots.forEach((dot) => {
        dot.addEventListener("click", () => {
          goTo(Number(dot.dataset.reviewDot || 0));
          start();
        });
      });

      slides.forEach((slide) => {
        function activateSlide() {
          const index = Number(slide.dataset.reviewIndex || 0);
          if (index === current) return;
          goTo(index);
          start();
        }

        slide.addEventListener("click", activateSlide);
        slide.addEventListener("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          activateSlide();
        });
      });

      carousel.addEventListener("mouseenter", stop);
      carousel.addEventListener("mouseleave", start);
      carousel.addEventListener("focusin", stop);
      carousel.addEventListener("focusout", start);

      goTo(0);
      start();
    });
  }

  function bindFaqAnimation() {
    document.querySelectorAll(".faqItem").forEach((item) => {
      const summary = item.querySelector("summary");
      const answer = item.querySelector(".faqAnswer");
      if (!summary || !answer) return;

      answer.style.height = item.open ? `${answer.scrollHeight}px` : "0px";

      summary.addEventListener("click", (event) => {
        event.preventDefault();

        if (item.open) {
          answer.style.height = `${answer.scrollHeight}px`;
          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
              answer.style.height = "0px";
            });
          });
          answer.addEventListener("transitionend", function closeAfterTransition() {
            item.open = false;
            answer.removeEventListener("transitionend", closeAfterTransition);
          });
          return;
        }

        item.open = true;
        answer.style.height = "0px";
        window.requestAnimationFrame(() => {
          answer.style.height = `${answer.scrollHeight}px`;
        });
      });

      answer.addEventListener("transitionend", () => {
        if (item.open) answer.style.height = "auto";
      });
    });
  }

  function bindContactForm() {
    const contact = document.querySelector("#contact");
    const form = contact ? contact.querySelector("form") : null;
    if (!form) return;

    const fieldIds = ["first_name", "last_name", "email", "phone", "message"];

    function getField(id) {
      return form.querySelector(`#${CSS.escape(id)}`);
    }

    function removeError(el) {
      if (!el) return;
      el.classList.remove("fieldError");
      const next = el.nextElementSibling;
      if (next && next.classList.contains("errorText")) next.remove();
    }

    function setError(el, msg) {
      if (!el) return;
      el.classList.add("fieldError");
      const next = el.nextElementSibling;
      if (next && next.classList.contains("errorText")) {
        next.textContent = msg;
        return;
      }
      const div = document.createElement("div");
      div.className = "errorText";
      div.textContent = msg;
      el.insertAdjacentElement("afterend", div);
    }

    function validateField(id) {
      const el = getField(id);
      if (!el) return true;
      const val = String(el.value || "").trim();

      if (id === "first_name" && val.length < 2)
        return setError(el, "Please enter your first name."), false;
      if (id === "last_name" && val.length < 2)
        return setError(el, "Please enter your last name."), false;
      if (id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
        return setError(el, "Please enter a valid email address."), false;
      if (id === "phone" && (!val || !/^\d+$/.test(val)))
        return setError(el, "Please enter a phone number using numbers only."), false;
      if (id === "message" && val.length < 10)
        return setError(el, "Please enter a message with at least 10 characters."), false;

      removeError(el);
      return true;
    }

    function showNotice(type, message) {
      const existing = contact.querySelector(".notice");
      if (existing) existing.remove();
      const notice = document.createElement("div");
      notice.className = `notice notice${type}`;
      notice.setAttribute("role", type === "Success" ? "status" : "alert");
      notice.textContent = message;
      contact.querySelector(".contactGrid")?.insertAdjacentElement("beforebegin", notice);
    }

    fieldIds.forEach((id) => {
      const el = getField(id);
      if (!el) return;
      el.addEventListener("input", () => removeError(el));
      el.addEventListener("blur", () => validateField(id));
    });

    form.addEventListener("submit", (event) => {
      let ok = true;
      fieldIds.forEach((id) => {
        if (!validateField(id)) ok = false;
      });
      if (!ok) {
        event.preventDefault();
        return;
      }

      const endpoint = form.getAttribute("data-endpoint") || "";
      if (!endpoint) return;

      event.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;

      fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      })
        .then((res) => {
          if (!res.ok) throw new Error("submit_failed");
          showNotice("Success", "Thanks. Your enquiry has been sent.");
          form.reset();
          fieldIds.forEach((id) => removeError(getField(id)));
        })
        .catch(() => {
          showNotice("Error", "We could not send your message right now. Please try again later.");
        })
        .finally(() => {
          if (btn) btn.disabled = false;
        });
    });
  }

  function syncYear() {
    document.querySelectorAll("[data-year]").forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });
  }

  syncYear();
  syncHeaderHeight();
  window.addEventListener("resize", syncHeaderHeight);
  bindNavigation();
  bindActiveNav();
  bindReviewCarousels();
  bindFaqAnimation();
  bindContactForm();

  if (window.location.hash) {
    const id = window.location.hash.slice(1);
    setTimeout(() => {
      scrollToId(id);
      stripHashFromUrl();
    }, 50);
  }
})();

  function renderCta(section) {
    return `
      <section id="${escapeHtml(section.id)}" class="band bandAccent">
        <div class="container">
          ${sectionTitle(section)}
          <div class="accentBar">
            <div>
              <h2>${escapeHtml(section.title)}</h2>
              ${section.text ? `<p>${escapeHtml(section.text)}</p>` : ''}
            </div>
            ${button(section.action, 'primary')}
          </div>
        </div>
      </section>
    `;
  }

  function renderStatement(section) {
    const cards = Array.isArray(section.cards) ? section.cards : [];
    const reviews = Array.isArray(section.reviews) ? section.reviews : [];
    const backgroundStyle = sectionBackgroundStyle(section);

    return `
      <section id="${escapeHtml(section.id)}" class="section band bandStatement imageBand"${backgroundStyle}>
        <div class="container statementCopy">
          ${sectionTitle(section)}
          ${cards.length ? `
            <div class="statementCardGrid">
              ${cards.map((card) => `
                <article class="statementCard">
                  <h2>${escapeHtml(card.title)}</h2>
                  <p>${escapeHtml(card.text)}</p>
                </article>
              `).join('')}
            </div>
          ` : `
            ${section.title ? `<h2>${escapeHtml(section.title)}</h2>` : ''}
            ${section.text ? `<p>${escapeHtml(section.text)}</p>` : ''}
          `}
          ${reviews.length ? `
            <div class="reviewCarousel" data-review-carousel>
              <div class="reviewViewport">
                <div class="reviewTrack" data-review-track>
                  ${reviews.map((review, index) => `
                    <figure class="reviewSlide${index === 0 ? ' reviewSlideActive' : ''}" data-review-slide data-review-index="${index}" tabindex="0" role="button" aria-label="Show review ${index + 1}">
                      <blockquote>${escapeHtml(review.text)}</blockquote>
                      ${review.name ? `<figcaption>${escapeHtml(review.name)}</figcaption>` : ''}
                    </figure>
                  `).join('')}
                </div>
              </div>
              <div class="reviewDots" aria-label="Review navigation">
                ${reviews.map((_, index) => `
                  <button class="reviewDot${index === 0 ? ' reviewDotActive' : ''}" type="button" data-review-dot="${index}" aria-label="Show review ${index + 1}"></button>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </section>
    `;
  }

  function renderCards(section) {
    const cards = Array.isArray(section.cards) ? section.cards : [];
    return `
      <section id="${escapeHtml(section.id)}" class="section band bandSoft">
        <div class="container">
          ${sectionTitle(section)}
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
        <div class="container">
          ${sectionTitle(section)}
          <div class="featureGrid">
            <div class="featureMedia" style="--feature-image: url('${escapeHtml(imageUrl(section.image, './assets/images/insights-placeholder.svg'))}')" role="img" aria-label="${escapeHtml(section.title)}"></div>
            <div class="featureCopy">
              <h2>${escapeHtml(section.title)}</h2>
              ${section.text ? `<p>${escapeHtml(section.text)}</p>` : ''}
              <ul class="checkList">
                ${points.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}
              </ul>
              ${button(section.action, 'secondary')}
            </div>
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
          ${sectionTitle(section)}
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
    const backgroundStyle = sectionBackgroundStyle(section);
    return `
      <section id="${escapeHtml(section.id)}" class="section band bandSoft bandFaq imageBand"${backgroundStyle}>
        <div class="container">
          ${sectionTitle(section)}
          ${sectionIntro(section)}
          <div class="faqList">
            ${items.map((item) => `
              <details class="faqItem">
                <summary>
                  <span>${escapeHtml(item.question)}</span>
                  <span class="faqChevron" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <path d="M8 5l8 7-8 7" />
                    </svg>
                  </span>
                </summary>
                <div class="faqAnswer"><p>${escapeHtml(item.answer)}</p></div>
              </details>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  function renderContact(section) {
    const backgroundStyle = sectionBackgroundStyle(section);
    return `
      <section id="${escapeHtml(section.id)}" class="section band bandContact imageBand"${backgroundStyle}>
        <div class="container">
          ${sectionTitle(section)}
          <div class="contactGrid">
            <div class="contactIntro">
              <h2>${escapeHtml(section.title)}</h2>
              ${section.text ? `<p>${escapeHtml(section.text)}</p>` : ''}
              <div class="contactDetails">
                ${detailRow('phone', brand.phone, brand.phoneHref || '#')}
                ${detailRow('address', brand.address)}
                ${detailRow('hours', brand.hours)}
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
                    <label class="srOnly" for="phone">Phone</label>
                    <input id="phone" name="phone" placeholder="Phone" inputmode="tel" autocomplete="tel" required />
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
    if (siteHeader) {
      siteHeader.innerHTML = `
        <div class="container headerInner">
          <a class="brand" href="${escapeHtml(homeHref())}" aria-label="Home">
            <span class="brandMark${brand.logo ? ' siteLogoMark' : ''}" data-brand-mark aria-hidden="true">${logoMarkup()}</span>
          </a>

          <nav class="topNavTabs" data-nav aria-label="Primary navigation"></nav>
        </div>
      `;
    }

    const nav = document.querySelector('[data-nav]');

    document.querySelectorAll('[data-brand-mark]').forEach((el) => {
      const image = el.querySelector('[data-brand-logo]');

      if (image) {
        image.src = brand.logo || image.getAttribute('src') || '';
        image.alt = brand.name || 'Company logo';
        return;
      }

      el.textContent = brand.mark || '';
    });
    const phone = document.querySelector('[data-header-phone]');
    if (phone) {
      phone.textContent = brand.phone || '';
      phone.setAttribute('href', brand.phoneHref || '#contact');
    }

    if (nav) {
      nav.innerHTML = sections
        .filter((section) => section.nav)
        .map((section) => `<a class="topNavLink${section.type === 'contact' ? ' topNavCta' : ''}" href="${escapeHtml(sectionHref(section))}">${escapeHtml(section.nav)}</a>`)
        .join('');
    }

    if (footer) {
      footer.innerHTML = `
        <div class="footerTop">
          <div class="container footerMain">
            <a class="footerBrand" href="${escapeHtml(homeHref())}" aria-label="Home">
              <span class="brandMark${brand.logo ? ' siteLogoMark' : ''}" aria-hidden="true">${logoMarkup()}</span>
            </a>
            <div class="footerLegalLinks" aria-label="Legal links">
              ${legalLinks
          .filter((link) => link && link.href && link.label)
          .map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`)
          .join('')}
            </div>
          </div>
        </div>
        <div class="footerBottom">
          <div class="container footerBottomInner">
            <span>&copy; ${new Date().getFullYear()} ${escapeHtml(brand.name || 'Company Name')} PTY LTD</span>
            <a href="#top">Back to top</a>
          </div>
        </div>
      `;
    }
  }

  function headerOffset() {
    return header ? header.getBoundingClientRect().height : 0;
  }

  function syncHeaderHeight() {
    document.documentElement.style.setProperty('--header-height', `${headerOffset()}px`);
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
      .filter((section) => section.nav && !section.route)
      .map((section) => ({ id: `#${section.id}`, el: document.getElementById(section.id) }))
      .filter((section) => section.el);

    function setActive(id) {
      document.querySelectorAll('.topNavLink').forEach((link) => link.classList.remove('topNavLinkActive'));
      const active = document.querySelector(`.topNavLink[href="${id}"]`);
      if (active) active.classList.add('topNavLinkActive');
    }

    function updateActiveNav() {
      const y = window.scrollY + headerOffset() + 24;
      const atPageEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current = navSections[0] ? navSections[0].id : '#home';

      for (const section of navSections) {
        const top = section.el.getBoundingClientRect().top + window.scrollY;
        if (top <= y) current = section.id;
      }

      if (atPageEnd && navSections.length) {
        current = navSections[navSections.length - 1].id;
      }

      setActive(current);
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        updateActiveNav();
      });
    });

    window.addEventListener('resize', updateActiveNav);
    updateActiveNav();
  }

  function bindReviewCarousels() {
    document.querySelectorAll('[data-review-carousel]').forEach((carousel) => {
      const track = carousel.querySelector('[data-review-track]');
      const slides = Array.from(carousel.querySelectorAll('[data-review-slide]'));
      const dots = Array.from(carousel.querySelectorAll('[data-review-dot]'));
      if (!track || slides.length <= 1) return;

      let current = 0;
      let timer = null;

      function goTo(index) {
        current = (index + slides.length) % slides.length;
        const previous = (current - 1 + slides.length) % slides.length;
        const following = (current + 1) % slides.length;

        slides.forEach((slide, slideIndex) => {
          slide.classList.toggle('reviewSlideActive', slideIndex === current);
          slide.classList.toggle('reviewSlidePrevious', slideIndex === previous);
          slide.classList.toggle('reviewSlideNext', slideIndex === following);
          slide.setAttribute('aria-current', slideIndex === current ? 'true' : 'false');
        });

        dots.forEach((dot, dotIndex) => {
          const active = dotIndex === current;
          dot.classList.toggle('reviewDotActive', active);
          dot.setAttribute('aria-current', active ? 'true' : 'false');
        });
      }

      function stop() {
        if (timer) window.clearInterval(timer);
        timer = null;
      }

      function start() {
        stop();
        timer = window.setInterval(() => goTo(current + 1), 5200);
      }

      dots.forEach((dot) => {
        dot.addEventListener('click', () => {
          goTo(Number(dot.dataset.reviewDot || 0));
          start();
        });
      });

      slides.forEach((slide) => {
        function activateSlide() {
          const index = Number(slide.dataset.reviewIndex || 0);
          if (index === current) return;
          goTo(index);
          start();
        }

        slide.addEventListener('click', activateSlide);
        slide.addEventListener('keydown', (event) => {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          activateSlide();
        });
      });

      carousel.addEventListener('mouseenter', stop);
      carousel.addEventListener('mouseleave', start);
      carousel.addEventListener('focusin', stop);
      carousel.addEventListener('focusout', start);

      goTo(0);
      start();
    });
  }

  function bindFaqAnimation() {
    document.querySelectorAll('.faqItem').forEach((item) => {
      const summary = item.querySelector('summary');
      const answer = item.querySelector('.faqAnswer');
      if (!summary || !answer) return;

      answer.style.height = item.open ? `${answer.scrollHeight}px` : '0px';

      summary.addEventListener('click', (event) => {
        event.preventDefault();

        if (item.open) {
          answer.style.height = `${answer.scrollHeight}px`;
          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
              answer.style.height = '0px';
            });
          });
          answer.addEventListener('transitionend', function closeAfterTransition() {
            item.open = false;
            answer.removeEventListener('transitionend', closeAfterTransition);
          });
          return;
        }

        item.open = true;
        answer.style.height = '0px';
        window.requestAnimationFrame(() => {
          answer.style.height = `${answer.scrollHeight}px`;
        });
      });

      answer.addEventListener('transitionend', () => {
        if (item.open) answer.style.height = 'auto';
      });
    });
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

    function validateField(id) {
      const el = getField(id);
      if (!el) return true;
      const val = String(el.value || '').trim();

      if (id === 'first_name' && val.length < 2) return setError(el, 'Please enter your first name.'), false;
      if (id === 'last_name' && val.length < 2) return setError(el, 'Please enter your last name.'), false;
      if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return setError(el, 'Please enter a valid email address.'), false;
      if (id === 'phone' && (!val || !/^\d+$/.test(val))) return setError(el, 'Please enter a phone number using numbers only.'), false;
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
      contact.querySelector('.contactGrid')?.insertAdjacentElement('beforebegin', notice);
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

