# 🏔️ Terraform Survivor

> Infrastructure as Code meets Survival RPG

A browser-based survival game where **Terraform controls the difficulty**. Demonstrates clean architecture, component design, and IaC principles.

## 🚀 Quick Start

```bash
# Play locally (easiest)
python run-game.py
# Opens browser automatically at http://localhost:8000/src/frontend/standalone.html

# Or open directly (no server)
open src/frontend/standalone.html

# Deploy to GitHub Pages (free)
git push origin main
# Enable Pages in repo settings → /src/frontend

# Or deploy with Terraform
cd src/infrastructure/terraform
terraform apply -var-file="environments/prod.tfvars"
```

See [Deployment Guide](docs/guides/DEPLOYMENT.md) for full instructions.

## 📁 Structure

```
terraform-survivor/
├── src/
│   ├── frontend/          # Game (HTML, CSS, JS)
│   └── infrastructure/    # Terraform configs
├── docs/
│   ├── guides/            # User docs (4 guides)
│   └── reference/         # Technical docs (2 docs)
└── .github/
    ├── tools/             # Dev server
    └── tests/             # Test files
```

## ⌨️ Controls

**E** Explore | **H** Hunt | **W** Water | **F** Eat | **R** Rest | **C** Craft | **S** Status | **O** Settings | **?** Help

## 🎯 Features

- Survival mechanics (health, hunger, thirst, energy)
- Terraform-controlled difficulty
- **Interactive UI** - Click stats for instant help, click food to eat
- **Smart tooltips** - Shows solutions based on your inventory
- **Auto-save system** with localStorage persistence
- **In-game settings panel** for real-time difficulty adjustment
- **Achievement system** with 9 unlockable achievements
- **Statistics tracking** across all games
- **Notification system** for achievements and events
- Full keyboard support & accessibility (WCAG 2.1 AA)
- Component-based architecture
- No dependencies, no build

## 📚 Documentation

**Getting Started:**

- [Quick Start](docs/guides/QUICKSTART.md) - Get playing in 5 minutes
- [Setup Guide](docs/guides/START_HERE.md) - Installation and setup
- [Deployment](docs/guides/DEPLOYMENT.md) - Deploy to GitHub Pages, Vercel

**Features:**

- [Complete Feature List](docs/reference/FEATURES.md) - All game features
- [Changelog](CHANGELOG.md) - Version history
- [Quick Reference](docs/guides/QUICK_REFERENCE.md) - Quick commands
- [Interactive Features](docs/guides/INTERACTIVE_FEATURES.md) - UI guide
- [Accessibility](docs/guides/ACCESSIBILITY.md) - Controls & accessibility

**For Developers:**

- [Developer Guide](docs/reference/DEVELOPER_GUIDE.md) - How to extend the game
- [Modular Architecture](docs/reference/MODULAR_ARCHITECTURE.md) - System design
- [Architecture](docs/reference/ARCHITECTURE.md) - Code structure
- [Components](docs/reference/COMPONENTS.md) - Component API reference
- [Visual Improvements](docs/reference/VISUAL_IMPROVEMENTS.md) - UI/UX enhancements
- [Project Summary](docs/reference/PROJECT_COMPLETE.md) - Complete overview

## 🔧 Development

```bash
# Start server (recommended)
python run-game.py

# Or use the old server
python .github/tools/server.py

# Terraform
cd src/infrastructure/terraform
terraform apply -var-file="environments/dev.tfvars"
```

## 🎮 How It Works

Terraform variables control game behavior:

| Variable              | Effect               |
| --------------------- | -------------------- |
| `hunger_decay_rate`   | How fast you starve  |
| `resource_multiplier` | Gathering efficiency |
| `danger_level`        | Encounter chance     |
| `crafting_enabled`    | Feature toggle       |

Edit `src/infrastructure/terraform/environments/*.tfvars` to customize.

## 📝 License

MIT
