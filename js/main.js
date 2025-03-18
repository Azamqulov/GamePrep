document.addEventListener("DOMContentLoaded", () => {
    // Preloader
    setTimeout(() => {
      const preloader = document.querySelector(".preloader")
      preloader.classList.add("fade-out")
      setTimeout(() => {
        preloader.style.display = "none"
      }, 500)
    }, 2000)
  
    // Initialize AOS Animation Library
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      })
    }
  
    // Custom Cursor
    const cursor = document.querySelector(".custom-cursor")
    const cursorFollower = document.querySelector(".cursor-follower")
    const links = document.querySelectorAll("a, button")
  
    if (window.innerWidth > 768) {
      cursor.style.display = "block"
      cursorFollower.style.display = "block"
  
      document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px"
        cursor.style.top = e.clientY + "px"
  
        setTimeout(() => {
          cursorFollower.style.left = e.clientX + "px"
          cursorFollower.style.top = e.clientY + "px"
        }, 100)
      })
  
      links.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          cursor.style.width = "0"
          cursor.style.height = "0"
          cursorFollower.style.width = "50px"
          cursorFollower.style.height = "50px"
          cursorFollower.style.borderWidth = "3px"
          cursorFollower.style.borderColor = "var(--accent-color)"
        })
  
        link.addEventListener("mouseleave", () => {
          cursor.style.width = "8px"
          cursor.style.height = "8px"
          cursorFollower.style.width = "40px"
          cursorFollower.style.height = "40px"
          cursorFollower.style.borderWidth = "2px"
          cursorFollower.style.borderColor = "var(--primary-color)"
        })
      })
    }
  
    // Theme Toggle
    const themeToggle = document.getElementById("themeToggle")
    const body = document.body
  
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("light-theme")
  
      if (body.classList.contains("light-theme")) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
        localStorage.setItem("theme", "light")
      } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
        localStorage.setItem("theme", "dark")
      }
    })
  
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light") {
      body.classList.add("light-theme")
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
    }
  
    // Header scroll effect
    const header = document.querySelector(".header")
    const backToTop = document.getElementById("backToTop")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.classList.add("scrolled")
        backToTop.classList.add("active")
      } else {
        header.classList.remove("scrolled")
        backToTop.classList.remove("active")
      }
    })
  
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const navList = document.querySelector(".nav-list")
  
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", function () {
        this.classList.toggle("active")
        navList.classList.toggle("active")
      })
    }
  
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll(".nav-list a")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuBtn.classList.remove("active")
        navList.classList.remove("active")
      })
    })
  
    // Active nav link on scroll
    const sections = document.querySelectorAll("section[id]")
  
    function scrollActive() {
      const scrollY = window.pageYOffset
  
      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 100
        const sectionId = current.getAttribute("id")
        const navLink = document.querySelector(`.nav-list a[href*=${sectionId}]`)
  
        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add("active")
        } else if (navLink) {
          navLink.classList.remove("active")
        }
      })
    }
  
    window.addEventListener("scroll", scrollActive)
  
    // Animated Counter
    const counters = document.querySelectorAll(".stat-number")
    const speed = 200
  
    function animateCounters() {
      counters.forEach((counter) => {
        const target = +counter.dataset.count
        const count = +counter.innerText
        const increment = target / speed
  
        if (count < target) {
          counter.innerText = Math.ceil(count + increment)
          setTimeout(animateCounters, 1)
        } else {
          counter.innerText = target
        }
      })
    }
  
    // Check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect()
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      )
    }
  
    // Start counter animation when stats section is in viewport
    window.addEventListener("scroll", () => {
      const statsSection = document.querySelector(".hero-stats")
      if (statsSection && isInViewport(statsSection)) {
        animateCounters()
      }
    })
  
    // Portfolio Filter
    const filterBtns = document.querySelectorAll(".filter-btn")
    const portfolioItems = document.querySelectorAll(".portfolio-item")
  
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        filterBtns.forEach((btn) => btn.classList.remove("active"))
  
        // Add active class to clicked button
        btn.classList.add("active")
  
        const filterValue = btn.getAttribute("data-filter")
  
        portfolioItems.forEach((item) => {
          if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
            item.style.display = "block"
            setTimeout(() => {
              item.style.opacity = "1"
              item.style.transform = "scale(1)"
            }, 100)
          } else {
            item.style.opacity = "0"
            item.style.transform = "scale(0.9)"
            setTimeout(() => {
              item.style.display = "none"
            }, 300)
          }
        })
      })
    })
  
    // Testimonial Slider
    const testimonialTrack = document.querySelector(".testimonial-track")
    const testimonialCards = document.querySelectorAll(".testimonial-card")
    const prevBtn = document.querySelector(".testimonial-prev")
    const nextBtn = document.querySelector(".testimonial-next")
    const dots = document.querySelectorAll(".dot")
  
    let currentIndex = 0
    const cardWidth = 100 // 100%
  
    function updateSlider() {
      testimonialTrack.style.transform = `translateX(-${currentIndex * cardWidth}%)`
  
      // Update dots
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex)
      })
    }
  
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : testimonialCards.length - 1
        updateSlider()
      })
  
      nextBtn.addEventListener("click", () => {
        currentIndex = currentIndex < testimonialCards.length - 1 ? currentIndex + 1 : 0
        updateSlider()
      })
    }
  
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentIndex = index
        updateSlider()
      })
    })
  
    // Auto slide testimonials
    setInterval(() => {
      if (nextBtn) {
        currentIndex = currentIndex < testimonialCards.length - 1 ? currentIndex + 1 : 0
        updateSlider()
      }
    }, 5000)
  
    // Language Selector Animation
    const languageTags = document.querySelectorAll(".language-tag")
  
    function animateLanguageTags() {
      languageTags.forEach((tag, index) => {
        setTimeout(() => {
          tag.classList.add("visible")
          setTimeout(() => {
            tag.classList.remove("visible")
          }, 2000)
        }, index * 300)
      })
    }
  
    // Run language tag animation on load and every 5 seconds
    animateLanguageTags()
    setInterval(animateLanguageTags, 5000)
  
    // Globe Animation
    const globeCanvas = document.getElementById("globeCanvas")
    if (globeCanvas) {
      const ctx = globeCanvas.getContext("2d")
      let width = (globeCanvas.width = 300)
      let height = (globeCanvas.height = 300)
      const centerX = width / 2
      const centerY = height / 2
      const radius = 120
  
      // Resize canvas on window resize
      window.addEventListener("resize", () => {
        width = globeCanvas.width = 300
        height = globeCanvas.height = 300
      })
  
      // Draw globe
      function drawGlobe(rotation) {
        ctx.clearRect(0, 0, width, height)
  
        // Draw globe background
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(99, 102, 241, 0.2)"
        ctx.fill()
  
        // Draw meridians
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI + rotation
  
          ctx.beginPath()
          ctx.ellipse(centerX, centerY, radius, radius * Math.abs(Math.cos(angle)), 0, 0, Math.PI * 2)
          ctx.strokeStyle = "rgba(99, 102, 241, 0.5)"
          ctx.stroke()
        }
  
        // Draw parallels
        for (let i = 1; i < 5; i++) {
          const parallRadius = (radius / 5) * i
  
          ctx.beginPath()
          ctx.arc(centerX, centerY, parallRadius, 0, Math.PI * 2)
          ctx.strokeStyle = "rgba(99, 102, 241, 0.5)"
          ctx.stroke()
        }
  
        // Draw continents (simplified)
        const continents = [
          { x: -0.3, y: 0.2, w: 0.2, h: 0.15 }, // North America
          { x: -0.1, y: 0.4, w: 0.15, h: 0.2 }, // South America
          { x: 0.1, y: 0.15, w: 0.15, h: 0.2 }, // Europe
          { x: 0.2, y: 0.3, w: 0.25, h: 0.25 }, // Africa
          { x: 0.4, y: 0.1, w: 0.2, h: 0.2 }, // Asia
          { x: 0.5, y: 0.5, w: 0.15, h: 0.1 }, // Australia
        ]
  
        continents.forEach((continent) => {
          const x = centerX + radius * continent.x * Math.cos(rotation)
          const y = centerY + radius * continent.y
          const w = radius * continent.w * Math.cos(rotation + continent.x)
          const h = radius * continent.h
  
          if (Math.cos(rotation + continent.x) > 0) {
            ctx.beginPath()
            ctx.ellipse(x, y, w, h, 0, 0, Math.PI * 2)
            ctx.fillStyle = "rgba(99, 102, 241, 0.8)"
            ctx.fill()
          }
        })
      }
  
      // Animate globe
      let rotation = 0
      function animateGlobe() {
        rotation += 0.01
        drawGlobe(rotation)
        requestAnimationFrame(animateGlobe)
      }
  
      animateGlobe()
    }
  
    // Process Timeline Animation
    const processSteps = document.querySelectorAll(".process-step")
  
    processSteps.forEach((step, index) => {
      step.addEventListener("mouseenter", () => {
        processSteps.forEach((s) => s.classList.remove("active"))
        step.classList.add("active")
      })
  
      // Set first step as active by default
      if (index === 0) {
        step.classList.add("active")
      }
    })
  
    // Contact Form Submission
    const contactForm = document.getElementById("contactForm")
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault()
  
        // Simple form validation
        const name = this.querySelector('input[name="name"]').value
        const email = this.querySelector('input[name="email"]').value
        const message = this.querySelector('textarea[name="message"]').value
  
        if (!name || !email || !message) {
          alert("Please fill in all required fields")
          return
        }
  
        // Show success message
        const formGroups = this.querySelectorAll(".form-group")
        const submitBtn = this.querySelector('button[type="submit"]')
  
        formGroups.forEach((group) => {
          group.style.opacity = "0"
          group.style.transform = "translateY(-20px)"
          group.style.transition = "all 0.3s ease"
        })
  
        submitBtn.style.opacity = "0"
        submitBtn.style.transform = "translateY(-20px)"
        submitBtn.style.transition = "all 0.3s ease"
  
        setTimeout(() => {
          const successMessage = document.createElement("div")
          successMessage.className = "success-message"
          successMessage.innerHTML = `
            <div style="text-align: center; padding: 30px;">
              <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 20px;"></i>
              <h3 style="font-family: 'Exo 2', sans-serif; margin-bottom: 15px;">Message Sent!</h3>
              <p>Thank you for reaching out. We'll get back to you soon!</p>
            </div>
          `
  
          this.innerHTML = ""
          this.appendChild(successMessage)
  
          // Reset form after 5 seconds
          setTimeout(() => {
            window.location.reload()
          }, 5000)
        }, 300)
      })
    }
  
    // Newsletter Form Submission
    const newsletterForms = document.querySelectorAll(".newsletter-form")
    newsletterForms.forEach((form) => {
      form.addEventListener("submit", function (e) {
        e.preventDefault()
  
        const emailInput = this.querySelector('input[type="email"]')
        const email = emailInput.value
  
        if (!email) {
          alert("Please enter your email address")
          return
        }
  
        // Simulate form submission
        emailInput.value = ""
  
        // Create and show success message
        const parent = this.parentElement
        const successMessage = document.createElement("p")
        successMessage.className = "newsletter-success"
        successMessage.textContent = "Thank you for subscribing!"
        successMessage.style.color = "var(--primary-color)"
        successMessage.style.marginTop = "10px"
        successMessage.style.fontWeight = "500"
  
        // Remove any existing success message
        const existingMessage = parent.querySelector(".newsletter-success")
        if (existingMessage) {
          existingMessage.remove()
        }
  
        parent.appendChild(successMessage)
      })
    })
  
    // Cookie Consent
    const cookieConsent = document.getElementById("cookieConsent")
    const cookieAccept = document.getElementById("cookieAccept")
  
    // Check if user has already accepted cookies
    if (!localStorage.getItem("cookieConsent")) {
      // Show the cookie consent popup after 2 seconds
      setTimeout(() => {
        cookieConsent.classList.add("show")
      }, 2000)
    }
  
    // Add event listener to the accept button
    if (cookieAccept) {
      cookieAccept.addEventListener("click", () => {
        // Set localStorage to remember user's choice
        localStorage.setItem("cookieConsent", "accepted")
  
        // Hide the cookie consent popup
        cookieConsent.classList.remove("show")
      })
    }
  
    // Language Dropdown
    const langDropdown = document.querySelector(".lang-dropdown")
    const langCurrent = document.querySelector(".lang-current")
  
    if (langCurrent) {
      langCurrent.addEventListener("click", () => {
        langDropdown.classList.toggle("active")
      })
  
      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".lang-selector")) {
          langDropdown.classList.remove("active")
        }
      })
    }
  
    // Service Card Hover Animation
    const serviceCards = document.querySelectorAll(".service-card")
  
    serviceCards.forEach((card) => {
      const icon = card.querySelector(".service-icon")
      const overlay = card.querySelector(".service-overlay")
  
      card.addEventListener("mouseenter", () => {
        icon.style.transform = "translateY(-10px) scale(1.1)"
        overlay.style.opacity = "1"
      })
  
      card.addEventListener("mouseleave", () => {
        icon.style.transform = "translateY(0) scale(1)"
        overlay.style.opacity = "0"
      })
    })
  
    // Team Member Hover Effect
    const teamCards = document.querySelectorAll(".team-card")
  
    teamCards.forEach((card) => {
      const socialIcons = card.querySelector(".team-social")
      const overlay = card.querySelector(".team-overlay")
  
      card.addEventListener("mouseenter", () => {
        socialIcons.style.transform = "translateY(0)"
        overlay.style.opacity = "0.7"
      })
  
      card.addEventListener("mouseleave", () => {
        socialIcons.style.transform = "translateY(100%)"
        overlay.style.opacity = "0"
      })
    })
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          // Get header height for offset
          const headerHeight = document.querySelector(".header").offsetHeight
  
          window.scrollTo({
            top: targetElement.offsetTop - headerHeight,
            behavior: "smooth",
          })
        }
      })
    })
  
    // World Map Interaction
    const worldMap = document.querySelector(".world-map")
    const languageInfo = document.querySelector(".language-info")
  
    if (worldMap) {
      const regions = worldMap.querySelectorAll(".map-region")
  
      regions.forEach((region) => {
        region.addEventListener("mouseenter", () => {
          const regionName = region.getAttribute("data-region")
          const languages = region.getAttribute("data-languages")
  
          languageInfo.innerHTML = `
            <h4>${regionName}</h4>
            <p>${languages}</p>
          `
          languageInfo.style.opacity = "1"
  
          regions.forEach((r) => r.classList.remove("active"))
          region.classList.add("active")
        })
  
        region.addEventListener("mouseleave", () => {
          languageInfo.style.opacity = "0"
          region.classList.remove("active")
        })
      })
    }
  
    // Initialize particles.js
    if (typeof particlesJS !== "undefined" && document.getElementById("particles-js")) {
      particlesJS("particles-js", {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#6366f1",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000",
            },
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#6366f1",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1,
              },
            },
            push: {
              particles_nb: 4,
            },
          },
        },
        retina_detect: true,
      })
    }
  })
  
  