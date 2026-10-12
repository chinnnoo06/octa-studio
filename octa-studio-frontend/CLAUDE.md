@AGENTS.md

# Octa Building Studio · frontend

Sitio público y panel de administración de Octa Building Studio (diseño,
fabricación y montaje de stands). Next.js 16 + React 19 + Tailwind v4, con un
backend Express en `../octa-studio-backend` (puerto 4000 en local).

**Esto es un proyecto en marcha, no un generador.** Itera sobre lo que existe:
ajusta una sección, cambia textos, conecta datos. No regeneres páginas desde
cero salvo que te lo pidan.

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

## Dónde está cada cosa

```
src/
  app/
    layout.tsx             fuentes, metadata global, providers
    globals.css            @theme: colores, fuentes y easing (no hay tailwind.config)
    (public)/              páginas públicas; la page hace el fetch y pasa props
    admin/                 panel: login y dashboard (blogs, proyectos, testimonios)
    api/admin/             route handler: sube imágenes del editor al backend
  components/
    admin/                 todo el panel, pensado para copiarse a otras apps
      auth/ layout/ ui/    login, sidebar/headers del panel, botones, form, tabla y modal (genéricos)
      dashboard/           lo propio de esta app: home/ (métricas) y forms/tablas por entidad
    ui/ sections/          primitivos, header/footer públicos, secciones compartidas
    home/ aboutUs/ services/ contact/ legal/   secciones de cada página
    blogs/ projects/ testimonials/             tarjetas y fichas públicas
  services/server/         fetch al backend (Data Cache por tag)
  actions/                 Server Actions del panel (updateTag)
  schemas/                 Zod: respuestas y formularios
  utils/admin/             helpers solo del panel: gráficas, métricas, filtros y query de listados
  utils/data/              copy de las secciones todavía estáticas (admin.ts: links del sidebar)
```

## Reglas de oro

**Datos del backend con tipos de schema.** Todo componente que pinta blogs,
proyectos o testimonios recibe `TBlog`, `TProject` o `TTestimonial`
(`src/schemas`). Nada de adaptadores hacia los tipos de `utils/data`; esos
quedan solo para secciones aún estáticas.

**Caché por tag, no React Query.** Los fetch públicos llevan
`next: { revalidate: 3600, tags: ['blogs' | 'projects' | 'testimonials'] }`.
Los fetch con `Authorization` van en `no-store`. Cada action del panel llama a
`updateTag` de su entidad. No mezcles `cache: 'no-store'` con `next.revalidate`.

**Las Server Actions no validan el token.** Se llaman desde páginas donde la
sesión ya se verificó. La excepción es el route handler público de
`app/api/admin`, que sí comprueba la cookie porque es una URL abierta.

**Colores y fuentes solo del `@theme`.** `primary` blanco, `secondary` azul,
`thrird` gris claro, `fourth` negro; con opacidades (`text-fourth/75`,
`bg-secondary/15`). Recetas: sección `py-15 lg:py-20`, contenedor
`max-w-[1700px] px-5 lg:px-15`, título `Eyebrow` + `SectionTitle`, lectura
`text-base lg:text-lg`, tarjeta blanca con borde `border-fourth/30`, tarjeta
azul claro sin borde. La última sección antes del footer siempre es blanca.

**Sin `cn()` salvo necesidad.** Las clases condicionales van con plantillas
`${}`.

**Cada carpeta de `components/` agrupa por dominio** y no hay carpetas con un
solo componente.

## Trampas conocidas

- **framer-motion 13:** `whileInView` y `viewport` no existen; compilan y no
  animan. Usa `useInView` o `components/ui/Reveal.tsx`.
- **`Reveal` exige el 30 % en pantalla.** No envuelvas con él bloques más altos
  que la ventana (un artículo): nunca se mostrarían.
- **`.next/types/validator.ts` se queda obsoleto** al renombrar rutas y hace
  fallar `tsc`. Se regenera con `pnpm build`.
- **Windows y `sharp`:** en el backend se lee el archivo a buffer antes de
  convertir, o el archivo queda bloqueado.
- **La plantilla de título de un layout** no alcanza a la `page` de su mismo
  segmento: ahí el título va `absolute`.

## Comprobar que no rompiste nada

```bash
pnpm dev                    # http://localhost:3000 (backend en :4000)
pnpm exec tsc --noEmit
pnpm build
```

## Despliegue

Cada push a `main` despliega en Vercel. El sitio ya es indexable (robots,
sitemap y metadata abiertos); lo único que lo oculta es la contraseña. El SEO
sigue a full-color: `SITE`/`BUSINESS` en `site.ts`, JSON-LD en `components/seo`
y cada page con su `openGraph`/`twitter` sobre `SHARED_OPEN_GRAPH`/`SHARED_TWITTER`.
`public/og-image.jpg` (1200×630) y `public/logo.png` salen del logo de
`assets/media/brand`; `robots.ts`, `sitemap.ts`, `manifest.ts` y `llms.txt/route.ts`
se arman con los datos de `utils/data`. En Render, el backend necesita `PUBLIC_URL`
con su propio origen para normalizar las rutas de las imágenes del blog.
