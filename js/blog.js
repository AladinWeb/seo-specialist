let blogs = [];
const blogsPerPage = 20;
let currentPage = 1;

const blogGrid = document.getElementById('blogGrid');
const pagination = document.getElementById('pagination');
const categoryFilter = document.getElementById('categoryFilter');
const dateFilter = document.getElementById('dateFilter');
const noBlogsMessage = document.getElementById('noBlogsMessage');

function populateYearFilter() {
  const years = [...new Set(blogs.map(blog => blog.date.slice(0, 4)))].sort((a, b) => b - a);

  dateFilter.innerHTML = '';

  const optionNoDate = document.createElement('option');
  optionNoDate.value = 'null';
  optionNoDate.textContent = 'All Years';
  optionNoDate.selected = true;
  dateFilter.appendChild(optionNoDate);

  years.forEach(year => {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    dateFilter.appendChild(option);
  });
}

async function fetchBlogs() {
  try {
    const response = await fetch('/data/blogs.json');
    if (!response.ok) throw new Error(`Failed to fetch blogs: ${response.status}`);

    blogs = await response.json();

    blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

    populateYearFilter();
    displayBlogs(currentPage);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    noBlogsMessage.textContent = 'Error loading blogs. Please try again later.';
    noBlogsMessage.style.display = 'block';
  }
}

function displayBlogs(page, category = 'all', year = null) {
  blogGrid.innerHTML = '';
  noBlogsMessage.style.display = 'none';

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = category === 'all' || blog.category === category;
    const blogYear = blog.date.slice(0, 4); // YYYY
    const matchesYear = !year || year === 'null' || blogYear === year;
    return matchesCategory && matchesYear;
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

  setupPagination(filteredBlogs.length, category, year);
}

function setupPagination(totalBlogs, category, year) {
  pagination.innerHTML = '';
  const totalPages = Math.ceil(totalBlogs / blogsPerPage);

  if (totalPages > 1) {
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        displayBlogs(currentPage, category, year);
      }
    });
    pagination.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.disabled = i === currentPage;
      pageButton.addEventListener('click', () => {
        currentPage = i;
        displayBlogs(currentPage, category, year);
      });
      pagination.appendChild(pageButton);
    }

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        displayBlogs(currentPage, category, year);
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