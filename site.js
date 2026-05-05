const nav = document.querySelector(".site-nav");
const toggle = document.querySelector(".nav-toggle");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

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
