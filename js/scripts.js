document.addEventListener('DOMContentLoaded', async () => {
  const header = document.getElementById('header');
  const footer = document.getElementById('footer'); // Assuming footer has ID 'footer'

  if (header) {
    header.innerHTML = `
      <div class="header-wrapper">
        <div class="subheader">
          <div class="subheader-contact">
            <a href="tel:+1 (234) 567-890">+1 (234) 567-890</a> | 
            <a href="mailto:info@fuseven.com">info@fuseven.com</a>
          </div>
          <div class="subheader-social">
            <a href="#" target="_blank" class="fab fa-facebook-f"></a>
            <a href="#" target="_blank" class="fab fa-x-twitter"></a>
            <a href="#" target="_blank" class="fab fa-instagram"></a>
            <a href="#" target="_blank" class="fab fa-linkedin-in"></a>
          </div>
        </div>
        <nav class="header-nav">
          <div class="logo-container">
            <a href="/">Logo</a>
          </div>
          <ul class="nav-links">
            <li><a href="/blog" class="nav-link">Blog</a></li>
            <li><a href="/services" class="nav-link">Services</a></li>
            <li><a href="/about-us" class="nav-link">About</a></li>
            <li><a href="/contact-us" class="nav-link">Contact</a></li>
          </ul>
          <div class="header-button">
            <a href="https://allworldseodigitalmarketingsolutions.com/contact-us">Get in Touch</a>
          </div>
          <div class="hamburger">
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
          </div>
          <div class="mobile-menu">
            <ul>
              <li><a href="/blog" class="nav-link">Blog</a></li>
              <li><a href="/services" class="nav-link">Services</a></li>
              <li><a href="/about-us" class="nav-link">About</a></li>
              <li><a href="/contact-us" class="nav-link">Contact</a></li>
            </ul>
          </div>
        </nav>
      </div>
    `;
  }

  if (footer) {
    footer.innerHTML = `
      <div class="footer-wrapper">
        <div class="footer-main">
          <div class="footer-column footer-first-column">
            <div class="logo-container">
              <a href="/" class="footer-logo" style="background: url('/images/fuseven-logo.png') no-repeat center; width: 150px; height: 50px; background-size: contain; text-indent: -9999px;"></a>
            </div>
            <div class="footer-social">
              <a href="#" target="_blank" class="fab fa-facebook-f"></a>
              <a href="#" target="_blank" class="fab fa-x-twitter"></a>
              <a href="#" target="_blank" class="fab fa-instagram"></a>
              <a href="#" target="_blank" class="fab fa-linkedin-in"></a>
            </div>
            <p id="site-description" class="site-description">Fuseseven is your go-to platform for innovative digital solutions and creative services. Managed by AllWorld SEO, our Bulacan-based team supports clients locally and internationally.</p>
          </div>
          <div class="footer-column">
            <span style="color: #ffffff; font-size: 1.3rem; margin-bottom: 1rem; display: block;">Useful Links</span>
            <ul style="list-style: none; padding: 0;">
              <li><a href="/about-us" class="footer-link">About Us</a></li>
              <li><a href="/services" class="footer-link">Services</a></li>
              <li><a href="/blog" class="footer-link">Blog</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <span style="color: #ffffff; font-size: 1.3rem; margin-bottom: 1rem; display: block;">Additional Links</span>
            <ul style="list-style: none; padding: 0;">
              <li><a href="/privacy-policy" class="footer-link">Privacy Policy</a></li>
              <li><a href="/terms-of-service" class="footer-link">Terms of Service</a></li>
              <li><a href="/faq" class="footer-link">FAQ</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <span style="color: #ffffff; font-size: 1.3rem; margin-bottom: 1rem; display: block;">Contact Us</span>
            <form style="display: flex; flex-direction: column; gap: 0.5rem;">
              <input type="text" placeholder="Name" style="padding: 0.6rem; border-radius: 4px; border: none; font-size: 1rem;">
              <input type="email" placeholder="Email" style="padding: 0.6rem; border-radius: 4px; border: none; font-size: 1rem;">
              <button type="submit" style="padding: 0.6rem; background-color: #ff6b6b; color: #ffffff; border: none; border-radius: 4px; cursor: pointer;">Send</button>
            </form>
          </div>
        </div>
        <div class="footer-bottom">
          <span style="color: #ffffff; font-size: 1.4rem;">Affiliated Websites: </span>
          <a href="https://luckshots.com/" target="_blank" class="footer-link">Luckshots</a>
          <a href="https://slotscam.website/" target="_blank" class="footer-link">SlotsCam</a>
          <a href="https://stars777.win/" target="_blank" class="footer-link">Stars777</a>
          <p>© 2025 Fuseseven. All rights reserved. Managed by <a href="https://allworldseodigitalmarketingsolutions.com/" target="_blank">AllWorld SEO</a></p>
        </div>
      </div>
    `;
  }

  // Hamburger menu toggle (consolidated and debugged)
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    console.log('Hamburger and mobile menu elements found:', hamburger, mobileMenu);
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      console.log('Hamburger clicked, active state:', hamburger.classList.contains('active'));
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        console.log('Nav link clicked, menu closed');
      });
    });
  } else {
    console.log('Hamburger or mobile menu not found in the DOM');
  }

  // Fetch and display featured blogs
  try {
    const response = await fetch('/data/blogs.json'); // Adjust path as needed
    if (!response.ok) throw new Error('Failed to fetch blogs');
    const blogs = await response.json();
    // Sort blogs by date (newest first) and take the top 6
    const latestBlogs = blogs
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 6);

    // Get the blog grid container
    const blogGrid = document.querySelector('.featured-blogs .blog-grid');
    if (blogGrid) {
      blogGrid.innerHTML = ''; // Clear existing static content
      latestBlogs.forEach((blog, index) => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card animate-fadeIn';
        blogCard.style.animationDelay = `${(5 - index) * 0.2}s`;
        blogCard.innerHTML = `
          <img src="${blog.image}" alt="${blog.title}">
          <h3>${blog.title}</h3>
          <p>${blog.content}</p>
          <a href="/blog/${blog.slug}" class="blog-link">Read Full Blog</a>
        `;
        blogGrid.appendChild(blogCard);
      });
    }
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    const blogGrid = document.querySelector('.featured-blogs .blog-grid');
    if (blogGrid) {
      blogGrid.innerHTML = '<p>Error loading featured blogs. Please try again later.</p>';
    }
  }
});