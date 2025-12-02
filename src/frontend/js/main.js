import Game from './Game.js';

// Wait for DOM and config to be ready
window.addEventListener('DOMContentLoaded', () => {
    if (!window.GAME_CONFIG) {
        console.error('Game configuration not loaded!');
        return;
    }

    // Initialize game
    window.game = new Game(window.GAME_CONFIG);

    console.log('🎮 Terraform Survivor initialized!');
    console.log('Environment:', window.GAME_CONFIG.environment);
    console.log('Difficulty:', window.GAME_CONFIG.difficulty);
});
