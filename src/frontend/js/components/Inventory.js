import Component from './Component.js';

class Inventory extends Component {
    constructor(containerId, onItemClick) {
        super(containerId);
        this.onItemClick = onItemClick;
        this.state = {
            items: {},
            selectedItem: null
        };
    }

    updateItems(items) {
        this.setState({ items });
    }

    getItemIcon(itemName) {
        const icons = {
            wood: '🪵',
            stone: '🪨',
            berries: '🫐',
            meat: '🍖',
            water: '💧',
            campfire: '🔥',
            shelter: '🏠',
            spear: '🗡️',
            bandage: '🩹',
            axe: '🪓',
            pickaxe: '⛏️',
            food: '🍞'
        };
        return icons[itemName.toLowerCase()] || '📦';
    }

    isConsumable(itemName) {
        return ['berries', 'meat'].includes(itemName.toLowerCase());
    }

    selectItem(itemName) {
        this.setState({ selectedItem: itemName });
    }

    render() {
        if (!this.container) return;

        const itemsHTML = Object.entries(this.state.items)
            .filter(([_, amount]) => amount > 0)
            .map(([name, amount]) => {
                const isFood = this.isConsumable(name);
                return `
                <div class="inventory-item ${this.state.selectedItem === name ? 'selected' : ''} ${isFood ? 'consumable' : ''}" 
                     data-item="${name}"
                     title="${isFood ? 'Click to eat' : name}">
                    <div class="item-icon">${this.getItemIcon(name)}</div>
                    <div class="item-name">${name}</div>
                    <div class="item-amount">${amount}</div>
                    ${isFood ? '<div class="item-action">🍴</div>' : ''}
                </div>
            `;
            }).join('');

        this.container.innerHTML = `
            <div class="inventory-content">
                <h3 class="panel-title">Inventory</h3>
                <div class="inventory-grid">
                    ${itemsHTML || '<div class="inventory-empty">No items yet</div>'}
                </div>
            </div>
        `;

        // Add event listeners
        this.container.querySelectorAll('.inventory-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const itemName = e.currentTarget.dataset.item;
                this.selectItem(itemName);

                // Trigger callback if item is consumable
                if (this.isConsumable(itemName) && this.onItemClick) {
                    this.onItemClick(itemName);
                }
            });
        });
    }
}

export default Inventory;
