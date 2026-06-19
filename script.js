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
    initProjectCarousel();
    initScrollToTop();
    initStaggeredCards();
    initClickPopups();
    initGlitchMode();
    init3DTilt();
    initAgriTechTerminal();
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
    // Spin and scale the icon
    themeToggle.classList.add('rotate-icon');
    setTimeout(() => {
        themeToggle.classList.remove('rotate-icon');
    }, 500);

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
// 8. PROJECT CAROUSEL & FILTERING
// =============================================

function initProjectCarousel() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const prevBtn = document.getElementById('prev-project-btn');
    const nextBtn = document.getElementById('next-project-btn');
    const pageIndicator = document.getElementById('project-page-indicator');

    if (projectCards.length === 0) return;

    let filteredCards = Array.from(projectCards);
    let currentIndex = 0;
    let currentFilter = 'all';

    // Initialize display
    updateCarousel('next');

    // Click handler for filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentFilter = btn.getAttribute('data-filter');
            
            // Re-filter cards
            filteredCards = Array.from(projectCards).filter(card => {
                const categories = card.getAttribute('data-category') || '';
                return currentFilter === 'all' || categories.split(' ').includes(currentFilter);
            });

            // Reset current index to first card of the new category
            currentIndex = 0;
            updateCarousel('next');
        });
    });

    // Prev/Next slide triggers
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (filteredCards.length <= 1) return;
            currentIndex = (currentIndex - 1 + filteredCards.length) % filteredCards.length;
            updateCarousel('prev');
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (filteredCards.length <= 1) return;
            currentIndex = (currentIndex + 1) % filteredCards.length;
            updateCarousel('next');
        });
    }

    function updateCarousel(direction = 'next') {
        // Toggle card display states
        projectCards.forEach(card => {
            card.classList.remove('active-slide', 'slide-next', 'slide-prev');
            card.style.display = 'none'; // Ensure fully hidden
        });

        if (filteredCards.length === 0) {
            if (pageIndicator) pageIndicator.textContent = "PROJECT 0 OF 0";
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            return;
        }

        // Show/hide arrows based on counts
        if (filteredCards.length <= 1) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
        } else {
            if (prevBtn) prevBtn.style.display = 'flex';
            if (nextBtn) nextBtn.style.display = 'flex';
        }

        // Display the active slide
        const activeCard = filteredCards[currentIndex];
        if (activeCard) {
            activeCard.style.display = 'grid'; // Enable layout
            activeCard.classList.add('active-slide');
            
            // Add slide transition direction
            if (direction === 'next') {
                activeCard.classList.add('slide-next');
            } else {
                activeCard.classList.add('slide-prev');
            }
        }

        // Update page indicator text
        if (pageIndicator) {
            pageIndicator.textContent = `PROJECT ${currentIndex + 1} OF ${filteredCards.length}`;
        }
    }
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

// =============================================
// 11. COMIC CLICK POPUP EFFECT
// =============================================

function initClickPopups() {
    const words = ["POW!", "ZAP!", "BAM!", "BOOM!", "CRASH!", "CLICK!", "OH!", "WOW!", "COOL!", "ZING!", "DATA!", "CODE!"];
    const colors = ["pop-yellow", "pop-red", "pop-cyan"];

    document.addEventListener("click", (e) => {
        // Skip for interactive elements
        const target = e.target;
        if (target.closest('a') || target.closest('button') || target.closest('.filter-btn') || target.closest('input') || target.closest('textarea')) {
            return;
        }

        const x = e.pageX;
        const y = e.pageY;

        const pop = document.createElement("div");
        pop.classList.add("comic-pop");
        
        const randomWord = words[Math.floor(Math.random() * words.length)];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        pop.classList.add(randomColor);
        pop.textContent = randomWord;

        pop.style.left = `${x}px`;
        pop.style.top = `${y}px`;

        document.body.appendChild(pop);

        setTimeout(() => {
            pop.remove();
        }, 800);
    });
}

// =============================================
// 12. SPIDER-VERSE GLITCH EASTER EGG
// =============================================

function initGlitchMode() {
    let keyBuffer = "";
    const targetWord = "spider";
    const overlay = document.getElementById("glitch-overlay");
    const restabilizeBtn = document.getElementById("restabilize-btn");

    if (!overlay || !restabilizeBtn) return;

    window.addEventListener("keydown", (e) => {
        if (e.key.length === 1) {
            keyBuffer += e.key.toLowerCase();
            if (keyBuffer.length > targetWord.length) {
                keyBuffer = keyBuffer.substring(keyBuffer.length - targetWord.length);
            }

            if (keyBuffer === targetWord) {
                document.body.classList.add("glitch-active");
                keyBuffer = "";
            }
        }
    });

    restabilizeBtn.addEventListener("click", () => {
        document.body.classList.remove("glitch-active");
    });
}

// =============================================
// 13. 3D PARALLAX CARD TILT
// =============================================

function init3DTilt() {
    const cards = document.querySelectorAll('.project-card');
    if (cards.length === 0) return;

    if (window.matchMedia("(pointer: coarse)").matches) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            
            const dx = x - xc;
            const dy = y - yc;
            
            const tiltX = -(dy / yc) * 12;
            const tiltY = (dx / xc) * 12;
            
            card.style.transition = 'transform 0.05s ease-out';
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03, 1.03, 1.03) translateZ(10px)`;
            card.style.zIndex = '5';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0)';
            card.style.zIndex = '1';
        });
    });
}

// =============================================
// 14. AGRITECH TERMINAL SIMULATOR
// =============================================

function initAgriTechTerminal() {
    const input = document.getElementById("console-input");
    const body = document.getElementById("console-body");
    if (!input || !body) return;

    let history = [];
    let historyIndex = -1;

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const commandText = input.value.trim();
            input.value = "";

            if (commandText === "") return;

            history.push(commandText);
            historyIndex = history.length;

            writeLine(`om@agritech:~$ ${commandText}`, "text-cyan");

            processCommand(commandText.toLowerCase());

            body.scrollTop = body.scrollHeight;
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = history[historyIndex];
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex < history.length - 1) {
                historyIndex++;
                input.value = history[historyIndex];
            } else {
                historyIndex = history.length;
                input.value = "";
            }
        }
    });

    const wrapper = document.querySelector(".console-wrapper");
    if (wrapper) {
        wrapper.addEventListener("click", () => {
            input.focus();
        });
    }

    function writeLine(text, className = "") {
        const line = document.createElement("div");
        line.className = `console-line ${className}`;
        line.innerHTML = text;
        body.appendChild(line);
    }

    function processCommand(cmd) {
        const parts = cmd.split(" ");
        const base = parts[0];

        switch (base) {
            case "help":
                writeLine("Available commands:");
                writeLine("  <span class='text-highlight'>help</span>         - Display this menu");
                writeLine("  <span class='text-highlight'>status</span>       - Check system diagnostics & network state");
                writeLine("  <span class='text-highlight'>agriflow</span>     - Run simulated grape export validation");
                writeLine("  <span class='text-highlight'>ecoirrigate</span>   - Read real-time node telemetry logs");
                writeLine("  <span class='text-highlight'>neofetch</span>     - Display system info & ascii art logo");
                writeLine("  <span class='text-highlight'>clear</span>        - Clear screen terminal logs");
                break;

            case "clear":
                body.innerHTML = "";
                break;

            case "status":
                writeLine("System Diagnostics:", "text-highlight");
                writeLine("  [DATABASE] PostgreSQL Local Cluster - <span class='text-success'>ONLINE (ping 8ms)</span>");
                writeLine("  [API LAYER] FastAPI Server Engine - <span class='text-success'>ONLINE (Uptime: 45d)</span>");
                writeLine("  [IOT BRIDGE] Mosquitto MQTT Broker - <span class='text-success'>LISTENING (port 1883)</span>");
                writeLine("  [HARDWARE] 3 active ESP8266 telemetry nodes registered.");
                writeLine("All systems operational. Network integrity stable.", "text-success");
                break;

            case "agriflow":
                writeLine("Connecting to AgriFlow export engine...", "text-cyan");
                setTimeout(() => {
                    writeLine("Executing export protocol: grapes_batch_2026_09...");
                    writeLine("  [CHECK 1] Sugar percentage: 17.5% - <span class='text-success'>PASSED (Target > 16%)</span>");
                    body.scrollTop = body.scrollHeight;
                }, 300);
                setTimeout(() => {
                    writeLine("  [CHECK 2] Chemical residue test - <span class='text-success'>PASSED (0.0ppb detected)</span>");
                    writeLine("  [CHECK 3] Cold Storage logging - <span class='text-success'>PASSED (2.4°C baseline)</span>");
                    body.scrollTop = body.scrollHeight;
                }, 600);
                setTimeout(() => {
                    writeLine("Batch complies with APEDA standards. Export certificate generated successfully!", "text-success");
                    writeLine("Validation report: <a href='blog-agriflow.html' class='text-highlight'>Read AgriFlow Story &rarr;</a>");
                    body.scrollTop = body.scrollHeight;
                }, 900);
                break;

            case "ecoirrigate":
                writeLine("Opening telemetry stream from EcoIrrigate node-01...", "text-cyan");
                setTimeout(() => {
                    writeLine("  [node-01] Wi-Fi: <span class='text-success'>CONNECTED (RSSI -68dBm)</span>");
                    body.scrollTop = body.scrollHeight;
                }, 200);
                setTimeout(() => {
                    writeLine("  [node-01] Soil Moisture Level: 42% (<span class='text-cyan'>Soil Condition: Optimal</span>)");
                    writeLine("  [node-01] Battery Voltage: 3.82V - <span class='text-success'>GOOD (Solar Charging Enabled)</span>");
                    body.scrollTop = body.scrollHeight;
                }, 500);
                setTimeout(() => {
                    writeLine("  [node-01] Solenoid Valve: <span class='text-error'>CLOSED (Trigger threshold: &lt; 35%)</span>");
                    writeLine("Telemetry sync complete. Entering deep-sleep for 15 minutes.", "text-success");
                    body.scrollTop = body.scrollHeight;
                }, 850);
                break;

            case "neofetch":
                writeLine("  ____  __  __ ", "text-cyan");
                writeLine(" / __ \\|  \\/  |", "text-cyan");
                writeLine("| |  | | \\  / |", "text-cyan");
                writeLine("| |  | | |\\/| |", "text-cyan");
                writeLine("| |__| | |  | |", "text-cyan");
                writeLine(" \\____/|_|  |_|", "text-cyan");
                writeLine("---------------");
                writeLine("OS: <span class='text-highlight'>Om OS v1.0.0</span>");
                writeLine("Host: <span class='text-highlight'>omrajput.me</span>");
                writeLine("Shell: <span class='text-highlight'>agritech-bash</span>");
                writeLine("Terminal: <span class='text-highlight'>Web Console Sim</span>");
                writeLine("Focus: <span class='text-highlight'>Backend Systems & AgriTech Hardware</span>");
                writeLine("GitHub: <a href='https://github.com/omrajput14' target='_blank' class='text-highlight'>github.com/omrajput14</a>");
                break;

            default:
                writeLine(`Command not found: '${base}'. Type <span class='text-highlight'>help</span> for a list of commands.`, "text-error");
                break;
        }
    }
}
