// Small interactions for the portfolio. Update your real links in this file before publishing.
const menuToggle = document.querySelector("#menuToggle");
const navMenu = document.querySelector("#navMenu");

menuToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) {
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-label", "Open navigation");
    }
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

// Replace these sample values with your own links.
// Example: "https://github.com/your-username"
const profileLinks = {
  email: "your.email@example.com",
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/"
};

document.querySelector("#emailLink").href = `mailto:${profileLinks.email}`;
document.querySelector("#githubLink").href = profileLinks.github;
document.querySelector("#linkedinLink").href = profileLinks.linkedin;

// Project cards use a contact anchor until you add a real repository or live demo URL.
document.querySelectorAll("[data-project]").forEach((link) => {
  link.addEventListener("click", () => {
    const subject = encodeURIComponent(`Let's talk about ${link.dataset.project}`);
    document.querySelector("#emailLink").href = `mailto:${profileLinks.email}?subject=${subject}`;
  });
});
