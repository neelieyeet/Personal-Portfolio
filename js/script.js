
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
