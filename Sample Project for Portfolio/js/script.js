/**
 * Technical Hourglass - Core JS
 * Optimized for performance, smooth interactions, and accessibility.
 */

document.addEventListener('DOMContentLoaded', () => {
    /* --- Mobile Menu Toggle --- */
    const menuToggle = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('is-active');
            menuToggle.setAttribute('aria-expanded', isActive);
            menuToggle.innerHTML = isActive ? '<i class="ph ph-x"></i>' : '<i class="ph ph-list"></i>';
        });

        // Close menu on click outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('is-active')) {
                navMenu.classList.remove('is-active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.innerHTML = '<i class="ph ph-list"></i>';
            }
        });
    }

    /* --- Sticky Header --- */
    const header = document.getElementById('header');
    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // init
    }

    /* --- Scroll Reveal Animations (Intersection Observer) --- */
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealOnScroll = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            });
        }, revealOptions);

        revealElements.forEach(el => revealOnScroll.observe(el));
    }

    /* --- Smooth Scrolling --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                // close mobile menu
                if (navMenu && navMenu.classList.contains('is-active')) {
                    navMenu.classList.remove('is-active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.innerHTML = '<i class="ph ph-list"></i>';
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* --- Back To Top Button --- */
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('is-visible');
            } else {
                backToTop.classList.remove('is-visible');
            }
        }, { passive: true });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* --- Newsletter Form Validation Mock --- */
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const messageEl = form.querySelector('.form-message');

            if (emailInput.value && emailInput.value.includes('@') && emailInput.value.includes('.')) {
                emailInput.classList.remove('error');
                emailInput.classList.add('success');
                messageEl.textContent = "Successfully subscribed! Secure your peace of mind.";
                messageEl.className = "form-message success";
                form.reset();
                setTimeout(() => {
                    messageEl.textContent = "";
                    emailInput.classList.remove('success');
                }, 4000);
            } else {
                emailInput.classList.add('error');
                messageEl.textContent = "Please enter a valid email address.";
                messageEl.className = "form-message error";
            }
        });
    });

    /* --- Contact Form Validation Mock --- */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Sending securely...';
            btn.disabled = true;

            setTimeout(() => {
                contactForm.innerHTML = `
                    <div style="text-align: center; padding: 2rem;">
                        <div class="icon-box" style="margin: 0 auto 1rem; color: var(--color-success); background-color: rgba(16, 185, 129, 0.1);">
                            <i class="ph ph-check-circle"></i>
                        </div>
                        <h3 class="heading-md" style="color: var(--color-success);">Message Sent Securely</h3>
                        <p>Our 24/7 support team has received your inquiry. We will respond shortly to ensure your safety needs are met.</p>
                    </div>
                `;
            }, 1500);
        });
    }
});
