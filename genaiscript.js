// Dance Career Website JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize the website
    initializeWebsite();
    
    // Add smooth scrolling to internal links
    addSmoothScrolling();
    
    // Add photo gallery interactions
    initializePhotoGallery();
    
    // Add animation effects
    addScrollAnimations();
});

/**
 * Initialize the website with basic functionality
 */
function initializeWebsite() {
    console.log('Dance Career Website Loaded');
    
    // Add a subtle entrance animation to the header
    const header = document.querySelector('header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            header.style.transition = 'opacity 1s ease, transform 1s ease';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 100);
    }
}

/**
 * Add smooth scrolling behavior to any internal links
 */
function addSmoothScrolling() {
    // If you add navigation links later, this will handle smooth scrolling
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize photo gallery interactions
 */
function initializePhotoGallery() {
    const photoPlaceholders = document.querySelectorAll('.photo-placeholder');
    
    photoPlaceholders.forEach((placeholder, index) => {
        // Add click event for future functionality
        placeholder.addEventListener('click', function() {
            handlePhotoClick(this, index + 1);
        });
        
        // Add entrance animation with staggered delay
        placeholder.style.opacity = '0';
        placeholder.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            placeholder.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            placeholder.style.opacity = '1';
            placeholder.style.transform = 'translateY(0)';
        }, 200 + (index * 50)); // Staggered animation
    });
}

/**
 * Handle photo placeholder clicks
 */
function handlePhotoClick(photoElement, photoNumber) {
    console.log(`Photo ${photoNumber} clicked`);
    
    // Add a temporary visual feedback
    photoElement.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        photoElement.style.transform = '';
    }, 150);
    
    // Here you can add functionality like:
    // - Opening a lightbox/modal
    // - Displaying photo details
    // - Loading the actual image
}

/**
 * Add scroll-based animations
 */
function addScrollAnimations() {
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('.video-section, .bio-section, .gallery-section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add CSS for the animation
    addAnimationStyles();
}

/**
 * Dynamically add animation styles
 */
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .video-section,
        .bio-section,
        .gallery-section {
            opacity: 0.8;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .video-section.animate-in,
        .bio-section.animate-in,
        .gallery-section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .photo-placeholder:hover span {
            transform: scale(1.1);
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Utility function to replace video placeholder with actual YouTube embed
 * Call this function with your YouTube video ID
 */
function embedYouTubeVideo(videoId) {
    const videoContainer = document.querySelector('.video-container');
    const placeholder = document.querySelector('.video-placeholder');
    
    if (videoContainer && placeholder && videoId) {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('frameborder', '0');
        
        // Remove placeholder and add iframe
        placeholder.remove();
        videoContainer.appendChild(iframe);
        
        console.log(`YouTube video ${videoId} embedded successfully`);
    }
}

/**
 * Utility function to replace photo placeholder with actual image
 * Call this function with the photo number (1-15) and image URL
 */
function loadPhoto(photoNumber, imageUrl, altText = '') {
    const placeholder = document.querySelector(`[data-photo="${photoNumber}"]`);
    
    if (placeholder && imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = altText || `Dance performance photo ${photoNumber}`;
        
        // Add loading behavior
        img.onload = function() {
            placeholder.innerHTML = '';
            placeholder.appendChild(img);
            placeholder.classList.add('loaded');
        };
        
        img.onerror = function() {
            console.error(`Failed to load image for photo ${photoNumber}: ${imageUrl}`);
        };
    }
}

/**
 * Utility function to update the biography section
 * Call this function with your biography text
 */
function updateBiography(bioText) {
    const bioPlaceholder = document.querySelector('.bio-placeholder');
    
    if (bioPlaceholder && bioText) {
        bioPlaceholder.innerHTML = `<p>${bioText.replace(/\n\n/g, '</p><p>')}</p>`;
        bioPlaceholder.style.fontStyle = 'normal';
        bioPlaceholder.style.textAlign = 'left';
    }
}

// Export functions for global use
window.embedYouTubeVideo = embedYouTubeVideo;
window.loadPhoto = loadPhoto;
window.updateBiography = updateBiography;