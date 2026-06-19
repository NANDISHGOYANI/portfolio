/* ==========================================================================
   ZORO9!! Portfolio - Interactive Particle Canvas, GSAP & Mechanics
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Register GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // ----------------------------------------------------------------------
    // 1. Mobile Menu Toggle
    // ----------------------------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
            // Prevent body scroll when menu is open on mobile
            document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : 'auto';
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('open');
                navMenu.classList.remove('open');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Navbar Scrolled Glow State
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ----------------------------------------------------------------------
    // 2. Terminal Preloader Boot Sequence
    // ----------------------------------------------------------------------
    const bootLines = [
        { text: "Initializing blade_runner_integrity_core.sh...", type: "info" },
        { text: "Establishing secure sandbox segment... [SECURE]", type: "success" },
        { text: "System architecture: x86_64 // Voight-Kampff V2.4", type: "info" },
        { text: "Loading neural network configuration parameters...", type: "info" },
        { text: "Running Operator Identity scan...", type: "info" },
        { text: "Database query: Nandish Goyani (ZORO9!!) ... [FOUND]", type: "success" },
        { text: "Clearance assessment: B.Sc IT Specialist ... [AUTHORIZED]", type: "success" },
        { text: "Initiating baseline calibration protocol...", type: "warning" },
        { text: "Question: Have you ever been in an institution? Cells.", type: "warning" },
        { text: "Response: Cells... [INTEGRATED]", type: "success" },
        { text: "Question: Do they keep you in a cell? Cells.", type: "warning" },
        { text: "Response: Cells... [INTEGRATED]", type: "success" },
        { text: "Question: When you're not performing your duties do they keep you in a little box? Cells.", type: "warning" },
        { text: "Response: Cells... [INTEGRATED]", type: "success" },
        { text: "Question: Interlinked.", type: "warning" },
        { text: "Response: Interlinked... [INTEGRATED]", type: "success" },
        { text: "Question: What's it like to hold the hand of someone you love? Interlinked.", type: "warning" },
        { text: "Response: Interlinked... [INTEGRATED]", type: "success" },
        { text: "Decrypted operator consciousness record:", type: "warning" },
        { text: "\"All those moments will be lost in time, like tears in rain.\"", type: "success" },
        { text: "Baseline profile 100% stable. Initializing operator HUD.", type: "success" }
    ];

    const preloaderText = document.getElementById('preloader-text');
    const loaderProgress = document.getElementById('loader-progress');
    const preloader = document.getElementById('preloader');

    let lineIndex = 0;
    let progress = 0;

    function runBootloader() {
        if (lineIndex < bootLines.length) {
            const line = bootLines[lineIndex];
            const p = document.createElement('p');
            p.className = `term-${line.type}`;
            p.innerHTML = `<span class="term-prompt">&gt;</span> ${line.text}`;
            preloaderText.appendChild(p);
            
            // Scroll to bottom
            preloaderText.scrollTop = preloaderText.scrollHeight;

            // Increment progress bar relative to line count
            progress = Math.min(100, Math.floor(((lineIndex + 1) / bootLines.length) * 100));
            loaderProgress.style.width = `${progress}%`;

            lineIndex++;
            
            // Random delay to make it feel like genuine console streams
            const nextDelay = line.type === 'warning' ? 250 : Math.random() * 80 + 40;
            setTimeout(runBootloader, nextDelay);
        } else {
            // Bootloader complete. Trigger Slash Reveal!
            setTimeout(triggerSwordSlashReveal, 400);
        }
    }

    function triggerSwordSlashReveal() {
        // Animate slash lines flying diagonally across
        const slashes = document.querySelectorAll('.slash-line');
        
        // GSAP slashes animation
        if (typeof gsap !== 'undefined') {
            gsap.timeline()
                .to(slashes, {
                    opacity: 1,
                    duration: 0.1,
                    stagger: 0.05
                })
                .to(slashes, {
                    y: '100%',
                    x: '100%',
                    duration: 0.5,
                    ease: "power2.inOut",
                    stagger: 0.08
                })
                .call(() => {
                    // Add slide class to split overlays
                    preloader.classList.add('sliced');
                })
                .to(preloader, {
                    opacity: 0,
                    duration: 0.6,
                    delay: 0.5,
                    ease: "power1.inOut"
                })
                .call(() => {
                    preloader.classList.add('hidden');
                    // Initiate hero animations after reveal
                    triggerHeroReveal();
                });
        } else {
            // Fallback if GSAP is blocked or fails
            preloader.classList.add('sliced');
            setTimeout(() => {
                preloader.style.display = 'none';
                triggerHeroReveal();
            }, 1000);
        }
    }

    // Start boot sequence
    setTimeout(runBootloader, 200);

    // ----------------------------------------------------------------------
    // 3. Hero Reveal & Typing Script
    // ----------------------------------------------------------------------
    const professions = [
        "Ethical Hacker",
        "Penetration Tester",
        "Red Team Operator",
        "Cybersecurity Professional"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpan = document.querySelector('.typing-text');
    const typingDelay = 100;
    const erasingDelay = 50;
    const newWordDelay = 2000; // Pause before backspacing

    function typeEffect() {
        if (!typingSpan) return;

        const currentWord = professions[wordIndex];
        
        if (isDeleting) {
            // Erase characters
            typingSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Type characters
            typingSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentDelay = isDeleting ? erasingDelay : typingDelay;

        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at the end of the word
            currentDelay = newWordDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Move to next word
            wordIndex = (wordIndex + 1) % professions.length;
            currentDelay = 500;
        }

        setTimeout(typeEffect, currentDelay);
    }

    function triggerHeroReveal() {
        // Run Typing loop
        typeEffect();

        if (typeof gsap !== 'undefined') {
            // Animate hero headers, texts, stats
            const tl = gsap.timeline();
            
            tl.fromTo('.hero-badge', 
                { opacity: 0, y: -20 }, 
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
            )
            .fromTo('.title-sub', 
                { opacity: 0, x: -30 }, 
                { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, 
                "-=0.4"
            )
            .fromTo('.title-main', 
                { opacity: 0, scale: 0.95 }, 
                { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)" }, 
                "-=0.4"
            )
            .fromTo('.hero-subtitle', 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.5 }, 
                "-=0.2"
            )
            .fromTo('.hero-desc', 
                { opacity: 0, y: 15 }, 
                { opacity: 1, y: 0, duration: 0.6 }, 
                "-=0.3"
            )
            .fromTo('.hero-ctas .btn', 
                { opacity: 0, y: 15 }, 
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }, 
                "-=0.3"
            )
            .fromTo('.stat-item', 
                { opacity: 0, y: 20 }, 
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, 
                "-=0.4"
            )
            .fromTo('.cinematic-frame', 
                { opacity: 0, y: 30, scale: 0.98 }, 
                { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: "power2.out" }, 
                "-=0.8"
            )
            .fromTo('.scroll-indicator', 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.8 }, 
                "-=0.2"
            );

            // Animate backgrounds slashes inside hero
            gsap.fromTo('.hero-slash', 
                { scaleY: 0 }, 
                { scaleY: 1, duration: 1.8, stagger: 0.25, ease: "power3.out", delay: 0.2 }
            );
        }
    }

    // ----------------------------------------------------------------------
    // 4. Haki Green Spirit Particle Canvas
    // ----------------------------------------------------------------------
    const canvas = document.getElementById('haki-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 120 };

        // Set dimensions
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Particle Blueprint
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                // Soft vertical drift mimicking fire/spirit energy
                this.vx = Math.random() * 0.4 - 0.2;
                this.vy = -(Math.random() * 0.6 + 0.1); 
                this.alpha = Math.random() * 0.5 + 0.1;
                this.hue = Math.random() * 55 + 280; // Violet to Rose/Magenta hues (280-335)
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Wrap-around bounds check
                if (this.y < 0) {
                    this.y = canvas.height;
                    this.x = Math.random() * canvas.width;
                }
                if (this.x < 0 || this.x > canvas.width) {
                    this.vx = -this.vx;
                }

                // Interactive mouse repulsion
                if (mouse.x != null && mouse.y != null) {
                    let dx = this.x - mouse.x;
                    let dy = this.y - mouse.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < mouse.radius) {
                        let force = (mouse.radius - distance) / mouse.radius;
                        let directionX = dx / distance;
                        let directionY = dy / distance;
                        
                        this.x += directionX * force * 2;
                        this.y += directionY * force * 2;
                    }
                }
            }

            draw() {
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${this.alpha})`;
                // Subtle aura
                ctx.shadowBlur = 8;
                ctx.shadowColor = `hsla(${this.hue}, 100%, 50%, 0.8)`;
                ctx.fill();
                ctx.restore();
            }
        }

        function initParticles() {
            particles = [];
            // Calibrate density based on screen dimensions
            const density = Math.min(65, Math.floor((canvas.width * canvas.height) / 22000));
            for (let i = 0; i < density; i++) {
                particles.push(new Particle());
            }
        }

        // Draw connections
        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let dist = Math.sqrt(dx * dx + dy * dy);

                    // Connect particles close to one another
                    if (dist < 130) {
                        let alpha = (130 - dist) / 130 * 0.08;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(190, 90, 142, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }

                // Connect to mouse cursor
                if (mouse.x != null && mouse.y != null) {
                    let dx = particles[i].x - mouse.x;
                    let dy = particles[i].y - mouse.y;
                    let dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < mouse.radius) {
                        let alpha = (mouse.radius - dist) / mouse.radius * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(190, 90, 142, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawLines();
            
            requestAnimationFrame(animateCanvas);
        }

        // Run
        resizeCanvas();
        animateCanvas();
    }

    // ----------------------------------------------------------------------
    // 5. Premium Scroll-Driven Animation Engine (Apple-Style)
    // ----------------------------------------------------------------------
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {

        // --- A. Scroll Progress Bar ---
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress-bar';
        progressBar.innerHTML = '<div class="scroll-progress-fill"></div>';
        document.body.appendChild(progressBar);
        const progressFill = progressBar.querySelector('.scroll-progress-fill');

        if (!prefersReducedMotion) {
            gsap.to(progressFill, {
                scaleX: 1,
                transformOrigin: 'left center',
                ease: 'none',
                scrollTrigger: {
                    trigger: document.body,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.3
                }
            });
            // Initialize at 0
            gsap.set(progressFill, { scaleX: 0, transformOrigin: 'left center' });
        }

        // --- I. Cinematic Section Dividers ---
        const sections = document.querySelectorAll('main > section');
        sections.forEach((section, i) => {
            if (i < sections.length - 1) {
                const divider = document.createElement('div');
                divider.className = 'section-divider';
                section.after(divider);

                ScrollTrigger.create({
                    trigger: divider,
                    start: 'top 85%',
                    end: 'top 15%',
                    onEnter: () => divider.classList.add('in-view'),
                    onLeave: () => divider.classList.remove('in-view'),
                    onEnterBack: () => divider.classList.add('in-view'),
                    onLeaveBack: () => divider.classList.remove('in-view')
                });
            }
        });

        // --- Reduced Motion Fallback ---
        if (prefersReducedMotion || isMobile) {
            // Simple fade-in for all animated elements
            const fadeTargets = [
                '#about .terminal-card', '#about .about-content',
                '#skills .skill-card', '#projects .project-card',
                '.timeline-card', '.timeline-dot',
                '#certs .cert-card',
                '.comms-header-cinematic', '.holographic-core-float',
                '.hologram-pedestal', '.left-wing .luxury-card',
                '.right-wing .luxury-card', '.hologram-quote'
            ];

            fadeTargets.forEach(selector => {
                gsap.fromTo(selector,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: selector.split(' ')[0] || selector,
                            start: 'top 80%'
                        }
                    }
                );
            });

            // Still animate progress bars
            const skillBars = document.querySelectorAll('.progress-bar-fill');
            skillBars.forEach(bar => {
                const targetWidth = bar.getAttribute('data-progress');
                gsap.fromTo(bar,
                    { width: '0%' },
                    {
                        width: targetWidth,
                        duration: 1.5,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: '#skills',
                            start: 'top 65%'
                        }
                    }
                );
            });

        } else {
            // === FULL PREMIUM SCROLL-DRIVEN ANIMATIONS ===

            // --- B. Hero Section — Pinned Departure ---
            const heroContent = document.querySelector('.hero-content');
            const heroGraphic = document.querySelector('.hero-graphic');
            const heroSection = document.getElementById('hero');

            if (heroSection) {
                const heroTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: heroSection,
                        start: 'top top',
                        end: '+=60%',
                        pin: true,
                        scrub: 0.5,
                        pinSpacing: true
                    }
                });

                if (heroContent) {
                    heroTl.to(heroContent, {
                        y: -80,
                        opacity: 0,
                        scale: 0.88,
                        filter: 'blur(6px)',
                        ease: 'power1.in'
                    }, 0);
                }

                if (heroGraphic) {
                    heroTl.to(heroGraphic, {
                        y: -40,
                        opacity: 0,
                        scale: 0.92,
                        filter: 'blur(4px)',
                        ease: 'power1.in'
                    }, 0.05);
                }

                // Parallax layers at different speeds
                const heroTitle = document.querySelector('.hero-title');
                const heroStats = document.querySelector('.hero-stats');
                if (heroTitle) {
                    heroTl.to(heroTitle, { y: -120, ease: 'none' }, 0);
                }
                if (heroStats) {
                    heroTl.to(heroStats, { y: -30, ease: 'none' }, 0);
                }
            }

            // --- C. About Section — Staggered Parallax Reveal ---
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                gsap.fromTo('#about .section-header',
                    { opacity: 0, x: -60 },
                    {
                        opacity: 1, x: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: aboutSection,
                            start: 'top 75%',
                            end: 'top 35%',
                            scrub: 1
                        }
                    }
                );

                gsap.fromTo('#about .terminal-card',
                    { opacity: 0, x: -80, rotateY: -5 },
                    {
                        opacity: 1, x: 0, rotateY: 0,
                        duration: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: aboutSection,
                            start: 'top 70%',
                            end: 'top 30%',
                            scrub: 1
                        }
                    }
                );

                gsap.fromTo('#about .about-content',
                    { opacity: 0, x: 60, y: 40 },
                    {
                        opacity: 1, x: 0, y: 0,
                        duration: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: aboutSection,
                            start: 'top 65%',
                            end: 'top 25%',
                            scrub: 1
                        }
                    }
                );
            }

            // --- D. Skills Section — Scrubbed Card Fan with 3D Tilt ---
            const skillsSection = document.getElementById('skills');
            if (skillsSection) {
                gsap.fromTo('#skills .section-header',
                    { opacity: 0, scale: 0.85 },
                    {
                        opacity: 1, scale: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: skillsSection,
                            start: 'top 80%',
                            end: 'top 50%',
                            scrub: 1
                        }
                    }
                );

                const skillCards = document.querySelectorAll('#skills .skill-card');
                skillCards.forEach((card, i) => {
                    gsap.fromTo(card,
                        {
                            opacity: 0,
                            y: 60,
                            rotateX: 15,
                            transformPerspective: 800
                        },
                        {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            duration: 1,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 88%',
                                end: 'top 55%',
                                scrub: 0.8
                            }
                        }
                    );
                });

                // Progress bars scrubbed to scroll
                const skillBars = document.querySelectorAll('.progress-bar-fill');
                skillBars.forEach(bar => {
                    const targetWidth = bar.getAttribute('data-progress');
                    gsap.fromTo(bar,
                        { width: '0%' },
                        {
                            width: targetWidth,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: bar,
                                start: 'top 90%',
                                end: 'top 60%',
                                scrub: 1
                            }
                        }
                    );
                });
            }

            // --- E. Projects Section — Pinned Card Stack ---
            const projectsSection = document.getElementById('projects');
            const projectCards = document.querySelectorAll('#projects .project-card');

            if (projectsSection && projectCards.length > 0) {
                // Section header reveal
                gsap.fromTo('#projects .section-header',
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: projectsSection,
                            start: 'top 80%',
                            end: 'top 50%',
                            scrub: 1
                        }
                    }
                );

                // Each project card staggers in with depth
                projectCards.forEach((card, i) => {
                    gsap.fromTo(card,
                        {
                            opacity: 0,
                            y: 80,
                            scale: 0.92,
                            rotateX: 8,
                            transformPerspective: 1000
                        },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            rotateX: 0,
                            duration: 1,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 90%',
                                end: 'top 50%',
                                scrub: 0.8
                            }
                        }
                    );
                });
            }

            // --- F. Timeline Section — Drawing Line ---
            const timelineSection = document.getElementById('timeline');
            const timelineLine = document.querySelector('.timeline-line');

            if (timelineSection && timelineLine) {
                gsap.fromTo('#timeline .section-header',
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1, y: 0,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: timelineSection,
                            start: 'top 80%',
                            end: 'top 55%',
                            scrub: 1
                        }
                    }
                );

                // Draw the timeline line as user scrolls
                gsap.fromTo(timelineLine,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: '.timeline-wrapper',
                            start: 'top 70%',
                            end: 'bottom 50%',
                            scrub: 0.5
                        }
                    }
                );

                // Timeline items stagger reveal
                const timelineItems = document.querySelectorAll('.timeline-item');
                timelineItems.forEach((item, i) => {
                    const card = item.querySelector('.timeline-card');
                    const dot = item.querySelector('.timeline-dot');
                    const isEven = i % 2 === 1;

                    if (card) {
                        gsap.fromTo(card,
                            { opacity: 0, x: isEven ? 60 : -60, y: 20 },
                            {
                                opacity: 1, x: 0, y: 0,
                                duration: 1,
                                ease: 'power2.out',
                                scrollTrigger: {
                                    trigger: item,
                                    start: 'top 82%',
                                    end: 'top 50%',
                                    scrub: 0.8
                                }
                            }
                        );
                    }

                    if (dot) {
                        gsap.fromTo(dot,
                            { scale: 0, opacity: 0 },
                            {
                                scale: 1, opacity: 1,
                                ease: 'back.out(2)',
                                scrollTrigger: {
                                    trigger: item,
                                    start: 'top 78%',
                                    end: 'top 60%',
                                    scrub: 0.5
                                }
                            }
                        );
                    }
                });
            }

            // --- G. Certifications — Fanned Stack Reveal ---
            const certsSection = document.getElementById('certs');
            if (certsSection) {
                gsap.fromTo('#certs .section-header',
                    { opacity: 0, scale: 0.9 },
                    {
                        opacity: 1, scale: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: certsSection,
                            start: 'top 80%',
                            end: 'top 55%',
                            scrub: 1
                        }
                    }
                );

                const certCards = document.querySelectorAll('#certs .cert-card');
                certCards.forEach((card, i) => {
                    gsap.fromTo(card,
                        {
                            opacity: 0,
                            y: 50 + (i * 20),
                            scale: 0.9,
                            rotate: -2 + (i * 1.5)
                        },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            rotate: 0,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 90%',
                                end: 'top 55%',
                                scrub: 0.8
                            }
                        }
                    );
                });
            }

            // --- H. Contact Section — Cinematic Entry ---
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                // Title text character reveal
                const titleEl = document.querySelector('.comms-title-large');
                if (titleEl) {
                    const originalText = titleEl.textContent;
                    titleEl.innerHTML = '';
                    originalText.split('').forEach(char => {
                        const span = document.createElement('span');
                        span.className = 'char-reveal';
                        span.textContent = char === ' ' ? '\u00A0' : char;
                        titleEl.appendChild(span);
                    });

                    gsap.to('.char-reveal', {
                        opacity: 1,
                        y: 0,
                        stagger: 0.02,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: contactSection,
                            start: 'top 80%',
                            end: 'top 50%',
                            scrub: 1
                        }
                    });
                }

                // Subtitle fade
                gsap.fromTo('.comms-subtitle-cinematic',
                    { opacity: 0, y: 15 },
                    {
                        opacity: 0.8, y: 0,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: contactSection,
                            start: 'top 72%',
                            end: 'top 45%',
                            scrub: 1
                        }
                    }
                );

                // Hologram core scale-in
                gsap.fromTo('.holographic-core-float',
                    { scale: 0.3, opacity: 0 },
                    {
                        scale: 1, opacity: 1,
                        ease: 'back.out(1.2)',
                        scrollTrigger: {
                            trigger: contactSection,
                            start: 'top 70%',
                            end: 'top 30%',
                            scrub: 1
                        }
                    }
                );

                // Pedestal
                gsap.fromTo('.hologram-pedestal',
                    { scaleX: 0, opacity: 0 },
                    {
                        scaleX: 1, opacity: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: contactSection,
                            start: 'top 65%',
                            end: 'top 35%',
                            scrub: 1
                        }
                    }
                );

                // Left wing cards
                gsap.fromTo('.left-wing .luxury-card',
                    { opacity: 0, x: -60 },
                    {
                        opacity: 1, x: 0,
                        stagger: 0.15,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: contactSection,
                            start: 'top 65%',
                            end: 'top 25%',
                            scrub: 1
                        }
                    }
                );

                // Right wing cards
                gsap.fromTo('.right-wing .luxury-card',
                    { opacity: 0, x: 60 },
                    {
                        opacity: 1, x: 0,
                        stagger: 0.15,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: contactSection,
                            start: 'top 65%',
                            end: 'top 25%',
                            scrub: 1
                        }
                    }
                );

                // Quote reveal
                gsap.fromTo('.hologram-quote',
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1, y: 0,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: contactSection,
                            start: 'top 50%',
                            end: 'top 20%',
                            scrub: 1
                        }
                    }
                );
            }
        }
    }

    // ----------------------------------------------------------------------
    // 6. Navigation Active Links Intersection Observer
    // ----------------------------------------------------------------------
    const sections = document.querySelectorAll('section');
    const navMenuLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger near center screen
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navMenuLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // ----------------------------------------------------------------------
    // 7. Cinematic Holographic Core Engine (Particle System)
    // ----------------------------------------------------------------------
    const holoCanvas = document.getElementById('holo-particle-canvas');
    if (holoCanvas) {
        const hCtx = holoCanvas.getContext('2d');
        let holoParticles = [];

        function resizeHoloCanvas() {
            const rect = holoCanvas.getBoundingClientRect();
            // Matching internal dimensions to pixel coordinates
            holoCanvas.width = rect.width;
            holoCanvas.height = rect.height;
            initHoloParticles();
        }

        window.addEventListener('resize', resizeHoloCanvas);

        class HoloParticle {
            constructor() {
                this.reset();
                // Randomize initial positions across height so it starts pre-filled
                this.y = Math.random() * holoCanvas.height;
            }

            reset() {
                // Emit from pedestal base (center bottom region)
                this.x = holoCanvas.width / 2 + (Math.random() * 80 - 40);
                this.y = holoCanvas.height - 60;
                this.size = Math.random() * 2.2 + 0.6;
                // Upward velocity
                this.vy = -(Math.random() * 1.0 + 0.4);
                // Orbit/horizontal drift
                this.angle = Math.random() * Math.PI * 2;
                this.speed = Math.random() * 0.6 + 0.2;
                this.radius = Math.random() * 60 + 20;
                this.alpha = 0;
                this.fadeSpeed = Math.random() * 0.02 + 0.01;
                this.maxAlpha = Math.random() * 0.75 + 0.25;
                
                // Color choices: Cyan (#00f0ff) or Orange (#ff6e00)
                this.isCyan = Math.random() > 0.45;
                this.colorStr = this.isCyan ? 'rgba(0, 240, 255,' : 'rgba(255, 110, 0,';
                this.glowStr = this.isCyan ? '#00f0ff' : '#ff6e00';
            }

            update() {
                this.y += this.vy;
                
                // Spiral/orbit movement as they rise
                this.angle += 0.018;
                this.x = (holoCanvas.width / 2) + Math.cos(this.angle) * this.radius;
                
                // Expand radius slightly as it goes up (vortex effect)
                this.radius += 0.25;

                // Handle fade in and fade out
                if (this.y > holoCanvas.height * 0.8) {
                    if (this.alpha < this.maxAlpha) this.alpha += this.fadeSpeed;
                } else if (this.y < holoCanvas.height * 0.25) {
                    this.alpha -= this.fadeSpeed * 1.5;
                }

                // Recycle particle if it goes out of bounds or fades out
                if (this.y < 0 || (this.alpha <= 0 && this.y < holoCanvas.height * 0.5)) {
                    this.reset();
                }
            }

            draw() {
                if (this.alpha <= 0) return;
                hCtx.save();
                hCtx.beginPath();
                hCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                hCtx.fillStyle = `${this.colorStr}${this.alpha})`;
                hCtx.shadowBlur = this.size * 5;
                hCtx.shadowColor = this.glowStr;
                hCtx.fill();
                hCtx.restore();
            }
        }

        function initHoloParticles() {
            holoParticles = [];
            const count = 80;
            for (let i = 0; i < count; i++) {
                holoParticles.push(new HoloParticle());
            }
        }

        function animateHoloParticles() {
            hCtx.clearRect(0, 0, holoCanvas.width, holoCanvas.height);
            holoParticles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateHoloParticles);
        }

        resizeHoloCanvas();
        animateHoloParticles();
    }

    // Mouse Tilt Parallax for the Holographic Centerpiece & luxury cards hover coordinate tracker
    const contactSect = document.getElementById('contact');
    const coreFloat = document.querySelector('.holographic-core-float');
    if (contactSect && coreFloat) {
        contactSect.addEventListener('mousemove', (e) => {
            const rect = contactSect.getBoundingClientRect();
            // Normalized values -0.5 to 0.5
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            // Tilt the 3D rotating core slightly
            gsap.to(coreFloat, {
                rotateY: x * 35,
                rotateX: -y * 35,
                x: x * 25,
                y: y * 25,
                duration: 0.8,
                ease: "power2.out",
                overwrite: "auto"
            });
        });

        contactSect.addEventListener('mouseleave', () => {
            // Restore default floating base
            gsap.to(coreFloat, {
                rotateY: 0,
                rotateX: 0,
                x: 0,
                y: 0,
                duration: 1.2,
                ease: "power2.out",
                overwrite: "auto"
            });
        });
    }

    // Card Glow Coordinates Tracker
    const luxuryCards = document.querySelectorAll('.luxury-card');
    luxuryCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // ----------------------------------------------------------------------
    // 8. Cinematic Blade Runner Photo Engine (Hero Section)
    // ----------------------------------------------------------------------
    const dustCanvas = document.getElementById('dust-canvas');
    if (dustCanvas) {
        const dustCtx = dustCanvas.getContext('2d');
        let dustParticles = [];

        function resizeDustCanvas() {
            const rect = dustCanvas.getBoundingClientRect();
            // Matching internal dimensions to pixel coordinates
            dustCanvas.width = rect.width;
            dustCanvas.height = rect.height;
            initDust();
        }

        window.addEventListener('resize', resizeDustCanvas);

        class DustParticle {
            constructor() {
                this.x = Math.random() * dustCanvas.width;
                this.y = Math.random() * dustCanvas.height;
                this.size = Math.random() * 1.6 + 0.4;
                this.vx = Math.random() * 0.2 - 0.1;
                this.vy = -(Math.random() * 0.35 + 0.15); // Drifting upwards
                this.alpha = Math.random() * 0.5 + 0.1;
                
                // Blade Runner glow color themes (Cyan/Orange)
                this.color = Math.random() > 0.5 ? 'rgba(0, 240, 255,' : 'rgba(255, 110, 0,';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Re-spawn bottom when drifts out
                if (this.y < 0) {
                    this.y = dustCanvas.height;
                    this.x = Math.random() * dustCanvas.width;
                }
                if (this.x < 0 || this.x > dustCanvas.width) {
                    this.vx = -this.vx;
                }
            }

            draw() {
                dustCtx.save();
                dustCtx.beginPath();
                dustCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                dustCtx.fillStyle = `${this.color}${this.alpha})`;
                dustCtx.shadowBlur = this.size * 3;
                dustCtx.shadowColor = this.color === 'rgba(0, 240, 255,' ? '#00f0ff' : '#ff6e00';
                dustCtx.fill();
                dustCtx.restore();
            }
        }

        function initDust() {
            dustParticles = [];
            for (let i = 0; i < 30; i++) {
                dustParticles.push(new DustParticle());
            }
        }

        function animateDust() {
            dustCtx.clearRect(0, 0, dustCanvas.width, dustCanvas.height);
            dustParticles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateDust);
        }

        resizeDustCanvas();
        animateDust();
    }

    // Parallax logic for Blade Runner atmosphere
    const heroSection = document.getElementById('hero');
    const portrait = document.querySelector('.cinematic-portrait');
    const cyanOverlay = document.querySelector('.cyan-overlay');
    const orangeOverlay = document.querySelector('.orange-overlay');
    const rays = document.querySelector('.volumetric-rays');

    if (heroSection && portrait) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            // Normalized values between -0.5 and 0.5
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            // Move portrait in the direction of the cursor (subtle 3D slide)
            const px = x * 15;
            const py = y * 15;
            portrait.style.transform = `translate(${px}px, ${py}px) scale(1.02)`;

            // Move color lights slightly in the opposite direction for parallax
            if (cyanOverlay && orangeOverlay && rays) {
                const ox = -x * 22;
                const oy = -y * 22;
                cyanOverlay.style.transform = `translate(${ox}px, ${oy}px)`;
                orangeOverlay.style.transform = `translate(${ox * 0.8}px, ${oy * 0.8}px)`;
                rays.style.transform = `translate(${ox * 1.1}px, ${oy * 1.1}px) rotate(${x * 3}deg)`;
            }
        });

        heroSection.addEventListener('mouseleave', () => {
            // Smoothly ease back to starting point
            portrait.style.transform = 'translate(0px, 0px) scale(1)';
            if (cyanOverlay && orangeOverlay && rays) {
                cyanOverlay.style.transform = 'translate(0px, 0px)';
                orangeOverlay.style.transform = 'translate(0px, 0px)';
                rays.style.transform = 'translate(0px, 0px) rotate(0deg)';
            }
        });
    }
});
