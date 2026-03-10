/**
 * El Shaddai Church – navigation.ts
 * Handles dropdown menus and keyboard accessibility for the nav.
 */

export function initDropdowns(): void {
    const dropdowns = document.querySelectorAll<HTMLElement>('.dropdown');

    dropdowns.forEach((dropdown) => {
        const toggle = dropdown.querySelector<HTMLAnchorElement>('a');
        const menu = dropdown.querySelector<HTMLElement>('.dropdown-menu');
        if (!toggle || !menu) return;

        // Keyboard support
        toggle.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isOpen = menu.style.opacity === '1';
                menu.style.opacity = isOpen ? '0' : '1';
                menu.style.visibility = isOpen ? 'hidden' : 'visible';
            }
            if (e.key === 'Escape') {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
            }
        });

        // Close on outside click
        document.addEventListener('click', (e: MouseEvent) => {
            if (!dropdown.contains(e.target as Node)) {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initDropdowns);
