document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
    const sections = document.querySelectorAll('section');
    const navbar = document.querySelector('.navbar');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : 'auto';
        });
    }
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(11, 17, 32, 0.98)';
            navbar.style.height = '70px';
        } else {
            navbar.style.background = 'rgba(11, 17, 32, 0.8)';
            navbar.style.height = '90px';
        }
    });
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px', 
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.modern-text-side > *, .f-card, .service-card, .pure-item, .why-card, .contact-card').forEach(el => {
        el.classList.add('before-animate');
        revealObserver.observe(el);
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('تم استلام طلبك! سنتواصل معك في أقرب وقت لتقديم خدمات جلي وتلميع الرخام.');
            contactForm.reset();
        });
    }
});