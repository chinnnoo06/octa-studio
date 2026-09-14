# Brief común para los section builders

Proyecto: `c:/Users/alexm/Desktop/Octa Studio/replica/`. Todas las rutas son relativas a ahí.
Réplica de la homepage de **https://livinor.webflow.io/** (template Webflow de interiorismo).

El dev server ya está corriendo en `http://localhost:3000`. **No lo reinicies.**

---

## 1. Lee esto antes de escribir código

| Archivo | Qué tiene |
|---|---|
| `analysis/layout.md` | Geometría exacta por sección: grids, gaps, offsets, alturas de imagen fijadas en CSS, colapsos responsive. **779 líneas, es tu fuente principal.** |
| `analysis/design.md` | Color, radios, bordes, variantes de botón/badge, iconos |
| `analysis/typography.md` | Qué nivel tipográfico usa cada texto y cómo escala |
| `analysis/components.md` | Copy literal completo + estructura interna de cada sección + mapa de imágenes |
| `analysis/motion.md` + `analysis/motion.json` | Cada animación con sus valores IX2 exactos (duración, delay, easing, from/to) |
| `references/original/livinor.css` | **La hoja de estilos real del sitio (245 KB).** Si dudas de un valor, grepea aquí — es la verdad. |
| `references/original/ix2.json` | Config completa de las interacciones de Webflow |
| `references/original/css-rules-by-breakpoint.json` | El CSS ya parseado por media query |

Capturas de referencia:
- `references/pages/home/crops/desktop/NN-nombre.png` — tu sección recortada, escalada a 820px de ancho
- `references/pages/home/crops/tablet/` y `crops/mobile/` — en trozos
- `references/pages/home/screenshots/{desktop,tablet,mobile}.png` — la página entera (1440×14463 / 768×12238 / 375×8318)

Para recortar tu sección a resolución nativa y verla bien, usa `sharp` con el bbox de
`references/pages/home/sections.json` (desktop), `sections-tablet.json`, `sections-mobile.json`.

---

## 2. Artefactos de captura — NO los replique

La referencia se capturó por tiles con scroll real, así que las animaciones sí se dispararon,
pero quedan cuatro cosas que **no** son el diseño:

1. **`designcta`** aparece a `scale` intermedio (0.87 arriba, 1.0 abajo, con costura). El original
   tiene un zoom ligado al scroll `scale 0.5 → 1`. **Construye el estado final: `scale: 1`, full-bleed.**
2. **La product card 1** está en estado hover (texto subido y botón "Cart" a la izquierda).
   El reposo correcto es el de las cards 2 y 3.
3. **El rotador de títulos** acaba en la copia gris (`translateY(-66.666%)`). Eso sí es el estado
   final correcto, no un artefacto.
4. **`hover-states/index.json` está vacío.** Los hovers están documentados en `motion.json`, medidos
   con ratón real. Usa esa fuente, no el JSON vacío.

---

## 3. Stack y reglas

- **Next.js 16** App Router · React 19 · TypeScript `strict` · **Tailwind CSS v4 CSS-first**
- **No existe `tailwind.config.ts`.** Los tokens viven en el `@theme` de `src/app/globals.css`.
- Server Component por defecto. `'use client'` **solo** si necesitas estado, efectos o
  framer-motion. Si tu sección solo tiene animaciones de entrada, extrae la parte animada a un
  subcomponente cliente y deja el resto como server.
- Imágenes con `next/image` desde `/images/pages/home/…` y `/images/shared/…`
  (`public/` está en la raíz del proyecto).
- **Prohibido `dangerouslySetInnerHTML`.** Todo con JSX.
- Enlaces externos siempre con `rel="noopener noreferrer"`.

### Tokens disponibles (usa las utilidades, NO valores arbitrarios)

```
Color:    bg-page #fef8f0 · bg-card #fae9ce · text-beige #f1dfc2 · bg-yellow #ffd900
          text-ink #000 · text-paper #fff · text-paragraph #575757 · text-muted #8e8e8e
          bg-dark #191919 · text-faint #d7d7d7
Fuente:   font-heading (Sora) · font-body (Inter)
Tamaño:   text-hero text-display text-big text-mail text-h1..text-h6 text-body
          text-caption text-badge
          → ya traen line-height y font-weight, y ESCALAN SOLOS por breakpoint.
            No escribas `md:text-[32px]`: `text-h2` ya vale 72/32/28/26px.
Spacing:  p-section py-section pt-bigsection gap-layout px-container …
          → también escalan solos (100→80→60→40, etc.)
Radio:    rounded-card (12px) · rounded-tile (10px) · rounded-pill (50px)
Easing:   ease-[var(--ease-brand)]
```

### Breakpoints — OJO, son los de Webflow, no los de Tailwind

El original usa **max-width** `991 / 767 / 479`. Hay variantes propias declaradas:

```
tab:   @media (max-width: 991px)
land:  @media (max-width: 767px)
mob:   @media (max-width: 479px)
```

Úsalas para el responsive (`tab:grid-cols-2`, `land:flex-col`). Las de Tailwind (`md:`, `lg:`)
existen pero **no coinciden** con los cortes del original; solo úsalas si sabes lo que haces.

Equivalencias de las clases del original: `dex-hide` = oculto salvo en ≤767 · `land-hide` =
oculto en ≤767 · `tab-center` = centrado en ≤991.

---

## 4. Lo que YA existe — reutilízalo, no lo dupliques

```
src/lib/home-data.ts        TODO el copy y los datos, ya tipados. Importa de aquí,
                            no escribas strings a mano. Conserva los espacios raros
                            (" Final Touch", "Contact Now ") — son del original.
src/lib/motion.ts           fadeUp, fadeUpSmall, fadeIn, fadeLeft, fadeRight, scaleIn,
                            clipReveal, staggerParent(), EASE_BRAND, viewportOnce
src/lib/utils.ts            cn()

src/components/ui/Button.tsx        botón de 2 estados (amarillo → blanco + flecha)
                                    props: href, variant 'yellow'|'black'|'outline-white', arrowTone
src/components/ui/Container.tsx     <Container> = .container-livinor
src/components/ui/Eyebrow.tsx       marca + etiqueta. props: tone 'dark'|'light', align
src/components/ui/SectionTitle.tsx  título de 2 partes con rotador vertical.
                                    props: lead, rotating, tone, align, as, rotate
src/components/ui/Marquee.tsx       loop infinito CSS. props: duration(s), direction, gap(px)
src/components/ui/LivinorMark.tsx   la marca en currentColor
src/components/ui/SocialIcon.tsx    los 4 iconos sociales del original
src/components/ui/Reveal.tsx        anima al entrar en viewport (ver aviso abajo)

### ⚠️ framer-motion 13: `whileInView` y `viewport` NO existen

La versión instalada es **framer-motion 13.1.0**, donde esas dos props se
eliminaron de la API pública (verificado en `dist/index.d.ts`: no hay
`whileInView?:` ni `viewport?:` en las props de `motion.*`; `whileInView` solo
sobrevive como tipo interno). Si las usas, **el componente compila y no anima
nada** — falla en silencio.

Lo soportado es el hook `useInView`:

```tsx
const ref = useRef<HTMLDivElement>(null);
const inView = useInView(ref, { once: true, amount: 0.2 });
<motion.div ref={ref} initial={{opacity:0,y:40}} animate={inView ? {opacity:1,y:0} : undefined} />
```

Para lo habitual usa el envoltorio ya hecho:

```tsx
import Reveal from '@/components/ui/Reveal';
import { fadeUp, staggerParent } from '@/lib/motion';

<Reveal variants={fadeUp}>…</Reveal>
<Reveal variants={staggerParent(0.12)}>   {/* los hijos motion.* heredan el stagger */}
  <motion.div variants={fadeUp}>…</motion.div>
</Reveal>
```

`useScroll` y `useTransform` sí funcionan con normalidad.

src/components/shared/Navbar.tsx    YA HECHO — no lo toques
src/components/shared/Footer.tsx    YA HECHO — no lo toques
```

Si tu sección necesita un primitivo nuevo que claramente usarán otras (no es tu caso salvo que
lo digas), **no lo crees en `ui/`**: hazlo dentro de tu carpeta y anótalo en tu respuesta.

---

## 5. Requisito obligatorio: `data-section`

El elemento raíz de tu sección **debe** llevar `data-section="<nombre>"` con el nombre exacto que
te indiquen. El comparador visual mide los bbox por ese atributo; sin él tu sección no se puntúa.

```tsx
<section data-section="projects" className="...">
```

---

## 6. Reglas de propiedad de archivos

Escribe **solo** dentro de tu carpeta asignada. NO toques:

- `src/app/globals.css` · `src/lib/*` · `next.config.ts` · `src/app/layout.tsx` · ningún `page.tsx`
- `src/components/shared/` ni `src/components/ui/`
- las carpetas de otros builders

Si necesitas un token nuevo en `@theme` o un cambio en `home-data.ts`, **no lo hagas**: dilo en tu
respuesta final y el orchestrator lo aplica.

Puedes crear scripts temporales tuyos con prefijo `scripts/tmp-<tusección>-*.ts` (ejecútalos con
`pnpm exec tsx`). Bórralos al terminar.

---

## 7. Cómo verificar tu trabajo

1. `pnpm exec tsc --noEmit` debe pasar limpio (ignora el error de `.next/types/validator.ts`).
2. El dev server recompila solo. Tu sección aún no está en la página — el orchestrator la monta
   al final. Para verla, crea una página temporal tuya en `src/app/(dev)/tu-seccion/page.tsx`,
   míralas con Playwright, y **bórrala al terminar**.
3. Para comparar contra la referencia: recorta tu render y el PNG de referencia por el bbox de tu
   sección y míralos lado a lado. Hay utilidades en `scripts/capture-clean.ts` y
   `scripts/capture-stitch.ts` (**llama a `installNameShim(page)` antes de navegar** o los
   `page.evaluate` fallan por el helper `__name` de tsx).

---

## 8. Qué devolver

Un JSON al final de tu respuesta:

```json
{
  "files": ["src/components/home/X.tsx"],
  "dataSection": "x",
  "clientComponents": ["cuáles y por qué"],
  "motionImplemented": ["qué animaciones de motion.json cubriste"],
  "needsFromOrchestrator": ["tokens/datos/assets que te faltaron"],
  "openQuestions": ["dudas que anotaste en vez de inventar"]
}
```

**Fidelidad por encima de velocidad.** Si el original tiene un detalle raro (un radio asimétrico,
un offset de 246px, una errata en el copy), replícalo. No lo "mejores".
