// Blog Data (Sample data, replace with your actual data)
const blogs = [
  { id: 1, title: 'My Thrilling Journey with Stars777: India’s Best Online Gaming Platform', category: 'entertainment', date: '2025-06-08', content: 'A personal account of exploring Stars777.org...', image: '/seo-specialist/images/stars777-placeholder.jpeg' },
  { id: 2, title: 'My Seamless Car Shipping Experience with AmeriFreight | June 2025', category: 'transportation', date: '2025-06-09', content: 'Discover why AmeriFreight is America’s trusted car shipping solution.', image: '/seo-specialist/images/amerifreight-placeholder2.jpeg' },
  { id: 3, title: 'My Hassle-Free Door-to-Door Car Shipping with AmeriFreight', category: 'transportation', date: '2025-06-10', content: 'Explore my seamless experience with AmeriFreight’s door-to-door car shipping', image: '/seo-specialist/images/amerifreight-placeholder3.jpeg' },
  { id: 4, title: 'My Thrilling Stars777 Online Gaming Experience | Seamless Fun in 2025', category: 'entertainment', date: '2025-06-10', content: 'Explore why Stars777 is 2025 top gaming platform—diverse games, secure payments, and stellar support all in one place!', image: '/seo-specialist/images/stars777-placeholder2.jpeg' },
  { id: 5, title: 'My Home Transformation with Beyond Builders', category: 'construction', date: '2025-06-11', content: 'Discover how Beyond Builders transformed my home with expert construction and remodeling services in the Bay Area.', image: '/seo-specialist/images/beyond-builders-placeholder.jpeg' },
  { id: 6, title: 'My Mental Wellness Journey with Mynd Works', category: 'health', date: '2025-06-12', content: 'My journey with Mynd Works Psychiatry: personalized mental health care with innovative treatments in Austin, TX.', image: '/seo-specialist/images/mynd-works-placeholder.jpeg' },
  { id: 7, title: 'Healing with Integrative Psychiatry at Mynd Works', category: 'health', date: '2025-06-13', content: 'Explore integrative psychiatry at Mynd Works in Austin, TX—my journey to personalized mental health with science-backed care.', image: '/seo-specialist/images/mynd-works-integrative-placeholder.jpeg' },
  { id: 8, title: 'My Journey with PhotoAndVideoEdits Real Estate Editing', category: 'real-estate', date: '2025-06-14', content: 'Discover my experience with PhotoAndVideoEdits real estate photo editing services—fast turnaround and stunning visuals in 2025.', image: '/seo-specialist/images/photoandvideoedits-placeholder.jpeg' },
  { id: 9, title: 'Discovering Nashville with Experience Tours', category: 'travel', date: '2025-06-15', content: 'Explore my journey with Nashville Experience Tours—unique walking and van tours revealing Music City’s history in 2025.', image: '/seo-specialist/images/nashville-tours-placeholder.jpeg' },
  { id: 10, title: 'Exploring Stars777 Slot Games', category: 'entertainment', date: '2025-06-16', content: 'My experience with Stars777 slot games—exciting gameplay and fast withdrawals in 2025.', image: '/seo-specialist/images/stars777-placeholder3.jpeg' },
  { id: 11, title: 'My Adventure with Stars777 Casino Games', category: 'entertainment', date: '2025-06-16', content: 'My exciting journey with Stars777 online casino games—secure play and fun slots in 2025.', image: '/seo-specialist/images/stars777-casino-placeholder.jpeg' },
  { id: 12, title: 'Navigating College Moves with AmeriFreight’s Student Discount', category: 'transportation', date: '2025-06-17', content: 'My experience with AmeriFreight’s student discount for car shipping—affordable and stress-free in 2025.', image: '/seo-specialist/images/amerifreight-student-placeholder.jpeg' },
  { id: 13, title: 'Transforming Spaces with Go Beyond Builders’ Commercial Renovations', category: 'construction', date: '2025-06-17', content: 'My experience with Go Beyond Builders’ commercial renovations—expertise and stunning results in 2025.', image: '/seo-specialist/images/gobeyondbuilders-placeholder.jpeg' },
  { id: 14, title: 'Elevating Content with Photo and Video Edits’ Video Editing Services', category: 'real-estate', date: '2025-06-18', content: 'Discover how Photo and Video Edits transformed my video content with professional editing services in 2025.', image: '/seo-specialist/images/photoandvideoedits2-placeholder.jpeg' }
].sort((a, b) => new Date(b.date) - new Date(a.date));

const blogsPerPage = 20;
let currentPage = 1;
const blogGrid = document.getElementById('blogGrid');
const pagination = document.getElementById('pagination');
const categoryFilter = document.getElementById('categoryFilter');
const dateFilter = document.getElementById('dateFilter');
const noBlogsMessage = document.getElementById('noBlogsMessage');

// Populate Date Filter with "No Date" option and starting from today (June 07, 2025, 07:36 PM PST)
const today = new Date('2025-06-07T19:36:00-07:00');
const optionNoDate = document.createElement('option');
optionNoDate.value = 'null';
optionNoDate.textContent = 'No Date';
optionNoDate.selected = true;
dateFilter.appendChild(optionNoDate);

for (let i = 0; i < 30; i++) {
  const date = new Date(today);
  date.setDate(today.getDate() + i);
  const dateStr = date.toISOString().split('T')[0];
  const option = document.createElement('option');
  option.value = dateStr;
  option.textContent = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  dateFilter.appendChild(option);
}

function displayBlogs(page, category = 'all', date = null) {
  blogGrid.innerHTML = '';
  noBlogsMessage.style.display = 'none';
  let filteredBlogs = blogs.filter(blog => {
    const matchesCategory = category === 'all' || blog.category === category;
    const matchesDate = !date || date === 'null' || blog.date === date;
    return matchesCategory && matchesDate;
  });

  if (filteredBlogs.length === 0) {
    noBlogsMessage.textContent = 'No blogs found.';
    noBlogsMessage.style.display = 'block';
    pagination.innerHTML = '';
    return;
  }

  const start = (page - 1) * blogsPerPage;
  const end = start + blogsPerPage;
  const paginatedBlogs = filteredBlogs.slice(start, end);

  paginatedBlogs.forEach(blog => {
    const blogCard = document.createElement('div');
    blogCard.className = 'blog-card animate-fadeIn';
    blogCard.innerHTML = `
      <img src="${blog.image}" alt="${blog.title}">
      <h3>${blog.title}</h3>
      <p>${blog.content}</p>
      <a href="/seo-specialist/blog/blog-post-${blog.id}.html" class="blog-link">Read More</a>
    `;
    blogGrid.appendChild(blogCard);
  });

  setupPagination(filteredBlogs.length);
}

function setupPagination(totalBlogs) {
  pagination.innerHTML = '';
  const totalPages = Math.ceil(totalBlogs / blogsPerPage);

  if (totalPages > 1) {
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        displayBlogs(currentPage, categoryFilter.value, dateFilter.value);
      }
    });
    pagination.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.disabled = i === currentPage;
      pageButton.addEventListener('click', () => {
        currentPage = i;
        displayBlogs(currentPage, categoryFilter.value, dateFilter.value);
      });
      pagination.appendChild(pageButton);
    }

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        displayBlogs(currentPage, categoryFilter.value, dateFilter.value);
      }
    });
    pagination.appendChild(nextButton);
  }
}

categoryFilter.addEventListener('change', () => {
  currentPage = 1;
  displayBlogs(currentPage, categoryFilter.value, dateFilter.value);
});

dateFilter.addEventListener('change', () => {
  currentPage = 1;
  displayBlogs(currentPage, categoryFilter.value, dateFilter.value);
});

displayBlogs(currentPage);
