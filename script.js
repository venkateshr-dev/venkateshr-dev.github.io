document.addEventListener('DOMContentLoaded', () => {
    
    // --- Preloader & Initialization ---
    const preloader = document.getElementById('preloader');
    const loaderProgress = document.querySelector('.loader-progress');
    const loaderPercentage = document.querySelector('.loader-percentage');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Hide Preloader
            gsap.to(preloader, {
                yPercent: -100,
                duration: 1,
                ease: "power4.inOut",
                delay: 0.2,
                onComplete: () => {
                    document.body.classList.remove('loading');
                    initAnimations();
                }
            });
        }
        loaderProgress.style.width = `${progress}%`;
        loaderPercentage.textContent = `${progress}%`;
    }, 50);

    // --- Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        
        cursorRing.animate({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`
        }, { duration: 150, fill: "forwards" });
    });

    // Hover effects on links and buttons
    const hoverElements = document.querySelectorAll('a, button, .service-card, .project-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.style.width = '60px';
            cursorRing.style.height = '60px';
            cursorRing.style.borderColor = 'var(--accent-blue)';
        });
        el.addEventListener('mouseleave', () => {
            cursorRing.style.width = '40px';
            cursorRing.style.height = '40px';
            cursorRing.style.borderColor = 'var(--accent-gold)';
        });
    });

    // --- Particles.js Configuration ---
    if (window.particlesJS) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 40,
                    "density": { "enable": true, "value_area": 800 }
                },
                "color": { "value": "#d4af37" },
                "shape": { "type": "circle" },
                "opacity": {
                    "value": 0.3,
                    "random": false
                },
                "size": {
                    "value": 2,
                    "random": true
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#d4af37",
                    "opacity": 0.1,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 200, "line_linked": { "opacity": 0.3 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }

    // --- Typed.js Initialization ---
    function initTyped() {
        if (window.Typed) {
            new Typed('.typed-text', {
                strings: [
                    'PHP & Laravel Developer',
                    'Backend Architect',
                    'API Specialist',
                    'Database Designer'
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                cursorChar: '|'
            });
        }
    }

    // --- GSAP Animations ---
    function initAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Sequence
        const tl = gsap.timeline();
        tl.from(".gsap-reveal", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            onComplete: initTyped // Start typing after reveal
        });

        // Scroll Animations for sections
        const fadeUpElements = document.querySelectorAll('.gsap-fade-up');
        fadeUpElements.forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });

        // Timeline line animation
        gsap.from('.timeline::before', {
            scrollTrigger: {
                trigger: '.timeline',
                start: "top 80%",
                end: "bottom 20%",
                scrub: 1
            },
            scaleY: 0,
            transformOrigin: "top center",
            ease: "none"
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', closeMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Removed form submission handling
});
