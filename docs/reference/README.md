# Technical Reference

Documentation for developers, contributors, and AI assistants.

## Architecture & Design

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture, design patterns, data flow
- **[MODULAR_ARCHITECTURE.md](MODULAR_ARCHITECTURE.md)** - System modules and organization
- **[COMPONENTS.md](COMPONENTS.md)** - Component API reference, usage examples
- **[DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)** - How to extend and modify the game

## Features & History

- **[FEATURES.md](FEATURES.md)** - Complete feature list
- **[VISUAL_IMPROVEMENTS.md](VISUAL_IMPROVEMENTS.md)** - UI/UX enhancements
- **[PROJECT_COMPLETE.md](PROJECT_COMPLETE.md)** - Complete project overview
- **[CHANGELOG_HISTORY.md](CHANGELOG_HISTORY.md)** - Development milestones

## Purpose

These documents are intended for:

- 🤖 **AI Assistants** - Understanding codebase structure for code generation
- 👨‍💻 **Developers** - Contributing to the project
- 📚 **Technical Documentation** - Architecture decisions and patterns

## Quick Reference

### Architecture

- Component-based design
- State management patterns (GameState.js)
- System modules (Action, Crafting, Event, Warning)
- Terraform integration
- File structure

### Components

- Base Component class with lifecycle
- UI Components: StatsPanel, StoryLog, ActionPanel
- Game Components: Inventory, TerraformConfig, Modal
- System Components: SettingsPanel, NotificationSystem
- API reference and examples

## For AI Assistants

When generating code or making changes:

1. Review [ARCHITECTURE.md](ARCHITECTURE.md) for design patterns
2. Check [MODULAR_ARCHITECTURE.md](MODULAR_ARCHITECTURE.md) for system organization
3. Reference [COMPONENTS.md](COMPONENTS.md) for component APIs
4. Follow [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) for best practices
5. Maintain separation of concerns
