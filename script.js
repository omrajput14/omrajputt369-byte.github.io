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
    initLightbox();
    initSoundEffects();
    initSpiderTrailCanvas();
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
                playSynthSound("glitch");
                keyBuffer = "";
            }
        }
    });

    restabilizeBtn.addEventListener("click", () => {
        document.body.classList.remove("glitch-active");
        playSynthSound("click");
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

// =============================================
// 16. INFOGRAPHIC LIGHTBOX MODAL
// =============================================

function initLightbox() {
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const triggers = document.querySelectorAll('.project-img-wrapper');

    if (!lightbox || !lightboxImg || !closeBtn || triggers.length === 0) return;

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const img = trigger.querySelector('img');
            const card = trigger.closest('.project-card');
            const h3 = card ? card.querySelector('h3') : null;

            if (img) {
                lightboxImg.src = img.src;
                if (lightboxCaption && h3) {
                    lightboxCaption.textContent = h3.textContent;
                }
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent main page scrolling
            }
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
            closeLightbox();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// =============================================
// 17. SYNTHESIZED SOUND EFFECTS ENGINE
// =============================================
let audioCtx = null;
let soundMuted = true; // Muted by default

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function playSynthSound(type) {
    if (soundMuted) return;
    try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        const now = ctx.currentTime;
        
        if (type === 'click') {
            // Retro 8-bit blip click
            osc.type = 'square';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
            gainNode.gain.setValueAtTime(0.1, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
        } else if (type === 'hover') {
            // Soft woodblock tick
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(300, now);
            gainNode.gain.setValueAtTime(0.05, now);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.start(now);
            osc.stop(now + 0.05);
        } else if (type === 'slide') {
            // Smooth swoosh/jump slide sound
            osc.type = 'sine';
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(600, now + 0.25);
            gainNode.gain.setValueAtTime(0.08, now);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
            osc.start(now);
            osc.stop(now + 0.25);
        } else if (type === 'glitch') {
            // Multiverse glitch anomaly static noise/laser
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(80, now);
            osc.frequency.linearRampToValueAtTime(1500, now + 0.5);
            
            // Gain wobbling for glitchy feel
            gainNode.gain.setValueAtTime(0.15, now);
            gainNode.gain.setValueAtTime(0.02, now + 0.1);
            gainNode.gain.setValueAtTime(0.12, now + 0.2);
            gainNode.gain.setValueAtTime(0.01, now + 0.3);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
            
            osc.start(now);
            osc.stop(now + 0.5);
        }
    } catch (e) {
        console.warn("Failed to play synthesized audio:", e);
    }
}

function initSoundEffects() {
    const soundBtn = document.getElementById('sound-toggle');
    if (!soundBtn) return;
    
    // Load preference from localStorage if set
    const savedSound = localStorage.getItem('soundEnabled');
    if (savedSound === 'true') {
        soundMuted = false;
        soundBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    } else {
        soundMuted = true;
        soundBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    }
    
    soundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        soundMuted = !soundMuted;
        localStorage.setItem('soundEnabled', !soundMuted);
        
        if (soundMuted) {
            soundBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        } else {
            soundBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            playSynthSound('click');
        }
    });
    
    // Bind click SFX to buttons, nav items, and interactive elements
    const clickables = document.querySelectorAll('button, a, .filter-btn, .project-card, .blog-card, #about-avatar-card');
    clickables.forEach(item => {
        item.addEventListener('click', (e) => {
            // Avoid double triggers if parents are also clickable
            e.stopPropagation();
            // Don't play default click if it's the soundBtn itself (already handled)
            if (item.id === 'sound-toggle') return;
            
            if (item.classList.contains('carousel-nav-btn')) {
                playSynthSound('slide');
            } else {
                playSynthSound('click');
            }
        });
        
        // Bind hover tick sound to navigation items, buttons, and filters
        if (!window.matchMedia("(pointer: coarse)").matches) {
            item.addEventListener('mouseenter', () => {
                if (item.id === 'sound-toggle') return;
                playSynthSound('hover');
            });
        }
    });
}

// =============================================
// 18. SPIDER-VERSE CANVAS CURSOR OVERLAY
// =============================================
function initSpiderTrailCanvas() {
    const canvas = document.getElementById('spider-trail-canvas');
    if (!canvas) return;

    if (window.matchMedia("(pointer: coarse)").matches) {
        canvas.style.display = 'none';
        return;
    }

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }, { passive: true });

    let mouse = { x: -100, y: -100 };
    let target = null; // Currently hovered interactive element

    // Track mouse coordinates
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }, { passive: true });

    // Track hovered elements
    const hoverables = document.querySelectorAll('a, button, .project-card, .blog-card');
    hoverables.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            target = elem;
        });
        elem.addEventListener('mouseleave', () => {
            target = null;
        });
    });

    function drawWebLine(startX, startY, endX, endY) {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        // Draw slightly organic dynamic curve for the web strand
        const midX = (startX + endX) / 2 + (Math.random() - 0.5) * 10;
        const midY = (startY + endY) / 2 + (Math.random() - 0.5) * 10;
        ctx.quadraticCurveTo(midX, midY, endX, endY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.lineWidth = 1.8;
        ctx.stroke();
        
        // Draw small nodes on the line representing spider web glue droplets
        for (let i = 1; i < 4; i++) {
            const t = i * 0.25;
            // Quadratic Bezier interpolation formula: B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
            const lx = Math.pow(1-t, 2)*startX + 2*(1-t)*t*midX + Math.pow(t, 2)*endX;
            const ly = Math.pow(1-t, 2)*startY + 2*(1-t)*t*midY + Math.pow(t, 2)*endY;
            ctx.beginPath();
            ctx.arc(lx, ly, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw web hook snapping line if targeting an element
        if (target) {
            const rect = target.getBoundingClientRect();
            const targetX = rect.left + rect.width / 2;
            const targetY = rect.top + rect.height / 2;
            drawWebLine(mouse.x, mouse.y, targetX, targetY);
        }

        requestAnimationFrame(animate);
    }
    animate();
}
