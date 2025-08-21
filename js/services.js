// Service data (like a JSON object) - content and image for each service
const serviceData = {
  'seo-services': {
    title: 'SEO Services',
    description: 'SEO (Search Engine Optimization) involves optimizing your website to rank higher in search engine results pages (SERPs) like Google. Our services include keyword research to identify high-traffic terms relevant to Bulacan businesses, on-page optimization (e.g., meta tags, content structure), off-page strategies like building quality backlinks, and local SEO to target customers in your area. This drives organic traffic, increases visibility, and boosts conversions without relying on paid ads.',
    image: 'https://source.unsplash.com/random/600x400/?seo' // Replace with your image URL
  },
  'web-development': {
    title: 'Web Development',
    description: 'Web development is the process of building and maintaining websites or web applications. We create responsive, user-friendly sites using technologies like HTML, CSS, JavaScript, and frameworks (e.g., React or WordPress). For Bulacan businesses, we focus on e-commerce integration, mobile optimization, fast loading times, and SEO-friendly structures to enhance user experience and drive sales. Whether it’s a simple landing page or a complex platform, our sites are scalable and secure.',
    image: 'https://source.unsplash.com/random/600x400/?web-development' // Replace with your image URL
  },
  'social-media-marketing': {
    title: 'Social Media Marketing',
    description: 'Social media marketing leverages platforms like Facebook, Instagram, LinkedIn, and Twitter to promote your brand. We craft targeted ad campaigns, create engaging content (posts, stories, reels), manage community interactions, and analyze performance metrics. For Bulacan audiences, we emphasize local targeting, influencer partnerships, and viral strategies to build brand loyalty, increase followers, and drive traffic to your site or store.',
    image: 'https://source.unsplash.com/random/600x400/?social-media' // Replace with your image URL
  },
  'content-marketing': {
    title: 'Content Marketing',
    description: 'Content marketing focuses on creating and distributing valuable content to attract and engage your audience. This includes blog posts, videos, infographics, ebooks, and newsletters optimized for SEO. We help Bulacan businesses establish thought leadership by researching topics, producing high-quality materials, and promoting them across channels. The goal is to nurture leads, improve search rankings, and convert visitors into loyal customers through informative, non-salesy content.',
    image: 'https://source.unsplash.com/random/600x400/?content-marketing' // Replace with your image URL
  }
};

// Get elements
const modal = document.getElementById('service-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalImage = document.getElementById('modal-image');
const closeBtn = document.querySelector('.modal-close');

// Add click listeners to all service cards
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
    const service = card.getAttribute('data-service');
    const data = serviceData[service];

    if (data) {
      modalTitle.textContent = data.title;
      modalDescription.textContent = data.description;
      modalImage.src = data.image;
      modal.style.display = 'flex';

      // Update URL with query param (no page reload)
      history.pushState({}, '', `${window.location.pathname}?${service}`);
    }
  });
});

// Close modal on close button click
closeBtn.addEventListener('click', closeModal);

// Close modal on outside click
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Function to close modal and reset URL
function closeModal() {
  modal.style.display = 'none';
  // Revert URL by removing query param
  history.pushState({}, '', window.location.pathname);
}