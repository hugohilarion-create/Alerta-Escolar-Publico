document.addEventListener("DOMContentLoaded", () => {
  const homeScreen = document.getElementById("homeScreen");
  const authScreen = document.getElementById("authScreen");
  const occurrencePage = document.getElementById("occurrencePage");

  const registerBtn =
    document.getElementById("btnRegister") ||
    Array.from(document.querySelectorAll("button, a")).find((el) =>
      el.textContent.toLowerCase().includes("registrar ocorrência")
    );

  const btnLogin = document.getElementById("btnLogin");
  const btnHasAccess = document.getElementById("btnHasAccess");
  const btnBackHome = document.getElementById("btnBackHome");
  const authBrandHome = document.getElementById("authBrandHome");
  const homeBrandLink = document.getElementById("homeBrandLink");

  const stepButtons = document.querySelectorAll(".step-item");
  const toastTitle = document.getElementById("toastTitle");
  const toastMessage = document.getElementById("toastMessage");

  const tabStudent = document.getElementById("tabStudent");
  const tabAdmin = document.getElementById("tabAdmin");
  const loginIdentifier = document.getElementById("loginIdentifier");
  const loginPassword = document.getElementById("loginPassword");
  const loginForm = document.getElementById("loginForm");
  const prototypeNote = document.getElementById("prototypeNote");

  const navItems = document.querySelectorAll(".sidebar-nav .nav-item[data-nav]");
  const viewsMap = {
    "visao-geral": document.getElementById("view-visao-geral"),
    "nova-ocorrencia": document.getElementById("view-nova-ocorrencia"),
    "minhas-ocorrencias": document.getElementById("view-minhas-ocorrencias"),
    "administracao": document.getElementById("view-administracao")
  };

  function showHome() {
    if (authScreen) {
      authScreen.hidden = true;
      authScreen.style.display = "none";
    }
    if (occurrencePage) {
      occurrencePage.hidden = true;
      occurrencePage.style.display = "none";
    }
    if (homeScreen) {
      homeScreen.hidden = false;
      homeScreen.style.display = "flex";
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function showAuth() {
    if (homeScreen) {
      homeScreen.hidden = true;
      homeScreen.style.display = "none";
    }
    if (occurrencePage) {
      occurrencePage.hidden = true;
      occurrencePage.style.display = "none";
    }
    if (authScreen) {
      authScreen.hidden = false;
      authScreen.style.display = "grid";
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function activateNavView(navKey) {
    navItems.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.nav === navKey);
    });

    Object.entries(viewsMap).forEach(([key, el]) => {
      if (!el) return;
      const isTarget = key === navKey;
      el.hidden = !isTarget;
      el.style.display = isTarget ? "block" : "none";
    });

    const userNameEl = document.getElementById("dashUserName");
    const userRoleEl = document.getElementById("dashUserRole");
    if (navKey === "administracao" && userNameEl && userRoleEl) {
      userNameEl.textContent = "Marina Costa";
      userRoleEl.textContent = "Equipe administrativa";
    } else if (userNameEl && userRoleEl) {
      userNameEl.textContent = "Olá, Ana Clara";
      userRoleEl.textContent = "Estudante · 2º ano B";
    }
  }

  function showDashboard(initialView = "nova-ocorrencia") {
    if (homeScreen) {
      homeScreen.hidden = true;
      homeScreen.style.display = "none";
    }
    if (authScreen) {
      authScreen.hidden = true;
      authScreen.style.display = "none";
    }
    if (occurrencePage) {
      occurrencePage.hidden = false;
      occurrencePage.style.display = "grid";
    }
    activateNavView(initialView);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  registerBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    showAuth();
  });
  btnLogin?.addEventListener("click", showAuth);
  btnHasAccess?.addEventListener("click", showAuth);
  btnBackHome?.addEventListener("click", showHome);
  authBrandHome?.addEventListener("click", (e) => {
    e.preventDefault();
    showHome();
  });
  homeBrandLink?.addEventListener("click", (e) => {
    e.preventDefault();
    showHome();
  });
  document.getElementById("dashBrandLink")?.addEventListener("click", (e) => {
    e.preventDefault();
    showHome();
  });

  // Etapas do cartão inicial
  const stepFeedback = [
    { title: "Aviso enviado", message: "O registro entrou na fila da escola." },
    { title: "Equipe notificada", message: "Seu aviso chegou a quem cuida." },
    { title: "Ocorrência resolvida", message: "O problema foi concluído com sucesso." }
  ];

  stepButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const stepIndex = Number(btn.dataset.step);
      stepButtons.forEach((item, idx) => {
        item.classList.remove("is-done", "is-active");
        if (idx < stepIndex) item.classList.add("is-done");
        else if (idx === stepIndex) item.classList.add("is-active");
      });
      const feedback = stepFeedback[stepIndex] || stepFeedback[1];
      if (toastTitle) toastTitle.textContent = feedback.title;
      if (toastMessage) toastMessage.textContent = feedback.message;
    });
  });

  // Alternador de perfil na tela de login
  function selectRole(role) {
    const isStudent = role === "student";
    tabStudent?.classList.toggle("is-active", isStudent);
    tabStudent?.setAttribute("aria-selected", String(isStudent));
    tabAdmin?.classList.toggle("is-active", !isStudent);
    tabAdmin?.setAttribute("aria-selected", String(!isStudent));

    if (loginIdentifier && loginPassword) {
      loginIdentifier.value = isStudent
        ? "ana.clara@escola.edu.br"
        : "coord.horizonte@escola.edu.br";
      loginPassword.value = "123456789";
    }
    if (prototypeNote) {
      prototypeNote.textContent =
        "Este é um protótipo: use os dados preenchidos para entrar.";
    }
  }

  tabStudent?.addEventListener("click", () => selectRole("student"));
  tabAdmin?.addEventListener("click", () => selectRole("admin"));

  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const isAdmin = tabAdmin?.classList.contains("is-active");
    showDashboard(isAdmin ? "administracao" : "nova-ocorrencia");
  });

  // Navegação do menu lateral e botões internos
  navItems.forEach((btn) => {
    btn.addEventListener("click", () => activateNavView(btn.dataset.nav));
  });
  document.getElementById("btnOverviewNewOccurrence")?.addEventListener("click", () => {
    activateNavView("nova-ocorrencia");
  });
  document.getElementById("btnMakeReport")?.addEventListener("click", () => {
    activateNavView("nova-ocorrencia");
  });
  document.getElementById("btnMyNewOccurrence")?.addEventListener("click", () => {
    activateNavView("nova-ocorrencia");
  });
  document.getElementById("btnSeeAllRecords")?.addEventListener("click", () => {
    activateNavView("minhas-ocorrencias");
  });

  // Tipo de problema em Nova ocorrência
  const problemCards = document.querySelectorAll(".problem-card");
  problemCards.forEach((card) => {
    card.addEventListener("click", () => {
      problemCards.forEach((c) => {
        c.classList.remove("is-selected");
        const check = c.querySelector(".radio-check");
        if (check) {
          check.classList.remove("is-checked");
          check.textContent = "";
        }
      });
      card.classList.add("is-selected");
      const activeCheck = card.querySelector(".radio-check");
      if (activeCheck) {
        activeCheck.classList.add("is-checked");
        activeCheck.textContent = "✓";
      }
    });
  });

  // Contador da descrição
  const occDescription = document.getElementById("occDescription");
  const descCounter = document.getElementById("descCounter");
  occDescription?.addEventListener("input", () => {
    if (descCounter) {
      descCounter.textContent = `${occDescription.value.length} / 500`;
    }
  });

  // Upload de foto opcional
  const btnUploadPhoto = document.getElementById("btnUploadPhoto");
  const occPhotoInput = document.getElementById("occPhotoInput");
  const uploadLabel = document.getElementById("uploadLabel");
  btnUploadPhoto?.addEventListener("click", () => occPhotoInput?.click());
  occPhotoInput?.addEventListener("change", () => {
    const file = occPhotoInput.files && occPhotoInput.files[0];
    if (file && uploadLabel) {
      uploadLabel.textContent = file.name;
    }
  });

  // Cancelar / Enviar Nova ocorrência
  const newOccurrenceForm = document.getElementById("newOccurrenceForm");
  document.getElementById("btnCancelOccurrence")?.addEventListener("click", () => {
    newOccurrenceForm?.reset();
    if (descCounter) descCounter.textContent = "0 / 500";
    if (uploadLabel) uploadLabel.textContent = "Clique para enviar uma foto";
  });

  newOccurrenceForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const obj = document.getElementById("occObject")?.value.trim() || "Item";
    const loc = document.getElementById("occLocation")?.value || "Escola";
    alert(`Ocorrência registrada: ${obj} (${loc}).`);
    newOccurrenceForm.reset();
    if (descCounter) descCounter.textContent = "0 / 500";
    if (uploadLabel) uploadLabel.textContent = "Clique para enviar uma foto";
    activateNavView("minhas-ocorrencias");
  });

  // Filtro e busca em Minhas ocorrências
  const searchInput = document.getElementById("searchMyRecords");
  const filterSelect = document.getElementById("filterMyStatus");
  const myRows = document.querySelectorAll("#myRecordsBody .record-row");
  const myCountEl = document.getElementById("myRecordsCount");

  function filterMyOccurrences() {
    const term = (searchInput?.value || "").trim().toLowerCase();
    const status = filterSelect?.value || "Todos";
    let visibleCount = 0;

    myRows.forEach((row) => {
      const rowStatus = row.dataset.status || "";
      const rowSearch = (row.dataset.search || row.textContent).toLowerCase();
      const matchesStatus = status === "Todos" || rowStatus === status;
      const matchesTerm = !term || rowSearch.includes(term);
      const show = matchesStatus && matchesTerm;
      row.style.display = show ? "" : "none";
      if (show) visibleCount += 1;
    });

    if (myCountEl) {
      myCountEl.textContent = `${visibleCount} ocorrências enviadas`;
    }
  }

  searchInput?.addEventListener("input", filterMyOccurrences);
  filterSelect?.addEventListener("change", filterMyOccurrences);

  // Seleção e atualização de status em Administração
  const adminRows = document.querySelectorAll("#adminRecordsList .admin-row");
  const detailCode = document.getElementById("detailCode");
  const detailStatusBadge = document.getElementById("detailStatusBadge");
  const detailTitle = document.getElementById("detailTitle");
  const detailLocation = document.getElementById("detailLocation");
  const detailAuthor = document.getElementById("detailAuthor");
  const detailDate = document.getElementById("detailDate");
  const detailDesc = document.getElementById("detailDesc");
  const detailStatusSelect = document.getElementById("detailStatusSelect");
  const updateStatusForm = document.getElementById("updateStatusForm");

  let selectedAdminRow =
    document.querySelector("#adminRecordsList .admin-row.is-selected") || adminRows[0];

  function applyBadgeStyle(badgeEl, statusText) {
    if (!badgeEl) return;
    badgeEl.textContent = statusText;
    badgeEl.classList.remove("is-pending", "is-progress", "is-resolved");
    if (statusText === "Em andamento") badgeEl.classList.add("is-progress");
    else if (statusText === "Resolvido") badgeEl.classList.add("is-resolved");
    else badgeEl.classList.add("is-pending");
  }

  function selectAdminRow(row) {
    if (!row) return;
    adminRows.forEach((r) => r.classList.remove("is-selected"));
    row.classList.add("is-selected");
    selectedAdminRow = row;

    const status = row.dataset.status || "Pendente";
    if (detailCode) detailCode.textContent = `OCORRÊNCIA #${row.dataset.code || ""}`;
    if (detailTitle) detailTitle.textContent = row.dataset.title || "";
    if (detailLocation) detailLocation.textContent = row.dataset.location || "";
    if (detailAuthor) detailAuthor.textContent = row.dataset.author || "";
    if (detailDate) detailDate.textContent = row.dataset.date || "";
    if (detailDesc) detailDesc.textContent = row.dataset.desc || "";
    if (detailStatusSelect) detailStatusSelect.value = status;
    applyBadgeStyle(detailStatusBadge, status);
  }

  adminRows.forEach((row) => {
    row.addEventListener("click", () => selectAdminRow(row));
  });

  updateStatusForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!selectedAdminRow || !detailStatusSelect) return;
    const newStatus = detailStatusSelect.value;
    selectedAdminRow.dataset.status = newStatus;
    applyBadgeStyle(selectedAdminRow.querySelector(".status-badge"), newStatus);
    applyBadgeStyle(detailStatusBadge, newStatus);
  });
});

// Atualiza o primeiro nome automaticamente a partir do cadastro/acesso
(() => {
  function extractFirstName(rawValue, isAdmin) {
    if (isAdmin) return "Marina";

    const cleaned = (rawValue || "").trim();
    if (!cleaned) return "Ana";

    // Se for e-mail (ex.: ana.clara@escola.edu.br), pega a parte antes do @ e do ponto
    if (cleaned.includes("@")) {
      const localPart = cleaned.split("@")[0];
      const firstPiece = localPart.split(/[._-]/)[0] || "Ana";
      return firstPiece.charAt(0).toUpperCase() + firstPiece.slice(1).toLowerCase();
    }

    // Se for nome completo (ex.: "Ana Clara Silva"), pega apenas o primeiro nome
    const firstWord = cleaned.split(/\s+/)[0] || "Ana";
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase();
  }

  function applyUserFirstName() {
    const fullNameInput = document.getElementById("loginFullName");
    const identifierInput = document.getElementById("loginIdentifier");
    const tabAdmin = document.getElementById("tabAdmin");
    const dashUserName = document.getElementById("dashUserName");
    const overviewGreeting = document.getElementById("overviewGreeting");
    const dashUserRole = document.getElementById("dashUserRole");

    const isAdmin = Boolean(tabAdmin && tabAdmin.classList.contains("is-active"));
    const sourceText =
      (fullNameInput && fullNameInput.value.trim()) ||
      (identifierInput && identifierInput.value.trim()) ||
      "Ana Clara";

    const firstName = extractFirstName(sourceText, isAdmin);

    if (dashUserName) {
      dashUserName.textContent = isAdmin ? "Marina Costa" : `Olá, ${firstName}`;
    }
    if (overviewGreeting) {
      overviewGreeting.textContent = isAdmin
        ? `Bom dia, ${firstName}.`
        : `Bom dia, ${firstName}.`;
    }
    if (dashUserRole) {
      dashUserRole.textContent = isAdmin
        ? "Equipe administrativa"
        : "Estudante · 2º ano B";
    }
  }

  function bindAutoFirstName() {
    const loginForm = document.getElementById("loginForm");
    const fullNameInput = document.getElementById("loginFullName");
    const identifierInput = document.getElementById("loginIdentifier");
    const tabStudent = document.getElementById("tabStudent");
    const tabAdmin = document.getElementById("tabAdmin");

    loginForm?.addEventListener("submit", applyUserFirstName);
    fullNameInput?.addEventListener("input", applyUserFirstName);
    identifierInput?.addEventListener("input", applyUserFirstName);

    tabStudent?.addEventListener("click", () => {
      if (fullNameInput) fullNameInput.value = "Ana Clara";
      applyUserFirstName();
    });

    tabAdmin?.addEventListener("click", () => {
      if (fullNameInput) fullNameInput.value = "Marina Costa";
      applyUserFirstName();
    });

    applyUserFirstName();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindAutoFirstName);
  } else {
    bindAutoFirstName();
  }
})();

// Mantém o primeiro nome atualizado em todas as telas e ao trocar de aba
(() => {
  const STORAGE_KEY = "alertaEscolarFirstName";

  function extractFirstName(rawValue) {
    const cleaned = (rawValue || "").trim();
    if (!cleaned) return "Ana";

    if (cleaned.includes("@")) {
      const localPart = cleaned.split("@")[0];
      const firstPiece = localPart.split(/[._-]/)[0] || "Ana";
      return firstPiece.charAt(0).toUpperCase() + firstPiece.slice(1).toLowerCase();
    }

    const firstWord = cleaned.split(/\s+/)[0] || "Ana";
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase();
  }

  function getSavedFirstName() {
    const fullNameInput = document.getElementById("loginFullName");
    const identifierInput = document.getElementById("loginIdentifier");
    const typedSource =
      (fullNameInput && fullNameInput.value.trim()) ||
      (identifierInput && identifierInput.value.trim());

    if (typedSource) {
      const firstName = extractFirstName(typedSource);
      try {
        localStorage.setItem(STORAGE_KEY, firstName);
      } catch (e) {}
      return firstName;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return stored;
    } catch (e) {}

    return "Ana";
  }

  function syncNameAcrossAllScreens() {
    const firstName = getSavedFirstName();
    const dashUserName = document.getElementById("dashUserName");
    const overviewGreeting = document.getElementById("overviewGreeting");
    const dashUserRole = document.getElementById("dashUserRole");
    const activeNav = document.querySelector(".sidebar-nav .nav-item.is-active");
    const isAdminView = activeNav && activeNav.dataset.nav === "administracao";

    if (dashUserName) {
      dashUserName.textContent = isAdminView
        ? `${firstName} Costa`
        : `Olá, ${firstName}`;
    }

    if (overviewGreeting) {
      overviewGreeting.textContent = `Bom dia, ${firstName}.`;
    }

    if (dashUserRole) {
      dashUserRole.textContent = isAdminView
        ? "Equipe administrativa"
        : "Estudante · 2º ano B";
    }
  }

  function initGlobalNameSync() {
    const loginForm = document.getElementById("loginForm");
    const fullNameInput = document.getElementById("loginFullName");
    const identifierInput = document.getElementById("loginIdentifier");
    const navItems = document.querySelectorAll(".sidebar-nav .nav-item");

    const onChangeName = () => {
      const source =
        (fullNameInput && fullNameInput.value.trim()) ||
        (identifierInput && identifierInput.value.trim()) ||
        "Ana Clara";
      const firstName = extractFirstName(source);
      try {
        localStorage.setItem(STORAGE_KEY, firstName);
      } catch (e) {}
      syncNameAcrossAllScreens();
    };

    fullNameInput?.addEventListener("input", onChangeName);
    identifierInput?.addEventListener("input", onChangeName);
    loginForm?.addEventListener("submit", onChangeName);

    navItems.forEach((btn) => {
      btn.addEventListener("click", () => {
        setTimeout(syncNameAcrossAllScreens, 0);
      });
    });

    syncNameAcrossAllScreens();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGlobalNameSync);
  } else {
    initGlobalNameSync();
  }
})();

// Controle de permissão: estudante sem acesso à Administração; administrador com acesso total
(() => {
  const ROLE_KEY = "alertaEscolarActiveRole";

  function getCurrentRole() {
    const tabAdmin = document.getElementById("tabAdmin");
    if (tabAdmin && tabAdmin.classList.contains("is-active")) {
      return "admin";
    }
    try {
      const saved = localStorage.getItem(ROLE_KEY);
      if (saved === "admin" || saved === "student") return saved;
    } catch (e) {}
    return "student";
  }

  function setCurrentRole(role) {
    const normalized = role === "admin" ? "admin" : "student";
    try {
      localStorage.setItem(ROLE_KEY, normalized);
    } catch (e) {}
    applyRolePermissions(normalized);
  }

  function applyRolePermissions(role = getCurrentRole()) {
    const isAdmin = role === "admin";
    const adminNavBtn = document.querySelector('.sidebar-nav .nav-item[data-nav="administracao"]');
    const viewAdmin = document.getElementById("view-administracao");
    const userRoleEl = document.getElementById("dashUserRole");

    if (adminNavBtn) {
      adminNavBtn.classList.toggle("is-hidden-role", !isAdmin);
      adminNavBtn.hidden = !isAdmin;
      adminNavBtn.setAttribute("aria-disabled", String(!isAdmin));
    }

    // Se for estudante e estiver na tela de administração, redireciona para Nova ocorrência
    if (!isAdmin && viewAdmin && !viewAdmin.hidden) {
      const novaNavBtn = document.querySelector('.sidebar-nav .nav-item[data-nav="nova-ocorrencia"]');
      novaNavBtn?.click();
    }

    if (userRoleEl) {
      userRoleEl.textContent = isAdmin
        ? "Equipe administrativa"
        : "Estudante · 2º ano B";
    }
  }

  function initRoleAccessControl() {
    const tabStudent = document.getElementById("tabStudent");
    const tabAdmin = document.getElementById("tabAdmin");
    const loginForm = document.getElementById("loginForm");
    const navItems = document.querySelectorAll(".sidebar-nav .nav-item[data-nav]");

    tabStudent?.addEventListener("click", () => {
      setCurrentRole("student");
    });

    tabAdmin?.addEventListener("click", () => {
      setCurrentRole("admin");
    });

    loginForm?.addEventListener("submit", () => {
      const selectedRole = tabAdmin?.classList.contains("is-active") ? "admin" : "student";
      setCurrentRole(selectedRole);

      // Administrador entra com acesso total; estudante não acessa Administração
      if (selectedRole === "admin") {
        const adminBtn = document.querySelector('.sidebar-nav .nav-item[data-nav="administracao"]');
        setTimeout(() => adminBtn?.click(), 10);
      } else {
        const novaBtn = document.querySelector('.sidebar-nav .nav-item[data-nav="nova-ocorrencia"]');
        setTimeout(() => novaBtn?.click(), 10);
      }
    });

    navItems.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const targetNav = btn.dataset.nav;
        if (targetNav === "administracao" && getCurrentRole() !== "admin") {
          e.preventDefault();
          e.stopImmediatePropagation();
          alert("Acesso restrito à equipe administrativa.");
          const novaBtn = document.querySelector('.sidebar-nav .nav-item[data-nav="nova-ocorrencia"]');
          novaBtn?.click();
          return;
        }
        setTimeout(() => applyRolePermissions(), 0);
      }, true);
    });

    applyRolePermissions();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRoleAccessControl);
  } else {
    initRoleAccessControl();
  }
})();