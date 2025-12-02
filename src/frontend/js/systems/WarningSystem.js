/**
 * WarningSystem - Handles stat warnings and alerts
 */
class WarningSystem {
    constructor() {
        this.lastWarnings = {
            hunger: false,
            thirst: false,
            energy: false,
            health: false
        };
        this.thresholds = {
            hunger: { warning: 30, critical: 10 },
            thirst: { warning: 30, critical: 10 },
            energy: { warning: 20, critical: 5 },
            health: { warning: 30, critical: 15 }
        };
    }

    checkWarnings(player) {
        const warnings = [];

        // Check each stat
        Object.keys(this.thresholds).forEach(stat => {
            const value = player[stat];
            const threshold = this.thresholds[stat];

            // Critical warning
            if (value <= threshold.critical && value > 0) {
                if (!this.lastWarnings[stat] || this.lastWarnings[stat] !== 'critical') {
                    warnings.push(this.getCriticalWarning(stat, value));
                    this.lastWarnings[stat] = 'critical';
                }
            }
            // Regular warning
            else if (value <= threshold.warning && value > threshold.critical) {
                if (!this.lastWarnings[stat] || this.lastWarnings[stat] !== 'warning') {
                    warnings.push(this.getWarning(stat, value));
                    this.lastWarnings[stat] = 'warning';
                }
            }
            // Reset warning
            else if (value > threshold.warning) {
                this.lastWarnings[stat] = false;
            }
        });

        return warnings;
    }

    getWarning(stat, value) {
        const warnings = {
            hunger: {
                message: '⚠️ You\'re getting hungry! Find food soon.',
                type: 'danger',
                action: 'eat'
            },
            thirst: {
                message: '⚠️ You\'re getting thirsty! Gather water soon.',
                type: 'danger',
                action: 'drink'
            },
            energy: {
                message: '⚠️ You\'re exhausted! Rest soon.',
                type: 'danger',
                action: 'rest'
            },
            health: {
                message: '⚠️ Your health is low! Be careful!',
                type: 'danger',
                action: 'heal'
            }
        };

        return warnings[stat] || null;
    }

    getCriticalWarning(stat, value) {
        const warnings = {
            hunger: {
                message: '🚨 CRITICAL! You\'re starving! Eat NOW!',
                type: 'danger',
                action: 'eat',
                critical: true
            },
            thirst: {
                message: '🚨 CRITICAL! Severe dehydration! Drink NOW!',
                type: 'danger',
                action: 'drink',
                critical: true
            },
            energy: {
                message: '🚨 CRITICAL! Completely exhausted! Rest NOW!',
                type: 'danger',
                action: 'rest',
                critical: true
            },
            health: {
                message: '🚨 CRITICAL! Near death! Heal immediately!',
                type: 'danger',
                action: 'heal',
                critical: true
            }
        };

        return warnings[stat] || null;
    }

    checkCriticalDamage(player) {
        const messages = [];

        if (player.hunger <= 0) {
            messages.push({
                message: '💀 You are starving! Health decreasing!',
                type: 'danger',
                damage: 1
            });
        }

        if (player.thirst <= 0) {
            messages.push({
                message: '💀 You are dehydrated! Health decreasing!',
                type: 'danger',
                damage: 1
            });
        }

        return messages;
    }

    reset() {
        this.lastWarnings = {
            hunger: false,
            thirst: false,
            energy: false,
            health: false
        };
    }
}

export default WarningSystem;
