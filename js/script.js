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
