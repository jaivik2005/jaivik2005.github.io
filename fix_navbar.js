const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const scriptReplacement = `
        // Mobile menu toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navOverlay = document.querySelector('.nav-menu-overlay');
        const navLinks = document.querySelectorAll('.nav-link');
        const navbar = document.querySelector('.navbar');

        function toggleMobileMenu() {
            if(mobileMenuToggle) mobileMenuToggle.classList.toggle('active');
            if(navMenu) navMenu.classList.toggle('active');
            if(navOverlay) navOverlay.classList.toggle('active');
            if(navMenu) document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        }

        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }

        if (navOverlay) {
            navOverlay.addEventListener('click', toggleMobileMenu);
        }

        // Close menu when clicking a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if(mobileMenuToggle) mobileMenuToggle.classList.remove('active');
                if(navMenu) navMenu.classList.remove('active');
                if(navOverlay) navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Navbar config 
        window.addEventListener('scroll', () => {
            if(navbar) {
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                    navbar.classList.add('scrolled');
                } else {
                    navbar.style.background = 'rgba(10, 10, 10, 0.8)';
                    navbar.classList.remove('scrolled');
                }
            }
        });
`;

files.forEach(file => {
    if (file === 'index.html') return; // index.html already has correct logic
    let content = fs.readFileSync(file, 'utf8');
    
    // Use regex to replace the old mobile menu logic
    const oldLogicRegex = /const mobileMenuToggle = document\.querySelector\('.mobile-menu-toggle'\);[\s\S]*?navbar\.style\.background = 'rgba\(10, 10, 10, 0\.8\)';\s*\}\s*\});/g;
    
    if (oldLogicRegex.test(content)) {
        content = content.replace(oldLogicRegex, scriptReplacement.trim());
        fs.writeFileSync(file, content);
        console.log(\`Fixed \${file}\`);
    } else {
        console.log(\`Skipped \${file}\`);
    }
});
