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

// Contact form — show confirmation on submit
const form = document.getElementById('contact-form');
const confirmation = document.getElementById('form-confirmation');

if (form && confirmation) {
  form.addEventListener('submit', (e) => {
    // Formspree handles the actual POST — we just show a message after a moment
    setTimeout(() => {
      confirmation.classList.remove('hidden');
      form.reset();
    }, 800);
  });
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
