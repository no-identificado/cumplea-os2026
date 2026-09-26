// ============================================
// CONFIGURACIÓN DEL REGALO
// ============================================
// Todo lo que normalmente necesitarás cambiar está en este archivo.
// No hace falta tocar HTML, CSS ni el resto de JavaScript.

const SITE_CONFIG = {
  // --- Personas ---
  friendName: "Melisa (no me sé tu apellido xd)",
  creatorName: "yo xd",

  // --- Fechas ---
  friendshipStartYear: "2021, Agosto",  
  currentYear: 2026,

  // --- Acceso ---
  password: "25926",

  // --- Fondo e imagen ---
  backgroundImage: "assets/images/background.jpg",

  // --- Playlist ---
  playlistUrl: <iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/playlist/2fEdRSoQgORKQcT3Mlh32p?utm_source=generator&theme=0&si=64950a5539f54c52" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>,

  // --- Cápsula futura ---
  capsuleUnlockDate: "2027-09-25T00:00:00",

  // --- Textos personalizables largos ---
  portadaSubtitulo: "Una pequeña colección de recuerdos de una amistad que empezó en 2021.",
  cartaTexto: [
    "y pensar que todo comenzó cuando me escribiste para ayudarte con tu cuenta, a veces me imagino que hubiera pasado si no te contestaba, felizmente respondí ese mensaje y pude conectar con una persona tan maravollosa como tú, como una vez me dijeron: la vida a veces te recompenza con personas que te ayudan a cambiar y ver de otra manera la vida, por eso muchas gracias por esta linda amistad que creo que ya va un poco más de 5 años, en fin espero que esto dure para más y sigamos siendo grandes amigos"
  ],
  cierreMensaje: "espero que hayas pasado un increible cumpleaños y que disfrutes todo lo que venga en tu vida",
  readmeMensajeFinal: "Feliz cumpleaños, señorita melisa"
};

// ============================================
// PERSONALIZACIÓN — COLORES
// ============================================
// Estos valores se aplican como CSS variables en script.js.
// Puedes cambiarlos aquí sin tocar el CSS.
const THEME_CONFIG = {
  primaryColor: "#161a30",     // fondo principal (noche/tinta)
  secondaryColor: "#f4ede1",   // color claro (papel/luz)
  accentColor: "#c9a15e",      // acento cálido (dorado)
  textColor: "#f4ede1",
  overlayColor: "#0d0f1f",
  overlayOpacity: 0.55,
  overlayBlur: "0px"
};

// ============================================
// PERSONALIZACIÓN — MANUAL DE USO
// ============================================
const MANUAL_CONFIG = {
  funciones: [
    { icono: "👂", texto: "Escuchar" },
    { icono: "😂", texto: "Hacer reír, aunque no le hago saber" },
    { icono: "🗂️", texto: "Guardar recuerdos" },
    { icono: "🤍", texto: "Estar ahí" },
    { icono: "🙈", texto: "Aguantar mis tonterías, ya que me pongo muy espeso a veces" },
    { icono: "✨", texto: "Convertir momentos normales en recuerdos y apoyar de alguna manera a olvidar cosas" }
  ],
  advertencias: [
    "Puede provocar ataques repentinos de risa.",
    "Se recomienda molestarla regularmente.",
    "No debe dejarse sin chisme durante períodos prolongados o sino se resiente .",
    "El usuario puede desarrollar dependencia emocional después de aproximadamente 5 años de uso o tal vez no."
  ],
  mantenimiento: [
    { frecuencia: "Diario", tarea: "Pensar \"tengo que contarle esto\"" },
    { frecuencia: "Semanal", tarea: "Conversación innecesaria de varias horas" },
    { frecuencia: "Mensual", tarea: "Actualización de chismes" },
    { frecuencia: "Anual", tarea: "Recordar que seguimos siendo amigos, ya que se desaparece por momentos xd" },
    { frecuencia: "Cada 5 años", tarea: "Intenar hacer un regalo que supere el que te va a dar" }
  ]
};

// ============================================
// PERSONALIZACIÓN — LÍNEA TEMPORAL
// ============================================
// Añade, quita o edita años y recuerdos libremente.
// "image" puede dejarse vacío ("") si todavía no tienes la foto.
const TIMELINE_CONFIG = [
  {
    year: "2021",
    title: "El comienzo",
    description: "Escribe aquí cómo empezó todo.",
    image: "assets/images/2021.jpg"
  },
  {
    year: "2022",
    title: "Título del recuerdo",
    description: "Escribe aquí qué pasó ese año.",
    image: "assets/images/2022.jpg"
  },
  {
    year: "2023",
    title: "Título del recuerdo",
    description: "Escribe aquí qué pasó ese año.",
    image: "assets/images/2023.jpg"
  },
  {
    year: "2024",
    title: "Título del recuerdo",
    description: "Escribe aquí qué pasó ese año.",
    image: "assets/images/2024.jpg"
  },
  {
    year: "2025",
    title: "Título del recuerdo",
    description: "Escribe aquí qué pasó ese año.",
    image: "assets/images/2025.jpg"
  },
  {
    year: "2026",
    title: "Hoy",
    description: "Escribe aquí dónde estamos ahora.",
    image: "assets/images/2026.jpg"
  }
];

// ============================================
// PERSONALIZACIÓN — CÁPSULA DE 5 AÑOS
// ============================================
// Exactamente 5 recuerdos preparados de antemano.
const CAPSULE5_CONFIG = [
  {
    numero: "01",
    titulo: "El comienzo",
    fecha: "2021",
    descripcion: "Escribe aquí el recuerdo.",
    frase: "\"Una frase que resuma este momento.\""
  },
  {
    numero: "02",
    titulo: "Un momento que nunca olvidaré",
    fecha: "",
    descripcion: "Escribe aquí el recuerdo.",
    frase: "\"Una frase.\""
  },
  {
    numero: "03",
    titulo: "Una estupidez que terminó siendo un recuerdo",
    fecha: "",
    descripcion: "Escribe aquí el recuerdo.",
    frase: "\"Una frase.\""
  },
  {
    numero: "04",
    titulo: "Algo que probablemente tú ya olvidaste",
    fecha: "",
    descripcion: "Escribe aquí el recuerdo.",
    frase: "\"Una frase.\""
  },
  {
    numero: "05",
    titulo: "El recuerdo que resume nuestra amistad",
    fecha: "",
    descripcion: "Escribe aquí el recuerdo.",
    frase: "\"Una frase.\""
  }
];

// ============================================
// PERSONALIZACIÓN — PLAYLIST
// ============================================
const PLAYLIST_SONGS = [
  { title: "Canción", artist: "Artista", reason: "Esta canción me recuerda a..." },
  { title: "Canción", artist: "Artista", reason: "Esta canción me recuerda a..." },
  { title: "Canción", artist: "Artista", reason: "Esta canción me recuerda a..." }
];
