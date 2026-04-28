// Mobile menu toggle
const toggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    toggle.textContent = mobileMenu.classList.contains('hidden') ? '☰' : '✕';
  });
}

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    toggle.textContent = '☰';
  });
});

// Contact form — submit via FormSubmit AJAX
const form = document.getElementById('contact-form');
const confirmation = document.getElementById('form-confirmation');

if (form && confirmation) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    data.append('_subject', 'New Contact Form Submission - CPA');
    data.append('_captcha', 'false');
    try {
      data.append('access_key', '698c0dcb-f590-41e3-b76c-7046c2ed6ef6');
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        confirmation.classList.remove('hidden');
        form.reset();
      }
    } catch (_) {
      // silently fail — user can email directly
    }
  });
}

// Reviews Carousel
const track = document.getElementById('review-track');
const dotsWrap = document.getElementById('review-dots');

if (track) {
  const slides = track.querySelectorAll('.review-slide');
  const total = slides.length;
  let current = 0;
  let autoTimer;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'review-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Review ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsWrap.querySelectorAll('.review-dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
  }

  document.querySelector('.review-prev')?.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
  document.querySelector('.review-next')?.addEventListener('click', () => { goTo(current + 1); resetTimer(); });

  function resetTimer() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  resetTimer();
}

// Sticky header shadow on scroll
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 2px 20px rgba(0,0,0,0.5)'
      : 'none';
  }, { passive: true });
}
