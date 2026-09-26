# 5 años. — un archivo digital de amistad

Página web estática, pensada para GitHub Pages, que reúne una línea temporal,
un manual de uso, una cápsula de 5 años, una playlist, una carta y una
cápsula futura que se abre el **25 de septiembre de 2027**.

No tiene backend ni base de datos. Todo funciona en el navegador.

---

## Estructura del proyecto

```
/
├── index.html          → estructura de todas las secciones
├── style.css            → todo el diseño visual
├── config.js             → TODO lo que normalmente vas a querer cambiar
├── capsule-db.js          → almacenamiento local (IndexedDB) + exportar ZIP
├── script.js               → lógica de la página (no hace falta tocarlo)
├── README.md
└── assets/
    ├── images/           → tus fotos (background.jpg, 2021.jpg... 2026.jpg)
    └── icons/
```

**Para personalizar casi todo, solo necesitas editar `config.js`.**
No hace falta tocar HTML ni CSS.

---

## Cómo cambiar el nombre de ella

Abre `config.js` y edita:

```js
friendName: "[NOMBRE DE ELLA]",
```

## Cómo cambiar mi nombre

```js
creatorName: "[MI NOMBRE]",
```

## Cómo cambiar la contraseña

```js
password: "25926",
```

Recuerda que esta contraseña es solo simbólica: está en el código, así que
cualquiera con acceso al archivo podría verla. No es una medida de
seguridad real, es parte del regalo.

## Cómo cambiar la imagen de fondo

1. Coloca tu imagen dentro de `assets/images/` (por ejemplo `background.jpg`).
2. En `config.js`:

```js
backgroundImage: "assets/images/background.jpg",
```

Puedes ajustar la capa oscura sobre la imagen (para que el texto siga
siendo legible) en `THEME_CONFIG`:

```js
overlayColor: "#0d0f1f",
overlayOpacity: 0.55, // 0 = sin capa, 1 = totalmente opaca
overlayBlur: "0px",    // por ejemplo "4px" para desenfocar el fondo
```

## Cómo cambiar los colores

También en `THEME_CONFIG`, dentro de `config.js`:

```js
primaryColor: "#161a30",   // fondo general
secondaryColor: "#f4ede1", // color de "papel" (carta, tarjetas modales)
accentColor: "#c9a15e",    // color de acento (botones, detalles)
textColor: "#f4ede1",      // color del texto principal
```

## Cómo añadir fotografías

Guarda las imágenes en `assets/images/` y referencia su ruta desde
`config.js` (en `TIMELINE_CONFIG`, por ejemplo).

## Cómo modificar la línea temporal

En `config.js`, edita el array `TIMELINE_CONFIG`. Puedes añadir, quitar o
reordenar años libremente:

```js
const TIMELINE_CONFIG = [
  {
    year: "2021",
    title: "El comienzo",
    description: "...",
    image: "assets/images/2021.jpg"
  },
  // ...
];
```

Si dejas `image: ""`, esa tarjeta simplemente no mostrará foto.

## Cómo modificar la Cápsula de 5 años

Edita `CAPSULE5_CONFIG` en `config.js`. Debe tener exactamente 5 entradas
(cada una es un "sobre" que se abre al hacer clic).

## Cómo cambiar la playlist

```js
playlistUrl: "https://open.spotify.com/playlist/...",
```

También puedes listar canciones individuales en `PLAYLIST_SONGS`:

```js
const PLAYLIST_SONGS = [
  { title: "Nombre de la canción", artist: "Artista", reason: "Por qué la elegiste" },
];
```

## Cómo escribir la carta

Edita `cartaTexto` en `config.js`. Es un array: cada elemento es un
párrafo.

```js
cartaTexto: [
  "Primer párrafo...",
  "Segundo párrafo...",
],
```

## Cómo cambiar la fecha de desbloqueo de la cápsula futura

```js
capsuleUnlockDate: "2027-09-25T00:00:00",
```

Formato: `AAAA-MM-DDTHH:MM:SS`, en la hora local de quien vea la página.

## Cómo modificar el contenido inicial (portada, manual, cierre)

- `portadaSubtitulo` → subtítulo de la portada.
- `MANUAL_CONFIG` → funciones, advertencias y mantenimiento del manual.
- `cierreMensaje` → mensaje final de la página.
- `readmeMensajeFinal` → mensaje que aparece dentro del README.txt del ZIP.

---

## Cómo funciona la cápsula futura

Antes de la fecha configurada, la cápsula se muestra cerrada con una
cuenta atrás (días, horas, minutos, segundos) calculada en el propio
navegador con `new Date()`. No depende de ningún servidor.

Al llegar la fecha, el botón **"🔓 Abrir cápsula"** se activa. Al abrirla,
cualquiera que use la página puede:

- Añadir archivos (imágenes, PDF, audio, vídeo, documentos, etc.).
- Escribir mensajes de texto.
- Ver, descargar o eliminar lo que se ha guardado.
- Exportar todo como un único archivo `.zip`.

**Importante:** la protección por fecha es simbólica. Cualquiera podría
cambiar la fecha de su dispositivo o el código para abrirla antes. Eso es
intencional: no es una caja fuerte, es parte de la experiencia.

## Cómo añadir archivos a la cápsula

Dentro de la cápsula ya desbloqueada:

1. Pulsa **"+ Añadir a la cápsula"**.
2. Elige quién guarda el recuerdo, un título, una descripción opcional y
   el archivo.
3. Pulsa **Guardar**.

También puedes pulsar **"+ Escribir un mensaje"** para dejar solo texto,
sin adjuntar ningún archivo.

## Cómo exportar la cápsula

Pulsa **"📦 Guardar nuestra cápsula"** (o **"💾 Exportar respaldo"**, que
hace exactamente lo mismo). Se generará y descargará automáticamente un
archivo:

```
Nuestra_historia_2021-2027.zip
```

con esta estructura interna:

```
Nuestra_historia_2021-2027/
├── README.txt
├── RECUERDOS_DE_[TU NOMBRE]/
├── RECUERDOS_DE_[NOMBRE DE ELLA]/
└── MENSAJES/
```

Exportar **no borra nada** de la cápsula guardada en el navegador — puedes
exportar tantas veces como quieras, como copia de seguridad periódica.

## Cómo funciona IndexedDB (almacenamiento local)

Todo lo que se añade a la cápsula futura (archivos y mensajes) se guarda
en **IndexedDB**, una base de datos que vive dentro del propio navegador
de quien está usando la página. Nada se sube a ningún servidor ni a
GitHub: todo el proceso ocurre en el dispositivo de la persona.

## Limitaciones del almacenamiento local

Como los datos viven solo en ese navegador y ese dispositivo:

- Si se **borran los datos de navegación** (caché, cookies, "site data"),
  los recuerdos guardados se pierden.
- Si se **usa otro dispositivo o navegador**, no aparecerán los recuerdos
  guardados anteriormente en el primero: cada navegador tiene su propia
  cápsula local.
- Si el navegador se desinstala o el dispositivo se resetea, también se
  pierden.

Por eso existe el botón de exportar: conviene descargar el `.zip` de vez
en cuando (y guardarlo en un lugar seguro) para no depender solo del
almacenamiento del navegador.

## Cómo publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub y sube todos los archivos de este
   proyecto (manteniendo la carpeta `assets/`).
2. Ve a **Settings → Pages** en el repositorio.
3. En "Source", elige la rama principal (por ejemplo `main`) y la carpeta
   raíz (`/`).
4. Guarda. GitHub te dará una URL como
   `https://tu-usuario.github.io/tu-repositorio/`.
5. Abre esa URL: ahí estará la página, lista para compartir.

No hace falta ningún paso de compilación ni instalar nada: es HTML, CSS y
JavaScript puros.
