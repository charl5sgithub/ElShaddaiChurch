/**
 * El Shaddai Church – animations.ts
 * Counter animations for hero stats and any extra visual polish.
 */

// ── Animated Counter ─────────────────────────────────────────────────────────
function animateCounter(el: HTMLElement, target: number, duration = 1800): void {
    const start = performance.now();
    const update = (now: number): void => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Easing: ease-out-quad
        const eased = 1 - (1 - progress) * (1 - progress);
        el.textContent = Math.round(eased * target).toLocaleString() + (el.dataset.suffix ?? '');
        if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

function initCounters(): void {
    const counters = document.querySelectorAll<HTMLElement>('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target as HTMLElement;
                const target = parseInt(el.dataset.counter ?? '0', 10);
                animateCounter(el, target);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach((el) => observer.observe(el));
}

// ── Typing Effect for Hero ───────────────────────────────────────────────────
function initTypingEffect(): void {
    const el = document.getElementById('typingText');
    if (!el) return;

    const phrases: string[] = [
        'Worship Together',
        'Grow in Faith',
        'Serve Our Community',
        'Experience God\'s Love',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type(): void {
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

document.addEventListener('DOMContentLoaded', () => {
    initCounters();
    initTypingEffect();
});
