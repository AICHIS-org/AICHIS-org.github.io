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
      events: "Eventos",
      explora: "Explora Nobel",
      members: "Miembros",
      board: "Directiva",
      researchers: "Chilenos en Suecia",
      collaborations: "Colaboraciones",
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
    events: {
      title: "Eventos",
      lead: "Encuentros, charlas y actividades de la comunidad. Inscríbete directamente en el calendario.",
      cta: "Ver todos los eventos en Luma",
    },
    explora: {
      title: "Explora Nobel",
      lead: "Nuestro proyecto insignia. Desde 2024, cada año llevamos a estudiantes de enseñanza media desde Chile a Suecia para vivir la Semana del Premio Nobel, acercándolos a la ciencia de primer nivel y a las personas que la hacen posible.",
      // Estado de la edición en curso — actualizar cuando haya novedades.
      statusLabel: "Edición 2026 · Ganadoras anunciadas",
      status: "Catalina Álvarez Chiguay, de la Región de Aysén, y Millaray Orrego Muñoz, de la Región de Atacama, son las ganadoras de Explora Nobel 2026. Viajarán a Suecia la semana del 7 de diciembre de 2026 para vivir la Semana Nobel, visitar laboratorios y universidades, y reunirse con la comunidad científica chilena en Suecia.",
      videoCaption: "Anuncio de las ganadoras · Edición 2026",
      editionsLabel: "Recursos por edición",
      noResources: "Aún no hay recursos para esta edición.",
    },
    members: {
      title: "Miembros",
      lead: "AICHIS está abierta a investigadoras e investigadores chilenos que viven y trabajan en Suecia. ¿Quieres sumarte? Postula a través de nuestro formulario.",
      cta: "Postula a socio/a",
      updateCta: "¿Ya eres socio/a? Actualiza o agrega tu perfil",
      photoCaption: "Miembros de AICHIS junto al embajador de Chile en Suecia, Tucapel Jiménez, en la Embajada de Chile en Estocolmo, Suecia, 2023",
    },
    board: {
      title: "Directiva",
      lead: "Esta es la directiva de AICHIS para el período 2026.",
      historyTitle: "Directivas anteriores",
    },
    researchers: {
      title: "Chilenos en Suecia",
      lead: "Dónde están, y dónde han estado, los miembros de AICHIS a lo largo de Suecia. Cada planta es una etapa de la carrera: pasa el cursor o toca una para ver la trayectoria de esa persona.",
      cta: "¿Eres o fuiste miembro? Agrega tu trayectoria",
      mapLabel: "Mapa de Suecia con los miembros de AICHIS",
      hint: "Pasa el cursor o toca una planta para ver su trayectoria.",
      filterLabel: "Filtrar el mapa",
      current: "Actuales",
      past: "Anteriores",
      currentBadge: "Miembro actual",
      pastBadge: "Ex miembro",
      aichisTitle: "En AICHIS",
      historyTitle: "Trayectoria",
      noHistory: "Pronto agregaremos su trayectoria.",
      close: "Cerrar",
      stages: {
        student: "Licenciatura o magíster",
        phd: "Doctorado",
        postdoc: "Postdoctorado",
        pi: "Profesor/a o investigador/a principal",
      },
    },
    collaborations: {
      title: "Colaboraciones",
      lead: "Instituciones de confianza con las que trabajamos para acercar la ciencia de Chile y Suecia.",
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
      events: "Events",
      explora: "Explora Nobel",
      members: "Members",
      board: "Board",
      researchers: "Chileans in Sweden",
      collaborations: "Collaborations",
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
    events: {
      title: "Events",
      lead: "Meetups, talks and community activities. Sign up directly from the calendar.",
      cta: "See all events on Luma",
    },
    explora: {
      title: "Explora Nobel",
      lead: "Our flagship project. Every year since 2024 we have brought high-school students from Chile to Sweden to experience Nobel Prize Week, bringing them closer to world-class science and the people who make it happen.",
      videoCaption: "Winners announcement · 2026 edition (in Spanish)",
      // Status of the edition under way — update when there is news.
      statusLabel: "2026 edition · Winners announced",
      status: "Catalina Álvarez Chiguay, from the Aysén Region, and Millaray Orrego Muñoz, from the Atacama Region, are the winners of Explora Nobel 2026. They will travel to Sweden in the week of 7 December 2026 to experience Nobel Week, visit laboratories and universities, and meet the Chilean scientific community in Sweden.",
      editionsLabel: "Resources by edition",
      noResources: "No resources for this edition yet.",
    },
    members: {
      title: "Members",
      lead: "AICHIS is open to Chilean researchers living and working in Sweden. Want to join? Apply through our form.",
      cta: "Apply to become a member",
      updateCta: "Already a member? Update or add your profile",
      photoCaption: "AICHIS members with the Chilean Ambassador to Sweden, Tucapel Jiménez, at the Chilean Embassy in Stockholm, Sweden, 2023",
    },
    board: {
      title: "Board",
      lead: "This is the AICHIS board for the 2026 term.",
      historyTitle: "Previous boards",
    },
    researchers: {
      title: "Chileans in Sweden",
      lead: "Where AICHIS members are, and have been, across Sweden. Each plant is a career stage: hover over or tap one to see that person's path.",
      cta: "Current or former member? Add your path",
      mapLabel: "Map of Sweden showing AICHIS members",
      hint: "Hover over or tap a plant to see their path.",
      filterLabel: "Filter the map",
      current: "Current",
      past: "Former",
      currentBadge: "Current member",
      pastBadge: "Former member",
      aichisTitle: "At AICHIS",
      historyTitle: "Path",
      noHistory: "Their path will be added soon.",
      close: "Close",
      stages: {
        student: "Bachelor's or master's",
        phd: "PhD",
        postdoc: "Postdoc",
        pi: "Professor or principal investigator",
      },
    },
    collaborations: {
      title: "Collaborations",
      lead: "Trusted institutions we work with to bring science in Chile and Sweden closer together.",
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
      events: "Evenemang",
      explora: "Explora Nobel",
      members: "Medlemmar",
      board: "Styrelse",
      researchers: "Chilenare i Sverige",
      collaborations: "Samarbeten",
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
    events: {
      title: "Evenemang",
      lead: "Träffar, föredrag och aktiviteter för gemenskapen. Anmäl dig direkt i kalendern.",
      cta: "Se alla evenemang på Luma",
    },
    explora: {
      title: "Explora Nobel",
      lead: "Vårt flaggskeppsprojekt. Varje år sedan 2024 tar vi med gymnasieelever från Chile till Sverige för att uppleva Nobelveckan och komma närmare vetenskap i världsklass och de människor som gör den möjlig.",
      videoCaption: "Vinnarna presenteras · 2026 års upplaga (på spanska)",
      // Status för den pågående upplagan — uppdatera när det finns nyheter.
      statusLabel: "2026 års upplaga · Vinnarna utsedda",
      status: "Catalina Álvarez Chiguay, från regionen Aysén, och Millaray Orrego Muñoz, från regionen Atacama, är vinnarna av Explora Nobel 2026. De reser till Sverige veckan som börjar den 7 december 2026 för att uppleva Nobelveckan, besöka laboratorier och universitet och träffa det chilenska forskarsamhället i Sverige.",
      editionsLabel: "Resurser per upplaga",
      noResources: "Inga resurser för den här upplagan ännu.",
    },
    members: {
      title: "Medlemmar",
      lead: "AICHIS är öppen för chilenska forskare som bor och arbetar i Sverige. Vill du gå med? Ansök via vårt formulär.",
      cta: "Ansök om medlemskap",
      updateCta: "Redan medlem? Uppdatera eller lägg till din profil",
      photoCaption: "AICHIS-medlemmar med Chiles ambassadör i Sverige, Tucapel Jiménez, på Chiles ambassad i Stockholm, Sverige, 2023",
    },
    board: {
      title: "Styrelse",
      lead: "Detta är AICHIS styrelse för perioden 2026.",
      historyTitle: "Tidigare styrelser",
    },
    researchers: {
      title: "Chilenare i Sverige",
      lead: "Var AICHIS medlemmar finns, och har funnits, i Sverige. Varje växt är ett karriärsteg: håll muspekaren över eller tryck på en för att se personens väg.",
      cta: "Nuvarande eller tidigare medlem? Lägg till din väg",
      mapLabel: "Karta över Sverige med AICHIS medlemmar",
      hint: "Håll muspekaren över eller tryck på en växt för att se personens väg.",
      filterLabel: "Filtrera kartan",
      current: "Nuvarande",
      past: "Tidigare",
      currentBadge: "Nuvarande medlem",
      pastBadge: "Tidigare medlem",
      aichisTitle: "I AICHIS",
      historyTitle: "Väg",
      noHistory: "Personens väg läggs till snart.",
      close: "Stäng",
      stages: {
        student: "Kandidat eller master",
        phd: "Doktorand",
        postdoc: "Postdoktor",
        pi: "Professor eller huvudforskare",
      },
    },
    collaborations: {
      title: "Samarbeten",
      lead: "Betrodda institutioner som vi samarbetar med för att föra vetenskapen i Chile och Sverige närmare varandra.",
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
   One entry per year; each year is shown as a tab in the Explora Nobel
   section. `state` is either "done" (already happened) or "upcoming" (in
   preparation) — it only changes the colour of the marker. `label` is shown
   under the year and can be translated.

   `resources` is that year's timeline: the videos, press articles, photo
   albums... shown when its tab is open, newest first.
   Leave it as [] if there is nothing yet. Each resource has:

   - `date`         when it was published, written "YYYY-MM-DD". It is not
                    shown on the page; it only decides the order.
   - `title`        translated per language.
   - `description`  one short line, translated per language.
   - `link`         where it leads.
   - `image`        optional preview picture, saved in assets/img/explora/
                    (landscape, about 480x360). Leave it out to show none.

   To add a resource, copy one { date, title, ... } block inside the year it
   belongs to. To add a year, copy a whole edition block.
   ========================================================================= */

const EXPLORA_EDITIONS = [
  {
    year: "2024",
    label: { es: "Primera edición", en: "First edition", sv: "Första upplagan" },
    state: "done",
    resources: [
      {
        date: "2025-09-10",
        title: {
          es: "Documental Explora Nobel 2024 — De Chile a Suecia",
          en: "Explora Nobel 2024 documentary — From Chile to Sweden",
          sv: "Dokumentären Explora Nobel 2024 — Från Chile till Sverige",
        },
        description: {
          es: "Documental · El viaje de la primera edición, en YouTube.",
          en: "Documentary · The journey of the first edition, on YouTube (in Spanish).",
          sv: "Dokumentär · Den första upplagans resa, på YouTube (på spanska).",
        },
        link: "https://www.youtube.com/watch?v=5yug9GZ8PjY",
        image: "assets/img/explora/2024-documentary.jpg",
      },
    ],
  },
  {
    year: "2025",
    label: { es: "Segunda edición realizada", en: "Second edition completed", sv: "Andra upplagan genomförd" },
    state: "done",
    resources: [
      {
        date: "2025-10-26",
        title: {
          es: "Entrevista en Radio Cooperativa · Parte 1",
          en: "Radio Cooperativa interview · Part 1",
          sv: "Intervju i Radio Cooperativa · Del 1",
        },
        description: {
          es: "Video corto · Presentación del proyecto Explora Nobel 2025 con Gustavo Monasterio.",
          en: "Short video · Introducing Explora Nobel 2025 with Gustavo Monasterio (in Spanish).",
          sv: "Kort video · Presentation av Explora Nobel 2025 med Gustavo Monasterio (på spanska).",
        },
        link: "https://www.youtube.com/shorts/sDMc_3L6ScU",
        image: "assets/img/explora/2025-radio-cooperativa-1.jpg",
      },
      {
        date: "2025-10-28",
        title: {
          es: "Entrevista en Radio Cooperativa · Parte 2",
          en: "Radio Cooperativa interview · Part 2",
          sv: "Intervju i Radio Cooperativa · Del 2",
        },
        description: {
          es: "Video corto · Cómo nació la idea de Explora Nobel.",
          en: "Short video · How the idea for Explora Nobel was born (in Spanish).",
          sv: "Kort video · Hur idén till Explora Nobel föddes (på spanska).",
        },
        link: "https://www.youtube.com/shorts/cLHX5zCPcTc",
        image: "assets/img/explora/2025-radio-cooperativa-2.jpg",
      },
      {
        date: "2026-01-06",
        title: {
          es: "Explora Nobel 2025 | Ciencia chilena en la Semana Nobel",
          en: "Explora Nobel 2025 | Chilean science at Nobel Week",
          sv: "Explora Nobel 2025 | Chilensk vetenskap under Nobelveckan",
        },
        description: {
          es: "Video corto · Millaray y Alejandro en la Semana Nobel en Estocolmo.",
          en: "Short video · Millaray and Alejandro at Nobel Week in Stockholm.",
          sv: "Kort video · Millaray och Alejandro under Nobelveckan i Stockholm.",
        },
        link: "https://www.youtube.com/shorts/i1ya6VBoLyE",
        image: "assets/img/explora/2025-nobel-week-short.jpg",
      },
    ],
  },
  {
    year: "2026",
    label: { es: "Ganadoras anunciadas", en: "Winners announced", sv: "Vinnarna utsedda" },
    state: "upcoming",
    resources: [
      {
        date: "2026-10-09",
        title: {
          es: "Estudiantes de Aysén y Atacama viajarán a Suecia a vivir la Semana Nobel junto a científicos chilenos",
          en: "Students from Aysén and Atacama will travel to Sweden for Nobel Week alongside Chilean scientists",
          sv: "Elever från Aysén och Atacama reser till Sverige för att uppleva Nobelveckan med chilenska forskare",
        },
        description: {
          es: "Prensa · Cooperativa Ciencia.",
          en: "Press · Cooperativa Ciencia (article in Spanish).",
          sv: "Press · Cooperativa Ciencia (artikel på spanska).",
        },
        link: "https://www.cooperativaciencia.cl/tendencias/2026/10/09/estudiantes-de-aysen-y-atacama-viajaran-a-suecia-a-vivir-la-semana-nobel-junto-a-cientificos-chilenos/",
        image: "assets/img/explora/2026-cooperativa-ciencia.jpg",
      },
      {
        date: "2026-10-12",
        title: {
          es: "Anunciamos a las ganadoras de Explora Nobel 2026 desde Estocolmo",
          en: "Announcing the Explora Nobel 2026 winners from Stockholm",
          sv: "Vi presenterar vinnarna av Explora Nobel 2026 från Stockholm",
        },
        description: {
          es: "Video corto · Anuncio en la Embajada de Chile en Suecia.",
          en: "Short video · Announcement at the Chilean Embassy in Sweden (in Spanish).",
          sv: "Kort video · Tillkännagivande på Chiles ambassad i Sverige (på spanska).",
        },
        link: "https://www.youtube.com/shorts/xxMEhad29S4",
        image: "assets/img/explora/2026-winners-announcement.jpg",
      },
    ],
  },
];

/* =========================================================================
   PROFILES  (people behind AICHIS)
   -------------------------------------------------------------------------
   One entry per person — `name`, `photo` and `link` are the same in every
   language and shown wherever that person appears. `photo` is optional —
   leave "" to show initials instead.

   Members and Board are both sorted by last name. That's guessed from
   `name` (last word, e.g. "Castro" in "Rodrigo Morales Castro") — which is
   wrong whenever someone's first (paternal) surname should be used instead,
   as is customary in Chile. Add `lastName: "Morales"` to fix it for that
   person; leave it out otherwise.

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
    lastName: "Morales",
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
    name: "Markos Saravia Ramirez",
    lastName: "Saravia",
    photo: "",
    link: "",
    board: { role: ROLES.boardMember },
    member: {
      role: { es: "Estudiante de magíster", en: "Master's Student", sv: "Masterstudent" },
      field: {
        es: "Educación Comparada e Internacional",
        en: "Comparative and International Education",
        sv: "Jämförande och internationell pedagogik",
      },
      institution: "Stockholm University",
      email: "Ramirez.diego75@gmail.com",
    },
  },
  {
    name: "Giorgio Giusti",
    photo: "assets/img/profiles/giorgio-giusti.jpeg",
    link: "",
    board: { role: ROLES.boardMember },
    member: {
      role: {
        es: "Investigador independiente, artista y archivista",
        en: "Independent Researcher, Artist and Archivist",
        sv: "Oberoende forskare, konstnär och arkivarie",
      },
      field: { es: "Arte / Información", en: "Art / Information", sv: "Konst / Information" },
      institution: "Independent",
      email: "giorgio.giusti@gmail.com",
      linkedin: "https://www.linkedin.com/in/giorgio-giusti-80278298",
    },
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
  {
    name: "María José Pino",
    photo: "assets/img/profiles/maria-jose-pino.jpeg",
    link: "",
    member: {
      role: { es: "Estudiante de doctorado", en: "PhD Student", sv: "Doktorand" },
      field: { es: "Biología Espacial", en: "Spatial Biology", sv: "Spatial biologi" },
      institution: "Karolinska Institutet",
      email: "m.pinovsz@gmail.com",
      linkedin: "https://www.linkedin.com/in/mariajose-pino/",
    },
  },
  {
    name: "Alejandro Fonseca Cárdenas",
    lastName: "Fonseca",
    photo: "assets/img/profiles/alejandro-fonseca.jpeg",
    link: "",
    member: {
      role: { es: "Investigador", en: "Researcher", sv: "Forskare" },
      field: {
        es: "Biología Celular Vegetal",
        en: "Plant Cell Biology",
        sv: "Växtcellbiologi",
      },
      institution: "Swedish University of Agricultural Sciences (SLU)",
      email: "alfonc91@gmail.com",
      linkedin: "https://www.linkedin.com/in/alejandro-fonseca-cardenas/",
    },
  },
  {
    name: "Macarena Tejos Bravo",
    lastName: "Tejos",
    photo: "assets/img/profiles/macarena-tejos.jpeg",
    link: "",
    member: {
      role: { es: "Investigadora Postdoctoral", en: "Postdoc", sv: "Postdoktor" },
      field: {
        es: "Neuroinmunología del Dolor",
        en: "Pain Neuroimmunology",
        sv: "Smärtneuroimmunologi",
      },
      institution: "Karolinska Institutet",
      email: "macarena.tejos.bravo@ki.se",
    },
  },
  {
    name: "Alejandra San Juan",
    photo: "assets/img/profiles/alejandra-sanjuan.jpeg",
    link: "",
    member: {
      role: {
        es: "Psicóloga Escolar",
        en: "School Psychologist",
        sv: "Skolpsykolog",
      },
      field: {
        es: "Psicología Organizacional",
        en: "Organizational Psychology",
        sv: "Organisationspsykologi",
      },
      institution: "Central barn- och elevhälsa, UBK Upplands Väsby",
      email: "alejandra.sanjuan@hotmail.com",
      linkedin: "https://www.linkedin.com/in/alejandra-san-juan-a5186ba6",
    },
  },
  {
    name: "Albano Cáceres-Verschae",
    lastName: "Cáceres-Verschae",
    photo: "assets/img/profiles/albano-caceres.png",
    link: "",
    member: {
      role: { es: "Investigador Postdoctoral", en: "Postdoc", sv: "Postdoktor" },
      field: {
        es: "Vesículas Extracelulares, Biomarcadores",
        en: "Extracellular Vesicles, Biomarkers",
        sv: "Extracellulära vesiklar, biomarkörer",
      },
      institution: "Dept. Oncology/Pathology, Karolinska Institutet",
      email: "albano.caceres.v@gmail.com",
      linkedin: "https://www.linkedin.com/in/albanocv",
      webpage: "https://orcid.org/0000-0002-4057-6827",
    },
  },
  {
    name: "Marion Muñoz García",
    lastName: "Muñoz",
    photo: "",
    link: "",
    member: {
      role: { es: "Psicóloga", en: "Psychologist", sv: "Psykolog" },
      field: {
        es: "Psicología Infanto-Juvenil",
        en: "Child and Adolescent Psychology",
        sv: "Barn- och ungdomspsykologi",
      },
      institution: "Health center, Region Stockholm",
      email: "Psmarionmmg@gmail.com",
    },
  },
  {
    name: "Patricia Munoz Salvatierra",
    lastName: "Munoz",
    photo: "",
    link: "",
    member: {
      role: { es: "Investigadora", en: "Researcher", sv: "Forskare" },
      field: {
        es: "Aprendizaje Automático, Organoides y Biosensores",
        en: "Machine Learning, Organoids and Biosensing",
        sv: "Maskininlärning, organoider och biosensorer",
      },
      institution: "KTH Royal Institute of Technology - Stockholm University",
      email: "pams@kth.se",
      linkedin: "https://www.linkedin.com/in/patricia-munoz-7820962a3/",
    },
  },
  {
    name: "Paola Olguin Muñoz",
    lastName: "Olguin",
    photo: "assets/img/profiles/paola-olguin.jpeg",
    link: "",
    member: {
      role: {
        es: "Estudiante de magíster, Arquitectura del Paisaje para un Urbanismo Sostenible",
        en: "Master's Student, Landscape Architecture for Sustainable Urbanism",
        sv: "Masterstudent, Landskapsarkitektur för hållbar urbanism",
      },
      field: {
        es: "Arquitectura y Entorno Construido",
        en: "Architecture and Built Environment",
        sv: "Arkitektur och byggd miljö",
      },
      institution: "Swedish University of Agricultural Sciences (SLU)",
      email: "pola.olguin@gmail.com",
      linkedin: "https://www.linkedin.com/in/p-olguin-munoz/",
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
      { name: "Rodrigo Morales Castro", role: ROLES.treasurer,  photo: "assets/img/profiles/rodrigo-morales.jpeg" },
      { name: "Markos Saravia Ramirez", role: ROLES.secretary,  photo: "" },
      { name: "Ignacio Verdugo",    role: ROLES.communications, photo: "assets/img/profiles/ignacio-verdugo.jpeg" },
    ],
  },
  {
    year: 2024,
    members: [
      { name: "Eduardo A. Sagredo",       role: ROLES.presidentM,               photo: "assets/img/profiles/eduardo-sagredo.jpeg" },
      { name: "Gustavo Monasterio",    role: ROLES.vicePresident,            photo: "assets/img/profiles/gustavo-monasterio.jpeg" },
      { name: "Rodrigo Morales Castro", role: ROLES.treasurer,               photo: "assets/img/profiles/rodrigo-morales.jpeg" },
      { name: "Aristides Progulakis",  role: ROLES.communicationsDirectorM,  photo: "" },
      { name: "María José Pino",       role: ROLES.secretaryF,               photo: "assets/img/profiles/maria-jose-pino.jpeg" },
    ],
  },
  {
    year: 2023,
    members: [
      { name: "Gustavo Monasterio",  role: ROLES.presidentM,               photo: "assets/img/profiles/gustavo-monasterio.jpeg" },
      { name: "Eduardo A. Sagredo",     role: ROLES.vicePresident,            photo: "assets/img/profiles/eduardo-sagredo.jpeg" },
      { name: "Macarena Carrasco",   role: ROLES.treasurerF,               photo: "" },
      { name: "Carolina Mendez",     role: ROLES.communicationsDirectorF,  photo: "" },
      { name: "Rodrigo Morales Castro", role: ROLES.secretary,             photo: "assets/img/profiles/rodrigo-morales.jpeg" },
    ],
  },
];

/* =========================================================================
   CHILEANS IN SWEDEN  (map of current and past AICHIS members)
   -------------------------------------------------------------------------
   Every entry is drawn as a plant on the map of Sweden, in its `city`. The
   plant shows the person's career stage (`stage`):

   - "student"  bachelor's or master's student  -> a seed
   - "phd"      PhD student                     -> a seedling
   - "postdoc"  postdoc                         -> a young tree
   - "pi"       professor / principal investig. -> a tree

   Each entry has:

   - `name`       if it matches someone in PROFILES, their photo, position,
                  field and institution are taken from there (and their board
                  roles from BOARD_HISTORY) — no need to repeat them here.
   - `stage`      one of the four above.
   - `city`       one of the names in CITIES below (add a city there if it's
                  missing).
   - `current`    true for current members, false for former members.
   - `history`    optional: their path, shown when someone hovers over or
                  taps them. A list of { years, role, place } — `role` can be
                  plain text or translated { es, en, sv }. Newest first.
                  Leave it out until we have it.

   Former members who aren't in PROFILES can also have `photo`, `field`
   ({ es, en, sv }) and `institution`.

   People living in the same city are spread out around it automatically.
   ========================================================================= */

// [latitude, longitude] of each city a member can be placed in.
const CITIES = {
  "Stockholm":    [59.33, 18.07],
  "Uppsala":      [59.86, 17.64],
  "Göteborg":     [57.71, 11.97],
  "Onsala":       [57.39, 11.92],
  "Malmö":        [55.60, 13.00],
  "Lund":         [55.70, 13.19],
  "Alnarp":       [55.66, 13.08],
  "Kristianstad": [56.03, 14.16],
  "Halmstad":     [56.67, 12.86],
  "Växjö":        [56.88, 14.81],
  "Kalmar":       [56.66, 16.36],
  "Karlskrona":   [56.16, 15.59],
  "Jönköping":    [57.78, 14.16],
  "Borås":        [57.72, 12.94],
  "Skövde":       [58.39, 13.85],
  "Trollhättan":  [58.28, 12.29],
  "Linköping":    [58.41, 15.62],
  "Norrköping":   [58.59, 16.19],
  "Visby":        [57.64, 18.30],
  "Örebro":       [59.27, 15.21],
  "Västerås":     [59.61, 16.55],
  "Eskilstuna":   [59.37, 16.51],
  "Södertälje":   [59.20, 17.63],
  "Karlstad":     [59.40, 13.50],
  "Falun":        [60.61, 15.63],
  "Gävle":        [60.67, 17.14],
  "Sundsvall":    [62.39, 17.31],
  "Östersund":    [63.18, 14.64],
  "Umeå":         [63.83, 20.26],
  "Luleå":        [65.58, 22.15],
  "Kiruna":       [67.86, 20.23],
};

const MEMBER_MAP = [
  { name: "Markos Saravia Ramirez",   stage: "student", city: "Stockholm", current: true },
  { name: "Paola Olguin Muñoz",      stage: "student", city: "Alnarp",    current: true },
  { name: "Sofía Bobadilla",         stage: "phd",     city: "Stockholm", current: true },
  { name: "Ignacio Verdugo",         stage: "phd",     city: "Stockholm", current: true },
  { name: "María José Pino",         stage: "phd",     city: "Stockholm", current: true },
  { name: "Macarena Tejos Bravo",    stage: "postdoc", city: "Stockholm", current: true },
  { name: "Albano Cáceres-Verschae", stage: "postdoc", city: "Stockholm", current: true },
  { name: "Gustavo Monasterio",      stage: "pi",      city: "Stockholm", current: true },
  { name: "Eduardo A. Sagredo",      stage: "pi",      city: "Stockholm", current: true },
  { name: "Patricia Munoz Salvatierra", stage: "pi",  city: "Stockholm", current: true },
  // Example with a path (copy and fill in; delete the // to use it):
  // {
  //   name: "Nombre Apellido",
  //   stage: "postdoc",
  //   city: "Lund",
  //   current: false,
  //   history: [
  //     { years: "2021–2024", role: { es: "Postdoctorado", en: "Postdoc", sv: "Postdoktor" }, place: "Lund University" },
  //     { years: "2016–2021", role: { es: "Doctorado", en: "PhD", sv: "Doktorand" }, place: "Universidad de Chile" },
  //   ],
  // },
];

/* =========================================================================
   PARTNERS  (Collaborations section)
   -------------------------------------------------------------------------
   Trusted institutions AICHIS works with, shown as cards like the members.
   Each one has:

   - `name`         translated per language.
   - `place`        city and country, shown under the name.
   - `description`  one short line, translated per language.
   - `link`         its official website.
   - `logo`         optional; a square image saved in assets/img/partners/
                    (about 256x256, white background). Leave it out to show
                    the partner's initials instead.

   To add a partner, copy one { ... } block and edit the values.
   ========================================================================= */

const PARTNERS = [
  {
    name: {
      es: "Embajada de Chile en Suecia",
      en: "Embassy of Chile in Sweden",
      sv: "Chiles ambassad i Sverige",
    },
    place: { es: "Estocolmo, Suecia", en: "Stockholm, Sweden", sv: "Stockholm, Sverige" },
    description: {
      es: "Representación diplomática de Chile ante el Reino de Suecia.",
      en: "Chile's diplomatic mission to the Kingdom of Sweden.",
      sv: "Chiles diplomatiska beskickning i Konungariket Sverige.",
    },
    link: "https://www.chile.gob.cl/suecia/",
    logo: "assets/img/partners/ministerio-relaciones-exteriores-chile.png",
  },
  {
    name: {
      es: "Consulado de Chile en Estocolmo",
      en: "Consulate of Chile in Stockholm",
      sv: "Chiles konsulat i Stockholm",
    },
    place: { es: "Estocolmo, Suecia", en: "Stockholm, Sweden", sv: "Stockholm, Sverige" },
    description: {
      es: "Servicios consulares para la comunidad chilena en Suecia.",
      en: "Consular services for the Chilean community in Sweden.",
      sv: "Konsulära tjänster för den chilenska gemenskapen i Sverige.",
    },
    link: "https://www.chile.gob.cl/estocolmo/",
    // same Ministerio de Relaciones Exteriores mark as the embassy
    logo: "assets/img/partners/ministerio-relaciones-exteriores-chile.png",
  },
  {
    name: {
      es: "Embajada de Suecia en Chile",
      en: "Embassy of Sweden in Chile",
      sv: "Sveriges ambassad i Chile",
    },
    place: { es: "Santiago, Chile", en: "Santiago, Chile", sv: "Santiago, Chile" },
    description: {
      es: "Representación diplomática de Suecia en Chile.",
      en: "Sweden's diplomatic mission in Chile.",
      sv: "Sveriges diplomatiska beskickning i Chile.",
    },
    link: "https://www.swedenabroad.se/es/embajada/chile-santiago-de-chile/",
    logo: "assets/img/partners/embajada-suecia-chile.png",
  },
  {
    name: {
      es: "Universidad de La Frontera",
      en: "Universidad de La Frontera",
      sv: "Universidad de La Frontera",
    },
    place: { es: "Temuco, Chile", en: "Temuco, Chile", sv: "Temuco, Chile" },
    description: {
      es: "Universidad pública chilena de la Región de La Araucanía.",
      en: "Chilean public university in the Araucanía Region.",
      sv: "Chilenskt offentligt universitet i regionen Araucanía.",
    },
    link: "https://www.ufro.cl/",
    logo: "assets/img/partners/universidad-de-la-frontera.png",
  },
  {
    name: {
      es: "Academia Chilena de Ciencias",
      en: "Chilean Academy of Sciences",
      sv: "Chiles vetenskapsakademi",
    },
    place: { es: "Santiago, Chile", en: "Santiago, Chile", sv: "Santiago, Chile" },
    description: {
      es: "Academia del Instituto de Chile dedicada a promover la investigación científica en el país.",
      en: "The academy of the Instituto de Chile dedicated to promoting scientific research in the country.",
      sv: "Akademin inom Instituto de Chile som främjar vetenskaplig forskning i landet.",
    },
    link: "https://www.academiadeciencias.cl/",
    logo: "assets/img/partners/academia-chilena-de-ciencias.png",
  },
  // --- copy the block above to add another partner ---
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
      es: "Guía: instalarte en Suecia como científico/a chileno/a",
      en: "Guide: settling in Sweden as a Chilean scientist",
      sv: "Guide: att etablera sig i Sverige som chilensk forskare",
    },
    description: {
      es: "Permisos de residencia, personnummer, salud, impuestos, banco y vida cotidiana. Hecha por y para la comunidad de AICHIS.",
      en: "Residence permits, personnummer, healthcare, taxes, banking and daily life. Made by and for the AICHIS community.",
      sv: "Uppehållstillstånd, personnummer, sjukvård, skatt, bank och vardagsliv. Skapad av och för AICHIS-gemenskapen.",
    },
    link: "https://aichis-org.github.io/guia-cientifico-chileno-en-suecia/",
  },
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
  {
    title: {
      es: "Actualiza o agrega tu perfil",
      en: "Update or add your profile",
      sv: "Uppdatera eller lägg till din profil",
    },
    description: {
      es: "¿Eres socio/a? Usa este formulario para actualizar tu información en el sitio o para aparecer en él.",
      en: "Already a member? Use this form to update your information on the website or to be added to it.",
      sv: "Är du medlem? Använd formuläret för att uppdatera dina uppgifter på webbplatsen eller för att läggas till.",
    },
    link: "https://docs.google.com/forms/d/e/1FAIpQLSf0AZ-invFdtJfyYzxzDIgFdfRaXbPk1jW9IO00SFH0ATjZsw/viewform",
  },
  {
    title: {
      es: "Documental Explora Nobel 2024",
      en: "Explora Nobel documentary 2024",
      sv: "Dokumentären Explora Nobel 2024",
    },
    description: {
      es: "Mira el documental de la primera edición de Explora Nobel.",
      en: "Watch the documentary about the first edition of Explora Nobel.",
      sv: "Se dokumentären om den första upplagan av Explora Nobel.",
    },
    link: "https://www.youtube.com/watch?v=5yug9GZ8PjY",
  },
  {
    title: {
      es: "Escríbenos",
      en: "Email us",
      sv: "Mejla oss",
    },
    description: {
      es: "Contáctanos en aichis2022@gmail.com.",
      en: "Contact us at aichis2022@gmail.com.",
      sv: "Kontakta oss på aichis2022@gmail.com.",
    },
    link: "mailto:aichis2022@gmail.com",
  },
  {
    title: {
      es: "Sugerir contenido o reportar un problema",
      en: "Suggest content or report a problem",
      sv: "Föreslå innehåll eller rapportera ett problem",
    },
    description: {
      es: "Propón un/a investigador/a para el directorio o avísanos de un error en el sitio.",
      en: "Suggest a researcher for the directory or tell us about an error on the site.",
      sv: "Föreslå en forskare till katalogen eller berätta om ett fel på webbplatsen.",
    },
    link: "https://github.com/AICHIS-org/AICHIS-org.github.io/issues/new/choose",
  },
  {
    title: {
      es: "Código del sitio en GitHub",
      en: "Website source on GitHub",
      sv: "Webbplatsens källkod på GitHub",
    },
    description: {
      es: "Este sitio es de código abierto: propón cambios con un Pull Request.",
      en: "This site is open source: propose changes with a Pull Request.",
      sv: "Den här webbplatsen är öppen källkod: föreslå ändringar med en Pull Request.",
    },
    link: "https://github.com/AICHIS-org/AICHIS-org.github.io",
  },
  // --- copy the block above to add another resource ---
];
