
// ==============================================
// START MENU TOGGLE FUNCTIONALITY
// ==============================================

// Toggle start menu visibility
const startBtn = document.getElementById("startBtn");
const startMenu = document.getElementById("startMenu");

startBtn.addEventListener("click", () => {
  startMenu.classList.toggle("hidden");
});

// Close the start menu when clicking outside
document.addEventListener("click", (e) => {
  const startMenu = document.getElementById("startMenu");
  const startBtn = document.getElementById("startBtn");

  if (!startMenu.contains(e.target) && !startBtn.contains(e.target)) {
    startMenu.classList.add("hidden");
  }
});

// ==============================================
// OPEN AND CLOSE WINDOW FUNCTIONS
// ==============================================

// Open window on icon click
document.querySelectorAll(".icon").forEach((icon) => {
  icon.addEventListener("click", () => {
    const targetId = icon.dataset.window;
    document.getElementById(targetId).classList.add("open");
  });
});

// Add close functionality to window close buttons
document.querySelectorAll(".close-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".window").classList.remove("open");
  });
});

// ==============================================
// Z-INDEX HANDLING
// ==============================================

let zIndexCounter = 10;

// Bring window to front when clicked
document.querySelectorAll(".window").forEach((win) => {
  win.addEventListener("mousedown", () => {
    zIndexCounter++;
    win.style.zIndex = zIndexCounter;
  });
});

// ==============================================
// CLOCK DISPLAY (AM/PM)
// ==============================================

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  document.querySelector(".clock").textContent = `${hours}:${minutes} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();

// ==============================================
// DRAGGABLE WINDOW FUNCTIONALITY
// ==============================================

document.querySelectorAll(".window").forEach((win) => {
  const titleBar = win.querySelector(".title-bar");

  let isDragging = false;
  let offsetX, offsetY;

  titleBar.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    win.style.zIndex = 1000; // Bring to front
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const winWidth = win.offsetWidth;
    const winHeight = win.offsetHeight;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    let newLeft = e.clientX - offsetX;
    let newTop = e.clientY - offsetY;

    // Keep window within viewport bounds
    newLeft = Math.max(0, Math.min(screenW - winWidth, newLeft));
    newTop = Math.max(0, Math.min(screenH - winHeight, newTop));

    win.style.left = `${newLeft}px`;
    win.style.top = `${newTop}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
});

// ==============================================
// CLOSE ALL WINDOWS (UTILITY)
// ==============================================

function closeAllWindows() {
  document.querySelectorAll(".window").forEach((win) => {
    win.classList.remove("open");
  });
}

// ==============================================
// ACCESSIBILITY: ICON KEYBOARD NAVIGATION
// ==============================================

document.querySelectorAll(".icon").forEach((icon) => {
  icon.addEventListener("click", () => {
    const targetId = icon.dataset.window;
    document.getElementById(targetId).classList.add("open");
  });

  icon.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const targetId = icon.dataset.window;
      document.getElementById(targetId).classList.add("open");
    }
  });
});
