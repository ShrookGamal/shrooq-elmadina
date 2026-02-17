/**
 * شروق المدينة - ملف التحكم الرئيسي
 * برمجة وتطوير: GMTWeb
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. تعريف العناصر الأساسية ---
    const menuToggle = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
    const sections = document.querySelectorAll('section');
    const navbar = document.querySelector('.navbar');

    // --- 2. التحكم في منيو الموبايل ---
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            // منع السكرول لما المنيو تفتح
            document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : 'auto';
        });
    }

    // إغلاق المنيو عند الضغط على أي لينك
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // --- 3. تأثير الهيدر عند النزول (تغيير الشفافية والحجم) ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(11, 17, 32, 0.98)';
            navbar.style.height = '70px';
        } else {
            navbar.style.background = 'rgba(11, 17, 32, 0.8)';
            navbar.style.height = '90px';
        }
    });

    // --- 4. نظام الـ Scroll Spy (تنشيط اللينك حسب السكشن الظاهر) ---
    // بنستخدم Intersection Observer عشان نراقب كل سكشن دخل الشاشة بنسبة كام
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px', // بيحدد المنطقة اللي بنعتبر فيها السكشن "نشط" في نص الشاشة
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // مسح كلاس active من كل اللينكات الأول
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    // لو اللينك مربوط بالسكشن الحالي، ضيف كلاس active
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    // تفعيل المراقبة على كل السكاشن
    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    // --- 5. انميشن ظهور العناصر عند السكرول (Reveal Animation) ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.15 });

    // تفعيل الانميشن على كل العناصر اللي محتاجة ظهور تدريجي
    document.querySelectorAll('.modern-text-side > *, .f-card, .service-card, .pure-item, .why-card, .contact-card').forEach(el => {
        el.classList.add('before-animate');
        revealObserver.observe(el);
    });

    // --- 6. فورم التواصل ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('تم استلام طلبك! سنتواصل معك في أقرب وقت لتقديم خدمات جلي وتلميع الرخام.');
            contactForm.reset();
        });
    }
});