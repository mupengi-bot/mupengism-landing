// 무펭이즘 Landing Page - Interactive Scripts

// ========== Intersection Observer for Scroll Animations ==========
document.addEventListener('DOMContentLoaded', () => {
    
    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.fade-in, .fade-in-up');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ========== Counter Animation ==========
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // ========== Smooth Scroll for Anchor Links ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========== Dynamic Gradient on Mouse Move (Hero Section) ==========
    const hero = document.querySelector('.hero-gradient');
    if (hero) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth) * 100;
            const y = (clientY / window.innerHeight) * 100;
            
            hero.style.background = `
                radial-gradient(ellipse at ${x}% ${y}%, rgba(79, 195, 247, 0.2) 0%, transparent 50%),
                radial-gradient(ellipse at ${100-x}% ${100-y}%, rgba(124, 77, 255, 0.15) 0%, transparent 50%)
            `;
        });
    }

    // ========== Parallax Effect for Grid Background ==========
    const gridBackground = document.querySelector('.grid-background');
    if (gridBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            gridBackground.style.transform = `translate(${parallax}px, ${parallax}px)`;
        });
    }

    // ========== Add 'loaded' class to body for CSS transitions ==========
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // ========== Skill Tag Randomized Hover Animation ==========
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.05}s`;
        
        // Random subtle animation
        tag.addEventListener('mouseenter', () => {
            const randomRotate = (Math.random() - 0.5) * 4; // -2 to 2 degrees
            tag.style.transform = `translateY(-2px) scale(1.05) rotate(${randomRotate}deg)`;
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = '';
        });
    });

    // ========== Console Easter Egg ==========
    console.log('%c🐧 무펭이즘', 'font-size: 48px; font-weight: bold; background: linear-gradient(135deg, #4FC3F7, #7C4DFF); -webkit-background-clip: text; color: transparent;');
    console.log('%cSaaS의 종말, AI 노동력의 시대', 'font-size: 18px; color: #4FC3F7;');
    console.log('%chttps://openclaw.ai', 'font-size: 14px; color: #7C4DFF;');
    console.log('%c\n관심 있으신가요? Discord에 참여하세요: https://discord.com/invite/clawd', 'font-size: 12px; color: #94a3b8;');

    // ========== Performance Optimization: Lazy Load Images ==========
    // (Not used in current version, but ready for future image additions)
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window && lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ========== Button Ripple Effect ==========
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-primary-large, .btn-secondary-large');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple styles dynamically
    const rippleStyles = document.createElement('style');
    rippleStyles.textContent = `
        .btn-primary, .btn-secondary, .btn-primary-large, .btn-secondary-large {
            position: relative;
            overflow: hidden;
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyles);

});

// ========== Service Worker Registration (for future PWA support) ==========
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js');
    });
}
