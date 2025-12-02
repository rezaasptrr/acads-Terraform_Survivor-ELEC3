/**
 * CraftingSystem - Handles crafting recipes and benefits
 */
class CraftingSystem {
    constructor(config) {
        this.config = config;
        this.recipes = this.initializeRecipes();
        this.benefits = this.initializeBenefits();
    }

    initializeRecipes() {
        return [
            {
                id: 'campfire',
                name: 'Campfire',
                requires: { wood: 5, stone: 3 },
                effect: 'Cook food efficiently',
                emoji: '🔥'
            },
            {
                id: 'shelter',
                name: 'Shelter',
                requires: { wood: 10, stone: 5 },
                effect: 'Better rest recovery',
                emoji: '🏠'
            },
            {
                id: 'spear',
                name: 'Spear',
                requires: { wood: 3, stone: 2 },
                effect: 'Better hunting success',
                emoji: '🗡️'
            }
        ];
    }

    initializeBenefits() {
        return {
            campfire: (player, inventory) => {
                player.health = Math.min(100, player.health + 10);
                player.energy = Math.min(100, player.energy + 15);
                return {
                    player,
                    message: '🔥 Campfire warmth restored 10 health and 15 energy!',
                    type: 'success'
                };
            },
            shelter: (player, inventory) => {
                player.energy = Math.min(100, player.energy + 30);
                player.health = Math.min(100, player.health + 15);
                return {
                    player,
                    message: '🏠 Shelter provides safety! +30 energy, +15 health!',
                    type: 'success'
                };
            },
            spear: (player, inventory, resourceMultiplier) => {
                const meat = Math.floor((Math.random() * 5 + 3) * resourceMultiplier);
                inventory.meat = (inventory.meat || 0) + meat;
                return {
                    inventory,
                    message: `🗡️ Used spear to hunt! Got ${meat} meat instantly!`,
                    type: 'success'
                };
            }
        };
    }

    getRecipes() {
        return this.recipes;
    }

    canCraft(recipe, inventory) {
        return Object.entries(recipe.requires).every(([item, amount]) =>
            (inventory[item] || 0) >= amount
        );
    }

    craft(recipeName, inventory) {
        const recipe = this.recipes.find(r => r.name === recipeName);
        if (!recipe) return null;

        if (!this.canCraft(recipe, inventory)) {
            return { success: false, message: 'Not enough resources!' };
        }

        // Deduct resources
        Object.entries(recipe.requires).forEach(([item, amount]) => {
            inventory[item] = (inventory[item] || 0) - amount;
        });

        // Add crafted item
        const itemKey = recipe.name.toLowerCase();
        inventory[itemKey] = (inventory[itemKey] || 0) + 1;

        return {
            success: true,
            inventory,
            itemKey
        };
    }

    applyBenefit(itemName, player, inventory) {
        const benefit = this.benefits[itemName];
        if (!benefit) return null;

        return benefit(player, inventory, this.config.gameSettings.resourceMultiplier);
    }

    isCraftingEnabled() {
        return this.config.features.craftingEnabled;
    }
}

export default CraftingSystem;
