/* =========================================================================
   AICHIS — SITE CONTENT
   -------------------------------------------------------------------------
   This is the ONLY file you need to edit to change the website's text,
   members, or resources. No HTML/CSS knowledge required.

   HOW IT WORKS
   ------------
   Everything below is grouped by language: `es` (Español), `en` (English),
   `sv` (Svenska). Whatever you write for one language, write the equivalent
   for the other two so all versions stay in sync.

   - To change a piece of text  -> find it and edit the text between quotes.
   - To add a member            -> copy a { ... } block in the `members` list
                                    and change the values.
   - To add a resource          -> copy a { ... } block in the `resources`
                                    list and change the values.

   Tip: keep the quotes " " and commas , exactly as they are.
   ========================================================================= */

const CONTENT = {

  /* ================================ ESPAÑOL ============================== */
  es: {
    nav: {
      about: "Sobre nosotros",
      explora: "Explora Nobel",
      members: "Miembros",
      board: "Directiva",
      researchers: "Chilenos en Suecia",
      resources: "Recursos",
      contact: "Contacto",
    },
    hero: {
      title: "AICHIS",
      subtitle: "Asociación de Investigadores Chilenos en Suecia",
      cta: "Conócenos",
    },
    about: {
      title: "Sobre nosotros",
      lead: "Somos una comunidad de investigadoras e investigadores chilenos que viven y trabajan en Suecia. Nos une la ciencia, la colaboración y el deseo de tender puentes entre Chile y Suecia.",
      cards: [
        {
          title: "Nuestra misión",
          text: "Conectar y apoyar a la comunidad científica chilena en Suecia, fomentando la colaboración académica y el intercambio de conocimiento.",
        },
        {
          title: "Qué hacemos",
          text: "Organizamos encuentros, compartimos oportunidades y creamos redes entre investigadores de todas las disciplinas y etapas de carrera.",
        },
        {
          title: "Nuestra visión",
          text: "Ser un puente activo entre Chile y Suecia, impulsando la ciencia, la cultura y las oportunidades para las próximas generaciones.",
        },
      ],
    },
    explora: {
      title: "Explora Nobel",
      lead: "Nuestro proyecto insignia. Cada año llevamos a estudiantes de enseñanza media desde Chile a Suecia para vivir la Semana del Premio Nobel, acercándolos a la ciencia de primer nivel y a las personas que la hacen posible.",
      videoCaption: "Documental · Edición 2024",
    },
    members: {
      title: "Miembros",
      lead: "AICHIS está abierta a investigadoras e investigadores chilenos que viven y trabajan en Suecia. ¿Quieres sumarte? Postula a través de nuestro formulario.",
      cta: "Postula a socio/a",
      photoCaption: "Miembros de AICHIS junto al embajador de Chile en Suecia, Tucapel Jiménez, en la Embajada de Chile en Estocolmo, Suecia, 2023",
    },
    board: {
      title: "Directiva",
      lead: "Esta es la directiva de AICHIS para el período 2026.",
      historyTitle: "Directivas anteriores",
    },
    researchers: {
      title: "Chilenos en Suecia",
      lead: "Un directorio abierto de investigadoras e investigadores chilenos que trabajan en Suecia, más allá de nuestros miembros. ¿Conoces a alguien, o eres tú? Ayúdanos a ampliar esta lista.",
      cta: "Sugerir un/a investigador/a",
    },
    resources: {
      title: "Recursos",
      lead: "Enlaces y materiales útiles para investigadores chilenos en Suecia. Iremos ampliando esta sección.",
    },
    contact: {
      title: "Contacto",
      lead: "¿Quieres colaborar, sumarte o saber más? Escríbenos y te responderemos.",
    },
    footer: {
      tagline: "Asociación de Investigadores Chilenos en Suecia",
      contributeTitle: "Ciencia abierta",
      contributeText: "Este sitio es de código abierto. ¿Encontraste un error o quieres sugerir un cambio? Cuéntanoslo en GitHub, o si te animas, propón directamente la mejora.",
      reportIssue: "Reportar un problema",
      proposeChange: "Proponer un cambio (Pull Request)",
    },
  },

  /* ================================ ENGLISH ============================== */
  en: {
    nav: {
      about: "About us",
      explora: "Explora Nobel",
      members: "Members",
      board: "Board",
      researchers: "Chileans in Sweden",
      resources: "Resources",
      contact: "Contact",
    },
    hero: {
      title: "AICHIS",
      subtitle: "Association of Chilean Researchers in Sweden",
      cta: "Learn more",
    },
    about: {
      title: "About us",
      lead: "We are a community of Chilean researchers living and working in Sweden. We are united by science, collaboration, and a wish to build bridges between Chile and Sweden.",
      cards: [
        {
          title: "Our mission",
          text: "To connect and support the Chilean scientific community in Sweden, fostering academic collaboration and knowledge exchange.",
        },
        {
          title: "What we do",
          text: "We organise meetups, share opportunities, and build networks among researchers across all disciplines and career stages.",
        },
        {
          title: "Our vision",
          text: "To be an active bridge between Chile and Sweden, advancing science, culture, and opportunities for the next generations.",
        },
      ],
    },
    explora: {
      title: "Explora Nobel",
      lead: "Our flagship project. Every year we bring high-school students from Chile to Sweden to experience Nobel Prize Week, bringing them closer to world-class science and the people who make it happen.",
      videoCaption: "Documentary · 2024 edition",
    },
    members: {
      title: "Members",
      lead: "AICHIS is open to Chilean researchers living and working in Sweden. Want to join? Apply through our form.",
      cta: "Apply to become a member",
      photoCaption: "AICHIS members with the Chilean Ambassador to Sweden, Tucapel Jiménez, at the Chilean Embassy in Stockholm, Sweden, 2023",
    },
    board: {
      title: "Board",
      lead: "This is the AICHIS board for the 2026 term.",
      historyTitle: "Previous boards",
    },
    researchers: {
      title: "Chileans in Sweden",
      lead: "An open directory of Chilean researchers working in Sweden, beyond our members. Know someone, or is it you? Help us grow this list.",
      cta: "Suggest a researcher",
    },
    resources: {
      title: "Resources",
      lead: "Useful links and materials for Chilean researchers in Sweden. We will keep expanding this section.",
    },
    contact: {
      title: "Contact",
      lead: "Want to collaborate, join, or learn more? Write to us and we'll get back to you.",
    },
    footer: {
      tagline: "Association of Chilean Researchers in Sweden",
      contributeTitle: "Open science",
      contributeText: "This site is open source. Found something wrong or have a suggestion? Let us know on GitHub, or, if you like, propose the change yourself.",
      reportIssue: "Report an issue",
      proposeChange: "Propose a change (Pull Request)",
    },
  },

  /* ================================ SVENSKA ============================== */
  sv: {
    nav: {
      about: "Om oss",
      explora: "Explora Nobel",
      members: "Medlemmar",
      board: "Styrelse",
      researchers: "Chilenare i Sverige",
      resources: "Resurser",
      contact: "Kontakt",
    },
    hero: {
      title: "AICHIS",
      subtitle: "Föreningen för chilenska forskare i Sverige",
      cta: "Läs mer",
    },
    about: {
      title: "Om oss",
      lead: "Vi är en gemenskap av chilenska forskare som bor och arbetar i Sverige. Vi förenas av vetenskap, samarbete och en önskan att bygga broar mellan Chile och Sverige.",
      cards: [
        {
          title: "Vårt uppdrag",
          text: "Att koppla samman och stödja den chilenska forskargemenskapen i Sverige och främja akademiskt samarbete och kunskapsutbyte.",
        },
        {
          title: "Vad vi gör",
          text: "Vi anordnar träffar, delar möjligheter och bygger nätverk mellan forskare inom alla discipliner och karriärsteg.",
        },
        {
          title: "Vår vision",
          text: "Att vara en aktiv bro mellan Chile och Sverige som främjar vetenskap, kultur och möjligheter för kommande generationer.",
        },
      ],
    },
    explora: {
      title: "Explora Nobel",
      lead: "Vårt flaggskeppsprojekt. Varje år tar vi med gymnasieelever från Chile till Sverige för att uppleva Nobelveckan och komma närmare vetenskap i världsklass och de människor som gör den möjlig.",
      videoCaption: "Dokumentär · 2024 års upplaga",
    },
    members: {
      title: "Medlemmar",
      lead: "AICHIS är öppen för chilenska forskare som bor och arbetar i Sverige. Vill du gå med? Ansök via vårt formulär.",
      cta: "Ansök om medlemskap",
      photoCaption: "AICHIS-medlemmar med Chiles ambassadör i Sverige, Tucapel Jiménez, på Chiles ambassad i Stockholm, Sverige, 2023",
    },
    board: {
      title: "Styrelse",
      lead: "Detta är AICHIS styrelse för perioden 2026.",
      historyTitle: "Tidigare styrelser",
    },
    researchers: {
      title: "Chilenare i Sverige",
      lead: "En öppen katalog över chilenska forskare som arbetar i Sverige, utöver våra medlemmar. Känner du någon, eller är det du? Hjälp oss att utöka listan.",
      cta: "Föreslå en forskare",
    },
    resources: {
      title: "Resurser",
      lead: "Användbara länkar och material för chilenska forskare i Sverige. Vi fortsätter att utöka denna sektion.",
    },
    contact: {
      title: "Kontakt",
      lead: "Vill du samarbeta, gå med eller veta mer? Skriv till oss så återkommer vi.",
    },
    footer: {
      tagline: "Föreningen för chilenska forskare i Sverige",
      contributeTitle: "Öppen vetenskap",
      contributeText: "Den här webbplatsen är öppen källkod. Hittade du ett fel eller har ett förslag? Berätta för oss på GitHub, eller föreslå gärna ändringen själv.",
      reportIssue: "Rapportera ett problem",
      proposeChange: "Föreslå en ändring (Pull Request)",
    },
  },

};

/* =========================================================================
   EXPLORA NOBEL — EDITIONS
   -------------------------------------------------------------------------
   One entry per year. `state` is either "done" (already happened) or
   "upcoming" (in preparation) — it only changes the colour of the marker.
   `label` is shown under the year and can be translated. `link` is optional.
   ========================================================================= */

const EXPLORA_EDITIONS = [
  {
    year: "2024",
    label: { es: "Primera edición · ver documental", en: "First edition · watch the documentary", sv: "Första upplagan · se dokumentären" },
    state: "done",
    link: "https://www.youtube.com/watch?v=5yug9GZ8PjY",
  },
  {
    year: "2025",
    label: { es: "Segunda edición realizada", en: "Second edition completed", sv: "Andra upplagan genomförd" },
    state: "done",
    link: "",
  },
  {
    year: "2026",
    label: { es: "En preparación", en: "In preparation", sv: "Under förberedelse" },
    state: "upcoming",
    link: "",
  },
];

/* =========================================================================
   PROFILES  (people behind AICHIS)
   -------------------------------------------------------------------------
   One entry per person — `name`, `photo` and `link` are the same in every
   language and shown wherever that person appears. `photo` is optional —
   leave "" to show initials instead.

   What sections a person shows up in depends on which of these two extra
   keys they have:

   - `board`  { role }                       -> shows in the Board section.
   - `member` { role, field, institution,    -> shows in the Members section.
                email, linkedin, webpage }

   A person can have one, the other, or both (e.g. a board member who is
   also a paying member). Omit whichever doesn't apply — don't set it to {}.
   `role`/`field` are translated per language; reuse `ROLES.xxx` for board
   roles and `TBD` for member details that aren't confirmed yet.

   Inside `member`, only `role`, `field` and `institution` are required —
   `email`, `linkedin` and `webpage` are optional and shown as icons on the
   member's card. Leave any of these out entirely if unknown — don't set
   them to "".

   To add someone, copy one { ... } block below and edit the values.
   ========================================================================= */

const ROLES = {
  president: { es: "Presidenta", en: "President", sv: "Ordförande" },
  presidentM: { es: "Presidente", en: "President", sv: "Ordförande" },
  vicePresident: { es: "Vicepresidente", en: "Vice President", sv: "Vice ordförande" },
  secretary: { es: "Secretario", en: "Secretary", sv: "Sekreterare" },
  secretaryF: { es: "Secretaria", en: "Secretary", sv: "Sekreterare" },
  communications: { es: "Encargado de comunicaciones", en: "Communications Officer", sv: "Kommunikationsansvarig" },
  communicationsDirectorM: { es: "Director de Comunicaciones", en: "Communications Director", sv: "Kommunikationsdirektör" },
  communicationsDirectorF: { es: "Directora de Comunicaciones", en: "Communications Director", sv: "Kommunikationsdirektör" },
  treasurer: { es: "Tesorero", en: "Treasurer", sv: "Kassör" },
  treasurerF: { es: "Tesorera", en: "Treasurer", sv: "Kassör" },
  boardMember: { es: "Miembro titular", en: "Board Member", sv: "Styrelseledamot" },
  deputy: { es: "Miembro suplente", en: "Deputy Member", sv: "Suppleant" },
};

const TBD = { es: "Por confirmar", en: "To be confirmed", sv: "Att bekräftas" };

const PROFILES = [
  {
    name: "Carolina Oses",
    photo: "assets/img/profiles/carolina-oses.jpeg",
    link: "",
    board: { role: ROLES.president },
    member: {
      role: {
        es: "Investigadora, Gerente de Laboratorio, Coordinadora de Proyectos",
        en: "Researcher, Lab Manager, Project Coordinator",
        sv: "Forskare, Laboratoriechef, Projektsamordnare",
      },
      field: {
        es: "Proteómica Espacial y Multiómica",
        en: "Spatial Proteomics, and Multiomics",
        sv: "Spatial proteomik och multiomik",
      },
      institution: "KTH Royal Institute of Technology",
      email: "cdoses@gmail.com",
      linkedin: "https://www.linkedin.com/in/oses-carolina/",
      webpage: "https://www.linkedin.com/in/oses-carolina/",
    },
  },
  {
    name: "Rodrigo Morales Castro",
    photo: "assets/img/profiles/rodrigo-morales.jpeg",
    link: "",
    board: { role: ROLES.treasurer },
    member: {
      role: { es: "Investigador", en: "Researcher", sv: "Forskare" },
      field: {
        es: "Inmunología, Biología Celular",
        en: "Immunology, Cell Biology",
        sv: "Immunologi, Cellbiologi",
      },
      institution: "Karolinska Institutet",
      email: "rodrigo.morales@ki.se",
    },
  },
  {
    name: "Markos Saravia",
    photo: "",
    link: "",
    board: { role: ROLES.boardMember },
    member: { role: TBD, field: TBD, institution: "" },
  },
  {
    name: "Giorgio Giusti",
    photo: "assets/img/profiles/giorgio-giusti.jpeg",
    link: "",
    board: { role: ROLES.boardMember },
    member: { role: TBD, field: TBD, institution: "" },
  },
  {
    name: "Sofía Bobadilla",
    photo: "assets/img/profiles/sofia-bobadilla.jpg",
    link: "",
    board: { role: ROLES.boardMember },
    member: {
      role: { es: "Estudiante de doctorado", en: "PhD Student", sv: "Doktorand" },
      field: { es: "Investigación en Ingeniería de Software", en: "Software Engineering Research", sv: "Forskning inom mjukvaruteknik" },
      institution: "KTH Royal Institute of Technology",
      email: "sofbob@kth.se",
      linkedin: "https://www.linkedin.com/in/sofia-bobadilla-44462a21a",
      webpage: "https://sofiabobadilla.github.io/",
    },
  },
  {
    name: "Gustavo Monasterio",
    photo: "assets/img/profiles/gustavo-monasterio.jpeg",
    link: "",
    board: { role: ROLES.deputy },
    member: {
      role: {
        es: "Profesor Asistente/Investigador Principal",
        en: "Assistant Professor/Principal Investigator",
        sv: "Biträdande professor/Huvudforskare",
      },
      field: {
        es: "Inmunología mucosal y biología de glándulas exocrinas",
        en: "Mucosal Immunology and Exocrine Gland Biology",
        sv: "Mukosal immunologi och exokrin körtelbiologi",
      },
      institution: "Department of Medicine, Solna, Karolinska Institutet",
    },
  },
  {
    name: "Ignacio Verdugo",
    photo: "assets/img/profiles/ignacio-verdugo.jpeg",
    link: "",
    board: { role: ROLES.deputy },
    member: {
      role: { es: "Estudiante de doctorado", en: "PhD Student", sv: "Doktorand" },
      field: { es: "Física Médica", en: "Medical Physics", sv: "Medicinsk fysik" },
      institution: "Stockholm University - Karolinska Institutet",
      email: "ignacio.verdugo@fysik.su.se",
      linkedin: "https://www.linkedin.com/in/ignacio-verdugo-naranjo/",
      webpage: "https://www.su.se/profiles/i/igve9547",
    },
  },
  {
    name: "Eduardo A. Sagredo",
    photo: "assets/img/profiles/eduardo-sagredo.jpeg",
    link: "",
    member: {
      role: { es: "Líder de Grupo (PhD)", en: "Group Leader (PhD)", sv: "Gruppledare (PhD)" },
      field: { es: "Biología del ARN", en: "RNA Biology", sv: "RNA-biologi" },
      institution: "Stockholm University",
    },
  },
  // --- copy a block above to add another profile ---
];

/* =========================================================================
   BOARD HISTORY  (previous directivas)
   -------------------------------------------------------------------------
   `PROFILES` above only holds the *current* (2026) board — this list is for
   past years, shown under "Previous boards". One entry per year; `members`
   is a plain array of { name, role, photo } — `role` is translated per
   language (reuse `ROLES.xxx` or write a new `{ es, en, sv }` object).
   `photo` is optional — leave "" to show initials.
   Leave `members` empty (`[]`) until you have the real roster for that year.
   ========================================================================= */

const BOARD_HISTORY = [
  {
    year: 2025,
    members: [
      { name: "Eduardo A. Sagredo",    role: ROLES.presidentM,     photo: "assets/img/profiles/eduardo-sagredo.jpeg" },
      { name: "Gustavo Monasterio", role: ROLES.vicePresident,  photo: "assets/img/profiles/gustavo-monasterio.jpeg" },
      { name: "Rodrigo Morales",    role: ROLES.treasurer,      photo: "assets/img/profiles/rodrigo-morales.jpeg" },
      { name: "Markos Saravia",     role: ROLES.secretary,      photo: "" },
      { name: "Ignacio Verdugo",    role: ROLES.communications, photo: "assets/img/profiles/ignacio-verdugo.jpeg" },
    ],
  },
  {
    year: 2024,
    members: [
      { name: "Eduardo A. Sagredo",       role: ROLES.presidentM,               photo: "assets/img/profiles/eduardo-sagredo.jpeg" },
      { name: "Gustavo Monasterio",    role: ROLES.vicePresident,            photo: "assets/img/profiles/gustavo-monasterio.jpeg" },
      { name: "Rodrigo Morales",       role: ROLES.treasurer,                photo: "assets/img/profiles/rodrigo-morales.jpeg" },
      { name: "Aristides Progulakis",  role: ROLES.communicationsDirectorM,  photo: "" },
      { name: "Maria Jose Pino",       role: ROLES.secretaryF,               photo: "" },
    ],
  },
  {
    year: 2023,
    members: [
      { name: "Gustavo Monasterio",  role: ROLES.presidentM,               photo: "assets/img/profiles/gustavo-monasterio.jpeg" },
      { name: "Eduardo A. Sagredo",     role: ROLES.vicePresident,            photo: "assets/img/profiles/eduardo-sagredo.jpeg" },
      { name: "Macarena Carrasco",   role: ROLES.treasurerF,               photo: "" },
      { name: "Carolina Mendez",     role: ROLES.communicationsDirectorF,  photo: "" },
      { name: "Rodrigo Morales",     role: ROLES.secretary,                photo: "assets/img/profiles/rodrigo-morales.jpeg" },
    ],
  },
];

/* =========================================================================
   CHILEANS IN SWEDEN  (broader directory, beyond AICHIS members)
   -------------------------------------------------------------------------
   Chilean researchers working in Sweden who are not necessarily AICHIS
   members. `field` (research area) and can be translated per language.
   To add someone, copy one { ... } block and edit the values.
   ========================================================================= */

const RESEARCHERS = [
  {
    name: "Nombre Apellido",
    field: { es: "Área de investigación", en: "Research area", sv: "Forskningsområde" },
    affiliation: "Universidad / University",
    link: "", // e.g. "https://..." (personal or institutional profile)
  },
  // --- copy the block above to add another researcher ---
];

/* =========================================================================
   RESOURCES
   -------------------------------------------------------------------------
   Each resource has a title, a short description and a link.
   Titles and descriptions can be translated per language.
   To add a resource, copy one { ... } block and edit the values.
   ========================================================================= */

const RESOURCES = [
  {
    title: {
      es: "Postula a socio/a",
      en: "Apply to become a member",
      sv: "Ansök om medlemskap",
    },
    description: {
      es: "Completa el formulario para unirte a AICHIS.",
      en: "Fill in the form to join AICHIS.",
      sv: "Fyll i formuläret för att gå med i AICHIS.",
    },
    link: "https://docs.google.com/forms/d/e/1FAIpQLScxO0kY5NXIgE2tnDj89NMqDgbERNBkMglJiaVMCAWDYrog8w/viewform",
  },
  // --- copy the block above to add another resource ---
];
