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
