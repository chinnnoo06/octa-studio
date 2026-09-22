# Octa Building Studio · sitio web

Sitio público y panel de administración de **Octa Building Studio**, empresa de
diseño, fabricación y montaje de stands para ferias, congresos y eventos. Este
repositorio es el frontend; el backend (API REST, subida de imágenes) vive en
`../octa-studio-backend`.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict · Tailwind
CSS v4 (config CSS-first, **no hay `tailwind.config.ts`**) · framer-motion ·
embla-carousel · react-hook-form + Zod · TinyMCE (editor del blog)

## Arranque

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # build de producción
pnpm exec tsc --noEmit
```

Variables de entorno en `.env` (no se versiona):

```
API_URL=http://localhost:4000/api
NEXT_PUBLIC_PROJECTS_IMAGE_URL=http://localhost:4000/files/projects
NEXT_PUBLIC_PROJECTS_VIDEO_URL=http://localhost:4000/files/projects/videos
NEXT_PUBLIC_BLOGS_IMAGE_URL=http://localhost:4000/files/blogs
NEXT_PUBLIC_TESTIMONIALS_IMAGE_URL=http://localhost:4000/files/testimonials
NEXT_PUBLIC_DOMAIN=http://localhost:3000
```

`.env.render` guarda los valores apuntando al backend desplegado en Render.

## Estructura

```
src/
  app/
    layout.tsx             fuentes, metadata global, providers
    globals.css            @theme: colores, fuentes y easing de la marca
    (public)/              home, nosotros, servicios, proyectos, blogs, contacto, legales
    admin/                 panel: login y dashboard (blogs, proyectos, testimonios)
    api/admin/             route handler que sube imágenes del editor al backend
  components/
    ui/                    primitivos: botones, Reveal, SectionTitle, Eyebrow, Pagination…
    layout/                header, footer y sidebar del panel
    sections/              secciones compartidas: BannerLogo, CtaSection, Statement, Faqs…
    home/ aboutUs/ services/ contact/ legal/   secciones propias de cada página
    blogs/ projects/ testimonials/             tarjetas, fichas, formularios y tablas
  services/server/         fetch al backend con Data Cache por tag (blogs, projects, testimonials)
  actions/                 Server Actions del panel; invalidan con updateTag
  schemas/                 Zod: respuestas del backend y formularios
  utils/data/              copy estático de las secciones que aún no vienen del backend
```

## Datos y caché

Blogs, proyectos y testimonios se leen del backend con `fetch` cacheado por
tag (`next: { revalidate: 3600, tags: [...] }`). Toda escritura pasa por una
Server Action del panel que llama a `updateTag`, así que la web pública se
refresca al instante. Los fetch con token (fichas por id del panel) no se
cachean.

Las tarjetas y fichas públicas usan los tipos derivados de los schemas
(`TBlog`, `TProject`, `TTestiomonial`); los tipos de `utils/data` quedan solo
para las secciones todavía estáticas.

## Cosas que hay que saber

- **framer-motion 13 eliminó `whileInView` y `viewport`.** Compilan y no animan
  nada. Usa `useInView` o el envoltorio `components/ui/Reveal.tsx`.
- **`Reveal` muestra el bloque cuando el 30 % entra en pantalla.** No envuelvas
  con él contenido más alto que la ventana (un artículo entero): nunca se
  mostraría.
- **Los fondos de las secciones alternan** blanco / `secondary/15` / foto
  oscura, y la última sección antes del footer siempre es blanca.
- **Despliegue:** cada push a `main` despliega en Vercel. El sitio está tras
  contraseña y con `noindex` hasta que se publique.
