(function () {
  "use strict";

  const data = window.SITE_DATA;
  if (!data) return;

  const themeKey = `campus-theme:${data.site.id}`;
  let themeId = data.site.defaultTheme;
  try { themeId = localStorage.getItem(themeKey) || themeId; } catch { /* 隐私模式下忽略 */ }
  const theme = data.themes.find((item) => item.id === themeId) || data.themes[0];
  Object.entries(theme.colors).forEach(([name, value]) => {
    document.documentElement.style.setProperty(`--${name}`, value);
  });
  document.querySelector("meta[name='theme-color']").setAttribute("content", theme.colors.brand);

  const toast = document.querySelector("[data-contact-toast]");
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
  }

  document.querySelector("[data-copy-qq]").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("3081839269");
      showToast("QQ 号已复制");
    } catch {
      showToast("QQ：3081839269");
    }
  });
})();
