/**
 * El Shaddai Church – Compiled JavaScript Bundle
 * (Transpiled from TypeScript – main.ts + navigation.ts)
 */

// ── Intersection Observer – Scroll Animations ──
function initScrollAnimations() {
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

    const targets = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .stagger');
    targets.forEach((el) => observer.observe(el));
}

// ── Navbar Scroll Shadow ──
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const handler = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
}

// ── Mobile Hamburger ──
function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open');
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', String(!expanded));
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileNav.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

// ── Back to Top ──
function initScrollTop() {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ── Active Nav Link ──
function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentHash = window.location.hash; // e.g. '#expect'

    document.querySelectorAll('.nav-links a').forEach((link) => {
        const href = link.getAttribute('href') || '';
        const hashIndex = href.indexOf('#');
        const hrefPath = hashIndex !== -1 ? href.slice(0, hashIndex) : href;
        const hrefHash = hashIndex !== -1 ? href.slice(hashIndex) : '';

        let isActive = false;

        if (hrefHash) {
            // Hash link: only active when both path AND hash match
            isActive = hrefPath === currentPath && hrefHash === currentHash;
        } else {
            // No hash: active when path matches (and no hash in current URL, or this is the parent page link)
            isActive = hrefPath === currentPath;
        }

        if (isActive) {
            link.classList.add('active');
        }
    });
}

// ── Contact Form Handler ──
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        if (!btn) return;

        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check mr-2"></i>Message Sent! We\'ll be in touch soon.';
        btn.disabled = true;
        btn.style.background = 'linear-gradient(135deg,#27ae60,#2ecc71)';

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            btn.style.background = '';
            form.reset();
        }, 4000);
    });
}

// ── Newsletter Form ──
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const btn = form.querySelector('button');
        if (input) input.value = '';
        if (btn) {
            const orig = btn.textContent;
            btn.textContent = '✓ Subscribed!';
            setTimeout(() => { btn.textContent = orig; }, 3000);
        }
    });
}

// ── Smooth Scroll ──
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80; // nav height
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

// ── Dropdowns Keyboard Support ──
function initDropdowns() {
    document.querySelectorAll('.dropdown').forEach((dropdown) => {
        const toggle = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.dropdown-menu');
        if (!toggle || !menu) return;

        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                menu.classList.toggle('active');
            }
            if (e.key === 'Escape') {
                menu.classList.remove('active');
            }
        });
    });

    document.addEventListener('click', (e) => {
        document.querySelectorAll('.dropdown .dropdown-menu').forEach((menu) => {
            const dropdown = menu.closest('.dropdown');
            // Close if clicking outside the dropdown OR if clicking a link INSIDE the menu
            if (!dropdown.contains(e.target) || e.target.closest('.dropdown-menu a')) {
                menu.classList.remove('active');

                // Reset toggle attributes if any
                const toggle = dropdown.querySelector('a[aria-expanded]');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// ── Pre-fill form fields from URL params ──
function prefillFromURLParams() {
    const params = new URLSearchParams(window.location.search);
    const ministry = params.get('ministry');
    const event = params.get('event');
    const subjectEl = document.getElementById('subject');
    const messageEl = document.getElementById('message');

    if (ministry && subjectEl) {
        subjectEl.value = 'ministry';
        if (messageEl) {
            const labels = {
                children: 'Children Ministry',
                youth: 'Youth Ministry',
                women: 'Women\'s Fellowship',
                men: 'Men\'s Fellowship',
                worship: 'Worship Team',
                prayer: 'Prayer Ministry',
                outreach: 'Outreach Ministry'
            };
            messageEl.value = `Hi, I'm interested in joining the ${labels[ministry] || ministry}. Please get in touch with me about next steps. Thank you!`;
        }
    }

    if (event && subjectEl) {
        subjectEl.value = 'event';
        if (messageEl) {
            messageEl.value = `Hi, I would like to register for the upcoming event. Please send me more details. Thank you!`;
        }
    }
}

// ── Ministry Modal ──
function initMinistryModal() {
    const modal = document.getElementById('ministryModal');
    const triggers = document.querySelectorAll('.ministry-trigger');
    const closeBtn = document.getElementById('closeModal');
    const overlay = document.getElementById('modalOverlay');

    if (!modal || !triggers.length || !closeBtn || !overlay) return;

    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDescription');
    const modalLeader = document.getElementById('modalLeader');
    const modalSchedule = document.getElementById('modalSchedule');
    const modalImg = document.getElementById('modalImage');
    const modalFallback = document.getElementById('modalImageFallback');

    const openModal = (el) => {
        const { title, description, leader, schedule, image } = el.dataset;

        if (modalTitle) modalTitle.textContent = title || '';
        if (modalDesc) modalDesc.textContent = description || '';
        if (modalLeader) modalLeader.textContent = leader || '';
        if (modalSchedule) modalSchedule.textContent = schedule || '';

        if (modalImg) {
            if (image) {
                modalImg.src = image;
                modalImg.classList.remove('hidden');
                if (modalFallback) modalFallback.classList.add('hidden');
            } else {
                modalImg.classList.add('hidden');
                if (modalFallback) {
                    modalFallback.classList.remove('hidden');
                    modalFallback.textContent = el.querySelector('.ministry-card-img span')?.textContent || '✝';
                }
            }
        }

        modal.classList.remove('hidden');
        // Force reflow
        void modal.offsetWidth;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    };

    triggers.forEach((trigger) => {
        trigger.addEventListener('click', () => openModal(trigger));
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ── Initialise on DOM ready ──
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initNavbar();
    initHamburger();
    initScrollTop();
    setActiveNavLink();
    initContactForm();
    initNewsletterForm();
    initSmoothScroll();
    initDropdowns();
    prefillFromURLParams();
    initMinistryModal();
});
