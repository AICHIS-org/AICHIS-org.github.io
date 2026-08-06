/* =========================================================================
   AICHIS — SITE LOGIC
   -------------------------------------------------------------------------
   You normally do NOT need to edit this file. It reads the text and data
   from content.js and renders the page, handles language switching, and
   runs the mobile menu.
   ========================================================================= */

(function () {
  "use strict";

  const SUPPORTED = ["es", "en", "sv"];
  const DEFAULT_LANG = "es";

  /* --- pick initial language: saved choice > browser > default --------- */
  function initialLang() {
    const saved = localStorage.getItem("aichis-lang");
    if (saved && SUPPORTED.includes(saved)) return saved;
    const browser = (navigator.language || "").slice(0, 2);
    if (SUPPORTED.includes(browser)) return browser;
    return DEFAULT_LANG;
  }

  /* --- read a dotted path like "hero.title" from an object ------------- */
  function get(obj, path) {
    return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
  }

  /* --- render the About cards ------------------------------------------ */
  function renderAbout(lang) {
    const el = document.getElementById("about-cards");
    const cards = CONTENT[lang].about.cards || [];
    el.innerHTML = cards
      .map(
        (c) => `
        <article class="card">
          <h3>${c.title}</h3>
          <p>${c.text}</p>
        </article>`
      )
      .join("");
  }

  /* --- render the Explora Nobel editions timeline ---------------------- */
  function renderExplora(lang) {
    const el = document.getElementById("explora-editions");
    if (!el) return;
    el.innerHTML = EXPLORA_EDITIONS.map((e) => {
      const label = typeof e.label === "object" ? e.label[lang] : e.label;
      const inner = `
        <span class="edition-year">${e.year}</span>
        <span class="edition-label">${label || ""}</span>`;
      const body = e.link
        ? `<a class="edition-body" href="${e.link}" target="_blank" rel="noopener">${inner}</a>`
        : `<span class="edition-body">${inner}</span>`;
      return `<li class="edition edition-${e.state}">${body}</li>`;
    }).join("");
  }

  /* --- shared helpers for PROFILES-based sections ----------------------- */
  function initialsOf(name) {
    return name
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  function linkedName(p) {
    return p.link
      ? `<a href="${p.link}" target="_blank" rel="noopener">${p.name}</a>`
      : p.name;
  }

  /* --- render the Board grid --------------------------------------------- */
  function renderBoard(lang) {
    const el = document.getElementById("board-grid");
    if (!el) return;
    const board = PROFILES.filter((p) => p.board);
    if (!board.length) {
      el.innerHTML = `<p class="empty-note">—</p>`;
      return;
    }
    el.innerHTML = board.map((p) => {
      const role = typeof p.board.role === "object" ? p.board.role[lang] : p.board.role;
      const avatar = p.photo
        ? `<img class="board-photo" src="${p.photo}" alt="${p.name}" />`
        : `<div class="board-avatar" aria-hidden="true">${initialsOf(p.name)}</div>`;
      return `
        <article class="board-card">
          ${avatar}
          <h3 class="board-name">${linkedName(p)}</h3>
          <p class="board-role">${role || ""}</p>
        </article>`;
    }).join("");
  }

  /* --- render previous boards (Board section, "Previous boards") -------- */
  function renderBoardHistory(lang) {
    const el = document.getElementById("board-history");
    if (!el) return;
    el.innerHTML = BOARD_HISTORY.map((entry) => {
      const body = entry.members.length
        ? `<div class="board-history-grid">${entry.members.map((m) => {
            const role = typeof m.role === "object" ? m.role[lang] : m.role;
            const avatar = m.photo
              ? `<img class="board-photo" src="${m.photo}" alt="${m.name}" />`
              : `<div class="board-avatar" aria-hidden="true">${initialsOf(m.name)}</div>`;
            return `
              <article class="board-card board-history-card">
                ${avatar}
                <h4 class="board-name">${m.name}</h4>
                <p class="board-role">${role || ""}</p>
              </article>`;
          }).join("")}</div>`
        : `<p class="empty-note">—</p>`;
      return `
        <div class="board-history-group">
          <h4 class="board-history-year">${entry.year}</h4>
          ${body}
        </div>`;
    }).join("");
  }

  /* --- render the Members roster ---------------------------------------- */
  function renderMembers(lang) {
    const el = document.getElementById("members-grid");
    if (!el) return;
    const members = PROFILES.filter((p) => p.member);
    if (!members.length) {
      el.innerHTML = `<p class="empty-note">—</p>`;
      return;
    }
    el.innerHTML = members.map((p) => {
      const role = typeof p.member.role === "object" ? p.member.role[lang] : p.member.role;
      const field = typeof p.member.field === "object" ? p.member.field[lang] : p.member.field;
      const avatar = p.photo
        ? `<img class="member-photo" src="${p.photo}" alt="${p.name}" />`
        : `<div class="member-avatar" aria-hidden="true">${initialsOf(p.name)}</div>`;
      return `
        <article class="member-card">
          <div class="member-head">
            ${avatar}
            <div>
              <h3 class="member-name">${linkedName(p)}</h3>
              <p class="member-role">${role || ""}</p>
            </div>
          </div>
          <p class="member-field">${field || ""}</p>
          <p class="member-inst">${p.member.institution || ""}</p>
        </article>`;
    }).join("");
  }

  /* --- render the Chileans-in-Sweden directory ------------------------- */
  function renderResearchers(lang) {
    const el = document.getElementById("researchers-grid");
    if (!el) return;
    if (!RESEARCHERS.length) {
      el.innerHTML = `<p class="empty-note">—</p>`;
      return;
    }
    el.innerHTML = RESEARCHERS.map((r) => {
      const field = typeof r.field === "object" ? r.field[lang] : r.field;
      const name = r.link
        ? `<a href="${r.link}" target="_blank" rel="noopener">${r.name}</a>`
        : r.name;
      return `
        <article class="researcher-card">
          <h3 class="researcher-name">${name}</h3>
          <p class="researcher-field">${field || ""}</p>
          <p class="researcher-aff">${r.affiliation || ""}</p>
        </article>`;
    }).join("");
  }

  /* --- render the Resources list --------------------------------------- */
  function renderResources(lang) {
    const el = document.getElementById("resources-list");
    if (!RESOURCES.length) {
      el.innerHTML = `<p class="empty-note">—</p>`;
      return;
    }
    el.innerHTML = RESOURCES.map((r) => {
      const title = typeof r.title === "object" ? r.title[lang] : r.title;
      const desc =
        typeof r.description === "object" ? r.description[lang] : r.description;
      return `
        <a class="resource-card" href="${r.link}" target="_blank" rel="noopener">
          <h3>${title}</h3>
          <p>${desc || ""}</p>
          <span class="resource-arrow" aria-hidden="true">&rarr;</span>
        </a>`;
    }).join("");
  }

  /* --- apply a language across the whole page -------------------------- */
  function setLanguage(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;

    // static text nodes marked with data-i18n
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const value = get(CONTENT[lang], node.getAttribute("data-i18n"));
      if (value !== undefined) node.textContent = value;
    });

    // dynamic sections
    renderAbout(lang);
    renderExplora(lang);
    renderMembers(lang);
    renderBoard(lang);
    renderBoardHistory(lang);
    renderResearchers(lang);
    renderResources(lang);

    // reflect state
    document.documentElement.lang = lang;
    localStorage.setItem("aichis-lang", lang);
    document.querySelectorAll(".lang-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.lang === lang);
    });
  }

  /* --- wire up controls ------------------------------------------------- */
  function init() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
    });

    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav-links");
    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      nav.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => {
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        })
      );
    }

    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    setLanguage(initialLang());
  }

  document.addEventListener("DOMContentLoaded", init);
})();
