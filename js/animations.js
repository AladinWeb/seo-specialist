document.addEventListener('DOMContentLoaded', () => {
  // Fade in sections on scroll
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeIn');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => observer.observe(section));

  // Header scroll effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('bg-opacity-90', 'backdrop-blur-md');
    } else {
      header.classList.remove('bg-opacity-90', 'backdrop-blur-md');
    }
  });
});