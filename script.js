document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup');
    const header = document.getElementById('header');
    const mainContent = document.getElementById('main-content');
    const footer = document.getElementById('footer');
    const gift = document.getElementById('gift');
    const audio = document.getElementById('audioParabens');

    // Função para mostrar o popup com animação e desfocar o fundo
    const showPopup = () => {
        popup.classList.add('show');
        popup.style.display = 'flex';
        header.classList.add('blur');
        mainContent.classList.add('blur');
        footer.classList.add('blur');
        gift.style.display = 'none'; // Esconde o presente
        explodeConfetti(); // Gera a explosão de confetes
    };

    // Função para fechar o popup e remover o desfoque
    const hidePopup = () => {
        popup.classList.remove('show');
        popup.classList.add('hide');
        setTimeout(() => {
            popup.style.display = 'none';
            header.classList.remove('blur');
            mainContent.classList.remove('blur');
            footer.classList.remove('blur');
        }, 1000); // Delay de 1 segundo após o áudio terminar para fechar
    };

    // Evento de clique na imagem do presente
    gift.addEventListener('click', () => {
        showPopup(); // Chama a função diretamente para aparecer o popup e gerar os confetes
    });

    // Evento de fim do áudio para esconder o popup
    audio.addEventListener('ended', hidePopup);

    // Função para gerar a explosão de confetes
    const explodeConfetti = () => {
        const confettiCount = 100;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const createConfettiPiece = (x, y, color, size, delay) => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.backgroundColor = color;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.left = `${x}px`;
            confetti.style.top = `${y}px`;
            confetti.style.animationDelay = `${delay}s`;
            confetti.style.zIndex = 99999; // Assegura que os confetes fiquem na frente
            confetti.style.setProperty('--translate-x', `${Math.random() * 2 - 1}`);
            confetti.style.setProperty('--translate-y', `${Math.random() * 2 - 1}`);
            document.body.appendChild(confetti);
            setTimeout(() => {
                confetti.remove();
            }, 5000); // Remove o confete após 5 segundos
        };

        for (let i = 0; i < confettiCount; i++) {
            const angle = Math.random() * 2 * Math.PI; // Ângulo aleatório
            const radius = Math.random() * 200; // Raio aleatório
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            const size = Math.random() * 15 + 5; // Tamanho variado dos confetes
            const color = getRandomColor();
            const delay = Math.random() * 0.5;
            createConfettiPiece(x, y, color, size, delay);
        }
    };

    // Função para obter uma cor aleatória
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // Função para avançar para a próxima seção
    window.nextSection = (nextSectionId) => {
        const currentSection = document.querySelector('.section.active');
        const nextSection = document.getElementById(nextSectionId);

        if (currentSection) {
            currentSection.classList.remove('active');
            currentSection.classList.add('hidden');
        }

        if (nextSection) {
            nextSection.classList.add('active');
            nextSection.classList.remove('hidden');
        }
    };

    // Inicializa a primeira seção
    document.getElementById('section1').classList.add('active');
});
