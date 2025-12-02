# 🚀 Quick Start Guide

## Play Immediately (No Setup)

1. **Open the game**:

   ```bash
   # Windows
   start index.html

   # Mac
   open index.html

   # Linux
   xdg-open index.html
   ```

2. **Start playing!** The game works right out of the box with default settings.

## Change Difficulty with Terraform

### Prerequisites

- [Terraform](https://www.terraform.io/downloads) installed
- That's it!

### Step-by-Step

1. **Initialize Terraform** (first time only):

   ```bash
   terraform init
   ```

2. **Choose your difficulty**:

   **Easy Mode** (Development):

   ```bash
   terraform apply -var-file="environments/dev.tfvars" -auto-approve
   ```

   - 2x resource gathering
   - Low danger (10%)
   - Lots of starting items

   **Normal Mode** (Staging):

   ```bash
   terraform apply -var-file="environments/staging.tfvars" -auto-approve
   ```

   - Balanced gameplay
   - Medium danger (30%)
   - Standard resources

   **Hard Mode** (Production):

   ```bash
   terraform apply -var-file="environments/prod.tfvars" -auto-approve
   ```

   - 0.8x resource gathering
   - High danger (50%)
   - Minimal starting items

3. **Refresh your browser** to see the changes!

## What Just Happened?

When you run `terraform apply`:

1. Terraform reads your chosen `.tfvars` file
2. Generates a new `config.js` from the template
3. The game loads this config on startup
4. Game difficulty changes based on Terraform variables!

## View Current Configuration

```bash
terraform output
```

This shows:

- Deployment URL (if using Vercel)
- Current environment
- Active game settings

## Customize Your Own Difficulty

1. **Copy an environment file**:

   ```bash
   copy environments\prod.tfvars environments\custom.tfvars
   ```

2. **Edit the values**:

   ```hcl
   environment = "custom"
   difficulty  = "nightmare"

   game_settings = {
     hunger_decay_rate   = 5.0    # Starve faster!
     thirst_decay_rate   = 6.0    # Dehydrate faster!
     energy_decay_rate   = 3.0    # Tire faster!
     resource_multiplier = 0.3    # Find less stuff
     danger_level        = 0.9    # Everything is dangerous!
   }

   features = {
     crafting_enabled = false     # No crafting allowed!
     weather_events   = true
     random_events    = true
   }
   ```

3. **Apply your custom config**:

   ```bash
   terraform apply -var-file="environments/custom.tfvars" -auto-approve
   ```

4. **Refresh and suffer!** 😈

## Deploy to Vercel (Optional)

### Setup

1. **Get Vercel API Token**:

   - Visit https://vercel.com/account/tokens
   - Create new token
   - Copy it

2. **Set environment variable**:

   ```bash
   # Windows CMD
   set VERCEL_API_TOKEN=your_token_here

   # Windows PowerShell
   $env:VERCEL_API_TOKEN="your_token_here"

   # Mac/Linux
   export VERCEL_API_TOKEN=your_token_here
   ```

3. **Update main.tf**:

   ```hcl
   # In main.tf, update the github_repo variable
   variable "github_repo" {
     default = "yourusername/terraform-survivor"
   }
   ```

4. **Deploy**:

   ```bash
   terraform apply -var-file="environments/prod.tfvars"
   ```

5. **Get your URL**:
   ```bash
   terraform output deployment_url
   ```

## Deploy to GitHub Pages (Alternative)

1. **Push to GitHub**:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/terraform-survivor.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:

   - Go to repository Settings → Pages
   - Source: Deploy from branch `main` / root
   - Save

3. **Your game is live at**:

   ```
   https://yourusername.github.io/terraform-survivor/
   ```

4. **Update config and push**:
   ```bash
   terraform apply -var-file="environments/prod.tfvars" -auto-approve
   git add config.js
   git commit -m "Update to hard mode"
   git push
   ```

## Troubleshooting

### Game doesn't load

- Check browser console (F12) for errors
- Make sure `config.js` exists
- Try running `terraform apply` again

### Terraform errors

```bash
# Reinitialize
terraform init -upgrade

# Validate configuration
terraform validate

# See what will change
terraform plan -var-file="environments/dev.tfvars"
```

### Changes don't appear

- Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)
- Clear browser cache
- Check that `config.js` was updated

### Vercel deployment fails

- Verify `VERCEL_API_TOKEN` is set
- Check token has correct permissions
- Ensure project name is unique

## Game Controls

| Action          | Hotkey | Energy Cost | Description                  |
| --------------- | ------ | ----------- | ---------------------------- |
| 🔍 Explore      | E      | 15          | Find wood, stone, or berries |
| 🏹 Hunt         | H      | 20          | Get meat (risky!)            |
| 💧 Gather Water | W      | 10          | Restore thirst               |
| 😴 Rest         | R      | 0           | Recover energy, advance day  |
| 🔨 Craft        | C      | 5           | Build items (if enabled)     |
| 📊 Status       | S      | 0           | View detailed stats          |
| 💾 Save         | -      | 0           | Manually save progress       |
| ⚙️ Settings     | O      | 0           | Adjust game difficulty       |
| ⌨️ Help         | ?      | 0           | Show keyboard shortcuts      |

## New Features

### 💾 Auto-Save System

Your progress is automatically saved every 30 seconds to your browser's local storage. When you return, the game will load your last save automatically. You can also manually save anytime using the Save button.

### ⚙️ In-Game Settings

Press `O` or click the Settings button to adjust difficulty on the fly:

- **Hunger Decay Rate**: How fast you get hungry (1-10)
- **Thirst Decay Rate**: How fast you get thirsty (1-10)
- **Energy Decay Rate**: How fast you lose energy (1-10)
- **Danger Level**: Probability of negative events (0-100%)
- **Resource Multiplier**: Amount of resources found (0.5x-3x)

Changes take effect immediately and are saved with your game!

### ⌨️ Full Keyboard Support

Every action has a keyboard shortcut. Press `?` to see the full list. The game is fully accessible with keyboard navigation and screen reader support.

## Tips for Survival

1. **Watch your energy** - Can't act without it!
2. **Rest regularly** - Advances the day and restores energy
3. **Balance resources** - Don't let hunger or thirst hit zero
4. **Craft early** - Tools make survival easier
5. **Avoid danger** - Higher difficulty = more risk
6. **Use settings** - Adjust difficulty if it's too hard or easy
7. **Save often** - Manual saves ensure you don't lose progress

## Next Steps

- Read [ARCHITECTURE.md](ARCHITECTURE.md) to understand the code
- Modify components in `js/components/`
- Add new actions to the game
- Create custom Terraform variables
- Share your custom difficulty settings!

## Need Help?

- Check the [README.md](README.md) for full documentation
- Review [ARCHITECTURE.md](ARCHITECTURE.md) for technical details
- Open an issue on GitHub
- Modify the code - it's all yours!

---

**Have fun surviving! 🏔️**
