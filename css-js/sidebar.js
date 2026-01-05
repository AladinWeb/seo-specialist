document.addEventListener('DOMContentLoaded', async () => {
    const sidebarContainer = document.getElementById('blog-sidebar');
    if (!sidebarContainer) return;

    // Reserve space to prevent layout shift
    sidebarContainer.style.minHeight = '900px';

    try {
        const response = await fetch('../css-js/blogs.json');
        if (!response.ok) throw new Error('Failed to load blogs.json');
        
        const blogs = await response.json();
        
        // Sort newest first
        blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Latest 4
        const latest4 = blogs.slice(0, 4);
        
        // Current post slug – remove .html if present (for active post highlighting)
        const currentSlug = window.location.pathname
            .split('/')
            .pop()
            .replace(/\.html$/, '');  // Safely removes .html only if it exists
        
        // Format date helper
        const formatDate = (dateStr) => {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        };

        // Build sidebar HTML
        let sidebarHTML = `
            <style>
                #blog-sidebar {
                    background: #222;
                    padding: 30px;
                    border: 4px solid #fff;
                    height: fit-content;
                    position: sticky;
                    top: 100px;
                }

                #blog-sidebar h3 {
                    font-size: 1.6em;
                    margin: 0 0 20px 0;
                    border-bottom: 4px solid #ff0;
                    padding-bottom: 8px;
                }

                .sidebar-latest-post {
                    margin-bottom: 30px;
                    padding-bottom: 20px;
                    border-bottom: 2px dashed #444;
                }

                .sidebar-latest-post:last-child {
                    border-bottom: none;
                    margin-bottom: 0;
                    padding-bottom: 0;
                }

                .sidebar-latest-image {
                    width: 100%;
                    height: 150px;
                    object-fit: cover;
                    border: 4px solid #fff;
                    margin-bottom: 12px;
                    image-rendering: pixelated;
                    background: #333;
                }

                .sidebar-latest-image-placeholder {
                    width: 100%;
                    height: 150px;
                    background: #333;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 4px solid #fff;
                    margin-bottom: 12px;
                    font-size: 1.2em;
                    color: #666;
                }

                .sidebar-latest-title {
                    font-size: 1.1em;
                    margin: 0 0 8px 0;
                    line-height: 1.3;
                }

                .sidebar-latest-title a {
                    color: #ff0;
                    text-decoration: none;
                    transition: color 0.3s;
                }

                .sidebar-latest-title a:hover {
                    color: #f00;
                }

                .sidebar-latest-date {
                    font-size: 0.9em;
                    opacity: 0.8;
                }

                .sidebar-latest-post.active .sidebar-latest-title a {
                    color: #f00;
                    font-weight: bold;
                    text-shadow: 0 0 15px #f00;
                    animation: glow 2s infinite alternate;
                }

                @keyframes glow {
                    from { text-shadow: 0 0 10px #f00; }
                    to { text-shadow: 0 0 20px #f00, 0 0 30px #f00; }
                }

                .sidebar-archive h3 {
                    margin-top: 50px;
                }

                .sidebar-year {
                    margin: 20px 0 10px 0;
                }

                .sidebar-year strong {
                    color: #ff0;
                    font-size: 1.2em;
                }

                .sidebar-year ul {
                    margin: 10px 0 0 0;
                    padding-left: 20px;
                }

                .sidebar-year li {
                    margin-bottom: 8px;
                }

                .sidebar-year a {
                    color: #ff0;
                    text-decoration: none;
                }

                .sidebar-year a:hover {
                    color: #f00;
                }

                .sidebar-contact {
                    margin-top: 50px;
                    padding-top: 30px;
                    border-top: 4px solid #ff0;
                }

                .sidebar-contact p {
                    line-height: 1.6;
                    word-break: break-all;
                }

                .sidebar-contact a {
                    color: #ff0;
                    font-size: 1.1em;
                    word-break: break-all;
                    display: inline-block;
                }

                .sidebar-contact a:hover {
                    color: #f00;
                }

                @media (max-width: 1024px) {
                    #blog-sidebar {
                        position: static;
                        margin-top: 60px;
                    }
                }

                @media (max-width: 480px) {
                    .sidebar-contact a {
                        font-size: 1em;
                    }
                }
            </style>

            <h3>Latest Posts</h3>
        `;

        // Latest 4 posts
        latest4.forEach(post => {
            const isActive = post.slug === currentSlug;
            const filename = post.image ? post.image.split('/').pop() : null;
            
            let imageHTML = `
                <div class="sidebar-latest-image-placeholder">
                    <span class="pixelated-text">PIXEL</span>
                </div>
            `;
            
            if (filename) {
                imageHTML = `<img src="../images/${filename}" alt="${post.title}" class="sidebar-latest-image" loading="lazy">`;
            }
            
            sidebarHTML += `
                <div class="sidebar-latest-post ${isActive ? 'active' : ''}">
                    ${imageHTML}
                    <h4 class="sidebar-latest-title">
                        <a href="../blog/${post.slug}">${post.title}</a>
                    </h4>
                    <div class="sidebar-latest-date">${formatDate(post.date)}</div>
                </div>
            `;
        });

        // Archives
        const archiveMap = {};
        blogs.forEach(post => {
            const year = new Date(post.date).getFullYear();
            if (!archiveMap[year]) archiveMap[year] = [];
            archiveMap[year].push(post);
        });

        sidebarHTML += `<div class="sidebar-archive"><h3>Archives</h3>`;
        Object.keys(archiveMap).sort((a, b) => b - a).forEach(year => {
            sidebarHTML += `
                <div class="sidebar-year">
                    <strong>${year}</strong>
                    <ul>
            `;
            archiveMap[year].sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(post => {
                sidebarHTML += `<li><a href="../blog/${post.slug}">${post.title}</a></li>`;
            });
            sidebarHTML += `</ul></div>`;
        });
        sidebarHTML += `</div>`;

        // Contact email
        sidebarHTML += `
            <div class="sidebar-contact">
                <h3>Contact</h3>
                <p>
                    Questions? Feedback?<br>
                    Email: <a href="mailto:lionheartmico@gmail.com">lionheartmico@gmail.com</a>
                </p>
            </div>
        `;

        sidebarContainer.innerHTML = sidebarHTML;

        // Clean up reserved height
        sidebarContainer.style.minHeight = '';

    } catch (error) {
        console.error('Sidebar error:', error);
        sidebarContainer.innerHTML = '<p>Sidebar could not load.</p>';
        sidebarContainer.style.minHeight = '';
    }
});