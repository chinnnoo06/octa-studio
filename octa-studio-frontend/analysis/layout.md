# layout.md — Geometría y estructura (homepage Livinor)

Fuentes: `references/pages/home/computed-styles.json` (bbox reales del screenshot desktop 1440),
`references/pages/home/screenshots/*.png` (escaneo de píxeles con sharp) y **el CSS original del sitio**
(`livinor.webflow.shared.b013c6ece.css`, 245 KB, descargado y parseado — de ahí salen todos los
breakpoints y overrides que aparecen abajo). Todo lo que dice "medido" viene de bbox; todo lo que
lleva `[<=991]` etc. viene del CSS real, no de estimación.

> **Nota de método:** los `bbox` del JSON están en píxeles del screenshot; los `styles` NO están
> escalados (son los valores CSS usados). La única sección con transform de escala activo en la
> captura es `designcta` (ver §6).

---

## 0. Sistema global

### 0.1 Dimensiones de página

| Viewport | Ancho | Alto total | Gutter | Ancho de contenido |
|---|---|---|---|---|
| Desktop | 1440 | 14463 | 60 | **1320** |
| Tablet | 768 | 12238 | 40 | **688** |
| Móvil | 375 | 8318 | 20 | **335** |

### 0.2 Container (¡ojo, no es 1320 fijo!)

```css
.container { width:100%; max-width:1820px; margin-inline:auto;
             padding-inline: var(--gap-container); }   /* 60 / 40 / 30 / 20 */
```

El contenido máximo real es **1700px** (1820 − 2×60), no 1320. A 1440 de viewport el contenido
mide 1320 porque el padding se come 120. Muchos layouts internos repiten `max-width:1700px`
(`navbar-layout`, `about-us-layout`, `home-projects-layout` implícito) — a 1440 nunca se activa.

Tailwind: `w-full max-w-[1820px] mx-auto px-[var(--gap-container)]`.

Variantes de container:
- `.container.hero` → `max-width:1920px; padding-inline:0` (hero full-bleed).
- `.container.no-padding` → `padding-inline:0` (base) / 40 / 30 / 20. **No se usa en la home**;
  la banda del marquee usa `.container` normal.

### 0.3 Breakpoints REALES del sitio

Solo hay tres media queries (todas `max-width`), las estándar de Webflow:

```
@media screen and (max-width: 991px)   → "tablet"          (el sitio la llama tab)
@media screen and (max-width: 767px)   → "landscape/móvil" (el sitio la llama land)
@media screen and (max-width: 479px)   → "móvil portrait"  (el sitio la llama mobile)
```

No existen breakpoints min-width por encima de 992 (no hay 1280/1440/1920).
El screenshot de **tablet 768 cae en el bucket `<=991`** (no en `<=767`), y el de
**móvil 375 cae en `<=479`** (le aplican los tres buckets acumulados).

Para Tailwind v4 (CSS-first) define variantes max-width en `globals.css`:

```css
@custom-variant tab  (@media (max-width: 991px));
@custom-variant land (@media (max-width: 767px));
@custom-variant mob  (@media (max-width: 479px));
```

### 0.4 Tokens de gap — **CAMBIAN por breakpoint** (crítico)

El `body` redefine las variables en cada media query:

| Variable | ≥992 | ≤991 | ≤767 | ≤479 |
|---|---|---|---|---|
| `--_gap---big-section` | **150** | 80 | 60 | 40 |
| `--_gap---section` | **100** | 80 | 60 | 40 |
| `--_gap---layout` | **80** | 60 | 40 | 30 |
| `--_gap---container` (gutter) | **60** | 40 | 30 | 20 |

Implementación recomendada (espejo exacto del original):

```css
:root { --gap-big:150px; --gap-section:100px; --gap-layout:80px; --gap-container:60px; }
@media (max-width:991px){ :root{ --gap-big:80px; --gap-section:80px; --gap-layout:60px; --gap-container:40px } }
@media (max-width:767px){ :root{ --gap-big:60px; --gap-section:60px; --gap-layout:40px; --gap-container:30px } }
@media (max-width:479px){ :root{ --gap-big:40px; --gap-section:40px; --gap-layout:30px; --gap-container:20px } }
```

### 0.5 Ritmo vertical por sección (desktop) — medido

`.section { padding-block: var(--gap-section) }` (100) y cada modificador lo ajusta:

| # | Sección | clases | y | alto | padding-top | padding-bottom | margin | bg |
|---|---|---|---|---|---|---|---|---|
| 0 | hero | `section hero` | 0 | 972 | 0 | 0 | **mb 100** | img cover, min-h 950 |
| 1 | about | `section more` | 1072 | 1100 | **100** | **150** | — | transparente (cream del body) |
| 2 | projects | `section white more-top` | 2172 | 2393 | **150** | **150** | — | `#fff` |
| 3 | process | `section image process` | 4565 | 1207 | **150** | **150** | — | img cover, `background-position:0 0` |
| 4 | services | `section overflow` | 5772 | 1546 | **150** | **100** | — | transparente · `overflow:hidden` |
| 5a | designcta | `section design` | **7418** | **885.4** | **100** | **100** | **mt 100** | img cover, min-h 880, `z-index:100` |
| 5b | marquee ofertas | `section no-padding` | 8303 | 91 | **30** | **30** | **mb 100** | `#fae9ce` · `overflow:hidden` |
| 6 | advantages | `section choice` | 8494 | 1324 | **100** | **150** | — | transparente |
| 7 | products | `section white products` | 9818 | 1316 | **150** | **150** | — | `#fff` |
| 8 | testimonials | `section testimonials` | 11134 | 931 | **150** | **100** | — | img cover 50% 50% |
| 9 | blogs | `section blogs` | 12066 | 1547 | **150** | **100** | — | transparente |
| 10 | footer | `section foter` | 13713 | 750 | **100** | **100** | **mt 100** | img `background-size:contain` 50% 50% |

En tablet/móvil todos esos 150/100 colapsan a 80 / 60 / 40 automáticamente (son variables).
Overrides puntuales: `[<=991] .section.foter{margin-top:0; padding-bottom:20px}`,
`[<=991] .section.no-padding{margin-bottom:0}`, `[<=991] .section.design{margin-top:0}`,
`[<=767] .section.no-padding{padding-block:20px}`, `[<=479] .section.testimonials{padding-bottom:60px}`.

Alturas mínimas responsivas: hero 950 → 600 (≤991) → 400 (≤767) → 520 (≤479);
design 880 → 500 → 350 → 300.

### 0.6 Utilidades de breakpoint que usa el DOM

| clase | comportamiento real (del CSS) | dónde aparece en la home |
|---|---|---|
| `land-hide` | `display:none` **solo `<=767`** | botón "View All Services" (services), 2ª imagen de `center-bottom-wrap` (se oculta ya en `<=991` por regla propia), `process-element.three/.four` (re-mostrados con `display:block` en `<=767`) |
| `land-hide-text` | `.paragraph.white.land-hide-text{display:none}` en `<=767` y `<=479` | cita del testimonial |
| `dex-hide` | `display:none` en base; se re-activa abajo | `left-text-wrap.dex-hide` (bloque móvil del hero, `display:flex` en `<=767`); `process-element.dex-hide` (**nunca se muestra**, sigue en none en todos los BP) |
| `button-hide` | `display:none` base → `display:block` en `<=767` | botón "All Services" dentro de la caja izquierda de services |
| `hide` | `.blank.hide{display:none}` en `<=991` | hueco del grid de process |
| `land` | `.paragraph.land{display:none}` en `<=767` | párrafos de las 4 stats de about y descripciones de las 3 service-cards |
| `tab-center` | `text-align:center` en `<=991` | h2 de todos los títulos de sección |
| `mobile-center` | `text-align:center` en `<=479` | h6 del bloque móvil del hero |
| `tab-hide` | `display:none` en `<=991` | no se usa en la home |

**No hay `mobile-hide` en el CSS.**

### 0.7 z-index y solapamientos

| elemento | z | posición |
|---|---|---|
| `.navbar.hero.w-nav` | 1000 | relative |
| `.navbar-link-wrap.hero` | 1500 (5000 en `<=991`) | relative |
| `.megamenu-dropdown` | 900 (100 en `<=991`) | relative |
| `.section.design` | **100** | static (crea contexto sobre las secciones vecinas) |
| `.section.hero`, `.section.projects` | 5000 **solo `<=991`** | — |
| `.button-box` (interior del botón) | 1 | relative (la `.arrow-div` va detrás y sale por la derecha) |
| `.slider-mask` | 1 · `.left-arrow` 3 · `.right-arrow` 4 | absolute |
| `.left-text-box`, `.right-content-box`, `.right-corner-wrap`, `.cover-image-wrap.corner-two` | 1 | relative/absolute sobre las imágenes del bento |
| `.center-top-text` | 10 | relative (sobre las fotos rotadas del bento) |

**Solapamientos reales (solo 3):**
1. **Hero**: la tarjeta blanca del slider (`bottom-right-box`, 690×422) se apoya sobre la foto del
   hero y queda **a ras del borde inferior** de la sección (y 550→972 = exactamente el fondo).
   Verificado por escaneo de píxeles: la foto del hero termina en y=974 y el marco blanco llega
   hasta ahí. **No invade la sección siguiente**; el efecto de "solape" es el radio superior
   `10px 10px 0 0` + `overflow:hidden` que corta el marco abajo.
2. **designcta** (ver §6): escala animada, no es un inset real.
3. **advantages / projects**: overlays absolutos dentro de cards (`image-overlay`, `services-overlay-box`)
   — no salen de su caja.

Ningún elemento es `sticky` ni `fixed` en reposo (confirmado en el briefing y en computed-styles).

### 0.8 Alturas de imagen — están FIJADAS en CSS (no son aspect-ratio)

| clase | desktop | ≤991 | ≤767 | ≤479 |
|---|---|---|---|---|
| `.cover-image.hero` | h 390 (wrap 360 ancho, border 6px) | 250 | 150 | 100 (wrap min-w 120 / max-w 180, border 3px) |
| `.cover-image.about-us` | h 425 (630 ancho) | 400 | 300 | 250 |
| `.cover-image.project` | h 800 (555 ancho) | 400 | 200 | 200 |
| `.cover-image.process` | h 95, min-w 200 | 150, min-w auto | 200 | 200 |
| `.cover-image.services` | h 185 (290 ancho) | — | — | 200 |
| `.cover-image.dot` | 205×205 | 180×180 | 150×150 | — |
| `.cover-image.bottom` | h 270 (203 ancho) | 350 | 300 | (wrap `display:none`) |
| `.cover-image.products` | `object-fit:contain`, max-w 380, h 400 | max-w 200, h 200 | — | h 150 |
| `.cover-image.testimonial` | h 190 (260 ancho) | — | — | — |
| `.cover-image.blogs` | h 500 (888 ancho) | 400 | 300 | 250 |
| `.cover-image.inside` (bento) | h auto (387×294) | — | 160 | — |

`.cover-image-wrap` genérico: `border-radius:12px; width:100%; height:100%; overflow:hidden`.

---

## 1. Sección 0 — `hero` (y 0–972, h 972)

```
section.hero  [1440×972, min-h 950, mb 100, bg url(Hero Banner.webp) cover 50%/50%, padding 0]
└ div.container.hero  [max-w 1920, px 0]  → full-bleed
  ├ div.hero-navbar-wrap  [1440×70, bg rgba(0,0,0,.15), backdrop-blur(20px)]
  │ └ div.hero-navbar     [flex, justify-center, items-center, px 60, bg rgba(0,0,0,.2), blur 20px]
  │   └ div.navbar-layout.home [w-full max-w 1700 → 1320, flex row, justify-between, items-center, gap 40, min-h 70]
  │     ├ a.navbar-left      [logo img 170×55 @ x60 y8]
  │     ├ div.navbar-middle  [max-w 515 → x506..1021; nav flex justify-between gap 30, 5 items de 24px de alto @y23]
  │     └ div.navbar-right   [cart 82×48 @x1298 y11; py 9 px 15; icono 30×30; badge 19×18 r9 bg #ffd900, mt -10 ml 3]
  └ div.hero-content-box  [flex col, justify-between, gap 100, mt 80, h 100% → y150..972 (822)]
    ├ div.hero-top  [w-full max-w 1475, px 60, flex row, justify-between, items-start, gap 40, h 300 @y150]
    │ ├ div.hero-text-wrap [max-w 998, overflow hidden → 998×286 @x60]  h1 130px/110% text-align:RIGHT
    │ └ div.top-right-box  [234 ancho @x1146, flex row gap 15 items-center]
    │   ├ img.right-icon      [22×300]
    │   └ div.right-info-wrap [flex col gap 16 justify-between items-center]
    │     ├ img.livinor-icon  [197×197]
    │     └ div.right-text-wrap [flex col gap 5, 3 × p de 24px → 140×82 @x1212 y366]
    └ div.hero-bottom-content [pl 60, pr 0, flex row, justify-between, items-center, gap 40, h 422 @y550]
      ├ div.bottom-left-box   [max-w 300 → 300×300 @x60 y611, flex row gap 10 items-center]
      │ ├ img.right-icon 22×300
      │ └ .left-text-wrap [flex col justify-between gap 5, min-h 260 → h6 arriba + botón 201×54 abajo @y837]
      └ div.bottom-right-box  [max-w 690, ml auto, bg #fff, radius 10px 10px 0 0, overflow hidden → x750..1440, y550..972]
        └ div.hero-slider [border 10px solid #fff, radius 10, flex row items-center, overflow hidden]
          └ n × div.cover-image-wrap.hero [min/max-w 360, h 402, border 6px #fff, radius 10] > img 348×390
```

- Gap efectivo entre `hero-text-wrap` y `top-right-box`: **88px** (space-between, no el gap 40).
- El marquee del hero: los ítems miden 360 de ancho y van pegados (sin gap); el desplazamiento es
  `translateX` (en la captura el primero está en x=−1183).
- **Bloque solo-móvil**: dentro de `top-right-box` hay un `div.left-text-wrap.dex-hide`
  (h6 "Designing Modern Homes / Since 2014" + botón "Contact Now") oculto en desktop.

**Responsive**

| BP | qué cambia |
|---|---|
| ≤991 | `min-height:600`, `margin-bottom:0`, `z-index:5000`. Navbar → **hamburguesa** (`data-collapse="medium"`): `.navbar-middle{order:9999; max-width:50px}` (el botón se va a la derecha, entre logo y carrito queda el carrito antes); menú abierto = `position:absolute; top:100%` con `bg #fae9ce` radius 12 y `navbar-link-wrap.hero` en columna, `bg black`, `padding:30px 20px`, gap 20. `hero-content-box{mt:60; gap:60}`. **`hero-top` pasa de flex a `display:grid; grid-template-columns:1fr 1fr; gap:20; place-items:start end; padding-inline:40`**. `h1` pasa a `text-align:left`. `img.right-icon{display:none}`. `right-info-wrap{margin-left:auto; align-items:flex-start}`. `hero-bottom-content{padding-left:40}`. `bottom-right-box{max-width:none}` → la tira de imágenes llega al borde derecho del viewport y se recorta; `cover-image-wrap.hero{border-width:6px; min-width:250px}`, `img h 250`. Medido: hero tablet = **y 0–629**. |
| ≤767 | `min-height:400`; `hero-content-box{mt:40; gap:40}`; `hero-top` vuelve a `flex-flow:column`; `top-right-box{flex-flow:row; justify-content:space-between; align-items:flex-end; width:100%}`; **`bottom-left-box{display:none}`**; `left-text-wrap.dex-hide{display:flex; gap:20}` (aparece el bloque móvil); `hero-bottom-content{padding-left:0}` → slider full-bleed; `cover-image-wrap.hero{min-width:150px; max-width:none}`, img h 150. |
| ≤479 | `min-height:520`; `mt:30; gap:30`; `hero-top{gap:20; align-items:center}`; `top-right-box{flex-flow:column; gap:20}`; **`right-text-wrap{display:none}`** (desaparecen los 3 puntos "1. Interior Styling…"); `h1{text-align:center}`; `right-info-wrap{margin-inline:auto; gap:12}`; `livinor-icon{height:80}`; `left-text-wrap.dex-hide{justify-content:space-between; align-items:center; min-height:auto}`; `cover-image-wrap.hero{border-width:3px; min-width:120px; max-width:180px}`. Medido móvil: navbar ≈70, hero total **y 0–565**, franja del slider **y 454–565**. |

---

## 2. Sección 1 — `about` (y 1072–2172, h 1100)

```
section.more [pt 100, pb 150]
└ .container [px 60]
  └ .about-us-layout  [GRID 1fr 1fr → 630px 630px, gap 60, rows 850, max-w 1700, 1320×850 @y1172]
    ├ .about-us-left  [flex col, justify-between, gap 40, min-h 850]
    │ ├ .about-us-top-left [flex col gap 40 → 630×338]
    │ │ ├ .about-us-title [flex col gap 20]
    │ │ │ ├ .mini-heading-wrap [flex row gap 10 items-center; lottie 32×32 + p]  → h 32
    │ │ │ └ .about-us-text-wrap [relative, overflow hidden, 630×192] (h3.h4 + .text-color-box absoluto con 8 franjas de 50px, mix-blend-mode:lighten)
    │ │ └ .about-us-button-wrap [max-w 480, flex row gap 40 items-center → botón 199×54 + texto con punto verde 10×10]
    │ └ .about-us-top-right [630×425 @y1597]  → .cover-image-wrap.about-us radius 12 + img h 425
    └ .about-us-right [GRID 2×2, gap 0, cols 315/315, rows 424.5/425.5 → bento pegado]
      └ 4 × .about-box [p 40, flex col, justify-end, items-end, borde 1px #bfbfbf en aristas internas]
        └ .about-info-box [max-w 330, flex col justify-between gap 40, items-end]
          ├ .counter-div [h 66, overflow hidden] (contador animado)
          └ .about-text-wrap [flex col gap 10, items-end, text-align right]
```

Bento 2×2 (**pegado, sin gap**, separado por hairlines de 1px `#bfbfbf`):

| caja | bbox | bg | bordes | radios |
|---|---|---|---|---|
| `.one` | 750,1172,315,425 | `#fff` | ninguno | solo **bottom-right 10px** |
| `.two` | 1065,1172,315,425 | transparente | **left 1px** | solo **top-right 10px** |
| `.three` | 750,1597,315,426 | transparente | **top 1px** | **bottom-right + bottom-left 10px** |
| `.four` | 1065,1597,315,426 | `#fae9ce` | **top 1px + left 1px** | solo **bottom-right 10px** |

(Verificado con zoom de píxeles: la esquina superior-izquierda de `.one` es **recta**.)

**Responsive**
- ≤991: `about-us-layout{grid-template-columns:1fr; gap:40}` → una sola columna (título+botón, imagen, y debajo el bento). `about-us-left{min-height:auto}`. `about-us-right{gap:20}` → el bento se separa y **todas las cajas pasan a `background:#fff`** (los radios/hairlines del base siguen aplicando). `text-color-box{display:none}` (se elimina el efecto de reveal por líneas). Imagen h 400. `counter-div{height:30}`.
- ≤767: `about-us-right{column-gap:10}`; **`.paragraph.land{display:none}`** → desaparecen los párrafos de las 4 stats; `about-info-box{align-items:flex-start; gap:20}`; imagen h 300; `counter-div{height:25; width:100%}`.
- ≤479: `about-us-layout,.about-us-left{gap:30}`; **`about-us-right{display:flex; overflow:scroll; padding-bottom:10px; gap:20}`** → las 4 stats se convierten en un **carrusel horizontal** (medido en el screenshot: 2 tarjetas visibles + la 3ª cortada); `about-info-box{flex-flow:wrap; max-width:none}`; imagen h 250.

---

## 3. Sección 2 — `projects` (y 2172–4565, h 2393) — **grid escalonado**

```
section.white.more-top [bg #fff, pt 150, pb 150]
└ .container [px 60] → .home-projects-layout [flex col, gap var(--layout)=80, overflow hidden, 1320×2093 @y2322]
  ├ .home-projects-heading [flex col gap 20 items-start → 1320×137]
  │   .mini-heading-wrap (h32) + .h2-section-title [flex row gap 10, h 85; h2 571 + .h2-counter-wrap 242 (overflow hidden, 3 h2 apilados)]
  └ .projects-card-wrap [GRID 1fr 1fr → 645/645, gap 30, 1320×1876 @y2539]
    ├ .projects-left-wrap  [bloque; contiene la lista, 645×1630 — sobra 246px abajo]
    │ └ .home-projects-collection-list.left [flex col gap 30] → 2 items de 645×800
    └ .projects-right-wrap [flex col gap var(--layout)=80]
      ├ .right-heading-wrap  [ml auto, max-w 445 → 445×166 @x935; flex col gap 40 justify-center; p 445×72 + botón 230×54]
      └ .right-content-wrap  [645×1630] → .home-projects-collection-list.right [flex col gap 30] → 2 items de 645×800
```

### Offsets exactos del escalonado

| | y inicio | tarjetas |
|---|---|---|
| Columna izquierda (x 60–705) | **2539** | card1 2539–3339 · gap 30 · card2 3369–4169 |
| Columna derecha (x 735–1380) | **2785** | card3 2785–3585 · gap 30 · card4 3615–4415 |

**Desfase vertical entre columnas = 246px**, y no es un offset arbitrario:
`right-heading-wrap` (166px de alto) + `gap:80` del `projects-right-wrap` = 246.
La columna izquierda deja 246px de aire al final (1630 de contenido en una celda de 1876).

### Anatomía de la tarjeta (645×800)

```
a.project-card [flex row, 645×800]
├ .projects-info-box [90 ancho (px 30 → 30 útiles), bg #fae9ce, radius 12px 0 0 12px, flex center]
│ └ .project-card-info [max-w 30, h 100%, max-h 720, flex col justify-between items-center gap 20]
│   ├ h3.h6.rotate [transform:rotate(90deg); white-space:nowrap; margin-top:80px]  ← nombre
│   └ h3.h6.rotate [idem]                                                          ← año
└ .cover-image-wrap.project [555×800, radius 0 12px 12px 0, overflow hidden, relative]
  ├ img.cover-image.project [555×800, object-fit cover]   ratio 0.694 (≈ 5:7.2)
  └ .services-overlay-box [absoluto, inset 0, bg rgba(0,0,0,.3)]
```

**Responsive**
- ≤991: `projects-info-box{padding-inline:20}`; `h6.rotate{margin-top:110px; margin-bottom:40px}`; **`services-overlay-box{display:none}`** (las fotos dejan de estar oscurecidas); img h 400. El grid sigue en **2 columnas escalonadas** (el `right-heading-wrap` sigue visible a 768). Medido tablet: sección y 1924–3309.
- ≤767: `projects-card-wrap{display:flex; flex-flow:column}` → **1 columna**, las 4 tarjetas seguidas con gap 30; `right-heading-wrap{display:none}` (desaparecen párrafo + botón); `project-card{display:grid; grid-template-columns:1fr .5fr; border-radius:12px; overflow:hidden}` con `projects-info-box{order:9999; border-radius:0; padding-inline:0}` → la banda crema pasa a la **derecha**; `h6.rotate{transform:rotate(0); margin:0}` (texto horizontal); `project-card-info{width:100%; max-width:none; padding:20px}`; img h 200.
- ≤479: `project-card{display:flex; flex-flow:column}` → imagen arriba, banda crema **abajo** (medido: imagen ~198 + barra ~59); `projects-card-wrap{gap:20}`; `project-card-info{flex-flow:wrap; gap:10}` (nombre izquierda, año derecha).

---

## 4. Sección 3 — `process` (y 4565–5772, h 1207) — oscura

```
section.image.process [bg url(Our Journey BG Image.webp) cover 0 0, pt 150, pb 150]
└ .container [px 60] → .process-layout [GRID .25fr 1fr → 293.33px / 1026.67px, gap 0, justify-between, items-start, 1320×907 @y4715]
  ├ .process-heading [flex col gap 20 items-start, max-w 490 → 293×216]  (mini-heading + h2 "OUR DESIGN")
  └ .process-content-wrap [flex col, gap 12, 1027×907]
    ├ .process-top-wrap    [1027×278 @y4715] → .process-element.one  [590 ancho, mx auto → x572, ml/mr 218.33]
    ├ .process-center-wrap [GRID 1fr 1fr, gap 16 → 505.33/505.34, 1027×302 @y5005, overflow hidden]
    │   .process-element.two @x353 · .process-element.three.land-hide @x875
    └ .process-bottom-wrap [GRID 1fr 1fr 1fr 1fr, gap 0 → 4×256.67, 1027×302 @y5319, overflow hidden]
        col1 .process-element.four.land-hide @x353 · col2 .blank.hide (spacer) · col3 .process-element.five @x867 · col4 vacía
```

> La primera columna mide **293.33px** y no 264 (=.25fr) porque `1fr`/`.25fr` tienen suelo
> `min-content` y la palabra "DESIGN" a 72px lo empuja. Para replicar: `grid-cols-[293px_1fr]`.

**Elemento de paso** (`.process-element`, `max-w 590`, `mx auto`, flex row **justify-end**, gap 10, items-center):

```
├ .step-box-arrow [svg codo, 100×100 (min-w 80, min-h 90), color #616161]   ← solo en pasos 1,2,3
└ .step-image-info-wrap [flex col, gap 50, max-w 380]
  ├ .step-image [flex col gap 20]
  │ ├ .yellow-text-box [flex row gap 15 items-center, h 24]   "• Step 01"
  │ └ .cover-image-wrap.process [radius 12] > img h 95, min-w 200   ← tira ancha 380×95
  └ .step-info [flex col gap 10, max-w 285]  (h6 + párrafo)
```

Posiciones medidas: paso1 flecha x672 / card x782 · paso2 flecha x369 / card x479 ·
paso3 flecha x890 / card x1000 · paso4 card x353 (257 ancho) · paso5 card x867 (257 ancho).
Filas: y4715 (h278) → y5005 (h302) → y5319 (h302), separadas por `gap:12`.

**Responsive**
- ≤991: **`process-layout{display:flex; flex-flow:column; align-items:center; gap:60}`** → título arriba centrado (`process-heading{align-items:center}`), pasos debajo. `process-content-wrap{gap:20; align-items:center}`. **`step-box-arrow{display:none}`** (fuera los codos). Cada `.process-element` gana **`border:1px solid #616161; border-radius:10px; padding:10px`**. `process-center-wrap{gap:20}` (2 cols), `process-bottom-wrap{grid-template-columns:1fr 1fr; gap:20}` (pasos 4 y 5), `.blank.hide{display:none}`. `step-image-info-wrap{gap:30; max-width:none}`, img de paso h 150, `step-info{max-width:none}`.
- ≤767: **`process-content-wrap{flex-flow:row; overflow:scroll; padding-bottom:20}`** → los 5 pasos se convierten en un **scroller horizontal**; `process-center-wrap`/`bottom-wrap{display:flex; min-width:800px}`; cada elemento `min/max-width:400px` (el 3 `min-width:350`); `step-image-info-wrap{display:grid; grid-template-columns:1fr 1fr; gap:20; place-items:center start}` (imagen y texto en 2 columnas); `step-info{justify-content:space-between; height:100%; gap:30}`; img de paso h 200.
- ≤479: elementos `min/max-width:300px`; wraps `min-width:620px`; `step-image-info-wrap` vuelve a `flex-flow:column; gap:30`; `step-info{gap:20}`. Medido móvil: sección y 2669–3287.

---

## 5. Sección 4 — `services` (y 5772–7318, h 1546)

```
section.overflow [pt 150, pb 100, overflow hidden]
└ .container [px 60] → .home-services-layout [flex col, gap 100, 1320×1296 @y5922]
  ├ .services-title [GRID .3fr .7fr → 384 / 896, gap 40, items-start, border-top 1px #bfbfbf, 1320×318]
  │ ├ .services-left-heading [border-right 1px #bfbfbf, pt 60, pr 20, h 100%]
  │ │ └ .services-left-content [flex col gap 40, max-w 290] → mini-heading + .cover-image-wrap.services (290×185, r12) + .button-hide(oculto)
  │ └ .services-right-title [flex, items-stretch] → .services-right-content [flex col gap 40, pt 60, max-w 1075]
  │     .about-us-text-wrap (896×144, reveal por líneas) + div.land-hide (botón 234×54)
  ├ .services-content-wrap [overflow hidden, 1320×546 @y6340]
  │ └ .service-collection-list.home [GRID 1fr 1fr 1fr → 3×420, gap 30, row 546]
  └ .services-bottom-slider [flex col, gap 12, 1320×232 @y6986]  → .top-slider (h110) + .bottom-slider (h110)
```

### Tarjeta de servicio (todas IDÉNTICAS en desktop — no hay offsets)

`a.service-box`: **420×546**, `bg #fff`, `radius 10`, `min-height 500`, `padding 60px 20px`,
flex center. Dentro `.service-info-wrap.home` **380×426**, `flex col justify-between`, `gap 60`,
`min-height 380`:
- `.service-icon-box` **150×150**, `radius 14`, `bg #fae9ce`, icono 90×90.
- `.service-text-wrap` `flex col gap 24` — **pegado abajo** (justify-between): las 3 tarjetas
  terminan su texto en y=6826 aunque el h4 ocupe 1 o 2 líneas (card 2: bloque de 168 @y6658;
  cards 1 y 3: bloque de 216 @y6610).

> El briefing dice "tarjetas con alturas/offsets distintos": **en desktop es falso**, las 3 miden
> 420×546 y arrancan en y=6340. Lo que varía es dónde empieza el texto interno (bottom-aligned).

### Marquee de 2 filas (y 6986 y 7108, 110px cada una, gap 12)

`.top-slider` (`justify-content:space-between`) y `.bottom-slider` (`justify-content:flex-end`),
cada una con N × `.services-slider` de 2146px, `gap 30`; dentro `.slider-box` `flex row gap 30 items-center`
(texto gigante + icono 17×17). Se desplazan con `translateX` en direcciones opuestas.

**Responsive**
- ≤991: `home-services-layout{gap:60}`; `services-title{gap:20}`; `services-left-heading{padding-top:20}`; `services-right-content{padding-top:20}`; **`service-collection-list.home{grid-template-columns:1fr 1fr; gap:20}`** → 2+1 tarjetas; `service-box{border:1px solid #8e8e8e; min-height:auto; padding-block:40}`; `service-icon-box{80×80; radius 12}`; `service-info-wrap{gap:40; min-height:auto}`; `services-bottom-slider{gap:10}`.
- ≤767: `home-services-layout{gap:40}`; **`services-title{display:flex; flex-flow:column; border-top:0; gap:40}`**; **`services-right-title` y `services-right-content` → `display:none`** (desaparece el titular grande "FROM INTERIORS TO LIGHTING…"); `services-left-heading{border:1px solid #bfbfbf; border-radius:10; display:flex; flex-flow:row; justify-content:space-between; align-items:flex-end; padding-bottom:20; padding-left:20}` y aparece `.button-hide{display:block}` con el botón "All Services"; **`service-collection-list.home{display:flex; overflow:scroll; gap:20; padding-bottom:20}`** (scroller horizontal); `service-box{padding:12}`; `service-info-wrap.home{flex-flow:row; justify-content:space-between; align-items:center; gap:20; max-width:none}` (icono izquierda / título derecha); `service-icon-box{60×60; radius 10}`; **`.paragraph.land{display:none}`** (fuera las descripciones).
- ≤479: `services-left-heading{flex-flow:column; align-items:flex-start; padding:10}`; **`service-collection-list.home{flex-flow:column; overflow:visible; gap:20}`** → las 3 tarjetas apiladas (ya no scroller); `service-info-wrap.home{gap:15}`; `service-icon-box{40×40; radius 5; min-w 30}`; `cover-image.services{height:200}`; `services-slider{gap:10}`.

---

## 6. Sección 5 — `designcta` (y 7418–8303 + banda 8303–8394)

### 6a. `section.design` — **qué pasa realmente con la imagen "inset → full-bleed"**

La sección es **siempre full-bleed** (`width:1440`, `height:885.4`, `min-height:880`,
`background-size:cover`, `z-index:100`, `margin-top:100`, `padding-block:100`).
Lo que se ve en el screenshot es una **animación IX2 de scroll que escala la sección entera**:

- En `computed-styles.json` la sección tiene `transform: matrix(0.500165,…)` → **scale(0.5)**,
  bbox 720×443 centrado en (720, 7860.5).
- En el PNG, el escaneo de píxeles da: entre y 7500 y 8090 la imagen ocupa **x 93 → 1346**
  (ancho 1254 = **scale 0.871**, centrada); a partir de **y 8096** (costura entre tiles de la
  captura) ocupa **x 0 → 1439** (**scale 1**).
- Conclusión: `transform-origin: center`, escala animada por scroll de ≈0.5 → **1.0**.
  **El estado de reposo/final es scale 1 = full-bleed 1440×885.**
  El "inset arriba / full-bleed abajo" del screenshot es un **artefacto de la captura por tiles**,
  no un diseño de dos mitades. → Los comparadores van a ver diff aquí; es esperado.

Geometría real (desescalada, ÷0.500165 respecto al centro):

```
section.design [1440×885.4, flex, justify-center, items-center, padding-block 100]
└ .container [px 60 → 1320 @x60, alto 685]
  └ .home-design-layout [flex row, justify-between, items-stretch, gap 20, max-w 1375 → 1320]
    ├ .design-line-image [16 ancho × 430 alto, max-height 430]     ← línea vertical decorativa
    └ .design-button-title [1284 ancho, flex col, justify-center, items-**flex-end**, gap 60]
      ├ .design-title-wrap [flex col, gap 80]
      │ ├ .design-small-title [max-w 280 → 280×62]   "DESIGN YOUR SPACE / WITH PURPOSE"
      │ └ h2.design-text [1284×430]                  "LET'S DESIGN YOUR DREAM HOME"
      └ a.button-white [170×54]  ← alineado a la DERECHA (items-end) @x≈1210
```

**Responsive**: `[<=991] {min-height:500; margin-top:0}` + `design-button-title{gap:40}` +
`design-title-wrap{gap:30}` + `design-small-title{max-width:none}`.
`[<=767] {min-height:350}` + `design-line-image{display:flex; justify/items:center}` +
`design-title-wrap{display:block}` + `design-button-title{justify-content:space-between; gap:30}`.
`[<=479] {min-height:300}` + **`design-line-image{display:none}`**, **`design-small-title{display:none}`**,
`design-button-title{align-items:flex-start; justify-content:center; gap:20; width:100%}` → en móvil
el botón "Lets Talk" queda **abajo a la izquierda** (verificado en el crop móvil).

### 6b. Banda del marquee de ofertas (`section.no-padding`, y 8303–8394, h 91)

`padding-block:30`, `bg #fae9ce`, `overflow:hidden`, `margin-bottom:100`.
`.container` (px 60) → `.design-slider-layout` [flex row, gap 8, justify-end, 1320×31] →
`.design-slider` [flex row, gap 10] → n × `.design-slider-box` [flex row, gap 20, items-center]
(icono 17×17 + h6 + icono 17×17). El contenido se desplaza con translateX y visualmente sangra
de borde a borde porque la sección tiene `overflow:hidden`.
Responsive: `[<=991] margin-bottom:0`; `[<=767] padding-block:20`; `[<=479]` el texto pasa a negro.

---

## 7. Sección 6 — `advantages` (y 8494–9818, h 1324) — bento

```
section.choice [pt 100, pb 150]
└ .container [px 60] → .choice-layout [flex col, gap var(--layout)=80, 1320×1074 @y8594]
  ├ .choice-title [flex col gap 20, items-**center**, 1320×137]  (mini-heading + h2 + counter)
  └ .choice-content-wrap [GRID 1fr 1fr 1fr → 3×426.67, gap 20, alto 857 @y8811]
```

Las 3 celdas son wrappers `flex col gap 20` con contenidos de distinto tamaño:

| columna | hijo | bbox | detalles |
|---|---|---|---|
| **izq** (x60) | `.choice-left-top` | 427×**287** | `bg #fff`, **border 1px #dbdbdb**, radius 10, `padding 40px 20px`, flex center. Dentro `.cover-image-wrap.dot` 205×205 (r12) con la imagen rotada (`rotate(≈109°)`) y `.bold-text-wrap` absoluto 115×60 (`margin:auto`, overflow hidden, 5 líneas de 62px → rotador vertical de texto). 287 = 40+205+40 **+2 del borde**. |
| | `.choice-left-bottom` | 427×**550** | `background-image` cover, radius 10, overflow hidden; `.image-overlay` absoluto (`linear-gradient(3deg, transparent, rgba(0,0,0,.6))`); `.left-text-box` relative `top:50px; left:50px; max-w 210; z 1`. |
| **centro** (x507) | `.center-top-box` | 427×**270** | `bg #fae9ce`, radius 10, `min-h 270`, `pt/pb 30, pl 30`, overflow hidden. `.corner-image-wrap` **absoluto** `inset:auto 0% 5% 60%`, `max-w 350`, **`rotate(-20deg)`** (fotos que se salen por la derecha y se recortan). `.center-top-text` `z 10`, `flex col gap 40`, max-w 295. |
| | `.center-logo-wrap` | 427×**270** | `bg #fff`, **border 1px #dbdbdb**, radius 10, flex center; logo svg 178×178. |
| | `.center-bottom-wrap` | 427×**270** | flex row `gap 20 justify-between`: 2 × `.cover-image-wrap.bottom` 203×270 (r12). La 2ª tiene `land-hide`. |
| **der** (x953) | `.right-top-box` | 427×**560** | bg imagen cover, radius 10, `min-h 560`, `padding 50px 20px`, overflow hidden; `.image-overlay.right` `rgba(0,0,0,.4)`; `.right-content-box` `flex col gap 50, max-w 450, z1`: `.cover-image-wrap.inside` 387×294 (border .5px #fff, r10) + `.text-wrap` max-w 230. |
| | `.right-bottom-wrap` | 427×**270** | bg imagen cover, radius 10, `min-h 270`, flex items-center; overlay `rgba(0,0,0,.4)`; `.right-corner-wrap` `flex col gap 30, max-w 230, z1` a 40px del borde izquierdo, con icono 51×51 rotado. |

**Alturas de la fila**: la columna izquierda manda → 287 + 20 + 550 = **857px**.
Centro (270+20+270+20+270 = 850) y derecha (560+20+270 = 850) dejan **7px de aire abajo**.
Para replicar exactamente: `grid-auto-rows:857px` o dejar que la izquierda mande con `items-start`.

**Responsive**
- ≤991: `choice-content-wrap{grid-template-columns:1fr}` → las 3 celdas se apilan, **pero cada una se convierte en un grid de 2 columnas**:
  `choice-left-wrap{display:grid; grid-template-columns:1fr 1fr; gap:20}` (badge | sofá, `choice-left-bottom{height:400}`),
  `choice-center-wrap{display:grid; grid-template-columns:1fr 1fr; height:400}` con **`center-logo-wrap{display:none}`** y `cover-image-wrap.bottom.land-hide{display:none}` → queda (caja crema | 1 imagen),
  `choice-right-wrap{display:grid; grid-template-columns:1fr 1fr}` (chica | lámpara, `right-top-box{height:400; min-height:auto; padding-block:30}`).
  `.cover-image.dot{180×180}`, `left-text-box{top:40; left:40}`, `right-content-box{gap:30}`.
- ≤767: **`choice-content-wrap{display:flex; overflow:scroll; padding-bottom:20}`** → scroller horizontal; cada wrap `max-height:300`, cada caja `min-width:250`; `center-bottom-wrap{display:none}`; `center-top-box{padding:20; min-height:auto}`; `right-top-box{height:300}`; `.cover-image.dot{150×150}`; `left-text-box{top:20; left:20}`; `cover-image.inside{height:160}`.
- ≤479: `choice-left-wrap{display:flex; grid-template-columns:1fr; max-height:250}`; `choice-center-wrap{display:flex; flex-flow:row}` con **`center-logo-wrap` y `center-bottom-wrap` en `display:none`** → sólo queda la caja crema (`min/max-height:250`); `choice-right-wrap{display:flex; flex-flow:row}` (`right-top-box{height:250; padding:12}`); `choice-left-top{min-width:280}`, `choice-left-bottom{min-width:280; height:250}`; `left-text-box{top:15; left:10; max-width:none}`.

---

## 8. Sección 7 — `products` (y 9818–11134, h 1316)

```
section.white.products [bg #fff, pt 150, pb 150]
└ .container [px 60] → .products-layout [flex col, gap var(--layout)=80, 1320×1016 @y9968]
  ├ .products-title-wrap [flex col gap 20, items-center, text-center, 1320×137]
  └ .products-content-wrap [flex col, gap 80, 1320×799 @y10185]
    ├ .products-collection-list [GRID 1fr 1fr 1fr → 3×420, gap 30, row 665]
    └ a.button-white [ancho 1320, flex justify-center → botón 132×54 centrado @y10930]
```

Tarjeta (**420×665**):

```
a.products-wrap [relative, 420×665]
├ .cover-image-wrap.products [flex center, min-h 665, radius 12, bg var(--page-color) #fef8f0]
│ └ img.cover-image.products [object-fit:contain, max-w 380, h 400 → 380×400 centrada @y10318]
└ .products-content [ABSOLUTO inset 0, flex col justify-between, gap 40, padding 40px 20px]
  ├ .products-top    [380×38]  → `.category-name-wrap` bg #fff, radius 5, padding 7px 20px
  └ .products-bottom [380, flex row wrap, gap 20, justify-between, items-center, max-w 465]
      `.name-price` (precio + nombre) + botón "Cart"
```

Nota: si el nombre es largo, `.products-bottom` **envuelve** y el botón Cart cae a una segunda
línea (card 1: bloque de 150px de alto @y10660; cards 2 y 3: 65px @y10745). Todos los bloques
terminan alineados abajo en y=10810.

**Responsive**
- ≤991: `products-collection-list{grid-template-columns:1fr 1fr}` (gap 30) → 2+1; `cover-image-wrap.products{min-height:400; background-color:var(--card-color) #fae9ce}` (**cambia el fondo de la tarjeta**); img `max-w 200, h 200`; `products-content{padding-block:30}`.
- ≤767: `products-collection-list{gap:20}`; `products-content{padding:20}`.
- ≤479: `products-collection-list{grid-template-columns:1fr; row-gap:20}` → 1 columna; `cover-image-wrap.products{min-height:320}`; img h 150; `products-content{gap:20; padding:20}`; `products-bottom{align-items:flex-end}`.

---

## 9. Sección 8 — `testimonials` (y 11134–12065, h 931) — oscura

```
section.testimonials [bg img cover 50%/50%, pt 150, pb 100]
└ .container [px 60] → .testimonial-layout [flex col, gap 60, 1320×681 @y11284]
  ├ .products-title-wrap [flex col gap 20 items-center → 1320×134]  (mini-heading + h2 centrado 933 ancho)
  └ .testimonial-content-wrap [1320×487 @y11478]
    └ .slider.w-slider [relative, h 100%]
      ├ .slider-mask [1320×487, overflow hidden, z1]
      │ └ n × .slide [1320×487, min-h 400] → .testimonial-slider [flex col, gap var(--layout)=80, items-center]
      │   ├ .star-text-wrap [max-w 1165 → x138, flex col gap 40]  (.rating 20px alto + p 1165×72)
      │   └ .image-info-wrap [max-w 260 → 260×275 @y11690, flex col gap 20 items-center]
      │     ├ .cover-image-wrap.testimonial [260×190, radius 12]
      │     └ .name-title-wrap [flex col gap 10, items-center, h 65]
      ├ .left-arrow  [ABS 60×60, x60,  y11692; border 3px #fff, radius 10, margin-block auto (centrado vertical), z3]
      └ .right-arrow [ABS 60×60, x1320, y11692; border 3px #fff, radius **12**, z4]
```

- **`.slide-nav{display:none}` en TODOS los breakpoints** → los dots existen en el DOM
  (`w-slider-nav w-round w-num`) pero **nunca se ven**. (Corrige el punto 4 del briefing:
  hay flechas, NO hay dots visibles.)
- Las flechas están pegadas a los bordes del container (x=60 y x=1320..1380).

**Responsive**: `[<=991] testimonial-layout{gap:60}` (= var layout) y flechas **50×50**.
`[<=767]` flechas **40×40** con `top:20%` y **la cita `p.land-hide-text` se oculta**
(sólo quedan estrellas + foto + nombre). `[<=479]` flechas **30×30**, `radius 6`,
`top:100%`, `margin-block:0` → **las flechas bajan debajo del slider** (verificado en el crop móvil);
`section{padding-bottom:60}`.

---

## 10. Sección 9 — `blogs` (y 12066–13613, h 1547)

```
section.blogs [pt 150, pb 100]
└ .container [px 60] → .home-blogs-layout [flex col, gap var(--layout)=80, 1320×1297 @y12216]
  ├ .blogs-title [flex row, justify-between, items-center, gap 40, 1320×137]
  │ └ .title-left > .blogs-title-left [flex col gap 20, max-w 830 → 670]  ← ÚNICO hijo (no hay bloque a la derecha)
  ├ fila 1 [1320×500 @y12433] .blogs-info-box       [flex row, gap 30]  → BIG (888) + MINI (402)
  └ fila 2 [1320×500 @y13013] .blogs-info-box.two   [flex row, gap 30]  → MINI (402) + BIG (888)
```

Separación entre filas: **80px** (gap del layout): 12433+500 = 12933 → 13013.

- `.blogs-big-box` — `flex:1; position:relative` → **888px** (1320 − 30 − 402):
  `.cover-image-wrap.blogs` 888×500 radius 12 + `.name-time-wrap` **absoluto** `inset:auto 40px 40px`
  (flex col gap 20) con título y fecha sobre la foto.
- `.blogs-mini-box` — `min-width:402px; padding:40; bg #fae9ce; radius 12` →
  `.mini-box-text-wrap` [flex col justify-between gap 40, max-w 205, h 100%] = "ABOUT AUTHOR",
  foto de autor + nombre, botón "Read More".
- La alternancia es puro orden en el DOM (fila 2 pone el mini primero); las declaraciones
  `grid-template-columns:.7fr .3fr` / `.3fr .7fr` son **inertes** porque el contenedor es `display:flex`.

**Responsive**
- ≤991: `blogs-info-box{gap:20}`; `blogs-mini-box{min-width:auto; padding-left:20}` (`.last{padding-inline:20}`) → el mini se encoge a su contenido (~235px medidos a 768) y el big absorbe el resto; `cover-image.blogs{height:400}`.
- ≤767: `blogs-info-box{flex-flow:column}` y **`blogs-mini-box{display:none}`** (¡desaparecen las dos cajas de autor!); `blogs-big-box{order:9999}`; `blogs-title{justify-content:center}`; `name-time-wrap{bottom:20; left:20; right:20}`; `cover-image.blogs{height:300}`.
- ≤479: `blogs-title{flex-flow:column; align-items:center}`; `home-blogs-layout{align-items:center}`; `name-time-wrap{bottom:12; left:12; right:20; gap:16}`; `cover-image.blogs{height:250}`. Resultado móvil: 2 tarjetas-imagen apiladas de ~250px con título+fecha superpuestos.

---

## 11. Sección 10 — `footer` (y 13713–14463, h 750)

```
section.foter [mt 100, pt 100, pb 100, bg img contain 50%/50%]
└ .container [px 60] → .footer-layout [flex col, justify-between, gap 40, min-h 550 → 1320×550 @y13813]
  ├ .footer-top [flex row, justify-between, items-**flex-end**, gap 40, 1320×423]
  │ ├ .footer-left [max-w 635, flex col justify-between gap 40, min-h 360 → 635×360 @y13875]
  │ │ ├ .footer-image-wrap → logo 220×70
  │ │ └ .footer-left-box [flex col gap 40]
  │ │   ├ h2.mail-text [635×90]  "hi@livinor.com"
  │ │   └ .footer-form-block > form.footer-text-form [relative, 635×58]
  │ │     ├ input.footer-text-field [635×58, bg #191919, radius 50, pl 20, pr 12]
  │ │     └ input.submit-button.footer [ABSOLUTO inset:auto 0 0 auto → 143×54 @x552,y14181; bg #000, border 1px #fff, radius 50, padding 14px 24px]
  │ └ .footer-right [max-w 850 → 645, flex col gap 50]
  │   ├ .footer-right-top [flex row wrap, justify-between, items-center, gap 30, 645×167]
  │   │ ├ .right-text-box [h6 290 ancho]
  │   │ └ .right-social-wrap [flex row gap 20 → 4 × .footer-social-box 75×75, radius 100%, border 1px #fff, icono 35×35]
  │   └ .footer-content-wrap [645×205, bg #191919, radius 10, padding 50px 20px, flex center]
  │     └ .footer-pages [flex col gap 50, max-w 730 → 605]
  │       ├ h3.h6.yellow "QUICK LINKS"
  │       └ .footer-pages-box [flex row wrap, gap 20, justify-between → 7 links en una fila]
  └ .footer-bottom [flex col, gap 45, 1320×70 @y14293]
    ├ .footer-line [1320×1, bg #353535]
    └ .bottom-content-wrap [flex row, justify-between, items-center, gap 40, h 24]
```

**Responsive**
- ≤991: `footer-layout{min-height:520}`; `section.foter{margin-top:0; padding-bottom:20; background-position:0%}`; `footer-top{align-items:flex-start}`; `footer-left{gap:30}`; `footer-right{gap:40}`; `footer-right-top{gap:20}`; `footer-content-wrap{justify-content:flex-start; padding-block:40}`; `footer-pages{gap:40; align-items:flex-start}`; **`footer-pages-box{display:flex; gap:30; justify-content:flex-start; width:100%}`** (los 7 links envuelven en 2–3 filas); `footer-social-box{50×50}`; **`footer-text-form{flex-flow:column; align-items:flex-start; gap:20; position:static}` y `submit-button{position:static; padding:12px 20px}`** → el botón "Submit Now" baja debajo del input.
- ≤767: `section.foter{background-position:0 45%}`; `footer-layout{gap:30; min-height:auto}`; **`footer-top{flex-flow:column; gap:30}`** (una columna); `footer-left{gap:20; max-width:none; width:100%}`; `footer-text-field{width:100%; height:53}`; `footer-text-form{position:relative}` + `submit-button{position:absolute}`; `footer-content-wrap{padding-block:30}`; `footer-pages{gap:30; align-items:center}`; `footer-pages-box{gap:25; justify-content:center}`; `footer-social-box{40×40}`; `bottom-content-wrap{flex-flow:column; gap:15}`; `footer-bottom{gap:30}`.
- ≤479: `section.foter{background-position:7% 92%; background-size:auto}`; `footer-left{align-items:center; justify-content:flex-start}`; `footer-right{gap:30}`; `footer-right-top{justify-content:center}`; `footer-pages{gap:20; justify-content:center}`; `footer-pages-box{gap:15}`; `footer-social-box{35×35}`; `footer-content-wrap` y `bottom-content-wrap` centrados; `paragraph.footer{text-align:center}`; `footer-text-form{position:static; align-items:center; gap:16}` → botón centrado bajo el input.

---

## 12. Mapa vertical de tablet y móvil (medido por escaneo de píxeles)

Sirve como checklist rápido para los comparadores.

| Sección | Tablet 768 (y inicio–fin) | alto | Móvil 375 (y inicio–fin) | alto |
|---|---|---|---|---|
| hero | 0–629 | 630 | 0–565 | 566 |
| about | 630–1923 | 1294 | 566–1357 | 792 |
| projects | 1924–3309 | 1386 | 1358–2668 | 1311 |
| process | 3310–4672 | 1363 | 2669–3287 | 619 |
| services (+marquee) | 4673–≈6171 | ≈1499 | 3288–≈4056 | ≈769 |
| designcta + banda ofertas | ≈6172–6757 | ≈586 | ≈4060–4491 | ≈432 |
| advantages | 6758–8306 | 1549 | 4492–4949 | 458 |
| products | 8307–9556 | 1250 | 4950–6255 | 1306 |
| testimonials | 9557–10375 | 819 | 6256–6834 | 579 |
| blogs | 10376–11587 | 1212 | 6835–7552 | 718 |
| footer | 11588–12238 | 650 | 7553–8318 | 765 |

(Los límites de services/designcta son aproximados porque el muestreo cae sobre imágenes.)

---

## 13. Resumen de colapsos de grid (una línea por sección)

| Sección | Desktop | ≤991 (tablet) | ≤767 | ≤479 (móvil) |
|---|---|---|---|---|
| hero | 2 bloques flex (texto / info) + fila inferior | grid 2 cols (`place-items:start end`) + hamburguesa | columna; se oculta `bottom-left-box`, aparece bloque `dex-hide`; slider full-bleed | columna centrada; se ocultan los 3 puntos |
| about | 2 cols (630/630) + bento 2×2 pegado | **1 col**; bento 2×2 con gap 20 y cajas blancas | sin párrafos en las stats | bento → **scroll horizontal** |
| projects | 2 cols escalonadas (offset 246) | igual (2 cols escalonadas) | **1 col**; card = grid `1fr .5fr` (info a la derecha, texto horizontal) | card = columna (imagen arriba, barra abajo) |
| process | grid `293px 1fr`; 1 + 2 + 4(2 llenas) | **columna**; 1 + 2 + 2; sin flechas; cards con borde | **scroller horizontal** (400px/card) | scroller (300px/card) |
| services | 2 cols (384/896) + 3 cards | 2 cols + **2 cards por fila** | col izq como caja bordeada, se oculta el titular; cards en **scroller** | cards apiladas 1 col |
| designcta | full-bleed, texto izq / botón der | igual, min-h 500 | min-h 350 | min-h 300; sin línea ni subtítulo; botón a la izquierda |
| advantages | bento 3 cols × alturas mixtas (857) | **1 col**, cada wrap en 2 cols; se oculta el logo central | **scroller horizontal**, cajas 250 min-w | scroller; se ocultan logo y fila de 2 imágenes |
| products | 3 cols (420) | 2 cols; fondo de card → `#fae9ce` | gap 20 | **1 col** |
| testimonials | slider 1 slide + flechas a los lados | flechas 50 | flechas 40 (`top:20%`); **sin cita** | flechas 30 **debajo** del slider |
| blogs | 2 filas alternadas 888/402 | igual, mini encogido | **solo las imágenes** (mini oculto), 1 col | 1 col centrado |
| footer | 2 cols (635/645) | 2 cols, form en columna | **1 col** | todo centrado |

---

## 14. Dudas / avisos

1. **`designcta` en el screenshot está a medio animar** (scale 0.87 arriba de y≈8096, scale 1.0
   debajo; computed-styles la pilló a scale 0.5002). El estado correcto a construir es **scale 1
   full-bleed**. Los comparadores marcarán diff en esa franja: es esperado, no es un fallo del build.
2. El briefing dice "container 1320px". Lo correcto es `max-width:1820px` + gutter variable
   (60/40/30/20); 1320 es solo el resultado a 1440. Si se hardcodea 1320 el sitio se rompe a >1440.
3. El briefing dice que el carrusel de testimonios tiene **dots**: existen en el DOM pero
   `.slide-nav{display:none}` en todos los breakpoints → **no renderizarlos** (o renderizarlos ocultos).
4. El briefing dice que las tarjetas de `services` tienen "alturas/offsets distintos": **no** —
   en desktop son 3 × 420×546 idénticas y alineadas; lo que varía es el alto del bloque de texto
   interno (queda pegado abajo por `justify-between`).
5. `.process-element.dex-hide` (2 nodos en el DOM) está en `display:none` en **todos** los
   breakpoints. Son markup muerto; se pueden omitir del build.
6. `choice-left-top` mide 287px (no 285) por su `border:1px`. Si se replica sin borde, el bento
   pierde 2px y la fila deja de medir 857.
7. La altura de fila del bento (857) la impone la columna izquierda; las otras dos dejan 7px de
   aire. Si el builder usa `items-stretch` con contenido propio puede desviarse; conviene fijar
   los altos declarados (287/550, 270/270/270, 560/270).
8. Los `gap` del original están escritos como `grid-column-gap`/`grid-row-gap` incluso en flex;
   se traducen 1:1 a `gap` de Tailwind.
9. En `<=991` `about-box` pasa a `background:#fff` **pero conserva los radios "cortados"** del
   estado base (cada caja redondea solo 1–2 esquinas). En el screenshot de tablet parece que las 4
   están redondeadas por completo; a 0.83× de escala no se distingue. **Duda menor**: si el
   comparator marca las esquinas del bento en tablet, probar con `border-radius:10px` completo.
10. `blogs-info-box` declara `grid-template-columns` pero es `display:flex`; las proporciones
    reales salen de `flex:1` (big) + `min-width:402px` (mini). No traducir a grid con fracciones.

---

```json
[
  {
    "name": "hero",
    "container": "full-bleed (.container.hero max-w 1920, px 0); navbar interno px 60 / max-w 1700",
    "cols_desktop": "flex: hero-top [texto 998 | info 234] · hero-bottom [300 | 690 ml-auto]",
    "cols_tablet": "grid 1fr 1fr (place-items:start end), px 40",
    "cols_mobile": "1 col (hero-top column; top-right-box column en <=479)",
    "gap": "content-box 100 / 60 / 40 / 30; hero-top 40 (efectivo 88 por space-between); bottom 40",
    "padding_y": "0 (min-height 950 / 600 / 400 / 520; margin-bottom 100 → 0 en <=991)",
    "notas": "navbar 70px bg rgba(0,0,0,.15)+(.2) blur20; slider 690x422 pegado al borde inferior (radius 10 10 0 0); imágenes 360x402 (border 6px #fff), img 348x390; bloque .left-text-wrap.dex-hide solo <=767; bottom-left-box display:none <=767; right-icon none <=991; right-text-wrap none <=479"
  },
  {
    "name": "about",
    "container": "1320 (px 60)",
    "cols_desktop": "grid 630px 630px (1fr 1fr) + sub-bento 2x2 de 315x425 sin gap",
    "cols_tablet": "1 col; bento 2x2 con gap 20 y cajas blancas",
    "cols_mobile": "1 col; bento → flex overflow:scroll (carrusel horizontal)",
    "gap": "layout 60 (col) · left 40 · title 20 · bento 0 → 20 (<=991) / cg 10 (<=767)",
    "padding_y": "pt 100 / pb 150 (→80/80, 60/60, 40/40)",
    "notas": "imagen 630x425 r12 pegada abajo (justify-between, min-h 850); hairlines 1px #bfbfbf entre celdas; radios por caja: one BR10, two TR10, three BR+BL10, four BR10; .paragraph.land oculto <=767; .text-color-box (reveal) display:none <=991"
  },
  {
    "name": "projects",
    "container": "1320 (px 60), bg #fff",
    "cols_desktop": "grid 645px 645px, gap 30; columna derecha desplazada +246px",
    "cols_tablet": "igual (2 cols escalonadas, right-heading visible)",
    "cols_mobile": "1 col (flex column); card grid 1fr .5fr (<=767) → column (<=479)",
    "gap": "layout 80 · card-wrap 30 · lista 30 (20 en <=479)",
    "padding_y": "pt 150 / pb 150",
    "notas": "card 645x800 = rail 90 (bg #fae9ce, r12 izq, texto rotate(90deg)) + imagen 555x800 r12 dcha + overlay rgba(0,0,0,.3); offset 246 = right-heading 166 + gap 80; overlay y right-heading desaparecen en <=991/<=767; rotate(0) en <=767"
  },
  {
    "name": "process",
    "container": "1320 (px 60), sección oscura bg image cover 0 0",
    "cols_desktop": "grid 293.33px / 1026.67px (.25fr 1fr con suelo min-content); filas 1 / 2 / 4",
    "cols_tablet": "flex column centrado; filas 1 / 2 / 2",
    "cols_mobile": "scroller horizontal (flex row, overflow scroll), cards 400px (<=767) / 300px (<=479)",
    "gap": "content-wrap 12 → 20; center-wrap 16 → 20; bottom-wrap 0 → 20; element 10; step-image-info 50 → 30 → 20",
    "padding_y": "pt 150 / pb 150",
    "notas": "element max-w 590 mx-auto justify-end; flecha 100x100 solo pasos 1-3 (display:none <=991); imagen de paso 380x95 r12 (h 150 <=991, 200 <=767); .blank.hide spacer en col2 de la fila 3; en <=991 cada card gana border 1px #616161 + r10 + p10"
  },
  {
    "name": "services",
    "container": "1320 (px 60), overflow hidden",
    "cols_desktop": "título grid 384px 896px (.3fr .7fr) gap 40 · cards grid 3x420 gap 30",
    "cols_tablet": "título igual · cards 2 cols gap 20",
    "cols_mobile": "título en columna (titular derecho oculto) · cards scroller <=767 → 1 col <=479",
    "gap": "layout 100 → 60 → 40 · title 40 · left/right content 40 · card interior 60 → 40 → 30 → 15",
    "padding_y": "pt 150 / pb 100",
    "notas": "border-top 1px #bfbfbf en services-title y border-right 1px en la col izq (ambos fuera en <=767); card 420x546 bg #fff r10 p 60/20, icon-box 150x150 r14 (80/60/40), texto bottom-aligned; marquee 2 filas de 110px gap 12 (10 en <=991); .paragraph.land oculto <=767; botón .button-hide aparece <=767"
  },
  {
    "name": "designcta",
    "container": "full-bleed 1440x885.4 + container interno 1320 (px 60)",
    "cols_desktop": "flex row: línea 16px | bloque 1284px (items-end)",
    "cols_tablet": "igual (min-height 500, margin-top 0)",
    "cols_mobile": "1 col; línea y subtítulo ocultos en <=479, botón alineado a la izquierda",
    "gap": "layout interno 20 · button-title 60 → 40 → 30 → 20 · title-wrap 80 → 30",
    "padding_y": "mt 100 (0 en <=991) · pt/pb 100 · min-height 880 / 500 / 350 / 300",
    "notas": "z-index 100; transform scale animado por scroll (~0.5 → 1) con origin center: el reposo es FULL-BLEED. Banda de ofertas aparte: section.no-padding h 91 (pt/pb 30 → 20), bg #fae9ce, overflow hidden, mb 100 → 0"
  },
  {
    "name": "advantages",
    "container": "1320 (px 60)",
    "cols_desktop": "grid 3 x 426.67px, gap 20, fila de 857px",
    "cols_tablet": "1 col de wrappers, cada wrapper grid 2 cols gap 20 (logo central oculto)",
    "cols_mobile": "scroller horizontal (flex overflow scroll), cajas min-w 250/280, max-h 300 → 250",
    "gap": "layout 80 · content 20 · dentro de cada columna 20",
    "padding_y": "pt 100 / pb 150",
    "notas": "alturas: izq 287 (border 1px #dbdbdb) + 550 = 857; centro 270+270+270; dcha 560+270 (7px de aire); overlays rgba(0,0,0,.4) y gradiente 3deg; corner-image absoluto inset auto 0 5% 60% rotate(-20deg); left-text-box top/left 50 → 40 → 20 → 15/10"
  },
  {
    "name": "products",
    "container": "1320 (px 60), bg #fff",
    "cols_desktop": "grid 3 x 420px, gap 30",
    "cols_tablet": "grid 2 cols, gap 30",
    "cols_mobile": "1 col (gap 20)",
    "gap": "layout 80 · lista 30 → 20 · products-content 40 → 20",
    "padding_y": "pt 150 / pb 150",
    "notas": "card 420x665 r12 bg #fef8f0 (→ #fae9ce en <=991, min-h 400 → 320); img contain 380x400 centrada (200x200 / 150); overlay .products-content absoluto inset 0 p 40/20 (30 / 20) justify-between; chip r5 p 7/20; botón View More centrado a 80px"
  },
  {
    "name": "testimonials",
    "container": "1320 (px 60), bg image cover",
    "cols_desktop": "1 col centrada (slide 1320x487) + flechas absolutas a los lados",
    "cols_tablet": "igual, flechas 50x50",
    "cols_mobile": "igual, sin cita (<=767); flechas 30x30 debajo del slider (<=479)",
    "gap": "layout 60 · slide 80 (var layout) · star-text 40 · image-info 20",
    "padding_y": "pt 150 / pb 100 (60 en <=479)",
    "notas": "quote max-w 1165 centrada; foto 260x190 r12; flechas border 3px #fff r10/r12 en x=60 y x=1320, centradas con margin auto; .slide-nav display:none en TODOS los breakpoints (no hay dots visibles)"
  },
  {
    "name": "blogs",
    "container": "1320 (px 60)",
    "cols_desktop": "flex row 888px (flex:1) + 402px (min-width), gap 30; fila 2 invertida",
    "cols_tablet": "igual, mini encogido a su contenido (~235), gap 20",
    "cols_mobile": "1 col con SOLO las imágenes (mini-box display:none <=767)",
    "gap": "layout 80 (entre filas) · info-box 30 → 20 · mini-box-text 40 → 30 → 20",
    "padding_y": "pt 150 / pb 100",
    "notas": "imagen 888x500 r12 (400/300/250) con .name-time-wrap absoluto inset auto 40 40 (20 / 12); mini-box 402x500 bg #fae9ce r12 p40 (20 en <=991); grid-template-columns declarado pero inerte (display:flex)"
  },
  {
    "name": "footer",
    "container": "1320 (px 60), bg image contain",
    "cols_desktop": "flex row 635 / 645 (items-end) + fila inferior full",
    "cols_tablet": "2 cols (items-start), form en columna con botón debajo",
    "cols_mobile": "1 col; todo centrado en <=479",
    "gap": "layout 40 · top 40 → 30 · left 40 → 30 → 20 · right 50 → 40 → 30 · pages 50 → 40 → 30 → 20 · bottom 45 → 30",
    "padding_y": "mt 100 (0 en <=991) · pt 100 / pb 100 (pb 20 en <=991)",
    "notas": "logo 220x70; input 635x58 r50 bg #191919; submit 143x54 absoluto inset auto 0 0 auto (static en <=991 y <=479); social 75x75 r100% border 1px (50/40/35); caja Quick Links bg #191919 r10 p 50/20 (40/30); hairline 1px #353535 con gap 45"
  }
]
```
