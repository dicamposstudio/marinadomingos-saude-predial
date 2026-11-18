(() => {
  "use strict";

  const root = document.documentElement;
  const revealItems = [...document.querySelectorAll(".reveal")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pageType = document.body.dataset.pageType || "institutional_home";
  const pagePath = window.location.pathname;
  const urlParams = new URLSearchParams(window.location.search);
  const sourceParam = String(urlParams.get("utm_source") || "").trim().toLowerCase();
  const mediumParam = String(urlParams.get("utm_medium") || "").trim().toLowerCase();
  const campaignName = String(urlParams.get("utm_campaign") || "").trim();
  const googleVisit = sourceParam === "google" || ["gclid", "gbraid", "wbraid"].some((key) => urlParams.has(key));
  const paidGoogleVisit = ["gclid", "gbraid", "wbraid"].some((key) => urlParams.has(key)) ||
    (googleVisit && ["cpc", "ppc", "paid", "paid_search", "paidsearch"].includes(mediumParam));
  const googleBusinessProfileVisit = sourceParam === "google" && campaignName === "perfil_empresa";
  const trafficSource = googleVisit ? "google" : sourceParam || "direct";
  const trackingKeys = ["gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

  const serviceRoutes = [
    ["/vistoria-de-imovel-recife/", "vistoria-imovel"],
    ["/vistoria-imovel-novo-recife/", "vistoria-imovel-novo"],
    ["/vistoria-minha-casa-minha-vida-recife/", "vistoria-imovel-novo"],
    ["/vistoria-pre-compra-recife/", "vistoria-pre-compra"],
    ["/vistoria-locacao-recife/", "vistoria-locacao"],
    ["/laudos-patologia-construcoes-recife/", "laudo-patologia"],
    ["/vistoria-cautelar-vizinhanca-recife/", "cautelar-vizinhanca"],
    ["/inspecao-predial-recife/", "inspecao-predial"],
    ["/blog/checklist-vistoria-apartamento-novo/", "vistoria-imovel-novo"],
    ["/blog/o-que-verificar-imovel-usado/", "vistoria-pre-compra"],
    ["/blog/fissura-ou-infiltracao-quando-chamar-profissional/", "laudo-patologia"],
    ["/blog/pendencias-vistoria-entrega-chaves/", "vistoria-imovel-novo"],
    ["/blog/quanto-custa-vistoria-apartamento-recife/", "vistoria-imovel"],
    ["/blog/vale-a-pena-vistoria-antes-comprar-imovel-usado/", "vistoria-pre-compra"],
    ["/blog/vistoria-entrada-saida-diferencas/", "vistoria-locacao"],
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

  if (trackingKeys.some((key) => urlParams.has(key))) {
    document.querySelectorAll("a[href]").forEach((link) => {
      const rawHref = link.getAttribute("href");
      if (!rawHref || rawHref.startsWith("#")) return;

      const destination = new URL(rawHref, window.location.href);
      if (destination.origin !== window.location.origin) return;

      trackingKeys.forEach((key) => {
        if (urlParams.has(key) && !destination.searchParams.has(key)) {
          destination.searchParams.set(key, urlParams.get(key));
        }
      });
      link.href = destination.toString();
    });
  }

  if (googleVisit) {
    document.querySelectorAll('a[href*="wa.me/"]').forEach((link) => {
      const destination = new URL(link.href);
      const currentMessage = destination.searchParams.get("text") || "";
      const sourceNote = googleBusinessProfileVisit
        ? "Encontrei você pelo Perfil da Empresa no Google."
        : "Vim pelo Google.";
      if (!currentMessage.includes(sourceNote)) {
        destination.searchParams.set("text", `${currentMessage}${currentMessage ? "\n\n" : ""}${sourceNote}`);
        link.href = destination.toString();
      }
    });
  }

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
        traffic_source: trafficSource,
        traffic_medium: mediumParam || (paidGoogleVisit ? "cpc" : "nao_informado"),
        link_text: (visibleText || trackedLink.getAttribute("aria-label") || "link").slice(0, 80)
      };

      if (campaignName) {
        eventPayload.campaign_name = campaignName;
      }

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

    // Contexto opcional do orçamento: permanece local até o envio ao WhatsApp.
    // Nenhum texto livre ou identificador do cliente é enviado ao dataLayer.
    const fieldHost = form.querySelector(".quote-fields");
    const context = document.createElement("div");
    context.className = "quote-field-wide quote-context";
    const contextOptions = {
      "vistoria-imovel-novo": [{label:"Etapa da entrega", options:["Aguardando a data","Vistoria agendada","Chaves já recebidas","Revistoria"]},{label:"Atendimento", options:["Uma unidade","Consultar atendimento de várias unidades"]},{label:"Nome do empreendimento",input:"text"},{label:"Data prevista da vistoria",input:"date"}],
      "vistoria-locacao": [{label:"Finalidade",options:["Entrada","Saída"]},{label:"Mobiliário",options:["Não mobiliado","Mobiliado","Parcialmente mobiliado"]}],
      "vistoria-pre-compra": [{label:"Etapa da compra",options:["Visitando imóveis","Em negociação","Proposta realizada"]}],
      "laudo-patologia": [{label:"Manifestação principal",options:["Fissuras ou trincas","Umidade ou infiltração","Revestimentos","Outra / preciso de orientação"]}],
      "cautelar-vizinhanca": [{label:"Etapa da obra",options:["Antes do início","Obra em andamento","Preciso de orientação"]}],
      "inspecao-predial": [{label:"Finalidade",options:["Manutenção preventiva","Avaliação de condições aparentes","Preciso de orientação"]}]
    };
    const refreshContext = () => {
      context.replaceChildren();
      const choices = contextOptions[serviceSelect?.value] || [];
      context.hidden = !choices.length;
      choices.forEach((item,index) => {
        const label = document.createElement("label"); label.className = "quote-field";
        const title = document.createElement("span"); title.textContent = item.label + " (opcional)";
        if (item.input === "date" && form.elements.namedItem("desired_date")) return;
        const control = document.createElement(item.input ? "input" : "select");
        control.name = "quote_context_" + index; control.dataset.contextLabel = item.label;
        if (item.input) {
          control.type = item.input;
          if (item.input === "text") { control.maxLength = 100; control.placeholder = "Se souber"; }
        } else {
          control.add(new Option("Selecione, se souber", ""));
          item.options.forEach((value) => control.add(new Option(value,value)));
        }
        label.append(title,control);context.append(label);
      });
    };
    if (fieldHost && serviceSelect instanceof HTMLSelectElement) {
      if (!form.elements.namedItem("property_type")) {
        const label = document.createElement("label"); label.className = "quote-field";
        const title = document.createElement("span"); title.textContent = "Tipo de imóvel (opcional)";
        const select = document.createElement("select"); select.name = "property_type";
        select.add(new Option("Selecione, se souber",""));
        ["Apartamento","Casa","Sala ou imóvel comercial","Edifício / condomínio","Outro tipo de imóvel"].forEach((value)=>select.add(new Option(value,value)));
        label.append(title,select);fieldHost.append(label);
      }
      fieldHost.append(context);refreshContext();serviceSelect.addEventListener("change",refreshContext);
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const service = String(data.get("service") || "").trim();
      const propertyType = String(data.get("property_type") || "").trim();
      const location = String(data.get("location") || "").trim();
      const area = String(data.get("area") || "").trim();
      const desiredDate = String(data.get("desired_date") || "").trim();
      const notes = String(data.get("notes") || "").trim();
      const serviceLabel = serviceLabels[service] || service;
      const contextLines = Array.from(context.querySelectorAll("[data-context-label]"))
        .filter((control) => control.value.trim()).map((control) => control.dataset.contextLabel + ": " + (control.type === "date" ? control.value.split("-").reverse().join("/") : control.value.trim()));
      if (pageType === "service_mcmv" && service === "vistoria-imovel-novo") contextLines.unshift("Interesse: imóvel Minha Casa Minha Vida");
      const formattedDate = desiredDate ? desiredDate.split("-").reverse().join("/") : "Não informada";
      const sourceMessage = googleBusinessProfileVisit
        ? "Encontrei Marina pelo Perfil da Empresa no Google e gostaria de receber um orçamento."
        : googleVisit
          ? "Vim pelo Google e gostaria de receber um orçamento."
          : "Vim pelo site e gostaria de receber um orçamento.";

      const message = [
        `Olá, Marina! Meu nome é ${name}.`,
        "Gostaria de solicitar informações sobre:",
        "",
        `🏠 Serviço: ${serviceLabel}`,
        propertyType ? `🏢 Tipo de imóvel: ${propertyType}` : null,
        `📍 Localização: ${location}`,
        `📐 Área aproximada: ${area ? `${area} m²` : "Não informada"}`,
        `📅 Data desejada: ${formattedDate}`,
        ...contextLines,
        notes ? `📝 Observação: ${notes}` : null,
        "",
        sourceMessage
      ].filter(Boolean).join("\n");

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_whatsapp_submit",
        cta_location: form.dataset.formLocation || "quote-form",
        service_name: service,
        page_type: pageType,
        page_path: pagePath,
        property_type: propertyType || "nao_informado",
        traffic_source: trafficSource,
        traffic_medium: mediumParam || (paidGoogleVisit ? "cpc" : "nao_informado"),
        campaign_name: campaignName || "nao_informada",
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
