// Blog Data (Sample data, replace with your actual data)
const blogs = [
  { id: 1, title: 'Blog Post 1', category: 'entertainment', date: '2025-06-08', content: 'Add a brief description of your blog post here.', image: 'images/blog-placeholder1.jpg' },
  { id: 2, title: 'Blog Post 2', category: 'travel', date: '2025-06-08', content: 'Add a brief description of your blog post here.', image: 'images/blog-placeholder2.jpg' },
  { id: 3, title: 'Blog Post 3', category: 'transportation', date: '2025-06-08', content: 'Add a brief description of your blog post here.', image: 'images/blog-placeholder3.jpg' },
  { id: 4, title: 'Blog Post 4', category: 'health', date: '2025-06-08', content: 'Add a brief description of your blog post here.', image: 'images/blog-placeholder1.jpg' },
  { id: 5, title: 'Blog Post 5', category: 'construction', date: '2025-06-08', content: 'Add a brief description of your blog post here.', image: 'images/blog-placeholder2.jpg' },
  { id: 6, title: 'Blog Post 6', category: 'real-estate', date: '2025-06-08', content: 'Add a brief description of your blog post here.', image: 'images/blog-placeholder3.jpg' },
  // Add more blog posts as needed
].sort((a, b) => new Date(b.date) - new Date(a.date));

const blogsPerPage = 20;
let currentPage = 1;
const blogGrid = document.getElementById('blogGrid');
const pagination = document.getElementById('pagination');
const categoryFilter = document.getElementById('categoryFilter');
const dateFilter = document.getElementById('dateFilter');
const noBlogsMessage = document.getElementById('noBlogsMessage');
const upToDateButton = document.getElementById('upToDateButton');

// Populate Date Filter with "No Date" option and starting from today (June 07, 2025, 05:15 PM PST)
const today = new Date('2025-06-07T17:15:00-07:00'); // Current time: 05:15 PM PST
const optionNoDate = document.createElement('option');
optionNoDate.value = 'null';
optionNoDate.textContent = 'No Date';
optionNoDate.selected = true; // Set "No Date" as default
dateFilter.appendChild(optionNoDate);

for (let i = 0; i < 30; i++) { // 7 days as an example, adjust as needed
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

upToDateButton.addEventListener('click', () => {
  currentPage = 1;
  categoryFilter.value = 'all';
  dateFilter.value = today.toISOString().split('T')[0];
  displayBlogs(currentPage, categoryFilter.value, dateFilter.value);
});

displayBlogs(currentPage);
