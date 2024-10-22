
// ... rest of your bubble creation code ...

const bubblesContainer = document.querySelector(".bubbles");

function createBubble(x, y) {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  // Set random size
  const size = Math.random() * 20 + 10; // Size between 10px and 30px
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  // Set initial position at the cursor
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;

  // Randomize movement offsets
  const scatterX = (Math.random() - 0.5) * 200; // Scatter range in X direction
  const scatterY = (Math.random() - 1) * 200; // Scatter range in Y direction (upwards)

  // Set CSS custom properties for animation
  bubble.style.setProperty("--scatter-x", `${scatterX}px`);
  bubble.style.setProperty("--scatter-y", `${scatterY}px`);

  // Set random animation duration
  const duration = Math.random() * 2 + 1; // Duration between 1s and 3s
  bubble.style.animation = `scatter ${duration}s forwards`;

  bubblesContainer.appendChild(bubble);

  // Remove bubble after animation
  bubble.addEventListener("animationend", () => {
    bubble.remove();
  });
}


// Create bubbles on mouse move
let lastBubbleTime = 0;
const bubbleInterval = 70; // Reduced from 100 to 20 milliseconds
const bubblesPerEvent = 2; // Number of bubbles to create per event

document.addEventListener("mousemove", (event) => {
  const currentTime = Date.now();
  if (currentTime - lastBubbleTime > bubbleInterval) {
    for (let i = 0; i < bubblesPerEvent; i++) {
      // Create multiple bubbles per event
      createBubble(
        event.clientX + (Math.random() - 0.5) * 20, // Add some randomness to position
        event.clientY + (Math.random() - 0.5) * 20
      );
    }
    lastBubbleTime = currentTime;
  }
});

// Link Hover effects
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

document.querySelectorAll(".links-circle a").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    const randomColor = getRandomColor();
    link.style.setProperty("--glow-color", randomColor);
  });

  link.addEventListener("mouseleave", () => {
    link.style.animation = "none";
    link.offsetHeight; // Trigger reflow
    link.style.animation = null;
  });
});


// Keyframes for the scattering effect
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `
@keyframes scatter {
    0% {
        transform: translate(0, 0);
        opacity: 1;
    }
    100% {
        transform: translate(var(--scatter-x), var(--scatter-y));
        opacity: 0;
    }
}`,
  styleSheet.cssRules.length
);
