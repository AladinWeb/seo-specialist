document.addEventListener('DOMContentLoaded', () => {
  // Header Component
  const header = document.getElementById('header');
  header.innerHTML = `
    <nav class="bg-white shadow-md py-4">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <a href="index.html" class="flex items-center space-x-2">
          <img src="images/logo-placeholder.png" alt="Site Logo" class="h-10 w-10 rounded-[10px]">
          <div class="text-2xl font-bold text-white logo-title">Logo</div>
        </a>
        <div class="hidden md:flex space-x-6">
          <a href="#" class="nav-link text-white">Home</a>
          <a href="#" class="nav-link text-white">About</a>
          <a href="#" class="nav-link text-white">Services</a>
          <a href="#" class="nav-link text-white">Contact</a>
        </div>
        <div class="md:hidden">
          <button class="hamburger flex flex-col justify-center items-center space-y-1">
            <div class="line1 w-6 h-0.5 bg-white"></div>
            <div class="line2 w-6 h-0.5 bg-white"></div>
            <div class="line3 w-6 h-0.5 bg-white"></div>
          </button>
        </div>
      </div>
      <div class="mobile-menu hidden md:hidden bg-white shadow-md">
        <a href="#" class="block py-2 px-4 text-white nav-link">Home</a>
        <a href="#" class="block py-2 px-4 text-white nav-link">About</a>
        <a href="#" class="block py-2 px-4 text-white nav-link">Services</a>
        <a href="#" class="block py-2 px-4 text-white nav-link">Contact</a>
      </div>
    </nav>
  `;

  // Footer Component
  const footer = document.getElementById('footer');
  footer.innerHTML = `
    <div class="bg-gray-800 text-white py-8">
      <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-lg font-bold mb-4">About Us</h3>
          <p class="text-gray-400">Add your about us content here.</p>
        </div>
        <div>
          <h3 class="text-lg font-bold mb-4">Links</h3>
          <ul class="space-y-2">
            <li><a href="#" class="footer-link text-gray-400">Home</a></li>
            <li><a href="#" class="footer-link text-gray-400">About</a></li>
            <li><a href="#" class="footer-link text-gray-400">Services</a></li>
            <li><a href="#" class="footer-link text-gray-400">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-bold mb-4">Contact</h3>
          <p class="text-gray-400">Add your contact info here.</p>
        </div>
      </div>
      <div class="mt-8 text-center text-gray-400">
        <p>© 2025 Your Website. All rights reserved.</p>
      </div>
    </div>
  `;

  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('hidden');
  });
});