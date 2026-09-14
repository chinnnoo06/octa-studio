# livinor-replica

Clon visual de la homepage de [livinor.webflow.io](https://livinor.webflow.io/) —
un template comercial de ecommerce de Webflow para marcas de interiorismo—
reconstruido sobre Next.js con el pipeline **VisionLoop**.

> **Repositorio privado a propósito.** Esto replica un template de pago de
> terceros (Theme Sleek). El sitio se despliega con `noindex` y sin promover a
> producción. No lo publiques ni lo uses como producto.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS v4
(config CSS-first, **no hay `tailwind.config.ts`**) · framer-motion ·
embla-carousel

## Arranque

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # build de producción
```

## Estructura

```
src/
  app/
    layout.tsx            Navbar + Footer + fuentes + metadata
    globals.css           @theme: TODOS los design tokens (congelados)
    (public)/page.tsx     la homepage
  components/
    ui/                   primitivos: Button, Marquee, SectionTitle, Reveal…
    shared/               Navbar y Footer (se reutilizan entre páginas)
    home/                 una carpeta por sección de la home
  lib/
    home-data.ts          todo el copy y los datos, tipados
    motion.ts             variantes de animación
    page-registry.ts      manifiesto de páginas replicadas

analysis/                 análisis del original (layout, diseño, tipografía,
                          componentes, motion) — la fuente de verdad
references/               material crawleado: screenshots, DOM, computed
  original/               styles, y el CSS + config IX2 REALES del sitio
scripts/                  crawler, captura por tiles y comparador visual
```

## Cómo funcionan los tokens

La escala tipográfica y los gaps **no** usan clases por breakpoint: se
redefinen las variables CSS dentro de cada media query, igual que hace Webflow.
Así `text-h2` vale 72px en desktop y 32/28/26px en los cortes inferiores sin
tocar el marcado.

Los breakpoints son los del original (**max-width** 991/767/479), declarados
como variantes propias `tab:`, `land:` y `mob:`. **No coinciden** con los de
Tailwind (`sm:`, `md:`…), que son min-width.

## Pipeline de verificación

```bash
# Recapturar el original en los 3 breakpoints
pnpm exec tsx scripts/recapture-ref.ts https://livinor.webflow.io/ home

# Medir bboxes de sección en el original
pnpm exec tsx scripts/ref-sections.ts https://livinor.webflow.io/ home

# Comparar réplica contra referencia (requiere `pnpm dev` corriendo)
ITER=1 pnpm exec tsx scripts/compare.ts
```

El comparador recorta por sección usando los `data-section` del DOM y aplica
pixelmatch sobre cada recorte. Reporta dos números: el crudo y otro que excluye
las bandas de marquee —comparar píxeles sobre un bucle infinito mide en qué
fase estaba cada captura, no si el diseño coincide.

## Fidelidad actual

Media por sección, excluyendo bandas de marquee:

| Breakpoint | Score | Objetivo |
|---|---|---|
| Desktop | 90.4% | 99% |
| Tablet | 80.1% | 97% |
| Móvil | 75.9% | 97% |

Lo más flojo es el responsive móvil y el footer. `designcta` puntúa bajo porque
la captura de referencia la pilló a mitad de su animación de escala ligada al
scroll: la réplica está en el estado correcto (`scale: 1`) y la referencia no.

## Dos trampas encontradas

1. **framer-motion 13 eliminó `whileInView` y `viewport`.** Compilan sin error
   y no animan nada: fallo silencioso. Usa el hook `useInView`, o el envoltorio
   `components/ui/Reveal.tsx`.
2. **`page.screenshot({ fullPage: true })` no sirve con este sitio.** Redimensiona
   el viewport al alto total, así que las animaciones scroll-triggered de GSAP
   y Webflow IX2 nunca se disparan y las secciones salen en blanco. La captura
   hace scroll real por tiles y los cose (`scripts/capture-stitch.ts`).
