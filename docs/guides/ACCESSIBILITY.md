# ♿ Accessibility & Keyboard Shortcuts

## 🎹 Keyboard Shortcuts

The game is fully playable with just your keyboard!

### Action Shortcuts

| Key     | Action       | Energy Cost |
| ------- | ------------ | ----------- |
| **E**   | Explore      | 15          |
| **H**   | Hunt         | 20          |
| **W**   | Gather Water | 10          |
| **R**   | Rest         | 0           |
| **C**   | Craft        | 5           |
| **S**   | Status       | 0           |
| **?**   | Show Help    | 0           |
| **ESC** | Close Dialog | -           |

### Navigation

- **Tab** - Navigate between interactive elements
- **Enter/Space** - Activate buttons and select items
- **Arrow Keys** - Scroll through logs and lists

### Tips

- Keyboard shortcuts work from anywhere in the game
- Shortcuts are case-insensitive (E or e both work)
- Press **?** anytime to see the shortcuts help dialog
- Hotkey badges appear on action buttons showing the shortcut

## ♿ Accessibility Features

### Screen Reader Support

**ARIA Labels**

- All interactive elements have descriptive labels
- Progress bars announce current values
- Game events are announced via live regions
- Status updates are polite (non-intrusive)

**Semantic HTML**

- Proper heading hierarchy
- Role attributes for custom components
- List semantics for inventory
- Log role for story events

### Keyboard Navigation

**Focus Management**

- Visible focus indicators on all interactive elements
- Logical tab order
- Keyboard shortcuts don't interfere with navigation
- Modal dialogs trap focus appropriately

**Focus Styles**

- Blue outline (3px) for most elements
- Red outline for close buttons
- High contrast focus indicators
- Offset for better visibility

### Visual Accessibility

**Color & Contrast**

- High contrast text on backgrounds
- Color-coded stats with text labels
- Icons paired with text descriptions
- Status indicators use multiple cues (color + animation)

**Typography**

- Readable font sizes (minimum 0.7rem)
- Clear font family (Segoe UI)
- Adequate line height (1.2-1.5)
- Monospace for numeric values

**Visual Indicators**

- Critical health pulses (animation)
- Progress bars with percentage
- Status badges with colors
- Emoji icons for quick recognition

### Motion & Animation

**Reduced Motion Support**

```css
@media (prefers-reduced-motion: reduce) {
  /* All animations reduced to minimal duration */
  /* Shimmer effects disabled */
  /* Transitions nearly instant */
}
```

**Animations**

- Smooth but not excessive
- Can be disabled via OS settings
- No flashing or strobing effects
- Purposeful, not decorative

### High Contrast Mode

**Support for High Contrast**

```css
@media (prefers-contrast: high) {
  /* Thicker borders (2-3px) */
  /* Enhanced button borders */
  /* Stronger visual separation */
}
```

## 🎮 Gameplay Accessibility

### Difficulty Options

The game supports multiple difficulty levels via Terraform:

- **Easy Mode** (dev.tfvars) - Slower decay, more resources
- **Normal Mode** (staging.tfvars) - Balanced gameplay
- **Hard Mode** (prod.tfvars) - Faster decay, fewer resources

### Forgiving Mechanics

- No time pressure (turn-based)
- Can't lose items permanently
- Clear feedback on all actions
- Undo-friendly (can rest to recover)

### Information Clarity

- All stats clearly displayed
- Energy costs shown before actions
- Crafting requirements visible
- Status screen for detailed info

## 🔧 Technical Implementation

### ARIA Attributes Used

```html
<!-- Progress Bars -->
<div
  role="progressbar"
  aria-valuenow="75"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-label="Health bar"
>
  <!-- Live Regions -->
  <div role="log" aria-live="polite" aria-atomic="false">
    <!-- Lists -->
    <div role="list" aria-label="Inventory items">
      <div role="listitem" aria-label="Wood: 5 items">
        <!-- Status Updates -->
        <div role="status" aria-live="polite"></div>
      </div>
    </div>
  </div>
</div>
```

### Keyboard Event Handling

```javascript
document.addEventListener("keydown", (e) => {
  // Don't interfere with form inputs
  if (e.target.tagName === "INPUT") return;

  // Don't trigger when modal is open (except ESC)
  if (modal.isOpen && e.key !== "Escape") return;

  // Handle shortcuts
  const shortcuts = {
    e: () => explore(),
    h: () => hunt(),
    // ...
  };

  if (shortcuts[e.key.toLowerCase()]) {
    e.preventDefault();
    shortcuts[e.key.toLowerCase()]();
  }
});
```

### Focus Management

```css
/* Visible focus indicators */
button:focus-visible {
  outline: 3px solid var(--accent-blue);
  outline-offset: 2px;
}

/* Enhanced focus for hotkeys */
.action-button:focus .hotkey-badge {
  background: var(--accent-blue);
  color: #000;
}
```

## 📋 Accessibility Checklist

### ✅ Implemented

- [x] Keyboard navigation for all features
- [x] Screen reader support with ARIA
- [x] Focus indicators on all interactive elements
- [x] Semantic HTML structure
- [x] High contrast mode support
- [x] Reduced motion support
- [x] Keyboard shortcuts with visual indicators
- [x] Clear visual hierarchy
- [x] Color is not the only indicator
- [x] Text alternatives for icons
- [x] Logical tab order
- [x] No keyboard traps
- [x] Skip to content (via Tab)
- [x] Descriptive labels
- [x] Status announcements

### 🎯 WCAG 2.1 Compliance

**Level A**

- ✅ Keyboard accessible
- ✅ No keyboard trap
- ✅ Timing adjustable (no time limits)
- ✅ Bypass blocks (via Tab)
- ✅ Page titled
- ✅ Focus order
- ✅ Link purpose
- ✅ Language of page

**Level AA**

- ✅ Contrast ratio (4.5:1 minimum)
- ✅ Resize text (up to 200%)
- ✅ Focus visible
- ✅ Multiple ways to navigate
- ✅ Headings and labels
- ✅ Focus visible

**Level AAA**

- ✅ Contrast ratio (7:1 for body text)
- ✅ No timing
- ✅ Keyboard shortcuts
- ⚠️ Sign language (not applicable)

## 🧪 Testing

### Manual Testing

1. **Keyboard Only**

   - Unplug mouse
   - Navigate entire game with keyboard
   - All features should be accessible

2. **Screen Reader**

   - Test with NVDA (Windows) or VoiceOver (Mac)
   - All content should be announced
   - Navigation should be logical

3. **High Contrast**

   - Enable high contrast mode in OS
   - All elements should remain visible
   - Borders should be enhanced

4. **Reduced Motion**
   - Enable reduced motion in OS
   - Animations should be minimal
   - No motion sickness triggers

### Automated Testing

```bash
# Install axe-core for accessibility testing
npm install -D @axe-core/cli

# Run accessibility audit
axe http://localhost:8000 --tags wcag2a,wcag2aa
```

## 💡 Tips for Players

### For Keyboard Users

- Learn the shortcuts (press **?**)
- Use Tab to explore the interface
- Enter/Space activates buttons
- ESC closes any dialog

### For Screen Reader Users

- Navigate by headings (H key in NVDA)
- Use list navigation for inventory
- Status updates are announced automatically
- Progress bars announce values

### For Low Vision Users

- Zoom in (Ctrl/Cmd +)
- Enable high contrast mode
- Use browser's reader mode if needed
- Stats have both visual and text indicators

### For Motion Sensitivity

- Enable reduced motion in OS settings
- Animations will be minimal
- No flashing or strobing
- Smooth, predictable transitions

## 🔮 Future Enhancements

Potential accessibility improvements:

- [ ] Customizable keyboard shortcuts
- [ ] Adjustable text size in-game
- [ ] Color blind modes
- [ ] Audio cues for events
- [ ] Haptic feedback (mobile)
- [ ] Voice commands
- [ ] Simplified UI mode
- [ ] Tutorial mode with extra guidance

## 📚 Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)

---

**Making games accessible makes them better for everyone!** 🎮♿
