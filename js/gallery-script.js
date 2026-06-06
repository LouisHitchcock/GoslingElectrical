document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const imageData = [];

    fetch('images.json')
        .then(response => response.json())
        .then(images => {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.onload = () => img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '0px 0px 50px 0px',
                threshold: 0.01
            });

            images.forEach((item) => {
                const imageFile = typeof item === 'string' ? item : item.file;
                const caption = typeof item === 'string' ? '' : (item.caption || '');
                const src = `./grid-gallery-images/${imageFile}`;
                imageData.push({ src, caption });

                const img = document.createElement('img');
                img.dataset.src = src;
                img.dataset.index = imageData.length - 1;
                img.alt = caption || 'Hall of Shame image';
                img.classList.add('lazy-load');

                const tempImg = new Image();
                tempImg.src = img.dataset.src;
                const onTempLoad = () => {
                    const imgAspect = tempImg.naturalHeight / tempImg.naturalWidth;
                    if (imgAspect > 1) {
                        img.classList.add('portrait');
                    }
                    gallery.appendChild(img);
                    observer.observe(img);
                };
                if (tempImg.complete) {
                    onTempLoad();
                } else {
                    tempImg.onload = onTempLoad;
                }
            });
        })
        .catch(error => console.error('Error fetching images:', error));

    gallery.addEventListener('click', (e) => {
        const img = e.target.closest('img');
        if (!img || img.dataset.index === undefined) return;
        openLightbox(parseInt(img.dataset.index));
    });

    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.setAttribute('aria-label', 'Image lightbox');
    lightbox.setAttribute('role', 'dialog');
    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
        <button class="lightbox-prev" aria-label="Previous image">&#10094;</button>
        <div class="lightbox-body">
            <img class="lightbox-image" src="" alt="Enlarged gallery image">
            <p class="lightbox-caption"></p>
        </div>
        <button class="lightbox-next" aria-label="Next image">&#10095;</button>
    `;
    document.body.appendChild(lightbox);

    let currentIndex = 0;

    window.openLightbox = function(index) {
        currentIndex = index;
        showLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    function showLightboxImage() {
        const data = imageData[currentIndex];
        if (!data) return;
        lightbox.querySelector('.lightbox-image').src = data.src;
        lightbox.querySelector('.lightbox-caption').textContent = data.caption;
    }

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + imageData.length) % imageData.length;
        showLightboxImage();
    });
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % imageData.length;
        showLightboxImage();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + imageData.length) % imageData.length;
            showLightboxImage();
        }
        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % imageData.length;
            showLightboxImage();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});
