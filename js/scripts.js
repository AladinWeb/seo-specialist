document.addEventListener('DOMContentLoaded', async () => {
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
        <li><a href="/seo-specialist/" class="nav-link">Home</a></li>
        <li><a href="/seo-specialist/about-us.html" class="nav-link">About</a></li>
        <li><a href="/seo-specialist/blog.html" class="nav-link">Blog</a></li>
        <li><a href="/seo-specialist/contact-us.html" class="nav-link">Contact</a></li>
      </ul>
    </nav>
    <div class="mobile-menu">
      <ul>
        <li><a href="/seo-specialist/" class="nav-link">Home</a></li>
        <li><a href="/seo-specialist/about-us.html" class="nav-link">About</a></li>
        <li><a href="/seo-specialist/blog.html" class="nav-link">Blog</a></li>
        <li><a href="/seo-specialist/contact-us.html" class="nav-link">Contact</a></li>
      </ul>
    </div>
  `;

  // Footer Component
  const footer = document.getElementById('footer');
  footer.innerHTML = `
    <div class="footer-content">
      <p>© ${new Date().getFullYear()} My Blog. All rights reserved. Managed by <a href="https://allworldseodigitalmarketingsolutions.com/" target="_blank"><strong>AllWorld SEO</strong></a>.</p>
      <ul class="footer-links">
        <li><a href="/seo-specialist/privacy-policy.html" class="footer-link">Privacy Policy</a></li>
        <li><a href="/seo-specialist/terms-of-service.html" class="footer-link">Terms of Service</a></li>
        <li><a href="/seo-specialist/contact-us.html" class="footer-link">Contact Us</a></li>
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

  // Fetch and display featured blogs
  try {
    const response = await fetch('/seo-specialist/data/blogs.json'); // Adjust path as needed
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
        blogCard.style.animationDelay = `${(5 - index) * 0.2}s`; // Reverse delay to match original
        blogCard.innerHTML = `
          <img src="${blog.image}" alt="Blog ${blog.id}">
          <h3>${blog.title}</h3>
          <p>${blog.content}</p>
          <a href="/seo-specialist/blog/blog-post-${blog.id}.html" class="blog-link">Read More</a>
        `;
        blogGrid.appendChild(blogCard);
      });
    }
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    // Optionally display an error message in the blog grid
    const blogGrid = document.querySelector('.featured-blogs .blog-grid');
    if (blogGrid) {
      blogGrid.innerHTML = '<p>Error loading featured blogs. Please try again later.</p>';
    }
  }
});
