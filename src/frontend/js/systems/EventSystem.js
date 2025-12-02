/**
 * EventSystem - Handles random events and weather
 */
class EventSystem {
    constructor(config) {
        this.config = config;
        this.events = this.initializeEvents();
    }

    initializeEvents() {
        return [
            {
                id: 'rain',
                text: '🌧️ It rained during the night. Your thirst is fully restored!',
                effect: (player, inventory) => {
                    player.thirst = 100;
                    return { player };
                },
                type: 'success',
                weight: 1.5
            },
            {
                id: 'cold_night',
                text: '❄️ Cold night! You lost some health but found extra wood.',
                effect: (player, inventory) => {
                    player.health = Math.max(0, player.health - 10);
                    inventory.wood = (inventory.wood || 0) + 3;
                    return { player, inventory };
                },
                type: 'danger',
                weight: 1.0
            },
            {
                id: 'peaceful',
                text: '🌟 Peaceful night. You feel refreshed and energized!',
                effect: (player, inventory) => {
                    player.health = Math.min(100, player.health + 15);
                    player.energy = Math.min(100, player.energy + 10);
                    return { player };
                },
                type: 'success',
                weight: 1.5
            },
            {
                id: 'deer',
                text: '🦌 A friendly deer visited! You got some meat without hunting.',
                effect: (player, inventory) => {
                    inventory.meat = (inventory.meat || 0) + 2;
                    return { inventory };
                },
                type: 'success',
                weight: 1.0
            },
            {
                id: 'berries',
                text: '🌿 You found a berry bush near your camp!',
                effect: (player, inventory) => {
                    inventory.berries = (inventory.berries || 0) + 5;
                    return { inventory };
                },
                type: 'success',
                weight: 1.2
            },
            {
                id: 'wolves',
                text: '🐺 Wolves howled nearby. You stayed alert all night. -15 energy.',
                effect: (player, inventory) => {
                    player.energy = Math.max(0, player.energy - 15);
                    return { player };
                },
                type: 'danger',
                weight: 0.8
            },
            {
                id: 'sunrise',
                text: '☀️ Beautiful sunrise! You feel motivated. +20 energy!',
                effect: (player, inventory) => {
                    player.energy = Math.min(100, player.energy + 20);
                    return { player };
                },
                type: 'success',
                weight: 1.3
            },
            {
                id: 'stone',
                text: '🪨 You found a stone deposit while sleeping!',
                effect: (player, inventory) => {
                    inventory.stone = (inventory.stone || 0) + 4;
                    return { inventory };
                },
                type: 'success',
                weight: 1.0
            }
        ];
    }

    shouldTriggerEvent() {
        return this.config.features.weatherEvents && Math.random() < 0.4;
    }

    getRandomEvent() {
        // Weighted random selection
        const totalWeight = this.events.reduce((sum, event) => sum + event.weight, 0);
        let random = Math.random() * totalWeight;

        for (const event of this.events) {
            random -= event.weight;
            if (random <= 0) {
                return event;
            }
        }

        return this.events[0];
    }

    triggerEvent(player, inventory) {
        if (!this.shouldTriggerEvent()) {
            return null;
        }

        const event = this.getRandomEvent();
        const result = event.effect(player, inventory);

        return {
            message: event.text,
            type: event.type,
            changes: result
        };
    }
}

export default EventSystem;
