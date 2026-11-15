document.addEventListener('DOMContentLoaded', () => {
  // ========================================================
  // 1. Navigation & View Routing
  // ========================================================
  const views = {
    home: document.getElementById('view-home'),
    projects: document.getElementById('view-projects'),
    about: document.getElementById('view-about'),
    connect: document.getElementById('view-connect'),
  };

  const sidebarLinks = document.querySelectorAll('.sidebar-nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function switchView(targetView, updateHash = true) {
    const validViews = ['home', 'projects', 'about', 'connect'];
    const activeViewKey = validViews.includes(targetView) ? targetView : 'home';

    // Toggle views
    Object.keys(views).forEach((key) => {
      if (views[key]) {
        if (key === activeViewKey) {
          views[key].classList.remove('hidden');
        } else {
          views[key].classList.add('hidden');
        }
      }
    });

    // Update Desktop Sidebar Links active styling
    sidebarLinks.forEach((link) => {
      const viewKey = link.getAttribute('data-view');
      const isCurrent = viewKey === activeViewKey;
      link.classList.toggle('active-nav', isCurrent);
      if (isCurrent) {
        link.classList.remove('text-muted');
        link.classList.add('text-foreground');
      } else {
        link.classList.add('text-muted');
        link.classList.remove('text-foreground');
      }
    });

    // Update Mobile Links active styling
    mobileLinks.forEach((link) => {
      const viewKey = link.getAttribute('data-view');
      const isCurrent = viewKey === activeViewKey;
      if (isCurrent) {
        link.classList.remove('text-muted');
        link.classList.add('text-foreground');
      } else {
        link.classList.add('text-muted');
        link.classList.remove('text-foreground');
      }
    });

    if (updateHash && window.location.hash !== `#${activeViewKey}`) {
      window.history.pushState(null, '', `#${activeViewKey}`);
    }

    // Scroll back to top on view change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Handle URL hash on initial load
  function handleInitialHash() {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    switchView(hash || 'home', false);
  }

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    switchView(hash || 'home', false);
  });

  // Handle click on nav links (both desktop and mobile)
  document.querySelectorAll('[data-view]').forEach((elem) => {
    elem.addEventListener('click', (e) => {
      const viewKey = elem.getAttribute('data-view');
      if (viewKey && views[viewKey]) {
        e.preventDefault();
        switchView(viewKey, true);
        closeMobileMenu();
        closeModal(searchModal);
      }
    });
  });

  handleInitialHash();

  // ========================================================
  // 2. Mobile Navigation Toggle
  // ========================================================
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

  function openMobileMenu() {
    mobileMenuOverlay.classList.remove('hidden');
    mobileMenuOverlay.classList.add('flex');
    mobileNavToggle.classList.add('menu-open');
    mobileNavToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileMenuOverlay) return;
    mobileMenuOverlay.classList.add('hidden');
    mobileMenuOverlay.classList.remove('flex');
    mobileNavToggle.classList.remove('menu-open');
    mobileNavToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      const isOpen = mobileMenuOverlay.classList.contains('flex');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // ========================================================
  // 3. Theme Cycle: System -> Light -> Dark -> System
  // ========================================================
  const themeCycle = ['system', 'light', 'dark'];
  const cycleThemeBtn = document.getElementById('cycleThemeBtn');
  const mobileCycleThemeBtn = document.getElementById('mobileCycleThemeBtn');

  function getStoredTheme() {
    return localStorage.getItem('theme') || 'system';
  }

  function applyTheme(theme) {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = theme === 'dark' || (theme === 'system' && systemPrefersDark);
    document.documentElement.classList.toggle('dark', isDark);

    const themeLabel = theme.charAt(0).toUpperCase() + theme.slice(1);
    if (cycleThemeBtn) {
      cycleThemeBtn.textContent = `Theme: ${themeLabel}`;
    }
    if (mobileCycleThemeBtn) {
      mobileCycleThemeBtn.textContent = `Theme: ${themeLabel}`;
    }
  }

  function cycleTheme() {
    const currentTheme = getStoredTheme();
    const currentIndex = themeCycle.indexOf(currentTheme);
    const nextTheme = themeCycle[(currentIndex + 1) % themeCycle.length];
    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);
  }

  if (cycleThemeBtn) cycleThemeBtn.addEventListener('click', cycleTheme);
  if (mobileCycleThemeBtn) mobileCycleThemeBtn.addEventListener('click', cycleTheme);

  // Listen for OS system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getStoredTheme() === 'system') {
      applyTheme('system');
    }
  });

  applyTheme(getStoredTheme());

  // ========================================================
  // 4. Command Palette (Search Ctrl+K)
  // ========================================================
  const searchModal = document.getElementById('searchModal');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const openSearchBtn = document.getElementById('openSearchBtn');
  const mobileOpenSearchBtn = document.getElementById('mobileOpenSearchBtn');

  function openSearch() {
    searchModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      if (searchInput) searchInput.focus();
    }, 50);
  }

  function closeSearch() {
    searchModal.classList.remove('active');
    document.body.style.overflow = '';
    if (searchInput) searchInput.value = '';
    filterSearch('');
  }

  if (openSearchBtn) openSearchBtn.addEventListener('click', openSearch);
  if (mobileOpenSearchBtn) {
    mobileOpenSearchBtn.addEventListener('click', () => {
      closeMobileMenu();
      openSearch();
    });
  }

  // Keyboard shortcut: Ctrl+K or Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchModal.classList.contains('active')) {
        closeSearch();
      } else {
        openSearch();
      }
    } else if (e.key === 'Escape') {
      closeSearch();
      closeModal(colophonModal);
      closeModal(usageModal);
    }
  });

  // Filter items in search results
  function filterSearch(query) {
    const term = query.toLowerCase().trim();
    const items = searchResults.querySelectorAll('.search-item');
    items.forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(term) ? 'flex' : 'none';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterSearch(e.target.value);
    });
  }

  // ========================================================
  // 5. Modals: Colophon & Usage Rights
  // ========================================================
  const colophonModal = document.getElementById('colophonModal');
  const usageModal = document.getElementById('usageModal');
  const openColophonBtn = document.getElementById('openColophonBtn');
  const openUsageBtn = document.getElementById('openUsageBtn');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openColophonBtn) openColophonBtn.addEventListener('click', () => openModal(colophonModal));
  if (openUsageBtn) openUsageBtn.addEventListener('click', () => openModal(usageModal));

  // Close modals on clicking overlay or close buttons
  [searchModal, colophonModal, usageModal].forEach((modal) => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
    modal.querySelectorAll('.modal-close-btn').forEach((btn) => {
      btn.addEventListener('click', () => closeModal(modal));
    });
  });
});
