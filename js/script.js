
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    // e.preventDefault();
    document
      .querySelector(link.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mouseenter', e => {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;

    if (e.clientX < centerX) {
      card.classList.add('tilt-left');
      card.classList.remove('tilt-right');
    } else {
      card.classList.add('tilt-right');
      card.classList.remove('tilt-left');
    }
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('tilt-left', 'tilt-right');
  });
});


function easeOutCubic(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -12 * t);
}

window.addEventListener('load', () => {
  const counters = document.querySelectorAll('.stat-value');

  counters.forEach(counter => {
    const target = +counter.dataset.target;
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      counter.textContent = Math.floor(eased * target);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    }

    requestAnimationFrame(update);
  });
});

const boxes = document.querySelectorAll('.box');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

boxes.forEach(box => observer.observe(box));

const images = document.querySelectorAll(".expandable");
const overlay = document.getElementById("overlay");
const overlayImg = document.getElementById("overlay-img");
const closeBtn = document.getElementById("close");

images.forEach(img => {
    img.addEventListener("click", () => {
        overlay.style.display = "flex";
        overlayImg.src = img.src;
    });
});

closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
});

overlay.addEventListener("click", (e) => {
    if(e.target === overlay) overlay.style.display = "none";
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

let scale = 1;
let isDragging = false;
let startX, startY, translateX = 0, translateY = 0;

images.forEach(img => {
    img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
        resetZoom();
    });
});

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.style.display = "none";
});


lightboxImg.addEventListener("wheel", (e) => {
    e.preventDefault();
    scale += e.deltaY * -0.001;
    scale = Math.min(Math.max(1, scale), 5);
    updateTransform();
});


lightboxImg.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    lightboxImg.style.cursor = "grabbing";
});

window.addEventListener("mouseup", () => {
    isDragging = false;
    lightboxImg.style.cursor = "grab";
});

window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateTransform();
});

function updateTransform() {
    lightboxImg.style.transform =
        `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

function resetZoom() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    updateTransform();
}
