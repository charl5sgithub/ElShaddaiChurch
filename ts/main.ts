/**
 * El Shaddai Church – main.ts
 * Initialises all shared functionality across every page.
 */

// ── Intersection Observer – Scroll Animations ────────────────────────────────
function initScrollAnimations(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  const targets = document.querySelectorAll<HTMLElement>(
    '.fade-in, .fade-in-left, .fade-in-right, .stagger'
  );
  targets.forEach((el) => observer.observe(el));
}

// ── Navbar Scroll Shadow ─────────────────────────────────────────────────────
function initNavbar(): void {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handler = (): void => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handler, { passive: true });
  handler();
}

// ── Mobile Hamburger ─────────────────────────────────────────────────────────
function initHamburger(): void {
  const hamburger = document.getElementById('hamburger') as HTMLButtonElement | null;
  const mobileNav = document.getElementById('mobileNav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Back to Top ──────────────────────────────────────────────────────────────
function initScrollTop(): void {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  const toggle = (): void => {
    btn.classList.toggle('show', window.scrollY > 400);
  };
  window.addEventListener('scroll', toggle, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Active Nav Link ──────────────────────────────────────────────────────────
function setActiveNavLink(): void {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll<HTMLAnchorElement>('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href === current) {
      link.classList.add('active');
    }
  });
}

// ── Contact Form Handler ─────────────────────────────────────────────────────
function initContactForm(): void {
  const form = document.getElementById('contactForm') as HTMLFormElement | null;
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (!btn) return;

    const originalText = btn.innerHTML;
    btn.innerHTML = '✓ Message Sent! We'll be in touch soon.';
    btn.disabled = true;
    btn.style.background = 'linear-gradient(135deg,#27ae60,#2ecc71)';

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
    }, 4000);
  });
}

// ── Newsletter Form ──────────────────────────────────────────────────────────
function initNewsletterForm(): void {
  const form = document.getElementById('newsletterForm') as HTMLFormElement | null;
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector<HTMLInputElement>('input[type="email"]');
    if (input) input.value = '';
    const btn = form.querySelector<HTMLButtonElement>('button');
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = '✓ Subscribed!';
      setTimeout(() => { btn.textContent = orig; }, 3000);
    }
  });
}

// ── Smooth Scroll for anchor links ──────────────────────────────────────────
function initSmoothScroll(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ── Initialise everything on DOM ready ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initNavbar();
  initHamburger();
  initScrollTop();
  setActiveNavLink();
  initContactForm();
  initNewsletterForm();
  initSmoothScroll();
});
