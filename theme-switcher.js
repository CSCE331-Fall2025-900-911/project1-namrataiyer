// Theme Switcher JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Create theme switcher button
    const themeButton = document.createElement('button');
    themeButton.id = 'theme-switcher';
    themeButton.className = 'theme-btn';
    document.body.appendChild(themeButton);
    
    // Get current theme from localStorage
    const currentTheme = localStorage.getItem('theme') || 'default';
    
    // Apply saved theme on page load
    const stylesheetLink = document.querySelector('link[rel="stylesheet"]');
    if (currentTheme === 'alt') {
        stylesheetLink.href = 'styles-alt.css';
        themeButton.textContent = 'Default Theme';
    } else {
        stylesheetLink.href = 'styles.css';
        themeButton.textContent = 'Alt Theme';
    }
    
    // Theme switcher click event
    themeButton.addEventListener('click', function() {
        const currentStylesheet = stylesheetLink.href;
        
        if (currentStylesheet.includes('styles.css')) {
            // Switch to alt theme
            stylesheetLink.href = 'styles-alt.css';
            themeButton.textContent = 'Default Theme';
            localStorage.setItem('theme', 'alt');
        } else {
            // Switch to default theme
            stylesheetLink.href = 'styles.css';
            themeButton.textContent = 'Alt Theme';
            localStorage.setItem('theme', 'default');
        }
    });
    
    // Add smooth transition effect when switching
    themeButton.addEventListener('click', function() {
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
});