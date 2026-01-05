function animateButton(button) {
    button.classList.add('animated');
    setTimeout(() => {
        button.classList.remove('animated');
    }, 500);
}

// Fetch and display latest 6 blog posts with featured image support
async function loadLatestPosts() {
    try {
        const response = await fetch('css-js/blogs.json');
        if (!response.ok) throw new Error('Failed to load blogs.json');
        
        const blogs = await response.json();
        
        // Sort by date descending (newest first)
        blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Take latest 6
        const latest = blogs.slice(0, 6);
        
        const grid = document.getElementById('blog-grid');
        grid.innerHTML = ''; // Clear loading message
        
        if (latest.length === 0) {
            grid.innerHTML = '<p class="loading">No posts available yet.</p>';
            return;
        }
        
        latest.forEach(post => {
            const article = document.createElement('article');
            article.className = 'blog-card';
            
            // Format date nicely
            const postDate = new Date(post.date);
            const formattedDate = postDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            
            // Check if post has a featured image
            let imageHTML = `
                <div class="card-image-placeholder">
                    <span class="pixelated-text">PIXEL</span>
                </div>
            `;
            
            if (post.image) {
                imageHTML = `
                    <img src="images/${post.image.split('/').pop()}" alt="${post.title}" class="card-featured-img">
                `;
            }
            
            article.innerHTML = `
                ${imageHTML}
                <div class="card-content">
                    <div class="card-category">${post.category || 'General'}</div>
                    <h3 class="pixelated-text card-title">${post.title}</h3>
                    <p class="card-description">${post.description}</p>
                    <div class="card-meta">
                        <span class="card-date">${formattedDate}</span>
                        <a href="blog/${post.slug}.html" class="pixel-link card-readmore">Read More →</a>
                    </div>
                </div>
            `;
            
            grid.appendChild(article);
        });
        
    } catch (error) {
        console.error('Error loading blogs:', error);
        document.getElementById('blog-grid').innerHTML = 
            '<p class="loading" style="color: #ff0;">Failed to load posts. Please try again later.</p>';
    }
}

// Load posts when page is ready
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('fade-in');
    loadLatestPosts();
});