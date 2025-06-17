// Blog Data (Sample data, replace with your actual data or fetch dynamically)
const blogs = [
  { id: 1, title: 'My Thrilling Journey with Stars777: India’s Best Online Gaming Platform', category: 'entertainment', date: '2025-06-08', content: 'A personal account of exploring Stars777.org...', image: '/seo-specialist/images/stars777-placeholder.jpeg' },
  { id: 2, title: 'My Seamless Car Shipping Experience with AmeriFreight | June 2025', category: 'transportation', date: '2025-06-09', content: 'Discover why AmeriFreight is America’s trusted car shipping solution.', image: '/seo-specialist/images/amerifreight-placeholder2.jpeg' },
  { id: 3, title: 'My Hassle-Free Door-to-Door Car Shipping with AmeriFreight', category: 'transportation', date: '2025-06-10', content: 'Explore my seamless experience with AmeriFreight’s door-to-door car shipping.', image: '/seo-specialist/images/amerifreight-placeholder3.jpeg' },
  { id: 4, title: 'My Thrilling Stars777 Online Gaming Experience | Seamless Fun in 2025', category: 'entertainment', date: '2025-06-10', content: 'Explore why Stars777 is 2025 top gaming platform—diverse games, secure payments, and stellar support all in one place!', image: '/seo-specialist/images/stars777-placeholder2.jpeg' },
  { id: 5, title: 'My Home Transformation with Beyond Builders', category: 'construction', date: '2025-06-11', content: 'Discover how Beyond Builders transformed my home with expert construction and remodeling services in the Bay Area.', image: '/seo-specialist/images/beyond-builders-placeholder.jpeg' },
  { id: 6, title: 'My Mental Wellness Journey with Mynd Works', category: 'health', date: '2025-06-12', content: 'My journey with Mynd Works Psychiatry: personalized mental health care with innovative treatments in Austin, TX.', image: '/seo-specialist/images/mynd-works-placeholder.jpeg' },
  { id: 7, title: 'Healing with Integrative Psychiatry at Mynd Works', category: 'health', date: '2025-06-13', content: 'Explore integrative psychiatry at Mynd Works in Austin, TX—my journey to personalized mental health with science-backed care.', image: '/seo-specialist/images/mynd-works-integrative-placeholder.jpeg' },
  { id: 8, title: 'My Journey with PhotoAndVideoEdits Real Estate Editing', category: 'real-estate', date: '2025-06-14', content: 'Discover my experience with PhotoAndVideoEdits real estate photo editing services—fast turnaround and stunning visuals in 2025.', image: '/seo-specialist/images/photoandvideoedits-placeholder.jpeg' },
  { id: 9, title: 'Discovering Nashville with Experience Tours', category: 'travel', date: '2025-06-15', content: 'Explore my journey with Nashville Experience Tours—unique walking and van tours revealing Music City’s history in 2025.', image: '/seo-specialist/images/nashville-tours-placeholder.jpeg' },
  { id: 10, title: 'Exploring Stars777 Slot Games', category: 'entertainment', date: '2025-06-16', content: 'My experience with Stars777 slot games—exciting gameplay and fast withdrawals in 2025.', image: '/seo-specialist/images/stars777-placeholder3.jpeg' },
  { id: 11, title: 'My Adventure with Stars777 Casino Games', category: 'entertainment', date: '2025-06-16', content: 'My exciting journey with Stars777 online casino games—secure play and fun slots in 2025.', image: '/seo-specialist/images/stars777-casino-placeholder.jpeg' },
  { id: 12, title: 'Navigating College Moves with AmeriFreight’s Student Discount', category: 'transportation', date: '2025-06-17', content: 'My experience with AmeriFreight’s student discount for car shipping—affordable and stress-free in 2025.', image: '/seo-specialist/images/amerifreight-student-placeholder.jpeg' },
  { id: 13, title: 'Transforming Spaces with Go Beyond Builders’ Commercial Renovations', category: 'construction', date: '2025-06-17', content: 'My experience with Go Beyond Builders’ commercial renovations—expertise and stunning results in 2025.', image: '/seo-specialist/images/gobeyondbuilders-placeholder.jpeg' }
].sort((a, b) => new Date(b.date) - new Date(a.date));

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.createElement('div');
  sidebar.className = 'sidebar';
  document.querySelector('.blog-post').insertAdjacentElement('beforeend', sidebar);

  // Determine current blog post ID from URL (e.g., blog-post-1.html)
  const path = window.location.pathname;
  const idMatch = path.match(/blog-post-(\d+)\.html/);
  const currentId = idMatch ? parseInt(idMatch[1]) : null;
  const currentBlog = blogs.find(blog => blog.id === currentId);

  // Table of Contents (With functional navigation and offset for sticky header)
  const tocSection = document.createElement('div');
  tocSection.className = 'toc-section';
  const tocHeading = document.createElement('h3');
  tocHeading.textContent = 'Table of Contents';
  tocSection.appendChild(tocHeading);
  const tocList = document.createElement('ul');
  tocList.className = 'toc-list';
  const headings = document.querySelectorAll('.blog-post h1, .blog-post h2, .blog-post h3');
  headings.forEach((heading, index) => {
    const uniqueId = `toc-${index}`; // Unique ID for each heading
    heading.id = uniqueId; // Assign ID to the heading
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${uniqueId}`; // Link to the heading's ID
    link.textContent = heading.textContent;
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent adding # to URL
      const headerOffset = 60; // Adjust this value to match your sticky header height (e.g., 60px)
      const elementPosition = heading.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      }); // Smooth scroll with offset
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
  const latestPosts = blogs.slice(0, 5); // Top 5 latest posts
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
    link.href = `/seo-specialist/blog.html`; // Simplified to /blog.html
    link.textContent = `${category} (${count})`;
    if (currentBlog && currentBlog.category === category) {
      link.classList.add('active');
    }
    listItem.appendChild(link);
    categoryList.appendChild(listItem);
  });
  categorySection.appendChild(categoryList);
  sidebar.appendChild(categorySection);
});
