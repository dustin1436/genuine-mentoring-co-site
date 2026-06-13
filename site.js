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

if ("IntersectionObserver" in window) {
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
} else {
  document.querySelectorAll("[data-reveal]").forEach((element) => {
    element.classList.add("is-visible");
  });
}

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

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
    const marker = button.querySelector("span:last-child");
    if (marker) marker.textContent = isOpen ? "-" : "+";
  });
});

document.querySelectorAll("form[data-preview-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const notice = form.querySelector("[data-form-notice]");
    if (notice) {
      notice.textContent = "Thanks. The public form endpoint gets connected at launch; this preview is showing the final inquiry flow.";
      notice.removeAttribute("hidden");
    }
  });
});
