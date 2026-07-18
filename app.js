(function () {
  "use strict";

  const data = window.SITE_DATA;
  if (!data) {
    document.body.innerHTML = "<p style='padding:2rem'>内容配置加载失败，请检查 content.js。</p>";
    return;
  }

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);
  const safeUrl = (value = "") => {
    try {
      const url = new URL(value, window.location.href);
      return ["http:", "https:", "mailto:", "tel:"].includes(url.protocol) ? url.href : "#";
    } catch {
      return "#";
    }
  };
  const setText = (selector, value) => $$(selector).forEach((node) => { node.textContent = value ?? ""; });

  function showToast(message) {
    const toast = $("[data-toast]");
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function applySiteSettings() {
    document.documentElement.lang = data.site.language || "zh-CN";
    document.title = data.site.title;
    $("meta[name='description']").setAttribute("content", data.site.description);
    $("meta[name='theme-color']").setAttribute("content", data.site.themeColor);
    const colors = data.site.colors || {};
    Object.entries(colors).forEach(([name, value]) => {
      document.documentElement.style.setProperty(`--${name}`, value);
    });

    const brandLogo = String(data.brand.logo || 'assets/creator-logo.png').replace(/["'()\\\r\n]/g, '');
    $$('[data-brand-logo]').forEach((node) => {
      node.style.setProperty('--brand-logo-image', `url("${brandLogo}")`);
      node.addEventListener('contextmenu', (event) => event.preventDefault());
    });
    setText("[data-brand-name]", data.brand.name);
    setText("[data-brand-subtitle]", data.brand.subtitle);
    setText("[data-footer-line]", data.brand.footerLine);
    setText("[data-edition]", data.hero.edition);
    setText("[data-hero-prefix]", data.hero.prefix);
    setText("[data-hero-title]", data.hero.title);
    setText("[data-hero-intro]", data.hero.intro);
    setText("[data-primary-action]", data.hero.primaryAction);
    setText("[data-copy-action]", data.hero.copyAction);
    setText("[data-arrival-date]", data.hero.arrivalDate);
    setText("[data-campus-address]", data.hero.campusAddress);
    setText("[data-status-label]", data.hero.statusLabel);
    setText("[data-updated-at]", data.hero.updatedAt);
    setText("[data-card-message]", data.hero.cardMessage);
    setText("[data-roadmap-intro]", data.roadmapIntro);
    setText("[data-disclaimer]", data.legal.disclaimer);
    setText("[data-footer-note]", data.legal.footerNote);

    const notice = $("[data-notice-wrap]");
    notice.hidden = !data.notice.enabled;
    setText("[data-notice-title]", data.notice.title);
    setText("[data-notice-text]", data.notice.text);
  }

  const themeStorageKey = `campus-theme:${data.site.id}`;
  function applyTheme(themeId, announce = false) {
    const theme = (data.themes || []).find((item) => item.id === themeId) || data.themes?.[0];
    if (!theme) return;
    Object.entries(theme.colors).forEach(([name, value]) => {
      document.documentElement.style.setProperty(`--${name}`, value);
    });
    document.documentElement.dataset.theme = theme.id;
    $("meta[name='theme-color']").setAttribute("content", theme.colors.brand);
    $$('[data-theme-id]').forEach((button) => {
      const active = button.dataset.themeId === theme.id;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    try { localStorage.setItem(themeStorageKey, theme.id); } catch { /* 隐私模式下忽略 */ }
    if (announce) showToast(`已切换为${theme.label}主题`);
  }

  function renderThemePicker() {
    const picker = $("[data-theme-picker]");
    if (!picker || !data.themes?.length) return;
    picker.innerHTML = data.themes.map((theme) => `
      <button
        class="theme-dot"
        type="button"
        data-theme-id="${escapeHtml(theme.id)}"
        aria-label="切换为${escapeHtml(theme.label)}主题"
        aria-pressed="false"
        title="${escapeHtml(theme.label)}"
        style="--dot-brand:${escapeHtml(theme.colors.brand)};--dot-accent:${escapeHtml(theme.colors.accent)}"
      ></button>
    `).join("");
    picker.addEventListener("click", (event) => {
      const button = event.target.closest("[data-theme-id]");
      if (button) applyTheme(button.dataset.themeId, true);
    });
    let savedTheme = data.site.defaultTheme;
    try { savedTheme = localStorage.getItem(themeStorageKey) || savedTheme; } catch { /* 隐私模式下忽略 */ }
    applyTheme(savedTheme);
  }

  function renderQuickLinks() {
    $("[data-quick-links]").innerHTML = data.quickLinks.map((item) => {
      const internal = String(item.url).startsWith("#");
      const attributes = internal ? "" : ' target="_blank" rel="noopener noreferrer"';
      return `
        <a class="quick-card reveal" href="${internal ? escapeHtml(item.url) : safeUrl(item.url)}"${attributes}>
          <span class="quick-icon">${escapeHtml(item.icon)}</span>
          <div><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.description)}</small></div>
          <i aria-hidden="true">↗</i>
        </a>
      `;
    }).join("");
  }

  function renderRoadmap() {
    $("[data-roadmap]").innerHTML = data.roadmap.map((item, index) => `
      <li class="reveal">
        <div class="roadmap-index"><span>${String(index + 1).padStart(2, "0")}</span><i></i></div>
        <div class="roadmap-copy">
          <small>${escapeHtml(item.time)}</small>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.detail)}</p>
        </div>
      </li>
    `).join("");
  }

  function renderHighlights() {
    const container = $("[data-highlights]");
    if (!container) return;
    container.innerHTML = data.highlights.map((item) => `
      <div><strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.label)}</span></div>
    `).join("");
  }

  function renderTaskGroup(groupId) {
    const group = data.taskGroups.find((item) => item.id === groupId) || data.taskGroups[0];
    const panel = $("[data-task-panel]");
    panel.innerHTML = `
      <div class="task-heading">
        <p>${escapeHtml(group.eyebrow)}</p>
        <h3>${escapeHtml(group.title)}</h3>
        <span>${escapeHtml(group.intro)}</span>
      </div>
      <div class="task-list">
        ${group.items.map((item, index) => `
          <div class="task-item">
            <b>${String(index + 1).padStart(2, "0")}</b>
            <div><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.detail)}</p></div>
          </div>
        `).join("")}
      </div>
      <div class="task-tip"><span>提示</span><p>${escapeHtml(group.tip)}</p></div>
    `;

    $$("[role='tab']").forEach((tab) => {
      const active = tab.dataset.group === group.id;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
  }

  function renderTasks() {
    const tabs = $("[data-task-tabs]");
    tabs.innerHTML = data.taskGroups.map((group, index) => `
      <button type="button" role="tab" data-group="${escapeHtml(group.id)}" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}">
        ${escapeHtml(group.label)}
      </button>
    `).join("");
    tabs.addEventListener("click", (event) => {
      const button = event.target.closest("[data-group]");
      if (button) renderTaskGroup(button.dataset.group);
    });
    tabs.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      const buttons = $$('[role="tab"]', tabs);
      const current = buttons.indexOf(document.activeElement);
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = buttons[(current + direction + buttons.length) % buttons.length];
      next.focus();
      renderTaskGroup(next.dataset.group);
    });
    renderTaskGroup(data.taskGroups[0].id);
  }

  function renderWeekPlan() {
    const container = $("[data-week-plan]");
    if (!container) return;
    container.innerHTML = data.weekPlan.map((item, index) => `
      <article class="week-card reveal">
        <div class="week-card-top"><span>${escapeHtml(item.day)}</span><b>${String(index + 1).padStart(2, "0")}</b></div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.detail)}</p>
        <small>${escapeHtml(item.tag)}</small>
      </article>
    `).join("");
  }

  function renderServiceDirectory() {
    const toolbar = $("[data-service-filters]");
    const grid = $("[data-service-grid]");
    if (!toolbar || !grid) return;

    toolbar.innerHTML = data.serviceFilters.map((filter, index) => `
      <button type="button" data-service-filter="${escapeHtml(filter.id)}" aria-pressed="${index === 0}">
        ${escapeHtml(filter.label)}
      </button>
    `).join("");

    const renderGrid = (filterId) => {
      const items = filterId === "all"
        ? data.serviceDirectory
        : data.serviceDirectory.filter((item) => item.category === filterId);
      grid.innerHTML = items.map((item) => `
        <article class="service-card reveal">
          <div class="service-card-top">
            <span>${escapeHtml(item.icon)}</span>
            <small>${escapeHtml(item.meta)}</small>
          </div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.detail)}</p>
          <button type="button" data-service-demo="${escapeHtml(item.title)}">正式版可接真实入口 <i aria-hidden="true">↗</i></button>
        </article>
      `).join("");
      $$('[data-service-filter]', toolbar).forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.serviceFilter === filterId));
      });
      observeReveals();
    };

    toolbar.addEventListener("click", (event) => {
      const button = event.target.closest("[data-service-filter]");
      if (button) renderGrid(button.dataset.serviceFilter);
    });
    grid.addEventListener("click", (event) => {
      const button = event.target.closest("[data-service-demo]");
      if (button) showToast(`${button.dataset.serviceDemo}：定制时替换为客户确认的真实入口`);
    });
    renderGrid(data.serviceFilters[0].id);
  }

  const storageKey = `campus-guide:${data.site.id}:${data.site.contentVersion}:checklist`;
  function loadChecks() {
    try { return JSON.parse(localStorage.getItem(storageKey)) || []; } catch { return []; }
  }

  function updateProgress() {
    const inputs = $$("[data-checklist] input");
    const checked = inputs.filter((input) => input.checked).length;
    const total = inputs.length;
    const percent = total ? Math.round((checked / total) * 100) : 0;
    setText("[data-progress-percent]", `${percent}%`);
    setText("[data-checklist-count]", `${checked} / ${total} 已完成`);
    $("[data-progress-orbit]").style.setProperty("--progress", `${percent * 3.6}deg`);
    $("[data-mini-progress]").style.width = `${percent}%`;
    return percent;
  }

  function renderChecklist() {
    const completed = new Set(loadChecks());
    const groups = [...new Set(data.checklist.map((item) => item.group))];
    $("[data-checklist]").innerHTML = groups.map((group) => `
      <fieldset>
        <legend>${escapeHtml(group)}</legend>
        ${data.checklist.filter((item) => item.group === group).map((item) => `
          <label>
            <input type="checkbox" value="${escapeHtml(item.id)}" ${completed.has(item.id) ? "checked" : ""} />
            <span class="check-box" aria-hidden="true">✓</span>
            <span>${escapeHtml(item.text)}</span>
          </label>
        `).join("")}
      </fieldset>
    `).join("");

    $("[data-checklist]").addEventListener("change", () => {
      const values = $$("[data-checklist] input:checked").map((input) => input.value);
      try { localStorage.setItem(storageKey, JSON.stringify(values)); } catch { /* 隐私模式下忽略 */ }
      const percent = updateProgress();
      if (percent === 100) showToast("准备清单完成，安心出发吧");
    });
    $("[data-reset-checklist]").addEventListener("click", () => {
      $$("[data-checklist] input").forEach((input) => { input.checked = false; });
      try { localStorage.removeItem(storageKey); } catch { /* 隐私模式下忽略 */ }
      updateProgress();
      showToast("清单已重新整理");
    });
    updateProgress();
  }

  function renderSafetyCards() {
    const container = $("[data-safety-cards]");
    if (!container) return;
    container.innerHTML = data.safetyCards.map((item) => `
      <article class="safety-card reveal">
        <span>${escapeHtml(item.icon)}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.detail)}</p>
      </article>
    `).join("");
  }

  function renderFaqs() {
    $("[data-faq-list]").innerHTML = data.faqs.map((item, index) => `
      <details ${index === 0 ? "open" : ""}>
        <summary><span>${escapeHtml(item.question)}</span><i aria-hidden="true"></i></summary>
        <p>${escapeHtml(item.answer)}</p>
      </details>
    `).join("");
  }

  function renderCustomizationModules() {
    const container = $("[data-customization-modules]");
    if (!container) return;
    container.innerHTML = data.customizationModules.map((item) => `
      <article class="customization-card reveal">
        <div class="customization-card-top"><b>${escapeHtml(item.index)}</b><span>${escapeHtml(item.tag)}</span></div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.detail)}</p>
        <ul>${item.examples.map((example) => `<li>${escapeHtml(example)}</li>`).join("")}</ul>
      </article>
    `).join("");
  }

  function renderProjectCases() {
    const container = $("[data-project-cases]");
    if (!container) return;
    container.innerHTML = data.projectCases.map((item, index) => `
      <a class="case-card case-${escapeHtml(item.tone)} reveal" href="${safeUrl(item.href)}">
        <div class="case-preview" aria-hidden="true">
          <span class="case-browser-bar"><i></i><i></i><i></i></span>
          <div class="case-screen">
            <b>${String(index + 1).padStart(2, "0")}</b>
            <span></span><span></span><span></span>
            <div><i></i><i></i><i></i></div>
          </div>
        </div>
        <div class="case-meta"><span>${escapeHtml(item.level)}</span><small>${escapeHtml(item.type)}</small></div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.summary)}</p>
        <strong>${escapeHtml(item.suitable)}</strong>
        <ul>${item.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}</ul>
        <span class="case-link">打开完整概念页面 <i aria-hidden="true">↗</i></span>
      </a>
    `).join("");
  }

  function renderContact() {
    const contact = data.contact;
    $("[data-contact-wrap]").hidden = !contact.enabled;
    setText("[data-contact-kicker]", contact.kicker);
    setText("[data-contact-title]", contact.title);
    const link = $("[data-contact-link]");
    link.textContent = contact.label;
    link.href = safeUrl(contact.url);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }

  function bindUtilities() {
    $("[data-copy-address]").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(data.hero.copyText);
        showToast("攻略摘要已复制");
      } catch {
        showToast(data.hero.copyText);
      }
    });

    $("[data-share]").addEventListener("click", async () => {
      if (navigator.share) {
        try {
          await navigator.share({ title: data.site.title, text: data.site.description, url: location.href });
          return;
        } catch (error) {
          if (error.name === "AbortError") return;
        }
      }
      try {
        await navigator.clipboard.writeText(location.href);
        showToast("页面链接已复制");
      } catch {
        showToast("请复制浏览器地址分享");
      }
    });
  }

  function observeReveals() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach((node) => node.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    $$(".reveal").forEach((node) => observer.observe(node));
  }

  function restoreHashPosition() {
    if (!window.location.hash) return;
    let targetId = window.location.hash.slice(1);
    try { targetId = decodeURIComponent(targetId); } catch { /* 保留原始锚点 */ }
    const target = document.getElementById(targetId);
    if (!target) return;
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const previousBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        target.scrollIntoView({ block: "start" });
        document.documentElement.style.scrollBehavior = previousBehavior;
      });
    });
  }

  applySiteSettings();
  renderThemePicker();
  renderQuickLinks();
  renderHighlights();
  renderRoadmap();
  renderTasks();
  renderWeekPlan();
  renderServiceDirectory();
  renderChecklist();
  renderSafetyCards();
  renderFaqs();
  renderCustomizationModules();
  renderProjectCases();
  renderContact();
  bindUtilities();
  observeReveals();
  restoreHashPosition();
})();
