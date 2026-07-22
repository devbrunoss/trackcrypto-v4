// dashboard-nav.js
// Controla a troca de abas (Mercado / Ferramentas / Aprender) e a sincronia
// dos dois toggles de tema (sidebar desktop + menu mobile).
// Arquivo separado do script.js de propósito, pra não mexer na lógica
// de dados/preços que já funciona.

document.addEventListener('DOMContentLoaded', function () {
  // ===== TROCA DE ABAS =====
  const tabTriggers = document.querySelectorAll('[data-tab]');
  const tabPanes = document.querySelectorAll('[data-tab-pane]');

  function activateTab(tabName) {
    tabPanes.forEach(pane => {
      pane.classList.toggle('active', pane.getAttribute('data-tab-pane') === tabName);
    });
    tabTriggers.forEach(trigger => {
      if (trigger.hasAttribute('data-tab')) {
        trigger.classList.toggle('active', trigger.getAttribute('data-tab') === tabName);
      }
    });
    // Volta o scroll pro topo do conteúdo ao trocar de aba
    const main = document.querySelector('.dashboard-container');
    if (main) main.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      const tabName = this.getAttribute('data-tab');
      if (tabName) activateTab(tabName);
    });
  });

  // ===== SINCRONIA DOS DOIS TOGGLES DE TEMA =====
  const themeToggleMobile = document.getElementById('themeToggle');
  const themeToggleDesktop = document.getElementById('themeToggleDesktop');
  const savedTheme = localStorage.getItem('theme') || 'dark';

  if (themeToggleDesktop) {
    themeToggleDesktop.checked = savedTheme === 'light';
    themeToggleDesktop.addEventListener('change', function () {
      const newTheme = this.checked ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      if (themeToggleMobile) themeToggleMobile.checked = this.checked;
    });
  }

  if (themeToggleMobile) {
    themeToggleMobile.addEventListener('change', function () {
      if (themeToggleDesktop) themeToggleDesktop.checked = this.checked;
    });
  }
});