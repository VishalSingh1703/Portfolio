// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Get the div element
  const divToAnimate = document.querySelector(".fade-in-div");
  
  // Function to handle scroll events and trigger the animation
  function handleScroll() {
    if (isInViewport(divToAnimate)) {
      divToAnimate.classList.add("fade-in");
      window.removeEventListener("scroll", handleScroll);
    }
  }
  
  // Add a scroll event listener
  window.addEventListener("scroll", handleScroll);
  