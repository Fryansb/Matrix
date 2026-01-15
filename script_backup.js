// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('[data-faq-question]');
    
    questions.forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentNode;
            item.classList.toggle('faq__questions__item--is-open');
        });
    });

    // Header Scroll Behavior
    const heroSection = document.getElementById('hero');
    const header = document.getElementById('header');
    const alturaHero = heroSection.clientHeight;

    window.addEventListener('scroll', function() {
        const posicaoAtual = window.scrollY;
        
        if (posicaoAtual < alturaHero) {
            header.classList.add('header--is-hidden');
        } else {
            header.classList.remove('header--is-hidden');
        }
    });

    // Carousel Navigation
    const carouselTrack = document.querySelector('.personagens__carousel__track');
    const prevButton = document.querySelector('.personagens__carousel__prev');
    const nextButton = document.querySelector('.personagens__carousel__next');
    const cards = document.querySelectorAll('.personagens__card');
    
    // Verifica se os elementos existem
    if (!carouselTrack || !prevButton || !nextButton || cards.length === 0) {
        console.error('Elementos do carrossel não encontrados');
        return;
    }
    
    let currentIndex = 0;
    
    function getCardsVisible() {
        return window.innerWidth <= 768 ? 1 : 3;
    }
    
    function updateCarousel() {
        const cardsVisible = getCardsVisible();
        const maxIndex = Math.max(0, cards.length - cardsVisible);
        
        // Ajusta o currentIndex se necessário
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        
        const cardWidth = cards[0].offsetWidth;
        const gap = 20;
        const offset = -(currentIndex * (cardWidth + gap));
        carouselTrack.style.transform = `translateX(${offset}px)`;
        
        // Disable buttons at edges
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= maxIndex;
        
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextButton.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        prevButton.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
        nextButton.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
    }
    
    prevButton.addEventListener('click', () => {
        const cardsVisible = getCardsVisible();
        const maxIndex = Math.max(0, cards.length - cardsVisible);
        
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextButton.addEventListener('click', () => {
        const cardsVisible = getCardsVisible();
        const maxIndex = Math.max(0, cards.length - cardsVisible);
        
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Update on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            currentIndex = 0;
            updateCarousel();
        }, 250);
    });
    
    // Initial update
    updateCarousel();
