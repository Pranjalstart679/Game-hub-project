document.addEventListener('DOMContentLoaded', () => {
    const gameLinks = document.querySelectorAll('.game-link');
    
    gameLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const gameType = link.id.replace('-link', '');
            console.log(`Navigating to ${gameType.charAt(0).toUpperCase() + gameType.slice(1)}`);
            
            // Optional: Add subtle animation on click
            link.querySelector('.game-card').style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.querySelector('.game-card').style.transform = 'scale(1)';
            }, 100);
        });
    });
});