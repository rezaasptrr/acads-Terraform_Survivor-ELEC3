import Component from './Component.js';

class TerraformConfig extends Component {
    constructor(containerId) {
        super(containerId);
        this.state = {
            config: null,
            expanded: true
        };
    }

    setConfig(config) {
        this.setState({ config });
    }

    toggleExpanded() {
        this.setState({ expanded: !this.state.expanded });

        // Toggle collapsed class on game layout
        const gameLayout = document.querySelector('.game-layout');
        const sidebarRight = document.querySelector('.sidebar-right');

        if (gameLayout) {
            gameLayout.classList.toggle('config-collapsed');
        }
        if (sidebarRight) {
            sidebarRight.classList.toggle('collapsed');
        }
    }

    formatValue(value) {
        if (typeof value === 'boolean') {
            return value ? '✅ Enabled' : '❌ Disabled';
        }
        if (typeof value === 'number') {
            return value.toFixed(2);
        }
        return value;
    }

    getEnvironmentClass(env) {
        const classes = {
            development: 'env-dev',
            staging: 'env-staging',
            production: 'env-prod'
        };
        return classes[env] || 'env-default';
    }

    render() {
        if (!this.container || !this.state.config) return;

        const config = this.state.config;
        const envClass = this.getEnvironmentClass(config.environment);

        const configItems = [
            { label: 'Environment', value: config.environment, icon: '🌍' },
            { label: 'Difficulty', value: config.difficulty, icon: '⚙️' },
            { label: 'Hunger Decay', value: `${config.gameSettings.hungerDecayRate}x`, icon: '🍖' },
            { label: 'Thirst Decay', value: `${config.gameSettings.thirstDecayRate}x`, icon: '💧' },
            { label: 'Energy Decay', value: `${config.gameSettings.energyDecayRate}x`, icon: '⚡' },
            { label: 'Resource Multiplier', value: `${config.gameSettings.resourceMultiplier}x`, icon: '📈' },
            { label: 'Danger Level', value: `${(config.gameSettings.dangerLevel * 100).toFixed(0)}%`, icon: '⚠️' },
            { label: 'Crafting', value: config.features.craftingEnabled, icon: '🔨' },
            { label: 'Weather Events', value: config.features.weatherEvents, icon: '🌦️' },
            { label: 'Random Events', value: config.features.randomEvents, icon: '🎲' }
        ];

        const configHTML = configItems.map(item => `
            <div class="config-item">
                <span class="config-icon">${item.icon}</span>
                <span class="config-label">${item.label}:</span>
                <span class="config-value">${this.formatValue(item.value)}</span>
            </div>
        `).join('');

        this.container.innerHTML = `
            <div class="terraform-config-wrapper ${envClass}">
                <div class="config-header" data-toggle>
                    <h3 class="panel-title">
                        <span class="terraform-icon">🔧</span>
                        Terraform Configuration
                    </h3>
                    <button class="toggle-button">${this.state.expanded ? '▼' : '▶'}</button>
                </div>
                <div class="config-content ${this.state.expanded ? 'expanded' : 'collapsed'}">
                    <div class="config-badge ${envClass}">
                        ${config.environment.toUpperCase()}
                    </div>
                    <div class="config-grid">
                        ${configHTML}
                    </div>
                    <div class="config-footer">
                        <div class="config-meta">
                            <span>🚀 Version: ${config.deploymentInfo.version}</span>
                            <span>🔧 Deployed by: ${config.deploymentInfo.deployedBy}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add toggle listener
        const toggleButton = this.container.querySelector('[data-toggle]');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => this.toggleExpanded());
        }
    }
}

export default TerraformConfig;
