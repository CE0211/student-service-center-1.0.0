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

  document.querySelectorAll("[data-role]").forEach((button) => {
    button.addEventListener("click", () => {
      const role = button.dataset.role;
      document.querySelectorAll("[data-role]").forEach((item) => item.classList.toggle("active", item === button));
      document.querySelectorAll("[data-role-panel]").forEach((panel) => {
        panel.hidden = panel.dataset.rolePanel !== role;
      });
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
