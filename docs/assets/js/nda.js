(() => {
  const config = window.SITE_CONFIG || {};
  const brand = config.brand || {};
  const endpoint = config.ndaFormEndpoint || '';
  const form = document.querySelector('[data-nda-form]');
  const footer = document.querySelector('[data-nda-footer]');

  function escapeHtml(value) {
    return String(value || '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function setLogo() {
    document.querySelectorAll('[data-brand-logo]').forEach((image) => {
      image.src = brand.logo || image.getAttribute('src') || '';
      image.alt = brand.name || 'Company logo';
    });
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

  function notice(type, message) {
    const existing = document.querySelector('.notice');
    if (existing) existing.remove();
    const div = document.createElement('div');
    div.className = `notice notice${type}`;
    div.setAttribute('role', type === 'Success' ? 'status' : 'alert');
    div.textContent = message;
    form?.insertAdjacentElement('beforebegin', div);
  }

  function value(id) {
    return String(document.getElementById(id)?.value || '').trim();
  }

  function validate() {
    let ok = true;
    const requiredText = [
      ['recipient_name', 'Please enter your name.'],
      ['recipient_mobile', 'Please enter your mobile phone number.'],
      ['recipient_email', 'Please enter your email address.'],
      ['executed_date', 'Please enter the agreement date.'],
      ['recipient_signature', 'Please enter the recipient signature.'],
    ];

    requiredText.forEach(([id, msg]) => {
      const el = document.getElementById(id);
      if (!value(id)) {
        setError(el, msg);
        ok = false;
      } else {
        removeError(el);
      }
    });

    const phone = document.getElementById('recipient_phone');
    if (value('recipient_phone') && !/^\d+$/.test(value('recipient_phone'))) {
      setError(phone, 'Please use numbers only.');
      ok = false;
    }

    const mobile = document.getElementById('recipient_mobile');
    if (value('recipient_mobile') && !/^\d+$/.test(value('recipient_mobile'))) {
      setError(mobile, 'Please use numbers only.');
      ok = false;
    }

    const email = document.getElementById('recipient_email');
    if (value('recipient_email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value('recipient_email'))) {
      setError(email, 'Please enter a valid email address.');
      ok = false;
    }

    ['agreement_confirmed', 'robot_check'].forEach((id) => {
      const el = document.getElementById(id);
      if (!el?.checked) {
        setError(el, id === 'robot_check' ? 'Please confirm you are not a robot.' : 'Please confirm the agreement.');
        ok = false;
      } else {
        removeError(el);
      }
    });

    return ok;
  }

  function bindForm() {
    if (!form) return;
    form.setAttribute('data-endpoint', endpoint);
    if (endpoint) form.setAttribute('action', endpoint);

    form.querySelectorAll('input, textarea').forEach((field) => {
      field.addEventListener('input', () => removeError(field));
      field.addEventListener('change', () => removeError(field));
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (form.querySelector('#company_website')?.value) return;
      if (!validate()) return;
      if (!endpoint) {
        notice('Error', 'Confidential agreement form endpoint is not configured yet.');
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      const data = Object.fromEntries(new FormData(form));

      fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('submit_failed');
          notice('Success', 'Thanks. Your confidential agreement has been submitted.');
          form.reset();
        })
        .catch(() => {
          notice('Error', 'We could not submit your confidential agreement right now. Please try again later.');
        })
        .finally(() => {
          if (btn) btn.disabled = false;
        });
    });
  }

  function renderFooter() {
    if (!footer) return;
    footer.innerHTML = `
      <div class="footerBottom">
        <div class="container footerBottomInner">
          <span>&copy; ${new Date().getFullYear()} ${escapeHtml(brand.name || 'Company Name')}</span>
          <a href="./index.html#home">Back to site</a>
        </div>
      </div>
    `;
  }

  setLogo();
  bindForm();
  renderFooter();
})();
