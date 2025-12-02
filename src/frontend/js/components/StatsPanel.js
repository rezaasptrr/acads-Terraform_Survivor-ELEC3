import Component from './Component.js';

class StatsPanel extends Component {
    constructor(containerId, onStatClick) {
        super(containerId);
        this.onStatClick = onStatClick;
        this.state = {
            health: 100,
            hunger: 100,
            thirst: 100,
            energy: 100,
            day: 1
        };
        this.inventory = {};
    }

    updateStats(stats) {
        // Track stat changes for visual feedback
        const oldStats = { ...this.state };
        this.setState(stats);

        // Add visual feedback for stat changes
        this.highlightStatChanges(oldStats, stats);
    }

    highlightStatChanges(oldStats, newStats) {
        // This will be called after render, so we need to wait a tick
        setTimeout(() => {
            ['health', 'hunger', 'thirst', 'energy'].forEach(stat => {
                if (oldStats[stat] !== undefined && oldStats[stat] !== newStats[stat]) {
                    const statElement = this.container?.querySelector(`.stat-item[data-stat="${stat}"] .stat-value`);
                    if (statElement) {
                        const className = newStats[stat] > oldStats[stat] ? 'increasing' : 'decreasing';
                        statElement.classList.add(className);
                        setTimeout(() => statElement.classList.remove(className), 300);
                    }
                }
            });
        }, 10);
    }

    setInventory(inventory) {
        this.inventory = inventory;
    }

    getSolution(statType, value) {
        const solutions = {
            hunger: {
                action: 'eat',
                items: ['berries', 'meat'],
                message: 'Click to eat food',
                noItemMessage: 'Explore or Hunt for food'
            },
            thirst: {
                action: 'drink',
                items: [],
                message: 'Click to gather water',
                noItemMessage: 'Press W to gather water'
            },
            energy: {
                action: 'rest',
                items: [],
                message: 'Click to rest',
                noItemMessage: 'Press R to rest'
            }
        };

        return solutions[statType];
    }

    hasRequiredItems(items) {
        return items.some(item => (this.inventory[item] || 0) > 0);
    }

    createStatBar(label, emoji, value, maxValue, barClass, statType) {
        const percentage = Math.max(0, Math.min(100, (value / maxValue) * 100));
        const isLow = value < 50;
        const solution = this.getSolution(statType, value);

        let tooltipContent = '';
        let clickable = false;

        if (isLow && solution) {
            const hasItems = solution.items.length === 0 || this.hasRequiredItems(solution.items);
            clickable = true;

            if (hasItems) {
                tooltipContent = `
                    <div class="stat-tooltip available">
                        <div class="tooltip-icon">✅</div>
                        <div class="tooltip-text">${solution.message}</div>
                    </div>
                `;
            } else {
                tooltipContent = `
                    <div class="stat-tooltip unavailable">
                        <div class="tooltip-icon">⚠️</div>
                        <div class="tooltip-text">${solution.noItemMessage}</div>
                    </div>
                `;
            }
        }

        return `
            <div class="stat-item ${isLow ? 'stat-low' : ''} ${clickable ? 'stat-clickable' : ''}" 
                 data-stat="${statType}"
                 data-action="${solution ? solution.action : ''}">
                <div class="stat-header">
                    <span class="stat-label">${emoji} ${label}</span>
                    <span class="stat-value">${Math.floor(value)}/${maxValue}</span>
                </div>
                <div class="stat-bar">
                    <div class="stat-bar-fill ${barClass}" style="width: ${percentage}%"></div>
                </div>
                ${tooltipContent}
            </div>
        `;
    }

    render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="stats-panel-content">
                <h3 class="panel-title">Player Stats</h3>
                <div class="stats-list" role="region" aria-label="Player statistics">
                    ${this.createStatBar('Health', '❤️', this.state.health, 100, 'health-bar', 'health')}
                    ${this.createStatBar('Hunger', '🍖', this.state.hunger, 100, 'hunger-bar', 'hunger')}
                    ${this.createStatBar('Thirst', '💧', this.state.thirst, 100, 'thirst-bar', 'thirst')}
                    ${this.createStatBar('Energy', '⚡', this.state.energy, 100, 'energy-bar', 'energy')}
                </div>
                <div class="day-counter" role="status" aria-live="polite">
                    <span class="day-label">Day</span>
                    <span class="day-number" aria-label="Day ${this.state.day}">${this.state.day}</span>
                </div>
            </div>
        `;

        // Add click handlers
        this.container.querySelectorAll('.stat-clickable').forEach(statItem => {
            statItem.addEventListener('click', () => {
                const action = statItem.dataset.action;
                const stat = statItem.dataset.stat;
                if (this.onStatClick && action) {
                    this.onStatClick(action, stat);
                }
            });
        });
    }
}

export default StatsPanel;
