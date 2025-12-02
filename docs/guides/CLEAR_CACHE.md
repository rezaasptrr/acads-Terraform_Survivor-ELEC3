# 🔄 How to Clear Browser Cache and See Changes

## The Problem

Your browser is caching old files, so you don't see the new changes even though they're in the code!

## ✅ Solutions (Try in Order)

### 1. Hard Refresh (Easiest)

**Windows:**

```
Ctrl + F5
or
Ctrl + Shift + R
```

**Mac:**

```
Cmd + Shift + R
```

This forces the browser to reload everything fresh!

---

### 2. Clear Cache in DevTools

1. Press **F12** to open DevTools
2. Right-click the **refresh button** (next to address bar)
3. Select **"Empty Cache and Hard Reload"**

---

### 3. Manual Cache Clear

**Chrome:**

1. Press **Ctrl + Shift + Delete**
2. Select "Cached images and files"
3. Click "Clear data"
4. Refresh page

**Firefox:**

1. Press **Ctrl + Shift + Delete**
2. Select "Cache"
3. Click "Clear Now"
4. Refresh page

---

### 4. Incognito/Private Mode

**Chrome:**

```
Ctrl + Shift + N
```

**Firefox:**

```
Ctrl + Shift + P
```

Then open: http://localhost:8000/src/frontend/standalone.html

Fresh session with no cache!

---

### 5. Disable Cache (For Development)

1. Open DevTools (F12)
2. Go to **Network** tab
3. Check **"Disable cache"**
4. Keep DevTools open while developing

---

### 6. Add Cache Buster to URL

```
http://localhost:8000/src/frontend/standalone.html?v=2
```

Change the number each time you want fresh files!

---

## 🧪 How to Verify Changes Loaded

### Check These Features:

1. **Press S** - Should see beautiful card-based status
2. **Press C** - Should see Bandage in crafting menu
3. **Craft Bandage** - Should heal +25 HP
4. **Look at inventory** - Only food items should glow on hover

### Console Check:

1. Press **F12**
2. Go to **Console** tab
3. Type: `window.game`
4. Should see the game object

### Network Check:

1. Press **F12**
2. Go to **Network** tab
3. Refresh page
4. Look for:
   - `standalone.html` - Should show 200 status
   - `style.css` - Should show 200 status
   - Check file sizes match

---

## 🎯 Quick Fix Command

**Just do this:**

```
1. Close browser completely
2. Reopen browser
3. Go to: http://localhost:8000/src/frontend/standalone.html
4. Press Ctrl + F5
```

**This should work 99% of the time!**

---

## 🐛 Still Not Working?

### Check Server:

```bash
# Make sure server is running
# You should see this in terminal:
# Serving at: http://localhost:8000
```

### Check Files Were Saved:

```bash
# Check if changes are in the file
grep -n "bandage" src/frontend/standalone.html
# Should show bandage code
```

### Try Different Browser:

- Chrome not working? Try Firefox
- Firefox not working? Try Edge
- Different browser = fresh cache

---

## 💡 Pro Tip

**For development, always:**

1. Keep DevTools open (F12)
2. Enable "Disable cache" in Network tab
3. Use Incognito mode
4. Hard refresh after changes

**This prevents cache issues!**

---

## ✅ Checklist

- [ ] Server is running (localhost:8000)
- [ ] Hard refresh (Ctrl + F5)
- [ ] DevTools cache disabled
- [ ] Tried incognito mode
- [ ] Closed and reopened browser

**If all checked and still not working, there might be a code error. Check browser console (F12) for errors!**
