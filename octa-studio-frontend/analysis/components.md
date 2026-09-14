# components.md — Árbol de componentes + COPY LITERAL COMPLETO

Analyst: `component-classifier`. Fuente: `references/pages/home/dom.html`, `computed-styles.json`, `sections.json`, crops desktop/mobile.
Todos los paths relativos a `c:/Users/alexm/Desktop/Octa Studio/replica/`.

> **Regla de oro para builders:** el copy de este archivo está **tal cual sale del DOM**, en su capitalización original (mayoritariamente Title Case). El sitio lo muestra en MAYÚSCULAS mediante `text-transform: uppercase` en las clases `h1..h6` / `.section-title`. **NO escribas el texto en mayúsculas en el JSX** — guárdalo como está aquí y aplica `uppercase` por CSS. `.mail-text` usa `text-transform: lowercase`.
>
> Los espacios sobrantes (p. ej. `"Contact Now "`, `" Final Touch"`, `" Isabella Moore"`, `"Featured Products "`) **son reales y afectan al render** (el espacio inicial de `" Final Touch"` se ve como sangría en el screenshot). Consérvalos.

---

## 0. Resumen del árbol de archivos a crear

```
src/
├── app/
│   ├── layout.tsx                     # Sora + Inter, <Navbar/> NO va aquí (ver nota §2.1)
│   └── (public)/page.tsx              # ensambla las 11 secciones en orden
├── components/
│   ├── shared/
│   │   ├── Navbar/
│   │   │   ├── index.tsx              # 'use client'
│   │   │   ├── MegaMenu.tsx           # 'use client'
│   │   │   ├── CartDrawer.tsx         # 'use client'
│   │   │   └── MobileNavToggle.tsx    # 'use client'
│   │   └── Footer/
│   │       ├── index.tsx              # server
│   │       └── NewsletterForm.tsx     # 'use client'
│   ├── ui/
│   │   ├── ButtonWhite.tsx            # 'use client'  ← primitivo, 8 usos
│   │   ├── ButtonBlack.tsx            # 'use client'  ← 2 usos (blog)
│   │   ├── SectionEyebrow.tsx         # 'use client' (lottie) — 8 usos
│   │   ├── TwoToneHeading.tsx         # 'use client'  — 4 usos (rotador vertical)
│   │   ├── Marquee.tsx                # 'use client'  — 3 usos
│   │   ├── CounterOdometer.tsx        # 'use client'  — 5 usos
│   │   ├── RevealHeading.tsx          # 'use client'  — 2 usos (about + services)
│   │   ├── CoverImage.tsx             # server (wrapper next/image + radius)
│   │   └── icons/                     # SVGs inline como componentes React
│   └── home/
│       ├── Hero.tsx                   # 'use client'
│       ├── About.tsx                  # server (hijos client)
│       ├── Projects/
│       │   ├── index.tsx              # server
│       │   └── ProjectCard.tsx        # 'use client'
│       ├── Process.tsx                # server
│       ├── Services/
│       │   ├── index.tsx              # server
│       │   ├── ServiceCard.tsx        # server
│       │   └── ServicesMarquee.tsx    # 'use client'
│       ├── DesignCta.tsx              # 'use client'
│       ├── OffersMarquee.tsx          # 'use client'
│       ├── Advantages/
│       │   ├── index.tsx              # server
│       │   ├── RotatingBadge.tsx      # 'use client'
│       │   └── BentoTile.tsx          # server
│       ├── Products/
│       │   ├── index.tsx              # server
│       │   └── ProductCard.tsx        # 'use client'
│       ├── Testimonials/
│       │   ├── index.tsx              # server
│       │   └── TestimonialSlider.tsx  # 'use client' (embla)
│       └── Blogs.tsx                  # server
└── lib/
    ├── design-tokens.ts   (ELIMINADO despues: no lo usaba nadie; los tokens
    │                       viven solo en el @theme de globals.css)
    ├── page-registry.ts
    └── home-data.ts                   # todos los arrays de §6
```

---

## 1. Lista ordenada de secciones (bbox desktop 1440px)

| # | Sección DOM | Componente | Ruta destino | bbox (y, alto) | RSC / client | Subcomponentes |
|---|---|---|---|---|---|---|
| 0 | `section.hero` | `Hero` + `Navbar` | `home/Hero.tsx` + `shared/Navbar/` | y=0, h=972 | **`'use client'`** | HeroSlider (marquee), HeroMobileBlock |
| 1 | `section.more` | `About` | `home/About.tsx` | y=972, h=1200 | server (hijos client) | RevealHeading, CounterOdometer ×4 |
| 2 | `section.white.more-top` | `Projects` | `home/Projects/index.tsx` | y=2172, h=2393 | server | `ProjectCard` (client) |
| 3 | `section.image.process` | `Process` | `home/Process.tsx` | y=4565, h=1207 | server | StepCard (inline), conectores SVG |
| 4 | `section.overflow` | `Services` | `home/Services/index.tsx` | y=5772, h=1546 | server | `ServiceCard`, `ServicesMarquee` (client) |
| 5a | `section.design` | `DesignCta` | `home/DesignCta.tsx` | y=7318, h≈985 | **`'use client'`** | — |
| 5b | `section.no-padding` | `OffersMarquee` | `home/OffersMarquee.tsx` | y=8303, h=91 | **`'use client'`** | — |
| 6 | `section.choice` | `Advantages` | `home/Advantages/index.tsx` | y=8394, h=1424 | server | `RotatingBadge` (client), `BentoTile` |
| 7 | `section.white.products` | `Products` | `home/Products/index.tsx` | y=9818, h=1316 | server | `ProductCard` (client) |
| 8 | `section.testimonials` | `Testimonials` | `home/Testimonials/index.tsx` | y=11134, h=932 | server | `TestimonialSlider` (client, embla) |
| 9 | `section.blogs` | `Blogs` | `home/Blogs.tsx` | y=12066, h=1647 | server | BlogRow (inline, 2 variantes) |
| 10 | `section.foter` | `Footer` | `shared/Footer/index.tsx` | y=13713, h=750 | server | `NewsletterForm` (client) |

**Atención — `sections.json` fusiona designcta:** el índice 5 (`designcta`, y=7318 h=1076) contiene **dos `<section>` distintos**: `section.design` (la imagen fullbleed + título) y `section.no-padding` (el marquee de ofertas, y=8303 h=91, `background-color: #fae9ce`). Son dos componentes separados.

### Detalle por sección

#### 0 · `Hero` — `src/components/home/Hero.tsx` · `'use client'`
- Motivo client: el `hero-slider` es un marquee infinito con `transform` animado; el `.hero-text-wrap` tiene reveal de opacidad (`data-w-id`).
- Estructura: `section.hero` (bg `Hero Banner.webp`, `cover`/`50% 50%`, `min-height:950px`, `margin-bottom:100px`)
  - `div.hero-navbar-wrap` (y=0 h=70, `background: rgba(0,0,0,0.15)`) → **renderiza `<Navbar variant="hero" />`**
  - `div.hero-content-box` (y=150, 1440×822, `flex column`, `gap:100px`)
    - `div.hero-top` (y=150, h=300, `flex`, `gap:40px`)
      - `div.hero-text-wrap` (60,998×286) → `h1.hero-text.section-title` **`text-align: right`**, Sora 130/143, 700, uppercase, blanco; `span.yellow-span` en **#f1dfc2**
      - `div.top-right-box` (1146,234×300, `gap:15px`) → `img.right-icon` (22×300, línea vertical con estrellas) + `div.right-info-wrap` (1183,197×295) con `img.livinor-icon` 197×197 + 3 `p.point-text.white`
      - `div.left-text-wrap.dex-hide` ← **bloque solo-móvil** (display:none en desktop)
    - `div.hero-bottom-content` (y=550, h=422, `gap:40px`)
      - `div.bottom-left-box` (60,300×300) → `img.right-icon` + `div.right-info-wrap` (92,268×260) con h6 + `ButtonWhite`
      - `div.bottom-right-box` = `div.hero-slider` (750,690×422, `border-radius:10px 10px 0 0`, overflow hidden) con 9 `div.cover-image-wrap.hero` de **360×402, r=10px** (3 imágenes × 3 repeticiones)
- **Móvil ≠ stack del desktop:** en móvil se oculta `bottom-left-box`, se ocultan los `right-icon` y los 3 `point-text`, el h1 va **centrado**, y aparece `.left-text-wrap.dex-hide` (título centrado + botón). Ver crop `crops/mobile/00-y0.png`.

#### 1 · `About` — `src/components/home/About.tsx` · server
- `div.about-us-layout` (60,1320×850, **grid 2 col de 630 + gap 60**)
  - `div.about-us-left` (630×850, flex col gap 40)
    - `div.about-us-title` (gap 20) → `<SectionEyebrow label="About Us" />` + `<RevealHeading>` (h3.h4, 40/48, 630×192, con `div.text-color-box` absoluto de 8 `div.line-color` de 50px alto, bg #8e8e8e → son las **8 bandas del reveal palabra-a-palabra**)
    - `div.about-us-button-wrap` (60,480×54, gap 40) → `ButtonWhite` + `div.about-button-text` (`div.color-circle` 10×10 bg `rgb(0,255,55)` + `p.slot-text`)
    - `div.cover-image-wrap.about-us` (60,630×425, **r=12px**)
  - `div.about-us-right` (750,630×850, **grid 2×2 de 315×425**) → 4 `div.about-box` con `<CounterOdometer>`
    - `.one` bg **#ffffff**, `.two` transparente, `.three` transparente, `.four` bg **#fae9ce**; bordes divisorios `rgb(191,191,191)`; radios: one `0 0 10px`, two `0 10px 0 0`, three `0 0 10px 10px`, four `0 0 10px`
    - contenido alineado a la **derecha** (`h6.right`, `paragraph.right.land`)

#### 2 · `Projects` — `src/components/home/Projects/index.tsx` · server
- `section.white.more-top` fondo **#ffffff**
- `div.home-projects-layout` (60,1320×2093, flex col gap 80)
  - `div.home-projects-heading` (gap 20) → `SectionEyebrow "Our Projects"` + `<TwoToneHeading first="Our Featured" second="work" />`
  - `div.projects-card-wrap` (60,1320×1876, **grid 2 col 645 + gap 30**)
    - `div.projects-left-wrap` (60,645×1876): cards 1 y 2 (y=2539 y y=3369, cada una 645×800)
    - `div.projects-right-wrap` (735,645×1876, flex col gap 80): `div.right-heading-wrap` (párrafo + `ButtonWhite`) y luego cards 3 y 4 (y=2785 y y=3615)
- **`ProjectCard`** (`'use client'` — cursor-follow `.project-mouse-move-element` + overlay hover):
  `a.project-card` flex row → `div.projects-info-box` (**90×800, bg #fae9ce, r=12px 0 0 12px**) con `div.project-card-info` (30×720, space-between) de 2 `h3.h6.rotate` (**`transform: rotate(90deg)`**, nombre arriba / año abajo) + `div.cover-image-wrap.project` (555×800, **r=0 12px 12px 0**, position relative) con la imagen, el `div.box-arrow` (21×21 dentro de `.project-mouse-move-element`) y `div.services-overlay-box`

#### 3 · `Process` — `src/components/home/Process.tsx` · server
- `section.image.process` bg `Our Journey BG Image.webp`, sección **OSCURA**
- `div.process-layout` (60,1320×907, **grid: 293 | 1027**)
  - `div.process-heading` (60,293×216) → `SectionEyebrow "Our Process" variant="dark"` + `h2.h2.white` "Our Design"
  - `div.process-content-wrap` (353,1027×907, flex col gap 12)
    - `.process-top-wrap` (block, h=278) → `.process-element.one` en x=572 w=590
    - `.process-center-wrap` (**grid 2×505, gap 16**, h=302) → `.two` (x=353) y `.three.land-hide` (x=875) + `.process-element.dex-hide` (step 03 móvil, oculto)
    - `.process-bottom-wrap` (**grid 4×257, gap 0**, h=302) → `.four.land-hide` (col 1), `div.blank.hide`, `.five` (col 3), `div.blank.hide`, `.process-element.dex-hide` (step 04 móvil, oculto)
- **Cada `.process-element`** = `div.step-box-arrow` (SVG conector 170×164 — **solo en steps 1, 2 y 3 en desktop**) + `div.step-image-info-wrap`
  - `div.step-image` (380×139 en steps 1-3, 257×139 en 4-5; flex col gap 20) → `div.yellow-text-box` (h=24: `div.yellow-circle` + `p.step-text` en **#ffd900**) + `div.cover-image-wrap.process` (380×95 / 257×95, **r=12px**)
  - `div.step-info` (gap 10) → `h3.h6.white` + `p.paragraph.white`
- **Duplicados desktop/móvil:** step 03 y step 04 existen dos veces. La copia desktop (`.land-hide`) del **step 03 usa `Award Four.webp`** mientras que la copia móvil (`.dex-hide`) usa `Decorated Office (Planning).webp`. No es un error de captura, está así en el original.

#### 4 · `Services` — `src/components/home/Services/index.tsx` · server
- `div.home-services-layout` (60,1320×1296, flex col gap 100)
  - `div.services-title` (1320×318, **grid 384 | 896, gap 40**, con borde superior y divisor vertical entre columnas)
    - `div.services-left-heading` (60,384×317) → `SectionEyebrow "Our Services"` + `div.cover-image-wrap.services` (60,290×185, r=12px) + `div.button-hide` con `ButtonWhite "All Services"` (**oculto en desktop**, se ve solo en landscape/tablet)
    - `div.services-right-title` (484,896×298) → `<RevealHeading>` (h3.h4 896×144, misma mecánica de 8 `line-color`) + `div.land-hide` con `ButtonWhite "View All Services"` (484,234×54)
  - `div.services-content-wrap` (60,1320×546) → `div.service-collection-list.home` **grid 3×420, gap 30**
  - `div.services-bottom-slider` (60,1320×232, flex col gap 12) → `<ServicesMarquee />`
- **`ServiceCard`**: `a.service-box` (420×546, **bg #ffffff, r=10px**, padding 20) → `div.service-info-wrap.home` (380×426, flex col **gap 60**) → `div.service-icon-box` (**150×150, bg #fae9ce**) con `img.service-icon-image` + `div.service-text-wrap` (`h2.h4` 40/48 + `p.paragraph.land`)
- **`ServicesMarquee`** (`'use client'`): 2 filas de 110px de alto, direcciones opuestas.
  - `.top-slider` (gap 30) → **5** `.services-slider.top`, cada uno con **3** `.slider-box` (15 boxes en total)
  - `.bottom-slider` (gap 30) → **4** `.services-slider.bottom`, cada uno con **3** `.slider-box` (12 en total)
  - Cada `.slider-box` = `div.livinor-slider-icon` (SVG 116×116, aros entrelazados grises) **+** `h3.h1` (Sora 96/107.5, 600, uppercase, negro). Al concatenarse se lee `⧉ RENOVATION ⧉ PLANNING ⧉ STYLING ⧉ …`

#### 5a · `DesignCta` — `src/components/home/DesignCta.tsx` · `'use client'`
- `section.design` con bg `Home BG.webp`. **En el screenshot aparece a 720×443 centrada (x=360, y=7639)** porque hay una animación IX2 de scroll que la expande a fullbleed 1440. **Estado final = ancho completo.** (ver §7 dudas)
- `div.home-design-layout` (390,660×343, flex gap 20) → `div.design-line-image` (`img.design-line`, línea vertical con estrellas, 17×430) + `div.design-button-title` (408,642×343, flex col gap 60)
  - `div.design-title-wrap` (gap 80) → `div.design-small-title` (`div.h6.white-icon.land`, tiene un icono ✦ delante) + `h2.design-text.section-title` (Sora **130/143, 600**, uppercase, blanco, `text-align: start`)
  - `ButtonWhite "Lets Talk"` → `/contact`

#### 5b · `OffersMarquee` — `src/components/home/OffersMarquee.tsx` · `'use client'`
- `section.no-padding` **bg #fae9ce**, h=91 (y=8303)
- `div.design-slider-layout` (60,1320×31, gap 8) → **4** `div.design-slider` (gap 10), cada uno con **6** `div.design-slider-box` (gap 20) = 24 boxes
- Cada box = `div.slider-icon` (SVG 17×17, un `+`) + `h2.h6.no-wrap` + `div.slider-icon` → se lee `+ + 20% OFF FIRST CONSULTATION + + 10% OFF THIS MONTH + +…`
- Anchos medidos: `10% Off This Month` 343px · `Free Space Planning` 364px · `20% Off First Consultation` 461px

#### 6 · `Advantages` — `src/components/home/Advantages/index.tsx` · server
- `div.choice-layout` (60,1320×1074, flex col gap 80)
  - `div.choice-title` → `SectionEyebrow "Advantages"` + `<TwoToneHeading first="Why choose" second="us" />` (centrado: el h2-section-title arranca en x=399)
  - `div.choice-content-wrap` (**grid 3×427, gap 20**, h=857)
    - **Col izq** `.choice-left-wrap` (gap 20): `.choice-left-top` (427×287, **bg blanco, r=10px**) con `<RotatingBadge/>`; `.choice-left-bottom` (427×550, r=10px, bg `Modern sofa.webp`) + `div.image-overlay` + `div.left-text-box` (h3.h6.white)
    - **Col centro** `.choice-center-wrap` (gap 20): `.center-top-box` (427×270, **bg #fae9ce**, r=10px) con `h3.h6.land` + `<CounterOdometer value={350} suffix="+" />` + `p.paragraph.black`, y `div.corner-image-wrap` con 3 `cover-image-wrap.corner-*` (197×228, absolutas, aparecen en hover); `.center-logo-wrap` (427×270, **bg blanco**) con `div.center-logo` SVG 175×184 gris; `.center-bottom-wrap` (427×270, flex gap 20) con `cover-image-wrap.bottom` (mirror) + `cover-image-wrap.bottom.land-hide` (sofa, 203×270)
    - **Col der** `.choice-right-wrap` (gap 20): `.right-top-box` (427×560, r=10px, bg `A girl using a mobile.webp`) + `div.image-overlay.right` + `div.right-content-box` con `cover-image-wrap.inside` (`A girl with a phone.png`) + `h3.h6.white`; `.right-bottom-wrap` (427×270, r=10px, bg `Lamp light.webp`) + `div.image-overlay.right-bottom` + `div.right-corner-icon` (SVG 43×43, estrella) + `h3.h6.white.pre-wrap`
- **`RotatingBadge`** (`'use client'`): `div.cover-image-wrap.dot` (205×205, overflow hidden) con `img.cover-image.dot` (**261×261, `Dot Image.svg`, rotando** — en la captura `rotate(109°)`) + `div.bold-text-wrap` **absoluto, 115×60, overflow hidden** con 5 `div.bold-text` (62px cada uno) → rotador vertical de 5 textos.

#### 7 · `Products` — `src/components/home/Products/index.tsx` · server
- `section.white.products` fondo **#ffffff**
- `div.products-layout` (60,1320×1016, flex col gap 80)
  - `div.products-title-wrap` → `SectionEyebrow "Featured Products "` + `<TwoToneHeading first="Explore Our" second="Collection" />` (centrado, x=208)
  - `div.products-content-wrap` (flex col gap 80) → grid **3×420, gap 30** + `ButtonWhite "View More"` → `/shop`
- **`ProductCard`** (`'use client'` — hover): `a.products-wrap` (420×665, position relative, bg crema claro) → `div.cover-image-wrap.products` + `div.products-content` (absoluto, flex col **space-between, gap 40**, padding 20)
  - `div.products-top` → `div.products-category` (pill blanca) con `p.product-text`
  - `div.products-bottom` (**reposo: flex row, h=65** → `div.name-price` a la izq (precio arriba, nombre abajo) y `div.cart-wrap` a la der, 137×65, **bg #fae9ce**, con `p.paragraph.white` "Cart" + `div.cart-icon-wrapper` 45×45 con 2 SVG superpuestos blanco/negro)
  - **Hover**: `products-bottom` pasa a **h=150 en columna**: name-price sube 85px y `cart-wrap` baja a la izquierda. En el screenshot la **card 1 está capturada en hover**; el estado de reposo correcto es el de las cards 2 y 3.

#### 8 · `Testimonials` — `src/components/home/Testimonials/index.tsx` · server
- `section.testimonials` bg `Modern Home with black background.webp`, **OSCURA**
- `div.testimonial-layout` (60,1320×681, flex col gap 60)
  - `div.products-title-wrap` (centrado) → `SectionEyebrow "Testimonials" variant="dark"` + `h2.h2.white.center` "Our Happy Customers"
  - `div.testimonial-content-wrap` (60,1320×487) → `<TestimonialSlider />`
- **`TestimonialSlider`** (`'use client'`, embla): **4 slides** (no 9), cada slide 1320×487
  - `div.testimonial-slider` (flex col **gap 80**) → `div.star-text-wrap` (138,1165×132, gap 40, centrado) con `div.rating` (5 `div.star`, SVG 20×20 **#ffd900**) + `p.paragraph.white.land-hide-text` (centrado); y `div.image-info-wrap` (flex col gap 20, centrado) con `div.cover-image-wrap.testimonial` (**alto fijo 190px**, ancho variable según ratio) + `div.name-title-wrap` (`h3.h6.white` + `p.paragraph.yellow` **#ffd900**)
  - Flechas: `div.left-arrow` en **x=60, y=11692, 60×60, r=10px** y `div.right-arrow` en **x=1320, 60×60, r=12px** — cuadrados con borde blanco y chevron (SVG 16×31)
  - `div.slide-nav.w-slider-nav.w-round.w-num` con 4 dots (`1 2 3 4`) existe en el DOM pero **no aparece en `computed-styles.json` ni en el crop → está `display:none` en desktop.** No lo pintes visible.

#### 9 · `Blogs` — `src/components/home/Blogs.tsx` · server
- `div.home-blogs-layout` (60,1320×1297, flex col gap 80)
  - `div.blogs-title` (gap 40) → `SectionEyebrow "Our Blogs"` + `<TwoToneHeading first="Design" second="Insights" />`
  - **Fila 1** `div.blogs-info-box` (1320×500, flex gap 30): `div.blogs-big-box` (**888×500**, imagen + overlay + `div.name-time-wrap` absoluto abajo-izq con `h3.h5.white` + `div.date-wrap` (icono calendario 30×30 + fecha)) | `div.blogs-mini-box` (**402×500, bg #fae9ce, r=12px**) con `h3.h6` "About Author" + avatar + nombre + `ButtonBlack "Read More"`
  - **Fila 2** `div.blogs-info-box.two` — **orden invertido**: `blogs-mini-box.last` (x=60) primero, `blogs-big-box` (x=492) después. Ojo: el título de la fila 2 es un `h4.h5.white` (no `h3`).

#### 10 · `Footer` — `src/components/shared/Footer/index.tsx` · server
- `section.foter` bg `Image with a black background.webp`, **OSCURA**
- `div.footer-layout` (60,1320×550, flex col gap 40)
  - `div.footer-top` (1320×423, flex gap 40)
    - `div.footer-left` (60,635×360, flex col gap 40): `a.footer-home-link` con `img.footer-image` (`Livinor Footer Image.png`) + `div.footer-left-box` con `h2.mail-text` (**Sora 76/89.7, 600, lowercase, blanco**) y `<NewsletterForm/>`
    - `div.footer-right` (735,645×423, flex col gap 50): `div.footer-right-top` con `h3.h6.footer` (+`span.card-span` en **#fae9ce**) y `div.right-social-wrap` (4 `a.footer-social-box`, círculos con borde, SVG 35×35); `div.footer-content-wrap` (735,645×205, **bg #191919, r=10px**) con `h3.h6.yellow` "Quick links" (**#ffd900**) y `div.footer-pages-box` con 7 `a.link-text`
  - `div.footer-bottom` (1320×70, gap 45): `div.footer-line` + `div.bottom-content-wrap` con 2 `p.paragraph.footer` (**#d7d7d7**) y 2 `a.bottom-link` (**#ffd900**)
- **`NewsletterForm`** (`'use client'`): `input.footer-text-field` (60,635×58, **bg #191919**, placeholder color #333) + `input[type=submit].submit-button.footer` (552,143×54, **bg negro**, texto blanco, r pill). Mensajes de éxito/error incluidos abajo.

---

## 2. Qué va en `shared/`, `ui/` y `home/`

### 2.1 `src/components/shared/` — se reutiliza en las otras 20 páginas

| Componente | Fichero | Client? | Notas |
|---|---|---|---|
| `Navbar` | `shared/Navbar/index.tsx` | **sí** | acepta `variant: 'hero' \| 'solid'`. En la home vive **dentro** de `section.hero` (`div.hero-navbar-wrap`, `bg rgba(0,0,0,0.15)`, 1440×70), no en `layout.tsx`. En páginas internas será una barra sólida. Por eso: renderízalo desde cada página o desde el layout con prop, pero el markup del hero exige que esté **dentro** del `<section>` para que el fondo se vea por debajo. |
| `MegaMenu` | `shared/Navbar/MegaMenu.tsx` | **sí** | dropdown del item "Pages": 4 columnas (`Pages`/`Cms`/`Utility`/`E-Commerce`) + `div.nav-bg-video` con `<video>` autoplay/loop y botón play/pausa. |
| `CartDrawer` | `shared/Navbar/CartDrawer.tsx` | **sí** | tipo `rightDropdown`. Badge amarillo con contador `0`. En la réplica es puramente estático/mock. |
| `MobileNavToggle` | `shared/Navbar/MobileNavToggle.tsx` | **sí** | `div.menu-button.w-nav-button` (hamburguesa) + overlay. |
| `Footer` | `shared/Footer/index.tsx` | no | 100% estático salvo el form. |
| `NewsletterForm` | `shared/Footer/NewsletterForm.tsx` | **sí** | estados idle/done/fail. |

### 2.2 `src/components/ui/` — primitivos (patrones repetidos)

| Primitivo | Usos | Descripción medida |
|---|---|---|
| **`ButtonWhite`** | **8** | `a.button-white` = `div.button-box` (h=54, **r pill**, `p.button-text` Inter 16/24 500 negro) + `div.arrow-div` (39×39 círculo). **Reposo desktop:** box **#ffd900**, arrow-div `opacity:0; translate3d(-105%,0,0) scale(.75)`, bg blanco. **Hover desktop:** box → **#ffffff**, arrow-div `opacity:1; translate3d(0,0,0) scale(1)`. **Móvil (sin IX2):** box **blanco** + arrow-div **amarillo visible**. Icono: SVG 25×25 flecha ↗. Props: `{ href, label, className }`. |
| **`ButtonBlack`** | **2** | Igual pero `div.button-box.black` (bg negro, `p.button-text.white`) + `div.arrow-div.white` + `div.button-icon.black`. |
| **`SectionEyebrow`** | **8** | `div.mini-heading-wrap` (h=32, flex gap 10) = `div.lottie-wrap` (icono rombo 32×32) + `p.sub-text` (Inter 16/24 **600**). **Dos variantes de icono:** en secciones claras es una **animación Lottie** (SVG animado, `.lottie-wrap > div > svg`, 6 usos); en las oscuras (`process`, `testimonials`) es un SVG estático `div.mini-icon.w-embed` (2 usos). Prop `variant: 'light' \| 'dark'` → `p.sub-text` vs `p.sub-text.white`. |
| **`TwoToneHeading`** | **4** | `div.h2-section-title` (flex gap 10) = `h2.h2.tab-center` (parte 1, negro) + `div.h2-counter-wrap` (**overflow hidden**, h=85) con `div.h2-title-counter` (3 copias del `h2`, la 3ª con clase `.color` = **#8e8e8e**). El wrapper interno se anima con `transform: translate3d(0, -66%, 0)` → **el estado final muestra la copia gris**. Usos: `work`, `us`, `Collection`, `Insights`. |
| **`Marquee`** | **3** | genérico: `{ children, speed, direction, gap }`. Usos: `hero-slider` (9 imágenes 360×402), `ServicesMarquee` (2 filas opuestas), `OffersMarquee` (1 fila). |
| **`CounterOdometer`** | **5** | `div.counter-div` (**overflow hidden**, h=66) > `div.counter-wrap` (flex) > `div.counter-text-wrap` (10 `h3.h3` apilados, alto total 661) + opcional `div.counter-icon-wrap` (5 `h3.h3` con `+`). Estado final = **primer valor visible** (2014 / 350+ / 200+ / 25+). 4 usos en `about` + 1 en `advantages` (350+). |
| **`RevealHeading`** | **2** | `div.about-us-text-wrap` (position relative) = `h3.h4` + `div.text-color-box` (absoluto, mismo bbox) con 8 `div.line-color` de **50px de alto y bg #8e8e8e**. El scroll va tapando/destapando bandas → efecto de texto gris→negro por líneas. **Estado final: todo negro.** Usos: `about` (630×192) y `services` (896×144). |
| **`CoverImage`** | ~25 | patrón `div.cover-image-wrap.{modifier}` + `img.cover-image.{modifier}`, radios entre 10 y 12px, `object-fit: cover`. |

### 2.3 Iconos SVG inline (a `src/components/ui/icons/`)

| Componente sugerido | Clase original | viewBox | Usos | Dónde |
|---|---|---|---|---|
| `ArrowUpRightIcon` | `.button-icon` | `0 0 25 25` | 8 | ButtonWhite |
| `ArrowUpRightIconBlack` | `.button-icon.black` | `0 0 25 25` | 2 | ButtonBlack |
| `ChevronDownIcon` | `.dropdown-arrow` | `0 0 16 16` | 1 | navbar "Pages" |
| `DiamondLottie` | `.lottie-wrap > svg` | `0 0 32 32` | 6 | eyebrows claros (animado) |
| `DiamondIcon` | `.mini-icon` | `0 0 32 32` | 2 | eyebrows oscuros |
| `BoxArrowIcon` | `.box-arrow` | `0 0 21 21` | 4 | ProjectCard (cursor) |
| `StepConnector` | `.step-box-arrow` | `0 0 170 164` | 4 (3 visibles) | Process |
| `LivinorRingsIcon` | `.livinor-slider-icon` | `0 0 116 116` | 27 | ServicesMarquee |
| `PlusIcon` | `.slider-icon` | `0 0 17 17` | 48 | OffersMarquee |
| `LivinorLogoMark` | `.center-logo` | `0 0 178 178` | 1 | Advantages centro |
| `StarSparkIcon` | `.right-corner-icon` | `0 0 43 43` | 1 | Advantages der-abajo |
| `CartIconWhite` / `CartIconBlack` | `.cart-icon-home` | `0 0 43 43` | 3+3 | ProductCard |
| `StarIcon` | `.star` | `0 0 20 20` | 20 | rating testimonios |
| `SliderChevron` | `.slide-icon` | `0 0 16 31` | 2 | flechas carrusel |
| `CalendarIcon` | `.time-icon` | `0 0 30 30` | 2 | fecha blogs |
| `FacebookIcon`, `XIcon`, `LinkedinIcon`, `InstagramIcon` | `.social-icon` | `0 0 35 35` | 4 | footer |

Los SVG extraídos están en `references/pages/home/assets/svgs/inline-N.svg` (índice en orden de aparición en el DOM; `index.json` sólo da `w`/`h`). Índices útiles: botón ↗ = 4,5,7; rombo lottie = 6,8,19; conector = 15,16,17; aros marquee = 22+; `+` = 50+; logo centro = 99; estrella esquina = 100; cart = 102-107; estrellas rating = 110+; chevrons = 130,131; calendario = 133,136; sociales = 137-140.

### 2.4 `src/components/home/`
Todo lo demás. Ninguna de estas 11 secciones se reutiliza en otras páginas tal cual (Projects/Services/Products/Blogs sí tienen primos en `/projects`, `/services`, `/shop`, `/blogs`, pero con layout distinto — no los generalices ahora).

---

## 3. EL COPY COMPLETO Y LITERAL

### 3.1 Navbar

```
Logo (alt): Name and log of the website
Links:
  Home       → /
  About us   → /about-us
  Projects   → /projects
  Shop       → /shop
  Pages      → (megamenú)
Cart badge: 0
Texto oculto (.paragraph.hide) junto al logo: Link
```

Megamenú "Pages" — 4 columnas:

```
Columna 1 — título: Pages
  Contact Us          → /contact
  Blogs               → /blogs
  Services            → /services
  Shop                → /shop
  Team                → /team-one

Columna 2 — título: Cms
  Blogs Details       → https://livinor.webflow.io/blogs/the-art-of-home-and-living
  Services Details    → https://livinor.webflow.io/services/floor-styling
  Projects Details    → https://livinor.webflow.io/projects/luneth-maison
  Products Details    → https://livinor.webflow.io/product/leather-armchair
  Categories Details  → https://livinor.webflow.io/category/all

Columna 3 — título: Utility
  Style Guide         → /utility-pages/style-guide
  Changelog           → /utility-pages/changelog
  Licenses            → /utility-pages/licenses
  Password Protected  → https://livinor.webflow.io/401
  404                 → https://livinor.webflow.io/404

Columna 4 — título: E-Commerce   (clase h6.no-wrap.white)
  Checkout            → https://livinor.webflow.io/checkout
  Checkout (Paypal)   → https://livinor.webflow.io/paypal-checkout
  Order Confirmation  → https://livinor.webflow.io/order-confirmation
```

Bloque de vídeo del megamenú:

```
<video autoplay loop muted playsinline poster="…Navbar_BG_Video_poster.0000000.jpg">
  691077eba085c0a8252b3117_693a9287e3851420a97634a9_Navbar_BG_Video_webm.webm
  691077eba085c0a8252b3117_693a9287e3851420a97634a9_Navbar_BG_Video_mp4.mp4
Botón play/pausa:
  alt de la imagen de pausa: Pause video   (628299f8aa233b83918e24fd_Pause.svg)
  alt de la imagen de play:  Play video    (628298b20ae0236682d4b87f_Play-24.svg)
```

Cart drawer (`rightDropdown`):

```
Your Cart
Subtotal
Pay with browser.
Continue to Checkout          → /checkout
No items found.
Product is not available in this quantity.
```

### 3.2 Hero (sección 0)

```
H1  (mixed case en DOM, uppercase por CSS, text-align:right):
Mood Begins at <span class="yellow-span">home</span>
        ^ ojo: hay un espacio antes del <span>

Lista de la caja superior derecha (p.point-text.white):
1. Interior Styling
2. Space Planning
3. Mood Lighting

Bloque inferior izquierdo (DESKTOP, .hero-bottom-content > .bottom-left-box):
Designing Modern Homes <span class="yellow-span">Since 2014</span>
Botón: "Contact Now "   → /contact      (con espacio final)

Bloque MÓVIL (.left-text-wrap.dex-hide, display:none en desktop):
h2.h6.white.mobile-center →  Designing Modern Homes <span class="yellow-span">Since 2014</span>
Botón: "Contact Now "   → /contact

alt del icono de línea vertical (×2):
A long white line and star icon in both top and bottom
alt del rombo Livinor: Icon
alt de las 3 imágenes del hero-slider: "Smart Home "   (con espacio final)
```

### 3.3 About (sección 1)

```
Eyebrow: About Us

Titular (h3.h4, reveal palabra a palabra):
From homes to offices, we bring your vision to life. Our results speak for themselves

Botón: Want Design   → /contact
Texto junto al botón (p.slot-text, con punto verde #00ff37):
Slots are available

alt de la imagen: Smart Office
```

Las 4 stats (todas alineadas a la derecha):

```
1) 2014
   establishment
   Over a decade of transforming spaces
   (odómetro: 2014, 2013, 2012, 2011, 2010, 2010, 2009, 2008, 2007, 2006)

2) 350 +
   Projects finished
   Homes to offices, we deliver excellence
   (odómetro: 350, 349, 348, 347, 346, 345, 344, 343, 342, 341 · sufijo: + ×5)

3) 200 +
   Happy Clients
   People who love our designs
   (odómetro: 200, 199, 198, 197, 196, 195, 194, 193, 192, 191 · sufijo: + ×5)

4) 25 +
   Ongoing Projects
   Homes to offices, we deliver excellence
   (odómetro: 25, 24, 23, 22, 21, 20, 19, 18, 17, 16 · sufijo: + ×5)
```

### 3.4 Projects (sección 2)

```
Eyebrow: Our Projects
Título:  Our Featured  +  [rotador: work / work / work(gris)]

Párrafo de la columna derecha:
Discover our collection of thoughtfully designed interiors — each project reflecting modern aesthetics, functionality, and comfort for everyday living.

Botón: View All Projects   → /projects
```

Los 4 proyectos (texto vertical: nombre arriba, año abajo; los `img` tienen `alt=""`):

```
1) Velora Haven   · 2024 · /projects/velora-haven   · 69255f0d1d24a1b596e5b847_Velora_Haven.webp
2) Serenith Home  · 2023 · /projects/serenith-home  · 6926f120bc7f6ffb63b3b962_Serenith_Home.webp
3) Nuvell Retreat · 2024 · /projects/nuvell-retreat · 6926f0fce092e1caade846f4_Nuvell_Retreat.webp
4) Luneth Maison  · 2022 · /projects/luneth-maison  · 6926f148da713e0092426be2_Luneth_Maison.webp
```

Orden visual desktop: col-izq = 1, 2 · col-der = 3, 4 (desplazada 246px hacia abajo).
Texto oculto en cada card (`p.paragraph.hide`): `Current Link`

### 3.5 Process (sección 3)

```
Eyebrow: Our Process
Título (h2.h2.white): Our Design
```

Los 5 pasos:

```
Step 01 · Discovery
We start by understanding your style, needs, and vision for the space.
img: 693a76f01e86667228853a61_Decorated_Office___Discovery_.webp   alt: Official item

Step 02 · Concept Design
Our team creates mood boards and design ideas that capture your aesthetic.
img: 693ab86994430e034edb6027_Decorated_Office__Concept_Design_.webp   alt: Official item

Step 03 · Planning
Every detail is refined — from layout to materials — for perfect balance and function
img DESKTOP (.land-hide): 69311aae92c9999468c2b812_Award_Four.webp
img MÓVIL   (.dex-hide):  693aba3490fd1b14bbc8c28b_Decorated_Office__Planning_.webp
alt: Official item        (fíjate: sin punto final en la descripción)

Step 04 · Execution
We bring the design to life with precision, care, and expert craftsmanship.
img: 693ab8a294430e034edb6e56_Decorated_Office__Execution_.webp   alt: Official item

Step 05 ·  Final Touch          ← ¡espacio inicial en el título! Se ve como sangría
A complete review and styling ensure your space feels truly finished and personal.
img: 693aba6e45148bd0b1a7b9b6_Decoraated_Office___Final_Touch_.webp   alt: Official item
```

### 3.6 Services (sección 4)

```
Eyebrow: Our Services

Titular (h3.h4, reveal):
From interiors to lighting, we craft spaces that reflect your personality and purpose

Botón visible en desktop: View All Services  → /services
Botón oculto en desktop (.button-hide, se ve en tablet/landscape): All Services  → /services

alt de la imagen de la columna izquierda: Lightening Stairs
```

Las 3 tarjetas de servicio:

```
1) Lighting Solutions      → /services/lighting-solutions
   We craft stylish, functional interiors that reflect your taste and enhance everyday living. Our designs combine creativity and practicality to transform every corner of your home.
   icono: 69423058398f41474dca7705_Lighting_Solutions.svg   alt: Box Shape Image

2) Space Planning          → /services/space-planning
   Our team optimizes layouts to make every corner of your space purposeful and visually balanced. We ensure each arrangement enhances both comfort and aesthetic appeal.
   icono: 69423047d935dbdc19a0da64_Space_Planning.svg   alt: Icon in a cubic form

3) Furniture Styling       → /services/furniture-styling
   From statement pieces to subtle accents, we curate furniture that completes your home’s look. Every selection is chosen to harmonize style, function, and personality.
   icono: 694230244830e94cdcaccba1_Furniture_Styling.svg   alt: Icon Liike Dimond Shape
```

> Los `alt` están cruzados en el original (el de "Lighting Solutions" dice "Box Shape Image", el de "Furniture Styling" dice "Icon Liike Dimond Shape" con la errata incluida). Cópialos literalmente.

Texto oculto en cada card (`p.paragraph.hide`): `Current link` (con `l` minúscula, a diferencia de projects).

Marquee de servicios — **2 filas, direcciones opuestas**. Secuencia base repetida:

```
Renovation
Planning
Styling
```

```
Fila superior (.top-slider): 5 grupos × 3 items = 15 slider-box
Fila inferior (.bottom-slider): 4 grupos × 3 items = 12 slider-box
Cada slider-box = [icono aros ⧉] + [texto]
Render efectivo:  ⧉ RENOVATION  ⧉ PLANNING  ⧉ STYLING  ⧉ RENOVATION  …
```

### 3.7 Design CTA + Offers Marquee (sección 5)

```
Pre-título (div.h6.white-icon.land, con icono ✦ delante):
Design Your Space with <span class="yellow-span">Purpose</span>

Titular (h2.design-text.section-title, Sora 130px):
Let’s Design Your Dream <span class="yellow-span">Home</span>
       ^ apóstrofo tipográfico U+2019, NO comilla recta

Botón: Lets Talk   → /contact        (sin apóstrofo, así en el original)

alt de la línea vertical: Long white link icon with star in both side
```

Marquee de ofertas — secuencia base de 3, repetida 8 veces (4 grupos × 6 boxes = 24):

```
10% Off This Month
Free Space Planning
20% Off First Consultation
```

```
Cada box = [+] + [texto] + [+]
Render efectivo:  + + 10% OFF THIS MONTH + + FREE SPACE PLANNING + + 20% OFF FIRST CONSULTATION + + …
```

### 3.8 Advantages (sección 6)

```
Eyebrow: Advantages
Título:  Why choose  +  [rotador: us / us / us(gris)]
```

Tarjetas del bento:

```
[izq-arriba]   Badge rotatorio (anillo de puntos + texto que rota):
               Bold Designs
               Stark Designs
               Nexo Designs
               Prime Designs
               Aura Designs
               alt del anillo: Image like dot

[izq-abajo]    Unique Design asthetic          ← errata original ("asthetic"), consérvala
               bg: 6940d4c3e305c857d94848ee_Modern_sofa.webp

[centro-arriba] Proven Work and Trusted Reputation
                350 +   (odómetro: 350…341, sufijo + ×5)
                Project Launched
                3 imágenes de esquina (hover): White Furniture / Modern floor / Modern floor with stairs
                alt de las 3: Modern Home

[centro-medio]  (solo el logo SVG de aros, sin texto)

[centro-abajo]  (solo imágenes, sin texto)
                Mirror beside a wall  ·  alt: Mirror beside a wall
                Beautiful Sofa        ·  alt: Modern sofa       (.land-hide)

[der-arriba]    Client-Focused Approach
                bg: 6940e9338ef49addc78cb2b8_A_girl_using_a_mobile.webp
                imagen interior: 6940ed82b890237ff8263fc5_A_girl_with_a_phone.png · alt: A girl using mobile

[der-abajo]     Attention to details            ← clase .pre-wrap, se parte en 2 líneas
                bg: 6940eecbbd830ae82c3dc5c0_Lamp_light.webp
```

### 3.9 Products (sección 7)

```
Eyebrow: Featured Products          ← el DOM tiene "Featured Products " con espacio final
Título:  Explore Our  +  [rotador: Collection / Collection / Collection(gris)]
Botón:   View More   → /shop
```

Los 3 productos (nombres en minúscula en el DOM, uppercase por CSS):

```
1) leather armchair · $ 499.00 USD · categoría: Chair · /product/leather-armchair
   img: 6942372974324a552a3ad947_leather_armchair_without_bg.webp   alt: ""
2) wooden chair     · $ 599.00 USD · categoría: Chair · /product/wooden-chair
   img: 694237007bfffdc5b2974b13_wooden_chair_without_bg.webp       alt: ""
3) leather bed      · $ 299.00 USD · categoría: Bed   · /product/leather-bed
   img: 694236ddb34993f0ab98462d_leather_bed_without_bg.webp        alt: ""

Label del botón de carrito en cada card: Cart
Texto oculto (p.paragraph.hide) al final de cada card: la categoría (Chair / Chair / Bed)
```

### 3.10 Testimonials (sección 8) — **son 4 slides, no 9**

```
Eyebrow: Testimonials
Título (h2.h2.white.center): Our Happy Customers
Rating: 5 estrellas en los 4 slides
Dots: 1 2 3 4 (existen en el DOM pero están ocultos en desktop)
```

**Slide 1 — comillas TIPOGRÁFICAS “ ” :**

```
“I was amazed by how effortlessly they blended style and comfort. The furniture looks luxurious yet feels incredibly practical and cozy. Every morning feels brighter walking into our beautifully designed living room — it’s a space that truly reflects our personality, where elegance meets everyday comfort. Their attention to detail and sense of balance transformed our home into a place we genuinely love waking up to.”
```
```
Nombre: Ethan Miller
Rol:    Decorator
Imagen: 69411f572943a3a7c1b8b580_A_man_infront_a_gray_background.webp
alt:    A man infront a gray background
```

**Slide 2 — comillas RECTAS " " (así en el original):**

```
"From the very first glance, we felt a perfect balance of beauty and function throughout the space. Every element feels carefully selected, combining refined design with everyday comfort. The atmosphere is warm, inviting, and effortlessly elegant. It’s amazing how thoughtful details and smart styling can turn a house into a home that truly feels personal and uplifting."
```
```
Nombre: Jashon
Rol:    Professor
Imagen: 6942436c2088eb0e1c155967_man_portrait_four.webp
alt:    A man infront a gray background
```

**Slide 3 — comillas RECTAS " " :**

```
"What stood out immediately was how seamlessly luxury blended with livability. The furniture is visually stunning yet incredibly comfortable, making every moment spent at home feel relaxed and enjoyable. Each area flows naturally into the next, creating a calm and cohesive environment. The result is a space that not only looks beautiful but also enhances our daily lifestyle."
```
```
Nombre: Noah Mike
Rol:    Assistant
Imagen: 6942438cd82c14730b41e308_man_portrait_three.webp
alt:    A man infront a gray background
```

**Slide 4 — comillas RECTAS " " :**

```
"Walking into the room feels like stepping into a space designed just for us. The combination of style, comfort, and functionality creates a welcoming atmosphere that feels both sophisticated and cozy. Every detail adds to the overall harmony, transforming our home into a place that feels balanced, inspiring, and genuinely enjoyable to live in every day."
```
```
Nombre: Ali Hamja
Rol:    Editor
Imagen: 694243a1d965c0ea05b6394b_man_portrait.webp
alt:    A man infront a gray background
```

> Detalle unicode: **sólo el slide 1** usa `“` (U+201C) y `”` (U+201D). Los slides 2-4 usan `"` ASCII. Los cuatro usan `’` (U+2019) en `it’s` / `It’s`. El slide 1 usa `—` (U+2014).

### 3.11 Blogs (sección 9)

```
Eyebrow: Our Blogs
Título:  Design  +  [rotador: Insights / Insights / Insights(gris)]
Label de la mini-card (×2): About Author
Botón (×2): Read More
```

```
POST 1 (imagen a la izquierda, mini-card a la derecha)
Título: The Art of Home and Living
Fecha:  May 18, 2025
Autor:  " Isabella Moore"        ← espacio INICIAL en el DOM
URL:    /blogs/the-art-of-home-and-living
img:      691b111e9864f85984731f8a_Blog_Six__2_.webp     alt: The Art of Home and Living
avatar:   696797dbf070e9a595e9932d_Mini_Author_Image.png alt: Beautiful Woman

POST 2 (mini-card a la izquierda, imagen a la derecha — orden INVERTIDO)
Título: Elegant Spaces Journal of Style
Fecha:  Feb 14, 2025
Autor:  William Clarke
URL:    /blogs/elegant-spaces-journal-of-style
img:      691b104394d69394ce7530fe_Blog_Five.webp        alt: Elegant Spaces Journal of Style
avatar:   694246f2c1ed88582b33b245_A_smiling_man__A5_.webp alt: Handsome Man
```

### 3.12 Footer (sección 10)

```
Logo: 691302abdb4a70fb8ab08fa9_Livinor_Footer_Image.png   alt: Livinor Nav Image
Texto oculto junto al logo: Link

Email gigante (h2.mail-text, text-transform: lowercase):
hi@livinor.com          ← el DOM tiene "hi@livinor.com " con espacio final

Formulario (id="email-form", name="email-form", method="get"):
  input type=email  name="email"  id="email"  maxlength="256"  required
  placeholder: Enter your mail
  submit value: Submit Now       (data-wait: "Please wait...")
Mensaje de éxito:  Thank you! Your submission has been received!
Mensaje de error:  Oops! Something went wrong

Titular derecha (h3.h6.footer):
Designs that define <span class="card-span">your space</span>

Redes (a.footer-social-box, texto oculto en cada una: "Social Link"):
  1  glifo Facebook   → https://www.facebook.com/
  2  glifo X/Twitter  → https://x.com/
  3  glifo LinkedIn   → https://www.instagram.com/     ← ver §7, glifo y href NO coinciden
  4  glifo Instagram  → https://www.linkedin.com/      ← idem

Quick links (h3.h6.yellow): Quick links
  Home       → /
  About      → /about-us
  Services   → /services
  Projects   → /projects
  Shop       → /shop
  Blogs      → /blogs
  Licenses   → /utility-pages/licenses

Barra inferior:
  Copyright © Livinor | Designed by   +  link "Theme Sleek" → https://webflow.com/templates/designers/theme-sleek
  Powered by                          +  link "Webflow"     → https://webflow.com/
```

### 3.13 Textos ocultos (`.paragraph.hide`) — inventario completo

Existen 19 nodos con clase `.hide`. Los de texto son marcadores de accesibilidad de Webflow; **replícalos como `sr-only`** para no romper el conteo de nodos:

```
"Link"          ×2  (logo navbar, logo footer)
"Current Link"  ×4  (project cards)
"Current link"  ×3  (service cards, con l minúscula)
"Social Link"   ×4  (footer social)
"Chair" / "Chair" / "Bed"  ×3  (product cards)
```
Además `img.cart-icon.white.hide` (icono de carrito negro, oculto en la variante hero) y 2 `div.blank.hide` (spacers de grid en `process-bottom-wrap`).

---

## 4. Mapa de imágenes

Fuente: `references/pages/home/assets/images/` (122 archivos = 53 base + variantes `-p-500/-800/-1080/-1600/-2000/-2600/-3200`).
Nombres normalizados: espacios y paréntesis → `_`.

Destino sugerido: `public/images/shared/` para logos/iconos globales, `public/images/pages/home/` para el resto.

| Sección | Archivo (en `assets/images/`) | Uso | `alt` original | Destino |
|---|---|---|---|---|
| **shared** | `696b3aa1a4ece1d9ba79012c_Livinor_Black.svg` | logo navbar (170×55) | `Name and log of the website` | `shared/logo-navbar.svg` |
| **shared** | `691302abdb4a70fb8ab08fa9_Livinor_Footer_Image.png` | logo footer | `Livinor Nav Image` | `shared/logo-footer.png` |
| **shared** | `628299f8aa233b83918e24fd_Pause.svg` | botón pausa vídeo megamenú | `Pause video` | `shared/pause.svg` |
| **shared** | `628298b20ae0236682d4b87f_Play-24.svg` | botón play vídeo megamenú | `Play video` | `shared/play.svg` |
| **shared** | `…Navbar_BG_Video_mp4.mp4` / `_webm.webm` / `_poster.0000000.jpg` | vídeo del megamenú | — | `shared/navbar-video.*` |
| hero | `693680636730b565d87eb29c_Hero_Banner.webp` | **CSS bg** de `section.hero` (cover 50% 50%) | — | `home/hero-banner.webp` |
| hero | `69382301e2b188bb55506503_Livinor.svg` | rombo 197×197 caja sup-der | `Icon` | `home/livinor-mark.svg` |
| hero | `69390c856e0894ff7d8ce7ab_Decorated_home.webp` | hero-slider 1 (×3) | `Smart Home ` | `home/hero-slide-1.webp` |
| hero | `69390d68f903507b067565f1_Well_decorated_home.webp` | hero-slider 2 (×3) | `Smart Home ` | `home/hero-slide-2.webp` |
| hero | `69511db20f26acbea6ff29fc_modern_office_with_chair_and_table.webp` | hero-slider 3 (×3) | `Smart Home ` | `home/hero-slide-3.webp` |
| about | `69391b3cb0511890e6998964_Decorated_office_room.webp` | imagen 630×425 | `Smart Office` | `home/about-office.webp` |
| projects | `69255f0d1d24a1b596e5b847_Velora_Haven.webp` | card 1 | `` (vacío) | `home/project-velora-haven.webp` |
| projects | `6926f120bc7f6ffb63b3b962_Serenith_Home.webp` | card 2 | `` | `home/project-serenith-home.webp` |
| projects | `6926f0fce092e1caade846f4_Nuvell_Retreat.webp` | card 3 | `` | `home/project-nuvell-retreat.webp` |
| projects | `6926f148da713e0092426be2_Luneth_Maison.webp` | card 4 | `` | `home/project-luneth-maison.webp` |
| process | `6968e39fddd365cef79bc77b_Our_Journey_BG_Image.webp` | **CSS bg** de `section.image.process` | — | `home/process-bg.webp` |
| process | `693a76f01e86667228853a61_Decorated_Office___Discovery_.webp` | step 01 | `Official item` | `home/step-01-discovery.webp` |
| process | `693ab86994430e034edb6027_Decorated_Office__Concept_Design_.webp` | step 02 | `Official item` | `home/step-02-concept.webp` |
| process | `69311aae92c9999468c2b812_Award_Four.webp` | step 03 **desktop** | `Official item` | `home/step-03-desktop.webp` |
| process | `693aba3490fd1b14bbc8c28b_Decorated_Office__Planning_.webp` | step 03 **móvil** | `Official item` | `home/step-03-mobile.webp` |
| process | `693ab8a294430e034edb6e56_Decorated_Office__Execution_.webp` | step 04 (desktop y móvil) | `Official item` | `home/step-04-execution.webp` |
| process | `693aba6e45148bd0b1a7b9b6_Decoraated_Office___Final_Touch_.webp` | step 05 | `Official item` | `home/step-05-final-touch.webp` |
| services | `693fd2d56a323f663fa998c1_Lightening_Stairs.webp` | imagen 290×185 col-izq | `Lightening Stairs` | `home/services-stairs.webp` |
| services | `69423058398f41474dca7705_Lighting_Solutions.svg` | icono card 1 | `Box Shape Image` | `home/icon-lighting.svg` |
| services | `69423047d935dbdc19a0da64_Space_Planning.svg` | icono card 2 | `Icon in a cubic form` | `home/icon-space.svg` |
| services | `694230244830e94cdcaccba1_Furniture_Styling.svg` | icono card 3 | `Icon Liike Dimond Shape` | `home/icon-furniture.svg` |
| designcta | `693fff177c2cdb5efbec2282_Home_BG.webp` | **CSS bg** de `section.design` | — | `home/design-cta-bg.webp` |
| designcta | `693ffc6679e77a57310cea6e_Home_Design.webp` | línea vertical decorativa 17×430 | `Long white link icon with star in both side` | `home/design-line.webp` |
| advantages | `6940d3a93a674f22487b13f1_Dot_Image.svg` | anillo de puntos 261×261 (rota) | `Image like dot` | `home/dot-ring.svg` |
| advantages | `6940d4c3e305c857d94848ee_Modern_sofa.webp` | **CSS bg** `.choice-left-bottom` | — | `home/adv-sofa.webp` |
| advantages | `6943e124d406f9e9b2730573_White_Furniture.webp` | corner-one (hover) | `Modern Home` | `home/adv-corner-1.webp` |
| advantages | `6940d90d0887cea78c24c149_Modern_floor.webp` | corner-two (hover) | `Modern Home` | `home/adv-corner-2.webp` |
| advantages | `6940d9ced9127623480b428c_Modern_floor_with_stairs.webp` | corner-three (hover) | `Modern Home` | `home/adv-corner-3.webp` |
| advantages | `6940e69d45f39958214101bf_Mirror_beside_a_wall.webp` | bottom-left | `Mirror beside a wall` | `home/adv-mirror.webp` |
| advantages | `6940e7f6a47c63d00b0de61c_Beautiful_Sofa.webp` | bottom (203×270, `.land-hide`) | `Modern sofa` | `home/adv-beautiful-sofa.webp` |
| advantages | `6940e9338ef49addc78cb2b8_A_girl_using_a_mobile.webp` | **CSS bg** `.right-top-box` | — | `home/adv-girl-bg.webp` |
| advantages | `6940ed82b890237ff8263fc5_A_girl_with_a_phone.png` | imagen interior `.cover-image.inside` | `A girl using mobile` | `home/adv-girl-inside.png` |
| advantages | `6940eecbbd830ae82c3dc5c0_Lamp_light.webp` | **CSS bg** `.right-bottom-wrap` | — | `home/adv-lamp.webp` |
| products | `6942372974324a552a3ad947_leather_armchair_without_bg.webp` | producto 1 | `` | `home/product-armchair.webp` |
| products | `694237007bfffdc5b2974b13_wooden_chair_without_bg.webp` | producto 2 | `` | `home/product-chair.webp` |
| products | `694236ddb34993f0ab98462d_leather_bed_without_bg.webp` | producto 3 | `` | `home/product-bed.webp` |
| testimonials | `69410f005c9286e5b09611b7_Modern_Home_with_black_background.webp` | **CSS bg** de la sección | — | `home/testimonials-bg.webp` |
| testimonials | `69411f572943a3a7c1b8b580_A_man_infront_a_gray_background.webp` | Ethan Miller | `A man infront a gray background` | `home/testimonial-1.webp` |
| testimonials | `6942436c2088eb0e1c155967_man_portrait_four.webp` | Jashon | idem | `home/testimonial-2.webp` |
| testimonials | `6942438cd82c14730b41e308_man_portrait_three.webp` | Noah Mike | idem | `home/testimonial-3.webp` |
| testimonials | `694243a1d965c0ea05b6394b_man_portrait.webp` | Ali Hamja | idem | `home/testimonial-4.webp` |
| blogs | `691b111e9864f85984731f8a_Blog_Six__2_.webp` | post 1 (888×500) | `The Art of Home and Living` | `home/blog-1.webp` |
| blogs | `691b104394d69394ce7530fe_Blog_Five.webp` | post 2 (888×500) | `Elegant Spaces Journal of Style` | `home/blog-2.webp` |
| blogs | `696797dbf070e9a595e9932d_Mini_Author_Image.png` | avatar Isabella Moore | `Beautiful Woman` | `home/author-isabella.png` |
| blogs | `694246f2c1ed88582b33b245_A_smiling_man__A5_.webp` | avatar William Clarke | `Handsome Man` | `home/author-william.webp` |
| footer | `6912fa809f02fc5d2cce0aad_Image_with_a_black_background.webp` | **CSS bg** de `section.foter` | — | `home/footer-bg.webp` |

### 4.1 Assets **que faltan** en la descarga (3)

El DOM los referencia pero no están en `assets/images/`:

```
6938291cca3b79e21723bc5c_Right Icon.svg      → hero, línea vertical con estrellas (usada 2×, 22×300)
                                               alt: "A long white line and star icon in both top and bottom"
6913282294c2df4236e0b206_Cart Icon.png       → navbar, carrito negro (.cart-icon.white.hide — oculto en la home)
6939666fd9197e1281b08f60_White Cart Icon.png → navbar, carrito blanco 30×30 (VISIBLE)
```

**Acción:** re-descargarlos de `https://cdn.prod.website-files.com/691077eba085c0a8252b3117/<archivo>` o recrearlos como SVG inline. El carrito blanco es imprescindible (se ve en el hero); el `Right Icon` también (2 apariciones bien visibles).

### 4.2 Uso de `srcset`

Los `img` de projects, blogs, testimonios y advantages traen `srcset` con variantes `-p-500/-800/-1080/-1600/-2000` y `sizes="100vw"`. Con `next/image` esto lo genera Next automáticamente desde el archivo base — **usa sólo el archivo base**, ignora las variantes `-p-*` (no hace falta copiarlas a `public/`).

---

## 5. Notas de responsive (clases del original)

| Clase | Significado medido | Elementos |
|---|---|---|
| `dex-hide` | `display:none` en **desktop**, visible en tablet/móvil | 3: bloque móvil del hero, step 03 móvil, step 04 móvil |
| `land-hide` | visible en desktop, oculto en landscape/tablet | 4: step 03 desktop, step 04 desktop, botón "View All Services", `cover-image-wrap.bottom` (sofa) |
| `land-hide-text` | el párrafo del testimonio se acorta/oculta en landscape | 4 (los 4 testimonios) |
| `button-hide` | oculto en desktop, visible en tablet — botón "All Services" | 1 |
| `mobile-center` | centra el h2 del bloque móvil del hero | 1 |
| `tab-center` | centra los h2 de sección en tablet | 16 |
| `no-wrap` | `white-space: nowrap` — items del marquee de ofertas + "E-Commerce" | 25 |
| `pre-wrap` | fuerza salto en "Attention to details" | 1 |
| `land` | ajustes de tamaño de texto en landscape | 9 |
| `hide` | `display:none` siempre (sr-only / spacers) | 19 |

---

## 6. Estructura de datos TypeScript (`src/lib/home-data.ts`)

```ts
// ─────────────────────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────────────────────
export type NavLink = { label: string; href: string };
export type MegaMenuColumn = { title: string; links: NavLink[]; noWrap?: boolean };

export type Stat = {
  /** valores del odómetro, de arriba (final) a abajo (inicio de la animación) */
  odometer: string[];
  suffix?: string;          // "+" repetido 5 veces en el DOM
  label: string;
  description: string;
  /** modificador de fondo/bordes: one=blanco, two/three=transparente, four=#fae9ce */
  variant: 'one' | 'two' | 'three' | 'four';
};

export type Project = {
  name: string;
  year: string;
  href: string;
  image: string;
  alt: string;              // "" en las 4
};

export type ProcessStep = {
  step: string;             // "Step 01"
  title: string;            // ojo: step 05 empieza por espacio
  description: string;
  image: string;
  imageMobile?: string;     // solo step 03
  alt: string;              // "Official item"
  hasConnector: boolean;    // steps 1-3 en desktop
};

export type Service = {
  title: string;
  description: string;
  href: string;
  icon: string;
  iconAlt: string;
};

export type BentoTile = {
  id: string;
  title?: string;
  bg?: string;
  images?: { src: string; alt: string }[];
};

export type Product = {
  name: string;             // minúscula en el dato; uppercase por CSS
  price: string;            // "$ 499.00 USD"
  category: string;
  href: string;
  image: string;
  alt: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  image: string;
  alt: string;
  rating: number;           // 5 en los 4
};

export type BlogPost = {
  title: string;
  date: string;
  href: string;
  image: string;
  alt: string;
  author: string;
  authorImage: string;
  authorAlt: string;
  /** fila 1 = 'image-left', fila 2 = 'image-right' */
  layout: 'image-left' | 'image-right';
};

// ─────────────────────────────────────────────────────────────
// Navegación (shared)
// ─────────────────────────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: 'Home',     href: '/' },
  { label: 'About us', href: '/about-us' },
  { label: 'Projects', href: '/projects' },
  { label: 'Shop',     href: '/shop' },
];

export const MEGAMENU: MegaMenuColumn[] = [
  {
    title: 'Pages',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Blogs',      href: '/blogs' },
      { label: 'Services',   href: '/services' },
      { label: 'Shop',       href: '/shop' },
      { label: 'Team',       href: '/team-one' },
    ],
  },
  {
    title: 'Cms',
    links: [
      { label: 'Blogs Details',      href: 'https://livinor.webflow.io/blogs/the-art-of-home-and-living' },
      { label: 'Services Details',   href: 'https://livinor.webflow.io/services/floor-styling' },
      { label: 'Projects Details',   href: 'https://livinor.webflow.io/projects/luneth-maison' },
      { label: 'Products Details',   href: 'https://livinor.webflow.io/product/leather-armchair' },
      { label: 'Categories Details', href: 'https://livinor.webflow.io/category/all' },
    ],
  },
  {
    title: 'Utility',
    links: [
      { label: 'Style Guide',        href: '/utility-pages/style-guide' },
      { label: 'Changelog',          href: '/utility-pages/changelog' },
      { label: 'Licenses',           href: '/utility-pages/licenses' },
      { label: 'Password Protected', href: 'https://livinor.webflow.io/401' },
      { label: '404',                href: 'https://livinor.webflow.io/404' },
    ],
  },
  {
    title: 'E-Commerce',
    noWrap: true,
    links: [
      { label: 'Checkout',           href: 'https://livinor.webflow.io/checkout' },
      { label: 'Checkout (Paypal)',  href: 'https://livinor.webflow.io/paypal-checkout' },
      { label: 'Order Confirmation', href: 'https://livinor.webflow.io/order-confirmation' },
    ],
  },
];

export const FOOTER_LINKS: NavLink[] = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about-us' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Shop',     href: '/shop' },
  { label: 'Blogs',    href: '/blogs' },
  { label: 'Licenses', href: '/utility-pages/licenses' },
];

/** OJO: glifo e href no coinciden en el original (ver §7). Se replica tal cual. */
export const SOCIAL_LINKS = [
  { icon: 'facebook',  href: 'https://www.facebook.com/' },
  { icon: 'x',         href: 'https://x.com/' },
  { icon: 'linkedin',  href: 'https://www.instagram.com/' },
  { icon: 'instagram', href: 'https://www.linkedin.com/' },
] as const;

// ─────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────
export const HERO = {
  titleFirst: 'Mood Begins at ',
  titleSpan: 'home',
  points: ['1. Interior Styling', '2. Space Planning', '3. Mood Lighting'],
  taglineFirst: 'Designing Modern Homes ',
  taglineSpan: 'Since 2014',
  cta: { label: 'Contact Now ', href: '/contact' },
  slides: [
    { src: '/images/pages/home/hero-slide-1.webp', alt: 'Smart Home ' },
    { src: '/images/pages/home/hero-slide-2.webp', alt: 'Smart Home ' },
    { src: '/images/pages/home/hero-slide-3.webp', alt: 'Smart Home ' },
  ],
} as const;

// ─────────────────────────────────────────────────────────────
// About
// ─────────────────────────────────────────────────────────────
export const ABOUT = {
  eyebrow: 'About Us',
  heading: 'From homes to offices, we bring your vision to life. Our results speak for themselves',
  cta: { label: 'Want Design', href: '/contact' },
  slotText: 'Slots are available',
  image: { src: '/images/pages/home/about-office.webp', alt: 'Smart Office' },
} as const;

export const STATS: Stat[] = [
  {
    odometer: ['2014','2013','2012','2011','2010','2010','2009','2008','2007','2006'],
    label: 'establishment',
    description: 'Over a decade of transforming spaces',
    variant: 'one',
  },
  {
    odometer: ['350','349','348','347','346','345','344','343','342','341'],
    suffix: '+',
    label: 'Projects finished',
    description: 'Homes to offices, we deliver excellence',
    variant: 'two',
  },
  {
    odometer: ['200','199','198','197','196','195','194','193','192','191'],
    suffix: '+',
    label: 'Happy Clients',
    description: 'People who love our designs',
    variant: 'three',
  },
  {
    odometer: ['25','24','23','22','21','20','19','18','17','16'],
    suffix: '+',
    label: 'Ongoing Projects',
    description: 'Homes to offices, we deliver excellence',
    variant: 'four',
  },
];

// ─────────────────────────────────────────────────────────────
// Projects
// ─────────────────────────────────────────────────────────────
export const PROJECTS_INTRO =
  'Discover our collection of thoughtfully designed interiors — each project reflecting modern aesthetics, functionality, and comfort for everyday living.';

export const PROJECTS: Project[] = [
  { name: 'Velora Haven',   year: '2024', href: '/projects/velora-haven',   image: '/images/pages/home/project-velora-haven.webp',   alt: '' },
  { name: 'Serenith Home',  year: '2023', href: '/projects/serenith-home',  image: '/images/pages/home/project-serenith-home.webp',  alt: '' },
  { name: 'Nuvell Retreat', year: '2024', href: '/projects/nuvell-retreat', image: '/images/pages/home/project-nuvell-retreat.webp', alt: '' },
  { name: 'Luneth Maison',  year: '2022', href: '/projects/luneth-maison',  image: '/images/pages/home/project-luneth-maison.webp',  alt: '' },
];

// ─────────────────────────────────────────────────────────────
// Process
// ─────────────────────────────────────────────────────────────
export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 'Step 01',
    title: 'Discovery',
    description: 'We start by understanding your style, needs, and vision for the space.',
    image: '/images/pages/home/step-01-discovery.webp',
    alt: 'Official item',
    hasConnector: true,
  },
  {
    step: 'Step 02',
    title: 'Concept Design',
    description: 'Our team creates mood boards and design ideas that capture your aesthetic.',
    image: '/images/pages/home/step-02-concept.webp',
    alt: 'Official item',
    hasConnector: true,
  },
  {
    step: 'Step 03',
    title: 'Planning',
    description: 'Every detail is refined — from layout to materials — for perfect balance and function',
    image: '/images/pages/home/step-03-desktop.webp',
    imageMobile: '/images/pages/home/step-03-mobile.webp',
    alt: 'Official item',
    hasConnector: true,
  },
  {
    step: 'Step 04',
    title: 'Execution',
    description: 'We bring the design to life with precision, care, and expert craftsmanship.',
    image: '/images/pages/home/step-04-execution.webp',
    alt: 'Official item',
    hasConnector: false,
  },
  {
    step: 'Step 05',
    title: ' Final Touch', // ← espacio inicial intencionado
    description: 'A complete review and styling ensure your space feels truly finished and personal.',
    image: '/images/pages/home/step-05-final-touch.webp',
    alt: 'Official item',
    hasConnector: false,
  },
];

// ─────────────────────────────────────────────────────────────
// Services
// ─────────────────────────────────────────────────────────────
export const SERVICES_HEADING =
  'From interiors to lighting, we craft spaces that reflect your personality and purpose';

export const SERVICES: Service[] = [
  {
    title: 'Lighting Solutions',
    description: 'We craft stylish, functional interiors that reflect your taste and enhance everyday living. Our designs combine creativity and practicality to transform every corner of your home.',
    href: '/services/lighting-solutions',
    icon: '/images/pages/home/icon-lighting.svg',
    iconAlt: 'Box Shape Image',
  },
  {
    title: 'Space Planning',
    description: 'Our team optimizes layouts to make every corner of your space purposeful and visually balanced. We ensure each arrangement enhances both comfort and aesthetic appeal.',
    href: '/services/space-planning',
    icon: '/images/pages/home/icon-space.svg',
    iconAlt: 'Icon in a cubic form',
  },
  {
    title: 'Furniture Styling',
    description: 'From statement pieces to subtle accents, we curate furniture that completes your home’s look. Every selection is chosen to harmonize style, function, and personality.',
    href: '/services/furniture-styling',
    icon: '/images/pages/home/icon-furniture.svg',
    iconAlt: 'Icon Liike Dimond Shape',
  },
];

/** marquee 2 filas: 5 grupos arriba, 4 abajo, direcciones opuestas */
export const SERVICES_MARQUEE = ['Renovation', 'Planning', 'Styling'] as const;
export const SERVICES_MARQUEE_TOP_GROUPS = 5;
export const SERVICES_MARQUEE_BOTTOM_GROUPS = 4;

// ─────────────────────────────────────────────────────────────
// Design CTA + ofertas
// ─────────────────────────────────────────────────────────────
export const DESIGN_CTA = {
  eyebrowFirst: 'Design Your Space with ',
  eyebrowSpan: 'Purpose',
  titleFirst: 'Let’s Design Your Dream ',
  titleSpan: 'Home',
  cta: { label: 'Lets Talk', href: '/contact' },
} as const;

/** 4 grupos × 6 boxes = 24 en el DOM */
export const OFFERS = [
  '10% Off This Month',
  'Free Space Planning',
  '20% Off First Consultation',
] as const;
export const OFFERS_GROUPS = 4;
export const OFFERS_PER_GROUP = 6; // la secuencia de 3 va duplicada dentro de cada grupo

// ─────────────────────────────────────────────────────────────
// Advantages
// ─────────────────────────────────────────────────────────────
export const ADVANTAGES_BADGE_TEXTS = [
  'Bold Designs',
  'Stark Designs',
  'Nexo Designs',
  'Prime Designs',
  'Aura Designs',
] as const;

export const ADVANTAGES = {
  leftBottomTitle: 'Unique Design asthetic',   // errata original
  centerTitle: 'Proven Work and Trusted Reputation',
  centerCounter: { odometer: ['350','349','348','347','346','345','344','343','342','341'], suffix: '+' },
  centerCounterLabel: 'Project Launched',
  rightTopTitle: 'Client-Focused Approach',
  rightBottomTitle: 'Attention to details',
} as const;

// ─────────────────────────────────────────────────────────────
// Products
// ─────────────────────────────────────────────────────────────
export const PRODUCTS: Product[] = [
  { name: 'leather armchair', price: '$ 499.00 USD', category: 'Chair', href: '/product/leather-armchair', image: '/images/pages/home/product-armchair.webp', alt: '' },
  { name: 'wooden chair',     price: '$ 599.00 USD', category: 'Chair', href: '/product/wooden-chair',     image: '/images/pages/home/product-chair.webp',    alt: '' },
  { name: 'leather bed',      price: '$ 299.00 USD', category: 'Bed',   href: '/product/leather-bed',      image: '/images/pages/home/product-bed.webp',      alt: '' },
];

// ─────────────────────────────────────────────────────────────
// Testimonials  (4 slides)
// ─────────────────────────────────────────────────────────────
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: '“I was amazed by how effortlessly they blended style and comfort. The furniture looks luxurious yet feels incredibly practical and cozy. Every morning feels brighter walking into our beautifully designed living room — it’s a space that truly reflects our personality, where elegance meets everyday comfort. Their attention to detail and sense of balance transformed our home into a place we genuinely love waking up to.”',
    name: 'Ethan Miller',
    role: 'Decorator',
    image: '/images/pages/home/testimonial-1.webp',
    alt: 'A man infront a gray background',
    rating: 5,
  },
  {
    quote: '"From the very first glance, we felt a perfect balance of beauty and function throughout the space. Every element feels carefully selected, combining refined design with everyday comfort. The atmosphere is warm, inviting, and effortlessly elegant. It’s amazing how thoughtful details and smart styling can turn a house into a home that truly feels personal and uplifting."',
    name: 'Jashon',
    role: 'Professor',
    image: '/images/pages/home/testimonial-2.webp',
    alt: 'A man infront a gray background',
    rating: 5,
  },
  {
    quote: '"What stood out immediately was how seamlessly luxury blended with livability. The furniture is visually stunning yet incredibly comfortable, making every moment spent at home feel relaxed and enjoyable. Each area flows naturally into the next, creating a calm and cohesive environment. The result is a space that not only looks beautiful but also enhances our daily lifestyle."',
    name: 'Noah Mike',
    role: 'Assistant',
    image: '/images/pages/home/testimonial-3.webp',
    alt: 'A man infront a gray background',
    rating: 5,
  },
  {
    quote: '"Walking into the room feels like stepping into a space designed just for us. The combination of style, comfort, and functionality creates a welcoming atmosphere that feels both sophisticated and cozy. Every detail adds to the overall harmony, transforming our home into a place that feels balanced, inspiring, and genuinely enjoyable to live in every day."',
    name: 'Ali Hamja',
    role: 'Editor',
    image: '/images/pages/home/testimonial-4.webp',
    alt: 'A man infront a gray background',
    rating: 5,
  },
];

// ─────────────────────────────────────────────────────────────
// Blogs
// ─────────────────────────────────────────────────────────────
export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'The Art of Home and Living',
    date: 'May 18, 2025',
    href: '/blogs/the-art-of-home-and-living',
    image: '/images/pages/home/blog-1.webp',
    alt: 'The Art of Home and Living',
    author: ' Isabella Moore',              // ← espacio inicial intencionado
    authorImage: '/images/pages/home/author-isabella.png',
    authorAlt: 'Beautiful Woman',
    layout: 'image-left',
  },
  {
    title: 'Elegant Spaces Journal of Style',
    date: 'Feb 14, 2025',
    href: '/blogs/elegant-spaces-journal-of-style',
    image: '/images/pages/home/blog-2.webp',
    alt: 'Elegant Spaces Journal of Style',
    author: 'William Clarke',
    authorImage: '/images/pages/home/author-william.webp',
    authorAlt: 'Handsome Man',
    layout: 'image-right',
  },
];

// ─────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────
export const FOOTER = {
  email: 'hi@livinor.com ',
  form: {
    placeholder: 'Enter your mail',
    submit: 'Submit Now',
    waiting: 'Please wait...',
    success: 'Thank you! Your submission has been received!',
    error: 'Oops! Something went wrong',
  },
  taglineFirst: 'Designs that define ',
  taglineSpan: 'your space',
  quickLinksTitle: 'Quick links',
  copyright: 'Copyright © Livinor | Designed by',
  copyrightLink: { label: 'Theme Sleek', href: 'https://webflow.com/templates/designers/theme-sleek' },
  poweredBy: 'Powered by',
  poweredByLink: { label: 'Webflow', href: 'https://webflow.com/' },
} as const;

// ─────────────────────────────────────────────────────────────
// Eyebrows (los 8, en orden de aparición)
// ─────────────────────────────────────────────────────────────
export const EYEBROWS = [
  'About Us', 'Our Projects', 'Our Process', 'Our Services',
  'Advantages', 'Featured Products ', 'Testimonials', 'Our Blogs',
] as const;

// ─────────────────────────────────────────────────────────────
// Títulos de dos tonos (rotador vertical)
// ─────────────────────────────────────────────────────────────
export const TWO_TONE_HEADINGS = [
  { first: 'Our Featured', second: 'work' },
  { first: 'Why choose',   second: 'us' },
  { first: 'Explore Our',  second: 'Collection' },
  { first: 'Design',       second: 'Insights' },
] as const;
```

---

## 7. Dudas y hallazgos que hay que decidir

1. **`section.design` sale a 720×443 (x=360) en `computed-styles.json`.** Es una animación IX2 de scroll (la caja crece hasta fullbleed). El crop `05-designcta.png` la muestra a medias porque el screenshot se tomó por tiles. **Asunción: el estado final es 1440 de ancho, alto ≈985.** Confírmalo el analyst de motion.
2. **La card 1 de products está capturada en hover** (`products-bottom` h=150 en columna en vez de h=65 en fila). El estado de reposo correcto es el de las cards 2 y 3.
3. **Testimonios: son 4, no ~9.** El brief hablaba de ~9 slides; el DOM tiene exactamente 4 `.w-slide` y 4 dots.
4. **Los dots del carrusel (`.slide-nav`) no aparecen en `computed-styles.json` ni en el crop** → probablemente `display:none` en desktop. No los pintes visibles salvo que el analyst de motion diga lo contrario.
5. **Iconos sociales cruzados con sus URLs**: el 3.º es el glifo de **LinkedIn** apuntando a `instagram.com` y el 4.º el glifo de **Instagram** apuntando a `linkedin.com`. Para fidelidad visual hay que respetar el ORDEN DE GLIFOS (f, X, in, cámara). Decide si mantienes los hrefs cruzados (fiel) o los corriges.
6. **`.yellow-span` NO es amarillo**: su `color` computado es **`#f1dfc2`** (beige). El amarillo `#ffd900` sólo aparece en `.button-box` (reposo desktop), `.step-text`, `.paragraph.yellow`, `.h6.yellow`, `.star`, `.cart-quantity` y `.bottom-link`.
7. **Step 03 usa imágenes distintas en desktop (`Award Four.webp`) y móvil (`Decorated Office (Planning).webp`).** Confirmado en el crop desktop (la imagen del step 03 es la abstracta de colores). No es error de captura.
8. **Faltan 3 assets** (`Right Icon.svg`, `Cart Icon.png`, `White Cart Icon.png`) — ver §4.1.
9. **El logo de la navbar se llama `Livinor Black.svg` pero contiene fills blancos** (2 paths `white` + 1 `black`). Se usa tal cual, sin filtros; se ve blanco sobre el hero.
10. **La navbar vive dentro de `section.hero`**, no es sticky ni fixed (0 elementos sticky en reposo). Al portarla a `shared/` hay que dejarla parametrizable para las páginas internas.
11. `p.slot-text` "Slots are available" lleva un punto verde `rgb(0,255,55)` de 10×10 — color inusual, medido, no lo aproximes.

---

## 8. Datos clave estructurados

```json
{
  "sections": [
    { "i": 0,  "dom": "section.hero",              "component": "Hero",         "path": "src/components/home/Hero.tsx",              "y": 0,     "h": 972,  "client": true,  "children": ["shared/Navbar", "ui/ButtonWhite", "ui/Marquee"] },
    { "i": 1,  "dom": "section.more",              "component": "About",        "path": "src/components/home/About.tsx",             "y": 972,   "h": 1200, "client": false, "children": ["ui/SectionEyebrow", "ui/RevealHeading", "ui/ButtonWhite", "ui/CounterOdometer"] },
    { "i": 2,  "dom": "section.white.more-top",    "component": "Projects",     "path": "src/components/home/Projects/index.tsx",    "y": 2172,  "h": 2393, "client": false, "children": ["ui/SectionEyebrow", "ui/TwoToneHeading", "ui/ButtonWhite", "home/Projects/ProjectCard"] },
    { "i": 3,  "dom": "section.image.process",     "component": "Process",      "path": "src/components/home/Process.tsx",           "y": 4565,  "h": 1207, "client": false, "children": ["ui/SectionEyebrow"] },
    { "i": 4,  "dom": "section.overflow",          "component": "Services",     "path": "src/components/home/Services/index.tsx",    "y": 5772,  "h": 1546, "client": false, "children": ["ui/SectionEyebrow", "ui/RevealHeading", "ui/ButtonWhite", "home/Services/ServiceCard", "home/Services/ServicesMarquee"] },
    { "i": "5a","dom": "section.design",           "component": "DesignCta",    "path": "src/components/home/DesignCta.tsx",         "y": 7318,  "h": 985,  "client": true,  "children": ["ui/ButtonWhite"] },
    { "i": "5b","dom": "section.no-padding",       "component": "OffersMarquee","path": "src/components/home/OffersMarquee.tsx",     "y": 8303,  "h": 91,   "client": true,  "children": ["ui/Marquee"] },
    { "i": 6,  "dom": "section.choice",            "component": "Advantages",   "path": "src/components/home/Advantages/index.tsx",  "y": 8394,  "h": 1424, "client": false, "children": ["ui/SectionEyebrow", "ui/TwoToneHeading", "ui/CounterOdometer", "home/Advantages/RotatingBadge", "home/Advantages/BentoTile"] },
    { "i": 7,  "dom": "section.white.products",    "component": "Products",     "path": "src/components/home/Products/index.tsx",    "y": 9818,  "h": 1316, "client": false, "children": ["ui/SectionEyebrow", "ui/TwoToneHeading", "ui/ButtonWhite", "home/Products/ProductCard"] },
    { "i": 8,  "dom": "section.testimonials",      "component": "Testimonials", "path": "src/components/home/Testimonials/index.tsx","y": 11134, "h": 932,  "client": false, "children": ["ui/SectionEyebrow", "home/Testimonials/TestimonialSlider"] },
    { "i": 9,  "dom": "section.blogs",             "component": "Blogs",        "path": "src/components/home/Blogs.tsx",             "y": 12066, "h": 1647, "client": false, "children": ["ui/SectionEyebrow", "ui/TwoToneHeading", "ui/ButtonBlack"] },
    { "i": 10, "dom": "section.foter",             "component": "Footer",       "path": "src/components/shared/Footer/index.tsx",    "y": 13713, "h": 750,  "client": false, "children": ["shared/Footer/NewsletterForm"] }
  ],
  "shared": [
    { "component": "Navbar",         "path": "src/components/shared/Navbar/index.tsx",           "client": true },
    { "component": "MegaMenu",       "path": "src/components/shared/Navbar/MegaMenu.tsx",        "client": true },
    { "component": "CartDrawer",     "path": "src/components/shared/Navbar/CartDrawer.tsx",      "client": true },
    { "component": "MobileNavToggle","path": "src/components/shared/Navbar/MobileNavToggle.tsx", "client": true },
    { "component": "Footer",         "path": "src/components/shared/Footer/index.tsx",           "client": false },
    { "component": "NewsletterForm", "path": "src/components/shared/Footer/NewsletterForm.tsx",  "client": true }
  ],
  "ui": [
    { "component": "ButtonWhite",     "path": "src/components/ui/ButtonWhite.tsx",     "client": true,  "uses": 8,  "origin": ".button-white" },
    { "component": "ButtonBlack",     "path": "src/components/ui/ButtonBlack.tsx",     "client": true,  "uses": 2,  "origin": ".button-black" },
    { "component": "SectionEyebrow",  "path": "src/components/ui/SectionEyebrow.tsx",  "client": true,  "uses": 8,  "origin": ".mini-heading-wrap" },
    { "component": "TwoToneHeading",  "path": "src/components/ui/TwoToneHeading.tsx",  "client": true,  "uses": 4,  "origin": ".h2-section-title" },
    { "component": "Marquee",         "path": "src/components/ui/Marquee.tsx",         "client": true,  "uses": 3,  "origin": ".*-slider" },
    { "component": "CounterOdometer", "path": "src/components/ui/CounterOdometer.tsx", "client": true,  "uses": 5,  "origin": ".counter-div" },
    { "component": "RevealHeading",   "path": "src/components/ui/RevealHeading.tsx",   "client": true,  "uses": 2,  "origin": ".about-us-text-wrap + .text-color-box" },
    { "component": "CoverImage",      "path": "src/components/ui/CoverImage.tsx",      "client": false, "uses": 25, "origin": ".cover-image-wrap" }
  ],
  "counts": {
    "navLinks": 4,
    "megamenuColumns": 4,
    "megamenuLinks": 18,
    "projects": 4,
    "processSteps": 5,
    "processStepsDesktopVisible": 5,
    "services": 3,
    "stats": 4,
    "advantagesBadgeTexts": 5,
    "products": 3,
    "testimonials": 4,
    "blogPosts": 2,
    "footerQuickLinks": 7,
    "socialLinks": 4,
    "eyebrows": 8,
    "twoToneHeadings": 4,
    "heroSliderItems": 9,
    "servicesMarqueeTopBoxes": 15,
    "servicesMarqueeBottomBoxes": 12,
    "offersMarqueeBoxes": 24,
    "buttonWhite": 8,
    "buttonBlack": 2,
    "imagesBase": 53,
    "imagesTotal": 122,
    "inlineSvgs": 70
  },
  "missingAssets": [
    "6938291cca3b79e21723bc5c_Right Icon.svg",
    "6913282294c2df4236e0b206_Cart Icon.png",
    "6939666fd9197e1281b08f60_White Cart Icon.png"
  ],
  "captureArtifacts": [
    "section.design capturada a 720x443 (animacion IX2 de expansion a fullbleed)",
    "product card 1 capturada en estado hover",
    "rotadores de titulo (.h2-title-counter) capturados en translate -66% (estado final = copia gris)",
    "rotador .bold-text-wrap capturado a mitad de transicion",
    "reveal de texto en about y services capturado a medias (estado final = todo negro)"
  ],
  "textQuirks": {
    "trailingSpace": ["Contact Now ", "Featured Products ", "hi@livinor.com ", "Smart Home ", "Mood Begins at ", "Designing Modern Homes ", "Design Your Space with ", "Let’s Design Your Dream ", "Designs that define "],
    "leadingSpace": [" Final Touch", " Isabella Moore"],
    "typos": ["Unique Design asthetic", "Icon Liike Dimond Shape", "Decoraated Office ( Final Touch).webp", "author-namre-image-wrap"],
    "curlyQuotesOnlyIn": "testimonial 1",
    "apostropheU2019": ["Let’s Design Your Dream", "home’s look", "it’s a space", "It’s amazing"],
    "emDashU2014": ["Discover our collection ... interiors — each project", "Every detail is refined — from layout to materials —", "living room — it’s a space"]
  }
}
```
