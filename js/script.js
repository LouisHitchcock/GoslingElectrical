// Testimonial carousel.
//
// This runs on DOMContentLoaded and guards on both the library and the
// container. Deferred scripts finish executing before that event fires, so
// the Swiper bundle is guaranteed to be available by this point, and the
// carousel only exists on the homepage, so the other pages skip it. Calling
// Swiper at parse time instead would throw and abort the whole file, taking
// the mobile menu, the form validation and the copyright year with it.
let swiper = null;

document.addEventListener('DOMContentLoaded', () => {
    if (typeof Swiper === 'undefined') return;
    if (!document.querySelector('.swiper-container')) return;

    swiper = new Swiper('.swiper-container', {
        loop: true, // Enable infinite scrolling
        slidesPerView: 1, // Show one slide at a time
        centeredSlides: true, // Always center the current slide
        spaceBetween: 20, // Add spacing between slides
        autoplay: {
            delay: 5000, // Auto-scroll every 5 seconds
            disableOnInteraction: false, // Keep autoplay running after interaction
        },
        pagination: {
            el: '.swiper-pagination', // Enable pagination dots
            clickable: true, // Make the dots clickable
        },
        on: {
            slideChangeTransitionStart: function () {
                // Remove active class and fade out previous slide
                document.querySelectorAll('.swiper-slide').forEach(slide => {
                    slide.classList.remove('activeTestimonial');
                });
            },
            slideChangeTransitionEnd: function () {
                // Add active class to new slide and fade it in
                const active = document.querySelector('.swiper-slide-active');
                if (active) active.classList.add('activeTestimonial');
            },
        },
    });
});


function toggleMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('hidden');
}

document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const name = this.querySelector('#name');
        const email = this.querySelector('#email');
        const message = this.querySelector('#message');
        let valid = true;

        if (name && !name.value.trim()) {
            valid = false;
            name.style.borderColor = '#dc2626';
        } else if (name) {
            name.style.borderColor = '';
        }

        if (email && !email.value.trim()) {
            valid = false;
            email.style.borderColor = '#dc2626';
        } else if (email) {
            email.style.borderColor = '';
        }

        if (message && !message.value.trim()) {
            valid = false;
            message.style.borderColor = '#dc2626';
        } else if (message) {
            message.style.borderColor = '';
        }

        if (!valid) {
            e.preventDefault();
            alert('Please fill in all required fields (Name, Email, Message).');
        }
    });
});

// Keeps the footer copyright year current without needing a yearly edit.
// The markup carries a hardcoded year as a fallback if JS is unavailable.
document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('copyright-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});
