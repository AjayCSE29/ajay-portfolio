# 🖼️ Blog Gallery - Debug Instructions

## ✅ Quick Start Test

### Step 1: Open Blog Page
1. **DO NOT** open via "file://" by double-clicking
2. **INSTEAD** use Terminal to run Flask server:
   ```powershell
   cd c:\Users\Ajay\portfolio
   python app.py
   ```
3. Open browser to: `http://localhost:5000/Blog/chennai-d3.html`

### Step 2: Check Console Output
1. Open DevTools: Press `F12`
2. Go to **Console** tab
3. Look for these messages:

**EXPECTED - Shows everything is working ✅**
```
=== BLOG SCRIPT LOADED === (in blue)
📍 Current URL: http://localhost:5000/Blog/chennai-d3.html
✅ Image configuration loaded
Available events: ["Chennai_D3_28-03-2026", "Clay_Club_Chennai_NominationDay_29-03-2026"]
--- BLOG PAGE INITIALIZATION --- (in purple)
✅ DOM ready, starting initialization
✅ Event folder set: Chennai_D3_28-03-2026
✅ Gallery grid element: FOUND
✅ Lightbox element: FOUND
--- START: loadGalleryImages() --- (in green)
Requested folder: Chennai_D3_28-03-2026
Step 1 - Gallery grid element: ✅ FOUND
Step 2 - Images for Chennai_D3_28-03-2026: Array(6) [...]
✅ Found 6 images to load
📷 Creating gallery item 1/6
   Path: ./Chennai_D3_28-03-2026/1.jpg
   ✅ Loaded successfully
   ✅ Item added to DOM
[... more items ...]
✅ Gallery load complete: 6 success, 0 failures
--- INITIALIZATION COMPLETE ---
```

---

## ❌ Troubleshooting

### Problem: "Event folder not found"
**Symptom:** Console shows:
```
❌ EVENT FOLDER NOT SET
```

**Cause:** HTML didn't set `window.eventFolder` before loading script

**Fix:** In blog HTML file, check script order:
```html
<!-- ✅ CORRECT ORDER -->
<script>
    window.eventFolder = 'Chennai_D3_28-03-2026';  <!-- SET FIRST -->
</script>
<script src="blog-script.js"></script>  <!-- LOAD SECOND -->

<!-- ❌ WRONG ORDER - script loaded first -->
<script src="blog-script.js"></script>
<script>
    window.eventFolder = 'Chennai_D3_28-03-2026';  <!-- Too late!
</script>
```

---

### Problem: "Gallery grid element not found"
**Symptom:** Console shows:
```
❌ FATAL: Gallery grid with id="galleryGrid" not found in DOM
```

**Cause:** HTML is missing the gallery container

**Fix:** Add this to your HTML:
```html
<div class="gallery-grid" id="galleryGrid">
    <!-- Images load here -->
</div>
```

---

### Problem: "Images not appearing"
**Symptom:** Gallery section visible but no images

**First Check:** Look for test image
- If you see a small test image, paths work ✓
- If NO test image, it's a path problem

**Check Console for:**
```
❌ FAILED TO LOAD
URL attempted: ./Chennai_D3_28-03-2026/1.jpg
```

**Possible Causes:**
1. Images don't exist at that path
2. Image file names are wrong (should be 1.jpg through 6.jpg)
3. Folder names are wrong

**Fix:** Verify images exist
```powershell
# In PowerShell, navigate to Blog folder
cd c:\Users\Ajay\portfolio\Blog\Chennai_D3_28-03-2026

# List files
ls  # Should show: 1.jpg, 2.jpg, 3.jpg, 4.jpg, 5.jpg, 6.jpg
```

---

### Problem: "Lightbox doesn't work"
**Symptom:** Click image but nothing happens

**Check Console for:**
```
Clicked image 1
Opening lightbox: {...}
❌ Lightbox elements not found
```

**Fix:** Verify HTML has lightbox modal:
```html
<div class="lightbox" id="lightbox">
    <div class="lightbox-content">
        <img id="lightboxImage" src="" alt="">
        <button id="lightboxClose">&times;</button>
        <button id="lightboxPrev">&larr;</button>
        <button id="lightboxNext">&rarr;</button>
    </div>
</div>
```

---

## 🔍 Manual Path Testing

If images aren't loading, test the actual paths:

### In Console (F12 > Console):
```javascript
// Check if images can be found
fetch('./Chennai_D3_28-03-2026/1.jpg')
  .then(r => console.log('✅ Image found:', r.status))
  .catch(e => console.error('❌ Image NOT found:', e));

// Check event folder variable
console.log('Event folder:', window.eventFolder);

// Check image array
console.log('Images:', BLOG_IMAGES);
```

---

## 📋 Verification Checklist

- [ ] Running Flask server (not file://)
- [ ] Website opens at `http://localhost:5000/...`
- [ ] Console shows "=== BLOG SCRIPT LOADED ===" in blue
- [ ] Console shows "✅ Event folder set:"
- [ ] Console shows "✅ Found 6 images to load"
- [ ] Test image container visible with small image
- [ ] Gallery grid shows 6 thumbnails
- [ ] Clicking thumbnail opens lightbox
- [ ] Arrow keys navigate images
- [ ] ESC closes lightbox

---

## 🆘 Still Not Working?

### Capture Full Console Log
1. Open Console (F12)
2. Right-click console
3. "Save as..." → save to file
4. Share the file for analysis

### Check File Structure
```
c:\Users\Ajay\portfolio\
├── Blog\
│   ├── blog-script.js
│   ├── blog-styles.css
│   ├── chennai-d3.html
│   ├── clay-club.html
│   ├── Chennai_D3_28-03-2026\
│   │   ├── 1.jpg ✓
│   │   ├── 2.jpg ✓
│   │   ├── 3.jpg ✓
│   │   ├── 4.jpg ✓
│   │   ├── 5.jpg ✓
│   │   └── 6.jpg ✓
│   └── Clay_Club_Chennai_NominationDay_29-03-2026\
│       ├── 1.jpg ✓
│       ├── 2.jpg ✓
│       ├── 3.jpg ✓
│       ├── 4.jpg ✓
│       ├── 5.jpg ✓
│       └── 6.jpg ✓
├── index.html
├── styles.css
├── script.js
└── app.py
```

---

## 🎯 Success Indicators

✅ Everything working when you see:
- Gallery heading visible
- 6 image thumbnails in grid
- Test image visible in gray box
- Hover shows expand icon overlay
- Click opens full-screen lightbox
- Console shows all success messages (✅)
- No errors in console (no ❌)

---

## 🚀 Once Working Locally

To deploy on Vercel:
1. Push code to GitHub
2. Connect to Vercel
3. All paths work the same way
4. No changes needed!

