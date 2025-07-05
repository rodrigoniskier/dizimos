document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA AS CAIXAS DE PERGUNTAS (ACCORDION) ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');

            // Fecha todos os outros itens para manter apenas um aberto
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Se o item clicado não estava ativo, ele abre.
            // Se já estava ativo, o laço acima já o fechou.
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });


    // --- LÓGICA PARA O SLIDER DE FOTOS ---
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    let currentIndex = 0;
    const slideInterval = 5000; // Troca de foto a cada 5 segundos

    function showSlide(index) {
        // Lógica para o slider ser um loop infinito
        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }

        // Esconde todos os slides e mostra apenas o atual
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === currentIndex) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    // Só inicia o slider se houver imagens
    if (slides.length > 0) {
        // Eventos dos botões
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval(); // Reinicia o timer ao clicar
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval(); // Reinicia o timer ao clicar
        });

        // Autoplay
        let autoPlay = setInterval(nextSlide, slideInterval);

        function resetInterval() {
            clearInterval(autoPlay);
            autoPlay = setInterval(nextSlide, slideInterval);
        }

        // Inicia mostrando o primeiro slide
        showSlide(currentIndex);
    }

});
