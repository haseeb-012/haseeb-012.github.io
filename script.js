document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuBtn = document.getElementById("menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden")
  })

  // Close mobile menu when clicking a link
  const mobileLinks = mobileMenu.querySelectorAll("a")
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden")
    })
  })
  // Form Validation
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      
      // Basic form validation
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const message = document.getElementById("message").value

      if (!name || !email || !message) {
        alert("Please fill in all fields")
        return
      }

      // Show success message
      alert("Thank you for your message! I will get back to you soon.")
      contactForm.reset()
    })
  }
})
