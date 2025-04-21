// Section and Timeline Intersection Observers (unchanged)
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);
sections.forEach((section) => observer.observe(section));

const timelineItems = document.querySelectorAll(".timeline-item");
const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.5 }
);
timelineItems.forEach((item) => timelineObserver.observe(item));

// Countdown Logic (unchanged)
const countdownDate = new Date("2026-02-14T00:00:00").getTime();
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const timeUnits = document.getElementById("time-units");
const foreverEl = document.getElementById("forever");
const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = countdownDate - now;
  if (distance < 0) {
    timeUnits.style.display = "none";
    foreverEl.style.display = "block";
    return;
  }
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  daysEl.innerText = days;
  hoursEl.innerText = hours;
  minutesEl.innerText = minutes;
  secondsEl.innerText = seconds;
};
updateCountdown();
setInterval(updateCountdown, 1000);

// Lightbox with Touch Support
let touchStartX = 0;
let touchEndX = 0;
const galleryImages = [
  {
    src: "./assets/butterfly1.png",
    caption: "A wish for endless laughter, the kind that fills every moment we share: Where your smile lights up even the quietest of days",
  },
  {
    src: "./assets/butterfly2.png",
    caption: "A wish for stolen moments: Where your voice, gentle and sweet, is the melody I hold close, and your hand in mine makes the world feel just right",
  },
  {
    src: "./assets/butterfly3.png",
    caption: "A wish for peaceful nights: Where I find solace in your presence, in the warmth of your embrace, and in the sound of your voice that calms my heart",
  },
  {
    src: "./assets/butterfly4.png",
    caption: "A wish for forever: Where time stops as we walk side by side, hand in hand, creating memories of love that will last a lifetime",
  },
];
let currentImageIndex = -1;

function openLightbox(img, caption) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");

  // Find the index of the clicked image
  currentImageIndex = galleryImages.findIndex((item) => item.src === img.src);

  lightboxImg.src = img.src;
  lightboxCaption.innerText = caption;
  lightbox.style.display = "flex";
  setTimeout(() => {
    lightboxImg.style.transform = "scale(1)";
    lightboxCaption.style.opacity = "1";
  }, 10);

  // Prevent pinch-to-zoom and default touch behaviors
  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  lightbox.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  // Close lightbox on tap
  lightbox.addEventListener("click", closeLightbox);
  lightbox.addEventListener("touchend", (e) => {
    // Only close if it's a tap, not a swipe
    if (Math.abs(touchEndX - touchStartX) < 30) {
      closeLightbox();
    }
  });
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  lightboxImg.style.transform = "scale(0)";
  lightboxCaption.style.opacity = "0";
  setTimeout(() => {
    lightbox.style.display = "none";
  }, 300);
}

function handleSwipe() {
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const swipeThreshold = 50; // Minimum swipe distance in pixels

  if (touchEndX < touchStartX - swipeThreshold) {
    // Swipe left: go to next image
    if (currentImageIndex < galleryImages.length - 1) {
      currentImageIndex++;
      lightboxImg.style.transform = "scale(0)";
      lightboxCaption.style.opacity = "0";
      setTimeout(() => {
        lightboxImg.src = galleryImages[currentImageIndex].src;
        lightboxCaption.innerText = galleryImages[currentImageIndex].caption;
        lightboxImg.style.transform = "scale(1)";
        lightboxCaption.style.opacity = "1";
      }, 300);
    }
  } else if (touchEndX > touchStartX + swipeThreshold) {
    // Swipe right: go to previous image
    if (currentImageIndex > 0) {
      currentImageIndex--;
      lightboxImg.style.transform = "scale(0)";
      lightboxCaption.style.opacity = "0";
      setTimeout(() => {
        lightboxImg.src = galleryImages[currentImageIndex].src;
        lightboxCaption.innerText = galleryImages[currentImageIndex].caption;
        lightboxImg.style.transform = "scale(1)";
        lightboxCaption.style.opacity = "1";
      }, 300);
    }
  }
}

// Music Button with Touch Support
const musicButton = document.getElementById("musicButton");
const backgroundMusic = document.getElementById("backgroundMusic");
const musicText = document.getElementById("musicText");

let isPlaying = false;

function toggleMusic() {
  if (isPlaying) {
    backgroundMusic.pause();
    musicText.textContent = "Play Music";
  } else {
    backgroundMusic.play().catch((error) => {
      console.error("Audio playback failed:", error);
    });
    musicText.textContent = "Pause Music";
  }
  isPlaying = !isPlaying;
}

// Add both click and touchstart for music button
musicButton.addEventListener("click", toggleMusic);
musicButton.addEventListener("touchstart", (e) => {
  e.preventDefault(); // Prevent double-tap zoom or other default behaviors
  toggleMusic();
});

// Prevent pinch-to-zoom on the entire page (optional, can be adjusted)
document.addEventListener(
  "touchstart",
  (e) => {
    if (e.touches.length > 1) {
      e.preventDefault(); // Prevent pinch-to-zoom
    }
  },
  { passive: false }
);
