// ============================================
// CÁPSULA FUTURA — ALMACENAMIENTO LOCAL (IndexedDB)
// ============================================
// Todo lo que se guarda aquí vive SOLO en este navegador, en este
// dispositivo. No se envía nada a ningún servidor. Ver README.md
// para más detalles y limitaciones.

const CapsuleDB = (() => {
  const DB_NAME = "capsula-futura-db";
  const STORE_NAME = "recuerdos";
  const DB_VERSION = 1;
  let dbPromise = null;

  function open() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
          store.createIndex("author", "author", { unique: false });
          store.createIndex("kind", "kind", { unique: false });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    return dbPromise;
  }

  async function addItem(item) {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).add(item);
      tx.oncomplete = () => resolve(item);
      tx.onerror = () => reject(tx.error);
    });
  }

  async function deleteItem(id) {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async function updateItem(item) {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).put(item);
      tx.oncomplete = () => resolve(item);
      tx.onerror = () => reject(tx.error);
    });
  }

  async function getAll() {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const request = tx.objectStore(STORE_NAME).getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  function makeId() {
    return "r_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
  }

  return { addItem, deleteItem, updateItem, getAll, makeId };
})();

// ============================================
// EXPORTACIÓN DE LA CÁPSULA COMO ZIP
// ============================================
const CapsuleExport = (() => {

  // Limpia un nombre de archivo de caracteres problemáticos.
  function sanitizeFileName(name) {
    if (!name) return "archivo";
    let clean = name
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[\/\\?%*:|"<>]/g, "-")
      .trim();
    return clean.length ? clean : "archivo";
  }

  // Evita sobrescribir archivos con el mismo nombre dentro de una carpeta.
  function uniqueName(usedNames, name) {
    if (!usedNames.has(name)) {
      usedNames.add(name);
      return name;
    }
    const dot = name.lastIndexOf(".");
    const base = dot > 0 ? name.slice(0, dot) : name;
    const ext = dot > 0 ? name.slice(dot) : "";
    let i = 2;
    let candidate = `${base}_${i}${ext}`;
    while (usedNames.has(candidate)) {
      i++;
      candidate = `${base}_${i}${ext}`;
    }
    usedNames.add(candidate);
    return candidate;
  }

  function folderForAuthor(author) {
    const nombre = sanitizeFileName(author || "recuerdos").toUpperCase();
    return `RECUERDOS_DE_${nombre}`;
  }

  function buildReadme(itemCount) {
    const fecha = new Date(SITE_CONFIG.capsuleUnlockDate);
    const fechaTexto = fecha.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
    return [
      "NUESTRA HISTORIA",
      "",
      "Esta carpeta contiene los recuerdos",
      "que guardamos dentro de nuestra cápsula",
      "del futuro.",
      "",
      "Fecha de apertura:",
      fechaTexto,
      "",
      "Creado por:",
      `${SITE_CONFIG.creatorName} y ${SITE_CONFIG.friendName}`,
      "",
      "Recuerdos guardados:",
      String(itemCount),
      "",
      "---",
      "",
      `"${SITE_CONFIG.readmeMensajeFinal}"`,
      "",
      "---",
      "",
      "FIN"
    ].join("\n");
  }

  async function exportZip(items) {
    const zip = new JSZip();
    const rootName = `Nuestra_historia_${SITE_CONFIG.friendshipStartYear}-${new Date(SITE_CONFIG.capsuleUnlockDate).getFullYear()}`;
    const root = zip.folder(rootName);

    root.file("README.txt", buildReadme(items.length));

    const usedNamesByFolder = {};

    for (const item of items) {
      let folder;
      if (item.kind === "mensaje") {
        folder = "MENSAJES";
      } else {
        folder = folderForAuthor(item.author);
      }
      if (!usedNamesByFolder[folder]) usedNamesByFolder[folder] = new Set();

      const targetFolder = root.folder(folder);

      if (item.kind === "mensaje") {
        const baseName = sanitizeFileName(item.title || "mensaje") + ".txt";
        const finalName = uniqueName(usedNamesByFolder[folder], baseName);
        const contenido = [
          item.title || "Mensaje",
          `Autor: ${item.author}`,
          `Fecha: ${new Date(item.dateAdded).toLocaleDateString("es-ES")}`,
          "",
          item.description || ""
        ].join("\n");
        targetFolder.file(finalName, contenido);
      } else {
        const baseName = sanitizeFileName(item.name || (item.title + ".dat"));
        const finalName = uniqueName(usedNamesByFolder[folder], baseName);
        targetFolder.file(finalName, item.blob);

        // Además, si tiene título/descripción, se guarda una ficha en texto.
        if (item.title || item.description) {
          const fichaName = uniqueName(usedNamesByFolder[folder], sanitizeFileName(item.title || "recuerdo") + "_info.txt");
          const ficha = [
            item.title || "",
            `Autor: ${item.author}`,
            `Fecha: ${new Date(item.dateAdded).toLocaleDateString("es-ES")}`,
            "",
            item.description || ""
          ].join("\n");
          targetFolder.file(fichaName, ficha);
        }
      }
    }

    const blob = await zip.generateAsync({ type: "blob" });
    const finalFileName = `${rootName}.zip`;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = finalFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    return finalFileName;
  }

  return { exportZip, sanitizeFileName };
})();
