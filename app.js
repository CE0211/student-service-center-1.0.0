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

    setText("[data-brand-mark]", data.brand.mark);
    setText("[data-brand-name]", data.brand.name);
    setText("[data-brand-subtitle]", data.brand.subtitle);
    setText("[data-footer-line]", data.brand.footerLine);
    setText("[data-edition]", data.hero.edition);
    setText("[data-hero-prefix]", data.hero.prefix);
    setText("[data-hero-title]", data.hero.title);
    setText("[data-hero-intro]", data.hero.intro);
    setText("[data-primary-action]", data.hero.primaryAction);
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
      updateProgress();
    });
    updateProgress();
  }

  function renderFaqs() {
    $("[data-faq-list]").innerHTML = data.faqs.map((item, index) => `
      <details ${index === 0 ? "open" : ""}>
        <summary><span>${escapeHtml(item.question)}</span><i aria-hidden="true"></i></summary>
        <p>${escapeHtml(item.answer)}</p>
      </details>
    `).join("");
  }

  function renderOfficialLinks() {
    $("[data-official-links]").innerHTML = data.officialLinks.map((item) => {
      const internal = String(item.url).startsWith("#");
      const attributes = internal ? "" : ' target="_blank" rel="noopener noreferrer"';
      return `
        <a href="${internal ? escapeHtml(item.url) : safeUrl(item.url)}"${attributes}>
          <div><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.note)}</small></div>
          <span aria-hidden="true">↗</span>
        </a>
      `;
    }).join("");

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
        await navigator.clipboard.writeText(data.hero.campusAddress);
        showToast("功能说明已复制");
      } catch {
        showToast(data.hero.campusAddress);
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

  applySiteSettings();
  renderQuickLinks();
  renderRoadmap();
  renderTasks();
  renderChecklist();
  renderFaqs();
  renderOfficialLinks();
  bindUtilities();
  observeReveals();
})();
