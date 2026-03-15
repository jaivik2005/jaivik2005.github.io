/**
 * Living Icons Experience
 * Adds premium 3D tilt, float, and interactive glow effects to specific UI elements.
 */

class LivingIcons {
    constructor() {
        this.cards = document.querySelectorAll('.card');
        this.icons = document.querySelectorAll('.icon i, .skill-icon i');
        this.socialLinks = document.querySelectorAll('.social-link');
        
        this.init();
    }

    init() {
        // Add floating animation to icons
        this.icons.forEach((icon, index) => {
            icon.style.animation = `float ${3 + (index % 2)}s ease-in-out infinite alternate`;
            icon.style.animationDelay = `${index * 0.1}s`;
        });

        // Add 3D tilt effect to cards
        this.cards.forEach(card => {
            card.addEventListener('mousemove', this.handleTilt.bind(this));
            card.addEventListener('mouseleave', this.resetTilt.bind(this));
        });

        // Add magnetic pull to social links
        this.socialLinks.forEach(link => {
            link.addEventListener('mousemove', this.handleMagnetic.bind(this));
            link.addEventListener('mouseleave', this.resetMagnetic.bind(this));
        });

        // Insert animations into head
        this.injectStyles();
    }

    handleTilt(e) {
        const card = e.currentTarget;
        const cardRect = card.getBoundingClientRect();
        
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        const rotateX = ((mouseY / cardRect.height) * -20).toFixed(2);
        const rotateY = ((mouseX / cardRect.width) * 20).toFixed(2);
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'transform 0.1s ease';
        card.style.zIndex = '10';
        
        // Add dynamic glow following mouse
        const glowX = ((e.clientX - cardRect.left) / cardRect.width) * 100;
        const glowY = ((e.clientY - cardRect.top) / cardRect.height) * 100;
        card.style.setProperty('--mouse-x', `${glowX}%`);
        card.style.setProperty('--mouse-x', `${glowY}%`);
        
        if (!card.querySelector('.dynamic-glow')) {
            const glow = document.createElement('div');
            glow.className = 'dynamic-glow';
            card.appendChild(glow);
        }
        
        const glowElement = card.querySelector('.dynamic-glow');
        if (glowElement) {
             glowElement.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(0, 245, 255, 0.15) 0%, transparent 50%)`;
        }
    }

    resetTilt(e) {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s ease';
        card.style.zIndex = '1';
        
        const glow = card.querySelector('.dynamic-glow');
        if (glow) {
            glow.style.background = 'transparent';
        }
    }

    handleMagnetic(e) {
        const link = e.currentTarget;
        const rect = link.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distanceX = (e.clientX - centerX) * 0.3;
        const distanceY = (e.clientY - centerY) * 0.3;
        
        link.style.transform = `translate(${distanceX}px, ${distanceY}px) scale(1.1)`;
        link.style.transition = 'transform 0.1s cubic-bezier(0.23, 1, 0.32, 1)';
        
        const icon = link.querySelector('i');
        if (icon) {
            icon.style.transform = `translate(${distanceX * 0.5}px, ${distanceY * 0.5}px)`;
            icon.style.transition = 'transform 0.1s cubic-bezier(0.23, 1, 0.32, 1)';
        }
    }

    resetMagnetic(e) {
        const link = e.currentTarget;
        link.style.transform = 'translate(0px, 0px) scale(1)';
        link.style.transition = 'transform 0.5s elastic';
        
        const icon = link.querySelector('i');
        if (icon) {
            icon.style.transform = 'translate(0px, 0px)';
            icon.style.transition = 'transform 0.5s elastic';
        }
    }

    injectStyles() {
        if (!document.getElementById('living-icons-styles')) {
            const style = document.createElement('style');
            style.id = 'living-icons-styles';
            style.textContent = `
                @keyframes float {
                    0% { transform: translateY(0px); }
                    100% { transform: translateY(-8px); }
                }
                
                .dynamic-glow {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                    z-index: 0;
                    border-radius: inherit;
                    transition: background 0.2s ease;
                 }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LivingIcons();
});
