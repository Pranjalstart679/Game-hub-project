document.addEventListener('DOMContentLoaded', () => {
    // Interactive hover effects for game cards
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const illustration = card.querySelector('.game-illustration svg');
            const playButton = card.querySelector('.play-button');
            
            illustration.style.transform = 'scale(1.1)';
            playButton.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            const illustration = card.querySelector('.game-illustration svg');
            const playButton = card.querySelector('.play-button');
            
            illustration.style.transform = 'scale(1)';
            playButton.style.transform = 'scale(1)';
        });
    });

    // Subtle background animation
    function createBackgroundParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.style.position = 'fixed';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.pointerEvents = 'none';
        particlesContainer.style.zIndex = '-1';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '10px';
            particle.style.height = '10px';
            particle.style.background = 'rgba(52, 152, 219, 0.2)';
            particle.style.borderRadius = '50%';
            
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            particle.animate([
                { transform: 'scale(1)', opacity: 0.5 },
                { transform: 'scale(2)', opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                iterations: Infinity,
                delay: Math.random() * 1000,
                easing: 'ease-out'
            });

            particlesContainer.appendChild(particle);
        }
    }

    createBackgroundParticles();
});