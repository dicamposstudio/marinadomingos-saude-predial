(() => {
  "use strict";

  const root = document.documentElement;
  const revealItems = [...document.querySelectorAll(".reveal")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pageType = document.body.dataset.pageType || "institutional_home";
  const pagePath = window.location.pathname;

  const serviceRoutes = [
    ["/vistoria-de-imovel-recife/", "vistoria-imovel"],
    ["/vistoria-imovel-novo-recife/", "vistoria-imovel-novo"],
    ["/vistoria-pre-compra-recife/", "vistoria-pre-compra"],
    ["/vistoria-locacao-recife/", "vistoria-locacao"],
    ["/laudos-patologia-construcoes-recife/", "laudo-patologia"],
    ["/blog/checklist-vistoria-apartamento-novo/", "vistoria-imovel-novo"],
    ["/blog/o-que-verificar-imovel-usado/", "vistoria-pre-compra"],
    ["/blog/fissura-ou-infiltracao-quando-chamar-profissional/", "laudo-patologia"],
    ["/casos-reais/", "casos-reais"],
    ["/blog/", "conteudos"]
  ];

  const pageService =
    serviceRoutes.find(([route]) => pagePath.includes(route))?.[1] || "geral";

  const inferCtaLocation = (link) => {
    if (link.dataset.location) return link.dataset.location;
    if (link.closest(".mobile-menu")) return "mobile-menu";
    if (link.closest(".site-footer")) return "footer";
    if (link.closest(".site-header")) return "header";
    if (link.closest(".floating-whatsapp")) return "floating";
    if (link.closest(".article-cta")) return "article-cta";
    if (link.closest(".page-final-cta")) return "final-cta";
    if (link.closest(".service-hero")) return "service-hero";
    if (link.closest(".hero")) return "hero";
    return "content";
  };

  const inferServiceName = (link) => link.dataset.service || pageService;

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

    const explicitTrackedLink = target.closest("a[data-event]");
    const whatsappLink = target.closest('a[href*="wa.me/"]');
    const trackedLink = explicitTrackedLink || whatsappLink;
    if (trackedLink) {
      const isWhatsapp = Boolean(whatsappLink);
      const visibleText = trackedLink.textContent.trim().replace(/\s+/g, " ");
      const eventPayload = {
        event: trackedLink.dataset.event || "click_whatsapp",
        cta_location: inferCtaLocation(trackedLink),
        service_name: inferServiceName(trackedLink),
        page_type: pageType,
        page_path: pagePath,
        link_text: (visibleText || trackedLink.getAttribute("aria-label") || "link").slice(0, 80)
      };

      if (isWhatsapp) {
        eventPayload.contact_channel = "whatsapp";
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(eventPayload);
    }

    const mobileLink = target.closest(".mobile-menu nav a");
    const mobileMenu = target.closest(".mobile-menu");
    if (mobileLink && mobileMenu instanceof HTMLDetailsElement) {
      mobileMenu.open = false;
    }
  });

  document.querySelectorAll("[data-print-checklist]").forEach((button) => {
    button.addEventListener("click", () => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "print_checklist",
        page_type: pageType,
        page_path: pagePath
      });
      window.print();
    });
  });

  const serviceLabels = {
    "vistoria-imovel": "Vistoria de Imóvel (preciso de orientação)",
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
        page_path: pagePath,
        contact_channel: "whatsapp"
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
