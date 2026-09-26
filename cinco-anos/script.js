// ============================================
// UTILIDADES
// ============================================
function $(selector, root = document) { return root.querySelector(selector); }
function $all(selector, root = document) { return Array.from(root.querySelectorAll(selector)); }

function mostrarToast(mensaje) {
  const toast = $("#toast");
  toast.textContent = mensaje;
  toast.classList.add("visible");
  clearTimeout(mostrarToast._t);
  mostrarToast._t = setTimeout(() => toast.classList.remove("visible"), 3200);
}

const prefiereMenosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ============================================
// APLICAR CONFIGURACIÓN AL DOM
// ============================================
function aplicarTema() {
  const root = document.documentElement;
  root.style.setProperty("--primary-color", THEME_CONFIG.primaryColor);
  root.style.setProperty("--secondary-color", THEME_CONFIG.secondaryColor);
  root.style.setProperty("--accent-color", THEME_CONFIG.accentColor);
  root.style.setProperty("--text-color", THEME_CONFIG.textColor);
  root.style.setProperty("--overlay-color", THEME_CONFIG.overlayColor);
  root.style.setProperty("--overlay-opacity", THEME_CONFIG.overlayOpacity);
  root.style.setProperty("--overlay-blur", THEME_CONFIG.overlayBlur);
}

function aplicarFondo() {
  const fondo = $("#fondo-global");
  if (SITE_CONFIG.backgroundImage) {
    fondo.style.backgroundImage = `url("${SITE_CONFIG.backgroundImage}")`;
  }
}

function aplicarTextos() {
  document.title = `5 años. — ${SITE_CONFIG.friendName}`;

  $("#portada-subtitulo").textContent = SITE_CONFIG.portadaSubtitulo;

  $("#manual-titulo").textContent = `Manual de uso — ${SITE_CONFIG.friendName}`;
  $("#manual-antiguedad").textContent = `${SITE_CONFIG.currentYear - SITE_CONFIG.friendshipStartYear} años`;
  $("#manual-compatibilidad").textContent = SITE_CONFIG.creatorName;
  $("#manual-actualizacion").textContent = String(SITE_CONFIG.currentYear);

  $("#boton-playlist").href = SITE_CONFIG.playlistUrl || "#";

  const cartaTexto = $("#carta-texto");
  cartaTexto.innerHTML = "";
  SITE_CONFIG.cartaTexto.forEach(parrafo => {
    const p = document.createElement("p");
    p.textContent = parrafo;
    cartaTexto.appendChild(p);
  });
  $("#carta-firma").textContent = `— ${SITE_CONFIG.creatorName}`;

  const fecha = new Date(SITE_CONFIG.capsuleUnlockDate);
  const fechaTexto = fecha.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
  $("#capsula-caja-fecha").textContent = `Esta cápsula se abrirá el ${fechaTexto}.`;

  $("#titulo-recuerdos-mio").textContent = `Recuerdos de ${SITE_CONFIG.creatorName}`;
  $("#titulo-recuerdos-ella").textContent = `Recuerdos de ${SITE_CONFIG.friendName}`;

  $("#cierre-mensaje").textContent = SITE_CONFIG.cierreMensaje;

  // Selects de autor en los formularios
  const opciones = [SITE_CONFIG.creatorName, SITE_CONFIG.friendName];
  ["#archivo-autor", "#mensaje-autor"].forEach(sel => {
    const el = $(sel);
    el.innerHTML = "";
    opciones.forEach(nombre => {
      const opt = document.createElement("option");
      opt.value = nombre;
      opt.textContent = nombre;
      el.appendChild(opt);
    });
  });
}

// ============================================
// MANUAL DE USO
// ============================================
function renderManual() {
  const funciones = $("#manual-funciones");
  funciones.innerHTML = "";
  MANUAL_CONFIG.funciones.forEach(f => {
    const div = document.createElement("div");
    div.className = "manual-funcion";
    div.innerHTML = `<span class="manual-funcion-icono">${f.icono}</span><span>${f.texto}</span>`;
    funciones.appendChild(div);
  });

  const advertencias = $("#manual-advertencias");
  advertencias.innerHTML = "";
  MANUAL_CONFIG.advertencias.forEach(a => {
    const li = document.createElement("li");
    li.textContent = a;
    advertencias.appendChild(li);
  });

  const mantenimiento = $("#manual-mantenimiento");
  mantenimiento.innerHTML = "";
  MANUAL_CONFIG.mantenimiento.forEach(m => {
    const fila = document.createElement("div");
    fila.className = "manual-mantenimiento-fila";
    fila.innerHTML = `<span class="manual-frecuencia">${m.frecuencia}</span><span>${m.tarea}</span>`;
    mantenimiento.appendChild(fila);
  });
}

// ============================================
// LÍNEA TEMPORAL
// ============================================
let anioActivo = 0;

function renderTimeline() {
  const anios = $("#timeline-anios");
  const tarjetas = $("#timeline-tarjetas");
  anios.innerHTML = "";
  tarjetas.innerHTML = "";

  TIMELINE_CONFIG.forEach((item, i) => {
    const boton = document.createElement("button");
    boton.className = "timeline-anio" + (i === 0 ? " activo" : "");
    boton.textContent = item.year;
    boton.setAttribute("role", "tab");
    boton.addEventListener("click", () => seleccionarAnio(i));
    anios.appendChild(boton);

    const tarjeta = document.createElement("article");
    tarjeta.className = "timeline-tarjeta" + (i === 0 ? " activa" : "");
    tarjeta.innerHTML = `
      ${item.image ? `<button class="timeline-foto-boton"><img src="${item.image}" alt="Recuerdo de ${item.year}: ${item.title}" loading="lazy" onerror="this.closest('.timeline-foto-boton').style.display='none'"></button>` : ""}
      <div class="timeline-texto">
        <p class="timeline-tarjeta-anio">${item.year}</p>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    `;
    const fotoBoton = tarjeta.querySelector(".timeline-foto-boton");
    if (fotoBoton) {
      fotoBoton.addEventListener("click", () => abrirModalImagen(item.image, item.title));
    }
    tarjetas.appendChild(tarjeta);
  });
}

function seleccionarAnio(i) {
  anioActivo = i;
  $all(".timeline-anio").forEach((b, idx) => b.classList.toggle("activo", idx === i));
  $all(".timeline-tarjeta").forEach((t, idx) => t.classList.toggle("activa", idx === i));
}

function abrirModalImagen(src, alt) {
  if (!src) return;
  $("#modal-imagen-img").src = src;
  $("#modal-imagen-img").alt = alt || "";
  abrirModal("#modal-imagen");
}

// ============================================
// CÁPSULA DE 5 AÑOS (sobres)
// ============================================
function renderCapsula5() {
  const grid = $("#sobres-grid");
  grid.innerHTML = "";
  CAPSULE5_CONFIG.forEach((recuerdo, i) => {
    const sobre = document.createElement("button");
    sobre.className = "sobre";
    sobre.innerHTML = `
      <span class="sobre-numero">${recuerdo.numero}</span>
      <span class="sobre-solapa"></span>
      <span class="sobre-titulo">${recuerdo.titulo}</span>
    `;
    sobre.addEventListener("click", () => abrirSobre(recuerdo, sobre));
    grid.appendChild(sobre);
  });
}

function abrirSobre(recuerdo) {
  $("#modal-sobre-numero").textContent = recuerdo.numero;
  $("#modal-sobre-titulo").textContent = recuerdo.titulo;
  $("#modal-sobre-fecha").textContent = recuerdo.fecha || "";
  $("#modal-sobre-descripcion").textContent = recuerdo.descripcion;
  $("#modal-sobre-frase").textContent = recuerdo.frase || "";
  abrirModal("#modal-sobre");
}

// ============================================
// PLAYLIST
// ============================================
function renderPlaylist() {
  const cont = $("#playlist-canciones");
  cont.innerHTML = "";
  PLAYLIST_SONGS.forEach(song => {
    const tarjeta = document.createElement("button");
    tarjeta.className = "cancion";
    tarjeta.innerHTML = `
      <span class="cancion-titulo">${song.title}</span>
      <span class="cancion-artista">${song.artist}</span>
      <span class="cancion-razon oculto">${song.reason}</span>
    `;
    tarjeta.addEventListener("click", () => {
      tarjeta.classList.toggle("expandida");
      tarjeta.querySelector(".cancion-razon").classList.toggle("oculto");
    });
    cont.appendChild(tarjeta);
  });
}

// ============================================
// MODALES (genérico)
// ============================================
function abrirModal(selector) {
  const modal = $(selector);
  modal.classList.remove("oculto");
  requestAnimationFrame(() => modal.classList.add("visible"));
  document.body.classList.add("bloquear-scroll");
}

function cerrarModal(modal) {
  modal.classList.remove("visible");
  document.body.classList.remove("bloquear-scroll");
  setTimeout(() => modal.classList.add("oculto"), prefiereMenosMovimiento ? 0 : 250);
}

function inicializarModales() {
  $all("[data-cerrar-modal]").forEach(el => {
    el.addEventListener("click", () => {
      const modal = el.closest(".modal");
      if (modal) cerrarModal(modal);
    });
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      $all(".modal.visible").forEach(cerrarModal);
    }
  });
}

// ============================================
// PANTALLA DE ACCESO
// ============================================
function inicializarAcceso() {
  const form = $("#form-acceso");
  const input = $("#input-password");
  const error = $("#acceso-error");

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (input.value.trim() === SITE_CONFIG.password) {
      error.textContent = "";
      desbloquearSitio();
    } else {
      error.textContent = "Mmm... esa no es. Piensa un poquito más 👀";
      const pantalla = $("#pantalla-acceso");
      pantalla.classList.add("agitar");
      setTimeout(() => pantalla.classList.remove("agitar"), 400);
      input.value = "";
      input.focus();
    }
  });
}

function desbloquearSitio() {
  const acceso = $("#pantalla-acceso");
  const sitio = $("#sitio");

  acceso.classList.add("saliendo");
  setTimeout(() => {
    acceso.classList.remove("activa");
    acceso.style.display = "none";
    sitio.classList.remove("oculto");
    requestAnimationFrame(() => sitio.classList.add("visible"));
  }, prefiereMenosMovimiento ? 0 : 700);
}

// ============================================
// NAVEGACIÓN / TRANSICIONES ENTRE CAPÍTULOS
// ============================================
function inicializarNavegacion() {
  const capitulos = $all(".capitulo");
  const relleno = $("#nav-progreso-relleno");

  const observer = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visto");
      }
    });
  }, { threshold: 0.3 });

  capitulos.forEach(cap => observer.observe(cap));

  function actualizarBarra() {
    const total = document.body.scrollHeight - window.innerHeight;
    const avance = total > 0 ? (window.scrollY / total) * 100 : 0;
    relleno.style.width = `${Math.min(100, Math.max(0, avance))}%`;
  }
  window.addEventListener("scroll", actualizarBarra, { passive: true });
  actualizarBarra();

  $("#boton-comenzar").addEventListener("click", () => {
    $("#manual").scrollIntoView({ behavior: prefiereMenosMovimiento ? "auto" : "smooth" });
  });
}

// ============================================
// CÁPSULA FUTURA — CONTADOR Y DESBLOQUEO
// ============================================
function inicializarCapsulaFutura() {
  const fechaDesbloqueo = new Date(SITE_CONFIG.capsuleUnlockDate).getTime();
  const elDias = $("#contador-dias");
  const elHoras = $("#contador-horas");
  const elMinutos = $("#contador-minutos");
  const elSegundos = $("#contador-segundos");
  const boton = $("#boton-abrir-capsula");
  const mensaje = $("#capsula-caja-mensaje");
  const icono = $("#capsula-caja-icono");
  const contador = $("#contador");

  function tick() {
    const ahora = Date.now();
    const restante = fechaDesbloqueo - ahora;

    if (restante <= 0) {
      contador.classList.add("oculto");
      mensaje.textContent = "Ya puedes abrirla.";
      icono.textContent = "🔓";
      boton.disabled = false;
      $("#capsula-caja").classList.add("desbloqueada");
      return;
    }

    const seg = Math.floor(restante / 1000) % 60;
    const min = Math.floor(restante / (1000 * 60)) % 60;
    const hrs = Math.floor(restante / (1000 * 60 * 60)) % 24;
    const dias = Math.floor(restante / (1000 * 60 * 60 * 24));

    elDias.textContent = String(dias).padStart(2, "0");
    elHoras.textContent = String(hrs).padStart(2, "0");
    elMinutos.textContent = String(min).padStart(2, "0");
    elSegundos.textContent = String(seg).padStart(2, "0");

    requestAnimationFrame(() => setTimeout(tick, 1000));
  }
  tick();

  boton.addEventListener("click", () => {
    if (boton.disabled) return;
    abrirCapsulaFutura();
  });
}

function abrirCapsulaFutura() {
  const caja = $("#capsula-caja");
  const interior = $("#capsula-interior");

  caja.classList.add("abriendo");
  setTimeout(() => {
    caja.classList.add("oculto");
    interior.classList.remove("oculto");
    requestAnimationFrame(() => interior.classList.add("visible"));
    refrescarCapsula();
  }, prefiereMenosMovimiento ? 0 : 900);
}

// ============================================
// CÁPSULA FUTURA — LISTAR / AÑADIR RECUERDOS
// ============================================
async function refrescarCapsula() {
  const items = await CapsuleDB.getAll();
  const mio = $("#lista-recuerdos-mio");
  const ella = $("#lista-recuerdos-ella");
  const mensajes = $("#lista-mensajes");
  mio.innerHTML = ""; ella.innerHTML = ""; mensajes.innerHTML = "";

  $("#capsula-contador-recuerdos").textContent =
    `${items.length} recuerdo${items.length === 1 ? "" : "s"} guardado${items.length === 1 ? "" : "s"}`;

  if (items.length === 0) {
    mio.innerHTML = `<p class="capsula-vacio">Todavía no hay nada aquí.</p>`;
  }

  items
    .sort((a, b) => b.dateAdded - a.dateAdded)
    .forEach(item => {
      const tarjeta = crearTarjetaRecuerdo(item);
      if (item.kind === "mensaje") {
        mensajes.appendChild(tarjeta);
      } else if (item.author === SITE_CONFIG.creatorName) {
        mio.appendChild(tarjeta);
      } else {
        ella.appendChild(tarjeta);
      }
    });
}

function iconoPara(item) {
  if (item.kind === "mensaje") return "💌";
  const tipo = item.type || "";
  if (tipo.startsWith("image/")) return "📷";
  if (tipo.startsWith("audio/")) return "🎵";
  if (tipo.startsWith("video/")) return "🎬";
  if (tipo === "application/pdf" || tipo.includes("word") || tipo.includes("document")) return "📄";
  return "📁";
}

function crearTarjetaRecuerdo(item) {
  const tarjeta = document.createElement("div");
  tarjeta.className = "recuerdo-tarjeta";
  const fecha = new Date(item.dateAdded).toLocaleDateString("es-ES");
  tarjeta.innerHTML = `
    <button class="recuerdo-tarjeta-cuerpo">
      <span class="recuerdo-icono">${iconoPara(item)}</span>
      <span class="recuerdo-info">
        <span class="recuerdo-titulo">${item.title || item.name}</span>
        <span class="recuerdo-meta">${item.author} · ${fecha}</span>
      </span>
    </button>
    <button class="recuerdo-eliminar" title="Eliminar" aria-label="Eliminar recuerdo">✕</button>
  `;
  tarjeta.querySelector(".recuerdo-tarjeta-cuerpo").addEventListener("click", () => verRecuerdo(item));
  tarjeta.querySelector(".recuerdo-eliminar").addEventListener("click", async e => {
    e.stopPropagation();
    if (confirm("¿Eliminar este recuerdo de la cápsula?")) {
      await CapsuleDB.deleteItem(item.id);
      refrescarCapsula();
    }
  });
  return tarjeta;
}

function verRecuerdo(item) {
  const cont = $("#modal-recuerdo-contenido");
  const fecha = new Date(item.dateAdded).toLocaleDateString("es-ES");

  if (item.kind === "mensaje") {
    cont.innerHTML = `
      <h3>${item.title}</h3>
      <p class="recuerdo-meta">${item.author} · ${fecha}</p>
      <p class="recuerdo-mensaje-texto">${item.description || ""}</p>
    `;
    abrirModal("#modal-recuerdo");
    return;
  }

  let previsualizacion = "";
  const url = URL.createObjectURL(item.blob);
  if (item.type && item.type.startsWith("image/")) {
    previsualizacion = `<img src="${url}" alt="${item.title || item.name}" class="recuerdo-preview-img">`;
  } else if (item.type && item.type.startsWith("audio/")) {
    previsualizacion = `<audio controls src="${url}" class="recuerdo-preview-media"></audio>`;
  } else if (item.type && item.type.startsWith("video/")) {
    previsualizacion = `<video controls src="${url}" class="recuerdo-preview-media"></video>`;
  }

  cont.innerHTML = `
    <h3>${item.title || item.name}</h3>
    <p class="recuerdo-meta">${item.author} · ${fecha}</p>
    ${previsualizacion}
    <p class="recuerdo-mensaje-texto">${item.description || ""}</p>
    <a href="${url}" download="${item.name}" class="boton boton-secundario">Descargar archivo</a>
  `;
  abrirModal("#modal-recuerdo");
}

function inicializarFormulariosCapsula() {
  $("#boton-anadir-archivo").addEventListener("click", () => abrirModal("#modal-archivo"));
  $("#boton-anadir-mensaje").addEventListener("click", () => abrirModal("#modal-mensaje"));

  $("#form-archivo").addEventListener("submit", async e => {
    e.preventDefault();
    const input = $("#archivo-input");
    const file = input.files[0];
    if (!file) return;

    const item = {
      id: CapsuleDB.makeId(),
      kind: "archivo",
      name: file.name,
      type: file.type || "application/octet-stream",
      size: file.size,
      author: $("#archivo-autor").value,
      title: $("#archivo-titulo").value.trim() || file.name,
      description: $("#archivo-descripcion").value.trim(),
      dateAdded: Date.now(),
      blob: file
    };
    await CapsuleDB.addItem(item);
    e.target.reset();
    cerrarModal($("#modal-archivo"));
    mostrarToast("Recuerdo guardado en la cápsula.");
    refrescarCapsula();
  });

  $("#form-mensaje").addEventListener("submit", async e => {
    e.preventDefault();
    const item = {
      id: CapsuleDB.makeId(),
      kind: "mensaje",
      author: $("#mensaje-autor").value,
      title: $("#mensaje-titulo").value.trim(),
      description: $("#mensaje-texto").value.trim(),
      dateAdded: Date.now()
    };
    await CapsuleDB.addItem(item);
    e.target.reset();
    cerrarModal($("#modal-mensaje"));
    mostrarToast("Mensaje guardado en la cápsula.");
    refrescarCapsula();
  });
}

// ============================================
// CÁPSULA FUTURA — EXPORTAR ZIP
// ============================================
function inicializarExportacion() {
  let accion = null; // "guardar" | "respaldo" — ambos generan el mismo ZIP

  async function abrirConfirmacion(origen) {
    accion = origen;
    const items = await CapsuleDB.getAll();
    $("#exportar-titulo").textContent = `Has guardado ${items.length} recuerdo${items.length === 1 ? "" : "s"}.`;
    $("#exportar-progreso").classList.add("oculto");
    abrirModal("#modal-exportar");
  }

  $("#boton-guardar-capsula").addEventListener("click", () => abrirConfirmacion("guardar"));
  $("#boton-exportar-respaldo").addEventListener("click", () => abrirConfirmacion("respaldo"));
  $("#boton-cancelar-exportar").addEventListener("click", () => cerrarModal($("#modal-exportar")));

  $("#boton-confirmar-exportar").addEventListener("click", async () => {
    $("#exportar-progreso").classList.remove("oculto");
    $("#boton-confirmar-exportar").disabled = true;
    try {
      const items = await CapsuleDB.getAll();
      const nombre = await CapsuleExport.exportZip(items);
      mostrarToast(`Descargado: ${nombre}`);
      cerrarModal($("#modal-exportar"));
      // Los datos NO se borran de IndexedDB tras exportar (ver punto 23 del brief).
    } catch (err) {
      console.error(err);
      mostrarToast("Algo salió mal al generar el archivo. Inténtalo de nuevo.");
    } finally {
      $("#boton-confirmar-exportar").disabled = false;
    }
  });
}

// ============================================
// PARTÍCULAS SUTILES (portada)
// ============================================
function inicializarParticulas() {
  if (prefiereMenosMovimiento) return;
  const cont = $("#particulas");
  const cantidad = window.innerWidth < 600 ? 18 : 34;
  for (let i = 0; i < cantidad; i++) {
    const p = document.createElement("span");
    p.className = "particula";
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDelay = `${Math.random() * 12}s`;
    p.style.animationDuration = `${10 + Math.random() * 10}s`;
    p.style.opacity = String(0.2 + Math.random() * 0.4);
    cont.appendChild(p);
  }
}

// ============================================
// INICIO
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  aplicarTema();
  aplicarFondo();
  aplicarTextos();
  renderManual();
  renderTimeline();
  renderCapsula5();
  renderPlaylist();
  inicializarModales();
  inicializarAcceso();
  inicializarNavegacion();
  inicializarCapsulaFutura();
  inicializarFormulariosCapsula();
  inicializarExportacion();
  inicializarParticulas();
});
