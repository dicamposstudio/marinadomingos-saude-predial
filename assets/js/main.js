(() => {
  "use strict";

  const root = document.documentElement;
  const revealItems = [...document.querySelectorAll(".reveal")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-current-year]").forEach((item) => {
    item.textContent = String(new Date().getFullYear());
  });

  if (!reducedMotion && "IntersectionObserver" in window) {
    root.classList.add("motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -9% 0px", threshold: 0.08 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const trackedLink = target.closest("a[data-event]");
    if (trackedLink) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: trackedLink.dataset.event,
        cta_location: trackedLink.dataset.location,
        service_name: trackedLink.dataset.service,
        page_type: "institutional_home"
      });
    }

    const mobileLink = target.closest(".mobile-menu nav a");
    const mobileMenu = target.closest(".mobile-menu");
    if (mobileLink && mobileMenu instanceof HTMLDetailsElement) {
      mobileMenu.open = false;
    }
  });
})();
