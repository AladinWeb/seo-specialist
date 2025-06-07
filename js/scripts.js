document.addEventListener('DOMContentLoaded', () => {
  // Header Component
  const header = document.getElementById('header');
  header.innerHTML = `
    <nav class="header-nav">
      <div class="logo-title">My Blog</div>
      <div class="hamburger">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>
      <ul class="nav-links">
        <li><a href="/" class="nav-link">Home</a></li>
        <li><a href="#" class="nav-link">About</a></li>
        <li><a href="/blog.html" class="nav-link">Blog</a></li>
        <li><a href="#" class="nav-link">Contact</a></li>
      </ul>
    </nav>
    <div class="mobile-menu">
      <ul>
        <li><a href="#" class="nav-link">Home</a></li>
        <li><a href="#" class="nav-link">About</a></li>
        <li><a href="#" class="nav-link">Blog</a></li>
        <li><a href="#" class="nav-link">Contact</a></li>
      </ul>
    </div>
  `;

  // Footer Component
  const footer = document.getElementById('footer');
  footer.innerHTML = `
    <div class="footer-content">
      <p>&copy; ${new Date().getFullYear()} My Blog. All rights reserved.</p>
      <ul class="footer-links">
        <li><a href="#" class="footer-link">Privacy Policy</a></li>
        <li><a href="#" class="footer-link">Terms of Service</a></li>
        <li><a href="#" class="footer-link">Contact Us</a></li>
      </ul>
    </div>
  `;

  // Hamburger Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });
});
