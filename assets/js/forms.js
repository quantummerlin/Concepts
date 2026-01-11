// Client-side Formspree enhancer: inject consent, validate, and send analytic event
document.addEventListener('DOMContentLoaded', function () {
  const ENDPOINT = 'formspree.io/f/mgowrolb';

  function findFormspreeForms() {
    return Array.from(document.querySelectorAll('form')).filter(f => f.action && f.action.includes(ENDPOINT));
  }

  function createConsentNode() {
    const wrap = document.createElement('label');
    wrap.className = 'consent';
    wrap.innerHTML = '<input type="checkbox" name="consent" required aria-required="true"> I agree to receive occasional emails and understand I can unsubscribe.';
    return wrap;
  }

  function setUpForm(form) {
    // add topic dataset if missing
    if (!form.dataset.topic) {
      form.dataset.topic = form.getAttribute('aria-label') || document.title || 'signup';
    }

    // inject consent checkbox if not present
    if (!form.querySelector('input[name="consent"]')) {
      const submit = form.querySelector('button[type="submit"], input[type="submit"]');
      const consent = createConsentNode();
      if (submit) submit.parentNode.insertBefore(consent, submit);
      else form.appendChild(consent);
    }

    // attach submit handler to send analytics and submit via fetch
    form.addEventListener('submit', function (e) {
      if (!form.checkValidity()) {
        // let browser show validation UI
        return;
      }
      e.preventDefault();
      const topic = form.dataset.topic;
      try { if (window.trackEmailSignup) window.trackEmailSignup(topic); } catch (err) { /* noop */ }

      const action = form.action;
      const method = (form.method || 'POST').toUpperCase();
      const fd = new FormData(form);

      fetch(action, { method, body: fd, headers: { 'Accept': 'application/json' } })
        .then(resp => {
          if (resp.ok) {
            form.innerHTML = '<p class="success">Thanks — check your inbox for the early access link.</p>';
          } else {
            form.insertAdjacentHTML('beforebegin', '<p class="error">Submission failed — please try again.</p>');
          }
        })
        .catch(() => {
          form.insertAdjacentHTML('beforebegin', '<p class="error">Submission error — please try again.</p>');
        });
    });
  }

  const forms = findFormspreeForms();
  forms.forEach(setUpForm);
});
