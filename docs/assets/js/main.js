(() => {
  const header = document.querySelector('.siteHeader');
  const links = Array.from(document.querySelectorAll('a[href^="#"]'));

  function headerOffset() {
    return header ? header.getBoundingClientRect().height : 0;
  }

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset();
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  function stripHashFromUrl() {
    if (!window.location.hash) return;
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  links.forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href') || '';
      if (!href.startsWith('#') || href === '#') return;
      const id = href.slice(1);
      if (!document.getElementById(id)) return;
      e.preventDefault();
      // Keep the URL clean (no #home / #about / etc) while still scrolling.
      stripHashFromUrl();
      scrollToId(id);
    });
  });

  // Active link highlight based on scroll position
  const sections = ['#home', '#about', '#faq', '#contact']
    .map((id) => ({ id, el: document.querySelector(id) }))
    .filter((s) => s.el);

  function setActive(id) {
    document.querySelectorAll('.topNavLink').forEach((l) => l.classList.remove('topNavLinkActive'));
    const active = document.querySelector(`.topNavLink[href="${id}"]`);
    if (active) active.classList.add('topNavLinkActive');
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      ticking = false;
      const y = window.scrollY + headerOffset() + 12;
      let current = '#home';
      for (const s of sections) {
        const top = s.el.getBoundingClientRect().top + window.scrollY;
        if (top <= y) current = s.id;
      }
      setActive(current);
    });
  });

  // If loaded with a hash, scroll to the section but immediately strip the hash from the URL.
  if (window.location.hash) {
    const id = window.location.hash.slice(1);
    setTimeout(() => {
      scrollToId(id);
      stripHashFromUrl();
    }, 50);
  }

  // Keep active link highlight working, even though we don’t use the URL hash.
  setActive('#home');

  // Contact form: live validation UX (clear errors as user fixes fields)
  const contact = document.querySelector('#contact');
  const form = contact ? contact.querySelector('form') : null;
  if (form) {
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

      if (id === 'first_name') {
        if (val.length < 2) return setError(el, 'Please enter your first name.'), false;
        return removeError(el), true;
      }
      if (id === 'last_name') {
        if (val.length < 2) return setError(el, 'Please enter your last name.'), false;
        return removeError(el), true;
      }
      if (id === 'email') {
        // Simple, permissive email check (server remains authoritative)
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return setError(el, 'Please enter a valid email address.'), false;
        return removeError(el), true;
      }
      if (id === 'phone') {
        if (val === '') return removeError(el), true;
        const d = digits(val);
        if (d.length < 7 || d.length > 20) return setError(el, 'Please enter a valid phone number (or leave blank).'), false;
        return removeError(el), true;
      }
      if (id === 'message') {
        if (val.length < 10) return setError(el, 'Please enter a message (10+ characters).'), false;
        return removeError(el), true;
      }

      return true;
    }

    function clearFormError() {
      const fe = form.querySelector('.formError');
      if (fe) fe.remove();
    }

    fieldIds.forEach((id) => {
      const el = getField(id);
      if (!el) return;

      // While typing: clear stale errors (we’ll re-check on blur/submit)
      el.addEventListener('input', () => {
        removeError(el);
        clearFormError();
      });

      // On blur: show message only if still invalid
      el.addEventListener('blur', () => {
        validateField(id);
      });
    });

    form.addEventListener('submit', (e) => {
      clearFormError();
      let ok = true;
      fieldIds.forEach((id) => {
        if (!validateField(id)) ok = false;
      });
      if (!ok) {
        e.preventDefault();
        return;
      }

      // Static hosting (GitHub Pages): optionally submit to an external form endpoint.
      const endpoint = form.getAttribute('data-endpoint') || '';
      if (endpoint) {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        if (btn) btn.disabled = true;

        fetch(endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form),
        })
          .then(async (res) => {
            if (!res.ok) throw new Error('submit_failed');

            // Remove any previous notices
            const existing = contact.querySelector('.notice');
            if (existing) existing.remove();

            const notice = document.createElement('div');
            notice.className = 'notice noticeSuccess';
            notice.setAttribute('role', 'status');
            notice.textContent = 'Thanks! Your enquiry has been sent.';
            contact.querySelector('.container')?.insertBefore(notice, contact.querySelector('.contactWrap'));

            form.reset();
            fieldIds.forEach((id) => removeError(getField(id)));
            clearFormError();
          })
          .catch(() => {
            const existing = contact.querySelector('.notice');
            if (existing) existing.remove();

            const notice = document.createElement('div');
            notice.className = 'notice noticeError';
            notice.setAttribute('role', 'alert');
            notice.textContent = 'We could not send your message right now. Please try again later.';
            contact.querySelector('.container')?.insertBefore(notice, contact.querySelector('.contactWrap'));
          })
          .finally(() => {
            if (btn) btn.disabled = false;
          });
      }
    });
  }
})();

