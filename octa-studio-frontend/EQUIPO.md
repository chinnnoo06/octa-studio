# Cómo trabajamos en este repo

Somos dos personas sobre el mismo proyecto. Esta guía existe para que no nos
pisemos. Léela una vez y ya.

---

## Lo primero: arrancar

```bash
git clone https://github.com/alexmenchaca7/octa-studio.git
cd octa-studio/octa-studio-frontend
pnpm install
pnpm dev            # http://localhost:3000
```

Necesitas **Node 20.9+**, **pnpm** y el backend corriendo en el puerto 4000
(`pnpm dev` en `octa-studio-backend`). Copia las variables de `.env` que están
en el README.

---

## Regla número uno: avisa antes de subir

**Nunca hagas `git push` sin decírselo al otro.** Ni tú ni el asistente de IA
que uses. Todo push a `main` **despliega a producción automáticamente**.

Commitear en local, todas las veces que quieras. Publicar, avisando.

Esto también está escrito en `CLAUDE.md`, así que si usas Claude Code se
detendrá y te preguntará antes de publicar nada.

---

## El reparto: quién toca qué

Cada página tiene su carpeta de componentes y, si aún es estática, su archivo
de contenido. Si cada uno toca páginas distintas, git no genera conflictos.

| Página | Su código | Su contenido |
|---|---|---|
| Home | `src/components/home/` | `src/utils/data/{about,advantages,process,services,faqs}.ts` |
| Nosotros | `src/components/aboutUs/` | `src/utils/data/about.ts` |
| Servicios | `src/components/services/` | `src/utils/data/services.ts` |
| Contacto | `src/components/contact/` | `src/utils/data/contact.ts` |
| Legales | `src/components/legal/` | `src/utils/data/credits.ts` |
| Proyectos | `src/components/projects/` | backend |
| Blog | `src/components/blogs/` | backend (`BLOG_CATEGORIES` en `utils/data/blogs.ts`) |
| Testimonios | `src/components/testimonials/` | backend |

### Zona compartida: avisa antes de tocar

Estos archivos afectan a **toda** la web.

| Archivo | Qué controla |
|---|---|
| `src/app/globals.css` | Colores, fuentes y easing de la marca |
| `src/components/ui/layout/` | Header, footer y sidebar del panel |
| `src/components/ui/` | Botones, Reveal, SectionTitle, Eyebrow, Pagination… |
| `src/components/sections/` | BannerLogo, CtaSection, Statement, Faqs, BrandMarquee |
| `src/utils/data/navigation.ts` | Menús y enlaces del footer |
| `src/services/` y `src/actions/` | Fetch al backend, caché y Server Actions |
| `src/schemas/` | Validación de formularios y respuestas |

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

### Los colores y fuentes viven en `globals.css`

Están en el bloque `@theme`: `primary` (blanco), `secondary` (azul de marca),
`thrird` (gris claro), `fourth` (negro) y las dos fuentes. No inventes colores
en las secciones; usa esos con sus opacidades (`text-fourth/75`,
`bg-secondary/15`).

### Recetas que se repiten

- Marco de sección: `py-20 lg:py-25`, contenedor `max-w-[1700px] px-5 lg:px-15`.
- Título de sección: `Eyebrow` en Gentleman + `SectionTitle`.
- Texto de lectura: `text-fourth/75 text-base lg:text-lg`; texto de tarjeta:
  `text-sm lg:text-base`.
- Tarjeta blanca con borde `border-fourth/30`; tarjeta azul claro
  `bg-secondary/15` sin borde.
- Fondos: nunca gris ni oscuro justo antes del footer.

### framer-motion 13: `whileInView` no existe

Compila sin error y no anima nada. Usa el envoltorio que ya está hecho:

```tsx
import { Reveal } from '@/components/ui/Reveal';
<Reveal>…</Reveal>
```

Y no envuelvas con `Reveal` bloques más altos que la pantalla.

### El contenido del blog

Se escribe en TinyMCE desde el panel. El backend guarda HTML saneado (sin
estilos) y `BlogContent` le pone el aspecto de la web. Las imágenes del
contenido se suben al insertarlas; las que sobran se limpian solas.

---

## Si hay conflicto

```bash
git checkout main && git pull
git checkout tu-rama
git merge main            # resuelves aquí, en tu rama
```

Si el conflicto es en la zona compartida, **para y hablamos** antes de resolver
a ciegas.
