document.addEventListener('DOMContentLoaded', function() {

    /* ==================== Menu Mobile ==================== */
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
        });
    }

    navLinks.forEach(link => link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    }));

    /* ==================== Header Sticky ==================== */
    const header = document.querySelector('.header');
    const stickyHeader = () => {
        if (window.scrollY >= 50) {
            header.classList.add('sticky-header');
        } else {
            header.classList.remove('sticky-header');
        }
    };
    window.addEventListener('scroll', stickyHeader);

    /* ==================== Animations au défilement (Scroll) ==================== */
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
            // Pour faire rejouer l'animation, décommentez la ligne suivante
            // else { entry.target.classList.remove('is-visible'); }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });
    
    /* ==================== Carousel Portfolio ==================== */
    const carouselWrapper = document.querySelector('.carousel__wrapper');
    const prevButton = document.querySelector('.carousel__button--prev');
    const nextButton = document.querySelector('.carousel__button--next');

    // IMPORTANT: Remplacez ces URLs par les liens directs vers vos images sur GitHub
    const portfolioImages = [
        'https://images.unsplash.com/photo-1598128558393-70ff21433be0?q=80&w=2589&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1516116468648-527231f3b455?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1604933235339-3543f70353b3?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1629904853716-f0bc64219b1f?q=80&w=2670&auto=format&fit=crop'
    ];

    if (carouselWrapper) {
        // Générer les slides
        portfolioImages.forEach(imgUrl => {
            const slide = document.createElement('div');
            slide.className = 'carousel__item';
            const img = document.createElement('img');
            img.src = imgUrl;
            img.alt = "[Image d'une miniature YouTube réalisée par MiniaturePro Studio]";
            slide.appendChild(img);
            carouselWrapper.appendChild(slide);
        });

        let currentIndex = 0;
        const slides = document.querySelectorAll('.carousel__item');
        const totalSlides = slides.length;

        const updateCarousel = () => {
            carouselWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        };
        
        // Utilisation du défilement natif pour le tactile
        carouselWrapper.addEventListener('scroll', () => {
            currentIndex = Math.round(carouselWrapper.scrollLeft / carouselWrapper.offsetWidth);
        });

        // Contrôles pour le bureau
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % totalSlides;
                carouselWrapper.scrollTo({
                    left: currentIndex * carouselWrapper.offsetWidth,
                    behavior: 'smooth'
                });
            });
        }
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                 carouselWrapper.scrollTo({
                    left: currentIndex * carouselWrapper.offsetWidth,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    /* ==================== Alerte pour le formulaire de contact ==================== */
    const contactForm = document.querySelector('.contact__form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Empêche l'envoi réel du formulaire
            alert("Merci pour votre message ! Pour que ce formulaire soit fonctionnel, il doit être connecté à un service comme Netlify Forms ou Formspree. Voir README.txt pour plus d'infos.");
            contactForm.reset();
        });
    }
});
