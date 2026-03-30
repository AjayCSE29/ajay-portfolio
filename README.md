# 🚀 Ajay's Personal Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. Designed to showcase projects, skills, and attract recruiters and internship opportunities.

## ✨ Features

- **Responsive Design**: Fully responsive on mobile, tablet, and desktop devices
- **Dark/Light Mode**: Toggle between dark and light themes with preference persistence
- **Smooth Animations**: Professional transitions and animations throughout
- **Mobile Menu**: Hamburger menu for mobile navigation
- **Smooth Scrolling**: Smooth scroll navigation between sections
- **Project Showcase**: Animated project cards with links to GitHub and demos
- **Skills Grid**: Categorized skills display with icons
- **Timeline Experience**: Beautiful timeline for experience and achievements
- **Contact Form**: Simple contact form with validation
- **Scroll to Top**: Floating button to quickly return to top
- **Typing Effect**: Dynamic typing animation in hero section
- **Social Links**: Quick access to social media profiles

## 📁 Project Structure

```
portfolio/
├── index.html       # Main HTML file with all sections
├── styles.css       # Complete CSS styling with animations
├── script.js        # JavaScript for interactivity
├── resume.pdf       # Resume file (create your own)
└── README.md        # Project documentation
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling, animations, and responsive design
- **JavaScript**: ES6+, DOM manipulation, local storage
- **Font Awesome**: Icon library (via CDN)
- **No frameworks**: Pure vanilla JavaScript (lightweight)

## 📋 Sections Included

1. **Hero Section**
   - Welcome message with dynamic typing effect
   - Call-to-action buttons
   - Animated avatar

2. **About Me**
   - Personal introduction
   - Highlight features (Full-Stack, ML, Systems, Linux)
   - Profile image placeholder

3. **Featured Projects**
   - Litter Detection using ML
   - Lunar Lander (C++ SDL2 Game)
   - Ajax Engine (Web Project)
   - Each with description, tech stack, and links

4. **Skills & Technologies**
   - Languages (Python, C++, JavaScript, Java)
   - Frameworks & Libraries (React, TensorFlow, OpenCV, Node.js)
   - Tools & Platforms (Git, GitHub, Linux, CLI)

5. **Experience & Achievements**
   - Timeline of experiences
   - Achievement badges
   - Professional highlights

6. **Contact Section**
   - Contact information
   - Social media links
   - Contact form with validation
   - Resume download button

7. **Footer**
   - Copyright information
   - Built with notice

## 🎨 Color Scheme

### Light Mode
- Primary Background: `#ffffff`
- Secondary Background: `#f8f9fa`
- Accent Color: `#6366f1` (Indigo)
- Text Primary: `#212529`
- Text Secondary: `#6c757d`

### Dark Mode
- Primary Background: `#1a1a2e`
- Secondary Background: `#16213e`
- Accent Color: `#6366f1` (Indigo)
- Text Primary: `#eaeaea`
- Text Secondary: `#b0b0b0`

## 🚀 Getting Started

### 1. Open in Browser
Simply open `index.html` in your web browser. No server required!

```bash
# On Windows (PowerShell)
Start-Process index.html

# On Mac
open index.html

# On Linux
xdg-open index.html
```

### 2. Customize the Website

Edit these sections in `index.html`:

```html
<!-- Update your name -->
<a href="#home">Ajay<span class="accent">.</span></a>

<!-- Update email -->
<a href="mailto:ajay@example.com">ajay@example.com</a>

<!-- Update project links -->
<a href="https://github.com/yourusername" target="_blank">
    <i class="fab fa-github"></i> GitHub
</a>

<!-- Update social links -->
<a href="https://linkedin.com/in/yourprofile" target="_blank">
    <i class="fab fa-linkedin"></i>
</a>
```

### 3. Add Your Resume

1. Create a `resume.pdf` file
2. Place it in the same folder as `index.html`
3. The download button will work automatically

### 4. Update Project Information

In the Projects section, update:
- Project titles
- Descriptions
- Technology tags
- GitHub links
- Demo links

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🎭 Theme Customization

Change accent color in `styles.css`:

```css
:root {
    --accent-color: #6366f1;      /* Change this */
    --accent-hover: #4f46e5;      /* And this */
}
```

## ⌨️ Keyboard Shortcuts

- `Esc` - Close mobile menu
- Smooth scroll on all anchor links

## 🔧 JavaScript Features

### Implemented in script.js:

1. **Dark Mode Toggle**
   - Saves preference to localStorage
   - Smooth theme transition

2. **Mobile Menu**
   - Hamburger menu toggle
   - Animated menu icon
   - Auto-close on link click

3. **Smooth Scrolling**
   - Active navigation highlighting
   - Smooth page scroll

4. **Contact Form**
   - Form validation
   - Success/error messages
   - Auto-clear on submit

5. **Typing Effect**
   - Dynamic text animation
   - Multiple rotating phrases

6. **Scroll to Top**
   - Floating button
   - Appears after scrolling 300px

7. **Animations**
   - Intersection Observer for fade-ins
   - Hover effects
   - Parallax effects on hero

## 📊 Performance

- ⚡ Lightweight (No heavy frameworks)
- 🎯 Fast load time
- 🔄 Smooth animations at 60 FPS
- 📦 Minimal dependencies (only Font Awesome CDN)

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## 📝 Customization Guide

### Colors
Edit in `styles.css` root variables

### Fonts
Change in `styles.css`:
```css
body {
    font-family: 'Your Font', sans-serif;
}
```

### Animations Speed
Modify `--transition` variable in CSS

### Content
Edit text directly in `index.html`

## 🎯 SEO Optimization

- Semantic HTML5 tags
- Meta tags for viewport and charset
- Structured content sections
- Clean URL structure
- Descriptive link text

## 🔒 Privacy & Security

- No sensitive data stored
- Contact form doesn't send emails (local validation only)
- No external dependencies except Font Awesome CDN
- HTTPS ready

## 📚 Resources Used

- [Font Awesome Icons](https://fontawesome.com/)
- [CSS Tricks](https://css-tricks.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

## 🚀 Deployment

### Deploy to GitHub Pages:

1. Create a repository named `username.github.io`
2. Push all files to main branch
3. Your site is live at `https://username.github.io`

### Deploy to Netlify:

1. Drag and drop the portfolio folder
2. Your site goes live instantly
3. Get a custom domain

### Deploy to Vercel:

1. Push to GitHub
2. Connect repository to Vercel
3. Auto-deploy on push

## 🤝 Contributing

This is your personal portfolio. Customize it however you like!

## 📧 Support

For questions or improvements, refer to:
- The inline comments in the code
- Font Awesome documentation
- MDN Web Docs

## 📄 License

This portfolio template is free to use and modify for personal use.

---

**Made with ❤️ by Ajay**

Last Updated: March 2026
