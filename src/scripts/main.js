/**
 * Landing Page Matrix - Main JavaScript
 * Funcionalidades: FAQ Accordion, Header Scroll, Carousel, Modals
 */

// =============================================================================
// UTILITIES
// =============================================================================

/**
 * Debounce function para otimizar eventos que disparam múltiplas vezes
 * @param {Function} func - Função a ser executada
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function}
 */
const debounce = (func, wait = 250) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// =============================================================================
// FAQ ACCORDION MODULE
// =============================================================================

const FAQAccordion = {
  /**
   * Inicializa o módulo FAQ
   */
  init() {
    const questions = document.querySelectorAll('[data-faq-question]');
    
    questions.forEach(question => {
      question.addEventListener('click', this.toggleQuestion.bind(this));
    });
  },

  /**
   * Toggle da questão do FAQ
   * @param {Event} event
   */
  toggleQuestion(event) {
    const questionButton = event.currentTarget;
    const item = questionButton.parentNode;
    const isOpen = item.classList.contains('faq__questions__item--is-open');
    const answer = item.querySelector('.faq__questions__item__answer');
    
    // Toggle class
    item.classList.toggle('faq__questions__item--is-open');
    
    // Update ARIA attributes
    questionButton.setAttribute('aria-expanded', !isOpen);
    answer.setAttribute('aria-hidden', isOpen);
  }
};

// =============================================================================
// HEADER SCROLL MODULE
// =============================================================================

const HeaderScroll = {
  header: null,
  heroSection: null,
  heroHeight: 0,

  /**
   * Inicializa o módulo de scroll do header
   */
  init() {
    this.heroSection = document.getElementById('hero');
    this.header = document.getElementById('header');
    
    if (!this.heroSection || !this.header) return;
    
    this.heroHeight = this.heroSection.clientHeight;
    
    window.addEventListener('scroll', this.handleScroll.bind(this));
  },

  /**
   * Handler do evento de scroll
   */
  handleScroll() {
    const currentPosition = window.scrollY;
    
    if (currentPosition > this.heroHeight) {
      this.header.classList.add('header--is-hidden');
    } else {
      this.header.classList.remove('header--is-hidden');
    }
  }
};

// =============================================================================
// CAROUSEL MODULE
// =============================================================================

const Carousel = {
  track: null,
  prevButton: null,
  nextButton: null,
  cards: [],
  currentIndex: 0,

  /**
   * Inicializa o módulo de carousel
   */
  init() {
    this.track = document.querySelector('.personagens__carousel__track');
    this.prevButton = document.querySelector('.personagens__carousel__prev');
    this.nextButton = document.querySelector('.personagens__carousel__next');
    this.cards = document.querySelectorAll('.personagens__card');
    
    // Verifica se os elementos existem
    if (!this.track || !this.prevButton || !this.nextButton || this.cards.length === 0) {
      return;
    }
    
    // Event listeners
    this.prevButton.addEventListener('click', () => this.navigate('prev'));
    this.nextButton.addEventListener('click', () => this.navigate('next'));
    
    // Resize handler com debounce
    window.addEventListener('resize', debounce(() => {
      this.currentIndex = 0;
      this.update();
    }));
    
    // Initial update
    this.update();
  },

  /**
   * Retorna o número de cards visíveis baseado no tamanho da tela
   * @returns {number}
   */
  getCardsVisible() {
    return window.innerWidth <= 768 ? 1 : 3;
  },

  /**
   * Navega no carousel (com rolagem infinita)
   * @param {string} direction - 'prev' ou 'next'
   */
  navigate(direction) {
    const cardsVisible = this.getCardsVisible();
    const maxIndex = Math.max(0, this.cards.length - cardsVisible);
    
    if (direction === 'prev') {
      this.currentIndex--;
      // Se passou do início, vai pro fim
      if (this.currentIndex < 0) {
        this.currentIndex = maxIndex;
      }
    } else if (direction === 'next') {
      this.currentIndex++;
      // Se passou do fim, volta pro início
      if (this.currentIndex > maxIndex) {
        this.currentIndex = 0;
      }
    }
    
    this.update();
  },

  /**
   * Atualiza o estado do carousel
   */
  update() {
    const cardsVisible = this.getCardsVisible();
    const maxIndex = Math.max(0, this.cards.length - cardsVisible);
    
    // Ajusta o índice se necessário
    if (this.currentIndex > maxIndex) {
      this.currentIndex = maxIndex;
    }
    
    // Calcula o offset
    const cardWidth = this.cards[0].offsetWidth;
    const gap = 20;
    const offset = -(this.currentIndex * (cardWidth + gap));
    
    // Aplica a transformação
    this.track.style.transform = `translateX(${offset}px)`;
    
    // Atualiza os botões
    this.updateButtons(maxIndex);
  },

  /**
   * Atualiza o estado dos botões de navegação
   * @param {number} maxIndex
   */
  updateButtons(maxIndex) {
    // Carousel infinito - botões sempre ativos
    this.prevButton.disabled = false;
    this.nextButton.disabled = false;
    
    this.prevButton.style.opacity = '1';
    this.nextButton.style.opacity = '1';
    
    this.prevButton.style.cursor = isAtStart ? 'not-allowed' : 'pointer';
    this.nextButton.style.cursor = isAtEnd ? 'not-allowed' : 'pointer';
  }
};

// =============================================================================
// MODAL MODULE
// =============================================================================

const Modal = {
  modals: [],
  openClass: 'modal--active',

  /**
   * Inicializa o módulo de modals
   */
  init() {
    this.modals = document.querySelectorAll('.modal');
    const triggers = document.querySelectorAll('[data-modal]');
    const closeButtons = document.querySelectorAll('.modal__close');
    
    // Event listeners para abrir modals
    triggers.forEach(trigger => {
      trigger.addEventListener('click', this.open.bind(this));
    });
    
    // Event listeners para fechar modals
    closeButtons.forEach(button => {
      button.addEventListener('click', this.close.bind(this));
    });
    
    // Fechar ao clicar fora do conteúdo
    this.modals.forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal(modal);
        }
      });
    });
    
    // Fechar com tecla ESC
    document.addEventListener('keydown', this.handleEscape.bind(this));
  },

  /**
   * Abre um modal
   * @param {Event} event
   */
  open(event) {
    event.preventDefault();
    const trigger = event.currentTarget;
    const modalId = trigger.getAttribute('data-modal');
    const modal = document.getElementById(`modal-${modalId}`);
    
    if (modal) {
      this.openModal(modal);
    }
  },

  /**
   * Fecha um modal
   * @param {Event} event
   */
  close(event) {
    const button = event.currentTarget;
    const modal = button.closest('.modal');
    this.closeModal(modal);
  },

  /**
   * Abre um modal específico
   * @param {HTMLElement} modal
   */
  openModal(modal) {
    modal.classList.add(this.openClass);
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus no primeiro elemento focável
    const focusable = modal.querySelector('button, a, input');
    if (focusable) focusable.focus();
  },

  /**
   * Fecha um modal específico
   * @param {HTMLElement} modal
   */
  closeModal(modal) {
    modal.classList.remove(this.openClass);
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  },

  /**
   * Handler para tecla ESC
   * @param {KeyboardEvent} event
   */
  handleEscape(event) {
    if (event.key === 'Escape') {
      this.modals.forEach(modal => {
        if (modal.classList.contains(this.openClass)) {
          this.closeModal(modal);
        }
      });
    }
  }
};

// =============================================================================
// APP INITIALIZATION
// =============================================================================

/**
 * Inicializa todos os módulos quando o DOM estiver pronto
 */
document.addEventListener('DOMContentLoaded', () => {
  FAQAccordion.init();
  HeaderScroll.init();
  Carousel.init();
  Modal.init();
});
