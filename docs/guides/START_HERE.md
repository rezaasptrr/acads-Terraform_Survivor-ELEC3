# 🎮 START HERE - Quick Setup Guide

## The Problem

The game uses **ES6 modules** which require a web server to work properly. Opening `index.html` directly in your browser will cause CORS errors.

## ✅ Solution 1: Use Standalone Version (Easiest)

**Just open this file in your browser:**

```
standalone.html
```

This version has all JavaScript inlined and works without a server!

---

## ✅ Solution 2: Run Local Server (Recommended for Development)

### Option A: Python Server (Built-in)

```bash
# Recommended: Use the game launcher
python run-game.py

# Or use Python's built-in server
python -m http.server 8000
```

Then open: **http://localhost:8000**

### Option B: Node.js Server

```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000
```

Then open: **http://localhost:8000**

### Option C: VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

---

## 🎯 Which File to Open?

| File                | Use When            | Requires Server? |
| ------------------- | ------------------- | ---------------- |
| **standalone.html** | Just want to play   | ❌ No            |
| **index.html**      | Development/testing | ✅ Yes           |
| **test.html**       | Debugging issues    | ✅ Yes           |

---

## 🚀 Quick Start Commands

### Windows

```cmd
REM Option 1: Standalone (no server needed)
start standalone.html

REM Option 2: With Python server
python run-game.py
REM Opens browser automatically
```

### Mac/Linux

```bash
# Option 1: Standalone (no server needed)
open standalone.html

# Option 2: With Python server
python3 run-game.py
# Opens browser automatically
```

---

## 🔧 Change Difficulty with Terraform

Once the game is running:

```bash
# Initialize Terraform (first time only)
terraform init

# Apply easy mode
terraform apply -var-file="environments/dev.tfvars" -auto-approve

# Apply hard mode
terraform apply -var-file="environments/prod.tfvars" -auto-approve

# Refresh your browser to see changes!
```

---

## 🐛 Troubleshooting

### "Module not found" or CORS errors

**Solution**: Use `standalone.html` or run a local server

### Config not loaded

**Solution**: Make sure `config.js` exists. If not, run:

```bash
terraform init
terraform apply -var-file="environments/dev.tfvars"
```

### Game not displaying

1. Open browser console (F12)
2. Check for errors
3. Try `standalone.html` instead
4. Make sure you're using a server for `index.html`

### Terraform errors

```bash
# Reinitialize
terraform init -upgrade

# Validate
terraform validate

# Check what will change
terraform plan -var-file="environments/dev.tfvars"
```

---

## 📚 Next Steps

1. **Play the game**: Open `standalone.html`
2. **Read the docs**: Check `INDEX.md` for all documentation
3. **Modify difficulty**: Edit `environments/*.tfvars` and apply
4. **Customize**: Edit components in `js/components/`

---

## 🎮 Game Controls

| Action          | Energy | Description      |
| --------------- | ------ | ---------------- |
| 🔍 Explore      | 15     | Find resources   |
| 🏹 Hunt         | 20     | Get meat (risky) |
| 💧 Gather Water | 10     | Restore thirst   |
| 😴 Rest         | 0      | Recover energy   |
| 🔨 Craft        | 5      | Build items      |
| 📊 Status       | 0      | View stats       |

---

**Have fun! 🏔️**
