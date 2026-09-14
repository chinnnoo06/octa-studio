# Briefing común — Réplica de https://livinor.webflow.io/ (homepage)

Todos los paths son relativos a `c:/Users/alexm/Desktop/Octa Studio/replica/`.

## Qué es el sitio
"Livinor" — template Webflow de ecommerce para una marca de interiorismo/muebles.
Paleta cream + amarillo. Tipografía Sora (headings) + Inter (texto).
Stack original: Webflow + IX2 (238 elementos con `data-w-id`) + GSAP.

## Datos de referencia disponibles

| Archivo | Contenido |
|---|---|
| `references/pages/home/screenshots/desktop.png` | 1440×14463, captura por tiles con scroll real (animaciones ya disparadas) |
| `references/pages/home/screenshots/tablet.png` | 768×12238 |
| `references/pages/home/screenshots/mobile.png` | 375×8318 |
| `references/pages/home/crops/desktop/NN-nombre.png` | **Recortes por sección, escalados a 820px de ancho.** Empieza por aquí — son legibles de un vistazo |
| `references/pages/home/crops/mobile/NN-yNNNN.png` | Móvil en trozos de 1100px (ancho real 375) |
| `references/pages/home/crops/tablet/NN-yNNNN.png` | Tablet en trozos de 1400px (ancho 640) |
| `references/pages/home/dom.html` | DOM completo renderizado, 709KB |
| `references/pages/home/computed-styles.json` | 1285 nodos con bbox + getComputedStyle |
| `references/pages/home/design-tokens.json` | Frecuencias de color/tipo/radio + `rootVars` (variables CSS reales) |
| `references/pages/home/dynamic-state.json` | sliders, elementos animados, sticky, videos |
| `references/pages/home/interactivity.json` | Grep de firmas + sliders agrupados por sección |
| `references/pages/home/sections.json` | Las 11 secciones con su bbox en desktop |
| `references/pages/home/assets/images/` | 122 imágenes descargadas |
| `references/pages/home/assets/svgs/` | 70 SVGs inline extraídos |
| `references/shared-assets/fonts/` | 2 woff2 (Sora, Inter) |

## Design tokens REALES (extraídos de las variables CSS del sitio — son la verdad, no estimarlos)

```
--page-color      #fef8f0   (fondo de página, cream)
--card-color      #fae9ce   (fondo de tarjetas)
--beige-color     #f1dfc2   (beige más saturado)
--yellow          #ffd900   (acento)
--paragraph-color #575757   (texto párrafo)
--span-color      #8e8e8e   (gris de spans / segunda palabra de títulos)
--gray            #8e8e8e
--black           black
--white           white

Heading font: Sora, sans-serif
Text font:    Inter, sans-serif

font-size:  big-text 300px | hero-text 130px | display 124px
            h1 96px | h2 72px | h3 56px | h4 40px | h5 32px | h6 24px | paragraph 16px
line-height: big 110% | semi-big 112% | medium 114% | tiny 118%
             small 120% | semi-small 125% | mini 130% | extra-small 150%
font-weight: regular 400 | medium 500 | semi-bold 600

--_gap---big-section  150px
--_gap---section      100px
--_gap---layout        80px
--_gap---container     60px

Container: 1320px (ancho de contenido), viewport desktop 1440 → 60px de gutter a cada lado
```

## Las 11 secciones (bbox en desktop.png)

| # | Nombre | y | alto | Contenido |
|---|---|---|---|---|
| 0 | hero | 0 | 972 | Navbar + hero fullbleed, título fantasma "MOOD BEGINS AT HOME" |
| 1 | about | 972 | 1200 | "About Us" + título con reveal + stats 2×2 + imagen |
| 2 | projects | 2172 | 2393 | "OUR FEATURED work" + grid escalonado de 4 proyectos |
| 3 | process | 4565 | 1207 | Sección OSCURA, "OUR DESIGN", 5 steps con conectores |
| 4 | services | 5772 | 1546 | 3 tarjetas de servicio + marquee de texto de 2 filas |
| 5 | designcta | 7318 | 1076 | Imagen fullbleed "LET'S DESIGN YOUR DREAM HOME" + marquee de ofertas |
| 6 | advantages | 8394 | 1424 | "WHY CHOOSE us" + bento grid |
| 7 | products | 9818 | 1316 | "EXPLORE OUR collection" + 3 product cards |
| 8 | testimonials | 11134 | 932 | Sección OSCURA, carrusel con flechas + dots |
| 9 | blogs | 12066 | 1647 | "DESIGN insights" + 2 filas alternadas blog/autor |
| 10 | footer | 13713 | 750 | Footer oscuro, email gigante, form, quick links, social |

## Hallazgos ya confirmados (no re-investigar, darlos por buenos)

1. **Botón principal (`.button-white`)** — dos estados por Webflow IX2:
   - Desktop reposo: `.button-box` fondo **amarillo #ffd900**, `.arrow-div` oculto (`opacity:0; translate3d(-105%,0,0) scale(.75)`)
   - Desktop hover: box → blanco, arrow-div entra (opacity 1, translate 0, scale 1), círculo blanco con flecha ↗
   - Móvil (sin IX2): box **blanco** + `.arrow-div` **amarillo visible** con flecha ↗
2. **Títulos de sección de dos tonos**: primera parte negra, segunda parte gris `#8e8e8e`. La segunda palabra aparece **3 veces repetida en el DOM** (`work|work|work`, `us|us|us`, `Collection|Collection|Collection`, `Insights|Insights|Insights`) → es un **rotador vertical de texto** animado.
3. **Marquees** (todos con clase `*-slider`, son loops CSS/JS, NO carruseles con flechas):
   - `hero-slider` 690×422 @y550 — tira de imágenes de interiores
   - `top-slider` (35 items) + `bottom-slider` (28 items) @y6986 — marquee de texto gigante 2 filas, direcciones opuestas: "RENOVATION ⧉ PLANNING" / "STYLING ⧉ RENOVATION"
   - `design-slider` @y8333 — marquee de ofertas: "20% OFF FIRST CONSULTATION + + 10% OFF THIS MONTH + + FREE SPACE PLANNING"
4. **Carrusel real**: `testimonial-slider` @y11478, 1320×487, **tiene flechas y dots** (`w-slider-nav`, `w-slider-arrow-left/right`)
5. **Navbar**: `megamenu-dropdown` en el item "Pages"; carrito tipo `rightDropdown` con badge amarillo de contador
6. **Badge rotatorio** en advantages: clase `rotate` ×8, anillo de puntos + texto circular "DESIGNS STARK DESIGNS"
7. **Clases de breakpoint del original**: `dex-hide` (ocultar en desktop), `mobile-center`, etc. El sitio tiene **bloques de markup separados** para desktop y móvil en el hero — el layout móvil NO es un simple stack del desktop.
8. **Sticky**: 0 elementos sticky/fixed en reposo. La navbar NO es sticky en estado inicial.
9. La sección `about` y `services` tienen **reveal de texto palabra a palabra** (gris → negro al hacer scroll). En el screenshot desktop se ve a medio camino: en `about` las palabras "FOR THEMSELVES" siguen grises, en `services` "RS TO LIGHTING, WE CRAFT SPACES..." sigue gris. **Eso es un artefacto de la captura, no el diseño final**: el estado final es todo negro.

## Stack de destino (fijo, no negociable)

Next.js 16 App Router · React 19 · TypeScript strict · **Tailwind CSS v4 (config CSS-first en `src/app/globals.css`, NO existe `tailwind.config.ts`)** · código en `src/` · alias `@/*` → `src/*` · framer-motion · embla-carousel · lucide-react.

## Reglas para ti como analyst

- Escribe **solo** tu archivo de output. No toques ningún otro archivo.
- Los valores de los tokens de arriba son la verdad medida. Úsalos, no los aproximes a ojo.
- Si dudas de algo, **anótalo como duda en tu archivo**; no lo inventes.
- Mide en el `computed-styles.json` antes de estimar a ojo desde el PNG.
- Al final de tu .md, incluye un bloque ```json con los datos clave estructurados.
