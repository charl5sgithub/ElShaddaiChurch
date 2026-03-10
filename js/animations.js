/**
 * El Shaddai Church – Animations JavaScript Bundle
 * (Transpiled from TypeScript – animations.ts)
 */

// ── Animated Counter ──
function animateCounter(el, target, duration) {
    duration = duration || 1800;
    const start = performance.now();
    const suffix = el.dataset.suffix || '';

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out-quad
        const eased = 1 - (1 - progress) * (1 - progress);
        el.textContent = Math.round(eased * target).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.counter || '0', 10);
                animateCounter(el, target);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach((el) => observer.observe(el));
}

// ── Typing Effect for Hero ──
function initTypingEffect() {
    const el = document.getElementById('typingText');
    if (!el) return;

    const phrases = [
        'Worship Together',
        'Grow in Faith',
        'Serve Our Community',
        "Experience God's Love",
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const phrase = phrases[phraseIndex];
        el.textContent = isDeleting
            ? phrase.substring(0, charIndex--)
            : phrase.substring(0, charIndex++);

        let delay = isDeleting ? 60 : 100;

        if (!isDeleting && charIndex === phrase.length + 1) {
            delay = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 400;
        }

        setTimeout(type, delay);
    }

    type();
}

// ── Scroll-reveal for hero stats ──
function initHeroStats() {
    const statsWrapper = document.querySelector('.hero-stats');
    if (!statsWrapper) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.number[data-counter]').forEach((el) => {
                    const target = parseInt(el.dataset.counter || '0', 10);
                    animateCounter(el, target, 1500);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    observer.observe(statsWrapper);
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
    initCounters();
    initTypingEffect();
    initHeroStats();
});
