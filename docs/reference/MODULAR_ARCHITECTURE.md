# 🏗️ Modular Architecture

## Overview

The codebase has been refactored into a modular, maintainable architecture with clear separation of concerns.

## Architecture Diagram

```
Game.js (Main Controller)
├── GameState.js (State Management)
├── Systems/
│   ├── ActionSystem.js (Player Actions)
│   ├── CraftingSystem.js (Crafting Logic)
│   ├── EventSystem.js (Random Events)
│   └── WarningSystem.js (Stat Warnings)
├── Components/
│   ├── StatsPanel.js
│   ├── ActionPanel.js
│   ├── Inventory.js
│   ├── StoryLog.js
│   ├── Modal.js
│   ├── SettingsPanel.js
│   └── NotificationSystem.js
└── Managers/
    ├── SaveManager.js
    └── StatsTracker.js
```

## Module Responsibilities

### 🎮 Core Systems

#### **GameState.js**

**Purpose:** Centralized state management
**Responsibilities:**

- Store player stats
- Store inventory
- Store game config
- Provide state getters/setters
- Notify listeners on changes
- Validate state
- Serialize/deserialize

**API:**

```javascript
const state = new GameState(config, savedState);

// Getters
state.getPlayer();
state.getInventory();
state.getConfig();

// Setters
state.updatePlayer({ health: 90 });
state.updateInventory({ wood: 5 });
state.addToInventory("wood", 3);

// Helpers
state.modifyStat("health", -10);
state.hasItem("wood", 5);
state.togglePause();

// Observer
state.subscribe((type, data) => {
  console.log("State changed:", type, data);
});
```

#### **ActionSystem.js**

**Purpose:** Handle all player actions
**Responsibilities:**

- Explore logic
- Hunt logic
- Gather water logic
- Rest logic
- Eat food logic
- Energy validation
- Resource calculations

**API:**

```javascript
const actions = new ActionSystem(config);

// Actions return result objects
const result = actions.explore(player, inventory);
// { success, player, inventory, message, type, resource }

const result = actions.hunt(player, inventory);
// { success, player, inventory, message, type }

const result = actions.eatFood(player, inventory, "berries");
// { success, player, inventory, message, type, restored }
```

#### **CraftingSystem.js**

**Purpose:** Handle crafting mechanics
**Responsibilities:**

- Define recipes
- Check crafting requirements
- Deduct resources
- Add crafted items
- Apply crafting benefits

**API:**

```javascript
const crafting = new CraftingSystem(config);

// Get all recipes
const recipes = crafting.getRecipes();

// Check if can craft
const canCraft = crafting.canCraft(recipe, inventory);

// Craft item
const result = crafting.craft("Campfire", inventory);
// { success, inventory, itemKey }

// Apply benefit
const benefit = crafting.applyBenefit("campfire", player, inventory);
// { player, inventory, message, type }
```

#### **EventSystem.js**

**Purpose:** Handle random events
**Responsibilities:**

- Define events
- Weighted random selection
- Apply event effects
- Return event results

**API:**

```javascript
const events = new EventSystem(config);

// Check if should trigger
if (events.shouldTriggerEvent()) {
  const result = events.triggerEvent(player, inventory);
  // { message, type, changes: { player, inventory } }
}
```

#### **WarningSystem.js**

**Purpose:** Monitor stats and warn player
**Responsibilities:**

- Track warning states
- Check thresholds
- Generate warnings
- Handle critical states

**API:**

```javascript
const warnings = new WarningSystem();

// Check for warnings
const warningList = warnings.checkWarnings(player);
// [{ message, type, action, critical }]

// Check critical damage
const damages = warnings.checkCriticalDamage(player);
// [{ message, type, damage }]

// Reset warnings
warnings.reset();
```

## Benefits of Modular Architecture

### ✅ Separation of Concerns

- Each module has one responsibility
- Easy to understand and maintain
- Clear boundaries between systems

### ✅ Testability

- Each module can be tested independently
- Mock dependencies easily
- Unit tests are straightforward

### ✅ Reusability

- Systems can be reused in different contexts
- Easy to extract for other projects
- Composable architecture

### ✅ Maintainability

- Changes are localized
- Less risk of breaking other parts
- Easier to debug

### ✅ Extensibility

- Add new systems without touching existing code
- Plugin-like architecture
- Easy to add features

### ✅ Readability

- Clear file structure
- Self-documenting code
- Easy to onboard new developers

## Migration Guide

### Before (Monolithic):

```javascript
class Game {
  explore() {
    // 50 lines of logic
  }

  hunt() {
    // 40 lines of logic
  }

  craft() {
    // 60 lines of logic
  }

  // ... 1000+ lines total
}
```

### After (Modular):

```javascript
class Game {
  constructor(config) {
    this.state = new GameState(config);
    this.actions = new ActionSystem(config);
    this.crafting = new CraftingSystem(config);
    this.events = new EventSystem(config);
    this.warnings = new WarningSystem();
  }

  explore() {
    const result = this.actions.explore(
      this.state.getPlayer(),
      this.state.getInventory()
    );

    if (result.success) {
      this.state.updatePlayer(result.player);
      this.state.updateInventory(result.inventory);
      this.storyLog.addMessage(result.message, result.type);
    }
  }
}
```

## File Structure

```
src/frontend/js/
├── Game.js                 # Main controller (orchestrates systems)
├── main.js                 # Entry point
├── systems/                # Game logic modules
│   ├── GameState.js       # State management
│   ├── ActionSystem.js    # Player actions
│   ├── CraftingSystem.js  # Crafting logic
│   ├── EventSystem.js     # Random events
│   └── WarningSystem.js   # Stat warnings
├── components/             # UI components
│   ├── Component.js       # Base component
│   ├── StatsPanel.js
│   ├── ActionPanel.js
│   ├── Inventory.js
│   ├── StoryLog.js
│   ├── Modal.js
│   ├── SettingsPanel.js
│   ├── TerraformConfig.js
│   └── NotificationSystem.js
└── managers/               # Utility managers
    ├── SaveManager.js     # Save/load
    └── StatsTracker.js    # Statistics
```

## Testing Strategy

### Unit Tests

Each system can be tested independently:

```javascript
// ActionSystem.test.js
test("explore returns resources", () => {
  const actions = new ActionSystem(mockConfig);
  const result = actions.explore(mockPlayer, mockInventory);

  expect(result.success).toBe(true);
  expect(result.resource).toBeDefined();
});

// CraftingSystem.test.js
test("campfire provides benefits", () => {
  const crafting = new CraftingSystem(mockConfig);
  const result = crafting.applyBenefit("campfire", mockPlayer, mockInventory);

  expect(result.player.health).toBeGreaterThan(mockPlayer.health);
});
```

### Integration Tests

Test system interactions:

```javascript
test("full game loop", () => {
  const game = new Game(config);
  game.explore();
  game.rest();

  expect(game.state.getPlayer().day).toBe(2);
});
```

## Performance Considerations

### State Updates

- Immutable updates prevent bugs
- Listeners only notified on actual changes
- Batch updates when possible

### Memory Management

- Systems are lightweight
- No circular references
- Clean separation of concerns

### Optimization

- Systems can be lazy-loaded
- Event system uses weighted random (O(n))
- State validation is optional

## Future Enhancements

### Planned Systems:

- **CombatSystem** - Handle combat mechanics
- **QuestSystem** - Manage quests and objectives
- **TradeSystem** - NPC trading
- **SkillSystem** - Player progression
- **BiomeSystem** - Different environments

### Planned Improvements:

- Dependency injection
- Event bus for loose coupling
- Plugin system
- Hot module replacement
- State time-travel (undo/redo)

## Best Practices

### 1. Single Responsibility

Each system does one thing well

### 2. Dependency Injection

Pass dependencies through constructor

### 3. Immutable Updates

Never mutate state directly

### 4. Return Results

Systems return result objects, don't modify global state

### 5. Error Handling

Systems return success/failure, don't throw

### 6. Documentation

Each system has clear API documentation

## Conclusion

The modular architecture provides:

- ✅ Better organization
- ✅ Easier maintenance
- ✅ Improved testability
- ✅ Greater extensibility
- ✅ Clearer code

**The codebase is now professional-grade and ready for expansion!**
