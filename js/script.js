const swiper = new Swiper('.swiper-container', {
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
            document.querySelector('.swiper-slide-active').classList.add('activeTestimonial');
        },
    },
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
