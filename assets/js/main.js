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

  /* --- one resource card (Resources section + Explora Nobel tabs) ------ */
  function resourceCardHTML(r, lang) {
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
  }

  /* --- one entry of an Explora Nobel year's timeline --------------------- */
  function timelineItemHTML(r, lang) {
    const title = typeof r.title === "object" ? r.title[lang] : r.title;
    const desc =
      typeof r.description === "object" ? r.description[lang] : r.description;
    return `
        <li class="timeline-item">
          <a class="timeline-card" href="${safeUrl(r.link)}" target="_blank" rel="noopener">
            ${r.image ? `<img class="timeline-thumb" src="${safeUrl(r.image)}" alt="" loading="lazy" />` : ""}
            <span class="timeline-text">
              <span class="timeline-title">${esc(title)}</span>
              <span class="timeline-desc">${esc(desc)}</span>
            </span>
            <span class="resource-arrow" aria-hidden="true">&rarr;</span>
          </a>
        </li>`;
  }

  /* --- render the Explora Nobel year tabs + the open year's resources -- */
  // Which year's tab is open. Starts on the most recent edition that has
  // resources, and is remembered when the language changes.
  let exploraYear = null;

  function renderExplora(lang) {
    const tabs = document.getElementById("explora-editions");
    const panel = document.getElementById("explora-panel");
    if (!tabs || !panel || !EXPLORA_EDITIONS.length) return;

    let current = EXPLORA_EDITIONS.find((e) => e.year === exploraYear);
    if (!current) {
      const withResources = EXPLORA_EDITIONS.filter((e) => (e.resources || []).length);
      current = withResources.length
        ? withResources[withResources.length - 1]
        : EXPLORA_EDITIONS[EXPLORA_EDITIONS.length - 1];
      exploraYear = current.year;
    }

    tabs.setAttribute("aria-label", CONTENT[lang].explora.editionsLabel);
    tabs.innerHTML = EXPLORA_EDITIONS.map((e) => {
      const label = typeof e.label === "object" ? e.label[lang] : e.label;
      const selected = e === current;
      return `
        <button type="button" role="tab" class="edition edition-${esc(e.state)}"
          id="explora-tab-${esc(e.year)}" data-year="${esc(e.year)}"
          aria-controls="explora-panel" aria-selected="${selected}" tabindex="${selected ? 0 : -1}">
          <span class="edition-body">
            <span class="edition-year">${esc(e.year)}</span>
            <span class="edition-label">${esc(label)}</span>
          </span>
        </button>`;
    }).join("");

    // newest first; the date only sets the order, it isn't shown
    const resources = (current.resources || [])
      .slice()
      .sort((x, y) => String(y.date || "").localeCompare(String(x.date || "")));
    panel.setAttribute("aria-labelledby", `explora-tab-${current.year}`);
    panel.innerHTML = resources.length
      ? `<ol class="timeline">${resources.map((r) => timelineItemHTML(r, lang)).join("")}</ol>`
      : `<p class="empty-note">${esc(CONTENT[lang].explora.noResources)}</p>`;
  }

  // Open a year's tab on click, or move between tabs with the arrow keys.
  function initExploraTabs() {
    const tabs = document.getElementById("explora-editions");
    if (!tabs) return;
    const open = (year, focus) => {
      exploraYear = year;
      renderExplora(document.documentElement.lang);
      if (focus) {
        const tab = Array.from(tabs.querySelectorAll("[role=tab]")).find((t) => t.dataset.year === year);
        if (tab) tab.focus();
      }
    };
    tabs.addEventListener("click", (event) => {
      const tab = event.target.closest("[role=tab]");
      // detail is 0 when the "click" came from the keyboard (Enter/Space):
      // only then put focus back on the tab, so mouse users see no outline.
      if (tab) open(tab.dataset.year, event.detail === 0);
    });
    tabs.addEventListener("keydown", (event) => {
      const years = EXPLORA_EDITIONS.map((e) => e.year);
      const at = years.indexOf(exploraYear);
      const next = { ArrowRight: at + 1, ArrowLeft: at - 1, Home: 0, End: years.length - 1 }[event.key];
      if (next === undefined) return;
      event.preventDefault();
      open(years[(next + years.length) % years.length], true);
    });
  }

  /* --- small inline icons used on member cards --------------------------- */
  const ICONS = {
    email: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13zm2.2.5 7.8 6.15L19.8 6H4.2zM20 8.1l-7.4 5.84a1 1 0 0 1-1.24 0L4 8.1v10.4c0 .28.22.5.5.5h15a.5.5 0 0 0 .5-.5V8.1z"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>`,
    university: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#0d3b8c" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M3 9.5 12 5l9 4.5-9 4.5z"/><path d="M7 11.6V16c1.4 1.3 3 2 5 2s3.6-.7 5-2v-4.4"/><path d="M21 9.5V14"/></svg>`,
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

  // A person's info counts as "confirmed" once their member institution is
  // filled in (TBD profiles are seeded with institution: "").
  function hasConfirmedInfo(p) {
    return !!(p.member && p.member.institution);
  }

  // Last name, for sorting. Prefers the profile's explicit `lastName`
  // (needed whenever the first, paternal surname should be used — e.g.
  // "Morales" in "Rodrigo Morales Castro" — rather than the final word).
  // Falls back to the final word of `name`, plus a leading particle (e.g.
  // "San Juan", "de la Cruz") so compound surnames stay together.
  const SURNAME_PARTICLES = new Set([
    "de", "del", "la", "las", "los", "san", "santa", "von", "van", "da", "do", "dos",
  ]);
  function lastNameOf(p) {
    if (p.lastName) return p.lastName;
    const parts = p.name.trim().split(/\s+/);
    let start = parts.length - 1;
    while (start > 0 && SURNAME_PARTICLES.has(parts[start - 1].toLowerCase())) start--;
    return parts.slice(start).join(" ");
  }

  // Board order: President, then Treasurer, then everyone else with
  // confirmed info (alphabetically), then anyone still "to be confirmed".
  function boardSortRank(p) {
    const role = p.board.role;
    if (role === ROLES.president || role === ROLES.presidentM) return 0;
    if (role === ROLES.treasurer || role === ROLES.treasurerF) return 1;
    return hasConfirmedInfo(p) ? 2 : 3;
  }

  function sortedBoard() {
    return PROFILES.filter((p) => p.board)
      .slice()
      .sort((a, b) => boardSortRank(a) - boardSortRank(b) || lastNameOf(a).localeCompare(lastNameOf(b), "es"));
  }

  /* --- render the Board grid --------------------------------------------- */
  function renderBoard(lang) {
    const el = document.getElementById("board-grid");
    if (!el) return;
    const board = sortedBoard();
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
    const members = PROFILES.filter((p) => p.member)
      .slice()
      .sort((a, b) => (hasConfirmedInfo(b) - hasConfirmedInfo(a)) || lastNameOf(a).localeCompare(lastNameOf(b), "es"));
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

  /* --- Chileans in Sweden: map of current and past members -------------- */
  // Same projection that drew assets/img/sweden-map.svg — keep them in sync.
  const SWEDEN_MAP = { width: 128, height: 284, lon0: 10.8, latTop: 69.3, k: 20, cosLat: Math.cos((62 * Math.PI) / 180) };

  function projectCity([lat, lon]) {
    return [(lon - SWEDEN_MAP.lon0) * SWEDEN_MAP.cosLat * SWEDEN_MAP.k, (SWEDEN_MAP.latTop - lat) * SWEDEN_MAP.k];
  }

  // One plant per career stage, drawn in a 24x24 box.
  const STAGES = ["student", "phd", "postdoc", "pi", "researcher", "professional"];
  const PLANTS = {
    student: `<ellipse cx="12" cy="13" rx="5" ry="6.5" fill="#a86b32" transform="rotate(-25 12 13)"/><path d="M10 9.5c1.5 1 2.5 3 2.6 6" stroke="#6e4219" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,
    phd: `<path d="M12 20.5V12" stroke="#3f7d3a" stroke-width="1.8" stroke-linecap="round"/><path d="M12 13C12 8.5 8.5 6.5 4.5 7c.2 4 3.3 6.5 7.5 6z" fill="#5aa64b"/><path d="M12 11c0-4 3-6 7-5.6-.3 3.7-3 6-7 5.6z" fill="#7cc35e"/><path d="M8 20.5h8" stroke="#8a5a2b" stroke-width="1.6" stroke-linecap="round"/>`,
    postdoc: `<path d="M12 21v-8.5" stroke="#7a4e2d" stroke-width="2" stroke-linecap="round"/><path d="M12 15.5l-2.6-2.4" stroke="#7a4e2d" stroke-width="1.4" stroke-linecap="round"/><circle cx="12" cy="9" r="5.5" fill="#5aa64b"/>`,
    pi: `<path d="M10.4 23h3.2l-.45-8.5h-2.3z" fill="#7a4e2d"/><circle cx="6.4" cy="12.2" r="5" fill="#3f8a3a"/><circle cx="17.6" cy="12.2" r="5" fill="#3f8a3a"/><circle cx="12" cy="13.2" r="5" fill="#4f9e45"/><circle cx="12" cy="7" r="6.3" fill="#4f9e45"/><g fill="#d52b1e"><circle cx="8.6" cy="9.4" r="1.15"/><circle cx="15" cy="5.6" r="1.15"/><circle cx="16.8" cy="12.6" r="1.15"/><circle cx="11.2" cy="14.6" r="1.15"/><circle cx="6.2" cy="14" r="1.15"/><circle cx="13.2" cy="9.8" r="1.15"/></g>`,
    researcher: `<path d="M11.1 21.5h1.8l-.25-7.5h-1.3z" fill="#7a4e2d"/><circle cx="8.8" cy="12.4" r="3.9" fill="#3f8a3a"/><circle cx="15.2" cy="12.4" r="3.9" fill="#3f8a3a"/><circle cx="12" cy="9" r="4.8" fill="#4f9e45"/>`,
    professional: `<path d="M12 21.5V11" stroke="#3f7d3a" stroke-width="1.6" stroke-linecap="round"/><path d="M12 18c-2.6 0-4.2-1.5-4.7-3.6 2.6 0 4.2 1.4 4.7 3.6z" fill="#5aa64b"/><g fill="#f8c300"><circle cx="12" cy="4.6" r="2.5"/><circle cx="15.3" cy="7.2" r="2.5"/><circle cx="14" cy="10.9" r="2.5"/><circle cx="10" cy="10.9" r="2.5"/><circle cx="8.7" cy="7.2" r="2.5"/></g><circle cx="12" cy="8" r="1.9" fill="#d52b1e"/>`,
  };
  const plantIcon = (stage, size = 22) =>
    `<svg class="plant-icon" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true">${PLANTS[stage] || ""}</svg>`;

  const pickLang = (v, lang) => (v && typeof v === "object" && !Array.isArray(v) ? v[lang] : v);

  // Map state survives language changes: who is pinned, which groups are
  // hidden, and how far in the map is zoomed (k) around which point (x, y).
  let mapPinned = null;
  const mapSelected = new Set(); // filter chips that are pressed
  const MAP_MAX_ZOOM = 16;
  // County outlines from assets/img/sweden-map.svg, drawn into the map itself
  // (instead of as a picture) so borders stay thin however far we zoom in.
  let swedenPaths = null;
  let mapView = { k: 1, x: SWEDEN_MAP.width / 2, y: SWEDEN_MAP.height / 2 };
  // Set by each render, for drawing a person's path on top: where every pin
  // ended up, and the zoom and visible box it was drawn with.
  let mapDrawn = { pins: {}, k: 1, box: [0, 0, SWEDEN_MAP.width, SWEDEN_MAP.height] };

  function mapPeople() {
    return MEMBER_MAP.filter((m) => STAGES.includes(m.stage) && CITIES[m.city]).map((m, i) => {
      const profile = PROFILES.find((p) => p.name === m.name);
      return { ...m, i, profile, member: (profile && profile.member) || {}, photo: m.photo || (profile && profile.photo) || "" };
    });
  }

  // Where a person is drawn: their city.
  function anchorOf(p) {
    return { key: p.city, label: p.city, at: CITIES[p.city] };
  }

  // Filter keys: the stage, "current"/"past", and "uni:<key>" ("uni:" for
  // people with no university listed). Pressing chips narrows the map down to
  // them: chips of the same kind add up (KTH + SU), different kinds combine
  // (KTH + PhD = PhD students at KTH). Nothing pressed shows everyone.
  const uniKeyOf = (p) => "uni:" + (UNIVERSITIES[p.university] ? p.university : "");
  const keysOf = (p) => [p.stage, p.current ? "current" : "past", uniKeyOf(p)];
  const kindOf = (key) => (STAGES.includes(key) ? 0 : key === "current" || key === "past" ? 1 : 2);
  const isHiddenOnMap = (p) =>
    keysOf(p).some((own) => {
      const pressed = [...mapSelected].filter((key) => kindOf(key) === kindOf(own));
      return pressed.length > 0 && !pressed.includes(own);
    });

  // Board roles a person has held: the current one (PROFILES) and past ones (BOARD_HISTORY).
  function boardRolesOf(name, lang) {
    const roles = [];
    const current = PROFILES.find((p) => p.name === name && p.board);
    if (current) roles.push({ when: CONTENT[lang].nav.board, role: pickLang(current.board.role, lang) });
    BOARD_HISTORY.forEach((entry) => {
      const m = entry.members.find((x) => x.name === name);
      if (m) roles.push({ when: String(entry.year), role: pickLang(m.role, lang) });
    });
    return roles;
  }

  function mapDetailHTML(person, lang, pinned) {
    const t = CONTENT[lang].researchers;
    if (!person) return `<p class="map-hint">${esc(t.hint)}</p>`;
    const m = person.member;
    const avatar = person.photo
      ? `<img class="member-photo" src="${safeUrl(person.photo)}" alt="" />`
      : `<div class="member-avatar" aria-hidden="true">${esc(initialsOf(person.name))}</div>`;
    const field = pickLang(person.field || m.field, lang);
    const institution = person.institution || m.institution;
    const place = [institution, person.city].filter(Boolean).join(" · ");
    const board = boardRolesOf(person.name, lang);
    const history = person.history || [];
    const list = (items) =>
      `<ol class="map-timeline">${items.map((h) => `
          <li><span class="map-when">${esc(h.when)}</span><span class="map-what">${h.stage ? plantIcon(h.stage, 16) : ""}<span>${esc(h.what)}</span></span></li>`).join("")}</ol>`;
    const whereOf = (h) => [h.place, h.city, COUNTRIES[h.country] ? COUNTRIES[h.country].name[lang] : h.country].filter(Boolean).join(", ");

    return `
      <article class="map-card${person.current ? "" : " is-past"}">
        <div class="member-head">
          ${avatar}
          <div>
            <h3 class="member-name">${esc(person.name)}</h3>
            <p class="map-stage">${plantIcon(person.stage, 18)} ${esc(t.stages[person.stage])}</p>
          </div>
          ${pinned ? `<button type="button" class="map-close" aria-label="${esc(t.close)}">&times;</button>` : ""}
        </div>
        <p class="map-badge">${esc(person.current ? t.currentBadge : t.pastBadge)}</p>
        ${m.role ? `<p class="member-role">${esc(pickLang(m.role, lang))}</p>` : ""}
        ${field ? `<p class="member-field">${esc(field)}</p>` : ""}
        <p class="member-inst">${esc(place)}</p>
        ${board.length ? `<h4 class="map-subtitle">${esc(t.aichisTitle)}</h4>${list(board.map((b) => ({ when: b.when, what: b.role })))}` : ""}
        <h4 class="map-subtitle">${esc(t.historyTitle)}</h4>
        ${history.length
          ? list(history.map((h) => ({ when: h.years, stage: h.stage, what: [pickLang(h.role, lang), whereOf(h)].filter(Boolean).join(" — ") })))
          : `<p class="map-empty">${esc(t.noHistory)}</p>`}
      </article>`;
  }

  function renderMemberMap(lang) {
    const canvas = document.getElementById("member-map");
    const filters = document.getElementById("map-filters");
    if (!canvas || !filters) return;
    const t = CONTENT[lang].researchers;
    const people = mapPeople();

    // The visible part of the map. Pins, dots and labels keep the same size on
    // screen at every zoom, so zooming in spreads crowded cities apart.
    const { k } = mapView;
    const viewW = SWEDEN_MAP.width / k, viewH = SWEDEN_MAP.height / k;
    const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
    const viewX = clamp(mapView.x - viewW / 2, 0, SWEDEN_MAP.width - viewW);
    const viewY = clamp(mapView.y - viewH / 2, 0, SWEDEN_MAP.height - viewH);

    // Each pin starts on its city and is nudged just far enough to stop
    // overlapping the others, so it stays as close to its real place as it can
    // (a crowded Stockholm doesn't spill over Uppsala). A dot marks the real
    // spot, with a thin line to every pin that had to move.
    const PIN_R = (12 * 0.42) / k; // matches .map-pin .pin-body scale in styles.css
    const visible = people.filter((p) => !isHiddenOnMap(p));
    const perPlace = {};
    const pins = visible.map((p) => {
      const place = anchorOf(p);
      const n = (perPlace[place.key] = (perPlace[place.key] || 0) + 1) - 1;
      const [cx, cy] = projectCity(place.at);
      const a = n * 2.39996; // golden angle: a tidy, deterministic first guess
      const r = (PIN_R / 3) * Math.sqrt(n);
      return { p, place, cx, cy, x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
    });
    for (let step = 0; step < 300; step++) {
      for (let i = 0; i < pins.length; i++) {
        for (let j = i + 1; j < pins.length; j++) {
          const a = pins[i], b = pins[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const d = Math.hypot(dx, dy) || 0.01;
          const overlap = 2 * PIN_R + 0.6 / k - d;
          if (overlap > 0) {
            a.x -= (dx / d) * overlap / 2; a.y -= (dy / d) * overlap / 2;
            b.x += (dx / d) * overlap / 2; b.y += (dy / d) * overlap / 2;
          }
        }
      }
      pins.forEach((pin) => { pin.x += (pin.cx - pin.x) * 0.04; pin.y += (pin.cy - pin.y) * 0.04; });
    }
    pins.sort((a, b) => a.y - b.y); // lower pins drawn on top

    // place name to the left of its group of pins, level with the real spot
    const cities = Object.keys(perPlace).map((key) => {
      const group = pins.filter((pin) => pin.place.key === key);
      const { cx, cy, place } = group[0];
      return { name: place.label, cx, cy, labelY: cy, labelX: Math.min(cx, ...group.map((pin) => pin.x)) - PIN_R - 1.5 / k };
    });
    // labels close to each other: push the lower one down until they don't overlap
    const lineH = 5.6 / k;
    cities.sort((a, b) => a.cy - b.cy).forEach((c, i) => {
      for (let j = 0; j < i; j++) {
        const o = cities[j];
        const nameW = (n) => n.length * 2.6 / k; // rough text width
        const overlapX = c.labelX - nameW(c.name) < o.labelX && o.labelX - nameW(o.name) < c.labelX;
        if (overlapX && Math.abs(c.labelY - o.labelY) < lineH) c.labelY = o.labelY + lineH;
      }
    });
    const f = (v) => v.toFixed(3);

    // remember which zoom button had focus, so keyboard users keep their place
    const focused = document.activeElement && document.activeElement.dataset && document.activeElement.dataset.zoom;
    canvas.innerHTML = `
      <svg viewBox="${f(viewX)} ${f(viewY)} ${f(viewW)} ${f(viewH)}" role="group" aria-label="${esc(t.mapLabel)}">
        ${swedenPaths
          ? `<g class="map-land" stroke-width="${f(0.45 / k)}">${swedenPaths.map((d) => `<path d="${esc(d)}" />`).join("")}</g>`
          : `<image href="assets/img/sweden-map.svg" width="${SWEDEN_MAP.width}" height="${SWEDEN_MAP.height}" />`}
        <g class="map-leaders" aria-hidden="true" stroke-width="${f(0.35 / k)}">
          ${pins.map(({ x, y, cx, cy }) => `<line x1="${f(cx)}" y1="${f(cy)}" x2="${f(x)}" y2="${f(y)}" />`).join("")}
        </g>
        <g class="map-cities" aria-hidden="true">
          ${cities.map((c) => `<circle cx="${f(c.cx)}" cy="${f(c.cy)}" r="${f(1.1 / k)}" />`).join("")}
        </g>
        <g class="map-path" aria-hidden="true"></g>
        ${pins.map(({ p, x, y }) => `
        <g class="map-pin${p.current ? "" : " is-past"}${p.i === mapPinned ? " is-active" : ""}"
           transform="translate(${f(x)} ${f(y)}) scale(${f(1 / k)})" data-i="${p.i}"
           role="button" tabindex="0" aria-label="${esc(p.name)} — ${esc(t.stages[p.stage])} — ${esc(anchorOf(p).label)}">
          <g class="pin-body">
            <circle class="pin-bg" r="12" />
            <g transform="translate(-12 -12)">${PLANTS[p.stage]}</g>
          </g>
        </g>`).join("")}
        ${k > 1 ? `
        <g class="map-labels" aria-hidden="true" font-size="${f(4.6 / k)}" stroke-width="${f(1.2 / k)}">
          ${cities.map((c) => `<text x="${f(c.labelX)}" y="${f(c.labelY + 1.6 / k)}" text-anchor="end">${esc(c.name)}</text>`).join("")}
        </g>` : ""}
      </svg>
      <div class="map-zoom">
        <button type="button" data-zoom="in" aria-label="${esc(t.zoomIn)}" title="${esc(t.zoomIn)}"${k >= MAP_MAX_ZOOM ? " disabled" : ""}>+</button>
        <button type="button" data-zoom="out" aria-label="${esc(t.zoomOut)}" title="${esc(t.zoomOut)}"${k <= 1 ? " disabled" : ""}>&minus;</button>
        ${k > 1 ? `<button type="button" data-zoom="reset" class="map-zoom-reset">${esc(t.zoomReset)}</button>` : ""}
      </div>
      <p class="map-zoom-hint">${esc(t.zoomHint)}</p>`;
    const again = focused && canvas.querySelector(`[data-zoom="${focused}"]:not([disabled])`);
    if (again) again.focus();
    mapDrawn = { pins: Object.fromEntries(pins.map((pin) => [pin.p.i, [pin.x, pin.y]])), k, box: [viewX, viewY, viewW, viewH] };

    const count = (pred) => people.filter(pred).length;
    const filterBtn = (key, label, icon, n) => `
      <button type="button" class="map-filter" data-key="${key}" aria-pressed="${mapSelected.has(key)}">
        ${icon}<span>${esc(label)}</span><span class="map-count">${n}</span>
      </button>`;
    filters.setAttribute("aria-label", t.filterLabel);
    // one chip per university that has someone on the map, most people first
    const uniKeys = [...new Set(people.map(uniKeyOf))]
      .map((key) => ({ key, n: count((p) => uniKeyOf(p) === key) }))
      .sort((a, b) => b.n - a.n || (a.key === "uni:") - (b.key === "uni:") || a.key.localeCompare(b.key));
    const uniName = (key) => (key === "uni:" ? t.otherUniversity : UNIVERSITIES[key.slice(4)].name);
    filters.innerHTML = `
      <div class="map-filter-row">
        ${STAGES.map((s) => filterBtn(s, t.stages[s], plantIcon(s), count((p) => p.stage === s))).join("")}
      </div>
      <div class="map-filter-row map-filter-status">
        ${filterBtn("current", t.current, `<span class="map-dot"></span>`, count((p) => p.current))}
        ${filterBtn("past", t.past, `<span class="map-dot is-past"></span>`, count((p) => !p.current))}
      </div>
      <div class="map-filter-row">
        ${uniKeys.map(({ key, n }) => filterBtn(key, uniName(key), ICONS.university, n)).join("")}
      </div>
      ${mapSelected.size ? `<button type="button" class="map-show-all" data-clear>${esc(t.showAll)}</button>` : ""}`;

    showOnMap(mapPinned, lang);
  }

  // Fill the side panel with a person (or the hint when `i` is null).
  function showOnMap(i, lang = document.documentElement.lang) {
    const detail = document.getElementById("map-detail");
    if (!detail) return;
    drawMapPath(i, lang);
    // mouseover fires for every part of a pin, so skip redrawing the same card
    const key = `${i}|${lang}|${mapPinned}`;
    if (detail.dataset.shown === key) return;
    detail.dataset.shown = key;
    const person = i == null ? null : mapPeople().find((p) => p.i === i);
    detail.innerHTML = mapDetailHTML(person, lang, person && i === mapPinned);
  }

  /* --- a person's path, drawn on the map ---------------------------------- */
  // Initial compass bearing from one [lat, lon] to another (radians, 0 = north).
  function bearing([lat1, lon1], [lat2, lon2]) {
    const r = Math.PI / 180;
    const dLon = (lon2 - lon1) * r;
    return Math.atan2(
      Math.sin(dLon) * Math.cos(lat2 * r),
      Math.cos(lat1 * r) * Math.sin(lat2 * r) - Math.sin(lat1 * r) * Math.cos(lat2 * r) * Math.cos(dLon)
    );
  }

  // Groups a path (oldest first) into stops: one per run of steps in the same
  // Swedish city, and one per run of steps abroad.
  function pathStops(person) {
    const stops = [];
    (person.history || []).slice().reverse().forEach((step) => {
      const inSweden = step.country === "Sweden" && CITIES[step.city];
      const key = inSweden ? "se:" + step.city : "abroad";
      const last = stops[stops.length - 1];
      if (last && last.key === key) last.steps.push(step);
      else stops.push({ key, city: inSweden ? step.city : null, steps: [step] });
    });
    return stops;
  }

  function drawMapPath(i, lang) {
    const layer = document.querySelector("#member-map .map-path");
    if (!layer) return;
    const svg = layer.ownerSVGElement;
    const person = i == null ? null : mapPeople().find((p) => p.i === i);
    const pinXY = person && mapDrawn.pins[person.i];
    const show = !!(pinXY && (person.history || []).length);
    svg.classList.toggle("has-path", show);
    svg.querySelectorAll(".map-pin").forEach((g) => {
      const mine = show && Number(g.dataset.i) === i;
      g.classList.toggle("is-on-path", mine);
      if (mine) g.parentNode.insertBefore(g, svg.querySelector(".map-labels")); // above the other pins
    });
    layer.innerHTML = show ? mapPathSVG(person, pinXY, lang) : "";
  }

  function mapPathSVG(person, pinXY, lang) {
    const { k, box } = mapDrawn;
    const f = (v) => v.toFixed(3);
    const PIN_R = (12 * 0.42) / k;
    const MINI = PIN_R * 1.1; // size of the small plants for each step
    const ARROW = 26 / k;
    const out = [];

    const stops = pathStops(person);
    // where each stop in Sweden is drawn: on the person's own pin when it's
    // their city, otherwise on that city
    const pointOf = (stop) => (stop.city === person.city ? pinXY : projectCity(CITIES[stop.city]));
    const latLonOf = (stop) => CITIES[stop.city];
    const countriesOf = (stop) =>
      stop.steps.map((s) => s.country).filter((c, j, all) => c !== all[j - 1]);
    const countryName = (c) => (COUNTRIES[c] ? COUNTRIES[c].name[lang] : c);
    const minis = (steps, x, y, anchorRight) =>
      steps.map((s, j) => {
        const mx = anchorRight ? x + j * MINI : x - (steps.length - j) * MINI;
        return `<g class="map-path-plant" transform="translate(${f(mx)} ${f(y - MINI / 2)}) scale(${f(MINI / 24)})">
          <circle cx="12" cy="12" r="12" /><g>${PLANTS[s.stage] || ""}</g></g>`;
      }).join("");

    // arrow from/to a stop in Sweden, pointing along the bearing to a country
    const arrow = (stop, country, incoming, steps) => {
      const at = COUNTRIES[country] && COUNTRIES[country].at;
      if (!at) return "";
      const b = bearing(latLonOf(stop), at);
      const dx = Math.sin(b), dy = -Math.cos(b);
      const [sx, sy] = pointOf(stop);
      // keep the far end inside the visible map
      const [bx, by, bw, bh] = box;
      const pad = 4 / k;
      let len = ARROW;
      const fits = (l) => sx + dx * l > bx + pad && sx + dx * l < bx + bw - pad && sy + dy * l > by + pad && sy + dy * l < by + bh - pad;
      while (len > PIN_R * 2.5 && !fits(len)) len *= 0.85;
      const near = [sx + dx * PIN_R * 1.25, sy + dy * PIN_R * 1.25];
      const far = [sx + dx * len, sy + dy * len];
      const [from, to] = incoming ? [far, near] : [near, far];
      const ux = (to[0] - from[0]) / Math.hypot(to[0] - from[0], to[1] - from[1]);
      const uy = (to[1] - from[1]) / Math.hypot(to[0] - from[0], to[1] - from[1]);
      const h = 2.6 / k; // arrowhead size
      const head = [
        to,
        [to[0] - ux * h - uy * h * 0.6, to[1] - uy * h + ux * h * 0.6],
        [to[0] - ux * h + uy * h * 0.6, to[1] - uy * h - ux * h * 0.6],
      ];
      const right = dx >= 0;
      const label = countriesOf({ steps }).map(countryName).join(" → ");
      const tx = far[0] + (right ? 1.5 : -1.5) / k;
      return `
        <line class="map-path-line is-abroad" x1="${f(from[0])}" y1="${f(from[1])}" x2="${f(to[0])}" y2="${f(to[1])}" />
        <polygon class="map-path-head" points="${head.map((p) => f(p[0]) + "," + f(p[1])).join(" ")}" />
        <text class="map-path-label" x="${f(tx)}" y="${f(far[1] - 1.2 / k)}" text-anchor="${right ? "start" : "end"}">${esc((incoming ? "" : "→ ") + label)}</text>
        ${minis(steps, tx, far[1] + MINI * 0.9, right)}`;
    };

    stops.forEach((stop, n) => {
      if (stop.city) {
        // a line from the previous stop in Sweden
        const prev = stops[n - 1];
        if (prev && prev.city) {
          const [x1, y1] = pointOf(prev), [x2, y2] = pointOf(stop);
          out.push(`<line class="map-path-line" x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke-dasharray="${f(2 / k)} ${f(1.4 / k)}" />`);
        }
        // the steps here, as small plants; the person's latest step is the pin itself
        const [x, y] = pointOf(stop);
        const steps = stop.steps.filter((s) => s !== person.history[0]);
        if (steps.length) out.push(minis(steps, x + PIN_R * 1.2, y, true));
        return;
      }
      // abroad: where they came from (into the next stop in Sweden) and where
      // they went (out of the previous one)
      const before = stops[n - 1], after = stops[n + 1];
      const countries = countriesOf(stop);
      if (after && after.city) out.push(arrow(after, countries[countries.length - 1], true, stop.steps));
      if (before && before.city) out.push(arrow(before, countries[0], false, stop.steps));
    });
    return `<g stroke-width="${f(0.8 / k)}" font-size="${f(4.2 / k)}">${out.join("")}</g>`;
  }

  function initMemberMap() {
    fetch("assets/img/sweden-map.svg")
      .then((res) => (res.ok ? res.text() : Promise.reject(res.status)))
      .then((text) => {
        const svg = new DOMParser().parseFromString(text, "image/svg+xml");
        swedenPaths = Array.from(svg.querySelectorAll("path"), (path) => path.getAttribute("d") || "");
        renderMemberMap(document.documentElement.lang);
      })
      .catch(() => {}); // keep the picture version
    const canvas = document.getElementById("member-map");
    const filters = document.getElementById("map-filters");
    const detail = document.getElementById("map-detail");
    if (!canvas || !filters || !detail) return;
    const pinOf = (event) => event.target.closest && event.target.closest(".map-pin");
    const setActive = () =>
      canvas.querySelectorAll(".map-pin").forEach((g) => g.classList.toggle("is-active", Number(g.dataset.i) === mapPinned));

    const pin = (i) => {
      mapPinned = mapPinned === i ? null : i;
      setActive();
      showOnMap(mapPinned);
      // on narrow screens the panel sits below the map
      if (mapPinned != null && window.matchMedia("(max-width: 760px)").matches) {
        detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    };

    canvas.addEventListener("mouseover", (event) => {
      const g = pinOf(event);
      if (g) showOnMap(Number(g.dataset.i));
    });
    canvas.addEventListener("mouseleave", () => showOnMap(mapPinned));
    canvas.addEventListener("focusin", (event) => {
      const g = pinOf(event);
      if (g) showOnMap(Number(g.dataset.i));
    });
    const zoomTo = (k, x = mapView.x, y = mapView.y) => {
      mapView = { k: Math.min(Math.max(k, 1), MAP_MAX_ZOOM), x, y };
      if (mapView.k === 1) mapView = { k: 1, x: SWEDEN_MAP.width / 2, y: SWEDEN_MAP.height / 2 };
      renderMemberMap(document.documentElement.lang);
    };

    canvas.addEventListener("click", (event) => {
      const g = pinOf(event);
      if (g) return pin(Number(g.dataset.i));
      const btn = event.target.closest("[data-zoom]");
      if (btn) {
        const action = btn.dataset.zoom;
        if (action === "in") {
          // zoom in on the selected person, if there is one
          const person = mapPeople().find((p) => p.i === mapPinned);
          const [x, y] = person ? projectCity(anchorOf(person).at) : [mapView.x, mapView.y];
          return zoomTo(mapView.k * 2, x, y);
        }
        return zoomTo(action === "out" ? mapView.k / 2 : 1);
      }
      // a click on the map itself zooms in there (or just moves there, once fully zoomed in)
      const svg = event.target.closest("svg");
      if (!svg) return;
      const point = svg.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      const at = point.matrixTransform(svg.getScreenCTM().inverse());
      zoomTo(mapView.k * 2, at.x, at.y);
    });
    canvas.addEventListener("keydown", (event) => {
      const g = pinOf(event);
      if (g && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        pin(Number(g.dataset.i));
      }
    });
    detail.addEventListener("click", (event) => {
      if (event.target.closest(".map-close")) pin(mapPinned);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mapPinned != null) pin(mapPinned);
    });

    filters.addEventListener("click", (event) => {
      if (event.target.closest("[data-clear]")) {
        mapSelected.clear();
        renderMemberMap(document.documentElement.lang);
        return;
      }
      const btn = event.target.closest(".map-filter");
      if (!btn) return;
      const key = btn.dataset.key;
      if (mapSelected.has(key)) mapSelected.delete(key);
      else mapSelected.add(key);
      const person = mapPeople().find((p) => p.i === mapPinned);
      if (person && isHiddenOnMap(person)) mapPinned = null;
      renderMemberMap(document.documentElement.lang);
      // the chips are redrawn, so give keyboard users their place back
      const again = filters.querySelector(`.map-filter[data-key="${key}"]`);
      if (again && event.detail === 0) again.focus();
    });
  }

  /* --- render the Collaborations (partner cards) ------------------------ */
  // Same card as the Members roster, with the partner's logo instead of a photo.
  function renderPartners(lang) {
    const el = document.getElementById("partners-list");
    if (!el) return;
    if (!PARTNERS.length) {
      el.innerHTML = `<p class="empty-note">—</p>`;
      return;
    }
    const pick = (v) => (v && typeof v === "object" ? v[lang] : v);
    el.innerHTML = PARTNERS.map((p) => {
      const name = pick(p.name);
      const logo = p.logo
        ? `<img class="partner-logo" src="${safeUrl(p.logo)}" alt="" loading="lazy" />`
        : `<div class="member-avatar" aria-hidden="true">${esc(initialsOf(name))}</div>`;
      const nameHTML = p.link
        ? `<a href="${safeUrl(p.link)}" target="_blank" rel="noopener">${esc(name)}</a>`
        : esc(name);
      const contact = p.link
        ? `
          <p class="member-contact">
            <a href="${safeUrl(p.link)}" target="_blank" rel="noopener" class="member-contact-icon" aria-label="Website">${ICONS.webpage}</a>
          </p>`
        : "";
      return `
        <article class="member-card partner-card">
          <div class="member-head">
            ${logo}
            <div>
              <h3 class="member-name">${nameHTML}</h3>
              <p class="member-role">${esc(pick(p.place))}</p>
            </div>
          </div>
          <p class="member-field">${esc(pick(p.description))}</p>
          ${contact}
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
    el.innerHTML = RESOURCES.map((r) => resourceCardHTML(r, lang)).join("");
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
    renderMemberMap(lang);
    renderPartners(lang);
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

    initExploraTabs();
    initMemberMap();
    setLanguage(initialLang());
  }

  document.addEventListener("DOMContentLoaded", init);
})();
