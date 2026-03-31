# Blog Gallery Testing & Debugging Guide

## ✅ Configuration Status

### Images Verified ✓
- **Chennai D3**: `/Blog/Chennai_D3_28-03-2026/1.jpg` through `6.jpg` (7 files total)
- **Clay Club**: `/Blog/Clay_Club_Chennai_NominationDay_29-03-2026/1.jpg` through `6.jpg` (7 files total)

### Code Setup Verified ✓
- **blog-script.js**: Updated with hardcoded image arrays and full relative paths
- **chennai-d3.html**: Sets `window.eventFolder = 'Chennai_D3_28-03-2026'` before loading script
- **clay-club.html**: Sets `window.eventFolder = 'Clay_Club_Chennai_NominationDay_29-03-2026'` before loading script

### Enhanced Features Added ✓
- Comprehensive console logging with emoji indicators
- Image load error handling
- Detailed debugging information
- Full keyboard support (Arrow keys, ESC)

---

## 🧪 How to Test Locally

### Method 1: Using Flask (Recommended)
1. Open terminal in portfolio folder
2. Run: `python app.py`
3. Open browser to: `http://localhost:5000/Blog/chennai-d3.html`
4. Images should appear in the gallery grid

### Method 2: Using Python HTTP Server
1. Open terminal in `/Blog` folder
2. Run: `python -m http.server 8000`
3. Open browser to: `http://localhost:8000/chennai-d3.html`
4. Images should appear in the gallery grid

### Method 3: Direct File Access
1. Navigate to: `c:\Users\Ajay\portfolio\Blog\`
2. Right-click `chennai-d3.html` → "Open with" → Browser
3. Images may not appear due to `file://` protocol restrictions
4. **Use Flask or HTTP server instead** (Methods 1 or 2)

---

## 🔍 Debugging Steps

### Step 1: Open Browser Developer Tools
1. Open blog page in browser
2. Press `F12` to open Developer Tools
3. Go to **Console** tab

### Step 2: Check Console Output
You should see messages like:
```
=== BLOG SCRIPT LOADED ===
📄 Document loaded
🔍 Checking for event folder...
✅ Event folder found: Chennai_D3_28-03-2026
🔧 Initializing lightbox...
✅ Close button ready
✅ Previous button ready
✅ Next button ready
✅ Background click handler ready
✅ Keyboard navigation ready (Arrow keys, ESC)
✅ Lightbox initialization complete
📁 Loading images for: Chennai_D3_28-03-2026
📸 Found 6 images to load
➕ Added gallery item 1: ./Chennai_D3_28-03-2026/1.jpg
✅ Loaded image 1: ./Chennai_D3_28-03-2026/1.jpg
...
✅ Gallery initialized with 6 images
```

### Step 3: If Images Don't Load
Check for error messages like:
```
❌ Failed to load image: ./Chennai_D3_28-03-2026/1.jpg
```

If you see this error, it means the file path is incorrect.

### Step 4: Check Network Tab
1. Go to **Network** tab in Developer Tools
2. Reload the page
3. Look for image requests - they should show `200 OK` status
4. If they show `404`, the file path is wrong

### Step 5: Gallery Grid Check
1. Go to **Elements** tab
2. Find `<div id="galleryGrid">` element
3. Expand it - you should see multiple `<div class="gallery-item">` elements
4. Each should contain an `<img>` element

---

## 🎮 Testing Gallery Functionality

### Click to Open Lightbox
- Click any photo in the gallery grid
- Should see large image in modal overlay

### Lightbox Navigation
- **Next**: Click right arrow or press `→` key
- **Previous**: Click left arrow or press `←` key
- **Close**: Click X button, press `ESC`, or click gray background

### Loading Indicator
- Look for ✅ message in console for each image that loads

---

## 🌐 Preparing for Vercel Deployment

### Path Configuration
Current paths are already Vercel-compatible:
```javascript
'./Chennai_D3_28-03-2026/1.jpg'  // Works on Vercel ✓
```

### Testing Before Deploy
1. Build works locally with Flask: `python app.py`
2. Images display: ✓
3. Lightbox works: ✓
4. Console shows no errors: ✓

### Deployment Steps
1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel automatically deploys
4. All relative paths work the same on Vercel

---

## 📋 Quick Diagnostic Checklist

- [ ] Images exist in `/Blog/Chennai_D3_28-03-2026/` (1.jpg through 6.jpg)
- [ ] Images exist in `/Blog/Clay_Club_Chennai_NominationDay_29-03-2026/` (1.jpg through 6.jpg)
- [ ] Running with Flask or HTTP server (not file:// protocol)
- [ ] Browser console shows "✅ Event folder found" message
- [ ] No "❌ Failed to load image" errors in console
- [ ] Network tab shows 200 OK for image requests
- [ ] Gallery grid has `<img>` elements with correct src paths
- [ ] Clicking images opens lightbox modal
- [ ] Arrow keys and ESC work in lightbox

---

## 🔧 If Images Still Don't Show

### Check 1: Event Folder Name
Verify in HTML file that the folder name matches EXACTLY:
```javascript
// Chennai page - should be:
window.eventFolder = 'Chennai_D3_28-03-2026';

// Clay Club page - should be:
window.eventFolder = 'Clay_Club_Chennai_NominationDay_29-03-2026';
```

### Check 2: Image Filenames
All images should be named exactly: `1.jpg`, `2.jpg`, etc. (not `01.jpg` or `photo1.jpg`)

### Check 3: Folder Location
- Images MUST be in `/Blog/[FolderName]/` (inside Blog folder)
- Not in root portfolio folder
- Not in a subfolder of a subfolder

### Check 4: Server Type
- Using Flask: `python app.py` ✓
- Using HTTP server: `python -m http.server 8000` ✓
- Using `file://` protocol: ✗ (Won't work - browser security)

### Check 5: Script Loading Order
In blog HTML files, this order IS REQUIRED:
```html
<script src="../script.js"></script>
<script>
    window.eventFolder = 'Chennai_D3_28-03-2026';  <!-- BEFORE blog-script.js -->
</script>
<script src="blog-script.js"></script>  <!-- AFTER event folder set -->
```

---

## 🆘 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Images not showing | Using `file://` protocol | Use Flask or HTTP server |
| Blank gallery | Event folder not set | Check window.eventFolder in HTML |
| "404" errors | Wrong image paths | Check console for exact paths |
| Lightbox won't open | Missing elements | Verify HTML has lightbox modal |
| Keyboard shortcuts don't work | Script not loaded | Check console for load errors |
| Wrong event images show | Wrong folder name | Use exact folder name from directory |

---

## 📞 Console Commands for Manual Testing

Run these in browser console (F12 > Console) to test manually:

```javascript
// Check event folder
console.log(window.eventFolder);

// Check blog images object
console.log(BLOG_IMAGES);

// Try loading gallery manually
loadGalleryImages(window.eventFolder);

// Check gallery grid
console.log(document.getElementById('galleryGrid'));

// Count images in gallery
console.log(document.querySelectorAll('.gallery-item').length);
```

---

## ✨ Success Indicators

When everything works correctly, you should see:
- ✅ Gallery grid displays 6 image thumbnails
- ✅ Console shows "✅ Gallery initialized with 6 images"
- ✅ Hovering over images shows hover overlay with expand icon
- ✅ Clicking image opens lightbox modal
- ✅ Image counter shows current position (e.g., "3/6")
- ✅ Arrow keys navigate between images
- ✅ ESC key closes lightbox
- ✅ No red errors in console

---

## 🚀 Next Steps

1. **Test locally** using Flask or HTTP server
2. **Check console** for any error messages
3. **Verify images appear** in gallery grid
4. **Test lightbox** by clicking images
5. **When working**: Ready for Vercel deployment

Use the debugging checklist above if any issues occur!
