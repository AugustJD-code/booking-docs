// Theme: saved choice, else OS preference
const root = document.documentElement;
let saved = null;
try { saved = localStorage.getItem("theme"); } catch {}
root.dataset.theme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

document.querySelector(".theme-btn").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch {}
});

// Mobile sidebar
const sidebar = document.getElementById("sidebar");
const menuBtn = document.querySelector(".menu-btn");
menuBtn.addEventListener("click", () => {
  const open = sidebar.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
sidebar.addEventListener("click", (e) => {
  if (e.target.tagName === "A") sidebar.classList.remove("open");
});

// Highlight the section in view
const links = [...sidebar.querySelectorAll("a")];
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    links.forEach((a) => a.classList.toggle("active", a.hash === "#" + entry.target.id));
  }
}, { rootMargin: "0px 0px -70% 0px" });
document.querySelectorAll(".content h1[id], .content h2[id]").forEach((h) => observer.observe(h));
