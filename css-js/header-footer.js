document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header-placeholder');
    const footer = document.getElementById('footer-placeholder');

    header.innerHTML = `
        <nav class="pixel-nav">
            <div class="logo pixelated-text">Fuseven</div>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul class="nav-links">
                <li class="close-li"><button class="close-btn">X</button></li>
                <li><a href="/" class="pixel-link">Home</a></li>
                <li><a href="/blog" class="pixel-link">Blogs</a></li>
                <li><a href="/about" class="pixel-link">About</a></li>
                <li><a href="/contact" class="pixel-link">Contact</a></li>
            </ul>
        </nav>
    `;

    footer.innerHTML = `
        <div class="footer-content">
            <p class="pixelated-text">&copy; 2026 Fuseven. All rights reserved.</p>
            <ul class="social-links">
                <li><a href="/privacy-policy" class="pixel-link">Privacy Policy</a></li>
                <li><a href="/terms-of-service" class="pixel-link">Terms of Service</a></li>
                <li><a href="/sitemap" class="pixel-link">Sitemap</a></li>
            </ul>
        </div>
    `;

    // Hamburger toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const closeBtn = document.querySelector('.close-btn');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    }
});