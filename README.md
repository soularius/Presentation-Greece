# PRESENTACION GRECIA — Our Trip to Greece

Presentación interactiva en Canvas que cuenta, en inglés, un viaje de tres días
por Grecia. Ocho escenas ilustradas narradas como diálogo entre **Jenny** y
**Yined**, pensada para proyectarse en clase mientras ellas leen las frases en
voz alta.

Inspirada en [PRESENTACION FLAM](../PRESENTACION%20FLAM), pero más directa: sin
mapas ni bifurcaciones, una ilustración a pantalla completa por momento de la
historia.

---

## La historia

> On our first day, we are going to arrive in Athens. We are going to walk around
> the city and see amazing places like the Acropolis and the Parthenon.
>
> On the second day, we are going to travel to Santorini. First, we are going to
> visit the beach and watch the sunset. Also, we are going to see Oia and the
> beautiful Santorini Caldera.
>
> Finally, on day three, we are going to explore the rest of Santorini. We are
> going to take a lot of photos and visit some local shops. We are also going to
> see the Red Beach and Fira. It is going to be a great trip!

**La pantalla es apoyo, no narrador.** Jenny y Yined dicen las frases en voz alta,
así que cada frase aparece entera y grande desde el primer instante — sin efecto
de tecleado, que obligaría a esperar para leer — y se avanza a mano, con lo que
el ritmo lo marcan ellas.

Para no perder el turno, cada una tiene su color, que cambia a la vez en el aro
del avatar, el nombre y la línea superior de la barra:

| | Clave interna | Color | Avatar |
|---|---|---|---|
| **Jenny** | `p1` | dorado `#f0cd76` | `escene_0/p1_face.png` |
| **Yined** | `p2` | azul `#7ec8ea` | `escene_0/p2_face.png` |

En el código y en los nombres de archivo se siguen llamando `p1` y `p2`; los
nombres visibles salen de `SPEAKERS`, en [assets/js/script.js](assets/js/script.js).

---

## Las ocho escenas

| # | Carpeta | Día | Escena | Personajes | Frases | Vídeo |
|---|---------|-----|--------|-----------|--------|-------|
| 0 | `escene_0` | — | Portada — Delfos | `pose` | — | — |
| 1 | `escene_1` | Day 1 | Athens Airport | `walk` | 1 | — |
| 2 | `escene_2` | Day 1 | Around the City | `ride` | 1 | — |
| 3 | `escene_3` | Day 1 | Acropolis & Parthenon | `none` | 1 | ✔ |
| 4 | `escene_4` | Day 2 | Santorini · Oia & the Caldera | `none` | 3 | ✔ |
| 5 | `escene_5` | Day 3 | Shops & the City | `none` | 2 | ✔ |
| 6 | `escene_6` | Day 3 | Red Beach & Fira | `none` | 1 | ✔ |
| 7 | `escene_7` | The End | Goodbye, Greece | `none` | 1 | — |

El botón de avance se etiqueta solo: `Next ▸` mientras queden frases en la
escena, `Day 2 ▸` / `Day 3 ▸` / `The End ▸` cuando la siguiente escena cambia de
día, y `Travel Again ↻` en la última, que vuelve a la portada.

### Reparto de frases

| Escena | Quién | Frase |
|--------|-------|-------|
| 1 | Jenny | On our first day, we are going to arrive in Athens. |
| 2 | Jenny | We are going to walk around the city… |
| 3 | Jenny | …and see amazing places like the Acropolis and the Parthenon. |
| 4 | Yined | On the second day, we are going to travel to Santorini. |
| 4 | Yined | First, we are going to visit the beach and watch the sunset. |
| 4 | Yined | Also, we are going to see Oia and the beautiful Santorini Caldera. |
| 5 | Yined | Finally, on day three, we are going to explore the rest of Santorini. |
| 5 | Yined | We are going to take a lot of photos and visit some local shops. |
| 6 | Jenny | We are also going to see the Red Beach and Fira. |
| 7 | Jenny | It is going to be a great trip! |

Jenny cuenta el día 1 entero, Yined el día 2 y el día 3 hasta las compras, y
Jenny cierra con Red Beach & Fira y la frase final. Para cambiarlo basta con
tocar el `who: 'p1'` / `who: 'p2'` de cada línea en `SCENES`.

---

## Estructura del proyecto

```text
PRESENTACION GRECIA/
├── index.html          estructura, diálogo, menú y overlays
├── README.md
└── assets/
    ├── css/styles.css  paleta egea, actores, botones y paneles
    ├── js/script.js    escenas, puesta en escena, diálogo y eventos
    ├── img/
    │   ├── escene_0/   background.png · p1.png · p2.png · p1_face.png · p2_face.png
    │   ├── escene_1/   background.png · p1.png · p2.png
    │   ├── escene_2/   background.png · carraje.png
    │   ├── escene_3/   background.png · video.mp4
    │   ├── escene_4/   background.png · video.mp4
    │   ├── escene_5/   background.png · video.mp4
    │   ├── escene_6/   background.png · video.mp4
    │   └── escene_7/   background.png
    └── sounds/music.mp3
```

Sin dependencias ni build: HTML5, CSS3 (Google Fonts: Cinzel + Quicksand),
JavaScript sin frameworks y Canvas 2D.

---

## Cómo ejecutar

Con Live Server en VS Code, o con cualquier servidor estático:

```bash
python -m http.server 5500
```

Y abrir <http://127.0.0.1:5500>.

Hace falta un servidor: abrir `index.html` con doble clic (`file://`) impide que
carguen los vídeos y la música.

---

## Controles

| | |
|---|---|
| **Start the Trip** | empieza el recorrido |
| **Next ▸** / **Day N ▸** / **The End ▸** | avanzan frase o escena |
| **Travel Again ↻** | reinicia desde la portada |
| **← Back** | escena anterior |
| **📍** | menú para saltar a cualquier escena |
| **🔇 / 🔊** | música de fondo |
| **⛶** | pantalla completa |
| **Burbuja de vídeo** | clic para ampliar el clip |

**Teclado:** `Espacio`, `Enter` o `→` avanzan · `←` retrocede · `F` pantalla
completa · `Esc` cierra menú, créditos y vídeo.

La música arranca en silencio y hay que pulsar 🔇 para activarla: los navegadores
no permiten reproducir audio sin una interacción previa.

---

## Personajes sobre la escena

Cada escena declara cómo aparecen los personajes con `cast`:

| Valor | Qué hace |
|-------|----------|
| `pose` | Quietos, solo un leve movimiento de respiración. Portada. |
| `walk` | Entran caminando con rebote de paso, sombra de contacto y desfase entre las dos; al llegar, el paso se relaja en un balanceo lento. Usa `p1.png` / `p2.png` de la carpeta. |
| `ride` | Un único sprite combinado (`sprite: 'carraje.png'`) recorre la escena siguiendo `ride.path`. |
| `none` | Los personajes ya están pintados dentro del fondo. Escenas 3 a 7. |

`stage` coloca a cada personaje sobre el fondo concreto — es lo que se ajusta
para que pisen el suelo:

```js
stage: { p1: { x: 36, y: 1, h: 63 },   // x: centro horizontal en % del ancho
         p2: { x: 58, y: 6, h: 55 } }  // y: separación del borde inferior en %
                                       // h: altura en vh
```

Si una escena con `cast: 'walk'` no trae sus propios `p1.png` / `p2.png`, se
reutilizan automáticamente los de `escene_0`.

### El carruaje (escena 2)

Cruza de derecha a izquierda con un arco suave, en primer plano, y **se detiene
al llegar** a esperar el `Next` — no da vueltas:

```js
ride: {
  duration: 5500,
  loop: false,          // true (o ausente) = bucle infinito
  path: [               // x, y como fracción del viewport · h en vh
    { x: 1.30, y: -0.130, h: 70 },   // fuera de cuadro, a la derecha
    { x: 0.92, y: -0.100, h: 70 },
    { x: 0.64, y: -0.088, h: 70 },   // el arco se aleja un poco aquí
    { x: 0.44, y: -0.105, h: 70 },
    { x: 0.30, y: -0.130, h: 70 },   // aparcado
  ],
}
```

Cada punto lleva **posición y tamaño**, así el sprite escala según la
profundidad. Va en primer término a propósito: en este fondo la calle empedrada
es una cuña que se abre hacia abajo, así que a media distancia solo hay suelo en
la franja central. A ese tamaño, pasar por delante del pueblo se lee como
cercanía, no como estar sobre los tejados.

> Para trazar un `ride.path` nuevo: `index.html?scene=2&t=0.5` congela el
> recorrido a la mitad. Vas probando valores de `t` entre 0 y 1 y mueves los
> puntos hasta que las ruedas pisen bien en todo el trayecto.

---

## Vídeos

Las escenas que declaran `video: 'video.mp4'` muestran una **burbuja circular**
abajo a la izquierda con el clip en pequeño, con dos anillos que se expanden —
el mismo gesto de invitación que los botones que laten en PRESENTACION FLAM — y
un ▶ centrado. Al pulsarla se abre en grande, enmarcada; se cierra con la ✕, con
`Esc` o pulsando fuera.

Los clips **siempre van en bucle infinito y siempre en silencio**, sin forma de
activarles el sonido:

- No llevan controles nativos.
- Un listener de `volumechange` los devuelve a silencio si algo intenta subir el
  volumen (el menú del botón derecho de Chrome permite mostrar los controles).
- El menú contextual sobre el vídeo está desactivado.

Solo se descarga el vídeo de la escena actual; al cambiar de escena se libera el
anterior, así los cuatro (unos 12 MB) nunca se cargan a la vez.

Son verticales (720×1280) y el marco lo dimensiona su título, que es más ancho
que un clip 9:16, así que **el vídeo va centrado dentro del marco**.

---

## Pantalla completa

Botón ⛶ bajo el de música, o la tecla `F`. El mismo botón sale y cambia a ✕. Usa
la API estándar con fallback `webkit` para Safari y Android antiguos.

**En iPhone el botón no aparece.** Safari en iOS no permite poner en pantalla
completa nada que no sea un `<video>`, así que en vez de dejar un botón que no
hace nada, se oculta cuando el navegador no soporta la API. Ahí el equivalente es
"Añadir a pantalla de inicio" y abrirlo desde ahí.

---

## Assets por escena

| Archivo | Dónde | Obligatorio |
|---------|-------|-------------|
| `background.png` (o `.jpg`) | todas | recomendado |
| `p1.png` / `p2.png` | escenas con `cast: 'walk'` o `'pose'` | no |
| sprite suelto (`carraje.png`) | escenas con `cast: 'ride'` | sí |
| `video.mp4` | escenas con `video:` | no |
| `p1_face.png` / `p2_face.png` | solo `escene_0` | sí — avatares del diálogo |

- Si falta un fondo, el canvas dibuja un **placeholder egeo** con el nombre de la
  escena y la ruta exacta del archivo que espera. Nada se rompe.
- Los avatares son recortes cuadrados de la cara. Para regenerarlos:

  ```bash
  python -c "from PIL import Image; Image.open('p1.png').crop((380,0,940,560)).resize((420,420)).save('p1_face.png')"
  ```

---

## Añadir o reordenar escenas

Todo vive en el objeto `SCENES` de [assets/js/script.js](assets/js/script.js).
Cada entrada declara su propia carpeta, así que renumerar es cambiar una cadena:

```js
1: {
  kind: 'story',                        // 'home' | 'story'
  folder: 'escene_1',
  day: 'Day 1',
  place: 'Athens Airport',              // rótulo superior
  cast: 'walk',                         // 'pose' | 'walk' | 'ride' | 'none'
  stage: { p1: { x: 36, y: 1, h: 63 },
           p2: { x: 58, y: 6, h: 55 } },
  video: 'video.mp4',                   // opcional
  lines: [{ who: 'p1', text: 'On our first day, we are going to arrive in Athens.' }],
},
```

Al añadir una escena, acuérdate de sumar su botón al menú de
[index.html](index.html) (`.panel__item` con `data-target`).

---

## Deep links

Útiles para presentar o retomar en un punto concreto:

- `index.html?scene=4` — abre directamente el Día 2.
- `index.html?scene=4&line=1` — Día 2 con la segunda frase ya en pantalla.
- `index.html?scene=2&t=0.5` — congela el carruaje a mitad de recorrido.

---

## Rendimiento

Decisiones deliberadas; conviene no deshacerlas sin medir:

- **El canvas solo se repinta cuando cambia** (cambio de escena, fundido, resize
  o un fondo que termina de cargar). Repintarlo en cada frame obligaba además a
  recalcular los desenfoques de los paneles que van encima.
- **Cada fondo se escala una vez** a un canvas fuera de pantalla del tamaño del
  viewport. Lo importante no es ahorrar el reescalado (medido: 3 ms por fundido)
  sino que ese canvas guarda su propio bitmap, así que pintar una escena no puede
  obligar a **redecodificar** el PNG original. El de la escena 0 se prepara al
  arrancar y nunca se descarta, porque *Travel Again* siempre vuelve ahí.
- **El arte de los personajes se precarga y decodifica en tiempo libre**
  (`requestIdleCallback`) y se mantiene referenciado en `warmArtwork`. Los `<img>`
  de los actores se reutilizan entre escenas, así que al pulsar *Travel Again*
  apuntaban al carruaje y al aeropuerto: redecodificar los 5 MB de la portada
  justo en ese clic era lo que hacía pesado el reinicio.
- **Todas las animaciones mueven solo `transform` y `opacity`**, que se resuelven
  en la GPU. Ninguna anima `box-shadow`, `left`, `width` ni `filter`, que fuerzan
  repintado o recálculo de layout.
- **El carruaje se mueve con `transform`**, no con `left`/`bottom`/`height`. Su
  ancho se deriva de las proporciones del PNG en vez de leerlo del layout, así que
  no hay reflow en ningún frame.
- **`will-change` está acotado** a las clases que están animando de verdad
  (`.is-walking`, `.is-riding`, `.is-posing`), no puesto a lo bruto: así el arte
  con `drop-shadow` se rasteriza una vez y luego solo se mueve la capa.
- **Solo se descarga el vídeo de la escena actual.**

---

## Móvil

- Diseñado para horizontal; en vertical aparece un aviso para rotar el
  dispositivo. Ese aviso usa **`height: 100dvh`**, no `100vh`: en el móvil
  `100vh` (igual que `inset: 0`) mide el viewport *grande*, el de la barra del
  navegador retraída, así que la caja es más alta de lo que se ve y el mensaje
  centrado se iba por debajo de la barra. `100dvh` sigue el área visible y se
  reajusta cuando la barra aparece o desaparece; la línea `100vh` que va justo
  antes es solo la reserva para navegadores que no conocen `dvh`. El tamaño del
  texto va en `clamp()` sobre `vmin` para que quepa en cualquier pantalla.
- Los overlays (menú y vídeo) **hacen scroll** cuando no caben. Un elemento
  centrado con flexbox que desborda no se puede desplazar hasta arriba, así que
  van alineados al inicio y centrados con `margin: auto`, que funciona en los dos
  casos.
- Hay un bloque `@media (max-height: 520px)` que compacta los paneles en móvil
  apaisado, y otros para ≤900 px y ≤560 px de ancho.

---

## Notas

- Si una imagen no aparece, revisar nombre exacto, extensión y ruta: el
  placeholder del canvas indica el archivo que esperaba.
- **Pendiente de contenido:** el fondo de `escene_5` tiene un letrero de neón que
  dice **MYKONOS**, pero la frase que lo acompaña habla de *"the rest of
  Santorini"*. Mykonos es otra isla; conviene regenerar esa imagen antes de
  presentarla.
- Los fondos de `escene_4`, `escene_6` y `escene_7` miden 1584×672 y el de
  `escene_5` 1408×768, frente a los 2754×1536 de las escenas 0 a 3. Se ven bien,
  pero el canvas los amplía, así que quedan algo menos nítidos. Si existen
  versiones grandes, mejor cambiarlas.
- **`assets/sounds/music.mp3` pesa 79,5 MB**: son ~174 minutos a 64 kbps. Para
  una presentación de unos minutos es muchísimo, compite con los vídeos por el
  ancho de banda y encima suena peor que la pista anterior.
  `assets/sounds/music_.mp3` (5,6 MB, 4,1 min, 192 kbps) es esa pista anterior y
  ahora mismo no la usa nadie. Salvo que el archivo grande sea intencionado,
  conviene volver al pequeño. El reproductor está en `preload = 'metadata'`, así
  que no descarga la pista entera hasta que se pulsa 🔊, pero aun así.

---

Ideas, diseño y creación · Yined Molina
Imágenes generadas con Google Gemini
