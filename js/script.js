const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

// Toggle the hamburger menu and mobile menu visibility
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    if (mobileMenu.classList.contains('menu-visible')) {
        mobileMenu.classList.remove('menu-visible');
        mobileMenu.classList.add('menu-hidden');
    } else {
        mobileMenu.classList.remove('menu-hidden');
        mobileMenu.classList.add('menu-visible');
    }
});



new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
        delay: 3000,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

const swiper = new Swiper('.swiper-container', {
    loop: true, // Enables infinite looping
    autoplay: {
        delay: 3000, // Time between slides in milliseconds
        disableOnInteraction: false, // Continue autoplay after manual interaction
    },
    navigation: {
        nextEl: '.swiper-button-next', // Next arrow
        prevEl: '.swiper-button-prev', // Previous arrow
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});


document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper('.swiper-container', {
        loop: true, // Enable looping
        autoplay: {
            delay: 3000, // Automatically transition every 3 seconds
            disableOnInteraction: false, // Keep autoplay after user interaction
        },
        pagination: {
            el: '.swiper-pagination', // Add pagination container
            clickable: true, // Allow users to click on the dots to navigate
        },
    });
});
