document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Close mobile menu when clicking a link
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
  
  // Add scroll progress indicator
  const progressBar = document.createElement("div");
  progressBar.classList.add("progress-bar");
  document.body.appendChild(progressBar);
  
  window.addEventListener("scroll", () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
    
    // Check for elements to animate on scroll
    animateOnScroll();
  });

  // Highlight active nav section on scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("header nav a");
  
  function highlightNavOnScroll() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active-link');
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavOnScroll);

  // Animate elements on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight * 0.85;
      
      if (elementPosition < screenPosition) {
        element.classList.add('active');
      }
    });
  }

  // Initialize the animation check on page load
  animateOnScroll();

  // 3D Tilt effect for cards
  const tiltCards = document.querySelectorAll('.tilt-card');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      
      const angleX = (e.clientY - cardCenterY) / 15;
      const angleY = (cardCenterX - e.clientX) / 15;
      
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });

  // Parallax effect for background elements
  const parallaxItems = document.querySelectorAll('.parallax');
  
  window.addEventListener('mousemove', function(e) {
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;
    
    parallaxItems.forEach(item => {
      const speed = item.getAttribute('data-speed') || 0.05;
      const xPos = (x * speed * 100) - 50;
      const yPos = (y * speed * 100) - 50;
      
      item.style.transform = `translate3d(${xPos}px, ${yPos}px, 0px)`;
    });
  });

  // Enhanced Form Validation with animation
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      // Basic form validation
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      if (!name || !email || !message) {
        // Enhanced error notification
        showNotification("Please fill in all fields", "error");
        return;
      }

      // Show success animation instead of alert
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
      
      // Simulate sending (would be an actual fetch/ajax call in production)
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Sent!';
        submitBtn.classList.add('bg-green-500');
        
        showNotification("Thank you for your message! I'll get back to you soon.", "success");
        
        setTimeout(() => {
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
          submitBtn.classList.remove('bg-green-500');
        }, 2000);
      }, 1500);
    });
  }

  // Custom notification function
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 py-3 px-6 rounded-lg text-white font-medium z-50 transform translate-y-full opacity-0 transition-all duration-300`;
    
    if (type === "error") {
      notification.classList.add('bg-red-500');
    } else {
      notification.classList.add('bg-green-500');
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.classList.remove('translate-y-full', 'opacity-0');
    }, 10);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      notification.classList.add('translate-y-full', 'opacity-0');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Type writing effect for hero heading
  const heroHeading = document.querySelector('#home h1');
  if (heroHeading) {
    const originalText = heroHeading.innerHTML;
    const nameElement = heroHeading.querySelector('span');
    
    // Apply typing effect to name only
    if (nameElement) {
      nameElement.classList.add('typing-text');
    }
  }
});
