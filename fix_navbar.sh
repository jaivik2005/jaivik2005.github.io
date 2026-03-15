#!/bin/bash
for file in *.html; do
    # Replace the simple mobile menu toggle with the complete responsive logic
    sed -i '/const mobileMenuToggle = document.querySelector(.mobile-menu-toggle.);/,/});/c\
        // Mobile menu toggle\
        const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");\
        const navMenu = document.querySelector(".nav-menu");\
        const navOverlay = document.querySelector(".nav-menu-overlay");\
        const navLinks = document.querySelectorAll(".nav-link");\
        const navbar = document.querySelector(".navbar");\
        \
        function toggleMobileMenu() {\
            mobileMenuToggle.classList.toggle("active");\
            navMenu.classList.toggle("active");\
            if(navOverlay) navOverlay.classList.toggle("active");\
            document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";\
        }\
        \
        if (mobileMenuToggle) {\
            mobileMenuToggle.addEventListener("click", toggleMobileMenu);\
        }\
        \
        if (navOverlay) {\
            navOverlay.addEventListener("click", toggleMobileMenu);\
        }\
        \
        navLinks.forEach(link => {\
            link.addEventListener("click", () => {\
                mobileMenuToggle.classList.remove("active");\
                navMenu.classList.remove("active");\
                if(navOverlay) navOverlay.classList.remove("active");\
                document.body.style.overflow = "";\
            });\
        });\
        \
        // Navbar background on scroll\
        window.addEventListener("scroll", () => {\
            if (window.scrollY > 100) {\
                navbar.classList.add("scrolled");\
                navbar.style.background = "rgba(10, 10, 10, 0.95)";\
            } else {\
                navbar.classList.remove("scrolled");\
                navbar.style.background = "rgba(10, 10, 10, 0.8)";\
            }\
        });\
' "$file"
done
