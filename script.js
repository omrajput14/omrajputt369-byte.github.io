/**
 * OM Portfolio Script
 * Contents:
 * 1. Preloader Logic
 * 2. Scroll Reveal Animations
 * 3. Active Navigation Highlighting
 * 4. Smooth Scrolling
 * 5. Dark Mode Logic
 * 6. Contact Form with EmailJS
 * 7. Stats Counter Animation
 * 8. Project Filtering
 * 9. Scroll-to-Top Button
 * 10. Staggered Card Animations
 */

// Handle preloader and initial animations on window load
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add("fade-out");
            setTimeout(() => {
                preloader.style.display = "none";
            }, 500); // Wait for CSS transition
        }, 800); // Delay for branding visibility (reduced from 3000ms for LCP optimization)
    }
    initScrollAnimations();
    initStatsCounter();
    initProjectFilter();
    initScrollToTop();
    initStaggeredCards();
});


// Initialization of IntersectionObserver for scroll-reveal effects
function initScrollAnimations() {
    const elements = document.querySelectorAll(
        ".slide-in-left, .slide-in-right, .slide-in-up"
    );

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translate(0)";
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    elements.forEach(el => observer.observe(el));
}


// Navigation Highlight: Updates 'active' class on scroll
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".ul-list li");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(item => {
        item.classList.remove("active");

        const link = item.querySelector("a");
        if (link && link.getAttribute("href") === `#${current}`) {
            item.classList.add("active");
        }
    });
});

// Smooth scroll implementation for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        // Skip links that are just "#" (like tech stack tags)
        if (this.getAttribute("href") === "#") return;

        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            window.scrollTo({
                top: target.offsetTop - 120,
                behavior: "smooth"
            });
        }
    });
});

// Dark Mode Toggling and Persistence Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Persistence: Check localStorage for theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

// Click event for theme switching
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        localStorage.setItem('theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});


// =============================================
// 6. CONTACT FORM — EmailJS Integration
// =============================================

// ⚠️  REPLACE THESE 3 VALUES with your EmailJS credentials
//     Setup guide: See README or follow steps below
const EMAILJS_PUBLIC_KEY = 'blH9IJ0N0xqtRam9j'; // ✅ Set
const EMAILJS_SERVICE_ID = 'service_vz5bpbf';    // ✅ Set
const EMAILJS_TEMPLATE_ID = 'n37u0up';             // ✅ Set

emailjs.init(EMAILJS_PUBLIC_KEY);

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
            .then(() => {
                showToast('MESSAGE SENT! 🚀 I\'ll get back to you soon!', 'success');
                contactForm.reset();
            })
            .catch(() => {
                showToast('OOPS! 💥 Failed to send. Try again!', 'error');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
            });
    });
}

// Comic-style toast notification
function showToast(message, type) {
    // Remove any existing toast
    const existing = document.querySelector('.om-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `om-toast om-toast-${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        requestAnimationFrame(() => toast.classList.add('om-toast-show'));
    });

    // Auto-remove after 4s
    setTimeout(() => {
        toast.classList.remove('om-toast-show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}


// =============================================
// 7. STATS COUNTER — Animated Count-Up
// =============================================

function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;

    let hasAnimated = false;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    // Observe the stats section
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) observer.observe(statsSection);

    function animateCounters() {
        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const startTime = performance.now();

            function updateCount(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease-out cubic for smooth deceleration
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * target);

                counter.textContent = current.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }

            requestAnimationFrame(updateCount);
        });
    }
}


// =============================================
// 8. PROJECT FILTERING
// =============================================

function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';

                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden-card');
                    card.classList.add('show-card');
                } else {
                    card.classList.remove('show-card');
                    card.classList.add('hidden-card');
                }
            });
        });
    });
}


// =============================================
// 9. SCROLL-TO-TOP BUTTON
// =============================================

function initScrollToTop() {
    const scrollBtn = document.getElementById('scroll-top-btn');
    if (!scrollBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// =============================================
// 10. STAGGERED CARD ANIMATIONS
// =============================================

function initStaggeredCards() {
    const cards = document.querySelectorAll('.stagger-card');
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find the index of this card among siblings
                const card = entry.target;
                const parent = card.parentElement;
                const siblings = Array.from(parent.querySelectorAll('.stagger-card'));
                const index = siblings.indexOf(card);

                // Stagger delay: 150ms per card
                setTimeout(() => {
                    card.classList.add('stagger-visible');
                }, index * 150);

                observer.unobserve(card);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
}
