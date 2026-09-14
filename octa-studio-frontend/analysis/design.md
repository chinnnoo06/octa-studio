# design.md — Superficie visual (color, relleno, bordes, imagen)

`design-analyst` · réplica de https://livinor.webflow.io/ (homepage)
Todo medido en `references/pages/home/computed-styles.json` (1285 nodos), `design-tokens.json` y muestreo de píxel sobre `screenshots/desktop.png` (1440×14463). Los crops usados son `crops/desktop/00-hero.png` … `10-footer.png`.

---

## 0. Reglas globales de superficie

### 0.1 Paleta de superficies (dónde se usa cada hex, medido)

| Hex | Token | Nº de nodos con ese `background-color` | Dónde exactamente |
|---|---|---|---|
| `#fef8f0` | `--page-color` | 4 | `body` (fondo global) + los **3 `.cover-image-wrap products`** (tarjetas de producto, que son cream sobre sección blanca) |
| `#ffffff` | `--white` | 18 | secciones `projects` y `products` completas · `.about-box one` · `.service-box` ×3 · `.choice-left-top` · `.center-logo-wrap` · `.products-category` ×3 · `.bottom-right-box` (hero) · `.arrow-div` ×6 |
| `#fae9ce` | `--card-color` | 15 | `.about-box four` · `.projects-info-box` ×4 · `.service-icon-box` ×3 · `.section no-padding` (franja de ofertas) · `.center-top-box` · `.cart-wrap` ×3 · `.blogs-mini-box` ×2 |
| `#ffd900` | `--yellow` | 12 | `.button-box` ×6 · `.cart-quantity` (badge del carrito) · `.yellow-circle` ×5 (puntos de "Step 0N") |
| `#000000` | `--black` | 9 | `.button-box black` ×2 · `.arrow-div white` ×2 (en reposo) · `.submit-button footer` · `.footer-social-box` ×4 |
| `#191919` | — | 2 | `.footer-text-field` (input) y `.footer-content-wrap` (caja Quick Links) |
| `#353535` | — | 1 | `.footer-line` (1320×1) |
| `#00ff37` | — | 1 | `.color-circle` ("Slots are available") |
| `#8e8e8e` | `--gray` | 16 | `.line-color one…eight` ×2 bloques — **no son barras visibles**, ver §0.5 |
| `#bfbfbf` | — | (solo bordes) | divisorias finas de `about` y `services` |
| `#dbdbdb` | — | (solo bordes) | borde de las tarjetas blancas del bento de `advantages` |

> **CORRECCIÓN IMPORTANTE al enunciado:** `#f1dfc2` (`--beige-color`) **NO se usa como fondo de ninguna tarjeta**. Aparece 4 veces y siempre como **color de texto** (`.yellow-span`): la segunda palabra de los títulos sobre fondo oscuro/imagen — "HOME" en el hero (130px) y "WITH PURPOSE" en `designcta` (24px). El único beige de tarjeta es `#fae9ce`.

### 0.2 Sombras
**No existe ni una sola `box-shadow` en toda la página.** `design-tokens.json → shadows: []`, y `getComputedStyle` no devolvió `boxShadow` en ningún nodo. Toda la separación es por color de fondo + borde de 1px. **No inventar sombras.**

### 0.3 Mapa completo de `border-radius`

| Valor | Componente(s) |
|---|---|
| `12px` | `.cover-image-wrap` **base** (todos los contenedores de imagen: about-us, process ×5, services, dot, corner-one/two/three, bottom ×2, testimonial ×4, blogs ×2, author-blog ×2, products ×3) · `.blogs-mini-box` ×2 · `.right-arrow` |
| `10px` | `.service-box` ×3 · `.choice-left-top` · `.choice-left-bottom` · `.center-top-box` · `.center-logo-wrap` · `.right-top-box` · `.right-bottom-wrap` · `.hero-slider` · `.cover-image-wrap inside` · `.footer-content-wrap` · `.left-arrow` |
| `50px` | pills: `.button-box` ×6, `.button-box black` ×2, `.submit-button footer`, `.footer-text-field` |
| `100%` | círculos: `.arrow-div` ×8, `.footer-social-box` ×4, `.yellow-circle` ×5, `.color-circle` |
| `14px` | `.service-icon-box` ×3 (el cuadrado beige de 150×150 con el icono) |
| `5px` | `.products-category` (pill blanca "Chair"/"Bed") |
| `6px` | `.cart-wrap` ×3 (bloque "Cart + cesta") |
| `9px` | `.cart-quantity` (badge amarillo del contador, 19×18 → es prácticamente un círculo) |
| `12px 0 0 12px` | `.projects-info-box` ×4 (tira beige vertical izquierda de la project card) |
| `0 12px 12px 0` | `.cover-image-wrap project` ×4 (la imagen a su derecha) |
| `10px 10px 0 0` | `.bottom-right-box` (marco blanco del slider del hero, pegado al borde inferior) |
| `0 0 10px` (solo BR) | `.about-box one` (blanca, arriba-izq) y `.about-box four` (beige, abajo-dcha) |
| `0 10px 0 0` (solo TR) | `.about-box two` (arriba-dcha) |
| `0 0 10px 10px` (BR+BL) | `.about-box three` (abajo-izq) |

Nota de fidelidad: `.left-arrow` = **10px** y `.right-arrow` = **12px**. Es una inconsistencia real del original; replicarla tal cual (o unificar a 12px y anotarlo).

### 0.4 Inventario completo de bordes (los únicos que existen)

| Elemento | `border-width` | `border-color` |
|---|---|---|
| `.button-box` (amarillo) ×6 | `1px` | `#000000` |
| `.button-box black` ×2 | `1px` | `#000000` |
| `.arrow-div white` ×2 (blogs) | `1px` | `rgba(0,0,0,0.6)` |
| `.submit-button footer` | `1px` | `#ffffff` |
| `.footer-social-box` ×4 | `1px` | `#ffffff` |
| `.choice-left-top`, `.center-logo-wrap` | `1px` | `#dbdbdb` |
| `.cover-image-wrap inside` (advantages) | `1px` | `#ffffff` |
| `.left-arrow` / `.right-arrow` | `3px` | `#ffffff` |
| `.cover-image-wrap hero` ×9 | `6px` | `#ffffff` |
| `.cover-image-wrap corner-one/two/three` | `8px` | `#ffffff` |
| `.hero-slider` | `10px` | `#ffffff` |
| `.about-box two` | `0 0 0 1px` (solo izq) | `#bfbfbf` |
| `.about-box three` | `1px 0 0` (solo sup) | `#bfbfbf` |
| `.about-box four` | `1px 0 0 1px` (sup+izq) | `#bfbfbf` |
| `.services-title` | `1px 0 0` (**línea horizontal superior**) | `#bfbfbf` |
| `.services-left-heading` | `0 1px 0 0` (**línea vertical**) | `#bfbfbf` |

Divisoria del footer: **no es un borde**, es un `div.footer-line` de `1320×1` con `background:#353535`, colocado justo encima de la fila de copyright (y=14293).

### 0.5 El truco gris de `about` y `services` (no son barras)
En `about` y en `services` hay `.text-color-box` con 8 hijos `.line-color one…eight`, cada uno de `630×50` (about) / `896×50` (services), `background-color: #8e8e8e`, con `transform: translateX(0% → 100%)` escalonado. Son **máscaras de blend** superpuestas al `<h3>` negro: mientras cubren el texto, éste se lee `#8e8e8e`; al deslizarse fuera queda negro. El efecto es coherente con `mix-blend-mode: lighten` (negro bajo #8e8e8e → #8e8e8e; `#fef8f0` bajo #8e8e8e → sigue `#fef8f0`).
**Estado final = texto 100 % negro.** El gris que se ve en el screenshot es el artefacto de captura que ya avisaba el briefing.

### 0.6 Overlays: sólo existen 8 en toda la página
Grep exhaustivo de `class="*overlay*"` en `dom.html`:

| Clase | Nº | Superficie | Dónde |
|---|---|---|---|
| `.services-overlay-box` | 4 | `rgba(0,0,0,0.3)` sólido, `position:absolute` | encima de las 4 imágenes de project card (555×800) |
| `.image-overlay` | 1 | `linear-gradient(3deg, rgba(0,0,0,0), rgba(0,0,0,0.6))` | `advantages` · tile inferior-izquierda (Modern sofa), 427×550 @y9118 |
| `.image-overlay right` | 1 | `rgba(0,0,0,0.4)` sólido | `advantages` · tile derecha-superior (A girl using a mobile), 427×560 @y8811 |
| `.image-overlay right-bottom` | 1 | `rgba(0,0,0,0.4)` sólido | `advantages` · tile derecha-inferior (Lamp light), 427×270 @y9391 |
| `.image-overlay-box` | 2 | `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8))` (a 180°, de arriba transparente a abajo 80 %) | `blogs` · las 2 imágenes grandes 888×500 |
| `.video-overlay-box` | 1 | (dentro del megamenú, sobre el vídeo de fondo) | navbar |

**Los dos gradientes que menciona el enunciado quedan asignados así:**
- `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8))` → **sólo `blogs`**, las dos `.image-overlay-box`. Sirve para que el título blanco y la fecha se lean sobre la foto.
- `linear-gradient(3deg, rgba(0,0,0,0), rgba(0,0,0,0.6))` → **sólo `advantages`**, la tile "UNIQUE DESIGN ASTHETIC".

Los overlays son `position:absolute` sin radio propio; heredan el recorte del padre, que sí tiene `border-radius` + `overflow:hidden`.

### 0.7 Las secciones oscuras NO llevan overlay CSS
`process`, `testimonials` y `footer` tienen `background-color: rgba(0,0,0,0)` y **ningún hijo overlay**. La oscuridad viene de la propia fotografía. Medias RGB reales de los ficheros:

| Sección | Imagen (en `assets/images/`) | Dimensiones | Media RGB | Píxel muestreado en el screenshot |
|---|---|---|---|---|
| `process` | `6968e39fddd365cef79bc77b_Our_Journey_BG_Image.webp` | 5760×3474 | `rgb(12,12,12)` → `#0c0c0c` | `#0a0a0a` – `#1c1c1c` |
| `testimonials` | `69410f005c9286e5b09611b7_Modern_Home_with_black_background.webp` | 5760×2880 | `rgb(21,21,21)` → `#151515` | `#080808` – `#161618` |
| `footer` | `6912fa809f02fc5d2cce0aad_Image_with_a_black_background.webp` | 5760×2202 | `rgb(9,9,9)` → `#090909` | `#030401` – `#080a04` |

**Recomendación para la réplica:** poner esos hex como `background-color` de la sección *debajo* de la imagen, para que no haya flash cream antes de que cargue y para que el borde de la sección no se vea claro.

Parámetros de fondo medidos:
- `process`: `background-size: cover; background-position: 0px 0px`
- `testimonials`: `cover; 50% 50%`
- `footer`: **`background-size: contain; background-position: 50% 50%`** → la imagen (5760×2202, ratio 2.62) se ajusta al ancho y **se repite verticalmente**; de ahí la textura de paneles verticales que se ve repetida en el crop.
- `hero`: `cover; 50% 50%` sobre `693680636730b565d87eb29c_Hero_Banner.webp` (4800×2393, media `rgb(124,119,109)`)
- `designcta`: `cover; 50% 50%` sobre `693fff177c2cdb5efbec2282_Home_BG.webp` (3840×1760, media `rgb(85,70,56)`) — **sin overlay**, el pardo del crop es la foto.

---

## 1. `hero` (y=0, h=972)

- **Fondo:** imagen `Hero_Banner.webp` a `cover / 50% 50%`, sección con `background-color: transparent`, `min-height: 950px`, `margin-bottom: 100px`.
- **Navbar (dos capas translúcidas apiladas, no una):**
  - `.hero-navbar-wrap` 1440×70 → `rgba(0,0,0,0.15)`
  - `.hero-navbar` 1440×70 (dentro) → `rgba(0,0,0,0.2)`, `padding: 0 60px`
  - Efecto compuesto ≈ `rgba(0,0,0,0.32)` sobre la foto. Sin borde inferior.
- **Marco del slider (esquina inferior derecha):**
  - `.bottom-right-box` 690×422 @ (750,550) — `background:#ffffff`, `border-radius: 10px 10px 0 0`, `overflow:hidden`. Es el "papel" blanco que sangra contra el borde inferior de la sección.
  - `.hero-slider` 690×422 — `border: 10px solid #ffffff`, `border-radius:10px`, `overflow:hidden`.
  - `.cover-image-wrap hero` ×9 (360×402) — `border: 6px solid #ffffff`, `border-radius:10px`. Los 6px+6px entre slides crean las canaletas blancas visibles.
- **Marca fantasma:** `.livinor-icon` 197×197 @ (1183,153) = `69382301e2b188bb55506503_Livinor.svg` → dos anillos casi blancos (`#ececec`) con rombo pardo (`#5f5a52`) en la intersección.
- **Líneas verticales con estrella:** `.right-icon` ×2, 22×300, en (1146,150) y (60,611). Asset `6938291cca3b79e21723bc5c_Right Icon.svg` → **NO descargado** (ver §8).
- **Tipo:** título 130px blanco + `.yellow-span` `#f1dfc2` en "HOME".
- Sin tarjetas, sin `#fae9ce` en esta sección.

## 2. `about` (y=1072, h=1100 — el briefing lo lista en 972)

- **Fondo:** ninguno propio → hereda `#fef8f0` del body. `padding: 100px 0 150px`.
- **Rejilla 2×2 de stats** (cada celda 315×425/426, arranca en x=750):

| Celda | Posición | `background` | `border-radius` | `border` |
|---|---|---|---|---|
| `.about-box one` | (750,1172) arriba-izq | `#ffffff` | `0 0 10px 0` (solo esquina inferior-derecha) | ninguno |
| `.about-box two` | (1065,1172) arriba-dcha | transparente (`#fef8f0`) | `0 10px 0 0` (solo superior-derecha) | `1px` **izquierda** `#bfbfbf` |
| `.about-box three` | (750,1597) abajo-izq | transparente (`#fef8f0`) | `0 0 10px 10px` (BR + BL) | `1px` **arriba** `#bfbfbf` |
| `.about-box four` | (1065,1597) abajo-dcha | `#fae9ce` | `0 0 10px 0` (solo inferior-derecha) | `1px` **arriba + izquierda** `#bfbfbf` |

  Sólo la celda blanca y la beige tienen relleno; las otras dos son el cream de página. Las 1px `#bfbfbf` forman la cruz interior de la rejilla.
- **Imagen:** `.cover-image-wrap about-us` 630×425 @y1597, `border-radius:12px`, `overflow:hidden`, sin borde.
- **Botón** "Want Design": pill amarillo estándar (§6.1), 147×54.
- **Badge:** `.color-circle` 10×10, `background:#00ff37`, `border-radius:100%`, junto al texto "Slots are available" (`#575757`, 16px).
- **Eyebrow:** `.sub-text` Inter 16/600 `#000000` + icono lottie (§7.1).
- Reveal gris/negro: ver §0.5.

## 3. `projects` (y=2172, h=2393)

- **Fondo de sección:** `#ffffff` sólido (`.section white more-top`, `padding: 150px 0`).
- **Project card** (645×800, 4 unidades) = dos piezas pegadas:
  - `.projects-info-box` 90×800 — `background:#fae9ce`, `border-radius: 12px 0 0 12px`, `padding: 0 30px`. Contiene el nombre y el año rotados 90° (`.h6 rotate`, 8 nodos: nombre + año por tarjeta), texto negro.
  - `.cover-image-wrap project` 555×800 — `border-radius: 0 12px 12px 0`, `overflow:hidden`, sin borde.
  - `.services-overlay-box` 555×800 `position:absolute` — `rgba(0,0,0,0.3)` **plano** sobre la foto (no gradiente).
- **Título:** segunda palabra ("work") en `.h2 tab-center color` = `#8e8e8e`, 72px/600.
- **Botón** "View All Projects": pill amarillo, 178×54.
- **Cursor:** `.box-arrow` (21×21, `fill:currentcolor`) dentro de `.project-mouse-move-element` ×4 — flecha que sigue al ratón.

## 4. `process` (y=4565, h=1207) — OSCURA

- **Fondo:** `6968e39fddd365cef79bc77b_Our_Journey_BG_Image.webp`, `cover`, `background-position: 0px 0px`, `padding: 150px 0`. **Sin overlay CSS.** Fallback sólido recomendado `#0c0c0c`.
- **Imágenes de paso:** `.cover-image-wrap process` ×5, `border-radius:12px`, `overflow:hidden`, sin borde ni overlay.
- **Badge de paso:** `.yellow-circle` 10×10 `#ffd900` `border-radius:100%` + `.step-text` "Step 01…05" Inter 16/600 `#ffd900`.
- **Eyebrow:** `.sub-text white` (blanco, 16/600) + `.mini-icon w-embed` 32×32 con `fill="white"` hard-codeado (no lottie aquí).
- **Conectores en codo con punta de flecha:** `.step-box-arrow w-embed`, SVG `viewBox="0 0 170 164"`, renderizado a **100×100**. Estructura: `<line>` horizontal superior de x=170 a x=10 + `<path>` vertical de (10,0) a (10,160) + cabeza de flecha abajo. `stroke="currentcolor"` y el wrapper tiene **`color: rgb(97,97,97)` = `#616161`** → línea fina gris.
  - Hay **4** en el DOM: `.process-element one`, `.process-element two`, `.process-element three land-hide`, `.process-element dex-hide`. En desktop se ven **3** (la `dex-hide` es sólo móvil, la `land-hide` se oculta en landscape/tablet).
  - Ficheros ya extraídos: `assets/svgs/inline-15.svg`, `inline-16.svg`, `inline-17.svg`.

## 5. `services` (y=5772, h=1546)

- **Fondo:** ninguno → `#fef8f0`. `padding: 150px 0 100px`, `overflow: hidden` (para el marquee).
- **Las dos líneas divisorias que pide el enunciado:**
  - **Horizontal superior:** `.services-title` 1320×318 @y5922 con `border-top: 1px solid #bfbfbf`. Cruza todo el contenedor.
  - **Vertical:** `.services-left-heading` 384×317 @ (60,5923) con `border-right: 1px solid #bfbfbf`, separando la columna del eyebrow+imagen del titular grande.
- **Imagen pequeña:** `.cover-image-wrap services` 290×185, `border-radius:12px`.
- **Tarjetas de servicio** ×3, `.service-box` 420×546:
  - `background: #ffffff` (sobre cream) · `border-radius: 10px` · `padding: 60px 20px` · **sin borde, sin sombra**.
  - Dentro, `.service-icon-box` 150×150 — `background: #fae9ce`, `border-radius: 14px`, centra un `<img>` SVG de 60-ish px.
  - Iconos (assets externos, ya descargados):
    · LIGHTING SOLUTIONS → `69423058398f41474dca7705_Lighting_Solutions.svg` (**capas/stack**, 3 rombos apilados, trazo negro)
    · SPACE PLANNING → `69423047d935dbdc19a0da64_Space_Planning.svg` (**cubo isométrico** con aristas internas)
    · FURNITURE STYLING → `694230244830e94cdcaccba1_Furniture_Styling.svg` (**diamante/gema** facetada)
- **Botón** "View All Services": pill amarillo, 182×54.
- **Marquee de 2 filas** (96px): separador = `.livinor-slider-icon w-embed` ×27, SVG `viewBox="0 0 116 116"` renderizado a **110×110**, dos anillos entrelazados con rombo hueco, **trazo `#8f8f8f`** (píxel muestreado en (711,7040) = `#8f8f8f`). Texto negro `#000000`.
- Reveal gris/negro en el titular: ver §0.5.

## 6. `designcta` (y=7318 en el briefing; en `sections.json` se ha partido en `designcta` 7638–8083 + `offers` 8303–8394)

### 6a. Bloque de imagen
- `.section design` — imagen `693fff177c2cdb5efbec2282_Home_BG.webp`, `cover / 50% 50%`, `min-height: 880px`, `padding: 100px 0`, `margin-top: 100px`. **Sin overlay y sin color de fondo.**
- El bbox capturado es `720×443 @ (360,7639)` porque estaba a mitad de una animación de reveal (escala/ancho). El estado final es a sangre completa (1440).
- Elementos: `.design-line-image`/`.design-line` 8×215 (`693ffc6679e77a57310cea6e_Home_Design.webp`, línea vertical blanca con estrella arriba y abajo), título blanco 96px + `.yellow-span` `#f1dfc2` en el eyebrow "WITH PURPOSE", y un pill amarillo "Lets Talk" (medido `59×27` por la misma animación; real ≈ 132×54).

### 6b. Franja de ofertas
- `.section no-padding` 1440×91 @y8303 — `background: #fae9ce`, `padding: 30px 0`, `overflow:hidden`, `margin-bottom:100px`. **Sin bordes ni radios.**
- Texto negro 24px. Separadores `+ +` = `.slider-icon w-embed` ×48, SVG 17×17 `fill="currentcolor"` con `color: #575757` (verificado por píxel: `#575757`). Son cruces finas, **no amarillas**.

## 7. `advantages` (y=8494, h=1324)

- **Fondo:** ninguno → `#fef8f0`. `padding: 100px 0 150px`.
- **Bento** (3 columnas de 427px):

| Tile | bbox | Superficie | Radio | Borde | Overlay |
|---|---|---|---|---|---|
| `.choice-left-top` | 427×287 @(60,8811) | `#ffffff` | `10px` | `1px #dbdbdb` | — |
| `.choice-left-bottom` | 427×550 @(60,9118) | img `6940d4c3e305c857d94848ee_Modern_sofa.webp` `cover/50% 50%` | `10px`, `overflow:hidden` | — | `.image-overlay` `linear-gradient(3deg, rgba(0,0,0,0), rgba(0,0,0,0.6))` |
| `.center-top-box` | 427×270 @(507,8811) | `#fae9ce` | `10px`, `overflow:hidden` | — | — |
| `.center-logo-wrap` | 427×270 @(507,9101) | `#ffffff` | `10px` | `1px #dbdbdb` | — |
| `.right-top-box` | 427×560 @(953,8811) | img `6940e9338ef49addc78cb2b8_A_girl_using_a_mobile.webp` `cover` | `10px`, `overflow:hidden` | — | `.image-overlay right` `rgba(0,0,0,0.4)` plano |
| `.right-bottom-wrap` | 427×270 @(953,9391) | img `6940eecbbd830ae82c3dc5c0_Lamp_light.webp` `cover` | `10px`, `overflow:hidden` | — | `.image-overlay right-bottom` `rgba(0,0,0,0.4)` plano |

- **Marcos blancos gruesos:** `.cover-image-wrap corner-one/two/three` (197×228, 197×228, 192×215) con `border: 8px solid #ffffff` y `border-radius:12px`, superpuestas en escalera dentro de `.center-top-box`.
- **Marco fino blanco:** `.cover-image-wrap inside` 387×294 con `border: 1px solid #ffffff`, `border-radius: 10px`, dentro de `.right-top-box`.
- **Imágenes pequeñas inferiores:** `.cover-image-wrap bottom` ×2, 203×270, `border-radius:12px`, sin borde.
- **Badge rotatorio:** `.cover-image dot` 261×261 (contenedor `.cover-image-wrap dot` 205×205 `border-radius:12px`) = `6940d3a93a674f22487b13f1_Dot_Image.svg` → **12 puntos redondeados en anillo con degradado de opacidad** de negro (arriba-dcha) a casi blanco (abajo-izq); rota, y el texto "DESIGNS STARK DESIGNS" gira dentro.
- **Marca gris:** `.center-logo w-embed` SVG 178×178 renderizado 175×184, `fill:currentcolor` con **`color: rgb(143,143,143)` = `#8f8f8f`** → los dos anillos entrelazados grises de la tarjeta central.
- **Sparkle:** `.right-corner-icon w-embed` SVG 43×43 renderizado 51×51, `color:#ffffff` — estrella de 4 puntas alargada sobre "ATTENTION TO DETAILS".
- Título: segunda palabra "us" en `#8e8e8e`.

## 8. `products` (y=9818, h=1316)

- **Fondo de sección:** `#ffffff` (`.section white products`, `padding: 150px 0`).
- **Product card:** `.cover-image-wrap products` 420×665 — **`background: #fef8f0`** (cream de página sobre blanco), `border-radius: 12px`, `overflow:hidden`, sin borde ni sombra.
- **Badge de categoría:** `.products-category` 80×38 — `background:#ffffff`, `border-radius: 5px`, `padding: 7px 20px`, texto Inter 16/400 `#000000` ("Chair", "Bed"). Anclada arriba-izquierda con 20px de margen.
- **Bloque Cart:** `.cart-wrap` 137×65 — `background:#fae9ce`, `border-radius: 6px`, `padding: 10px 20px`. Texto "Cart" negro + `.cart-icon-wrapper` 45×45 con dos SVG apilados de cesta 43×43: `.cart-icon-home black` (`color:#000`, `opacity:1`) y `.cart-icon-home white` (`color:#fff`, `opacity:0`) → intercambio en hover.
- **Botón** "View More": pill amarillo, 132×54.
- Precio en `#575757` 16px, título negro Sora.

## 9. `testimonials` (y=11134, h=931) — OSCURA

- **Fondo:** `69410f005c9286e5b09611b7_Modern_Home_with_black_background.webp`, `cover / 50% 50%`, `padding: 150px 0 100px`. **Sin overlay CSS.** Fallback `#151515`.
- **Slider:** `.slider w-slider` 1320×487, `background: rgba(255,255,255,0)` → totalmente transparente, sin tarjeta.
- **5 estrellas:** `.star w-embed` ×20 (5 por cada uno de los 4 testimonios), SVG 20×20 `fill:currentcolor` con **`color: rgb(255,217,0)` = `#ffd900`** (verificado por píxel: `#ffd900`). Estrella de 5 puntas **sólida**, no outline.
- **Flechas cuadradas outline blancas:** `.left-arrow` / `.right-arrow` 60×60, `background: transparent`, `border: 3px solid #ffffff`, `border-radius: 10px` (izq) / `12px` (dcha). Dentro, `.slide-icon w-embed` SVG `viewBox="0 0 16 31"` renderizado **25×30**, chevron grueso de puntas redondeadas, `color:#ffffff`. Posiciones: x=60 y x=1320, y=11692 (fuera del contenido, a los bordes del contenedor de 1320).
- **Dots:** existen en el markup (`.slide-nav w-slider-nav w-round w-num` con 4 `.w-slider-dot`, uno `w-active`) pero **no aparecen en el screenshot desktop ni en `computed-styles.json`** → están ocultos en desktop. Duda anotada en §10.
- **Avatar:** `.cover-image-wrap testimonial` 260×190, `border-radius:12px`, sin borde.
- Textos: cita y nombre en `#ffffff`; rol ("Decorator") en `.paragraph yellow` = `#ffd900`.

## 10. `blogs` (y=12066, h=1647)

- **Fondo:** ninguno → `#fef8f0`. `padding: 150px 0 100px`.
- **Imagen grande:** `.cover-image-wrap blogs` 888×500, `border-radius:12px`, `overflow:hidden`.
  - `.image-overlay-box` `position:absolute` 888×500 con **`linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8))`** (vertical, transparente arriba → 80 % negro abajo). Sobre él, título blanco 40px y fecha blanca.
- **Tarjeta de autor:** `.blogs-mini-box` / `.blogs-mini-box last` 402×500 — `background: #fae9ce`, `border-radius: 12px`, `padding: 40px`, **sin borde**.
  - `.cover-image-wrap author-blog` 150×150, `border-radius:12px`.
- **Botón negro "Read More"** (§6.2), 133×54.
- **Icono calendario:** `.time-icon w-embed` SVG 30×30, `fill:currentcolor`, `color:#ffffff`, dentro de `.date-wrap` sobre la imagen.
- Título: segunda palabra "Insights" en `#8e8e8e`.

## 11. `footer` (y=13713, h=750) — OSCURA

- **Fondo:** `6912fa809f02fc5d2cce0aad_Image_with_a_black_background.webp` con **`background-size: contain`** y `background-position: 50% 50%` → se repite (de ahí los paneles verticales). `padding: 100px 0`, `margin-top: 100px`. Fallback `#090909`.
- **Logo:** `.footer-image` 220×70 = `691302abdb4a70fb8ab08fa9_Livinor_Footer_Image.png` → anillos **amarillos `#ffd900`** con rombo negro + wordmark "LIVINOR" blanco.
- **Sociales:** `.footer-social-box` ×4, 75×75 @y13905, x = 735 / 830 / 925 / 1020 → `background:#000000`, `border: 1px solid #ffffff`, `border-radius: 100%`. Icono `.social-icon w-embed` SVG 35×35, `fill:currentcolor`, `color:#ffffff`: **Facebook (f sólida), Twitter (pájaro clásico, no la X), LinkedIn (in), Instagram (cámara outline)**.
- **Caja Quick Links:** `.footer-content-wrap` 645×205 @(735,14030) — `background: #191919`, `border-radius: 10px`, `padding: 50px 20px`. Encabezado `.h6 yellow` = `#ffd900` 24px/600; enlaces blancos 16px.
- **Formulario (input con botón embebido):**
  - `.footer-text-field` 635×58 @(60,14177) — `background: #191919`, `border-radius: 50px`, `padding: 0 12px 0 20px`, texto/placeholder `#333333` 14px/400. Sin borde.
  - `.submit-button footer` 143×54 @(552,14181) — **está dentro** del input (x552–695 cae en el rango 60–695): `background: #000000`, `border: 1px solid #ffffff`, `border-radius: 50px`, `padding: 14px 24px`, texto `#ffffff` Inter 16/500. **Esta es la variante "pill blanco outline".**
- **Línea antes del copyright:** `.footer-line` 1320×1 @(60,14293), `background: #353535`.
- **Copyright:** `.paragraph footer` `#d7d7d7`; enlaces `.bottom-link` ("Theme Sleek", "Webflow") en `#ffd900`.

---

## 12. Botones — las 4 variantes

### 12.1 Pill amarillo `.button-white` (6 usos: hero, about, projects, services, designcta, products)
Anatomía: `<a class="button-white">` → `<div class="button-box">` (texto) + `<div class="arrow-div">` (círculo con flecha).

| Pieza | Valor medido |
|---|---|
| `.button-white` (wrapper) | `display:flex; align-items:center; justify-content:center`, alto `54px`, ancho = box + 52 (ej. hero: 201 = 149 + 52) |
| `.button-box` | `background: #ffd900` · `border: 1px solid #000000` · `border-radius: 50px` · `padding: 14px 24px` · alto `54px` · `position:relative; z-index:1` |
| `.button-text` | Inter **16px / 500** / `line-height 24px` / `color:#000000`, sin uppercase |
| `.arrow-div` | **52×52** reales · `background:#ffffff` · `border-radius: 100%` · sin borde |
| `.button-icon` (SVG) | `25×25` viewBox, `fill:currentcolor`, `color:#000000` → flecha diagonal ↗ |
| Anchos por instancia | hero 149 · about 147 · projects 178 · services 182 · products 132 · designcta ≈132 (medido 59×27 por la animación) |

**Estados (IX2, ya confirmado por el briefing y verificado en los inline-styles del DOM):**
- Base CSS (= móvil, sin IX2): `.button-box` **blanco**, `.arrow-div` **amarillo** y visible.
- Reposo desktop (inline que escribe IX2): `.button-box { background:#ffd900 }`, `.arrow-div { background:#fff; opacity:0; transform: translate3d(-105%,0,0) scale3d(.75,.75,1) }` → **sólo se ve el pill amarillo con borde negro** (39×39 es el tamaño *visual* del círculo escalado, 52 el real).
- Hover: box → `#ffffff`, `.arrow-div` → `opacity:1; translate 0; scale 1`. Resultado: pill blanco con borde negro + círculo blanco con flecha negra.

### 12.2 Pill negro `.button-black` — "Read More" (2 usos, blogs)
| Pieza | Valor |
|---|---|
| `.button-box black` | `background:#000000` (inline IX2) · `border: 1px solid #000000` · `border-radius:50px` · `padding: 14px 24px` · `133×54` |
| `.button-text white` | Inter 16/500 `#ffffff` |
| `.arrow-div white` | `52×52` · `border-radius:100%` · **en reposo** `background:#000000` (inline) + `border: 1px solid rgba(0,0,0,0.6)` · `opacity:0`, mismo `translate(-105%) scale(.75)` |
| `.button-icon black` | SVG 25×25 `color:#000000` |
Base CSS de `.arrow-div white` es blanco → en hover el conjunto pasa a blanco/negro invertido, igual patrón que 12.1.

### 12.3 Pill blanco outline — `.submit-button footer`
`143×54` · `background:#000000` · `border: 1px solid #ffffff` · `border-radius: 50px` · `padding: 14px 24px` · texto Inter **16/500** `#ffffff`. Va **embebido en el extremo derecho del input** de 635px.

### 12.4 Flechas cuadradas outline del carrusel — `.left-arrow` / `.right-arrow`
`60×60` · `background: transparent` · `border: 3px solid #ffffff` · `border-radius: 10px` (izq) y `12px` (dcha) · sin padding · icono `.slide-icon` 25×30 blanco (SVG propio `viewBox 0 0 16 31`, chevron de trazo grueso con remates redondos) · `font-size` heredado 40px (irrelevante, el glyph es SVG).

---

## 13. Badges y pills pequeñas

| Badge | Medidas | Superficie | Radio | Texto | Dónde |
|---|---|---|---|---|---|
| Categoría de producto | `80×38`, `padding 7px 20px` | `#ffffff` | `5px` | Inter 16/400 `#000000` | `.products-category` ×3, esquina sup-izq de la product card |
| Contador del carrito | `19×18` | `#ffd900` | `9px` | negro, ~11px | `.w-commerce-commercecartopenlinkcount cart-quantity`, solapa el icono del carrito (x1346,y21) |
| Punto "Slots are available" | `10×10` | `#00ff37` | `100%` | — | `.color-circle`, sección `about` |
| Punto "Step 0N" | `10×10` | `#ffd900` | `100%` | — | `.yellow-circle` ×5, sección `process`; junto a `.step-text` Inter 16/600 `#ffd900` |
| Bloque "Cart" | `137×65`, `padding 10px 20px` | `#fae9ce` | `6px` | "Cart" negro 16px + cesta 43px | `.cart-wrap` ×3 |
| Caja de icono de servicio | `150×150` | `#fae9ce` | `14px` | — | `.service-icon-box` ×3 |

---

## 14. Iconografía — inventario completo y qué hacer con cada uno

Los SVG inline usan **`fill="currentcolor"`** y toman el color del wrapper (`.xxx w-embed { color: … }`). En React eso se traduce directamente a `currentColor` + una clase de texto.

### 14.1 Inline SVG (extraídos en `references/pages/home/assets/svgs/`)

| Clase wrapper | Nº | viewBox | Render | `color` | Qué es | Fichero(s) extraído(s) | Recomendación |
|---|---|---|---|---|---|---|---|
| `.button-icon w-embed` | 8 | `0 0 25 25` | 19×19 (9×9 en designcta) | `#000000` | **Flecha diagonal ↗** de los botones | `inline-5/7/11/21/49.svg` | **Mantener SVG propio** — el trazo es macizo y particular; `lucide ArrowUpRight` no coincide |
| `.button-icon black w-embed` | 2 | `0 0 25 25` | 19×19 | `#000000` | misma flecha, botones negros | — | mismo |
| `.box-arrow w-embed` | 4 | `0 0 21 21` | — | currentColor | flecha del cursor sobre project cards | — | Mantener |
| `.dropdown-arrow white w-embed` | 1 | `0 0 16 16` | 16×16 | `#ffffff` | chevron ▼ del item "Pages" | `inline-0.svg` | **Sustituible por `lucide ChevronDown`** |
| `.mini-icon w-embed` | 2 | `0 0 32 32` | 32×32 | `fill="white"` hard-codeado | Icono eyebrow (rombo/diamante) versión estática blanca — `process` y `testimonials` | `inline-14.svg` | **Mantener SVG propio** (marca) |
| `.step-box-arrow w-embed` | 4 | `0 0 170 164` | 100×100 | `#616161` | **Conector en codo con punta de flecha** de `process` | `inline-15/16/17.svg` | **Mantener SVG propio** — no existe equivalente lucide |
| `.livinor-slider-icon w-embed` | 27 | `0 0 116 116` | 110×110 | `#8f8f8f` (medido) | **Anillos entrelazados** = separador del marquee de `services` | `inline-22…48.svg` | **Mantener SVG propio** (es la marca) |
| `.slider-icon w-embed` | 48 | `0 0 17 17` | 17×17 | `#575757` | **`+`** separador del marquee de ofertas | `inline-50…79.svg` | Sustituible por `lucide Plus` (o 2 rects CSS) |
| `.star w-embed` | 20 | `0 0 20 20` | 20×20 | `#ffd900` | **Estrella sólida de 5 puntas** ×5 por testimonio | no extraído | `lucide Star` con `fill="#ffd900" stroke="none"` funciona bien |
| `.social-icon w-embed` | 4 | `0 0 35 35` | 35×35 | `#ffffff` | Facebook · Twitter (pájaro) · LinkedIn · Instagram | no extraído | **No usar lucide** (no trae marcas). Usar `react-icons/fa` o copiar los paths del `dom.html` |
| `.time-icon w-embed` | 2 | `0 0 30 30` | 30×30 | `#ffffff` | **Calendario** outline (fecha del blog) | no extraído | `lucide Calendar` es visualmente equivalente |
| `.cart-icon-home black/white w-embed` | 3+3 | `0 0 43 43` | 45×45 | `#000` / `#fff` (op.0) | **Cesta de la compra** de la product card | no extraído | `lucide ShoppingBasket` se aproxima; mejor copiar el path |
| `.center-logo w-embed` | 1 | `0 0 178 178` | 175×184 | `#8f8f8f` | Anillos entrelazados grises (tile central de `advantages`) | no extraído | Mantener SVG propio |
| `.right-corner-icon w-embed` | 1 | `0 0 43 43` | 51×51 | `#ffffff` | **Sparkle de 4 puntas** en "ATTENTION TO DETAILS" | no extraído | `lucide Sparkle` se aproxima; el original es más estirado |
| `.slide-icon w-embed` | 2 | `0 0 16 31` | 25×30 | `#ffffff` | **Chevron ‹ ›** de las flechas del carrusel | no extraído | `lucide ChevronLeft/Right` con `strokeWidth` alto — buen sustituto |

### 14.2 Assets externos (imágenes/SVG por `<img>`)

| Clase | Fichero | Tamaño render | Qué es |
|---|---|---|---|
| `.nav-image` | `696b3aa1a4ece1d9ba79012c_Livinor_Black.svg` (176×55) | 170×55 | **Logo de navbar. Ojo: el nombre engaña — es la versión BLANCA**: anillos con trazo blanco, rombo **negro** en la intersección, wordmark "LIVINOR" blanco |
| `.footer-image` | `691302abdb4a70fb8ab08fa9_Livinor_Footer_Image.png` (218×72) | 220×70 | Logo de footer: anillos **`#ffd900`**, rombo negro, wordmark blanco |
| `.livinor-icon` | `69382301e2b188bb55506503_Livinor.svg` (197×197) | 197×197 | Marca fantasma del hero: anillos `#ececec`, rombo pardo `#5f5a52` |
| `.cover-image dot` | `6940d3a93a674f22487b13f1_Dot_Image.svg` (205×205) | 261×261 | Anillo de 12 puntos con degradado de gris; **rota** |
| `.service-icon-image service` ×3 | `Lighting_Solutions.svg` (capas) · `Space_Planning.svg` (cubo) · `Furniture_Styling.svg` (diamante) | ~60px | Iconos de las 3 tarjetas de servicio, trazo negro |
| `.design-line` | `693ffc6679e77a57310cea6e_Home_Design.webp` | 8×215 | Línea vertical blanca con estrella arriba/abajo (`designcta`) |
| `.right-icon` ×2 | `6938291cca3b79e21723bc5c_Right Icon.svg` | 22×300 | Línea vertical + estrella arriba/abajo (hero) — **FALTA descargar** |
| `.cart-icon` | `6939666fd9197e1281b08f60_White Cart Icon.png` | 30×30 | **Carrito** de la navbar (outline blanco) — **FALTA descargar**. Sustituible por `lucide ShoppingCart` |
| `.cart-icon white hide` | `6913282294c2df4236e0b206_Cart Icon.png` | oculto | variante negra del carrito — **FALTA descargar** |

### 14.3 Icono del eyebrow — resumen
Hay **8 eyebrows** (`.mini-heading-wrap` ×8). De ellos:
- **6 usan un Lottie**: `data-src=".../692e9875b32d3ca619c825fb_Livnor Icon.lottie"`, `autoplay`, `loop`, `duration 0.833s`, `renderer:svg`, todos con el mismo `data-w-id`. Secciones: `about`, `projects`, `services`, `advantages`, `products`, `blogs`. Es el rombo/diamante animado que en el screenshot aparece unas veces como `⟨◇⟩` y otras como `◇` (fotogramas distintos).
- **2 usan SVG estático blanco** (`.mini-icon w-embed`, 32×32, `fill="white"`): `process` y `testimonials` (los `.sub-text white`).
- Texto del eyebrow: `.sub-text` Inter **16/600**, `#000000`; variante `.sub-text white` → `#ffffff`.
- **El `.lottie` NO está descargado.** Para la réplica: usar el SVG estático (`inline-14.svg`) en todos los eyebrows y, si se quiere el movimiento, animarlo con framer-motion (rotación/escala suave).

---

## 15. Detalles de superficie que se pierden si no se anotan

1. La navbar del hero son **dos capas** de negro translúcido apiladas (0.15 + 0.2), no una sola de 0.35.
2. El marco del hero-slider es **borde blanco de 10px** sobre `.hero-slider` + **6px** en cada slide → la canaleta blanca entre imágenes mide 12px.
3. Las tarjetas de producto son **cream sobre blanco** (`#fef8f0` sobre `#ffffff`), un contraste muy bajo — es intencional.
4. `.about-box one` es la **única** celda blanca de la rejilla 2×2 y `.about-box four` la única `#fae9ce`; las otras dos son el cream de página.
5. Los radios de las 4 `.about-box` son asimétricos y en parte "hacia dentro" (`one` y `four` sólo redondean su esquina inferior-derecha). Reproducirlos literales.
6. `.left-arrow` 10px vs `.right-arrow` 12px — inconsistencia real del original.
7. `.submit-button` va **dentro** del `.footer-text-field`, no al lado.
8. La línea horizontal de `services` (`border-top` de `.services-title`) y la vertical (`border-right` de `.services-left-heading`) comparten el mismo `#bfbfbf` que la cruz interior de la rejilla de `about`. Un solo token de "hairline".
9. `#8f8f8f` (anillos del marquee y del bento) y `#8e8e8e` (`--gray`/`--span-color`) **son colores distintos** por 1 unidad. En el sitio conviven; se pueden unificar a `#8e8e8e` sin coste perceptible, pero conviene dejarlo escrito.
10. Fuera del ámbito estricto de superficie, pero relevante para los tokens: `--beige-color #f1dfc2` sólo se usa como color de texto.

---

## 16. Dudas y huecos (no inventar)

1. **3 assets no descargados**: `6938291cca3b79e21723bc5c_Right Icon.svg`, `6939666fd9197e1281b08f60_White Cart Icon.png`, `6913282294c2df4236e0b206_Cart Icon.png`. Tampoco el `.lottie` del eyebrow. Hay que reconstruirlos (§14.2 / §14.3) o volver a crawlear.
2. **Estados hover**: `references/pages/home/hover-states/index.json` tiene 7 entradas y **todas con `changed: []` y `screenshot: null`** → no se capturó ningún hover real. Los estados hover de §12 están **deducidos** de los inline-styles que IX2 escribe en reposo y del nombre de las clases base (`button-white`, `arrow-div white`). Deberían verificarse en vivo.
3. **Dots del carrusel de testimonios**: el markup existe (`.slide-nav w-slider-nav w-round w-num` + 4 `.w-slider-dot`) pero no aparecen ni en el screenshot ni en `computed-styles.json` → asumo `display:none` en desktop. Sin confirmar su superficie (color activo/inactivo).
4. **Panel del megamenú**: `.megamenu-dropdown` sólo tiene el toggle medido; el panel desplegado (con `<video>` de fondo y `.video-overlay-box`) no está en `computed-styles.json`. Superficies del panel **sin medir**.
5. **`mix-blend-mode` de `.line-color`**: `getComputedStyle` no capturó esa propiedad. `lighten` es la única que reproduce el resultado observado (negro→`#8e8e8e`, cream→cream), pero es inferencia.
6. **Bboxes contaminadas por animación**: `.section design` (720×443 en vez de 1440×~880), el `.button-box` de designcta (59×27 en vez de ~132×54) y `.cover-image-wrap process` (380×95) están a mitad del reveal. Los colores/radios sí son válidos; las **medidas** no.
7. **`sections.json` ha cambiado** respecto al briefing: ahora tiene **12** entradas (parte `designcta` en `designcta` 7638–8083 + `offers` 8303–8394) y `about` empieza en 1072, no 972. He documentado los 11 bloques del briefing tratando la franja de ofertas como §6b.
8. **Nota factual sobre el hallazgo #6 del briefing**: los 8 nodos con clase `rotate` son `.h6 rotate` y están en **`projects`** (nombre + año verticales de cada project card, x=89 y x=764), no en `advantages`. El badge rotatorio de `advantages` es `.cover-image dot` (`Dot_Image.svg`) + texto circular.

---

```json
{
  "sections": [
    {
      "name": "hero",
      "bg": "image:693680636730b565d87eb29c_Hero_Banner.webp (cover, 50% 50%); background-color transparent",
      "overlay": "navbar: .hero-navbar-wrap rgba(0,0,0,0.15) + .hero-navbar rgba(0,0,0,0.2) apiladas (1440x70). El resto de la seccion sin overlay",
      "cardBg": "#ffffff (.bottom-right-box, marco del slider)",
      "radius": {".bottom-right-box": "10px 10px 0 0", ".hero-slider": "10px", ".cover-image-wrap hero": "10px", ".button-box": "50px", ".arrow-div": "100%", ".cart-quantity": "9px"},
      "borders": [".hero-slider 10px solid #ffffff", ".cover-image-wrap hero 6px solid #ffffff", ".button-box 1px solid #000000"],
      "notas": "Titulo 130px blanco con segunda parte #f1dfc2. Marca fantasma Livinor.svg 197x197 (anillos #ececec, rombo #5f5a52). 2x .right-icon 22x300 (asset NO descargado). Badge carrito #ffd900 r9px."
    },
    {
      "name": "about",
      "bg": "#fef8f0 (heredado del body)",
      "overlay": null,
      "cardBg": {".about-box one": "#ffffff", ".about-box two": "transparent", ".about-box three": "transparent", ".about-box four": "#fae9ce"},
      "radius": {".about-box one": "0 0 10px 0", ".about-box two": "0 10px 0 0", ".about-box three": "0 0 10px 10px", ".about-box four": "0 0 10px 0", ".cover-image-wrap about-us": "12px", ".button-box": "50px", ".color-circle": "100%"},
      "borders": [".about-box two border-left 1px #bfbfbf", ".about-box three border-top 1px #bfbfbf", ".about-box four border-top+left 1px #bfbfbf"],
      "notas": "Rejilla 2x2 de 315x425 desde x=750. Punto verde #00ff37 10x10. Reveal gris via 8 .line-color de #8e8e8e con mix-blend-mode lighten; estado final texto negro."
    },
    {
      "name": "projects",
      "bg": "#ffffff",
      "overlay": ".services-overlay-box rgba(0,0,0,0.3) plano sobre las 4 imagenes 555x800",
      "cardBg": "#fae9ce (.projects-info-box, tira vertical 90x800)",
      "radius": {".projects-info-box": "12px 0 0 12px", ".cover-image-wrap project": "0 12px 12px 0", ".button-box": "50px"},
      "borders": [".button-box 1px solid #000000"],
      "notas": "Card = 90 beige + 555 imagen = 645x800. Texto vertical .h6 rotate negro. Segunda palabra del titulo #8e8e8e."
    },
    {
      "name": "process",
      "bg": "image:6968e39fddd365cef79bc77b_Our_Journey_BG_Image.webp (cover, 0px 0px); fallback solido #0c0c0c",
      "overlay": null,
      "cardBg": null,
      "radius": {".cover-image-wrap process": "12px", ".yellow-circle": "100%"},
      "borders": [],
      "notas": "Seccion oscura SIN overlay CSS: la foto ya es negra (media rgb(12,12,12)). Punto #ffd900 10x10 + .step-text #ffd900 16/600. Conectores .step-box-arrow viewBox 170x164 render 100x100, stroke currentcolor con color #616161; 4 en DOM, 3 visibles en desktop."
    },
    {
      "name": "services",
      "bg": "#fef8f0",
      "overlay": null,
      "cardBg": "#ffffff (.service-box) + #fae9ce (.service-icon-box)",
      "radius": {".service-box": "10px", ".service-icon-box": "14px", ".cover-image-wrap services": "12px", ".button-box": "50px"},
      "borders": [".services-title border-top 1px #bfbfbf (linea horizontal)", ".services-left-heading border-right 1px #bfbfbf (linea vertical)"],
      "notas": "Tarjetas 420x546 padding 60px 20px, sin borde ni sombra. Iconos externos: Lighting_Solutions.svg (capas), Space_Planning.svg (cubo), Furniture_Styling.svg (diamante). Marquee 96px con separador .livinor-slider-icon 110x110 color #8f8f8f."
    },
    {
      "name": "designcta",
      "bg": "image:693fff177c2cdb5efbec2282_Home_BG.webp (cover, 50% 50%) + franja .section no-padding #fae9ce 1440x91",
      "overlay": null,
      "cardBg": "#fae9ce (franja de ofertas)",
      "radius": {".button-box": "50px", ".section no-padding": "0"},
      "borders": [".button-box 1px solid #000000"],
      "notas": "Sin overlay: el pardo es la foto (media rgb(85,70,56)). Eyebrow 'WITH PURPOSE' en #f1dfc2. Franja de ofertas con separadores '+' (.slider-icon 17x17) en #575757, texto negro 24px. bbox 720x443 contaminada por animacion de reveal."
    },
    {
      "name": "advantages",
      "bg": "#fef8f0",
      "overlay": {".image-overlay": "linear-gradient(3deg, rgba(0,0,0,0), rgba(0,0,0,0.6)) sobre Modern_sofa 427x550", ".image-overlay right": "rgba(0,0,0,0.4) sobre A_girl_using_a_mobile 427x560", ".image-overlay right-bottom": "rgba(0,0,0,0.4) sobre Lamp_light 427x270"},
      "cardBg": {".choice-left-top": "#ffffff", ".center-top-box": "#fae9ce", ".center-logo-wrap": "#ffffff"},
      "radius": {"tiles bento": "10px", ".cover-image-wrap corner-*": "12px", ".cover-image-wrap inside": "10px", ".cover-image-wrap bottom": "12px", ".cover-image-wrap dot": "12px"},
      "borders": [".choice-left-top 1px #dbdbdb", ".center-logo-wrap 1px #dbdbdb", ".cover-image-wrap corner-one/two/three 8px solid #ffffff", ".cover-image-wrap inside 1px solid #ffffff"],
      "notas": "Bento 3 columnas de 427px. Badge rotatorio = Dot_Image.svg 205x205 (12 puntos con degradado gris->negro). .center-logo SVG 178x178 color #8f8f8f. Sparkle .right-corner-icon 43x43 blanco."
    },
    {
      "name": "products",
      "bg": "#ffffff",
      "overlay": null,
      "cardBg": "#fef8f0 (.cover-image-wrap products, cream sobre blanco)",
      "radius": {".cover-image-wrap products": "12px", ".products-category": "5px", ".cart-wrap": "6px", ".button-box": "50px"},
      "borders": [".button-box 1px solid #000000"],
      "notas": "Card 420x665. Badge categoria blanco 80x38 padding 7px 20px. Bloque Cart #fae9ce 137x65 padding 10px 20px con cesta 43x43 negra (+ variante blanca opacity 0 para hover). Precio #575757."
    },
    {
      "name": "testimonials",
      "bg": "image:69410f005c9286e5b09611b7_Modern_Home_with_black_background.webp (cover, 50% 50%); fallback solido #151515",
      "overlay": null,
      "cardBg": "ninguno — .slider tiene background rgba(255,255,255,0)",
      "radius": {".cover-image-wrap testimonial": "12px", ".left-arrow": "10px", ".right-arrow": "12px"},
      "borders": [".left-arrow / .right-arrow 3px solid #ffffff"],
      "notas": "Seccion oscura SIN overlay (media rgb(21,21,21)). 5 estrellas .star SVG 20x20 solidas #ffd900. Flechas 60x60 en x=60 y x=1320. Chevron .slide-icon viewBox 16x31 render 25x30 blanco. Rol 'Decorator' en #ffd900. Dots presentes en el markup pero ocultos en desktop."
    },
    {
      "name": "blogs",
      "bg": "#fef8f0",
      "overlay": ".image-overlay-box linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8)) sobre las 2 imagenes 888x500",
      "cardBg": "#fae9ce (.blogs-mini-box 402x500, padding 40px)",
      "radius": {".cover-image-wrap blogs": "12px", ".blogs-mini-box": "12px", ".cover-image-wrap author-blog": "12px", ".button-box black": "50px", ".arrow-div white": "100%"},
      "borders": [".button-box black 1px solid #000000", ".arrow-div white 1px solid rgba(0,0,0,0.6)"],
      "notas": "Boton negro 'Read More' 133x54 texto blanco. Icono calendario .time-icon 30x30 blanco. Segunda palabra 'Insights' #8e8e8e."
    },
    {
      "name": "footer",
      "bg": "image:6912fa809f02fc5d2cce0aad_Image_with_a_black_background.webp con background-size CONTAIN y position 50% 50% (se repite); fallback solido #090909",
      "overlay": null,
      "cardBg": "#191919 (.footer-content-wrap 645x205 y .footer-text-field 635x58)",
      "radius": {".footer-content-wrap": "10px", ".footer-text-field": "50px", ".submit-button footer": "50px", ".footer-social-box": "100%"},
      "borders": [".footer-social-box 1px solid #ffffff", ".submit-button footer 1px solid #ffffff"],
      "notas": "Linea antes del copyright = div .footer-line 1320x1 background #353535 en y=14293 (NO es un border). 4 sociales 75x75 negros con borde blanco, iconos 35x35 blancos (fb, twitter clasico, linkedin, instagram). 'QUICK LINKS' #ffd900 24/600. Placeholder del input #333333 14px. Copyright #d7d7d7 con enlaces #ffd900. Logo = Livinor_Footer_Image.png (anillos #ffd900)."
    }
  ],
  "buttons": [
    {
      "name": "pill-yellow",
      "class": ".button-white > .button-box + .arrow-div",
      "count": 6,
      "box": {"bg": "#ffd900", "border": "1px solid #000000", "radius": "50px", "padding": "14px 24px", "height": "54px"},
      "text": {"family": "Inter", "size": "16px", "weight": 500, "lineHeight": "24px", "color": "#000000"},
      "arrow": {"size": "52x52", "bg": "#ffffff", "radius": "100%", "icon": "SVG 25x25 flecha diagonal, currentColor #000000", "restState": "opacity 0, translate3d(-105%,0,0) scale(.75)"},
      "widths": {"hero": 149, "about": 147, "projects": 178, "services": 182, "products": 132, "designcta": "~132 (medido 59 por animacion)"},
      "hover": "box -> #ffffff, arrow-div -> opacity 1 / translate 0 / scale 1 (deducido, no capturado)",
      "mobileBase": "box #ffffff, arrow-div #ffd900 y visible (CSS base sin IX2)"
    },
    {
      "name": "pill-black",
      "class": ".button-black > .button-box black + .arrow-div white",
      "count": 2,
      "box": {"bg": "#000000", "border": "1px solid #000000", "radius": "50px", "padding": "14px 24px", "size": "133x54"},
      "text": {"family": "Inter", "size": "16px", "weight": 500, "color": "#ffffff"},
      "arrow": {"size": "52x52", "bg": "#000000 (inline en reposo; base CSS blanco)", "border": "1px solid rgba(0,0,0,0.6)", "radius": "100%", "icon": "SVG 25x25 currentColor #000000"},
      "where": "blogs — 'Read More'"
    },
    {
      "name": "pill-white-outline",
      "class": ".submit-button.footer.w-button",
      "count": 1,
      "box": {"bg": "#000000", "border": "1px solid #ffffff", "radius": "50px", "padding": "14px 24px", "size": "143x54"},
      "text": {"family": "Inter", "size": "16px", "weight": 500, "color": "#ffffff"},
      "where": "footer — 'Submit Now', embebido dentro del input de 635px (x552-695)"
    },
    {
      "name": "square-outline-arrow",
      "class": ".left-arrow.w-slider-arrow-left / .right-arrow.w-slider-arrow-right",
      "count": 2,
      "box": {"bg": "transparent", "border": "3px solid #ffffff", "radius": "10px (izq) / 12px (dcha)", "size": "60x60"},
      "icon": {"class": ".slide-icon w-embed", "viewBox": "0 0 16 31", "render": "25x30", "color": "#ffffff", "shape": "chevron grueso con remates redondos"},
      "where": "testimonials, en x=60 y x=1320, y=11692"
    }
  ],
  "badges": [
    {"name": "product-category", "class": ".products-category", "size": "80x38", "bg": "#ffffff", "radius": "5px", "padding": "7px 20px", "text": "Inter 16/400 #000000"},
    {"name": "cart-count", "class": ".cart-quantity", "size": "19x18", "bg": "#ffd900", "radius": "9px", "text": "negro ~11px", "where": "navbar, solapa el icono del carrito"},
    {"name": "slots-dot", "class": ".color-circle", "size": "10x10", "bg": "#00ff37", "radius": "100%", "where": "about"},
    {"name": "step-dot", "class": ".yellow-circle", "size": "10x10", "bg": "#ffd900", "radius": "100%", "count": 5, "where": "process, junto a .step-text #ffd900 16/600"},
    {"name": "cart-block", "class": ".cart-wrap", "size": "137x65", "bg": "#fae9ce", "radius": "6px", "padding": "10px 20px"},
    {"name": "service-icon-box", "class": ".service-icon-box", "size": "150x150", "bg": "#fae9ce", "radius": "14px"}
  ],
  "icons": [
    {"name": "logo-navbar", "type": "img", "asset": "696b3aa1a4ece1d9ba79012c_Livinor_Black.svg", "render": "170x55", "desc": "dos anillos entrelazados trazo BLANCO + rombo negro + wordmark LIVINOR blanco (el nombre del fichero engaña)", "action": "usar tal cual"},
    {"name": "logo-footer", "type": "img", "asset": "691302abdb4a70fb8ab08fa9_Livinor_Footer_Image.png", "render": "220x70", "desc": "anillos #ffd900 + rombo negro + wordmark blanco", "action": "usar tal cual"},
    {"name": "logo-ghost-hero", "type": "img", "asset": "69382301e2b188bb55506503_Livinor.svg", "render": "197x197", "desc": "anillos #ececec, rombo #5f5a52", "action": "usar tal cual"},
    {"name": "eyebrow-diamond", "type": "lottie+svg", "asset": "692e9875b32d3ca619c825fb_Livnor Icon.lottie (NO descargado) / assets/svgs/inline-14.svg (version blanca estatica)", "render": "32x32", "desc": "rombo/diamante de marca; 6 eyebrows lo usan animado, 2 (process, testimonials) usan SVG estatico fill=white", "action": "mantener SVG propio; animar con framer-motion si se quiere el loop"},
    {"name": "arrow-up-right", "type": "inline-svg", "asset": "assets/svgs/inline-5|7|11|21|49.svg", "viewBox": "0 0 25 25", "render": "19x19 (9x9 en designcta)", "color": "currentColor", "desc": "flecha diagonal de los botones", "action": "mantener SVG propio (lucide ArrowUpRight no coincide)"},
    {"name": "process-connector", "type": "inline-svg", "asset": "assets/svgs/inline-15|16|17.svg", "viewBox": "0 0 170 164", "render": "100x100", "color": "#616161", "desc": "codo (linea horizontal + vertical) con punta de flecha", "action": "mantener SVG propio, sin equivalente lucide"},
    {"name": "marquee-rings", "type": "inline-svg", "asset": "assets/svgs/inline-22..48.svg", "viewBox": "0 0 116 116", "render": "110x110", "color": "#8f8f8f", "count": 27, "desc": "anillos entrelazados, separador del marquee de services", "action": "mantener SVG propio"},
    {"name": "marquee-plus", "type": "inline-svg", "asset": "assets/svgs/inline-50..79.svg", "viewBox": "0 0 17 17", "render": "17x17", "color": "#575757", "count": 48, "desc": "cruz '+' separadora del marquee de ofertas", "action": "sustituible por lucide Plus"},
    {"name": "star", "type": "inline-svg", "class": ".star w-embed", "viewBox": "0 0 20 20", "render": "20x20", "color": "#ffd900", "count": 20, "desc": "estrella solida de 5 puntas, 5 por testimonio", "action": "lucide Star con fill=#ffd900 stroke=none"},
    {"name": "chevron-slider", "type": "inline-svg", "class": ".slide-icon w-embed", "viewBox": "0 0 16 31", "render": "25x30", "color": "#ffffff", "count": 2, "desc": "chevron grueso de las flechas del carrusel", "action": "lucide ChevronLeft/Right con strokeWidth alto"},
    {"name": "calendar", "type": "inline-svg", "class": ".time-icon w-embed", "viewBox": "0 0 30 30", "render": "30x30", "color": "#ffffff", "count": 2, "desc": "calendario outline junto a la fecha del blog", "action": "lucide Calendar (equivalente visual)"},
    {"name": "cart-basket", "type": "inline-svg", "class": ".cart-icon-home black|white", "viewBox": "0 0 43 43", "render": "45x45", "color": "#000000 / #ffffff(op 0)", "desc": "cesta de la compra de la product card, con swap en hover", "action": "copiar path del dom.html; lucide ShoppingBasket se aproxima"},
    {"name": "cart-navbar", "type": "img", "asset": "6939666fd9197e1281b08f60_White Cart Icon.png (NO descargado)", "render": "30x30", "desc": "carrito outline blanco de la navbar", "action": "sustituir por lucide ShoppingCart"},
    {"name": "social", "type": "inline-svg", "class": ".social-icon w-embed", "viewBox": "0 0 35 35", "render": "35x35", "color": "#ffffff", "count": 4, "desc": "Facebook, Twitter (pajaro clasico), LinkedIn, Instagram", "action": "NO usar lucide (sin marcas): react-icons/fa o copiar paths"},
    {"name": "center-logo-gray", "type": "inline-svg", "class": ".center-logo w-embed", "viewBox": "0 0 178 178", "render": "175x184", "color": "#8f8f8f", "desc": "anillos entrelazados grises, tile central del bento", "action": "mantener SVG propio"},
    {"name": "sparkle", "type": "inline-svg", "class": ".right-corner-icon w-embed", "viewBox": "0 0 43 43", "render": "51x51", "color": "#ffffff", "desc": "estrella de 4 puntas estirada en 'ATTENTION TO DETAILS'", "action": "lucide Sparkle se aproxima; el original es mas alargado"},
    {"name": "dropdown-chevron", "type": "inline-svg", "class": ".dropdown-arrow white", "viewBox": "0 0 16 16", "render": "16x16", "color": "#ffffff", "desc": "chevron abajo del item 'Pages'", "action": "lucide ChevronDown"},
    {"name": "service-layers", "type": "img", "asset": "69423058398f41474dca7705_Lighting_Solutions.svg", "desc": "3 rombos apilados (capas), trazo negro", "action": "usar tal cual"},
    {"name": "service-cube", "type": "img", "asset": "69423047d935dbdc19a0da64_Space_Planning.svg", "desc": "cubo isometrico con aristas internas", "action": "usar tal cual"},
    {"name": "service-diamond", "type": "img", "asset": "694230244830e94cdcaccba1_Furniture_Styling.svg", "desc": "diamante/gema facetada", "action": "usar tal cual"},
    {"name": "dot-ring", "type": "img", "asset": "6940d3a93a674f22487b13f1_Dot_Image.svg", "render": "261x261", "desc": "12 puntos en anillo con degradado de gris a negro; rota", "action": "usar tal cual"},
    {"name": "line-with-star", "type": "img", "asset": "6938291cca3b79e21723bc5c_Right Icon.svg (NO descargado) y 693ffc6679e77a57310cea6e_Home_Design.webp", "render": "22x300 / 8x215", "desc": "linea vertical blanca con estrella arriba y abajo", "action": "reconstruir con CSS + lucide Sparkle, o re-crawlear el asset"}
  ],
  "globals": {
    "shadows": "NINGUNA en toda la pagina (design-tokens.json shadows: [])",
    "hairline": "#bfbfbf (divisorias de about y services)",
    "cardBorder": "#dbdbdb (tarjetas blancas del bento de advantages)",
    "footerDivider": "#353535",
    "beigeCorrection": "#f1dfc2 NO se usa como fondo; solo como color de texto (.yellow-span) en hero y designcta",
    "grayDuplicate": "#8f8f8f (anillos/marquee) coexiste con #8e8e8e (--gray/--span-color)",
    "darkSectionFallbacks": {"process": "#0c0c0c", "testimonials": "#151515", "footer": "#090909"}
  }
}
```
