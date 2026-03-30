/* =====================================================
   PORTFOLIO WEBSITE - JAVASCRIPT
   ===================================================== */

// =====================================================
// 1. DARK MODE / THEME TOGGLE
// =====================================================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeIcon();
}

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    updateThemeIcon();
});

// Update theme icon
function updateThemeIcon() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.innerHTML = isDarkMode 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
}

// =====================================================
// 2. MOBILE MENU TOGGLE
// =====================================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(10px, 10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        // Reset hamburger icon
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// =====================================================
// 3. SMOOTH SCROLLING & ACTIVE NAV LINK
// =====================================================

window.addEventListener('scroll', () => {
    let current = '';
    
    // Check which section is in view
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// =====================================================
// 4. CONTACT FORM HANDLING
// =====================================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (name && email && subject && message) {
            // Send form data to backend /contact endpoint
            fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, subject, message })
            })
            .then(async (res) => {
                if (!res.ok) throw new Error('Network response was not ok');
                const data = await res.json();
                showFormMessage(data.message || 'Message sent successfully! Thank you for reaching out.', 'success');
                contactForm.reset();
                setTimeout(() => { formMessage.style.display = 'none'; }, 5000);
            })
            .catch((err) => {
                console.error('Error sending contact form:', err);
                showFormMessage('Failed to send message. Please try again later.', 'error');
            });
        } else {
            showFormMessage('Please fill in all fields.', 'error');
        }
    });
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
}

// =====================================================
// 5. SCROLL TO TOP BUTTON (Optional but useful)
// =====================================================

const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: var(--accent-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    z-index: 999;
    font-size: 20px;
    transition: all 0.3s ease;
    box-shadow: var(--shadow-lg);
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
        scrollToTopBtn.style.alignItems = 'center';
        scrollToTopBtn.style.justifyContent = 'center';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Scroll to top on click
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =====================================================
// 6. TYPING EFFECT (Hero Section)
// ===================================================== 

const typingText = document.querySelector('.typing-text');
const words = [
    'Computer Science Student & Developer',
    'Full-Stack Developer',
    'Machine Learning Enthusiast',
    'Problem Solver',
    'Tech Innovator'
];

let wordIndex = 0;
let charIndex = 0;
let currentWord = '';
let isDeleting = false;

function typeEffect() {
    // Set the current word
    if (wordIndex < words.length) {
        currentWord = words[wordIndex];
    }
    
    // Check if deleting
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }
    
    // Update the text
    typingText.textContent = currentWord.substring(0, charIndex);
    
    // Set typing speed
    let typeSpeed = isDeleting ? 50 : 100;
    
    // If word is complete
    if (!isDeleting && charIndex === currentWord.length) {
        // Pause before deleting
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex++;
        
        // Loop back to first word
        if (wordIndex >= words.length) {
            wordIndex = 0;
        }
        
        typeSpeed = 500;
    }
    
    setTimeout(typeEffect, typeSpeed);
}

// Start typing effect when page loads
if (typingText) {
    typeEffect();
}

// =====================================================
// 7. INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================================== 

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `slideInLeft 0.8s ease forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// =====================================================
// 8. PROJECT CARD HOVER EFFECTS
// ===================================================== 

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// =====================================================
// 9. PARALLAX EFFECT (Optional - for hero section)
// ===================================================== 

const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('mousemove', (e) => {
        const avatar = document.querySelector('.avatar');
        if (avatar) {
            const x = (e.clientX - window.innerWidth / 2) / 100;
            const y = (e.clientY - window.innerHeight / 2) / 100;
            
            avatar.style.transform = `translateY(-20px) perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
        }
    });
}

// =====================================================
// 10. SKILL ITEMS ANIMATION
// ===================================================== 

const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.style.animation = `slideInLeft 0.6s ease forwards`;
});

// =====================================================
// 11. HIGHLIGHT ITEMS STAGGER ANIMATION
// ===================================================== 

const highlightItems = document.querySelectorAll('.highlight-item');
highlightItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.15}s`;
    item.style.animation = `slideInLeft 0.6s ease forwards`;
});

// =====================================================
// 12. COUNTER ANIMATION (Optional - for achievements)
// ===================================================== 

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// =====================================================
// 13. UTILITY FUNCTIONS
// ===================================================== 

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({behavior: 'smooth'});
            }
        });
    });
}

// =====================================================
// 14. PAGE LOAD ANIMATION
// ===================================================== 

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Animate elements on load
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.animation = 'fadeIn 0.8s ease';
    }
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    .scroll-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
`;
document.head.appendChild(style);

// =====================================================
// 15. PERFORMANCE OPTIMIZATION
// ===================================================== 

// Lazy loading for images (if you add images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// =====================================================
// 16. ACCESSIBILITY IMPROVEMENTS
// ===================================================== 

// Keyboard navigation for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.focus();
    }
});

console.log('Portfolio website loaded successfully! 🚀');
