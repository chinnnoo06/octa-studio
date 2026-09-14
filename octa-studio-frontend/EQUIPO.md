# Cómo trabajamos en este repo

Somos dos personas sobre el mismo proyecto. Esta guía existe para que no nos
pisemos. Léela una vez y ya.

---

## Lo primero: arrancar

```bash
git clone https://github.com/alexmenchaca7/octa-studio.git
cd octa-studio
pnpm install
pnpm dev            # http://localhost:3000
```

Necesitas **Node 20.9+** y **pnpm**. Nada más.

---

## Regla número uno: avisa antes de subir

**Nunca hagas `git push` sin decírselo al otro.** Ni tú ni el asistente de IA
que uses. Todo push a `main` **despliega a producción automáticamente**.

Commitear en local, todas las veces que quieras. Publicar, avisando.

Esto también está escrito en `CLAUDE.md`, así que si usas Claude Code se
detendrá y te preguntará antes de publicar nada.

---

## El reparto: quién toca qué

Cada sección de la home tiene **dos archivos propios**. Si tú tocas una sección
y el otro toca otra distinta, git nunca genera conflictos.

| Sección | Su código | Su contenido |
|---|---|---|
| Hero | `src/components/home/hero/` | `src/lib/data/hero.ts` |
| About | `src/components/home/about/` | `src/lib/data/about.ts` |
| Projects | `src/components/home/projects/` | `src/lib/data/projects.ts` |
| Process | `src/components/home/process/` | `src/lib/data/process.ts` |
| Services | `src/components/home/services/` | `src/lib/data/services.ts` |
| Design CTA | `src/components/home/designcta/` | `src/lib/data/designcta.ts` |
| Advantages | `src/components/home/advantages/` | `src/lib/data/advantages.ts` |
| Products | `src/components/home/products/` | `src/lib/data/products.ts` |
| Testimonials | `src/components/home/testimonials/` | `src/lib/data/testimonials.ts` |
| Blogs | `src/components/home/blogs/` | `src/lib/data/blogs.ts` |

### Zona compartida: avisa antes de tocar

Estos archivos afectan a **toda** la web. No es que git falle: es que un cambio
ahí se propaga a todas las secciones.

| Archivo | Qué controla |
|---|---|
| `src/app/globals.css` | Los design tokens: colores, tipografía, spacing |
| `src/components/shared/Navbar.tsx` | La navbar de todas las páginas |
| `src/components/shared/Footer.tsx` | El footer de todas las páginas |
| `src/components/ui/` | Button, Marquee, SectionTitle, Reveal… |
| `src/lib/data/navigation.ts` | Menús y enlaces del footer |
| `src/app/(public)/page.tsx` | El orden de las secciones |

---

## El flujo de trabajo

Una rama por cambio. Nunca directo a `main`.

```bash
git checkout main
git pull                          # empieza siempre desde lo último

git checkout -b hero-textos       # nombre descriptivo
# ...editas...
git add .
git commit -m "Actualizar textos del hero"
git push -u origin hero-textos    # ← avisa antes
```

Vercel genera una **URL de preview de esa rama**. La abres, la revisas, y si
está bien la fusionas a `main` desde GitHub. Ahí sí va a producción.

Nombra las ramas por lo que tocas: `hero-textos`, `colores-marca`,
`services-animacion`.

---

## Antes de cada commit

```bash
pnpm exec tsc --noEmit    # que los tipos estén bien
pnpm build                # que compile
```

Si alguno falla, no subas. Arréglalo o pregunta.

---

## Ver el sitio desplegado

**https://octa-studio-gamma.vercel.app**

Pide usuario y contraseña — están en el chat del equipo, no en el repo.

---

## Cosas que hay que saber sí o sí

### Los design tokens están congelados

Los colores, tamaños de letra y espaciados viven en el bloque `@theme` de
`src/app/globals.css`. Se extrajeron midiendo el sitio original, no a ojo.

**No los cambies para arreglar una sección concreta.** Si un color no cuadra en
un sitio, casi siempre el error está en esa sección, no en el token. Cambiar un
token mueve toda la web a la vez.

Cambiarlos sí es lo correcto cuando quieres **rediseñar la marca entera** — por
ejemplo pasar el amarillo a otro color. Eso es un cambio deliberado y global, y
se avisa antes.

### No escribas tamaños a mano

`text-h2` ya vale 72px en escritorio y 32/28/26px en pantallas menores.
`py-section` ya escala 100→80→60→40. Todo eso se ajusta solo redefiniendo
variables CSS por breakpoint.

Escribir `md:text-[32px]` rompe ese sistema. Usa las utilidades.

### Los breakpoints no son los de Tailwind

Son los del diseño original, y son **max-width**:

```
tab:  ≤991px       land:  ≤767px       mob:  ≤479px
```

Los de Tailwind (`sm:`, `md:`, `lg:`) existen pero son min-width y **no
coinciden**. Usa `tab:`, `land:` y `mob:`.

### framer-motion 13: `whileInView` no existe

Las props `whileInView` y `viewport` se eliminaron en la versión 13.
**Compilan sin error y no animan nada** — falla en silencio y te vuelves loco
buscando el bug.

Usa el envoltorio que ya está hecho:

```tsx
import Reveal from '@/components/ui/Reveal';
import { fadeUp } from '@/lib/motion';

<Reveal variants={fadeUp}>…</Reveal>
```

### Cada sección lleva `data-section`

El elemento raíz de cada sección tiene `data-section="hero"`, `"about"`, etc.
Sirve para el comparador visual automático. **No lo quites.**

---

## Si hay conflicto

Pasa cuando los dos tocamos el mismo archivo. Con el reparto de arriba debería
ser raro.

```bash
git checkout main && git pull
git checkout tu-rama
git merge main            # resuelves aquí, en tu rama
```

Si el conflicto es en la zona compartida, **para y hablamos** antes de resolver
a ciegas.

---

## Contexto del proyecto

Es la réplica visual de un template comercial de Webflow, hecha con un pipeline
propio. En `analysis/` está el estudio del original: geometría, colores,
tipografía y animaciones, todo medido. Si dudas de por qué algo está como está,
la respuesta suele estar ahí.

Por ser réplica de un template de terceros, el sitio va con contraseña y
`noindex`. **No lo publiques abierto ni lo uses como producto.**
