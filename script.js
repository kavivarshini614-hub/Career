document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       THEME TOGGLER (DARK / LIGHT)
       ========================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });

    /* ==========================================
       SCROLL REVEAL & STATS FILL ANIMATION
       ========================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const progressFills = document.querySelectorAll('.progress-fill');
    const graphBars = document.querySelectorAll('.bar');
    const sections = document.querySelectorAll('.section, .hero-section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Trigger animations for elements in viewport
    const handleScrollReveal = () => {
        const triggerPoint = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerPoint) {
                el.classList.add('active');
            }
        });
    };

    // Trigger filling animations for skill bars
    const animateSkills = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate programming skills progress bars
                progressFills.forEach(fill => {
                    const targetWidth = fill.getAttribute('data-target-width');
                    fill.style.width = targetWidth;
                });

                // Animate soft skills vertical bar graph
                graphBars.forEach(bar => {
                    const targetHeight = bar.getAttribute('data-target-height');
                    bar.style.height = targetHeight;
                });
                
                // Stop observing once animation triggers
                observer.unobserve(entry.target);
            }
        });
    };

    // Skills observer
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver(animateSkills, {
            threshold: 0.15
        });
        skillsObserver.observe(skillsSection);
    }

    // Active link highlighter on scroll
    const highlightNav = () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;
            const sectionId = current.getAttribute('id') || '';

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (sectionId && link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    } else if (!sectionId && link.getAttribute('href') === '#personal-info') {
                        // Highlight first item for hero / profile card
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    // Scroll listeners
    window.addEventListener('scroll', () => {
        handleScrollReveal();
        highlightNav();
    });

    // Initial check on load
    handleScrollReveal();
    highlightNav();

    /* ==========================================
       HERO NETWORK DECORATIVE EFFECTS
       ========================================== */
    const heroVisual = document.querySelector('.hero-visual');
    const nodes = document.querySelectorAll('.node:not(.node-center)');
    
    if (heroVisual) {
        heroVisual.addEventListener('mousemove', (e) => {
            const rect = heroVisual.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            nodes.forEach(node => {
                const speed = 0.05;
                node.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
        
        heroVisual.addEventListener('mouseleave', () => {
            nodes.forEach(node => {
                node.style.transform = `translate(0, 0)`;
            });
        });
    }
});
