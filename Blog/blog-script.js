/* =====================================================
   BLOG PAGES - JAVASCRIPT (DEBUG VERSION)
   Image Gallery with Lightbox Modal
   ===================================================== */

// =====================================================
// INITIALIZATION & DEBUG LOGGING
// =====================================================

console.log('%c=== BLOG SCRIPT LOADED ===', 'color: #6366f1; font-weight: bold; font-size: 14px;');
console.log('📍 Current URL:', window.location.href);
console.log('📝 Script execution time:', new Date().toLocaleTimeString());

// =====================================================
// HARDCODED IMAGE DATA
// These are manually defined paths - verified to exist
// =====================================================

const BLOG_IMAGES = {
    'Chennai_D3_28-03-2026': [
        './Chennai_D3_28-03-2026/1.jpg',
        './Chennai_D3_28-03-2026/2.jpg',
        './Chennai_D3_28-03-2026/3.jpg',
        './Chennai_D3_28-03-2026/4.jpg',
        './Chennai_D3_28-03-2026/5.jpg',
        './Chennai_D3_28-03-2026/6.jpg'
    ],
    'Clay_Club_Chennai_NominationDay_29-03-2026': [
        './Clay_Club_Chennai_NominationDay_29-03-2026/1.jpg',
        './Clay_Club_Chennai_NominationDay_29-03-2026/2.jpg',
        './Clay_Club_Chennai_NominationDay_29-03-2026/3.jpg',
        './Clay_Club_Chennai_NominationDay_29-03-2026/4.jpg',
        './Clay_Club_Chennai_NominationDay_29-03-2026/5.jpg',
        './Clay_Club_Chennai_NominationDay_29-03-2026/6.jpg'
    ],
    'Pattimandram_18-10-2025': [
        './Pattimandram_18-10-2025/Screenshot 2026-03-31 093440.png'
    ]
};

console.log('✅ Image configuration loaded');
console.log('Available events:', Object.keys(BLOG_IMAGES));

// =====================================================
// LOAD GALLERY IMAGES
// =====================================================

function loadGalleryImages(folderName) {
    console.log('%c--- START: loadGalleryImages() ---', 'color: #10b981; font-weight: bold;');
    console.log('Requested folder:', folderName);
    
    // Step 1: Find gallery grid element
    const galleryGrid = document.getElementById('galleryGrid');
    console.log('Step 1 - Gallery grid element:', galleryGrid ? '✅ FOUND' : '❌ NOT FOUND');
    
    if (!galleryGrid) {
        console.error('❌ FATAL: Gallery grid with id="galleryGrid" not found in DOM');
        console.error('Cannot proceed without gallery container');
        return;
    }
    
    // Step 2: Get images for this event
    const images = BLOG_IMAGES[folderName];
    console.log('Step 2 - Images for', folderName, ':', images);
    
    if (!images || images.length === 0) {
        console.error(`❌ No images defined for: ${folderName}`);
        galleryGrid.innerHTML = '<p style="padding: 20px; color: #888;">No images available for this event</p>';
        return;
    }
    
    console.log(`✅ Found ${images.length} images to load`);
    
    // Step 3: Clear and prepare gallery
    galleryGrid.innerHTML = '';
    console.log('Step 3 - Gallery cleared, ready for images');
    
    // Step 4: Create gallery items
    let successCount = 0;
    let failureCount = 0;
    
    images.forEach((imagePath, index) => {
        console.log(`\n📷 Creating gallery item ${index + 1}/${images.length}`);
        console.log(`   Path: ${imagePath}`);
        
        try {
            // Create container
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.style.cursor = 'pointer';
            galleryItem.style.position = 'relative';
            
            // Create image
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = `Event photo ${index + 1}`;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.display = 'block';
            
            // Log when image loads
            img.addEventListener('load', () => {
                console.log(`   ✅ Loaded successfully`);
                successCount++;
            }, { once: true });
            
            // Log when image fails
            img.addEventListener('error', (e) => {
                console.error(`   ❌ FAILED TO LOAD`);
                console.error(`   URL attempted: ${imagePath}`);
                console.error(`   Error details:`, e);
                failureCount++;
                img.alt = 'Failed to load image';
                img.style.backgroundColor = '#fee';
                img.style.color = '#c00';
                img.style.display = 'flex';
                img.style.alignItems = 'center';
                img.style.justifyContent = 'center';
                img.textContent = '❌ Failed';
            }, { once: true });
            
            // Create overlay
            const overlay = document.createElement('div');
            overlay.className = 'gallery-overlay';
            overlay.innerHTML = '<i class="fas fa-expand"></i>';
            
            // Assemble
            galleryItem.appendChild(img);
            galleryItem.appendChild(overlay);
            
            // Add click handler
            galleryItem.addEventListener('click', function(e) {
                console.log(`Clicked image ${index + 1}`);
                openLightbox(imagePath, index, images, folderName);
            });
            
            // Add to DOM
            galleryGrid.appendChild(galleryItem);
            console.log(`   ✅ Item added to DOM`);
            
        } catch (err) {
            console.error(`   ❌ Error creating gallery item:`, err);
            failureCount++;
        }
    });
    
    console.log(`\n%c✅ Gallery load complete: ${successCount} success, ${failureCount} failures`, 
                successCount === images.length ? 'color: #10b981; font-weight: bold;' : 'color: #f59e0b; font-weight: bold;');
    console.log('%c--- END: loadGalleryImages() ---\n', 'color: #10b981; font-weight: bold;');
}

// =====================================================
// LIGHTBOX FUNCTIONS
// =====================================================

function openLightbox(imagePath, currentIndex, images, folderName) {
    console.log('Opening lightbox:', { imagePath, currentIndex, total: images.length });
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    
    if (!lightbox || !lightboxImage) {
        console.error('❌ Lightbox elements not found');
        return;
    }
    
    lightboxImage.src = imagePath;
    lightbox.classList.add('active');
    lightbox.dataset.currentIndex = currentIndex;
    lightbox.dataset.folderName = folderName;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function nextImage() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    const currentIndex = parseInt(lightbox.dataset.currentIndex) || 0;
    const folderName = lightbox.dataset.folderName;
    const images = BLOG_IMAGES[folderName] || [];
    
    if (images.length === 0) return;
    
    const nextIndex = (currentIndex + 1) % images.length;
    const lightboxImage = document.getElementById('lightboxImage');
    
    if (lightboxImage) {
        lightboxImage.src = images[nextIndex];
        lightbox.dataset.currentIndex = nextIndex;
    }
}

function prevImage() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    const currentIndex = parseInt(lightbox.dataset.currentIndex) || 0;
    const folderName = lightbox.dataset.folderName;
    const images = BLOG_IMAGES[folderName] || [];
    
    if (images.length === 0) return;
    
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    const lightboxImage = document.getElementById('lightboxImage');
    
    if (lightboxImage) {
        lightboxImage.src = images[prevIndex];
        lightbox.dataset.currentIndex = prevIndex;
    }
}

// =====================================================
// INITIALIZE LIGHTBOX EVENTS
// =====================================================

function initializeLightbox() {
    console.log('Initializing lightbox events...');
    
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightbox = document.getElementById('lightbox');
    
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
    if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
    
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) closeLightbox();
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') prevImage();
        else if (e.key === 'ArrowRight') nextImage();
        else if (e.key === 'Escape') closeLightbox();
    });
    
    console.log('✅ Lightbox events initialized');
}

// =====================================================
// MAIN INITIALIZATION - RUN ON DOM READY
// =====================================================

function initializeBlogPage() {
    console.log('%c--- BLOG PAGE INITIALIZATION ---', 'color: #8b5cf6; font-weight: bold; font-size: 12px;');
    
    // Check 1: DOM is ready
    console.log('✅ DOM ready, starting initialization');
    
    // Check 2: Event folder is set
    console.log('Checking window.eventFolder...');
    if (window.eventFolder) {
        console.log(`✅ Event folder set: ${window.eventFolder}`);
    } else {
        console.error('❌ CRITICAL: window.eventFolder is NOT SET');
        console.error('The HTML should set this BEFORE loading blog-script.js');
        console.error('Check your <script> tag order in the HTML file');
        return;
    }
    
    // Check 3: Gallery grid exists
    const galleryGrid = document.getElementById('galleryGrid');
    console.log('Gallery grid element:', galleryGrid ? '✅ FOUND' : '❌ NOT FOUND');
    
    if (!galleryGrid) {
        console.error('❌ Cannot find #galleryGrid element');
        return;
    }
    
    // Check 4: Lightbox exists
    const lightbox = document.getElementById('lightbox');
    console.log('Lightbox element:', lightbox ? '✅ FOUND' : '❌ NOT FOUND');
    
    // Initialize
    console.log('\nStarting initialization...');
    initializeLightbox();
    loadGalleryImages(window.eventFolder);
    
    // Show test container
    const testContainer = document.getElementById('testImageContainer');
    if (testContainer) {
        testContainer.style.display = 'block';
        console.log('✅ Test image container displayed');
    }
    
    console.log('%c--- INITIALIZATION COMPLETE ---\n', 'color: #8b5cf6; font-weight: bold; font-size: 12px;');
}

// =====================================================
// RUN ON DOM READY
// =====================================================

if (document.readyState === 'loading') {
    console.log('DOM still loading, waiting for DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', initializeBlogPage);
} else {
    console.log('DOM already loaded, initializing immediately...');
    initializeBlogPage();
}

// =====================================================
// THEME SYNC
// =====================================================

function syncTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        if (themeToggle) {
            themeToggle.innerHTML = isDarkMode 
                ? '<i class="fas fa-sun"></i>' 
                : '<i class="fas fa-moon"></i>';
        }
    });
}

if (document.readyState !== 'loading') {
    syncTheme();
} else {
    document.addEventListener('DOMContentLoaded', syncTheme);
}
