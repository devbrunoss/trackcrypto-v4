document.addEventListener('DOMContentLoaded', function() {
    // ===== ANIMAÇÕES DE ENTRADA =====
    // Adicionar classes de animação para as seções
    document.querySelectorAll('.resources, .advantages-stats, .testimonials, .final-cta').forEach(section => {
        section.classList.add('section-animate');
    });
    
    // Verificar a posição do scroll para animar elementos
    function checkScroll() {
        const elements = document.querySelectorAll('.section-animate');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('section-visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Verificar inicialmente
    
    // ===== ANIMAÇÕES DE CONTAGEM PARA ESTATÍSTICAS =====
    const statNumbers = document.querySelectorAll('.stat-number');
    const options = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-count'));
                
                if (!isNaN(target)) {
                    animateValue(statNumber, 0, target, 2000);
                }
                
                observer.unobserve(statNumber);
            }
        });
    }, options);
    
    statNumbers.forEach(statNumber => {
        if (statNumber.getAttribute('data-count')) {
            observer.observe(statNumber);
        }
    });
    
    // Função para animar os valores
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + (element.getAttribute('data-count') === '100' ? '%' : '');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // ===== ROTAÇÃO DE DEPOIMENTOS =====
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    // Adiciona event listeners para os dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showTestimonial(index);
        });
    });
    
    // Rotação automática dos depoimentos
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);
});