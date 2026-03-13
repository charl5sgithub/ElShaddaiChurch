/**
 * El Shaddai Church – main.ts
 * Initialises all shared functionality for the premium redesign.
 */

// ── Intersection Observer – Reveal on Scroll ────────────────────────────────
function initScrollAnimations(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  const targets = document.querySelectorAll('.reveal');
  targets.forEach((el) => observer.observe(el));
}

// ── Navbar Behavior ─────────────────────────────────────────────────────────
function initNavbar(): void {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = (): void => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// ── Mobile Menu ─────────────────────────────────────────────────────────────
function initMobileMenu(): void {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
  });

  // Close when link clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('open');
    });
  });
}

// ── Ministry Modal Logic ────────────────────────────────────────────────────
function initMinistryModal(): void {
  const modal = document.getElementById('ministryModal');
  const modalContent = document.getElementById('modalContent');
  const triggers = document.querySelectorAll('.ministry-trigger');
  const closeBtn = document.getElementById('closeModal');
  
  if (!modal || !modalContent || !closeBtn) return;

  const modalImg = document.getElementById('modalImage') as HTMLImageElement;
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDescription');
  const modalLeader = document.getElementById('modalLeader');
  const modalSchedule = document.getElementById('modalSchedule');

  const openModal = (trigger: Element): void => {
    const el = trigger as HTMLElement;
    const { title, description, leader, schedule, image } = el.dataset;

    if (modalTitle) modalTitle.textContent = title || '';
    if (modalDesc) modalDesc.textContent = description || '';
    if (modalLeader) modalLeader.textContent = leader || '';
    if (modalSchedule) modalSchedule.textContent = schedule || '';
    if (modalImg && image) modalImg.src = image;

    modal.classList.remove('hidden');
    // Force browser to wait for 'hidden' removal before adding opacity for transition
    setTimeout(() => {
      modal.classList.add('opacity-100');
      modalContent.classList.remove('scale-90');
      modalContent.classList.add('scale-100');
    }, 10);
    
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (): void => {
    modal.classList.remove('opacity-100');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-90');
    
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  };

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => openModal(trigger));
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// ── Back to Top ──────────────────────────────────────────────────────────────
function initScrollTop(): void {
  const button = document.getElementById('scrollTop');
  if (!button) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      button.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      button.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
    } else {
      button.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      button.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
    }
  }, { passive: true });

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Smooth Anchor Scrolling ─────────────────────────────────────────────────
function initSmoothScroll(): void {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ── Main Initializer ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initNavbar();
  initMobileMenu();
  initMinistryModal();
  initScrollTop();
  initSmoothScroll();
});

// Update active link
const setActiveLink = () => {
  const path = window.location.pathname;
  const page = path.split("/").pop() || "index.html";
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === page) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

setActiveLink();
window.addEventListener('popstate', setActiveLink);
