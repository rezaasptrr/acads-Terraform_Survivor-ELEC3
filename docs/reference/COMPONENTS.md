# 🧩 Component Reference Guide

## Component Hierarchy

```
Game (Controller)
├── StatsPanel
│   ├── Health Bar
│   ├── Hunger Bar
│   ├── Thirst Bar
│   ├── Energy Bar
│   └── Day Counter
│
├── StoryLog
│   └── Message List
│       ├── Info Messages
│       ├── Success Messages
│       ├── Danger Messages
│       └── Craft Messages
│
├── ActionPanel
│   └── Action Buttons
│       ├── Explore
│       ├── Hunt
│       ├── Gather Water
│       ├── Rest
│       ├── Craft
│       └── Status
│
├── Inventory
│   └── Item Grid
│       ├── Wood
│       ├── Stone
│       ├── Berries
│       ├── Meat
│       └── Crafted Items
│
├── TerraformConfig
│   ├── Environment Badge
│   ├── Config Items
│   └── Deployment Info
│
└── Modal
    ├── Crafting Menu
    ├── Status Screen
    └── Game Over Screen
```

## Component API Reference

### Base Component

**File**: `js/components/Component.js`

```javascript
class Component {
    constructor(containerId: string)
    setState(newState: object): void
    render(): void
    mount(): void
    unmount(): void
    createElement(tag, className, content): HTMLElement
}
```

**Usage**:

```javascript
import Component from "./Component.js";

class MyComponent extends Component {
  constructor(containerId) {
    super(containerId);
    this.state = { value: 0 };
  }

  render() {
    this.container.innerHTML = `<div>${this.state.value}</div>`;
  }
}
```

---

### StatsPanel

**File**: `js/components/StatsPanel.js`

**Purpose**: Display player vital statistics with animated bars

**State**:

```javascript
{
    health: number,   // 0-100
    hunger: number,   // 0-100
    thirst: number,   // 0-100
    energy: number,   // 0-100
    day: number       // Current day
}
```

**Methods**:

```javascript
updateStats(stats: object): void
createStatBar(label, emoji, value, maxValue, barClass): string
```

**Example**:

```javascript
const statsPanel = new StatsPanel("statsPanel");
statsPanel.mount();
statsPanel.updateStats({
  health: 75,
  hunger: 50,
  thirst: 80,
  energy: 60,
  day: 3,
});
```

**CSS Classes**:

- `.stats-panel-content` - Container
- `.stat-item` - Individual stat
- `.stat-bar` - Progress bar container
- `.stat-bar-fill` - Animated fill
- `.health-bar`, `.hunger-bar`, `.thirst-bar`, `.energy-bar` - Colored bars

---

### StoryLog

**File**: `js/components/StoryLog.js`

**Purpose**: Display scrolling log of game events

**State**:

```javascript
{
    messages: Array<{text, type, timestamp}>,
    maxMessages: number  // Default: 10
}
```

**Methods**:

```javascript
addMessage(text: string, type: string): void
clear(): void
scrollToBottom(): void
getMessageIcon(type: string): string
```

**Message Types**:

- `info` - General information (blue)
- `success` - Positive events (green)
- `danger` - Negative events (red)
- `event` - Random events (purple)
- `craft` - Crafting messages (purple)
- `combat` - Combat messages (orange)

**Example**:

```javascript
const storyLog = new StoryLog("storyLog");
storyLog.mount();
storyLog.addMessage("You found 5 wood!", "success");
storyLog.addMessage("You were attacked!", "danger");
```

**CSS Classes**:

- `.story-log-wrapper` - Container
- `.story-log-content` - Scrollable area
- `.story-message` - Individual message
- `.message-icon` - Emoji icon
- `.message-text` - Message content

---

### ActionPanel

**File**: `js/components/ActionPanel.js`

**Purpose**: Interactive buttons for player actions

**State**:

```javascript
{
    actions: Array<{id, label, icon, cost, description}>,
    disabledActions: Array<string>
}
```

**Constructor**:

```javascript
new ActionPanel(containerId: string, onAction: function)
```

**Methods**:

```javascript
setDisabledActions(actionIds: Array<string>): void
handleClick(actionId: string): void
```

**Default Actions**:

```javascript
[
  { id: "explore", label: "Explore", icon: "🔍", cost: 15 },
  { id: "hunt", label: "Hunt", icon: "🏹", cost: 20 },
  { id: "gather", label: "Gather Water", icon: "💧", cost: 10 },
  { id: "rest", label: "Rest", icon: "😴", cost: 0 },
  { id: "craft", label: "Craft", icon: "🔨", cost: 5 },
  { id: "status", label: "Status", icon: "📊", cost: 0 },
];
```

**Example**:

```javascript
const actionPanel = new ActionPanel("actionPanel", (actionId) => {
  console.log("Action clicked:", actionId);
});
actionPanel.mount();
actionPanel.setDisabledActions(["hunt", "craft"]);
```

**CSS Classes**:

- `.action-panel-content` - Container
- `.action-grid` - Button grid
- `.action-button` - Individual button
- `.action-icon` - Emoji icon
- `.action-label` - Button text
- `.action-cost` - Energy cost
- `.action-description` - Help text

---

### Inventory

**File**: `js/components/Inventory.js`

**Purpose**: Display and manage player items

**State**:

```javascript
{
    items: Object<string, number>,  // item name -> quantity
    selectedItem: string | null
}
```

**Methods**:

```javascript
updateItems(items: object): void
getItemIcon(itemName: string): string
selectItem(itemName: string): void
```

**Item Icons**:

```javascript
{
    wood: '🪵',
    stone: '🪨',
    berries: '🫐',
    meat: '🍖',
    water: '💧',
    campfire: '🔥',
    shelter: '🏠',
    spear: '🗡️'
}
```

**Example**:

```javascript
const inventory = new Inventory("inventoryPanel");
inventory.mount();
inventory.updateItems({ wood: 10, stone: 5, meat: 3 });
```

**CSS Classes**:

- `.inventory-content` - Container
- `.inventory-grid` - Item grid
- `.inventory-item` - Individual item
- `.item-icon` - Emoji icon
- `.item-name` - Item name
- `.item-amount` - Quantity

---

### TerraformConfig

**File**: `js/components/TerraformConfig.js`

**Purpose**: Display live Terraform configuration

**State**:

```javascript
{
    config: object,    // Full game config
    expanded: boolean  // Panel state
}
```

**Methods**:

```javascript
setConfig(config: object): void
toggleExpanded(): void
formatValue(value: any): string
getEnvironmentClass(env: string): string
```

**Environment Classes**:

- `env-dev` - Development (green)
- `env-staging` - Staging (orange)
- `env-prod` - Production (red)

**Example**:

```javascript
const terraformConfig = new TerraformConfig("terraformConfig");
terraformConfig.mount();
terraformConfig.setConfig(window.GAME_CONFIG);
```

**CSS Classes**:

- `.terraform-config-wrapper` - Container
- `.config-header` - Clickable header
- `.config-content` - Collapsible content
- `.config-badge` - Environment badge
- `.config-grid` - Config items
- `.config-item` - Individual setting

---

### Modal

**File**: `js/components/Modal.js`

**Purpose**: Reusable modal dialog system

**State**:

```javascript
{
    isOpen: boolean,
    title: string,
    content: string,  // HTML content
    type: string      // 'info', 'danger', 'craft'
}
```

**Methods**:

```javascript
open(title: string, content: string, type: string): void
close(): void
```

**Example**:

```javascript
const modal = new Modal("modalContainer");
modal.mount();

// Simple message
modal.open("Success!", "<p>You crafted a campfire!</p>", "info");

// Complex content
const craftingHTML = `
    <div class="recipes-grid">
        <div class="recipe-item">...</div>
    </div>
`;
modal.open("Crafting Menu", craftingHTML, "craft");

// Close programmatically
modal.close();
```

**CSS Classes**:

- `.modal-overlay` - Dark backdrop
- `.modal-content` - Dialog box
- `.modal-header` - Title bar
- `.modal-title` - Title text
- `.modal-close` - Close button
- `.modal-body` - Content area

---

## Game Controller

**File**: `js/Game.js`

**Purpose**: Main game logic and component orchestration

**Constructor**:

```javascript
new Game(config: object)
```

**Key Properties**:

```javascript
{
    config: object,        // Terraform configuration
    player: object,        // Player stats
    inventory: object,     // Player items
    gameRunning: boolean,  // Game state

    // Component instances
    statsPanel: StatsPanel,
    storyLog: StoryLog,
    actionPanel: ActionPanel,
    inventory: Inventory,
    terraformConfig: TerraformConfig,
    modal: Modal
}
```

**Key Methods**:

```javascript
initComponents(): void
startGameLoop(): void
handleAction(actionId: string): void
updateAllComponents(): void

// Game actions
explore(): void
hunt(): void
gatherWater(): void
rest(): void
showCraftingMenu(): void
craftItem(name, requires): void
showStatus(): void

// Utilities
hasEnergy(amount: number): boolean
addToInventory(item: string, amount: number): void
checkGameOver(): void
```

**Example**:

```javascript
import Game from "./Game.js";

const game = new Game(window.GAME_CONFIG);
// Game automatically initializes and starts

// Access from console
window.game.explore();
window.game.player.health = 100;
window.game.updateAllComponents();
```

---

## Creating Custom Components

### Step 1: Create Component File

```javascript
// js/components/CustomComponent.js
import Component from "./Component.js";

class CustomComponent extends Component {
  constructor(containerId) {
    super(containerId);
    this.state = {
      // Your initial state
      value: 0,
    };
  }

  // Public method to update from outside
  updateValue(newValue) {
    this.setState({ value: newValue });
  }

  // Render method (required)
  render() {
    if (!this.container) return;

    this.container.innerHTML = `
            <div class="custom-component">
                <h3>Custom Component</h3>
                <p>Value: ${this.state.value}</p>
                <button data-action="increment">+</button>
            </div>
        `;

    // Add event listeners after render
    this.container
      .querySelector('[data-action="increment"]')
      .addEventListener("click", () => {
        this.setState({ value: this.state.value + 1 });
      });
  }
}

export default CustomComponent;
```

### Step 2: Add to HTML

```html
<div id="customComponent" class="panel"></div>
```

### Step 3: Add to Game

```javascript
// In Game.js initComponents()
import CustomComponent from './components/CustomComponent.js';

initComponents() {
    // ... existing components
    this.customComponent = new CustomComponent('customComponent');
    this.customComponent.mount();
}
```

### Step 4: Style It

```css
.custom-component {
  padding: 1rem;
  background: var(--panel-bg);
  border-radius: var(--border-radius);
}
```

---

## Component Best Practices

### 1. Single Responsibility

Each component should do one thing well.

✅ Good:

```javascript
class StatsPanel extends Component {
  // Only handles displaying stats
}
```

❌ Bad:

```javascript
class StatsPanel extends Component {
  // Displays stats AND handles game logic AND manages inventory
}
```

### 2. Immutable State Updates

✅ Good:

```javascript
this.setState({ ...this.state, health: 50 });
```

❌ Bad:

```javascript
this.state.health = 50;
this.render();
```

### 3. Event Delegation

✅ Good:

```javascript
render() {
    this.container.innerHTML = `<button data-action="click">Click</button>`;
    this.container.querySelector('[data-action]')
        .addEventListener('click', this.handleClick.bind(this));
}
```

❌ Bad:

```javascript
render() {
    const button = document.createElement('button');
    button.onclick = () => { /* inline handler */ };
}
```

### 4. Clean Separation

- **Component**: UI rendering and user interaction
- **Game**: Business logic and state management
- **Config**: Configuration and settings

### 5. Defensive Rendering

```javascript
render() {
    if (!this.container) return;  // Guard clause

    // Safe rendering
    this.container.innerHTML = `...`;
}
```

---

## Debugging Components

### Console Inspection

```javascript
// Access game instance
window.game;

// Check component state
window.game.statsPanel.state;

// Manually update
window.game.statsPanel.updateStats({ health: 100 });

// Force re-render
window.game.updateAllComponents();
```

### Common Issues

**Component not rendering**:

- Check container ID matches HTML
- Verify `mount()` was called
- Check browser console for errors

**State not updating**:

- Use `setState()` not direct assignment
- Ensure `render()` is implemented
- Check for JavaScript errors

**Events not working**:

- Add listeners after `innerHTML` update
- Use event delegation
- Check `this` binding

---

## Performance Tips

1. **Batch Updates**: Update multiple components at once
2. **Debounce Rapid Changes**: Limit re-renders
3. **CSS Animations**: Use CSS over JavaScript
4. **Minimize DOM Queries**: Cache selectors
5. **Virtual Scrolling**: For large lists (future enhancement)

---

## Testing Components

```javascript
// Unit test example
describe("StatsPanel", () => {
  let panel;

  beforeEach(() => {
    document.body.innerHTML = '<div id="test"></div>';
    panel = new StatsPanel("test");
    panel.mount();
  });

  it("should update health bar", () => {
    panel.updateStats({ health: 50 });
    const bar = document.querySelector(".health-bar");
    expect(bar.style.width).toBe("50%");
  });
});
```

---

This component system provides a solid foundation for building complex, maintainable game UIs while keeping code organized and testable!
