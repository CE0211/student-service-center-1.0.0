(function () {
  "use strict";

  document.querySelectorAll("[data-demo-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.demoFilter;
      document.querySelectorAll("[data-demo-filter]").forEach((item) => item.classList.toggle("active", item === button));
      document.querySelectorAll("[data-event-category]").forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.eventCategory !== filter;
      });
    });
  });

  const updateDashboardProgress = () => {
    const progress = document.querySelector("[data-dashboard-progress]");
    const activePanel = [...document.querySelectorAll("[data-role-panel]")].find((panel) => !panel.hidden);
    if (!progress || !activePanel) return;
    const tasks = [...activePanel.querySelectorAll('.role-tasks input[type="checkbox"]')];
    const completed = tasks.filter((task) => task.checked).length;
    const percent = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
    progress.textContent = `${percent}%`;
    progress.closest(".dashboard-progress")?.style.setProperty("--dashboard-progress", `${percent * 3.6}deg`);
  };

  document.querySelectorAll("[data-role]").forEach((button) => {
    button.addEventListener("click", () => {
      const role = button.dataset.role;
      document.querySelectorAll("[data-role]").forEach((item) => item.classList.toggle("active", item === button));
      document.querySelectorAll("[data-role-panel]").forEach((panel) => {
        panel.hidden = panel.dataset.rolePanel !== role;
      });
      updateDashboardProgress();
    });
  });

  document.querySelectorAll('.role-tasks input[type="checkbox"]').forEach((input) => {
    input.addEventListener("change", updateDashboardProgress);
  });

  document.querySelectorAll("[data-demo-backend-action]").forEach((button) => {
    button.addEventListener("click", () => {
      button.textContent = "演示入口 · 正式版接后台";
      window.setTimeout(() => { button.textContent = "新建公告"; }, 1800);
    });
  });

  const reveal = () => {
    const nodes = [...document.querySelectorAll(".reveal:not(.visible)")];
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08 });
    nodes.forEach((node) => observer.observe(node));
  };

  document.querySelectorAll(".demo-brand-mark").forEach((mark) => {
    mark.addEventListener("contextmenu", (event) => event.preventDefault());
  });
  reveal();
  updateDashboardProgress();

  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      window.requestAnimationFrame(() => {
        const previousBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        target.scrollIntoView({ block: "start" });
        document.documentElement.style.scrollBehavior = previousBehavior;
      });
    }
  }
})();
