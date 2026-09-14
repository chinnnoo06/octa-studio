@AGENTS.md

# Réplica de Livinor

Clon visual de la homepage de **https://livinor.webflow.io/** (template comercial
de Webflow) sobre Next.js 16 + React 19 + Tailwind v4.

**Esto es un proyecto de edición, no de generación.** La web ya está construida.
Tu trabajo aquí es iterar sobre lo que existe: ajustar una sección, cambiar
textos, afinar animaciones. **No la regeneres desde cero ni vuelvas a crawlear
el sitio original** salvo que te lo pidan explícitamente.

## ⛔ Regla de equipo: nunca hagas git push por tu cuenta

Este repositorio lo trabajan **dos personas a la vez**. Un push cambia lo que
ve el otro y despliega a producción, así que no es una acción reversible sin
coste.

**Antes de `git push`, de `git merge` a `main`, o de abrir/fusionar un PR:
PÁRATE y pregunta.** Aunque te lo hayan pedido de forma genérica ("sube esto",
"ya déjalo listo"), confirma explícitamente qué se va a subir y a qué rama.

Presenta antes:
- qué archivos entran en el commit
- a qué rama va
- si eso dispara despliegue a producción (todo push a `main` lo hace)

Commitear en local está bien sin preguntar. **Publicar, no.**

Lo mismo aplica a: crear ramas remotas, `push --force`, borrar ramas, cambiar
ajustes de Vercel y tocar variables de entorno.

---

## Antes de tocar nada

`analysis/` es la fuente de verdad de por qué cada cosa está como está. Todo se
midió sobre el sitio original, no se estimó a ojo:

| Archivo | Qué contiene |
|---|---|
| `analysis/layout.md` | Geometría exacta de cada sección: grids, gaps, offsets, colapsos responsive |
| `analysis/design.md` | Colores, radios, bordes, variantes de botón e iconos |
| `analysis/typography.md` | Qué nivel tipográfico usa cada texto y cómo escala |
| `analysis/components.md` | El copy literal y la estructura interna de cada sección |
| `analysis/motion.md` + `.json` | Cada animación con sus valores exactos (duración, delay, easing) |
| `references/original/livinor.css` | La hoja de estilos real del sitio original, 245 KB |

Si dudas de un valor, **grepea `references/original/livinor.css`** antes de
inventarlo.

## Dónde está cada cosa

```
src/
  app/
    layout.tsx           Navbar + Footer + fuentes + metadata
    globals.css          @theme: TODOS los design tokens (CONGELADOS)
    (public)/page.tsx    la homepage: importa las secciones en orden
    proxy.ts             puerta de contraseña del despliegue
  components/
    ui/                  primitivos compartidos: Button, Marquee, SectionTitle, Reveal…
    shared/              Navbar y Footer — afectan a TODAS las páginas
    home/<seccion>/      una carpeta por sección de la home
  lib/
    data/<seccion>.ts    el copy y los datos, un archivo por sección
    home-data.ts         barril que reexporta lib/data (no edites aquí)
    motion.ts            variantes de animación
```

## Reglas de oro

**Los design tokens están congelados.** Viven en el bloque `@theme` de
`src/app/globals.css` y se extrajeron de las variables CSS reales del original.
No los cambies para arreglar una sección concreta: si un color no cuadra, casi
siempre el error está en la sección, no en el token. Cambiar un token afecta a
toda la web.

**No hay `tailwind.config.ts`.** Tailwind v4 es CSS-first: la configuración está
en `globals.css`.

**No escribas tamaños ni espaciados a mano.** `text-h2` ya vale 72px en desktop
y 32/28/26px en los cortes inferiores; `py-section` ya escala 100→80→60→40. La
escala se reajusta redefiniendo variables CSS por media query, igual que hacía
Webflow. Escribir `md:text-[32px]` rompe ese sistema.

**Los breakpoints son los de Webflow, no los de Tailwind.** Son **max-width**:

```
tab:   ≤991px      land:  ≤767px      mob:  ≤479px
```

Los de Tailwind (`sm:`, `md:`, `lg:`) existen pero son min-width y **no
coinciden** con los cortes del diseño. Usa `tab:`, `land:` y `mob:`.

**Cada sección lleva `data-section="<nombre>"` en su raíz.** El comparador visual
mide por ese atributo. Si lo quitas, esa sección deja de puntuarse.

## Trampa conocida: framer-motion 13

**Las props `whileInView` y `viewport` ya no existen.** Compilan sin error y
**no animan nada** — falla en silencio. Verificado en `dist/index.d.ts`.

Usa el hook `useInView`, o mejor el envoltorio ya hecho:

```tsx
import Reveal from '@/components/ui/Reveal';
import { fadeUp } from '@/lib/motion';

<Reveal variants={fadeUp}>…</Reveal>
```

`useScroll` y `useTransform` sí funcionan con normalidad.

## Comprobar que no rompiste nada

```bash
pnpm dev                    # http://localhost:3000
pnpm exec tsc --noEmit      # tipos
pnpm build                  # build de producción
```

Y para medir fidelidad contra el original (requiere `pnpm dev` corriendo):

```bash
ITER=1 pnpm exec tsx scripts/compare.ts
```

Recorta por sección usando los `data-section` y compara con pixelmatch. Da dos
números: el crudo y otro que excluye las bandas de marquee — comparar píxeles
sobre un bucle infinito mide en qué fase estaba la captura, no el diseño.

## Estado actual

Fidelidad media por sección (sin contar bandas de marquee): **90.4% desktop ·
80.1% tablet · 75.9% móvil**. Lo más flojo es el responsive móvil y el footer.

`designcta` puntúa bajo por un motivo conocido: la captura de referencia pilló
esa sección a mitad de su animación de escala ligada al scroll. La réplica está
en el estado correcto (`scale: 1`); es la referencia la que está contaminada.

## Despliegue

Cada push a `main` despliega solo a Vercel. El sitio está tras contraseña y con
`noindex` por ser réplica de un template comercial de terceros: no lo publiques
abierto ni lo uses como producto.
