# 📁 Documentation Organization

## Overview

This document explains how the Terraform Survivor documentation is organized.

## Structure

```
terraform-survivor/
├── README.md                   # Main entry point
├── CHANGELOG.md                # Version history (current)
├── run-game.py                 # Game server launcher
├── start-game.bat              # Windows launcher
│
├── docs/
│   ├── INDEX.md               # Complete documentation index
│   ├── README.md              # Documentation overview
│   ├── ORGANIZATION.md        # This file
│   │
│   ├── guides/                # User documentation (9 docs)
│   │   ├── README.md
│   │   ├── START_HERE.md
│   │   ├── QUICKSTART.md
│   │   ├── DEPLOYMENT.md
│   │   ├── QUICK_REFERENCE.md
│   │   ├── HOW_TO_EAT.md
│   │   ├── INTERACTIVE_FEATURES.md
│   │   ├── CRAFTING_GUIDE.md
│   │   ├── CLEAR_CACHE.md
│   │   └── ACCESSIBILITY.md
│   │
│   └── reference/             # Technical documentation (7 docs)
│       ├── README.md
│       ├── ARCHITECTURE.md
│       ├── MODULAR_ARCHITECTURE.md
│       ├── COMPONENTS.md
│       ├── DEVELOPER_GUIDE.md
│       ├── FEATURES.md
│       ├── VISUAL_IMPROVEMENTS.md
│       ├── PROJECT_COMPLETE.md
│       └── CHANGELOG_HISTORY.md
│
├── src/
│   ├── frontend/              # Game code
│   └── infrastructure/        # Terraform configs
│
└── .github/
    ├── tools/                 # Development tools
    └── tests/                 # Test files
```

## Documentation Categories

### Root Files (4 essential)

**README.md** - Main project documentation

- Project overview
- Quick start instructions
- Feature highlights
- Links to detailed docs

**CHANGELOG.md** - Current version history

- Latest changes and updates
- Version release notes
- Breaking changes
- Migration guides

**run-game.py** - Python game server

- HTTP server with CORS
- Auto-opens browser
- Port conflict handling
- Cache control headers

**start-game.bat** - Windows batch launcher

- Alternative launcher for Windows
- Uses legacy server.py

### User Guides (docs/guides/)

Documentation for players and users:

1. **START_HERE.md** - Setup and installation
2. **QUICKSTART.md** - Quick start guide
3. **DEPLOYMENT.md** - Deploy to GitHub Pages/Vercel
4. **QUICK_REFERENCE.md** - Command cheat sheet
5. **HOW_TO_EAT.md** - Food system guide
6. **INTERACTIVE_FEATURES.md** - UI interactions
7. **CRAFTING_GUIDE.md** - Crafting recipes
8. **CLEAR_CACHE.md** - Browser cache troubleshooting
9. **ACCESSIBILITY.md** - Keyboard shortcuts

### Technical Reference (docs/reference/)

Documentation for developers:

1. **ARCHITECTURE.md** - System architecture
2. **MODULAR_ARCHITECTURE.md** - Module organization
3. **COMPONENTS.md** - Component API reference
4. **DEVELOPER_GUIDE.md** - How to extend the game
5. **FEATURES.md** - Complete feature list
6. **VISUAL_IMPROVEMENTS.md** - UI/UX details
7. **PROJECT_COMPLETE.md** - Project overview
8. **CHANGELOG_HISTORY.md** - Historical milestones

## Navigation

### For New Users

Start → [README.md](../README.md) → [guides/START_HERE.md](guides/START_HERE.md)

### For Players

[guides/QUICKSTART.md](guides/QUICKSTART.md) → [guides/QUICK_REFERENCE.md](guides/QUICK_REFERENCE.md)

### For Developers

[reference/ARCHITECTURE.md](reference/ARCHITECTURE.md) → [reference/DEVELOPER_GUIDE.md](reference/DEVELOPER_GUIDE.md)

### For Complete Index

[INDEX.md](INDEX.md) - Browse all documentation

## Recent Changes

### Cleanup (2024-12-02)

**Moved:**

- `CLEAR_CACHE.md` → `docs/guides/CLEAR_CACHE.md`
- `docs/reference/QUICK_REFERENCE.md` → `docs/guides/QUICK_REFERENCE.md`

**Deleted (consolidated into CHANGELOG_HISTORY.md):**

- `docs/reference/IMPROVEMENTS_SUMMARY.md`
- `docs/reference/IMPROVEMENTS_COMPLETE.md`
- `docs/reference/MODULARITY_COMPLETE.md`
- `docs/reference/ORGANIZATION_COMPLETE.md`

**Created:**

- `docs/reference/CHANGELOG_HISTORY.md` - Historical development milestones
- `docs/ORGANIZATION.md` - This file

**Result:**

- Cleaner organization
- No redundant documents
- Clear separation: guides vs reference
- All cross-references updated

## Principles

### 1. Separation of Concerns

- **guides/** = User-facing documentation
- **reference/** = Technical documentation
- **Root** = Essential files only

### 2. No Redundancy

- Each topic covered once
- Historical info in CHANGELOG_HISTORY.md
- Current info in CHANGELOG.md

### 3. Clear Navigation

- INDEX.md for complete overview
- README.md files in each folder
- Cross-references between docs

### 4. Accessibility

- Clear file names
- Logical grouping
- Easy to find information

## Maintenance

### Adding New Documentation

**User guide?** → Add to `docs/guides/`
**Technical doc?** → Add to `docs/reference/`
**Update INDEX.md** → Add to appropriate section

### Updating Documentation

1. Make changes to relevant file
2. Update cross-references if needed
3. Update INDEX.md if structure changes
4. Update folder README.md if needed

### Deprecating Documentation

1. Move historical content to CHANGELOG_HISTORY.md
2. Delete redundant files
3. Update all cross-references
4. Update INDEX.md

## Statistics

- **Total documentation files**: 20
- **User guides**: 9
- **Technical reference**: 7
- **Index/navigation**: 4
- **Root essential files**: 4

---

**Last updated**: 2024-12-02
