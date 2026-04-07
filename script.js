/* ============================================================
   ST. TERESA CLC — GLOBAL SCRIPT (script.js)
   ============================================================ */

/* ── Mobile nav toggle ── */
var navToggle = document.getElementById('navToggle');
var navMobile = document.getElementById('navMobile');
if (navToggle && navMobile) {
  navToggle.addEventListener('click', function () {
    navMobile.classList.toggle('open');
  });
}

/* ── Close mobile nav on link click ── */
document.querySelectorAll('.nav-mobile a').forEach(function (a) {
  a.addEventListener('click', function () {
    if (navMobile) navMobile.classList.remove('open');
  });
});

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ── Sticky nav scroll shadow ── */
var nav = document.querySelector('nav');
window.addEventListener('scroll', function () {
  if (nav) {
    nav.style.boxShadow = window.scrollY > 10
      ? '0 4px 20px rgba(0,0,0,0.28)'
      : '0 2px 12px rgba(0,0,0,0.18)';
  }
});

/* ── Active nav link highlight ── */
(function () {
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ── Contact form validation ── */
var contactForm = document.getElementById('contactForm');
var formMsg     = document.getElementById('formMsg');

if (contactForm && formMsg) {
  contactForm.addEventListener('submit', function (e) {
    var fname   = (document.getElementById('fname')   || {}).value || '';
    var email   = (document.getElementById('email')   || {}).value || '';
    var message = (document.getElementById('message') || {}).value || '';
    var reason  = (document.getElementById('reason')  || {}).value || '';

    formMsg.textContent = '';
    formMsg.style.color = '';

    if (!fname.trim() || !email.trim() || !message.trim() || !reason) {
      e.preventDefault();
      formMsg.textContent = 'Please fill in all required fields.';
      formMsg.style.color = '#c0392b';
      return;
    }

    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email.trim())) {
      e.preventDefault();
      formMsg.textContent = 'Please enter a valid email address.';
      formMsg.style.color = '#c0392b';
      return;
    }

    formMsg.textContent = 'Sending your message…';
    formMsg.style.color = '#2c6e2c';

    /* Uncomment to use Fetch API instead of Formspree redirect:
    e.preventDefault();
    fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    }).then(function (r) {
      if (r.ok) {
        formMsg.textContent = "Thank you! We'll be in touch within 24 hours.";
        formMsg.style.color = '#2c6e2c';
        contactForm.reset();
      } else {
        formMsg.textContent = 'Something went wrong. Please try again or call us.';
        formMsg.style.color = '#c0392b';
      }
    }).catch(function () {
      formMsg.textContent = 'Network error. Please check your connection.';
      formMsg.style.color = '#c0392b';
    });
    */
  });
}

/* ── Scroll-triggered fade-in for cards ── */
if ('IntersectionObserver' in window) {
  var fadeTargets = document.querySelectorAll(
    '.feature-card, .news-card, .news-item, .blog-card, .blog-post-card, ' +
    '.testi-card, .program-card, .prog-full-card, .teacher-card, .team-card, ' +
    '.value-card, .gallery-masonry-item, .timeline-item'
  );

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeTargets.forEach(function (el) {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

/* ── Pagination (client-side demo) ── */
document.querySelectorAll('.pagination .page-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.pagination .page-btn')
      .forEach(function (b) { b.classList.remove('active'); });
    this.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});