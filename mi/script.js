document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            menuIcon.classList.replace('ph-list', 'ph-x');
        } else {
            menuIcon.classList.replace('ph-x', 'ph-list');
        }
    });

    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                // Prevent default only if clicking the parent link
                if(e.target.tagName === 'A' && e.target.nextElementSibling) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            }
        });
    });

    // 2. Sticky Header
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Scroll Animation (Intersection Observer)
    const fadeUpElements = document.querySelectorAll('.animate-fade-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it's visible
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeUpElements.forEach(el => {
        observer.observe(el);
    });

    // Trigger initial check for elements already in viewport
    setTimeout(() => {
        fadeUpElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);

    // 4. Hero Slider
    let currentSlide = 0;
    const track = document.getElementById('slider-track');
    const dots = document.querySelectorAll('.slider-dot');
    const slides = document.querySelectorAll('.slide');
    
    if (slides.length > 0) {
        const slideCount = slides.length;

        window.goToSlide = function(n) {
            dots[currentSlide].classList.remove('active');
            currentSlide = (n + slideCount) % slideCount;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots[currentSlide].classList.add('active');
        };

        window.nextSlide = function() {
            goToSlide(currentSlide + 1);
        };

        window.prevSlide = function() {
            goToSlide(currentSlide - 1);
        };

        let autoSlide = setInterval(nextSlide, 5000);
        
        // Pause on hover over arrows
        const arrows = document.querySelectorAll('.slider-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('mouseenter', () => clearInterval(autoSlide));
            arrow.addEventListener('mouseleave', () => {
                autoSlide = setInterval(nextSlide, 5000);
            });
        });
    }
});
