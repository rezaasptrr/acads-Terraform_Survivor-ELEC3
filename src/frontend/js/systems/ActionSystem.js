/**
 * ActionSystem - Handles player actions (explore, hunt, gather, rest)
 */
class ActionSystem {
    constructor(config) {
        this.config = config;
    }

    explore(player, inventory) {
        if (player.energy < 15) {
            return {
                success: false,
                message: 'Not enough energy! Rest to recover.',
                type: 'danger'
            };
        }

        player.energy = Math.max(0, player.energy - 15);
        const multiplier = this.config.gameSettings.resourceMultiplier;

        const finds = [
            { item: 'wood', amount: Math.floor((Math.random() * 3 + 2) * multiplier), emoji: '🪵' },
            { item: 'stone', amount: Math.floor((Math.random() * 2 + 1) * multiplier), emoji: '🪨' },
            { item: 'berries', amount: Math.floor((Math.random() * 4 + 1) * multiplier), emoji: '🫐' }
        ];

        const found = finds[Math.floor(Math.random() * finds.length)];
        inventory[found.item] = (inventory[found.item] || 0) + found.amount;

        const result = {
            success: true,
            player,
            inventory,
            message: `🔍 Explored and found ${found.emoji} ${found.amount} ${found.item}!`,
            type: 'success',
            resource: { item: found.item, amount: found.amount }
        };

        // Random danger
        if (this.config.features.randomEvents && Math.random() < this.config.gameSettings.dangerLevel) {
            player.health = Math.max(0, player.health - 10);
            result.dangerMessage = 'You encountered danger and lost 10 health!';
        }

        return result;
    }

    hunt(player, inventory) {
        if (player.energy < 20) {
            return {
                success: false,
                message: 'Not enough energy! Rest to recover.',
                type: 'danger'
            };
        }

        player.energy = Math.max(0, player.energy - 20);
        const success = Math.random() > this.config.gameSettings.dangerLevel;

        if (success) {
            const meat = Math.floor((Math.random() * 3 + 2) * this.config.gameSettings.resourceMultiplier);
            inventory.meat = (inventory.meat || 0) + meat;

            return {
                success: true,
                player,
                inventory,
                message: `🏹 Successful hunt! You got 🍖 ${meat} meat!`,
                type: 'success',
                resource: { item: 'meat', amount: meat }
            };
        } else {
            player.health = Math.max(0, player.health - 15);

            return {
                success: false,
                player,
                message: '💔 Hunt failed! You were injured and lost 15 health.',
                type: 'danger'
            };
        }
    }

    gatherWater(player) {
        if (player.energy < 10) {
            return {
                success: false,
                message: 'Not enough energy! Rest to recover.',
                type: 'danger'
            };
        }

        player.energy = Math.max(0, player.energy - 10);
        const water = Math.floor(Math.random() * 30 + 20);
        player.thirst = Math.min(100, player.thirst + water);

        return {
            success: true,
            player,
            message: `💧 Gathered water and restored ${water} thirst!`,
            type: 'success',
            restored: water
        };
    }

    rest(player) {
        const energyGain = 40;
        player.energy = Math.min(100, player.energy + energyGain);
        player.hunger = Math.max(0, player.hunger - 5);
        player.thirst = Math.max(0, player.thirst - 5);
        player.day++;

        return {
            success: true,
            player,
            message: `😴 Rested and restored ${energyGain} energy. ☀️ Day ${player.day} begins!`,
            type: 'info',
            energyGain
        };
    }

    eatFood(player, inventory, foodType) {
        const foodValues = {
            berries: { hunger: 15, emoji: '🫐' },
            meat: { hunger: 30, emoji: '🍖' }
        };

        const food = foodValues[foodType];
        if (!food) {
            return {
                success: false,
                message: `Unknown food type: ${foodType}`,
                type: 'danger'
            };
        }

        if ((inventory[foodType] || 0) <= 0) {
            return {
                success: false,
                message: `You don't have any ${foodType}!`,
                type: 'danger'
            };
        }

        inventory[foodType]--;
        player.hunger = Math.min(100, player.hunger + food.hunger);

        return {
            success: true,
            player,
            inventory,
            message: `${food.emoji} Ate ${foodType} and restored ${food.hunger} hunger!`,
            type: 'success',
            restored: food.hunger
        };
    }
}

export default ActionSystem;
