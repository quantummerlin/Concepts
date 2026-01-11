// Analytics helper: send named events to gtag if available
function trackEvent(name, params) {
  try {
    if (window.gtag) {
      window.gtag('event', name, params || {});
    }
  } catch (e) {
    console.warn('GA event failed', e);
  }
}

function trackMicroWin(topic) {
  trackEvent('micro_win', {category: 'engagement', label: topic, value: 1});
}

function trackEmailSignup(topic) {
  trackEvent('email_signup', {category: 'conversion', label: topic});
}
