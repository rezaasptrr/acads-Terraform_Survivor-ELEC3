# 🎮 Interactive Features Guide

## Click Everything!

Terraform Survivor has interactive UI elements to make gameplay easier and more intuitive.

---

## 🖱️ Clickable Stats Panel

### How It Works:

When your stats get **low (below 50%)**, they become **clickable** and show helpful tooltips!

### Visual Cues:

**🟢 Green Tooltip** = "You have what you need!"

- Click to instantly use the solution
- Example: Low hunger + have food = Click to eat!

**🟠 Orange Tooltip** = "You need to gather items first"

- Shows what action to take
- Example: Low hunger + no food = "Explore or Hunt for food"

**💫 Pulsing Effect** = Stat is low and needs attention

---

## 📊 Stat Solutions:

### ❤️ Health (Low)

- **Can't be clicked directly**
- Health recovers when you maintain other stats
- Keep hunger and thirst above 0!

### 🍖 Hunger (Low)

**If you have food:**

- ✅ Tooltip: "Click to eat food"
- Click → Opens food menu
- Select berries or meat to eat

**If you don't have food:**

- ⚠️ Tooltip: "Explore or Hunt for food"
- Press **E** to explore for berries
- Press **H** to hunt for meat

### 💧 Thirst (Low)

**Always available:**

- ✅ Tooltip: "Click to gather water"
- Click → Instantly gathers water
- Restores thirst immediately
- Same as pressing **W**

### ⚡ Energy (Low)

**Always available:**

- ✅ Tooltip: "Click to rest"
- Click → Instantly rest
- Advances to next day
- Restores energy
- Same as pressing **R**

---

## 🎒 Clickable Inventory

### Food Items (Berries & Meat):

**Visual Cues:**

- 🍴 Fork icon appears on hover
- Green highlight when hovering
- Cursor changes to pointer

**How to Use:**

1. Look at your inventory (left panel)
2. See berries 🫐 or meat 🍖?
3. **Just click them!**
4. They're consumed automatically
5. Hunger restored! ✅

**What's Clickable:**

- ✅ Berries (restores 15 hunger)
- ✅ Meat (restores 30 hunger)
- ❌ Wood (not edible)
- ❌ Stone (not edible)
- ❌ Crafted items (not consumable)

---

## 🎯 Quick Actions Summary

| What's Low | Have Items? | Click Result        |
| ---------- | ----------- | ------------------- |
| 🍖 Hunger  | ✅ Yes      | Opens food menu     |
| 🍖 Hunger  | ❌ No       | Shows gathering tip |
| 💧 Thirst  | Always      | Gathers water       |
| ⚡ Energy  | Always      | Rest & advance day  |

---

## 💡 Pro Tips

### 1. Watch for Pulsing Stats

- Pulsing = needs attention
- Hover to see solution
- Click if available

### 2. Fastest Actions

- **Eat**: Click food in inventory
- **Drink**: Click thirst stat
- **Rest**: Click energy stat

### 3. Plan Ahead

- Keep food in inventory
- Don't wait until stats are critical
- Orange tooltips = gather items first

### 4. Visual Feedback

- Green = good to go
- Orange = need to prepare
- Pulsing = urgent

---

## 🎨 Color Guide

| Color      | Meaning            | Action               |
| ---------- | ------------------ | -------------------- |
| 🟢 Green   | Solution available | Click to use         |
| 🟠 Orange  | Need items first   | Gather resources     |
| 🔴 Red     | Critical (< 20%)   | Urgent action needed |
| 💫 Pulsing | Low stat           | Hover for help       |

---

## 🔄 Interaction Flow

```
Low Stat Detected
    ↓
Stat Pulses
    ↓
Hover Over Stat
    ↓
Tooltip Appears
    ↓
Check Color:
    ├─ Green → Click to fix instantly
    └─ Orange → Follow tooltip advice
```

---

## ⌨️ Keyboard vs Mouse

**Both work!** Choose your style:

### Keyboard Shortcuts:

- **E** - Explore
- **H** - Hunt
- **W** - Gather Water
- **F** - Eat Food
- **R** - Rest

### Mouse Clicks:

- Click low stats for solutions
- Click food in inventory to eat
- Click action buttons
- Hover for tooltips

**Mix and match for fastest gameplay!**

---

## 🐛 Troubleshooting

**"I clicked but nothing happened"**

- Make sure stat is below 50%
- Check if tooltip is green (available)
- Orange tooltip = need items first

**"No tooltip appears"**

- Stat might not be low enough (< 50%)
- Try hovering longer
- Refresh browser if needed

**"Can't click food in inventory"**

- Only berries and meat are clickable
- Wood and stone aren't edible
- Make sure you have food items

---

## 🎓 Learning Curve

**New Players:**

- Start with clicking stats
- Tooltips teach you what to do
- Visual feedback guides you

**Experienced Players:**

- Use keyboard shortcuts
- Click inventory for speed
- Mix both for efficiency

---

**Now you're a pro! Click away! 🖱️✨**
