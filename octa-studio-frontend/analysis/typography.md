# Tipografía aplicada — homepage Livinor

> Fuente de verdad: `references/pages/home/computed-styles.json` (1285 nodos, 270 con texto),
> `references/pages/home/design-tokens.json` (`rootVars`) y **el CSS real del sitio**
> (`scripts/tmp-motion-livinor.css`, 245 KB, la hoja `livinor.webflow.shared.b013c6ece.css` descargada).
> El CSS resuelve las dudas de responsive: **las variables tipográficas se redefinen sobre `body` dentro de cada media query**.
> Medidas verificadas contra `crops/desktop|tablet|mobile/`.

---

## 1. Fuentes

### Lo que carga el original

```html
<link rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700|Sora:300,400,500,600,700">
```

Pide 5 pesos de cada una, pero **el 300 no se usa en ninguna parte de la homepage**.

### Pesos realmente usados (conteo sobre 1285 nodos computados)

| Familia | Rol | Pesos usados | Dónde |
|---|---|---|---|
| **Sora** | headings (`--heading-font`) | **600** (semi-bold), **700** | 600 → todos los `h1`–`h6`, `.design-text`, `.mail-text`. 700 → **solo** `.hero-text` (el h1 del hero y su span) |
| **Inter** | texto (`--text-font`) | **400**, **500**, **600**, **700** | 400 `.paragraph`/`.bottom-link` · 500 `.button-text`, `.nav-link-text`, `.link-text`, `.product-text`, `.slot-text` · 600 `.sub-text`, `.step-text`, `.nav-link-text.w--current`, `.paragraph.cart` · 700 `.point-text.white` y el badge del carrito |

Frecuencia bruta de `font-weight` en el DOM: `400 → 1091`, `600 → 205`, `500 → 24`, `700 → 6`.
Los 6 nodos con 700 son: h1 hero + su span (Sora), 3 × `.point-text` y el contador del carrito (Inter).

**Sora nunca usa 400/500.** No hay cursivas (`font-style` no aparece en ninguna regla de contenido).

### Configuración `next/font/google` recomendada

Ambas son variables en Google Fonts (Sora `wght 100–800`, Inter `wght 100–900`).
Omitir `weight` descarga **un solo archivo variable** por familia y cubre 600/700 y 400–700 respectivamente
— más ligero que 2 + 4 instancias estáticas y sin riesgo de faltar un peso.

```ts
// src/app/layout.tsx
import { Sora, Inter } from "next/font/google";

export const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  // variable font: cubre 100-800, usamos 600 y 700
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-text",
  display: "swap",
  // variable font: cubre 100-900, usamos 400/500/600/700
});
```

Aplicar en `<html className={`${sora.variable} ${inter.variable}`}>`.

Si se prefiere fijar instancias estáticas (mismo comportamiento que el original):

```ts
const sora  = Sora({  subsets: ["latin"], weight: ["600", "700"],               variable: "--font-heading", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-text",    display: "swap" });
```

**Subset**: solo `latin`. Todo el copy es ASCII salvo `’` (U+2019, en "Let's") y `“ ”` (comillas de testimonios), que están en `latin`. No hace falta `latin-ext`.

Los `.woff2` de `references/shared-assets/fonts/` **no se usan**: `next/font/google` auto-hospeda.
Referencia de identificación (por el patrón de URL de Google Fonts):
`UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2` = Inter latin · `xMQbuFFYT72XzQUpDg.woff2` = Sora.

### letter-spacing

**Ninguna regla de contenido define `letter-spacing`.** En las 245 KB de CSS solo hay 2 apariciones y las dos son
resets internos de Webflow (`.w-richtext … {letter-spacing: unset}` y `.w-lightbox-backdrop {letter-spacing: normal}`).
`design-tokens.json → letterSpacings` está vacío y todos los `typography_samples` reportan `letterSpacing: "normal"`.

→ **`letter-spacing: normal` en todo el sitio.** No inventar tracking negativo en los titulares grandes.

---

## 2. La escala: variables reales y su responsive

Webflow declara la escala en `:root` y **la redefine entera sobre `body`** dentro de cada media query.
Ese es el mecanismo que hace que todo escale con una sola clase. Breakpoints (todos `max-width`):

| viewport de captura | media queries activas |
|---|---|
| desktop 1440 | base |
| **tablet 768** | base + `≤991` (768 > 767, así que **NO** entra `≤767`) |
| **mobile 375** | base + `≤991` + `≤767` + `≤479` → gana `≤479` |

### font-size por breakpoint

| Variable | Desktop (≥992) | ≤991 (tablet 768) | ≤767 | ≤479 (mobile 375) |
|---|---|---|---|---|
| `--font-size--big-text` | 300px | 180px | 100px | 75px |
| `--font-size--hero-text` | **130px** | **52px** | 42px | **38px** |
| `--font-size--display` | 124px | 52px | 42px | 38px |
| `--font-size--h1` | **96px** | **42px** | 32px | **28px** |
| `--font-size--h2` | **72px** | **32px** | 28px | **26px** |
| `--font-size--h3` | **56px** | **28px** | 24px | **24px** |
| `--font-size--h4` | **40px** | **24px** | 22px | **22px** |
| `--font-size--h5` | **32px** | **22px** | 20px | **20px** |
| `--font-size--h6` | **24px** | **20px** | 18px | **18px** |
| `--font-size--paragraph` | **16px** | 16px | 16px | **16px** |

`big-text` (300px) y `display` (124px) **no se usan en la homepage** en desktop.
`display` sí aparece indirectamente: `.mail-text` pasa a `var(--display)` a partir de `≤991`.

### line-height: los ratios NO cambian nunca

Son idénticos en los 4 breakpoints. Cada tamaño tiene su ratio fijo:

| Variable | Ratio | Se aplica a | px en desktop |
|---|---|---|---|
| `--font-height--big` | **110%** | `hero-text`, `design-text` | 130 → **143px** |
| `--font-height--semi-big` | **112%** | `h1`, `display` (`mail-text` ≤991) | 96 → **107.52px** |
| `--font-height--medium` | **114%** | `h2` | 72 → **82.08px** |
| `--font-height--tiny` | **118%** | `h3`, `mail-text` (desktop) | 56 → **66.08px** |
| `--font-height--small` | **120%** | `h4` | 40 → **48px** |
| `--font-height--semi-small` | **125%** | `h5` | 32 → **40px** |
| `--font-height--mini` | **130%** | `h6` | 24 → **31.2px** |
| `--font-height--extra-small` | **150%** | `paragraph` | 16 → **24px** |

**Todos estos valores están confirmados 1:1 contra `computed-styles.json`** (143, 107.52, 82.08, 66.08, 48, 40, 31.2, 24 px).

### Tabla completa size/line-height por breakpoint

| Nivel | Desktop | ≤991 | ≤767 | ≤479 |
|---|---|---|---|---|
| hero-text (110%) | 130 / 143 | 52 / 57.2 | 42 / 46.2 | 38 / 41.8 |
| design-text (110%) | 130 / 143 | 52 / 57.2¹ | 42 / 46.2¹ | 38 / 41.8¹ |
| mail-text | 76 / 89.68 (118%) | 52 / 58.24 (112%)² | 42 / 47.04 (112%) | 38 / 42.56 (112%) |
| h1 (112%) | 96 / 107.52 | 42 / 47.04 | 32 / 35.84 | 28 / 31.36 |
| h2 (114%) | 72 / 82.08 | 32 / 36.48 | 28 / 31.92 | 26 / 29.64 |
| h3 (118%) | 56 / 66.08 | 28 / 33.04 | 24 / 28.32 | 24 / 28.32 |
| h4 (120%) | 40 / 48 | 24 / 28.8 | 22 / 26.4 | 22 / 26.4 |
| h5 (125%) | 32 / 40 | 22 / 27.5 | 20 / 25 | 20 / 25 |
| h6 (130%) | 24 / 31.2 | 20 / 26 | 18 / 23.4 | 18 / 23.4 |
| paragraph (150%) | 16 / 24 | 16 / 24 | 16 / 24 | 16 / 24 |

¹ `.design-text` tiene overrides **explícitos** (`52px` @≤991, `42px` @≤767, `38px` @≤479), no usa la var. Coinciden con `hero-text`.
² `.mail-text` @≤991: `font-size: var(--display); line-height: var(--semi-big)` → cambia de ratio 118% a 112%.

**El body text nunca escala**: 16px/24px en los 4 breakpoints. Las únicas excepciones son el input del footer (14px/20px, viene del reset `.w-input`) y el badge del carrito (11px/18px, `.w-commerce-commercecartopenlinkcount`).

### Verificación visual (medida sobre los crops)

| Elemento | Breakpoint | Predicción CSS | Medido en crop |
|---|---|---|---|
| "MOOD BEGINS AT HOME" | mobile 375 (1:1) | 38px | ~37–38px ✅ |
| "OUR FEATURED WORK" | tablet 768 (crop ×0.833) | 32px | ~33px ✅ |
| "OUR HAPPY CUSTOMERS" | mobile 375 | 26px | ~26px ✅ |
| "WOODEN CHAIR" (h6) | mobile 375 | 18px | ~18px ✅ |
| "LET'S DESIGN YOUR DREAM HOME" | mobile 375 | 38px | ~38px ✅ |
| "LIGHTING SOLUTIONS" (h4) | mobile 375 | 22px | ~22px ✅ |
| "hi@livinor.com" | mobile 375 | 38px | ~38px ✅ |

---

## 3. Mapeo escala → clase CSS

| Clase | Familia | Nivel | Peso | Transform | Color base | Notas |
|---|---|---|---|---|---|---|
| `.hero-text` | Sora | hero-text 130/143 | **700** | uppercase | `--white` | `text-align: right` (desktop) |
| `.design-text` | Sora | 130/143 | 600 | uppercase | `--white` | tamaños propios en responsive |
| `.mail-text` | Sora | 76/89.68 | 600 | **lowercase** | `--white` | tamaño fuera de la escala en desktop |
| `.h1` / `h1` | Sora | h1 96/107.52 | 600 | uppercase | `--black` | `.h1` añade `text-align: left` |
| `.h2` / `h2` | Sora | h2 72/82.08 | 600 | uppercase | `--black` | `.h2` añade `text-align: left` |
| `.h3` / `h3` | Sora | h3 56/66.08 | 600 | uppercase | `--black` | |
| `.h4` / `h4` | Sora | h4 40/48 | 600 | uppercase | `--black` | |
| `.h5` / `h5` | Sora | h5 32/40 | 600 | uppercase | `--black` | |
| `.h6` / `h6` | Sora | h6 24/31.2 | 600 | uppercase | `--black` | |
| `.paragraph` | Inter | body 16/24 | 400 | — | `--paragraph-color` #575757 | `text-align: left` |
| `.sub-text` | Inter | body 16/24 | **600** | — | `--black` | eyebrow de sección |
| `.button-text` | Inter | body 16/24 | 500 | — | `--black` | `white-space: nowrap` |
| `.nav-link-text` | Inter | body 16/24 | 500 | — | `--black` | `nowrap`; `.w--current` → 600 |
| `.link-text` | Inter | body 16/24 | 500 | — | `--white` | `.w--current` → `--yellow` |
| `.product-text` | Inter | body 16/24 | 500 | — | `--black` | chip de categoría |
| `.slot-text` | Inter | body 16/24 | 500 | — | #575757 | |
| `.step-text` | Inter | body 16/24 | **600** | — | `--yellow` | "Step 01…05" |
| `.point-text.white` | Inter | body 16/24 | **700** | — | `--white` | lista numerada del hero |
| `.bottom-link` | Inter | body 16/24 | 400 | — | `--yellow` | |
| `.paragraph.footer` | Inter | body 16/24 | 400 | — | **#d7d7d7** | único gris que no es un token |
| `.paragraph.cart` | Inter | body 16/24 | 600 | — | `--black` | |
| `.footer-text-field` (`.w-input`) | Inter | **14/20** | 400 | — | #333 (placeholder #999) | viene del reset de Webflow |
| `.cart-quantity` (`.w-commerce…count`) | Inter | **11/18** | **700** | — | `--black` sobre amarillo | `text-align: center` |

Modificadores de color: `.white`→`--white` · `.black`→`--black` · `.yellow`→`--yellow #ffd900` · `.color`→`#8e8e8e` · `.h6.footer`→`--white`.
Modificadores de alineación: `.center`, `.right`, `.text-center`, `.tab-center` (solo centra @≤991), `.land-center` (@≤767), `.mobile-center` (@≤479).
Modificadores de wrap: `.no-wrap`/`.rotate`→`white-space: nowrap` · `.wrap`/`.pre-wrap`→`white-space: pre-wrap`.

---

## 4. Mapeo por sección (desktop)

### Navbar (compartida)

| Texto | Etiqueta / clase | Familia | Size/LH | Peso | Color |
|---|---|---|---|---|---|
| Home (activo) | `a.nav-link-text.white.w--current` | Inter | 16/24 | **600** | #fff + `text-decoration: underline` |
| About us · Projects · Shop | `a.nav-link-text.white` | Inter | 16/24 | 500 | #fff |
| Pages (megamenu) | `p.nav-link-text.megamenu.white` | Inter | 16/24 | 500 | #fff |
| `0` (badge carrito) | `div.w-commerce-commercecartopenlinkcount.cart-quantity` | Inter | **11/18** | **700** | #000 sobre `--yellow` |

### 0 · hero (y 0–972)

| Texto | Clase | Nivel | Size/LH | Peso | Color | Transform |
|---|---|---|---|---|---|---|
| Mood Begins at **home** | `h1.hero-text.section-title` | **hero-text** | **130 / 143** | **700** | #fff · span `.yellow-span` **#f1dfc2** | uppercase |
| 1. Interior Styling · 2. Space Planning · 3. Mood Lighting | `p.point-text.white` | body | 16/24 | **700** | #fff | — |
| Designing Modern Homes **Since 2014** | `h2.h6.white.mobile-center` | h6 | 24/31.2 | 600 | #fff · span `.yellow-span` #f1dfc2 | uppercase |
| Contact Now | `p.button-text` | body | 16/24 | 500 | #000 | — |

✅ **Confirmado**: el h1 del hero mide exactamente **130px con line-height 143px (110%) y peso 700** — es el único
elemento del sitio con Sora 700. Caja de layout 998×286 = **2 líneas** ("MOOD BEGINS" / "AT HOME"), `text-align: right`.

### 1 · about (y 972–2172)

| Texto | Clase | Nivel | Size/LH | Peso | Color |
|---|---|---|---|---|---|
| About Us | `p.sub-text` | body | 16/24 | 600 | #000 |
| From homes to offices… speak for themselves | `h3.h4` | **h4** | **40 / 48** | 600 | #000, uppercase — reveal palabra a palabra |
| **2014 · 350 · 200 · 25** (odómetro) | `h3.h3` | **h3** | **56 / 66.08** | 600 | #000, uppercase |
| **+** (sufijo de 350/200/25) | `h3.h3` | h3 | 56 / 66.08 | 600 | #000 |
| Establishment · Projects finished · Happy Clients · Ongoing Projects | `h4.h6.right` | h6 | 24/31.2 | 600 | #000, uppercase, `text-align: right` |
| Over a decade… / Homes to offices… / People who love… | `p.paragraph.right.land` | body | 16/24 | 400 | #575757, `text-align: right` |
| Want Design | `p.button-text` | body | 16/24 | 500 | #000 |
| Slots are available | `p.slot-text` | body | 16/24 | 500 | #575757 |

> Los números son **contadores tipo odómetro**: cada stat es una pila vertical de `h3.h3` (2014→2013→…→2006, 350→349→…→341) dentro de un contenedor con `overflow: hidden`. **Todos los dígitos son h3 56/66.08.** El "+" es un `h3.h3` hermano, no parte del número.

### 2 · projects (y 2172–4565)

| Texto | Clase | Nivel | Size/LH | Peso | Color |
|---|---|---|---|---|---|
| Our Projects | `p.sub-text` | body | 16/24 | 600 | #000, centrado |
| **OUR FEATURED** | `h2.h2.tab-center` | **h2** | **72 / 82.08** | 600 | #000, uppercase |
| **work** (×3, rotador) | `h2.h2.tab-center` ×2 + `h2.h2.tab-center.color` | h2 | 72 / 82.08 | 600 | 2 negras + **la 3ª #8e8e8e** ← la visible |
| Discover our collection… | `p.paragraph` | body | 16/24 | 400 | #575757 |
| View All Projects | `p.button-text` | body | 16/24 | 500 | #000 |
| Velora Haven / Serenith Home / Nuvell Retreat / Luneth Maison | `h3.h6.rotate` | h6 | 24/31.2 | 600 | #000, uppercase, `nowrap`, **`transform: rotate(90deg)`**, `margin-top: 80px` |
| 2024 / 2023 / 2024 / 2022 | `h3.h6.rotate` | h6 | 24/31.2 | 600 | ídem |

### 3 · process (y 4565–5772) — sección OSCURA

| Texto | Clase | Nivel | Size/LH | Peso | Color |
|---|---|---|---|---|---|
| Our Process | `p.sub-text.white` | body | 16/24 | 600 | #fff, centrado |
| **OUR DESIGN** | `h2.h2.white` | **h2** | **72 / 82.08** | 600 | #fff, uppercase |
| Step 01 … Step 05 | `p.step-text` | body | 16/24 | **600** | **#ffd900** |
| Discovery · Concept Design · Planning · Execution · Final Touch | `h3.h6.white` | h6 | 24/31.2 | 600 | #fff, uppercase |
| descripciones de paso | `p.paragraph.white` | body | 16/24 | 400 | #fff |

> ⚠️ **"OUR DESIGN" NO es un título de dos tonos ni tiene rotador.** Es un único `h2.h2.white` sin span. El markup es `<h2 class="h2 white">Our Design</h2>` a secas.

### 4 · services (y 5772–7318)

| Texto | Clase | Nivel | Size/LH | Peso | Color |
|---|---|---|---|---|---|
| Our Services | `p.sub-text` | body | 16/24 | 600 | #000 |
| From interiors to lighting… | `h3.h4` | **h4** | **40 / 48** | 600 | #000, uppercase — reveal palabra a palabra |
| View All Services | `p.button-text` | body | 16/24 | 500 | #000 |
| **Lighting Solutions · Space Planning · Furniture Styling** | `h2.h4` | **h4** | **40 / 48** | 600 | #000, uppercase |
| descripciones de tarjeta | `p.paragraph.land` | body | 16/24 | 400 | #575757 |
| **RENOVATION · PLANNING · STYLING** (marquee 2 filas) | `h3.h1` | **h1** | **96 / 107.52** | 600 | #000, uppercase, `text-align: left` |

> El marquee gigante usa el **nivel h1 (96px/107.52px)**, no `hero-text`. Fila superior `.top-slider` (35 items) y fila inferior `.bottom-slider` (28 items), en direcciones opuestas. Cada item es un `h3` con clase `.h1`.

### 5 · designcta (y 7318–8394)

| Texto | Clase | Nivel | Size/LH | Peso | Color |
|---|---|---|---|---|---|
| Design Your Space with **Purpose** | `div.h6.white-icon.land` | h6 | 24/31.2 | 600 | #fff · span `.yellow-span` **#f1dfc2** — `display: none` @≤479 |
| **Let's Design Your Dream HOME** | `h2.design-text.section-title` | **hero-text/design** | **130 / 143** | **600** | #fff · span `.yellow-span` **#f1dfc2** |
| Lets Talk | `p.button-text` | body | 16/24 | 500 | #000 |
| 20% Off First Consultation · 10% Off This Month · Free Space Planning (marquee) | `h2.h6.no-wrap` | h6 | 24/31.2 | 600 | #000, uppercase, `white-space: nowrap` |

> ⚠️ Mismo tamaño que el hero (130/143) pero **peso 600, no 700**. Caja de layout **1283.22 × 429px = 3 líneas** ("LET'S DESIGN" / "YOUR DREAM" / "HOME"), confirmado en el crop.
> El `bbox` de `computed-styles.json` marca 642×215 (exactamente la mitad) porque el crawler capturó el elemento a mitad de una animación IX2 `scale(0.5)`. **Usar los valores de `width`/`height` del CSS (1283.22×429), no el bbox.**

### 6 · advantages (y 8394–9818)

| Texto | Clase | Nivel | Size/LH | Peso | Color |
|---|---|---|---|---|---|
| Advantages | `p.sub-text` | body | 16/24 | 600 | #000 |
| **WHY CHOOSE** | `h2.h2.tab-center` | **h2** | **72 / 82.08** | 600 | #000, uppercase |
| **us** (×3, rotador) | `h2.h2.tab-center` ×2 + `.color` | h2 | 72 / 82.08 | 600 | 3ª **#8e8e8e** ← la visible |
| Bold/Stark/Nexo/Prime/Aura Designs (badge rotatorio) | `h3.h6.center` | h6 | 24/31.2 | 600 | #000, uppercase, centrado |
| Unique Design asthetic · Client-Focused Approach | `h3.h6.white` | h6 | 24/31.2 | 600 | #fff, uppercase |
| Attention to details | `h3.h6.white.pre-wrap` | h6 | 24/31.2 | 600 | #fff, `white-space: pre-wrap` |
| Proven Work and Trusted Reputation | `h3.h6.land` | h6 | 24/31.2 | 600 | #000 |
| **350+** (odómetro) | `h3.h3` + `h3.h3` ("+") | **h3** | **56 / 66.08** | 600 | #000 |
| Project Launched | `p.paragraph.black` | body | 16/24 | 400 | #000 |

### 7 · products (y 9818–11134)

| Texto | Clase | Nivel | Size/LH | Peso | Color |
|---|---|---|---|---|---|
| Featured Products | `p.sub-text` | body | 16/24 | 600 | #000, centrado |
| **EXPLORE OUR** | `h2.h2.tab-center` | **h2** | **72 / 82.08** | 600 | #000, uppercase |
| **Collection** (×3, rotador) | `h2.h2.tab-center` ×2 + `.color` | h2 | 72 / 82.08 | 600 | 3ª **#8e8e8e** ← la visible |
| Chair · Chair · Bed (chip de categoría) | `p.product-text` | body | 16/24 | 500 | #000 |
| $ 499.00 USD · $ 599.00 USD · $ 299.00 USD | `p.paragraph.black` | body | **16/24** | 400 | #000 |
| leather armchair · wooden chair · leather bed | `h3.h6` | h6 | 24/31.2 | 600 | #000, uppercase |
| Cart | `p.paragraph.white` | body | 16/24 | 400 | ⚠️ computado **rgb(0,0,0)** (ver dudas) |
| View More | `p.button-text` | body | 16/24 | 500 | #000 |

> Los **precios son body text normal (16/24, peso 400)**, no un nivel de heading. El nombre del producto sí es h6.

### 8 · testimonials (y 11134–12066) — sección OSCURA

| Texto | Clase | Nivel | Size/LH | Peso | Color |
|---|---|---|---|---|---|
| Testimonials | `p.sub-text.white` | body | 16/24 | 600 | #fff, centrado |
| **OUR HAPPY CUSTOMERS** | `h2.h2.white.center` | **h2** | **72 / 82.08** | 600 | #fff, uppercase, **centrado** |
| citas de testimonio | `p.paragraph.white.land-hide-text` | body | 16/24 | 400 | #fff, centrado — `display: none` @≤767 |
| Ethan Miller · Jashon · Noah Mike · Ali Hamja | `h3.h6.white` | h6 | 24/31.2 | 600 | #fff, uppercase |
| Decorator · Professor · Assistant · Editor | `p.paragraph.yellow` | body | 16/24 | 400 | **#ffd900** |

> ⚠️ **"OUR HAPPY CUSTOMERS" es de un solo tono y sin rotador**, a diferencia de los otros títulos h2. `<h2 class="h2 white center">Our Happy Customers</h2>`.

### 9 · blogs (y 12066–13713)

| Texto | Clase | Nivel | Size/LH | Peso | Color |
|---|---|---|---|---|---|
| Our Blogs | `p.sub-text` | body | 16/24 | 600 | #000 |
| **DESIGN** | `h2.h2.tab-center` | **h2** | **72 / 82.08** | 600 | #000, uppercase |
| **Insights** (×3, rotador) | `h2.h2.tab-center` ×2 + `.color` | h2 | 72 / 82.08 | 600 | 3ª **#8e8e8e** ← la visible |
| The Art of Home and Living | `h3.h5.white` | **h5** | **32 / 40** | 600 | #fff, uppercase |
| Elegant Spaces Journal of Style | `h4.h5.white` | **h5** | **32 / 40** | 600 | #fff, uppercase |
| May 18, 2025 · Feb 14, 2025 | `p.paragraph.white` | body | 16/24 | 400 | #fff |
| About Author | `h3.h6` | h6 | 24/31.2 | 600 | #000, uppercase |
| Isabella Moore · William Clarke | `p.paragraph.black` | body | 16/24 | 400 | #000 |
| Read More | `p.button-text.white` | body | 16/24 | 500 | #fff |

### 10 · footer (y 13713–14463) — sección OSCURA

| Texto | Clase | Nivel | Size/LH | Peso | Color |
|---|---|---|---|---|---|
| Designs that define **your space** | `h3.h6.footer` | h6 | 24/31.2 | 600 | #fff · span **`.card-span` #fae9ce** |
| **hi@livinor.com** | `h2.mail-text` | **custom 76** | **76 / 89.68** (118%) | 600 | #fff, **`text-transform: lowercase`** |
| Enter your mail (input) | `input.footer-text-field.w-input` | **14 / 20** | 400 | #333 · placeholder #999 |
| Quick links | `h3.h6.yellow` | h6 | 24/31.2 | 600 | **#ffd900**, uppercase |
| Home (activo) · About · Services · Projects · Shop · Blogs · Licenses | `a.link-text` | body | 16/24 | 500 | #fff · `.w--current` → **#ffd900** |
| Copyright © Livinor \| Designed by … / Powered by … | `p.paragraph.footer` | body | 16/24 | 400 | **#d7d7d7** |
| Theme Sleek · Webflow | `a.bottom-link` | body | 16/24 | 400 | **#ffd900** |
| Thank you! / Oops! (estados del form) | `h3.h6` / `h3.h6.center` | h6 | 24/31.2 | 600 | — |

> El email gigante mide **76px**, un valor **fuera de la escala declarada** (está entre h2=72 y h1=96) y con ratio 118% (`tiny`, el de h3). Es un one-off literal en `.mail-text`. En responsive sí entra en la escala (`var(--display)` con ratio 112%).

---

## 5. Transformaciones (`text-transform`) — crítico para el copy

**Regla general: TODO lo que es Sora va en `uppercase` por CSS; TODO lo que es Inter va sin transformar.**
El contenido en el DOM está escrito en **Title Case** y el CSS lo pone en mayúsculas. Hay que replicar el copy tal cual está en el DOM y dejar que el CSS haga la conversión — así se preservan los espaciados de glifo y el reveal palabra a palabra funciona igual.

| Clase | `text-transform` | Copy en el DOM | Se ve como |
|---|---|---|---|
| `h1`–`h6`, `.h1`–`.h6` | **uppercase** | Title Case | MAYÚSCULAS |
| `.hero-text` | **uppercase** | `Mood Begins at <span>home</span>` | MOOD BEGINS AT **HOME** |
| `.design-text` | **uppercase** | `Let’s Design Your Dream <span>Home</span>` | LET'S DESIGN YOUR DREAM **HOME** |
| `.mail-text` | **lowercase** | `hi@livinor.com` | hi@livinor.com (ya estaba en minúsculas) |
| `.paragraph`, `.sub-text`, `.button-text`, `.nav-link-text`, `.link-text`, `.point-text`, `.step-text`, `.product-text`, `.slot-text`, `.bottom-link` | ninguna (`none`) | tal cual | tal cual |

Ejemplos concretos de copy a escribir literal (NO en mayúsculas en el JSX):

- `Mood Begins at ` + `<span className="…">home</span>` → se ve MOOD BEGINS AT HOME
- `Our Featured` / `work` → OUR FEATURED WORK
- `Why choose` / `us` → WHY CHOOSE US
- `Explore Our` / `Collection` → EXPLORE OUR COLLECTION
- `Design` / `Insights` → DESIGN INSIGHTS
- `Our Design` → OUR DESIGN
- `Our Happy Customers` → OUR HAPPY CUSTOMERS
- `Let’s Design Your Dream ` + `Home` → LET'S DESIGN YOUR DREAM HOME
- `Designing Modern Homes ` + `Since 2014` → DESIGNING MODERN HOMES SINCE 2014
- `Designs that define ` + `your space` → DESIGNS THAT DEFINE YOUR SPACE
- `Renovation` / `Planning` / `Styling` (marquee) → RENOVATION / PLANNING / STYLING
- `leather armchair`, `wooden chair`, `leather bed` → LEATHER ARMCHAIR, … (aquí el copy está en minúsculas y el CSS lo sube)
- `10% Off This Month`, `Free Space Planning`, `20% Off First Consultation` → 10% OFF THIS MONTH, …
- Eyebrows sin transformar: `About Us`, `Our Projects`, `Our Process`, `Our Services`, `Advantages`, `Featured Products`, `Testimonials`, `Our Blogs` → se ven en Title Case tal cual

Nota: el apóstrofo de "Let's" en el original es **U+2019 (`’`)**, no `'`.

---

## 6. Títulos de dos tonos — hay TRES colores de span, no uno

⚠️ **La clase `yellow-span` NO es amarilla.** `.yellow-span { color: var(--beige-color) }` = **#f1dfc2 (crema)**. El nombre es engañoso.

| Clase de span | Color CSS | Valor | Dónde aparece |
|---|---|---|---|
| **`.yellow-span`** | `var(--beige-color)` | **#f1dfc2** (crema) | Hero h1 → "home" · Hero h6 → "Since 2014" · designcta h6 → "Purpose" · designcta h2 → "Home" |
| **`.card-span`** | `var(--card-color)` | **#fae9ce** (crema más claro) | Footer h6 → "your space" |
| **`.color`** (sobre `.h2.tab-center`) | literal | **#8e8e8e** (gris) | 3ª copia del rotador en los títulos de sección |
| `.h1-span` | literal | #8e8e8e | declarada pero **no usada** en la homepage |

✅ **Confirmada la diferencia que se pedía verificar**: en el **hero** el span es **CREMA #f1dfc2**;
en los **títulos de sección** la segunda palabra es **GRIS #8e8e8e**. Son mecanismos distintos:
el crema es un `<span>` inline dentro del mismo heading; el gris es la **tercera copia de un rotador vertical**.

### Anatomía del rotador (títulos de sección de dos tonos)

```html
<div class="h2-section-title">              <!-- display:flex; gap:10px; align-items:center -->
  <h2 class="h2 tab-center">Our Featured</h2>
  <div class="h2-counter-wrap">             <!-- height:85px; overflow:hidden -->
    <div class="h2-title-counter"           <!-- flex-column; overflow:hidden -->
         style="transform: translate3d(0, -66%, 0)">
      <h2 class="h2 tab-center">work</h2>         <!-- #000 -->
      <h2 class="h2 tab-center">work</h2>         <!-- #000 -->
      <h2 class="h2 tab-center color">work</h2>   <!-- #8e8e8e ← estado final visible -->
    </div>
  </div>
</div>
```

- `translateY(-66%)` sobre una pila de 3 → deja visible el **tercer** elemento ⇒ **el estado de reposo muestra la palabra GRIS**.
- Confirmado en los bbox: la copia gris queda en `y=2376` y el `h2` fijo "Our Featured" en `y=2375`.
- Altura del `.h2-counter-wrap`: **85px** desktop · **36px** @≤991 · **30px** @≤767 · **28px** @≤479.
- Aplica a: projects (`work`), advantages (`us`), products (`Collection`), blogs (`Insights`).
- **NO aplica** a process ("Our Design") ni testimonials ("Our Happy Customers") — ésos son h2 planos de un solo tono.

---

## 7. Responsive: cambios de layout tipográfico (además del tamaño)

Además de la escala de la §2, estas reglas cambian el comportamiento del texto:

| Selector | Desktop | ≤991 | ≤767 | ≤479 |
|---|---|---|---|---|
| `.hero-text` | `text-align: right` | `left` | (left) | **`center`** |
| `.mail-text` | `left` | (left) | (left) | **`center`** |
| `.h1.tab-center`, `.h2.tab-center` | `left` | **`center`** | (center) | (center) |
| `.h2.land-center` | — | — | **`center`** | (center) |
| `.h6` | (según variante) | — | **`text-align: left`** | — |
| `.h6.right` | `right` | — | **`left`** | — |
| `.h6.white.pre-wrap` | `left` | — | **`center`** + `pre-wrap` | — |
| `.h5.mobile-center`, `.h5.mini-size`, `.h6.footer`, `.h6.white.mobile-center` | — | — | — | **`center`** |
| `.h5.mini-size` | h5 | — | **`font-size: 16px`** + center | (16px) |
| `.h6.rotate` (títulos de tarjeta de proyecto) | `rotate(90deg)`, `mt:80px` | `rotate(90deg)`, `mt:110px`, `mb:40px` | **`rotate(0)`**, `mt/mb:0` | (horizontal) |
| `.h2-section-title` | `align-items: center` | `align-items: flex-start` | `.wrap → flex-flow: wrap` | **`flex-flow: wrap`** |
| `.paragraph.white.land-hide-text` (citas) | visible, centrado | centrado | **`display: none`** | `display: none` |
| `.paragraph.right` | `right` | — | **`left`** | — |
| `.paragraph.footer` | `left` | — | — | **`center`** |
| `.h5.land`, `.h6.land`, `.paragraph.land` | visible | visible | **`display: none`** | `display: none` |
| `.h6.white-icon.land` (eyebrow designcta) | visible | visible | visible | **`display: none`** |
| `.paragraph.tab-center` / `.tab-middle` / `.land-center` | `left` | **`center`** | — | — |

Gaps que acompañan a la escala (por si el layout-analyst los necesita):
`section` 100/80/60/40 · `big-section` 150/80/60/40 · `container` 60/40/30/20 · `layout` 80/60/40/30.

### Resumen práctico por breakpoint objetivo

- **Tablet 768**: h2 32px, h3 28px, h4 24px, h5 22px, h6 20px, hero/design 52px, mail 52px, body 16px.
  Títulos de sección **centrados** (`tab-center`), tarjetas de proyecto aún con texto **rotado 90°**, citas de testimonios **visibles**.
- **Mobile 375**: h1 28, h2 26, h3 24, h4 22, h5 20, h6 18, hero/design/mail 38px, body 16px.
  Hero **centrado**, email del footer **centrado**, "Quick links" **centrado**, eyebrow de designcta **oculto**, citas de testimonios **ocultas**, tarjetas de proyecto con texto **horizontal**.

---

## 8. Bloque `@theme` para Tailwind v4 (listo para pegar)

El original escala **redefiniendo variables por breakpoint**. Para reproducirlo con **una sola clase por nivel**
(`text-h2`, `text-hero`…) usar `@theme inline`: Tailwind emitirá `font-size: var(--fs-h2)` en la utility,
y basta redefinir `--fs-*` en las media queries.

```css
/* src/app/globals.css */
@import "tailwindcss";

/* ── Escala tipográfica: valores desktop (≥992px) ───────────────── */
:root {
  --fs-big-text: 300px;
  --fs-hero:     130px;
  --fs-display:  124px;
  --fs-h1:        96px;
  --fs-h2:        72px;
  --fs-h3:        56px;
  --fs-h4:        40px;
  --fs-h5:        32px;
  --fs-h6:        24px;
  --fs-body:      16px;
  --fs-mail:      76px;   /* one-off del email del footer */
  --lh-mail:      1.18;   /* 118% en desktop … */
}

/* ── Webflow tablet: max-width 991px ────────────────────────────── */
@media (max-width: 991px) {
  :root {
    --fs-big-text: 180px;
    --fs-hero:      52px;
    --fs-display:   52px;
    --fs-h1:        42px;
    --fs-h2:        32px;
    --fs-h3:        28px;
    --fs-h4:        24px;
    --fs-h5:        22px;
    --fs-h6:        20px;
    --fs-body:      16px;
    --fs-mail:      var(--fs-display);  /* 52px */
    --lh-mail:      1.12;               /* … pasa a 112% */
  }
}

/* ── Webflow mobile landscape: max-width 767px ──────────────────── */
@media (max-width: 767px) {
  :root {
    --fs-big-text: 100px;
    --fs-hero:      42px;
    --fs-display:   42px;
    --fs-h1:        32px;
    --fs-h2:        28px;
    --fs-h3:        24px;
    --fs-h4:        22px;
    --fs-h5:        20px;
    --fs-h6:        18px;
  }
}

/* ── Webflow mobile portrait: max-width 479px ───────────────────── */
@media (max-width: 479px) {
  :root {
    --fs-big-text:  75px;
    --fs-hero:      38px;
    --fs-display:   38px;
    --fs-h1:        28px;
    --fs-h2:        26px;
    --fs-h3:        24px;
    --fs-h4:        22px;
    --fs-h5:        20px;
    --fs-h6:        18px;
  }
}

@theme inline {
  /* ── Familias ─────────────────────────────────────────────────── */
  --font-heading: var(--font-sora),  Sora,  ui-sans-serif, system-ui, sans-serif;
  --font-text:    var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif;
  --font-sans:    var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif;

  /* ── Escala. line-height y font-weight viajan con el tamaño ───── */
  --text-hero:                     var(--fs-hero);
  --text-hero--line-height:        1.1;    /* big 110% */
  --text-hero--font-weight:        700;    /* único Sora 700 del sitio */

  --text-display:                  var(--fs-display);
  --text-display--line-height:     1.1;
  --text-display--font-weight:     600;

  --text-big:                      var(--fs-big-text);
  --text-big--line-height:         1.1;

  --text-mail:                     var(--fs-mail);
  --text-mail--line-height:        var(--lh-mail);
  --text-mail--font-weight:        600;

  --text-h1:                       var(--fs-h1);
  --text-h1--line-height:          1.12;   /* semi-big */
  --text-h1--font-weight:          600;

  --text-h2:                       var(--fs-h2);
  --text-h2--line-height:          1.14;   /* medium */
  --text-h2--font-weight:          600;

  --text-h3:                       var(--fs-h3);
  --text-h3--line-height:          1.18;   /* tiny */
  --text-h3--font-weight:          600;

  --text-h4:                       var(--fs-h4);
  --text-h4--line-height:          1.2;    /* small */
  --text-h4--font-weight:          600;

  --text-h5:                       var(--fs-h5);
  --text-h5--line-height:          1.25;   /* semi-small */
  --text-h5--font-weight:          600;

  --text-h6:                       var(--fs-h6);
  --text-h6--line-height:          1.3;    /* mini */
  --text-h6--font-weight:          600;

  --text-body:                     var(--fs-body);
  --text-body--line-height:        1.5;    /* extra-small */
  --text-body--font-weight:        400;

  --text-caption:                  14px;   /* input del footer */
  --text-caption--line-height:     1.4286;

  --text-badge:                    11px;   /* contador del carrito */
  --text-badge--line-height:       1.6364;
  --text-badge--font-weight:       700;

  /* ── Colores tipográficos (espejo de los tokens del sitio) ─────── */
  --color-page:      #fef8f0;
  --color-card:      #fae9ce;
  --color-beige:     #f1dfc2;
  --color-yellow:    #ffd900;
  --color-paragraph: #575757;
  --color-span:      #8e8e8e;
  --color-footer-muted: #d7d7d7;
}
```

Uso: `className="font-heading text-h2 uppercase text-black"`, `className="font-text text-body text-paragraph"`,
`className="font-heading text-hero uppercase text-white text-right"`, span crema `className="text-beige"`,
tercera copia del rotador `className="text-span"`.

> Nota sobre breakpoints: el original usa **max-width** (991/767/479). Los breakpoints por defecto de Tailwind v4
> son min-width (`sm:640 md:768 lg:1024 xl:1280`) y **no coinciden**. Por eso el escalado va en las media queries
> `max-width` de arriba y no en variantes de Tailwind. Para las reglas de alineación/visibilidad de la §7,
> usar `max-lg:` etc. es riesgoso; lo fiel es declarar `@media (max-width: 991px)` explícitas o registrar
> variantes propias con `@custom-variant tab (@media (max-width: 991px))`, `@custom-variant land (…767px)`,
> `@custom-variant mob (…479px)` para poder escribir `tab:text-center`, `mob:text-center`, `land:hidden`.

---

## 9. Dudas / cosas a verificar en el build

1. **`.paragraph.white` del botón "Cart" (products)**: el CSS dice `color: var(--white)` pero el valor computado es
   `rgb(0,0,0)`. Algo más específico (probablemente un estado IX2 inline o una regla del componente de carrito)
   lo pisa. En el crop se ve **negro sobre amarillo**. → Replicar como **negro**, y confirmarlo con el comparator.
2. **`.mail-text` a 76px** es un valor fuera de la escala declarada. Está literal en el CSS (`font-size: 76px; line-height: 118%`).
   No forzarlo a h1/h2.
3. **bbox de `.design-text`** en `computed-styles.json` (642×215) está a `scale(0.5)` por una animación IX2 en curso
   durante la captura. Los valores buenos son los de `styles.width/height`: **1283.22 × 429px** (3 líneas × 143px).
4. **`--font-weight--bold: 700` no existe como variable.** El 700 está hardcodeado en `.hero-text` y `.point-text.white`.
   Si se crea un token propio, documentarlo como añadido nuestro.
5. `big-text` (300px) y `display` (124px) **no aparecen en la homepage desktop**. Se dejan en el `@theme` porque
   `display` sí se usa en responsive vía `.mail-text`, y `big-text` puede aparecer en otras páginas.
6. La alineación de los eyebrows (`.sub-text`) **se hereda del contenedor**, no está en la clase:
   `about`/`services`/`advantages`/`blogs` → `start`; `projects`/`process`/`products`/`testimonials` → `center`.
7. El reveal palabra a palabra de `about` y `services` (h4 40/48) parte de **#8e8e8e** y termina en **#000**.
   El screenshot de referencia está a medio camino (artefacto de captura, ya anotado en el briefing).

---

## 10. Datos estructurados

```json
{
  "fonts": {
    "heading": {
      "family": "Sora",
      "fallback": "sans-serif",
      "cssVar": "--_typography-🆎---font-family--heading-font",
      "weightsUsed": [600, 700],
      "weightsLoadedByOriginal": [300, 400, 500, 600, 700],
      "nextFontGoogle": { "import": "Sora", "subsets": ["latin"], "variable": "--font-heading", "display": "swap", "weightIfStatic": ["600", "700"] },
      "italics": false,
      "localWoff2": "references/shared-assets/fonts/xMQbuFFYT72XzQUpDg.woff2"
    },
    "text": {
      "family": "Inter",
      "fallback": "sans-serif",
      "cssVar": "--_typography-🆎---font-family--text-font",
      "weightsUsed": [400, 500, 600, 700],
      "weightsLoadedByOriginal": [300, 400, 500, 600, 700],
      "nextFontGoogle": { "import": "Inter", "subsets": ["latin"], "variable": "--font-text", "display": "swap", "weightIfStatic": ["400", "500", "600", "700"] },
      "italics": false,
      "localWoff2": "references/shared-assets/fonts/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2"
    },
    "letterSpacing": "normal (0) en todo el sitio — cero reglas de contenido lo modifican"
  },

  "breakpoints": {
    "desktop": { "minWidth": 992, "captureViewport": 1440 },
    "tablet":  { "maxWidth": 991, "captureViewport": 768, "note": "768 > 767, NO entra la query de 767" },
    "landscape": { "maxWidth": 767 },
    "mobile":  { "maxWidth": 479, "captureViewport": 375 }
  },

  "lineHeightRatios": {
    "big": 1.10, "semi-big": 1.12, "medium": 1.14, "tiny": 1.18,
    "small": 1.20, "semi-small": 1.25, "mini": 1.30, "extra-small": 1.50,
    "note": "constantes en los 4 breakpoints"
  },

  "scale": {
    "hero":    { "ratioName": "big",         "lh": 1.10, "weight": 700, "transform": "uppercase", "font": "Sora",  "desktop": 130, "tablet991": 52, "landscape767": 42, "mobile479": 38, "lhPx": { "desktop": 143, "tablet991": 57.2, "landscape767": 46.2, "mobile479": 41.8 } },
    "design":  { "ratioName": "big",         "lh": 1.10, "weight": 600, "transform": "uppercase", "font": "Sora",  "desktop": 130, "tablet991": 52, "landscape767": 42, "mobile479": 38, "lhPx": { "desktop": 143, "tablet991": 57.2, "landscape767": 46.2, "mobile479": 41.8 }, "note": "mismos px que hero pero peso 600" },
    "bigText": { "ratioName": "big",         "lh": 1.10, "weight": 600, "transform": "uppercase", "font": "Sora",  "desktop": 300, "tablet991": 180, "landscape767": 100, "mobile479": 75, "usedOnHome": false },
    "display": { "ratioName": "big",         "lh": 1.10, "weight": 600, "transform": "uppercase", "font": "Sora",  "desktop": 124, "tablet991": 52, "landscape767": 42, "mobile479": 38, "usedOnHome": "solo indirecto vía .mail-text @<=991" },
    "mail":    { "ratioName": "tiny→semi-big","lh": 1.18, "weight": 600, "transform": "lowercase", "font": "Sora", "desktop": 76,  "tablet991": 52, "landscape767": 42, "mobile479": 38, "lhPx": { "desktop": 89.68, "tablet991": 58.24, "landscape767": 47.04, "mobile479": 42.56 }, "note": "ratio cambia a 1.12 desde <=991" },
    "h1":      { "ratioName": "semi-big",    "lh": 1.12, "weight": 600, "transform": "uppercase", "font": "Sora",  "desktop": 96,  "tablet991": 42, "landscape767": 32, "mobile479": 28, "lhPx": { "desktop": 107.52, "tablet991": 47.04, "landscape767": 35.84, "mobile479": 31.36 } },
    "h2":      { "ratioName": "medium",      "lh": 1.14, "weight": 600, "transform": "uppercase", "font": "Sora",  "desktop": 72,  "tablet991": 32, "landscape767": 28, "mobile479": 26, "lhPx": { "desktop": 82.08, "tablet991": 36.48, "landscape767": 31.92, "mobile479": 29.64 } },
    "h3":      { "ratioName": "tiny",        "lh": 1.18, "weight": 600, "transform": "uppercase", "font": "Sora",  "desktop": 56,  "tablet991": 28, "landscape767": 24, "mobile479": 24, "lhPx": { "desktop": 66.08, "tablet991": 33.04, "landscape767": 28.32, "mobile479": 28.32 } },
    "h4":      { "ratioName": "small",       "lh": 1.20, "weight": 600, "transform": "uppercase", "font": "Sora",  "desktop": 40,  "tablet991": 24, "landscape767": 22, "mobile479": 22, "lhPx": { "desktop": 48, "tablet991": 28.8, "landscape767": 26.4, "mobile479": 26.4 } },
    "h5":      { "ratioName": "semi-small",  "lh": 1.25, "weight": 600, "transform": "uppercase", "font": "Sora",  "desktop": 32,  "tablet991": 22, "landscape767": 20, "mobile479": 20, "lhPx": { "desktop": 40, "tablet991": 27.5, "landscape767": 25, "mobile479": 25 } },
    "h6":      { "ratioName": "mini",        "lh": 1.30, "weight": 600, "transform": "uppercase", "font": "Sora",  "desktop": 24,  "tablet991": 20, "landscape767": 18, "mobile479": 18, "lhPx": { "desktop": 31.2, "tablet991": 26, "landscape767": 23.4, "mobile479": 23.4 } },
    "body":    { "ratioName": "extra-small", "lh": 1.50, "weight": 400, "transform": "none",      "font": "Inter", "desktop": 16,  "tablet991": 16, "landscape767": 16, "mobile479": 16, "lhPx": { "desktop": 24, "tablet991": 24, "landscape767": 24, "mobile479": 24 } },
    "caption": { "lh": 1.4286, "weight": 400, "transform": "none", "font": "Inter", "desktop": 14, "note": "solo el input del footer (.w-input)" },
    "badge":   { "lh": 1.6364, "weight": 700, "transform": "none", "font": "Inter", "desktop": 11, "note": "solo el contador del carrito" }
  },

  "classMap": {
    "Sora": {
      ".hero-text":  { "level": "hero",   "weight": 700, "transform": "uppercase", "color": "#ffffff", "textAlign": { "desktop": "right", "tablet991": "left", "mobile479": "center" } },
      ".design-text":{ "level": "design", "weight": 600, "transform": "uppercase", "color": "#ffffff" },
      ".mail-text":  { "level": "mail",   "weight": 600, "transform": "lowercase", "color": "#ffffff", "textAlign": { "desktop": "left", "mobile479": "center" } },
      ".h1":         { "level": "h1", "weight": 600, "transform": "uppercase", "color": "#000000", "textAlign": "left" },
      ".h2":         { "level": "h2", "weight": 600, "transform": "uppercase", "color": "#000000", "textAlign": "left" },
      ".h3":         { "level": "h3", "weight": 600, "transform": "uppercase", "color": "#000000" },
      ".h4":         { "level": "h4", "weight": 600, "transform": "uppercase", "color": "#000000" },
      ".h5":         { "level": "h5", "weight": 600, "transform": "uppercase", "color": "#000000" },
      ".h6":         { "level": "h6", "weight": 600, "transform": "uppercase", "color": "#000000" }
    },
    "Inter": {
      ".paragraph":      { "level": "body", "weight": 400, "color": "#575757", "textAlign": "left" },
      ".paragraph.black":{ "level": "body", "weight": 400, "color": "#000000" },
      ".paragraph.white":{ "level": "body", "weight": 400, "color": "#ffffff" },
      ".paragraph.yellow":{"level": "body", "weight": 400, "color": "#ffd900" },
      ".paragraph.footer":{"level": "body", "weight": 400, "color": "#d7d7d7" },
      ".paragraph.cart": { "level": "body", "weight": 600, "color": "#000000" },
      ".sub-text":       { "level": "body", "weight": 600, "color": "#000000" },
      ".sub-text.white": { "level": "body", "weight": 600, "color": "#ffffff" },
      ".button-text":    { "level": "body", "weight": 500, "color": "#000000", "whiteSpace": "nowrap" },
      ".button-text.white": { "level": "body", "weight": 500, "color": "#ffffff" },
      ".nav-link-text":  { "level": "body", "weight": 500, "color": "#000000", "whiteSpace": "nowrap", "current": { "weight": 600 } },
      ".link-text":      { "level": "body", "weight": 500, "color": "#ffffff", "current": { "color": "#ffd900" } },
      ".product-text":   { "level": "body", "weight": 500, "color": "#000000" },
      ".slot-text":      { "level": "body", "weight": 500, "color": "#575757" },
      ".step-text":      { "level": "body", "weight": 600, "color": "#ffd900" },
      ".point-text.white":{"level": "body", "weight": 700, "color": "#ffffff" },
      ".bottom-link":    { "level": "body", "weight": 400, "color": "#ffd900" },
      ".footer-text-field":{"level":"caption","weight": 400, "color": "#333333", "placeholder": "#999999" },
      ".cart-quantity":  { "level": "badge", "weight": 700, "color": "#000000" }
    }
  },

  "spans": {
    ".yellow-span": { "color": "#f1dfc2", "token": "--beige-color", "warning": "NO es amarillo pese al nombre", "usedIn": ["hero h1 → 'home'", "hero h6 → 'Since 2014'", "designcta h6 → 'Purpose'", "designcta h2 → 'Home'"] },
    ".card-span":   { "color": "#fae9ce", "token": "--card-color", "usedIn": ["footer h6 → 'your space'"] },
    ".h2.tab-center.color": { "color": "#8e8e8e", "token": "--span-color", "usedIn": ["3ª copia del rotador en projects/advantages/products/blogs"] },
    ".h1.h1-span":  { "color": "#8e8e8e", "usedOnHome": false }
  },

  "sectionTitleRotator": {
    "wrapper": ".h2-section-title",
    "wrapperStyles": { "display": "flex", "gap": "10px", "alignItems": { "desktop": "center", "tablet991": "flex-start" }, "justifyContent": "center", "flexFlow": { "mobile479": "wrap" } },
    "clip": ".h2-counter-wrap",
    "clipHeight": { "desktop": 85, "tablet991": 36, "landscape767": 30, "mobile479": 28 },
    "clipOverflow": "hidden",
    "stack": ".h2-title-counter",
    "stackStyles": { "flexFlow": "column", "alignItems": "center", "overflow": "hidden", "restTransform": "translate3d(0, -66%, 0)" },
    "copies": 3,
    "visibleCopy": 3,
    "visibleColor": "#8e8e8e",
    "appliesTo": [
      { "section": "projects",   "static": "Our Featured", "rotating": "work" },
      { "section": "advantages", "static": "Why choose",   "rotating": "us" },
      { "section": "products",   "static": "Explore Our",  "rotating": "Collection" },
      { "section": "blogs",      "static": "Design",       "rotating": "Insights" }
    ],
    "doesNotApplyTo": [
      { "section": "process",      "element": "h2.h2.white",        "text": "Our Design",          "note": "un solo tono, sin rotador" },
      { "section": "testimonials", "element": "h2.h2.white.center", "text": "Our Happy Customers", "note": "un solo tono, sin rotador, centrado" }
    ]
  },

  "elementLevelMap": [
    { "section": "navbar", "text": "Home (activo)", "el": "a.nav-link-text.white.w--current", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 600, "color": "#ffffff", "extra": "underline" },
    { "section": "navbar", "text": "About us / Projects / Shop / Pages", "el": "a|p.nav-link-text.white", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 500, "color": "#ffffff" },
    { "section": "navbar", "text": "0 (badge carrito)", "el": ".cart-quantity", "level": "badge", "font": "Inter", "size": 11, "lh": 18, "weight": 700, "color": "#000000" },

    { "section": "hero", "text": "Mood Begins at home", "el": "h1.hero-text.section-title", "level": "hero", "font": "Sora", "size": 130, "lh": 143, "weight": 700, "color": "#ffffff", "transform": "uppercase", "align": "right", "lines": 2, "span": { "text": "home", "class": "yellow-span", "color": "#f1dfc2" } },
    { "section": "hero", "text": "1. Interior Styling / 2. Space Planning / 3. Mood Lighting", "el": "p.point-text.white", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 700, "color": "#ffffff" },
    { "section": "hero", "text": "Designing Modern Homes Since 2014", "el": "h2.h6.white.mobile-center", "level": "h6", "font": "Sora", "size": 24, "lh": 31.2, "weight": 600, "color": "#ffffff", "transform": "uppercase", "span": { "text": "Since 2014", "class": "yellow-span", "color": "#f1dfc2" } },
    { "section": "hero", "text": "Contact Now", "el": "p.button-text", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 500, "color": "#000000" },

    { "section": "about", "text": "About Us", "el": "p.sub-text", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 600, "color": "#000000", "align": "start" },
    { "section": "about", "text": "From homes to offices, we bring your vision to life. Our results speak for themselves", "el": "h3.h4", "level": "h4", "font": "Sora", "size": 40, "lh": 48, "weight": 600, "color": "#000000", "transform": "uppercase", "extra": "reveal palabra a palabra #8e8e8e → #000" },
    { "section": "about", "text": "2014 / 350 / 200 / 25 (odómetro) + '+'", "el": "h3.h3", "level": "h3", "font": "Sora", "size": 56, "lh": 66.08, "weight": 600, "color": "#000000", "transform": "uppercase" },
    { "section": "about", "text": "Establishment / Projects finished / Happy Clients / Ongoing Projects", "el": "h4.h6.right", "level": "h6", "font": "Sora", "size": 24, "lh": 31.2, "weight": 600, "color": "#000000", "transform": "uppercase", "align": "right" },
    { "section": "about", "text": "descripciones de stat", "el": "p.paragraph.right.land", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 400, "color": "#575757", "align": "right" },
    { "section": "about", "text": "Want Design", "el": "p.button-text", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 500, "color": "#000000" },
    { "section": "about", "text": "Slots are available", "el": "p.slot-text", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 500, "color": "#575757" },

    { "section": "projects", "text": "Our Projects", "el": "p.sub-text", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 600, "color": "#000000", "align": "center" },
    { "section": "projects", "text": "Our Featured + work", "el": "h2.h2.tab-center (+ rotador)", "level": "h2", "font": "Sora", "size": 72, "lh": 82.08, "weight": 600, "color": "#000000", "transform": "uppercase", "span": { "text": "work", "class": "h2 tab-center color", "color": "#8e8e8e", "mechanism": "rotador 3 copias" } },
    { "section": "projects", "text": "Discover our collection…", "el": "p.paragraph", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 400, "color": "#575757" },
    { "section": "projects", "text": "View All Projects", "el": "p.button-text", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 500, "color": "#000000" },
    { "section": "projects", "text": "Velora Haven / Serenith Home / Nuvell Retreat / Luneth Maison + años", "el": "h3.h6.rotate", "level": "h6", "font": "Sora", "size": 24, "lh": 31.2, "weight": 600, "color": "#000000", "transform": "uppercase", "extra": "rotate(90deg), white-space:nowrap, margin-top:80px; rotate(0) desde ≤767" },

    { "section": "process", "text": "Our Process", "el": "p.sub-text.white", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 600, "color": "#ffffff", "align": "center" },
    { "section": "process", "text": "Our Design", "el": "h2.h2.white", "level": "h2", "font": "Sora", "size": 72, "lh": 82.08, "weight": 600, "color": "#ffffff", "transform": "uppercase", "span": null },
    { "section": "process", "text": "Step 01…05", "el": "p.step-text", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 600, "color": "#ffd900" },
    { "section": "process", "text": "Discovery / Concept Design / Planning / Execution / Final Touch", "el": "h3.h6.white", "level": "h6", "font": "Sora", "size": 24, "lh": 31.2, "weight": 600, "color": "#ffffff", "transform": "uppercase" },
    { "section": "process", "text": "descripciones de paso", "el": "p.paragraph.white", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 400, "color": "#ffffff" },

    { "section": "services", "text": "Our Services", "el": "p.sub-text", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 600, "color": "#000000", "align": "start" },
    { "section": "services", "text": "From interiors to lighting, we craft spaces…", "el": "h3.h4", "level": "h4", "font": "Sora", "size": 40, "lh": 48, "weight": 600, "color": "#000000", "transform": "uppercase", "extra": "reveal palabra a palabra" },
    { "section": "services", "text": "Lighting Solutions / Space Planning / Furniture Styling", "el": "h2.h4", "level": "h4", "font": "Sora", "size": 40, "lh": 48, "weight": 600, "color": "#000000", "transform": "uppercase" },
    { "section": "services", "text": "descripciones de servicio", "el": "p.paragraph.land", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 400, "color": "#575757" },
    { "section": "services", "text": "RENOVATION / PLANNING / STYLING (marquee 2 filas)", "el": "h3.h1", "level": "h1", "font": "Sora", "size": 96, "lh": 107.52, "weight": 600, "color": "#000000", "transform": "uppercase", "align": "left", "extra": ".top-slider 35 items + .bottom-slider 28 items, direcciones opuestas" },
    { "section": "services", "text": "View All Services", "el": "p.button-text", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 500, "color": "#000000" },

    { "section": "designcta", "text": "Design Your Space with Purpose", "el": "div.h6.white-icon.land", "level": "h6", "font": "Sora", "size": 24, "lh": 31.2, "weight": 600, "color": "#ffffff", "transform": "uppercase", "span": { "text": "Purpose", "class": "yellow-span", "color": "#f1dfc2" }, "extra": "display:none @≤479" },
    { "section": "designcta", "text": "Let’s Design Your Dream Home", "el": "h2.design-text.section-title", "level": "design", "font": "Sora", "size": 130, "lh": 143, "weight": 600, "color": "#ffffff", "transform": "uppercase", "lines": 3, "layoutBox": "1283.22 × 429", "span": { "text": "Home", "class": "yellow-span", "color": "#f1dfc2" } },
    { "section": "designcta", "text": "Lets Talk", "el": "p.button-text", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 500, "color": "#000000" },
    { "section": "designcta", "text": "20% Off First Consultation / 10% Off This Month / Free Space Planning", "el": "h2.h6.no-wrap", "level": "h6", "font": "Sora", "size": 24, "lh": 31.2, "weight": 600, "color": "#000000", "transform": "uppercase", "extra": "white-space:nowrap, marquee .design-slider" },

    { "section": "advantages", "text": "Advantages", "el": "p.sub-text", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 600, "color": "#000000", "align": "start" },
    { "section": "advantages", "text": "Why choose + us", "el": "h2.h2.tab-center (+ rotador)", "level": "h2", "font": "Sora", "size": 72, "lh": 82.08, "weight": 600, "color": "#000000", "transform": "uppercase", "span": { "text": "us", "color": "#8e8e8e", "mechanism": "rotador 3 copias" } },
    { "section": "advantages", "text": "Bold/Stark/Nexo/Prime/Aura Designs (badge rotatorio)", "el": "h3.h6.center", "level": "h6", "font": "Sora", "size": 24, "lh": 31.2, "weight": 600, "color": "#000000", "transform": "uppercase", "align": "center" },
    { "section": "advantages", "text": "Unique Design asthetic / Client-Focused Approach / Attention to details", "el": "h3.h6.white(.pre-wrap)", "level": "h6", "font": "Sora", "size": 24, "lh": 31.2, "weight": 600, "color": "#ffffff", "transform": "uppercase" },
    { "section": "advantages", "text": "Proven Work and Trusted Reputation", "el": "h3.h6.land", "level": "h6", "font": "Sora", "size": 24, "lh": 31.2, "weight": 600, "color": "#000000", "transform": "uppercase" },
    { "section": "advantages", "text": "350+ (odómetro)", "el": "h3.h3", "level": "h3", "font": "Sora", "size": 56, "lh": 66.08, "weight": 600, "color": "#000000", "transform": "uppercase" },
    { "section": "advantages", "text": "Project Launched", "el": "p.paragraph.black", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 400, "color": "#000000" },

    { "section": "products", "text": "Featured Products", "el": "p.sub-text", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 600, "color": "#000000", "align": "center" },
    { "section": "products", "text": "Explore Our + Collection", "el": "h2.h2.tab-center (+ rotador)", "level": "h2", "font": "Sora", "size": 72, "lh": 82.08, "weight": 600, "color": "#000000", "transform": "uppercase", "span": { "text": "Collection", "color": "#8e8e8e", "mechanism": "rotador 3 copias" } },
    { "section": "products", "text": "Chair / Chair / Bed (chip)", "el": "p.product-text", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 500, "color": "#000000" },
    { "section": "products", "text": "$ 499.00 USD / $ 599.00 USD / $ 299.00 USD", "el": "p.paragraph.black", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 400, "color": "#000000" },
    { "section": "products", "text": "leather armchair / wooden chair / leather bed", "el": "h3.h6", "level": "h6", "font": "Sora", "size": 24, "lh": 31.2, "weight": 600, "color": "#000000", "transform": "uppercase" },
    { "section": "products", "text": "Cart", "el": "p.paragraph.white", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 400, "color": "#000000", "warning": "clase dice white, computed da negro" },
    { "section": "products", "text": "View More", "el": "p.button-text", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 500, "color": "#000000" },

    { "section": "testimonials", "text": "Testimonials", "el": "p.sub-text.white", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 600, "color": "#ffffff", "align": "center" },
    { "section": "testimonials", "text": "Our Happy Customers", "el": "h2.h2.white.center", "level": "h2", "font": "Sora", "size": 72, "lh": 82.08, "weight": 600, "color": "#ffffff", "transform": "uppercase", "align": "center", "span": null },
    { "section": "testimonials", "text": "citas", "el": "p.paragraph.white.land-hide-text", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 400, "color": "#ffffff", "align": "center", "extra": "display:none @≤767" },
    { "section": "testimonials", "text": "Ethan Miller / Jashon / Noah Mike / Ali Hamja", "el": "h3.h6.white", "level": "h6", "font": "Sora", "size": 24, "lh": 31.2, "weight": 600, "color": "#ffffff", "transform": "uppercase" },
    { "section": "testimonials", "text": "Decorator / Professor / Assistant / Editor", "el": "p.paragraph.yellow", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 400, "color": "#ffd900" },

    { "section": "blogs", "text": "Our Blogs", "el": "p.sub-text", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 600, "color": "#000000", "align": "start" },
    { "section": "blogs", "text": "Design + Insights", "el": "h2.h2.tab-center (+ rotador)", "level": "h2", "font": "Sora", "size": 72, "lh": 82.08, "weight": 600, "color": "#000000", "transform": "uppercase", "span": { "text": "Insights", "color": "#8e8e8e", "mechanism": "rotador 3 copias" } },
    { "section": "blogs", "text": "The Art of Home and Living / Elegant Spaces Journal of Style", "el": "h3|h4.h5.white", "level": "h5", "font": "Sora", "size": 32, "lh": 40, "weight": 600, "color": "#ffffff", "transform": "uppercase" },
    { "section": "blogs", "text": "May 18, 2025 / Feb 14, 2025", "el": "p.paragraph.white", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 400, "color": "#ffffff" },
    { "section": "blogs", "text": "About Author", "el": "h3.h6", "level": "h6", "font": "Sora", "size": 24, "lh": 31.2, "weight": 600, "color": "#000000", "transform": "uppercase" },
    { "section": "blogs", "text": "Isabella Moore / William Clarke", "el": "p.paragraph.black", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 400, "color": "#000000" },
    { "section": "blogs", "text": "Read More", "el": "p.button-text.white", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 500, "color": "#ffffff" },

    { "section": "footer", "text": "Designs that define your space", "el": "h3.h6.footer", "level": "h6", "font": "Sora", "size": 24, "lh": 31.2, "weight": 600, "color": "#ffffff", "transform": "uppercase", "span": { "text": "your space", "class": "card-span", "color": "#fae9ce" } },
    { "section": "footer", "text": "hi@livinor.com", "el": "h2.mail-text", "level": "mail", "font": "Sora", "size": 76, "lh": 89.68, "weight": 600, "color": "#ffffff", "transform": "lowercase" },
    { "section": "footer", "text": "Enter your mail (placeholder)", "el": "input.footer-text-field.w-input", "level": "caption", "font": "Inter", "size": 14, "lh": 20, "weight": 400, "color": "#333333", "placeholderColor": "#999999" },
    { "section": "footer", "text": "Quick links", "el": "h3.h6.yellow", "level": "h6", "font": "Sora", "size": 24, "lh": 31.2, "weight": 600, "color": "#ffd900", "transform": "uppercase" },
    { "section": "footer", "text": "Home / About / Services / Projects / Shop / Blogs / Licenses", "el": "a.link-text", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 500, "color": "#ffffff", "current": "#ffd900" },
    { "section": "footer", "text": "Copyright © Livinor | Designed by … / Powered by …", "el": "p.paragraph.footer", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 400, "color": "#d7d7d7" },
    { "section": "footer", "text": "Theme Sleek / Webflow", "el": "a.bottom-link", "level": "body", "font": "Inter", "size": 16, "lh": 24, "weight": 400, "color": "#ffd900" }
  ],

  "textTransformRules": {
    "uppercasePorCSS": ["h1", "h2", "h3", "h4", "h5", "h6", ".h1", ".h2", ".h3", ".h4", ".h5", ".h6", ".hero-text", ".design-text"],
    "lowercasePorCSS": [".mail-text"],
    "sinTransform": [".paragraph", ".sub-text", ".button-text", ".nav-link-text", ".link-text", ".point-text", ".step-text", ".product-text", ".slot-text", ".bottom-link", ".cart-quantity", ".footer-text-field"],
    "regla": "El copy en el DOM va en Title Case; el CSS lo pone en mayúsculas. Escribir el JSX con el copy original, no en MAYÚSCULAS.",
    "apostrofo": "U+2019 (’) en 'Let’s Design Your Dream Home'"
  },

  "responsiveLayoutRules": {
    ".hero-text": { "textAlign": { "base": "right", "<=991": "left", "<=479": "center" } },
    ".mail-text": { "textAlign": { "base": "left", "<=479": "center" }, "fontSize": { "base": "76px", "<=991": "var(--display)" }, "lineHeight": { "base": "118%", "<=991": "112%" } },
    ".design-text": { "fontSize": { "base": "130px", "<=991": "52px", "<=767": "42px", "<=479": "38px" } },
    ".h1.tab-center|.h2.tab-center": { "textAlign": { "base": "left", "<=991": "center" } },
    ".h2.land-center": { "textAlign": { "<=767": "center" } },
    ".h6": { "textAlign": { "<=767": "left" } },
    ".h6.right": { "textAlign": { "base": "right", "<=767": "left" } },
    ".h6.white.pre-wrap": { "textAlign": { "<=767": "center" }, "whiteSpace": "pre-wrap" },
    ".h6.footer|.h5.mobile-center|.h5.mini-size|.h6.white.mobile-center": { "textAlign": { "<=479": "center" } },
    ".h5.mini-size": { "fontSize": { "<=767": "16px" } },
    ".h6.rotate": { "transform": { "base": "rotate(90deg)", "<=767": "rotate(0)" }, "marginTop": { "base": "80px", "<=991": "110px", "<=767": "0" }, "marginBottom": { "<=991": "40px", "<=767": "0" } },
    ".paragraph.white.land-hide-text": { "display": { "base": "block", "<=767": "none" }, "textAlign": "center" },
    ".paragraph.right": { "textAlign": { "base": "right", "<=767": "left" } },
    ".paragraph.footer": { "textAlign": { "base": "left", "<=479": "center" } },
    ".h5.land|.h6.land|.paragraph.land": { "display": { "<=767": "none" } },
    ".h6.white-icon.land": { "display": { "<=479": "none" } },
    ".paragraph.tab-center|.tab-middle|.land-center": { "textAlign": { "<=991": "center" } },
    ".h2-section-title": { "alignItems": { "base": "center", "<=991": "flex-start" }, "flexFlow": { "<=479": "wrap" } },
    ".h2-counter-wrap": { "height": { "base": "85px", "<=991": "36px", "<=767": "30px", "<=479": "28px" } }
  },

  "gaps": {
    "section":     { "desktop": 100, "<=991": 80, "<=767": 60, "<=479": 40 },
    "big-section": { "desktop": 150, "<=991": 80, "<=767": 60, "<=479": 40 },
    "container":   { "desktop": 60,  "<=991": 40, "<=767": 30, "<=479": 20 },
    "layout":      { "desktop": 80,  "<=991": 60, "<=767": 40, "<=479": 30 }
  },

  "openQuestions": [
    "'.paragraph.white' del botón Cart: CSS dice blanco, computed da rgb(0,0,0) — replicar negro y validar con el comparator",
    "'.mail-text' 76px es un one-off fuera de la escala declarada (confirmado literal en el CSS)",
    "bbox de .design-text en computed-styles.json está a scale(0.5) por animación IX2 — usar styles.width/height (1283.22×429)",
    "No existe variable --font-weight--bold; el 700 está hardcodeado en .hero-text y .point-text.white",
    "big-text (300px) y display (124px) no se usan en la homepage desktop"
  ]
}
```
