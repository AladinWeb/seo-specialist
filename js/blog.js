let blogs = [];

const blogsPerPage = 20;
let currentPage = 1;
const blogGrid = document.getElementById('blogGrid');
const pagination = document.getElementById('pagination');
const categoryFilter = document.getElementById('categoryFilter');
const dateFilter = document.getElementById('dateFilter');
const noBlogsMessage = document.getElementById('noBlogsMessage');

// Populate date filter with month/year options starting from June 2025
const startDate = new Date('2025-06-01');
const optionNoDate = document.createElement('option');
optionNoDate.value = 'null';
optionNoDate.textContent = 'No Date';
optionNoDate.selected = true;
dateFilter.appendChild(optionNoDate);

for (let i = 0; i < 24; i++) { // Generate 2 years of months
  const date = new Date(startDate);
  date.setMonth(startDate.getMonth() + i);
  const yearMonth = date.toISOString().slice(0, 7); // YYYY-MM
  const option = document.createElement('option');
  option.value = yearMonth;
  option.textContent = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  dateFilter.appendChild(option);
}

async function fetchBlogs() {
  try {
    const response = await fetch('/data/blogs.json');
    if (!response.ok) throw new Error('Failed to fetch blogs');
    blogs = await response.json();
    blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
    displayBlogs(currentPage);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    noBlogsMessage.textContent = 'Error loading blogs. Please try again later.';
    noBlogsMessage.style.display = 'block';
  }
}

function displayBlogs(page, category = 'all', date = null) {
  blogGrid.innerHTML = '';
  noBlogsMessage.style.display = 'none';
  let filteredBlogs = blogs.filter(blog => {
    const matchesCategory = category === 'all' || blog.category === category;
    const blogYearMonth = blog.date.slice(0, 7); // Extract YYYY-MM from blog date
    const matchesDate = !date || date === 'null' || blogYearMonth === date;
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
      <a href="/blog/${blog.slug}" class="blog-link">Read Full Blog</a>
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

fetchBlogs();