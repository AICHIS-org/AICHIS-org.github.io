# AICHIS — Website

Official website of **AICHIS** — *Asociación de Investigadores Chilenos en Suecia*
(Association of Chilean Researchers in Sweden).

Trilingual static site: **Español · English · Svenska**.

---

## 🌐 Live site

**https://aichis-org.github.io/** — deploys automatically on every push to `main`.

---

## ✏️ How to edit the content (the easy part)

**You only need to edit one file:** [`assets/js/content.js`](assets/js/content.js).

It is organised in plain language and contains everything you'll normally change:

| I want to…                    | Do this in `content.js`                                            |
| ----------------------------- | ------------------------------------------------------------------ |
| Change any text on the page   | Find the text and edit it — for **all three** languages (`es`, `en`, `sv`). |
| Add / edit a **person** (board and/or member) | Copy a `{ ... }` block in the `PROFILES` list and change the values — see below. |
| Add a **Chilean researcher in Sweden** | Copy a `{ ... }` block in the `RESEARCHERS` list and change the values. |
| Add an **Explora Nobel edition** | Copy a `{ ... }` block in the `EXPLORA_EDITIONS` list (`state: "done"` or `"upcoming"`). |
| Add / edit a **resource**     | Copy a `{ ... }` block in the `RESOURCES` list and change the values. |

Keep the quotes `" "` and commas `,` exactly as shown. That's it.

### People: the `PROFILES` list
Both the **Board** section and the **Members** section are drawn from the same
`PROFILES` list in `content.js` — one entry per person, so you never type
someone's name or photo twice. What section they show up in depends on which
of these two keys their entry has:

- `board: { role }` — shows the person in the **Board** section (`role` is the
  board position, e.g. President, Treasurer — reuse one of the existing
  `ROLES.xxx` constants or add a new one).
- `member: { role, field, institution, ... }` — shows the person in the
  **Members** section (`role` is their position/puesto, `field` their area of
  research, `institution` their affiliation). Use the `TBD` constant for
  `role`/`field` until the real details are confirmed.

A person can have `board`, `member`, or both — just omit whichever doesn't
apply (don't set it to `{}`).

`member` also accepts a few optional contact fields, shown as small icons on
their card — leave any of these out entirely if unknown (don't set them to
`""`):

| Field | Type | Notes |
| --- | --- | --- |
| `email` | plain string | e.g. `"jane@example.com"`. |
| `linkedin` | plain string URL | e.g. `"https://www.linkedin.com/in/jane-doe"`. |
| `webpage` | plain string URL | e.g. `"https://jane.example.com"`. |

### Changing the Explora Nobel documentary
The embedded video is in [`index.html`](index.html) — search for `youtube-nocookie`.
Replace the video id (`5yug9GZ8PjY`) with the new one from its YouTube URL.

### Adding a profile photo
Put the image in `assets/img/profiles/` — shared by everyone referenced
anywhere in `PROFILES` or `BOARD_HISTORY`, current or past, board or member —
named `firstname-lastname.ext`, and point to it, e.g.
`photo: "assets/img/profiles/jane-doe.jpg"`. Leave `photo: ""` to show the
person's initials instead.

---

## 🎨 Branding

- **Logo:** the header uses `assets/img/logo.png` (colour, on white). The footer
  uses `assets/img/logo-white.png`, a reversed white version for the dark
  background. If you replace the logo, update `logo.png` and regenerate the white
  version (any image editor: remove the background and make the wordmark white),
  keeping the file name `logo-white.png`.
- **Favicon:** `assets/img/favicon.svg` (the "A" monogram). Edit it and re-export
  `favicon-32.png` and `apple-touch-icon.png` if you change it.
- **Colours:** the palette (Chilean blue/red/white + Swedish yellow) is defined
  once at the top of [`assets/css/styles.css`](assets/css/styles.css) under
  `:root`. Change those variables to retheme the whole site.
- **Social links:** the YouTube / X / LinkedIn / Instagram / Facebook / TikTok /
  Bluesky URLs live in the `<footer>` of [`index.html`](index.html) (search for
  `class="social"`).

---

## 📁 Project structure

```
index.html                       Page structure (rarely needs editing)
assets/
  css/styles.css                 Styles + colour palette
  js/content.js                  ← ALL text, profiles and resources live here
  js/main.js                     Rendering + language switching (no need to edit)
  img/logo.png                   Logo (colour, on white — header)
  img/logo-white.png             Logo (white — footer, dark background)
  img/favicon.svg                Browser-tab icon
  img/aichis_members_embassy_2023.jpg   Members group photo (Members section banner)
  img/profiles/                  Individual profile photos, named firstname-lastname.ext
.nojekyll                        Tells GitHub Pages to serve files as-is
```

No build step, no dependencies — plain HTML/CSS/JS.

---

## 👀 Preview locally

Just open `index.html` in a browser. To avoid any browser file restrictions you
can instead run a tiny local server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## 🚀 Publishing (GitHub Pages)

The site is live at **https://aichis-org.github.io/** and deploys **automatically**
on every push to `main` via GitHub Actions (see
[`.github/workflows/pages.yml`](.github/workflows/pages.yml)). Merging a PR
into `main` is what triggers a deploy — see below for how changes get into
`main`.

The repo is named `AICHIS-org.github.io` (matching the organisation), which is
what makes the clean root URL work. Pages source is set to **GitHub Actions**
under Settings → Pages.

---

## 🔒 Branch protection

`main` is protected: **direct pushes are disabled for everyone, including
repo admins.** Every change — no matter how small — has to go through a pull
request. This applies even if you have write access; there is currently no
required review/approval count, so a PR can be merged as soon as it's open
(no waiting on someone else), but it still has to exist as a PR first.

There's also a [PR checks workflow](.github/workflows/pr-checks.yml) that
runs automatically on every PR — it syntax-checks the JS files and validates
`content.js` (via [`scripts/check-content.js`](scripts/check-content.js)) for
missing translations or broken photo paths. It currently runs for visibility
only and does **not** block merging yet — that's a deliberate choice while
the site is still under active/raw development, so a fix can go out quickly
even if the check is red. It's worth revisiting once things stabilise (see
Roadmap below).

Configured via: Settings → Branches → Branch protection rules → `main`.

---

## 📌 Roadmap / TODO

- [x] Add the board to the `PROFILES` list.
- [ ] Confirm real `role`/`field`/`institution` details for members still marked `TBD` in `PROFILES`.
- [ ] Add real people to the `RESEARCHERS` list (Chileans in Sweden).
- [ ] Add real resources to the `RESOURCES` list.
- [ ] Expand the About Us content as needed.
- [ ] Once things stabilise, make the PR checks workflow a **required** status
      check on `main` so a red check actually blocks merging.
