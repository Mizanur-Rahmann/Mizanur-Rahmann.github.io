// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return; // Skip empty links

    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Active link highlighting
// Active link highlighting - FIXED
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  let current = "";
  const scrollPosition = window.scrollY + 100; // Offset for navbar

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  // If no section is active (at the very top), default to home
  if (current === "" && window.scrollY < 100) {
    current = "home";
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href").replace("#", "");
    if (href === current) {
      link.classList.add("active");
    }
  });
}

// Call on scroll and page load
window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);

// Form handling (prevents default, shows success message)
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Here you would normally send the form data to a backend
    // For now, show a success message
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    console.log("Form submitted:", data);

    // Show success message
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all sections and cards
document
  .querySelectorAll("section, .grid-item, .skill-category, .contact-item")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// Parallax effect for hero gradient
document.addEventListener("mousemove", (e) => {
  const sphere = document.querySelector(".gradient-sphere");
  if (sphere) {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    sphere.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
  }
});

// Simple Parallax Effect
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const hero = document.querySelector(".hero");
  const sphere = document.querySelector(".gradient-sphere");

  if (sphere) {
    // Move sphere at different speed
    sphere.style.transform = `translateY(${scrolled * 0.5}px) scale(${1 + scrolled * 0.001})`;
  }
});
