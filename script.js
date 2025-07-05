document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA O FAQ INTERATIVO ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggleButton = item.querySelector('.toggle-more');
        const fullText = item.querySelector('.full-text');

        // Evento para expandir/recolher a resposta (resumo)
        question.addEventListener('click', () => {
            // Fecha outros itens abertos para um efeito 'accordion'
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    // Garante que o texto completo de outros itens seja fechado também
                    const otherFullText = otherItem.querySelector('.full-text');
                    const otherButton = otherItem.querySelector('.toggle-more');
                    if (otherFullText) otherFullText.style.display = 'none';
                    if (otherButton) otherButton.textContent = 'Saiba Mais';
                }
            });
            // Alterna o item clicado
            item.classList.toggle('active');
        });

        // Evento para o botão "Saiba Mais"
        if (toggleButton && fullText) {
            toggleButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Impede que o clique no botão feche a resposta
                
                const isHidden = fullText.style.display === 'none' || fullText.style.display === '';
                
                if (isHidden) {
                    fullText.style.display = 'block';
                    toggleButton.textContent = 'Mostrar Menos';
                } else {
                    fullText.style.display = 'none';
                    toggleButton.textContent = 'Saiba Mais';
                }
            });
        }
    });

    // --- LÓGICA PARA O SLIDER DE FOTOS ---
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    let currentIndex = 0;
    const slideInterval = 5000; // 5 segundos

    function showSlide(index) {
        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        }

        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === currentIndex) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentIndex++;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex--;
        showSlide(currentIndex);
    }

    if (slides.length > 0) {
        // Eventos dos botões
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        // Autoplay
        let autoPlay = setInterval(nextSlide, slideInterval);

        function resetInterval() {
            clearInterval(autoPlay);
            autoPlay = setInterval(nextSlide, slideInterval);
        }

        // Inicia o slider
        showSlide(currentIndex);
    }

});
