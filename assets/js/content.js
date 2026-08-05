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
      cta: "Postula a socio/a",
    },
    explora: {
      title: "Explora Nobel",
      lead: "Nuestro proyecto insignia. Cada año llevamos a estudiantes de enseñanza media desde Chile a Suecia para vivir la Semana del Premio Nobel, acercándolos a la ciencia de primer nivel y a las personas que la hacen posible.",
      videoCaption: "Documental · Edición 2024",
    },
    members: {
      title: "Miembros",
      lead: "Conoce a nuestra directiva. Pronto sumaremos más miembros y perfiles.",
      photoCaption: "La directiva de AICHIS, 2024",
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
      cta: "Apply to become a member",
    },
    explora: {
      title: "Explora Nobel",
      lead: "Our flagship project. Every year we bring high-school students from Chile to Sweden to experience Nobel Prize Week, bringing them closer to world-class science and the people who make it happen.",
      videoCaption: "Documentary · 2024 edition",
    },
    members: {
      title: "Members",
      lead: "Meet our board. We'll add more members and profiles soon.",
      photoCaption: "The AICHIS board, 2024",
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
      cta: "Ansök om medlemskap",
    },
    explora: {
      title: "Explora Nobel",
      lead: "Vårt flaggskeppsprojekt. Varje år tar vi med gymnasieelever från Chile till Sverige för att uppleva Nobelveckan och komma närmare vetenskap i världsklass och de människor som gör den möjlig.",
      videoCaption: "Dokumentär · 2024 års upplaga",
    },
    members: {
      title: "Medlemmar",
      lead: "Möt vår styrelse. Vi lägger till fler medlemmar och profiler snart.",
      photoCaption: "AICHIS styrelse, 2024",
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
   MEMBERS
   -------------------------------------------------------------------------
   Listed board (directiva) first, then any other members you add after.
   Names, photos and links are the same in every language; `role` is
   translated per language. `photo` is optional — leave "" to show initials.
   To add a member, copy one { ... } block and edit the values.
   ========================================================================= */

const ROLES = {
  president: { es: "Presidenta", en: "President", sv: "Ordförande" },
  treasurer: { es: "Tesorero", en: "Treasurer", sv: "Kassör" },
  boardMember: { es: "Miembro titular", en: "Board member", sv: "Styrelseledamot" },
  deputy: { es: "Miembro suplente", en: "Deputy member", sv: "Suppleant" },
};

const MEMBERS = [
  { name: "Carolina Oses",       role: ROLES.president,   affiliation: "", photo: "assets/img/aichis_profiles_board/carola.jpeg",  link: "" },
  { name: "Rodrigo Morales",     role: ROLES.treasurer,   affiliation: "", photo: "assets/img/aichis_profiles_board/Rodrigo.jpeg", link: "" },
  { name: "Markos Saravia",      role: ROLES.boardMember, affiliation: "", photo: "", link: "" },
  { name: "Giorgio Giusti",      role: ROLES.boardMember, affiliation: "", photo: "assets/img/aichis_profiles_board/giorgio.jpeg", link: "" },
  { name: "Sofía Bobadilla",     role: ROLES.boardMember, affiliation: "", photo: "assets/img/aichis_profiles_board/sofia.jpg",    link: "" },
  { name: "Gustavo Monasterio",  role: ROLES.deputy,      affiliation: "", photo: "assets/img/aichis_profiles_board/gustavo.jpeg", link: "" },
  { name: "Ignacio Verdugo",     role: ROLES.deputy,      affiliation: "", photo: "", link: "" },
  // --- copy a block above to add another member ---
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
