# 🎮 Terraform Survivor - Complete Feature List

## Core Gameplay

### Survival Mechanics

- **Health System**: Don't let it reach zero or game over
- **Hunger Management**: Eat food to maintain hunger levels
- **Thirst Management**: Drink water regularly to stay hydrated
- **Energy System**: Rest to recover energy for actions
- **Day/Night Cycle**: Each rest advances to the next day

### Actions

| Action       | Hotkey | Energy Cost | Description                             |
| ------------ | ------ | ----------- | --------------------------------------- |
| Explore      | E      | 15          | Search for wood, stone, or berries      |
| Hunt         | H      | 20          | Hunt for meat (risky but rewarding)     |
| Gather Water | W      | 10          | Find water to restore thirst            |
| Rest         | R      | 0           | Sleep to recover energy and advance day |
| Craft        | C      | 5           | Build useful items from resources       |
| Status       | S      | 0           | View detailed player statistics         |
| Statistics   | -      | 0           | View achievements and lifetime stats    |
| Save         | -      | 0           | Manually save game progress             |
| Settings     | O      | 0           | Adjust game difficulty in real-time     |
| Help         | ?      | 0           | Show keyboard shortcuts                 |

### Resource System

- **Wood**: Found by exploring, used for crafting
- **Stone**: Found by exploring, used for crafting
- **Berries**: Found by exploring, restores hunger
- **Meat**: Obtained by hunting, restores hunger
- **Craftable Items**: Campfire, Shelter, Spear (if crafting enabled)

## Advanced Features

### 💾 Auto-Save System

- **Automatic Saves**: Game saves every 30 seconds
- **Manual Save**: Save anytime with Save button
- **Auto-Load**: Automatically loads last save on startup
- **LocalStorage**: All saves stored in browser
- **Smart Cleanup**: Save cleared on game over

### ⚙️ Dynamic Settings

Adjust difficulty on the fly without restarting:

- **Hunger Decay Rate** (1-10): How fast you get hungry
- **Thirst Decay Rate** (1-10): How fast you get thirsty
- **Energy Decay Rate** (1-10): How fast you lose energy
- **Danger Level** (0-100%): Probability of negative events
- **Resource Multiplier** (0.5x-3x): Amount of resources found

Settings persist with your save and take effect immediately!

### 🏆 Achievement System

Track your progress with 9 unlockable achievements:

**Survival Achievements:**

- 🏕️ **Survivor**: Survive 10 days
- ⛺ **Veteran**: Survive 25 days
- 🏔️ **Legend**: Survive 50 days
- 👑 **Immortal**: Survive 100 days

**Action Achievements:**

- 🔍 **Explorer**: Explore 50 times
- 🏹 **Hunter**: Hunt 25 times
- 🔨 **Craftsman**: Craft 10 items

**Resource Achievements:**

- 📦 **Gatherer**: Collect 100 resources
- 🏛️ **Hoarder**: Collect 500 resources

### 📊 Statistics Tracking

Lifetime stats tracked across all games:

- Total games played
- Total days survived
- Personal best run
- Total explorations
- Hunt success rate
- Items crafted
- Days rested
- Resources gathered by type

### 🔔 Notification System

- Toast notifications for achievements
- Special styling for unlocked achievements
- Smooth animations
- Auto-dismiss
- Non-intrusive design

### 🎯 Random Events

When enabled via Terraform config:

- **Weather Events**: Rain, cold nights, peaceful nights
- **Danger Events**: Encounters while exploring or hunting
- **Dynamic Outcomes**: Events affect health, thirst, and resources

## Infrastructure as Code

### Terraform Integration

Control game difficulty through infrastructure:

**Environment Presets:**

- **Development** (Easy): 2x resources, 10% danger, lots of starting items
- **Staging** (Normal): Balanced gameplay, 30% danger, standard resources
- **Production** (Hard): 0.8x resources, 50% danger, minimal starting items

**Configurable via Terraform:**

```hcl
game_settings = {
  hunger_decay_rate   = 2.0
  thirst_decay_rate   = 2.5
  energy_decay_rate   = 1.5
  resource_multiplier = 1.0
  danger_level        = 0.3
}

features = {
  crafting_enabled = true
  weather_events   = true
  random_events    = true
}

starting_resources = {
  wood    = 5
  stone   = 3
  berries = 10
}
```

## Accessibility

### ⌨️ Full Keyboard Support

- Every action has a keyboard shortcut
- Tab navigation through all UI elements
- ESC to close dialogs
- No mouse required to play

### 🎨 Visual Accessibility

- High contrast UI elements
- Color-coded stats (health, hunger, thirst, energy)
- Clear visual feedback for all actions
- Readable fonts and sizing

### 📢 Screen Reader Support

- ARIA labels on all interactive elements
- Semantic HTML structure
- Live regions for game events
- Descriptive button labels

### WCAG 2.1 AA Compliant

- Meets accessibility standards
- Keyboard navigable
- Screen reader friendly
- High contrast ratios

## Technical Features

### Component Architecture

- **Modular Design**: Each UI element is a separate component
- **State Management**: Clean state updates and rendering
- **Event System**: Decoupled action handling
- **Reusable Components**: Easy to extend and customize

### No Dependencies

- Pure vanilla JavaScript
- No build process required
- No npm packages
- Works offline

### Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- LocalStorage for persistence
- ES6 modules
- Responsive design

### Deployment Options

- **GitHub Pages**: Free static hosting
- **Vercel**: Automated deployments
- **Local Server**: Python, Node.js, or any HTTP server
- **Standalone**: Open HTML file directly

## Game Modes

### Modular Version

- Loads config from `config.js`
- Terraform-controlled difficulty
- Dynamic configuration
- Requires HTTP server

### Standalone Version

- Includes default configuration
- Works without server
- Open directly in browser
- Perfect for testing

## UI Components

### Stats Panel

- Real-time health, hunger, thirst, energy display
- Color-coded progress bars
- Day counter
- Visual warnings for low stats

### Story Log

- Scrolling event log
- Timestamped messages
- Color-coded by type (success, danger, info)
- Auto-scroll to latest

### Action Panel

- Grid of action buttons
- Energy cost display
- Keyboard shortcut hints
- Disabled state for insufficient energy

### Inventory Panel

- Resource counts
- Item icons
- Organized display
- Real-time updates

### Terraform Config Panel

- Shows current environment
- Displays active settings
- Feature toggles
- Read-only view

### Modal System

- Crafting menu
- Status display
- Help dialog
- Game over screen
- Statistics & achievements

### Settings Panel

- Slide-in from right
- Range sliders for all settings
- Real-time value display
- Save/Cancel actions
- Smooth animations

## Performance

- **Lightweight**: < 100KB total
- **Fast Loading**: No external dependencies
- **Efficient Updates**: Only re-renders changed components
- **Smooth Animations**: CSS-based transitions
- **Low Memory**: Minimal state management

## Future Enhancement Ideas

- More craftable items
- Trading system
- Multiple biomes
- Seasonal changes
- Multiplayer leaderboards
- Custom difficulty presets
- More achievements
- Sound effects
- Mobile touch controls
- Progressive Web App (PWA)

---

**Built with ❤️ using vanilla JavaScript and Terraform**
