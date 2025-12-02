import Component from './Component.js';

class ActionPanel extends Component {
    constructor(containerId, onAction) {
        super(containerId);
        this.onAction = onAction;
        this.state = {
            actions: [
                { id: 'explore', label: 'Explore', icon: '🔍', cost: 15, description: 'Search for resources', category: 'survival' },
                { id: 'hunt', label: 'Hunt', icon: '🏹', cost: 20, description: 'Hunt for food (risky)', category: 'survival' },
                { id: 'gather', label: 'Gather Water', icon: '💧', cost: 10, description: 'Find water source', category: 'survival' },
                { id: 'eat', label: 'Eat Food', icon: '🍖', cost: 0, description: 'Consume food to restore hunger', category: 'survival' },
                { id: 'rest', label: 'Rest', icon: '😴', cost: 0, description: 'Sleep until next day', category: 'survival' },
                { id: 'craft', label: 'Craft', icon: '🔨', cost: 5, description: 'Build items', category: 'craft' },
                { id: 'status', label: 'Status', icon: '📊', cost: 0, description: 'View detailed stats', category: 'info' },
                { id: 'stats', label: 'Statistics', icon: '📈', cost: 0, description: 'View achievements', category: 'info' },
                { id: 'save', label: 'Save', icon: '💾', cost: 0, description: 'Save your progress', category: 'info' }
            ],
            disabledActions: []
        };
    }

    setDisabledActions(actionIds) {
        this.setState({ disabledActions: actionIds });
    }

    handleClick(actionId) {
        if (this.state.disabledActions.includes(actionId)) return;
        if (this.onAction) {
            this.onAction(actionId);
        }
    }

    render() {
        if (!this.container) return;

        const shortcuts = {
            explore: 'E',
            hunt: 'H',
            gather: 'W',
            eat: 'F',
            rest: 'R',
            craft: 'C',
            status: 'S'
        };

        const actionsHTML = this.state.actions.map(action => {
            const isDisabled = this.state.disabledActions.includes(action.id);
            const hotkey = shortcuts[action.id];
            return `
                <button 
                    class="action-button ${isDisabled ? 'disabled' : ''}" 
                    data-action="${action.id}"
                    ${isDisabled ? 'disabled' : ''}
                    aria-label="${action.label} - ${action.description}${action.cost > 0 ? '. Costs ' + action.cost + ' energy' : ''}"
                    title="${hotkey ? 'Hotkey: ' + hotkey : ''}"
                >
                    <span class="action-icon" aria-hidden="true">${action.icon}</span>
                    <span class="action-label">${action.label}</span>
                    ${action.cost > 0 ? `<span class="action-cost" aria-label="${action.cost} energy">⚡${action.cost}</span>` : ''}
                    <span class="action-description">${action.description}</span>
                    ${hotkey ? `<kbd class="hotkey-badge" aria-hidden="true">${hotkey}</kbd>` : ''}
                </button>
            `;
        }).join('');

        this.container.innerHTML = `
            <div class="action-panel-content">
                <h3 class="panel-title">
                    Actions
                    <button 
                        class="help-button" 
                        data-action="help"
                        aria-label="Show keyboard shortcuts"
                        title="Show keyboard shortcuts (Press ?)"
                    >
                        ⌨️
                    </button>
                </h3>
                <div class="action-grid" role="group" aria-label="Game actions">
                    ${actionsHTML}
                </div>
            </div>
        `;

        // Add event listeners
        this.container.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', (e) => {
                const actionId = e.currentTarget.dataset.action;
                this.handleClick(actionId);
            });
        });
    }
}

export default ActionPanel;
