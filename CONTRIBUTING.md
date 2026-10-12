# Contributing to the AICHIS website

*Español abajo · Svenska nedan*

This website is **open source** and we welcome contributions from the whole
community — you do **not** need to be a programmer to help. 🎉

There are two ways to contribute:

## 1. Report a problem or suggest something (easiest)

Open an issue — no coding needed:

- **[Report a problem](https://github.com/AICHIS-org/AICHIS-org.github.io/issues/new/choose)** — something looks wrong or doesn't work.
- **[Suggest content or a change](https://github.com/AICHIS-org/AICHIS-org.github.io/issues/new/choose)** — new text, a member, a resource, or an idea.

Just fill in the short form. That's it.

## 2. Propose the change yourself (Pull Request)

Almost all the content lives in **one file**:
[`assets/js/content.js`](assets/js/content.js). You can edit it right in your
browser:

1. Open [`assets/js/content.js`](assets/js/content.js) on GitHub.
2. Click the **pencil ✏️ (Edit)** button.
3. Make your change. Remember the site has **three languages** — please update
   `es` (Español), `en` (English) and `sv` (Svenska) so they stay in sync. If
   you can only do one language, that's fine — say so and we'll help with the rest.
4. Scroll down, describe your change, and choose **"Create a new branch and
   start a pull request"**.
5. Submit. A maintainer will review it.

> **Tip:** keep the quotes `" "` and commas `,` exactly as they are in the file.

More detail on the file structure is in the [README](README.md).

### What happens after you open a Pull Request

1. **Automatic checks run.** They confirm the page still works, that all three
   languages are filled in, and that the change is safe (see below). If a check
   fails, click **Details** next to it to read what to fix — or just ask, and
   we'll help.
2. **A maintainer reviews it.** Nothing reaches the live site without a
   maintainer reading it first.
3. **It is merged and published** automatically a minute or two later.

To keep visitors and the people listed here safe, a contribution should:

- use **plain text** in `content.js` — no HTML tags;
- use only `https://` links (or `mailto:` for email);
- not load scripts, fonts, embeds or trackers from other websites;
- only add someone's name, photo or contact details **with their consent**.

Found a security problem? Please report it privately — see
[SECURITY.md](SECURITY.md).

## Reviewing a pull request (maintainers)

Only maintainers can merge, and `main` only accepts changes through a pull
request whose checks pass. Before merging a contribution from someone else:

1. **Read the whole diff** ("Files changed"), not just the description.
2. **Open every new link** and confirm it goes where it says.
3. **Photos:** look at each new image, and check the person agreed to be listed.
4. **Be extra careful** when the change touches `index.html`,
   `assets/js/main.js`, `scripts/` or `.github/` — these control what runs in
   visitors' browsers and how the site is deployed. A content-only contribution
   should not need to touch them; ask why if it does.
5. **First-time contributors:** GitHub waits for you to click **Approve and
   run** before the checks start. Read the diff *before* approving, especially
   anything under `.github/`.
6. **Never check out and run a contributor's branch** with your own GitHub
   credentials just to "see if it works" — review it on GitHub, or preview it
   with `python3 -m http.server` only after reading the diff.

The automatic security check (`scripts/check-security.js`) blocks the common
problems — HTML in content, `javascript:` links, scripts or embeds from other
sites, unpinned or privileged workflows — but it complements review, it does
not replace it.

**Adding a new external service** (a new video host, a map, a font provider):
add it to the allow-list at the top of `scripts/check-security.js` *and* to the
`Content-Security-Policy` tag in `index.html`. Do this only for services you
trust; each one can see who visits the site.

**Updating a GitHub Action:** actions are pinned to a commit hash, with the
version in a comment. Dependabot opens a pull request when a new version is
out; merge it after checking the release notes.

---

## 🇪🇸 Cómo contribuir (resumen)

Este sitio es de **código abierto**. No necesitas saber programar.

- **Reportar un problema o sugerir algo:** abre un
  [issue](https://github.com/AICHIS-org/AICHIS-org.github.io/issues/new/choose)
  y completa el formulario.
- **Proponer el cambio tú mismo/a:** edita el archivo
  [`assets/js/content.js`](assets/js/content.js) desde el navegador (botón ✏️),
  actualiza los tres idiomas (`es`, `en`, `sv`) y crea un *Pull Request*.

## 🇸🇪 Hur du bidrar (sammanfattning)

Den här webbplatsen är **öppen källkod**. Du behöver inte kunna programmera.

- **Rapportera ett problem eller föreslå något:** öppna ett
  [issue](https://github.com/AICHIS-org/AICHIS-org.github.io/issues/new/choose)
  och fyll i formuläret.
- **Föreslå ändringen själv:** redigera filen
  [`assets/js/content.js`](assets/js/content.js) i webbläsaren (pennan ✏️),
  uppdatera alla tre språken (`es`, `en`, `sv`) och skapa en *Pull Request*.
