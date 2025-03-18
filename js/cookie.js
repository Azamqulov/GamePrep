// Function to set a cookie
function setCookie(name, value, days) {
    let expires = ""
    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      expires = "; expires=" + date.toUTCString()
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/"
  }
  
  // Function to get a cookie
  function getCookie(name) {
    const nameEQ = name + "="
    const ca = document.cookie.split(";")
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === " ") c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  }
  
  // Function to handle the cookie consent
  function handleCookieConsent() {
    const cookieConsent = document.getElementById("cookieConsent")
    const cookieAccept = document.getElementById("cookieAccept")
  
    // Check if user has already accepted cookies
    if (!getCookie("cookieConsent")) {
      // Show the cookie consent popup
      cookieConsent.style.display = "block"
    }
  
    // Add event listener to the accept button
    if (cookieAccept) {
      cookieAccept.addEventListener("click", () => {
        // Set cookie to remember user's choice (valid for 30 days)
        setCookie("cookieConsent", "accepted", 30)
  
        // Hide the cookie consent popup
        cookieConsent.style.display = "none"
      })
    }
  }
  
  // Run the function when the DOM is fully loaded
  document.addEventListener("DOMContentLoaded", handleCookieConsent)
  
  