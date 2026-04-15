/* =============================================
   GRASSROOTS HOSPITALITY — JAVASCRIPT
   ============================================= */

'use strict';

// ---- Navbar scroll behaviour ----
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll(); // run on load


// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});


// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');

function setActiveNavLink() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = 'var(--teal)';
      } else {
        link.style.color = '';
      }
    }
  });
}

window.addEventListener('scroll', setActiveNavLink, { passive: true });


// ---- Scroll-reveal animation ----
const revealElements = document.querySelectorAll(
  '.room-card, .amenity-card, .testimonial-card, .about-image-wrap, .about-text, .contact-info, .contact-map, .gallery-item'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity  = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});


// ---- Booking form ----
const bookingForm    = document.getElementById('bookingForm');
const bookingSuccess = document.getElementById('bookingSuccess');

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
const checkInInput  = document.getElementById('checkIn');
const checkOutInput = document.getElementById('checkOut');
if (checkInInput)  checkInInput.min  = today;
if (checkOutInput) checkOutInput.min = today;

// Ensure check-out is after check-in
if (checkInInput && checkOutInput) {
  checkInInput.addEventListener('change', () => {
    checkOutInput.min = checkInInput.value;
    if (checkOutInput.value && checkOutInput.value < checkInInput.value) {
      checkOutInput.value = '';
    }
  });
}

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const required = bookingForm.querySelectorAll('[required]');
    let valid = true;

    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#e74c3c';
        field.style.boxShadow   = '0 0 0 3px rgba(231,76,60,0.12)';
        valid = false;
      }
    });

    if (!valid) {
      bookingForm.querySelector('[required]:invalid, [required][style*="e74c3c"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Simulate submission
    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    setTimeout(() => {
      bookingForm.style.display    = 'none';
      bookingSuccess.style.display = 'block';
      bookingSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1200);
  });
}


// ---- Newsletter form ----
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input  = newsletterForm.querySelector('input[type="email"]');
    const button = newsletterForm.querySelector('button');
    if (input.value) {
      button.textContent = 'Subscribed ✓';
      button.style.background = 'var(--teal-dark)';
      input.value = '';
      input.disabled = true;
      button.disabled = true;
    }
  });
}


// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ---- Gallery lightbox (placeholder-ready) ----
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    // When real images are added, this can be upgraded to a full lightbox
    const label = item.querySelector('span')?.textContent;
    if (label) {
      // Placeholder feedback — remove when real images are added
      item.style.outline = '2px solid var(--teal)';
      setTimeout(() => { item.style.outline = ''; }, 600);
    }
  });
});
