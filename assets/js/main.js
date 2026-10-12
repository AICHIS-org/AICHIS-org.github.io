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

  /* --- make text from content.js safe to place inside HTML --------------
     Everything in content.js is shown as plain text, never as markup, so a
     stray "<" (or a malicious edit) can't inject tags or scripts. */
  const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  function esc(value) {
    return value == null ? "" : String(value).replace(/[&<>"']/g, (ch) => ESCAPES[ch]);
  }

  // Links may only be web or email addresses (or a local path, for photos).
  // Anything else — e.g. "javascript:..." — is replaced by a harmless "#".
  function safeUrl(url) {
    const value = String(url == null ? "" : url).trim();
    const hasScheme = /^[a-z][a-z0-9+.-]*:/i.test(value);
    if (hasScheme && !/^(https?:|mailto:)/i.test(value)) return "#";
    return esc(value);
  }

  /* --- render the About cards ------------------------------------------ */
  function renderAbout(lang) {
    const el = document.getElementById("about-cards");
    const cards = CONTENT[lang].about.cards || [];
    el.innerHTML = cards
      .map(
        (c) => `
        <article class="card">
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.text)}</p>
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
        <span class="edition-year">${esc(e.year)}</span>
        <span class="edition-label">${esc(label)}</span>`;
      const body = e.link
        ? `<a class="edition-body" href="${safeUrl(e.link)}" target="_blank" rel="noopener">${inner}</a>`
        : `<span class="edition-body">${inner}</span>`;
      return `<li class="edition edition-${esc(e.state)}">${body}</li>`;
    }).join("");
  }

  /* --- small inline icons used on member cards --------------------------- */
  const ICONS = {
    email: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13zm2.2.5 7.8 6.15L19.8 6H4.2zM20 8.1l-7.4 5.84a1 1 0 0 1-1.24 0L4 8.1v10.4c0 .28.22.5.5.5h15a.5.5 0 0 0 .5-.5V8.1z"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>`,
    webpage: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.9 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.9-3.8-9s1.3-6.3 3.8-9z"/></svg>`,
  };

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
      ? `<a href="${safeUrl(p.link)}" target="_blank" rel="noopener">${esc(p.name)}</a>`
      : esc(p.name);
  }

  // Board cards show a person's current Members-profile info (position +
  // institution) alongside their board role, when they have one on file.
  function currentMemberInfoOf(name) {
    const p = PROFILES.find((p) => p.name === name && p.member);
    return p ? p.member : null;
  }

  function boardCardHTML({ name, roleText, photo, link, member }, lang, extraClass = "") {
    const avatar = photo
      ? `<img class="board-photo" src="${safeUrl(photo)}" alt="${esc(name)}" />`
      : `<div class="board-avatar" aria-hidden="true">${esc(initialsOf(name))}</div>`;
    const nameHTML = link
      ? `<a href="${safeUrl(link)}" target="_blank" rel="noopener">${esc(name)}</a>`
      : esc(name);
    const field = member && (typeof member.field === "object" ? member.field[lang] : member.field);
    const institution = member && member.institution;
    return `
      <article class="board-card${extraClass ? " " + esc(extraClass) : ""}">
        ${avatar}
        <h4 class="board-name">${nameHTML}</h4>
        <p class="board-role">${esc(roleText)}</p>
        <p class="board-field">${esc(field)}</p>
        <p class="board-inst">${esc(institution)}</p>
      </article>`;
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
      const roleText = typeof p.board.role === "object" ? p.board.role[lang] : p.board.role;
      return boardCardHTML(
        { name: p.name, roleText, photo: p.photo, link: p.link, member: p.member },
        lang
      );
    }).join("");
  }

  /* --- render previous boards (Board section, "Previous boards") -------- */
  function renderBoardHistory(lang) {
    const el = document.getElementById("board-history");
    if (!el) return;
    el.innerHTML = BOARD_HISTORY.map((entry) => {
      const body = entry.members.length
        ? `<div class="board-history-grid">${entry.members.map((m) => {
            const roleText = typeof m.role === "object" ? m.role[lang] : m.role;
            return boardCardHTML(
              { name: m.name, roleText, photo: m.photo, link: "", member: currentMemberInfoOf(m.name) },
              lang,
              "board-history-card"
            );
          }).join("")}</div>`
        : `<p class="empty-note">—</p>`;
      return `
        <div class="board-history-group">
          <h4 class="board-history-year">${esc(entry.year)}</h4>
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
      const m = p.member;
      const role = typeof m.role === "object" ? m.role[lang] : m.role;
      const field = typeof m.field === "object" ? m.field[lang] : m.field;
      const avatar = p.photo
        ? `<img class="member-photo" src="${safeUrl(p.photo)}" alt="${esc(p.name)}" />`
        : `<div class="member-avatar" aria-hidden="true">${esc(initialsOf(p.name))}</div>`;

      const contact = (m.email || m.linkedin || m.webpage)
        ? `
          <p class="member-contact">
            ${m.email ? `<a href="mailto:${esc(m.email)}" class="member-contact-icon" aria-label="Email">${ICONS.email}</a>` : ""}
            ${m.linkedin ? `<a href="${safeUrl(m.linkedin)}" target="_blank" rel="noopener" class="member-contact-icon" aria-label="LinkedIn">${ICONS.linkedin}</a>` : ""}
            ${m.webpage ? `<a href="${safeUrl(m.webpage)}" target="_blank" rel="noopener" class="member-contact-icon" aria-label="Website">${ICONS.webpage}</a>` : ""}
          </p>`
        : "";

      return `
        <article class="member-card">
          <div class="member-head">
            ${avatar}
            <div>
              <h3 class="member-name">${linkedName(p)}</h3>
              <p class="member-role">${esc(role)}</p>
            </div>
          </div>
          <p class="member-field">${esc(field)}</p>
          <p class="member-inst">${esc(m.institution)}</p>
          ${contact}
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
        ? `<a href="${safeUrl(r.link)}" target="_blank" rel="noopener">${esc(r.name)}</a>`
        : esc(r.name);
      return `
        <article class="researcher-card">
          <h3 class="researcher-name">${name}</h3>
          <p class="researcher-field">${esc(field)}</p>
          <p class="researcher-aff">${esc(r.affiliation)}</p>
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
      // mailto: links open the mail app, so they shouldn't spawn a blank tab
      const target = /^mailto:/.test(r.link) ? "" : ` target="_blank" rel="noopener"`;
      return `
        <a class="resource-card" href="${safeUrl(r.link)}"${target}>
          <h3>${esc(title)}</h3>
          <p>${esc(desc)}</p>
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
