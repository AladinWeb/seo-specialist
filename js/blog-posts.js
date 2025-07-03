// Blog Data (Fetched from JSON)
let blogs = [];

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch blog data
    const response = await fetch('/data/blogs.json'); // Adjust path as needed
    if (!response.ok) throw new Error('Failed to fetch blogs');
    blogs = await response.json();
    // Sort blogs by date (newest first)
    blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Proceed with sidebar generation
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    document.querySelector('.blog-post').insertAdjacentElement('beforeend', sidebar);

    // Determine current blog post ID from URL (e.g., blog-post-1.html)
    const path = window.location.pathname;
    const idMatch = path.match(/blog-post-(\d+)\.html/);
    const currentId = idMatch ? parseInt(idMatch[1]) : null;
    const currentBlog = blogs.find(blog => blog.id === currentId);

    // Table of Contents
    const tocSection = document.createElement('div');
    tocSection.className = 'toc-section';
    const tocHeading = document.createElement('h3');
    tocHeading.textContent = 'Table of Contents';
    tocSection.appendChild(tocHeading);
    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';
    const headings = document.querySelectorAll('.blog-post h1, .blog-post h2, .blog-post h3');
    headings.forEach((heading, index) => {
      const uniqueId = `toc-${index}`;
      heading.id = uniqueId;
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${uniqueId}`;
      link.textContent = heading.textContent;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const headerOffset = 60;
        const elementPosition = heading.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      });
      listItem.appendChild(link);
      tocList.appendChild(listItem);
    });
    tocSection.appendChild(tocList);
    sidebar.appendChild(tocSection);

    // Latest Posts
    const latestPostsSection = document.createElement('div');
    latestPostsSection.className = 'latest-posts-section';
    const latestHeading = document.createElement('h3');
    latestHeading.textContent = 'Latest Posts';
    latestPostsSection.appendChild(latestHeading);
    const latestList = document.createElement('ul');
    latestList.className = 'latest-list';
    const latestPosts = blogs.slice(0, 5);
    latestPosts.forEach(blog => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = `blog-post-${blog.id}.html`;
      link.textContent = blog.title;
      listItem.appendChild(link);
      latestList.appendChild(listItem);
    });
    latestPostsSection.appendChild(latestList);
    sidebar.appendChild(latestPostsSection);

    // Blog Category
    const categorySection = document.createElement('div');
    categorySection.className = 'category-section';
    const categoryHeading = document.createElement('h3');
    categoryHeading.textContent = 'Blog Category';
    categorySection.appendChild(categoryHeading);
    const categoryList = document.createElement('ul');
    categoryList.className = 'category-list';
    const categories = [...new Set(blogs.map(blog => blog.category))];
    categories.forEach(category => {
      const count = blogs.filter(blog => blog.category === category).length;
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = `/blog.html`;
      link.textContent = `${category} (${count})`;
      if (currentBlog && currentBlog.category === category) {
        link.classList.add('active');
      }
      listItem.appendChild(link);
      categoryList.appendChild(listItem);
    });
    categorySection.appendChild(categoryList);
    sidebar.appendChild(categorySection);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    // Optionally display an error message in the sidebar
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    sidebar.innerHTML = '<p>Error loading sidebar content. Please try again later.</p>';
    document.querySelector('.blog-post').insertAdjacentElement('beforeend', sidebar);
  }
});
