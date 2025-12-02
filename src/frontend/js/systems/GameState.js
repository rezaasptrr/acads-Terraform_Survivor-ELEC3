/**
 * GameState - Centralized state management
 */
class GameState {
    constructor(config, savedState = null) {
        this.config = config;

        if (savedState) {
            this.player = savedState.player;
            this.inventory = savedState.inventory;
        } else {
            this.player = this.createInitialPlayer();
            this.inventory = { ...config.startingResources };
        }

        this.gameRunning = true;
        this.gamePaused = false;
        this.listeners = [];
    }

    createInitialPlayer() {
        return {
            health: 100,
            hunger: 100,
            thirst: 100,
            energy: 100,
            day: 1
        };
    }

    // State getters
    getPlayer() {
        return { ...this.player };
    }

    getInventory() {
        return { ...this.inventory };
    }

    getConfig() {
        return this.config;
    }

    isRunning() {
        return this.gameRunning;
    }

    isPaused() {
        return this.gamePaused;
    }

    // State setters
    updatePlayer(updates) {
        this.player = { ...this.player, ...updates };
        this.notifyListeners('player', this.player);
    }

    updateInventory(updates) {
        this.inventory = { ...this.inventory, ...updates };
        this.notifyListeners('inventory', this.inventory);
    }

    updateConfig(updates) {
        this.config = { ...this.config, ...updates };
        this.notifyListeners('config', this.config);
    }

    setRunning(running) {
        this.gameRunning = running;
        this.notifyListeners('gameRunning', running);
    }

    setPaused(paused) {
        this.gamePaused = paused;
        this.notifyListeners('gamePaused', paused);
    }

    togglePause() {
        this.gamePaused = !this.gamePaused;
        this.notifyListeners('gamePaused', this.gamePaused);
        return this.gamePaused;
    }

    // Inventory helpers
    addToInventory(item, amount) {
        this.inventory[item] = (this.inventory[item] || 0) + amount;
        this.notifyListeners('inventory', this.inventory);
    }

    removeFromInventory(item, amount) {
        this.inventory[item] = Math.max(0, (this.inventory[item] || 0) - amount);
        this.notifyListeners('inventory', this.inventory);
    }

    hasItem(item, amount = 1) {
        return (this.inventory[item] || 0) >= amount;
    }

    // Player helpers
    modifyStat(stat, amount) {
        this.player[stat] = Math.max(0, Math.min(100, this.player[stat] + amount));
        this.notifyListeners('player', this.player);
    }

    setStat(stat, value) {
        this.player[stat] = Math.max(0, Math.min(100, value));
        this.notifyListeners('player', this.player);
    }

    incrementDay() {
        this.player.day++;
        this.notifyListeners('player', this.player);
    }

    // Observer pattern
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notifyListeners(type, data) {
        this.listeners.forEach(listener => {
            try {
                listener(type, data);
            } catch (error) {
                console.error('Listener error:', error);
            }
        });
    }

    // Serialization
    toJSON() {
        return {
            player: this.player,
            inventory: this.inventory,
            config: this.config
        };
    }

    // Validation
    isValid() {
        return (
            this.player &&
            this.player.health >= 0 &&
            this.player.hunger >= 0 &&
            this.player.thirst >= 0 &&
            this.player.energy >= 0 &&
            this.player.day > 0 &&
            this.inventory &&
            typeof this.inventory === 'object'
        );
    }
}

export default GameState;
