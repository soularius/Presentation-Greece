# PRESENTACION GRECIA — Our Trip to Greece

Presentación interactiva en Canvas que cuenta, en inglés, un viaje de tres días
por Grecia (Atenas y Santorini). Versión simplificada de
[PRESENTACION FLAM](../PRESENTACION%20FLAM), con dos personajes: **Jenny** (`p1`)
y **Yined** (`p2`).

## Historia

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

El texto está repartido como diálogo entre **Jenny** y **Yined**: cada frase es un
turno con su avatar. **Ellas leen las frases en voz alta durante la presentación**,
así que la pantalla es apoyo, no narrador: la frase aparece entera y grande desde
el primer momento, y se avanza a mano, con lo que el ritmo lo marcan ellas.

Para no perder el turno, cada una tiene su color: **Jenny en dorado** y
**Yined en azul**. El aro del avatar, el nombre y la línea superior de la barra
cambian de color según a quién le toca hablar.

En el código y en los nombres de archivo se siguen llamando `p1` (Jenny) y
`p2` (Yined); los nombres visibles están en `SPEAKERS`, en [assets/js/script.js](assets/js/script.js).

## Escenas

Ocho escenas ilustradas. La 0 es la portada; el resto (`story`) muestran una
ilustración a pantalla completa con una o varias frases del diálogo.

| # | Carpeta | Día | Escena | Frases |
|---|---------|-----|--------|--------|
| 0 | `escene_0` | — | Portada: Delfos, Jenny y Yined, botón *Start the Trip* | — |
| 1 | `escene_1` | Day 1 | Athens Airport | 1 |
| 2 | `escene_2` | Day 1 | Around the City (recorren la calle en el carruaje) | 1 |
| 3 | `escene_3` | Day 1 | Acropolis & Parthenon | 1 |
| 4 | `escene_4` | Day 2 | Santorini · Oia & the Caldera | 3 |
| 5 | `escene_5` | Day 3 | Shops & the City | 2 |
| 6 | `escene_6` | Day 3 | Red Beach & Fira | 1 |
| 7 | `escene_7` | The End | Goodbye, Greece | 1 |

Son diez frases en total; el reparto está más abajo. En la última, el botón pasa
a ser *Travel Again ↻* y vuelve a la portada.

### Cómo añadir una escena nueva

Todo vive en el objeto `SCENES` de [assets/js/script.js](assets/js/script.js). Cada entrada declara
su propia carpeta de assets, así que renumerar es cambiar una cadena:

```js
1: {
  kind: 'story',
  folder: 'escene_1',
  day: 'Day 1',
  place: 'Athens Airport',
  cast: 'walk',                         // 'pose' | 'walk' | 'ride' | 'none'
  stage: { p1: { x: 36, y: 1, h: 63 },  // x, y en % · h en vh
           p2: { x: 58, y: 6, h: 55 } },
  lines: [{ who: 'p1', text: 'On our first day, we are going to arrive in Athens.' }],
},
```

- `cast: 'walk'` → las dos entran caminando, con rebote de paso y sombra de
  contacto, y luego pasan a un balanceo lento. Usa `p1.png` / `p2.png`.
- `cast: 'ride'` → un solo sprite combinado (`sprite: 'carraje.png'`) que recorre
  la escena siguiendo `ride.path`. Cada punto del camino lleva posición **y**
  tamaño, así que el sprite cambia de escala según la profundidad y las ruedas
  no quedan flotando. Es lo que usa la escena 2 con el carruaje.
  - `ride.loop: false` → hace el recorrido una sola vez, frena suavemente al
    llegar y se queda aparcado ahí hasta que se pulsa *Next*. Con `loop: true`
    (o sin la clave) da vueltas sin parar.
  - `ride.duration` → milisegundos que tarda el trayecto completo.
- `video: 'video.mp4'` → muestra la burbuja de vídeo (ver más abajo).
- `cast: 'pose'` → quietos, solo respiración.
- `cast: 'none'` → los personajes ya están pintados en el fondo (escenas 3 a 7).
- `enter: 'right'` → entran por la derecha en vez de por la izquierda. Ponlo
  según hacia dónde mire el dibujo (el caballo del carro mira a la izquierda).
- `stage` es lo que se ajusta para “ubicarlas bien” en cada fondo: `x` es el
  centro horizontal, `y` la separación del borde inferior y `h` la altura.
  Con `walk` lleva `{ p1, p2 }`; con `ride`, una sola posición.

Al añadir una escena, acuérdate de sumar su botón en el menú de
[index.html](index.html) (`.panel__item` con `data-target`).

## Tecnologías

- HTML5
- CSS3 (Google Fonts: Cinzel + Quicksand)
- JavaScript (vanilla)
- Canvas 2D

## Estructura

- [index.html](index.html): estructura, diálogo, menú y overlays.
- [assets/css/styles.css](assets/css/styles.css): paleta egea, actores, botones y paneles.
- [assets/js/script.js](assets/js/script.js): escenas, puesta en escena, diálogo y eventos.
- [assets/img](assets/img): fondos, personajes y vídeos por escena.
- [assets/sounds](assets/sounds): música de fondo.

```text
PRESENTACION GRECIA/
├── index.html
├── README.md
└── assets/
    ├── css/styles.css
    ├── js/script.js
    ├── img/escene_0 … escene_7/
    └── sounds/music.mp3
```

## Assets por escena

Cada carpeta `assets/img/escene_N/` admite:

| Archivo | Escenas | Obligatorio |
|---------|---------|-------------|
| `background.png` (o `.jpg`) | todas | recomendado |
| `p1.png` / `p2.png` | las que usen `cast: 'walk'` o `'pose'` | no |
| sprite suelto (ej. `carraje.png`) | las que usen `cast: 'ride'` | sí |
| `video.mp4` | las que declaren `video:` (3, 4, 5 y 6) | no |
| `p1_face.png` / `p2_face.png` | solo `escene_0` | sí (avatares del diálogo) |

Notas:

- Si falta un fondo, el canvas dibuja un **placeholder egeo** con el nombre de la
  escena y la ruta exacta del archivo que espera. Nada se rompe.
- Si una escena con `cast: 'walk'` no trae sus propios `p1.png` / `p2.png`, se
  reutilizan los de `escene_0` automáticamente.
- Los avatares `p1_face.png` / `p2_face.png` son recortes cuadrados de la cara.
  Para regenerarlos desde `p1.png` / `p2.png`:

  ```bash
  python -c "from PIL import Image; Image.open('p1.png').crop((380,0,940,560)).resize((420,420)).save('p1_face.png')"
  ```

- La música vive en `assets/sounds/music.mp3` y arranca en silencio: el botón 🔇
  la activa (los navegadores no dejan reproducir audio sin un clic previo).

Todas las escenas (0–7) tienen ya su fondo y su arte de personajes.

## Vídeos

Las escenas que declaran `video: 'video.mp4'` muestran una **burbuja circular**
abajo a la izquierda con el clip reproduciéndose en pequeño. Alrededor le salen
dos anillos que se expanden — el mismo gesto de invitación que los botones que
laten en PRESENTACION FLAM — para que se note que se puede pulsar. Al hacer clic
se abre en grande, centrado y enmarcado; se cierra con la ✕, con `Esc` o
pulsando en cualquier sitio.

Los clips **siempre van en bucle infinito y siempre en silencio**, y no hay forma
de activarles el sonido:

- No llevan controles nativos.
- Un listener de `volumechange` devuelve el vídeo a silencio si algo intenta
  subirle el volumen (por ejemplo el menú del botón derecho de Chrome, que
  permite mostrar los controles).
- El menú contextual sobre el vídeo está desactivado.

Solo se descarga el vídeo de la escena en la que estás: al cambiar de escena se
libera el anterior. Así los cuatro clips (unos 12 MB en total) nunca se cargan a
la vez.

Los actuales son verticales (720×1280); la vista ampliada se dimensiona por
altura, así que un clip horizontal también encajaría.

## Cómo ejecutar

Con Live Server en VS Code, o con cualquier servidor estático:

```bash
python -m http.server 5500
```

Luego abrir:

```text
http://127.0.0.1:5500
```

## Controles

- **Start the Trip** / **Next ▸** / **Day N ▸** / **Travel Again ↻**: avanzan la historia.
- **← Back**: escena anterior.
- **📍**: menú para saltar a cualquier escena.
- **🔇 / 🔊**: música de fondo (los vídeos no se ven afectados: van siempre mudos).
- **Burbuja de vídeo**: clic para ampliar; ✕, `Esc` o clic fuera para cerrar.
- **⛶**: pantalla completa (o la tecla `F`). El mismo botón sale de ella.
  En iPhone el botón no aparece: Safari no deja poner en pantalla completa nada
  que no sea un vídeo. Ahí se usa "Añadir a pantalla de inicio" para verlo sin
  las barras del navegador.
- **Teclado**: `Espacio`, `Enter` o `→` avanzan; `←` retrocede; `F` pantalla
  completa; `Esc` cierra overlays.

## Deep links

Útil para presentar o retomar en un punto concreto:

- `index.html?scene=4` abre directamente el Día 2.
- `index.html?scene=4&line=1` abre el Día 2 con la segunda frase ya en pantalla.
- `index.html?scene=2&t=0.4` congela el carruaje al 40 % de su recorrido. Es la
  forma cómoda de trazar un `ride.path` nuevo: vas probando valores de `t` y
  ajustas los puntos hasta que las ruedas pisen el suelo en todo el trayecto.

## Rendimiento

Cosas que están hechas a propósito y conviene no deshacer:

- **El canvas solo se repinta cuando cambia** (cambio de escena, fundido,
  resize, o un fondo que termina de cargar). Repintar un PNG de 2754×1536 en
  cada frame obligaba además a recalcular los desenfoques de los paneles que
  van encima.
- **Cada fondo se escala una sola vez** a un canvas fuera de pantalla del tamaño
  del viewport (`scaledBackground`), y a partir de ahí un fundido son dos
  volcados planos. Lo importante no es el reescalado en sí (medido: 3 ms por
  fundido) sino que ese canvas guarda su propio bitmap: pintar la escena 0 ya no
  puede obligar a **redecodificar** los 8,9 MB del PNG. El de la escena 0 se
  prepara al arrancar y nunca se descarta, porque *Travel Again* siempre vuelve
  ahí.
- **El arte de los personajes se precarga y decodifica al arrancar**, en tiempo
  libre, y las copias se guardan en `warmArtwork`. Los `<img>` de los actores se
  reutilizan entre escenas, así que al pulsar *Travel Again* apuntaban al
  carruaje y al aeropuerto: volver a decodificar los 5 MB de la portada justo en
  ese clic era lo que hacía pesado el reinicio.
- **Todas las animaciones mueven solo `transform` y `opacity`**, que el
  navegador resuelve en la GPU. Nada anima `box-shadow`, `left`, `width` ni
  `filter`, que fuerzan repintado o recálculo de layout.
- **El carruaje se mueve con `transform`**, no con `left`/`bottom`/`height`. Su
  ancho se calcula a partir de las proporciones del PNG en vez de leerlo del
  layout, así que no hay reflow en ningún frame.
- **`will-change` está acotado** a las clases que de verdad están animando
  (`.is-walking`, `.is-riding`, `.is-posing`), no puesto a lo bruto. Así el
  arte con `drop-shadow` se rasteriza una vez y luego solo se mueve la capa.
- **Solo se descarga el vídeo de la escena actual.**

## Notas

- Los overlays (menú y vídeo) **hacen scroll** cuando no caben. Un elemento
  centrado con flexbox que desborda no se puede desplazar hasta arriba, así que
  van alineados al inicio y centrados con `margin: auto`, que funciona en los dos
  casos. En móvil apaisado hay además un bloque `@media (max-height: 520px)` que
  compacta los paneles.
- El marco del vídeo lo dimensiona su título, que en un clip 9:16 es más ancho
  que el propio vídeo, así que **el vídeo va centrado dentro del marco**
  (`margin-inline: auto`). Es más simple que forzar el marco a encogerse.

- Diseñado para horizontal; en móvil en vertical aparece un aviso para rotar.
- Si una imagen no aparece, revisar nombre exacto, extensión y ruta.

## Reparto de frases

Quién dice qué, para ensayar:

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

Es decir: **Jenny** cuenta el día 1 entero, **Yined** los días 2 y 3 hasta las
compras, y **Jenny** cierra con Red Beach & Fira y la frase final.

Para cambiar el reparto, basta con cambiar el `who: 'p1'` / `who: 'p2'` de cada
línea en `SCENES` ([assets/js/script.js](assets/js/script.js)).
