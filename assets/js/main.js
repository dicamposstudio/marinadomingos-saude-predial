(() => {
  "use strict";

  const root = document.documentElement;
  const revealItems = [...document.querySelectorAll(".reveal")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pageType = document.body.dataset.pageType || "institutional_home";

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
        page_type: pageType,
        page_path: window.location.pathname,
        link_text: trackedLink.textContent.trim().replace(/\s+/g, " ").slice(0, 80)
      });
    }

    const mobileLink = target.closest(".mobile-menu nav a");
    const mobileMenu = target.closest(".mobile-menu");
    if (mobileLink && mobileMenu instanceof HTMLDetailsElement) {
      mobileMenu.open = false;
    }
  });

  const serviceLabels = {
    "vistoria-imovel-novo": "Vistoria de Imóvel Novo",
    "vistoria-pre-compra": "Vistoria Pré-Compra",
    "vistoria-locacao": "Vistoria de Locação",
    "cautelar-vizinhanca": "Vistoria Cautelar de Vizinhança",
    "inspecao-predial": "Laudo de Inspeção Predial",
    "laudo-patologia": "Laudos / Patologia das Construções"
  };

  document.querySelectorAll("[data-whatsapp-quote-form]").forEach((form) => {
    if (!(form instanceof HTMLFormElement)) return;

    const serviceSelect = form.elements.namedItem("service");
    const defaultService = form.dataset.defaultService;
    if (serviceSelect instanceof HTMLSelectElement && defaultService && serviceLabels[defaultService]) {
      serviceSelect.value = defaultService;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const service = String(data.get("service") || "").trim();
      const location = String(data.get("location") || "").trim();
      const area = String(data.get("area") || "").trim();
      const serviceLabel = serviceLabels[service] || service;

      const message = [
        `Olá, Marina! Meu nome é ${name}.`,
        "Gostaria de solicitar informações sobre:",
        "",
        `🏠 Serviço: ${serviceLabel}`,
        `📍 Localização: ${location}`,
        `📐 Área aproximada: ${area} m²`,
        "",
        "Vim pelo site e gostaria de receber um orçamento."
      ].join("\n");

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_whatsapp_submit",
        cta_location: form.dataset.formLocation || "quote-form",
        service_name: service,
        page_type: pageType,
        page_path: window.location.pathname
      });

      const whatsappUrl = `https://wa.me/5581997842480?text=${encodeURIComponent(message)}`;
      const whatsappWindow = window.open(whatsappUrl, "_blank");
      if (whatsappWindow) {
        whatsappWindow.opener = null;
      } else {
        window.location.href = whatsappUrl;
      }
    });
  });

})();
