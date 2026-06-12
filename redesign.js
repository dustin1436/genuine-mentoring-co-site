const body = document.body;
const nav = document.querySelector(".site-nav");
const toggle = document.querySelector(".nav-toggle");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll("[data-reveal]").forEach((element) => {
  revealObserver.observe(element);
});

let ticking = false;

function updateScrollEffects() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);
  const shift = Math.min(36, window.scrollY * 0.035);
  document.documentElement.style.setProperty("--hero-shift", shift.toFixed(2));
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
}, { passive: true });

updateScrollEffects();
