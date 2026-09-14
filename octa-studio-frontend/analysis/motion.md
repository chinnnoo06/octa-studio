# motion.md — Análisis de movimiento de https://livinor.webflow.io/ (homepage)

> **Fuentes usadas (todo medido, nada estimado a ojo):**
> 1. **La configuración IX2 completa**, extraída del bundle `webflow.a4a541eb.db1cca34483be52e.js` → `Webflow.require("ix2").init({...})` = **520 eventos + 86 actionLists** con duraciones, delays, easings y valores exactos.
> 2. El **CSS original** (`livinor.webflow.shared.b013c6ece.css`, 245 KB sin minificar).
> 3. El `<style>` inline nº2 del `dom.html` (70 reglas `html.w-mod-js:not(.w-mod-ix)`) = **estado inicial de cada animación por media-query**.
> 4. **Medición en vivo con Playwright** (`scripts/tmp-motion-hover.ts` → `scripts/tmp-motion-live.json`): geometría, velocidades reales de los marquees, hover states con ratón real, navbar al hacer scroll, menú móvil a 375 px y megamenú abierto.

---

## 0. Tres correcciones al briefing

Antes de nada, tres cosas del briefing que la evidencia contradice. Son importantes porque cambian la implementación:

| Briefing dice | Realidad medida |
|---|---|
| "reveal de texto **palabra a palabra**, gris → negro" en `about`/`services` | **No hay cambio de color de texto.** El `<h3 class="h4">` ya es negro. Encima hay **8 barras grises** (`.line-color.one…eight`, `#8e8e8e`, 50 px de alto) con `mix-blend-mode: lighten` que lo tapan, y **cada barra se desliza a la derecha** (`translateX 0% → 100%`) según el scroll. Es un **wipe línea a línea**, no palabra a palabra. Y **solo existe en ≥992 px** (`.text-color-box { display:none }` en `@media (max-width:991px)`). |
| "Badge rotatorio con **texto circular** 'DESIGNS STARK DESIGNS'" en `advantages` | Son **dos animaciones independientes superpuestas**: (a) un **anillo de puntos SVG que rota** 360° cada 10 s, y (b) un **rotador vertical de texto tipo slot machine** con 5 etiquetas ("Bold / Stark / Nexo / Prime / Aura Designs"). Lo que se ve en el screenshot ("DESIGNS / STARK / DESIGNS") es el rotador **congelado a mitad de recorrido**. **No hay texto en círculo en ningún sitio.** |
| "clase `rotate` ×8 → badge rotatorio" | `.h6.rotate` es simplemente `transform: rotate(90deg)` = el **título vertical** de las tarjetas de proyecto (nombre + año en la barra lateral izquierda). No rota nada. |

Y una confirmación importante: la clase `.h2-title-counter` (la palabra repetida ×3) **sí** es un rotador vertical, pero la 3ª copia lleva `.color` → **el estado final es la palabra en gris**, no en negro.

---

## 1. Marquees / loops infinitos

Los 4 marquees son **animaciones IX2 con `loop: true`**, no CSS. Webflow los implementa como: `grupo0` (posición inicial) → `grupo1` (recorrido larguísimo, 40–100 s) → `grupo2` (`duration: 0` → **reset instantáneo**). Es decir, **el original tiene un salto visible al final de cada ciclo**. Para la réplica vamos a hacer el loop *seamless* respetando la **velocidad exacta en px/s** que he medido; visualmente será igual (mejor, de hecho) y no habrá diferencia perceptible para el comparator.

### Medición de velocidad (2 muestras separadas 3.02 s, viewport 1440)

| Marquee | Δx medido | px/s medido | Spec IX2 | Dirección |
|---|---|---|---|---|
| `hero-slider` (hijos `.cover-image-wrap.hero`) | −165.3 px | **54.7** | 609 % × 360 px / 40 s = 54.81 | ← izquierda |
| `top-slider` | −273.0 px | **90.4** | 617 % × 1320 px / 90 s = 90.49 | ← izquierda |
| `bottom-slider` | +219.9 px | **72.8** | 497 % × 1320 px / 90 s = 72.89 | → derecha |
| `design-slider` | +208.8 px | **69.1** | 290 % × 2386 px / 100 s = 69.19 | → derecha |
| anillo de puntos | +108.6° | **35.95 °/s** | 360° / 10 s | horario |

> Nota clave: en Webflow un `TRANSFORM_MOVE` con unidad `%` es **porcentaje del ancho del propio elemento**, no del contenedor. Verificado: `.top-slider` medía `matrix(…, -752.4, 0)` = exactamente −57 % × 1320.

### 1.1 `hero-slider` — tira de fotos de interiores (hero, y≈550)

- **Contenido:** 3 fotos únicas (`Decorated home`, `Well decorated home`, `modern office with chair and table`) **repetidas ×3 = 9 items**. Sí hay duplicación.
- **Geometría desktop:** contenedor `690×422`, `border: 10px solid #fff`, `radius 10px`, `overflow: hidden` → ventana interior **670 px**. Cada item `.cover-image-wrap.hero`: **360×402**, `border: 6px solid #fff`, `radius 10px`. **Gap 0**.
- **Responsive:** gap `6px` @≤991, `4px` @≤767 (medido 4 px a 375). Ancho del item: 360 → 250 → 150 → 120–180.
- **Pausa en hover:** **no**.
- **IX2 (`a-28 "Hero Slider"`):** `translateX 0% → −609%` en 40 000 ms, reset a 0.

**Implementación recomendada** — CSS puro, un `<div>` track con **2 juegos de 3 imágenes** (6 items) y desplazamiento de exactamente **1 juego = 1080 px** (3 × 360, gap 0):

```css
/* globals.css */
@keyframes marquee-x {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(var(--marquee-shift), 0, 0); }
}
.marquee-track {
  display: flex;
  width: max-content;
  will-change: transform;
  animation: marquee-x var(--marquee-duration) linear infinite;
}
```

```tsx
// src/components/home/HeroSlider.tsx  (Client Component)
const HERO_IMAGES = [decoratedHome, wellDecoratedHome, modernOffice];

export function HeroSlider() {
  return (
    <div className="w-[690px] max-w-full overflow-hidden rounded-[10px] border-[10px] border-white">
      <div
        className="marquee-track"
        style={{
          // 3 imgs × 360px = 1080px | 1080 / 54.8 px·s⁻¹ = 19.7s
          ['--marquee-shift' as string]: '-1080px',
          ['--marquee-duration' as string]: '19.7s',
        }}
      >
        {[...HERO_IMAGES, ...HERO_IMAGES].map((src, i) => (
          <div key={i} className="min-w-[360px] max-w-[360px] overflow-hidden rounded-[10px] border-[6px] border-white">
            <Image src={src} alt="" width={360} height={402} className="h-[390px] w-full object-cover" priority={i < 3} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

Para móvil basta con recalcular las dos variables en un `@media` (a 375 px: set = 3 × (120 + 4) = 372 px, velocidad 18.3 px/s → **20.3 s**).

### 1.2 `top-slider` + `bottom-slider` — marquee de texto gigante 2 filas (services, y≈6986)

- **Contenido:** ambos repiten el mismo set: `◇ Renovation ◇ Planning ◇ Styling` donde `◇` es el icono Livinor de **110×110** y el texto es `<h3 class="h1">` (Sora, **96 px**).
- **Estructura:** `.services-bottom-slider` (flex column, `row-gap: 12px`) contiene `.top-slider` y `.bottom-slider`. Cada uno contiene N × `.services-slider.top|bottom`, y cada set contiene 3 × `.slider-box` (icono + texto).
- **Sets:** top = **5**, bottom = **4**.
- **Anchos medidos:** set = **2146 px** (`Renovation` 821 + `Planning` 692 + `Styling` 572, con `gap: 30px` en todos los niveles). **Pitch de set = 2176 px** (2146 + gap 30).
- **Direcciones opuestas confirmadas:** top ← izquierda (90.4 px/s), bottom → derecha (72.8 px/s). El `bottom-slider` tiene además `justify-content: flex-end` (arranca alineado a la derecha).
- **Pausa en hover:** **no**.
- **IX2 (`a-80 "Slider Animation"`):** top `−57% → −674%` de 1320 px en 90 000 ms; bottom `0% → +497%` de 1320 px en 90 000 ms.

**Implementación:** el mismo `.marquee-track`, con la fila inferior invertida con `animation-direction: reverse` (o `--marquee-shift` positivo partiendo de `-2176px`):

```tsx
const SET = ['Renovation', 'Planning', 'Styling'];

function MarqueeRow({ dir, durationSec }: { dir: 'left' | 'right'; durationSec: number }) {
  return (
    <div className="overflow-hidden">
      <div
        className="marquee-track items-center gap-[30px]"
        style={{
          ['--marquee-shift' as string]: '-2176px',
          ['--marquee-duration' as string]: `${durationSec}s`,
          animationDirection: dir === 'right' ? 'reverse' : 'normal',
        }}
      >
        {Array.from({ length: 4 }).flatMap((_, s) =>
          SET.map((w) => (
            <div key={`${s}-${w}`} className="flex shrink-0 items-center gap-[30px]">
              <LivinorDiamond className="h-[110px] w-[110px]" />
              <h3 className="whitespace-nowrap font-heading text-[96px] leading-[112%]">{w}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// uso
<div className="flex flex-col gap-[12px]">
  <MarqueeRow dir="left"  durationSec={24.05} />   {/* 2176 / 90.5  */}
  <MarqueeRow dir="right" durationSec={29.85} />   {/* 2176 / 72.9  */}
</div>
```

> Renderiza **4 sets** por fila (no 5/4 como el original): con el track duplicado 4× cubres 1320 px de ventana con margen de sobra y el loop es exacto.

### 1.3 `design-slider` — marquee de ofertas (justo debajo del CTA, `section.no-padding`)

- **Contenido:** 3 ofertas, cada una en un `.design-slider-box` = `✦  texto  ✦` (dos `.slider-icon` de 17 px flanqueando un `<h2 class="h6 no-wrap">` de 24 px, `gap: 20px` interno):
  1. `10% Off This Month` — 343 px
  2. `Free Space Planning` — 364 px
  3. `20% Off First Consultation` — 461 px
- **Estructura:** `.design-slider-layout` (1320×31, `gap: 8px`, `justify-content: flex-end`) contiene **4 × `.design-slider`**, y cada uno contiene las 3 ofertas **×2 = 6 cajas** (2386 px, `gap: 10px`).
- **Dirección:** → derecha, **69.1 px/s**. Los "+ +" del briefing son en realidad los dos iconos `✦` que separan cada oferta.
- **Pitch de una vuelta de 3 ofertas:** 343 + 364 + 461 + 3×10 = **1178 px** → **17.03 s**.
- **IX2 (`a-37 "Design Slider"`):** `0% → +290%` de 2386 px en 100 000 ms.

```tsx
const OFFERS = ['20% Off First Consultation', '10% Off This Month', 'Free Space Planning'];
// track con 4 repeticiones, shift -1178px, animation-direction: reverse, duration 17.03s
```

---

## 2. Carrusel real — `testimonial-slider` (y≈11478)

Todo verificado leyendo los atributos Webflow **y** clicando la flecha en vivo.

```
data-animation="slide"   data-autoplay="false"   data-delay="4000"
data-duration="500"      data-easing="ease"      data-infinite="true"
data-disable-swipe="false"  data-hide-arrows="false"  data-nav-spacing="3"
```

- **Slides reales: 4** (Ethan Miller / Jashon / Noah Mike / Ali Hamja). Cada slide mide **1320 px = ancho completo de la máscara** → **1 slide visible, gap 0**.
- **Autoplay: NO.** `data-autoplay="false"`, y lo comprobé en vivo: tras 6 s sin tocar nada el dot activo seguía en el mismo índice y el `transform` no cambió. El `data-delay="4000"` es ruido.
- **Loop: SÍ** (`data-infinite="true"`).
- **Flechas: SÍ.** Al hacer click, los slides pasan de `translateX(0)` a `translateX(-1320px)` — desplazamiento de 1 slide, 500 ms, `ease`.
- **Dots: NO se ven nunca.** Los 4 `.w-slider-dot` existen en el DOM, pero `.slide-nav { display: none; }` está en el **CSS base** (no en un media query). Confirmado en vivo a 1440 px: `display: "none"`, `w: 0, h: 0`. El crop `08-testimonials.png` lo confirma visualmente: solo se ven las dos flechas.

**Aspecto de las flechas** (medido):

| | desktop | ≤991 | ≤767 | ≤479 |
|---|---|---|---|---|
| tamaño | 60×60 | 50×50 | 40×40 | 30×30 |
| radius izq / der | 10px / 12px | — | — | 6px |
| posición | `left:0` / `right:0`, centradas verticalmente sobre la tarjeta | | `top:20%` | `top:100%` (bajo la tarjeta) |

Fondo **transparente**, `border: 3px solid #fff`, chevron blanco de `25×30`. (Sí, el original tiene radius 10 en la izquierda y 12 en la derecha — es un descuido del template; replícalo tal cual para el pixel-diff.)

**Implementación con embla:**

```tsx
'use client';
import useEmblaCarousel from 'embla-carousel-react';

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: 'start',
    duration: 25,          // ≈ 420-500ms, equivale a data-duration="500"
    containScroll: false,
    slidesToScroll: 1,
    // ¡SIN plugin de autoplay! el original no lo tiene
  });

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((t) => (
            <div key={t.name} className="min-w-0 flex-[0_0_100%]">
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>
      </div>

      <button
        aria-label="previous slide"
        onClick={() => embla?.scrollPrev()}
        className="absolute left-0 top-1/2 flex h-[60px] w-[60px] -translate-y-1/2 items-center justify-center rounded-[10px] border-[3px] border-white text-white"
      >
        <ChevronLeft className="h-[30px] w-[25px]" strokeWidth={2} />
      </button>
      <button
        aria-label="next slide"
        onClick={() => embla?.scrollNext()}
        className="absolute right-0 top-1/2 flex h-[60px] w-[60px] -translate-y-1/2 items-center justify-center rounded-[12px] border-[3px] border-white text-white"
      >
        <ChevronRight className="h-[30px] w-[25px]" strokeWidth={2} />
      </button>
    </div>
  );
}
```

Contenido de cada slide (`.testimonial-slider`, flex column, `gap: 80px` = `--_gap---layout`, `align-items: center`): 5 estrellas amarillas → párrafo blanco centrado → avatar (`.cover-image-wrap.testimonial`, max-width 260 px, img 190 px de alto) → `h6` blanco con el nombre → `.paragraph.yellow` con el rol.

---

## 3. Rotador de texto de los títulos de sección

`OUR FEATURED work` · `WHY CHOOSE us` · `EXPLORE OUR Collection` · `DESIGN Insights`

**Markup real:**

```html
<div class="h2-section-title">           <!-- flex, gap 10px -->
  <h2 class="h2 tab-center">Design</h2>  <!-- primera parte, negra, fija -->
  <div class="h2-counter-wrap">          <!-- height: 85px; overflow: hidden -->
    <div class="h2-title-counter">       <!-- flex column, align center, height 246px -->
      <h2 class="h2 tab-center">Insights</h2>
      <h2 class="h2 tab-center">Insights</h2>
      <h2 class="h2 tab-center color">Insights</h2>   <!-- .color = #8e8e8e -->
    </div>
  </div>
</div>
```

**Mecánica:** sí, es un **scroll vertical tipo slot machine**, pero con un truco: las 3 copias son la **misma palabra**; solo la última es gris. El track sube exactamente **2 posiciones y se queda ahí**. Efecto: la palabra "rueda" dos veces y **aterriza en gris** — que es el estado final que se ve en el screenshot.

**Números medidos:**

| | valor |
|---|---|
| altura del contenedor `.h2-counter-wrap` | **85 px** desktop · 36 · 30 · 28 px en breakpoints |
| altura del track `.h2-title-counter` | **246.2 px** (3 × 82.07) |
| recorrido IX2 (`a-92`) | `translateY 0% → −66%` del track ≡ **−2/3 ≡ exactamente 2 items** |
| duración | **1000 ms** |
| delay | **1000 ms** (el grupo previo añade otros ~500 ms → sensación de ~1.5 s) |
| easing | `ease` por defecto de Webflow → `cubic-bezier(.25,.1,.25,1)` |
| trigger | `SCROLL_INTO_VIEW`, offset 0 %, **`loop: false`** (una sola vez) |

```tsx
'use client';
import { motion } from 'framer-motion';

export function SectionTitleRotator({ first, second }: { first: string; second: string }) {
  return (
    <div className="flex items-center justify-center gap-[10px]">
      <h2 className="font-heading text-[72px] leading-[114%]">{first}</h2>
      <div className="h-[85px] overflow-hidden max-md:h-[36px] max-sm:h-[30px]">
        <motion.div
          className="flex flex-col items-center"
          initial={{ y: 0 }}
          whileInView={{ y: '-66.666%' }}
          viewport={{ once: true, amount: 0 }}
          transition={{ delay: 1, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="font-heading text-[72px] leading-[114%]">{second}</h2>
          <h2 className="font-heading text-[72px] leading-[114%]">{second}</h2>
          <h2 className="font-heading text-[72px] leading-[114%] text-[#8e8e8e]">{second}</h2>
        </motion.div>
      </div>
    </div>
  );
}
```

> Usa `-66.666%` (no `-66%`): el original redondea, pero 2/3 exacto alinea la 3ª palabra perfectamente en la ventana.

---

## 4. "Reveal de texto" en `about` y `services` — en realidad un **wipe de líneas**

Este es el hallazgo que más cambia respecto al briefing.

```html
<div class="about-us-text-wrap">                    <!-- position: relative; overflow: hidden -->
  <h3 class="h4">From homes to offices, we bring your vision to life. Our results speak for themselves</h3>
  <div class="text-color-box">                      <!-- position:absolute; inset:0; mix-blend-mode: lighten -->
    <div class="line-color one"></div>              <!-- background:#8e8e8e; height:50px -->
    <div class="line-color two"></div>
    … hasta .eight
  </div>
</div>
```

- El `<h3>` **ya está en negro**. Las 8 barras grises lo cubren; con `mix-blend-mode: lighten`, gris (142,142,142) sobre negro (0,0,0) da gris, y sobre el fondo crema (254,248,240) no hace nada. Resultado visual: **texto gris donde hay barra, negro donde no**.
- Cada barra se desliza **`translateX 0% → 100%`** conforme haces scroll, **de arriba abajo**, una a una.

**Rango de scroll (`a-38 "Text Color Change While Scrolling"`, `SCROLLING_IN_VIEW`, `smoothing: 90`, `startsEntering: true`):**

| progreso | acción |
|---|---|
| 20 % | `.one` empieza (x = 0 %) |
| 25 % | `.one` → 100 %, `.two` empieza |
| 30 % | `.two` → 100 %, `.three` empieza |
| 35 % | `.three` → 100 %, `.four` empieza |
| … | ventanas de **5 %** cada una |
| 60 % | `.eight` → 100 % (fin) |

**Es **carácter/palabra**? Ninguna de las dos: es **línea a línea**.** Además:

- `about`: `.about-us-text-wrap` mide **630 × 192** = **4 líneas visibles** (h4 40 px, `line-height: 120%` → 48 px). Solo las barras `.one`…`.four` llegan a verse; las otras 4 quedan fuera del `overflow: hidden`.
- `services`: mide **896 × 144** = **3 líneas**. Texto: *"From interiors to lighting, we craft spaces that reflect your personality and purpose"*.
- **Solo desktop:** `@media (max-width:991px) { .text-color-box { display: none } }`, y el evento IX2 tiene `mediaQueries: ["main"]`. Verificado en vivo a 375 px: `display: "none"`.

**Implementación con `useScroll` + `useTransform`:**

```tsx
'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const LINES = 8;

export function LineWipeHeading({ text, lines }: { text: string; lines: number }) {
  const ref = useRef<HTMLDivElement>(null);
  // "startsEntering" de Webflow ≈ desde que el elemento entra por abajo hasta que sale por arriba
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // smoothing: 90 → suavizado fuerte
  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 25, mass: 0.6 });

  return (
    <div ref={ref} className="relative overflow-hidden">
      <h3 className="font-heading text-[40px] leading-[120%] text-black">{text}</h3>

      {/* solo desktop */}
      <div className="pointer-events-none absolute inset-0 hidden mix-blend-lighten lg:block">
        {Array.from({ length: LINES }).map((_, i) => {
          const start = 0.20 + i * 0.05;   // .one arranca en 20%
          const end = start + 0.05;        // ventana de 5%
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const x = useTransform(p, [start, end], ['0%', '100%'], { clamp: true });
          return <motion.div key={i} style={{ x }} className="h-[50px] w-full bg-[#8e8e8e]" />;
        })}
      </div>
    </div>
  );
}
```

> `useTransform` dentro de un `.map` viola las reglas de hooks si `LINES` fuese variable — aquí es una constante literal (8), así que es seguro; aun así, lo más limpio es extraer un `<WipeBar index={i} progress={p} />` como componente hijo. **Hazlo así en el build final.**

---

## 5. Badge de `advantages` — anillo de puntos + slot machine vertical

Son **dos animaciones separadas** dentro de la tarjeta blanca `.choice-left-top` (250×300, `border: 1px solid #dbdbdb`, `radius: 10px`).

### 5.1 Anillo de puntos (`a-57 "Dot Rotation"`)

- `<img class="cover-image dot" src="Dot Image.svg">` de **205×205** (180 @≤991, 150 @≤767).
- `rotateZ 0° → 360°` en **10 000 ms**, `loop: true`, sentido **horario**. Medido en vivo: **35.95 °/s** → 10.01 s por vuelta. ✔
- El SVG ya trae los puntos con opacidades escalonadas (por eso parece un spinner). No hay que animar los puntos individualmente.

### 5.2 Rotador de texto (`a-85 "Advantages Text Change Animation"`)

- `.bold-text-wrap`: **115 × 60 px**, `position: absolute`, `margin: auto` (centrado), `overflow: hidden`. Altura 54 / 50 / 49 px en breakpoints.
- 5 hijos `.bold-text`, cada uno un `<h3 class="h6 center">` que **envuelve a 2 líneas** (24 px, `line-height: 130%` = 31.2 px → item de **62.4 px**). Track = **312 px**.
- Palabras: **Bold Designs · Stark Designs · Nexo Designs · Prime Designs · Aura Designs**.
- `translateY 0% → −400%` de la altura del propio item (**−249.6 px = 4 items**) en **10 000 ms**, `loop: true`, reset instantáneo. Movimiento **continuo** (el DOM capturado lo pilló en −117.99 %, entre el item 2 y el 3 — de ahí el "DESIGNS / STARK / DESIGNS" del screenshot).

```tsx
const LABELS = ['Bold Designs', 'Stark Designs', 'Nexo Designs', 'Prime Designs', 'Aura Designs'];

export function BrandBadge() {
  return (
    <div className="relative flex items-center justify-center rounded-[10px] border border-[#dbdbdb] bg-white px-5 py-10">
      {/* anillo */}
      <img src="/images/pages/home/dot-ring.svg" alt="" aria-hidden
           className="h-[205px] w-[205px] animate-[spin_10s_linear_infinite]" />
      {/* slot machine */}
      <div className="absolute left-0 right-0 mx-auto h-[60px] w-[115px] overflow-hidden">
        <div className="flex flex-col items-center animate-[slot_12.5s_linear_infinite]">
          {[...LABELS, ...LABELS].map((l, i) => (
            <h3 key={i} className="h-[62.4px] text-center font-heading text-[24px] leading-[130%]">{l}</h3>
          ))}
        </div>
      </div>
    </div>
  );
}
```

```css
@keyframes slot { from { transform: translate3d(0,0,0); } to { transform: translate3d(0,-50%,0); } }
```

> Duplicando la lista (10 items = 624 px) y animando `-50%` (= 312 px = 5 items) el loop es **seamless**, a diferencia del original. Duración: 5 items a la misma velocidad que 4 items en 10 s → **12.5 s**.

---

## 6. Entradas por scroll, sección a sección

De los 238 `data-w-id` del HTML crudo, el DOM renderizado tiene **168 elementos únicos**, de los cuales **120 tienen al menos un evento IX2**. Webflow los reparte entre **3 presets** y **6 animaciones a medida**.

### Los 3 presets (representan el 90 % de las entradas)

| preset | de | a | duración | easing | delay | umbral |
|---|---|---|---|---|---|---|
| `fadeIn` (27 eventos) | `opacity: 0` | `opacity: 1` | 1000 ms | `outQuart` = `cubic-bezier(.165,.84,.44,1)` | 200 ms (300 en el hero) | 0 % |
| `slideInBottom` (130 eventos) | `opacity:0, y:100px` | `opacity:1, y:0` | 1000 ms | `outQuart` | 200 ms | **20 %** |
| `growIn` | `opacity:0, scale:.75` | `opacity:1, scale:1` | 1000 ms | `outQuart` | 200 ms | 20 % — **solo ≤767 px** |

### Patrón dominante por sección

| Sección | `data-w-id` | Patrón dominante | Detalle |
|---|---|---|---|
| **hero** (32) | fadeIn | **fade puro** | `.hero-text-wrap` (delay 200) + `.top-right-box` (delay 300). El resto de los 32 son links de navbar/megamenú (hover, no entrada). |
| **about** (10) | fadeIn + wipe + odometer | fade en `.cover-image-wrap.about-us` y `.about-us-right`; wipe de líneas en el h4; 4 contadores odométricos |
| **projects** (25) | **slideInBottom** | `.home-projects-heading`, `.right-heading-wrap` y las **4 `.project-card`** suben 100 px con fade. Los otros 20 son hover (`a-11/a-41/a-42` × 4 tarjetas). |
| **process** (11) | fadeIn + **pop-in escalonado** | 11 elementos con `fadeIn`, y encima `a-63` orquesta los 5 pasos |
| **services** (17) | fade + slide secuencial | `a-79`: primero la imagen (400 ms), luego las 3 tarjetas (`y: 50% → 0`, `swingFromTo`) |
| **designcta** (3) | **scale-on-scroll** | `a-84`: la sección entera va de `scale(0.5)` a `scale(1)` ligada al scroll |
| **advantages** (16) | **slideInBottom** (7 celdas del bento) + 3 loops | + rotación del anillo, rotación de la estrella, slide-in de las 3 fotos de esquina |
| **products** (6) | slideInBottom | título + 3 tarjetas |
| **testimonials** | fadeIn | la sección entera |
| **blogs** | slideInBottom | título + 2 `.blogs-big-box` + 2 `.blogs-mini-box` |
| **footer** | fadeIn | 5 bloques |

### Estado inicial que Webflow inyecta (el `<style>` inline nº2 — la prueba definitiva)

Solo aplica a `@media (min-width: 992px)` salvo lo indicado:

```
.process-heading            → opacity:0
.process-content-wrap       → opacity:0
.process-top/center/bottom-wrap → opacity:0
.process-element.one        → opacity:0
.process-element.two        → opacity:0; translate3d( 50%,-100%,0) scale3d(.3,.3,1)
.process-element.three      → opacity:0; translate3d(-50%,-100%,0) scale3d(.3,.3,1)
.process-element.four/.five → opacity:0; translate3d(  0 ,-100%,0) scale3d(.3,.3,1)
.choice-left-top / -bottom / .center-logo-wrap / .center-bottom-wrap / .right-top-box / .right-bottom-wrap → opacity:0
.cover-image-wrap.corner-one   → translate3d(250%,0,0)
.cover-image-wrap.corner-two   → translate3d(150%,0,0)
.cover-image-wrap.corner-three → translate3d(140%,0,0)
.project-mouse-move-element    → scale3d(0,0,1)
.arrow-div.white               → translate3d(-105%,0,0) scale3d(.75,.75,1); opacity:0
.services-left-heading / .services-content-wrap → opacity:0   (también @max-width:479px)
```

### Animaciones de entrada a medida

**`a-63` — Process Box Appear** (desktop, umbral 20 %): grupos **secuenciales**. Paso 1 aparece (opacity 0→1); luego cada paso siguiente espera **500 ms** y entra en **200 ms** con `opacity 0→1`, `scale .3→1`, `translate(x,−100%) → (0,0)`. Los pasos 2 y 3 además llegan desde ±50 % en X. Efecto: los 5 recuadros **caen desde arriba encogidos**, en cascada.

```tsx
const stepVariants = {
  hidden: (i: number) => ({ opacity: 0, scale: 0.3, x: i === 1 ? '50%' : i === 2 ? '-50%' : '0%', y: '-100%' }),
  show:  { opacity: 1, scale: 1, x: 0, y: 0 },
};
// <motion.div custom={i} variants={stepVariants} initial="hidden" whileInView="show"
//   viewport={{ once: true, amount: 0.2 }}
//   transition={{ delay: 0.5 + i * 0.7, duration: 0.25, ease: [0.25,0.1,0.25,1] }} />
```

**`a-79` — Service Section Animation** (umbral 20 %): `.cover-image.services` `opacity 0→1` en 400 ms; **después** `.service-collection-list.home` `opacity 0→1` + `y: 50% → 0` en 500 ms con `swingFromTo` = `cubic-bezier(.68,-.55,.265,1.55)` (rebote).

**`a-84` — Design Scroll Animation** (`SCROLLING_IN_VIEW`, desktop, `smoothing: 85`): `section.section.design` va de `scale(0.5)` a `scale(1)` entre el **0 % y el 45 %** del progreso de scroll de la sección; a partir de ahí se queda en 1. (El DOM capturado la muestra en `scale3d(0.500335, …)`.)

```tsx
const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
const scale = useTransform(useSpring(scrollYProgress, { stiffness: 50, damping: 22 }), [0, 0.45], [0.5, 1], { clamp: true });
// <motion.section style={{ scale }} className="will-change-transform">
```

**`a-29` / `a-30` — Counter (odómetro)**: `.counter-wrap` mide **66 px** con `overflow: hidden` y contiene 10 `<h3 class="h3">` apilados en **orden descendente** (`2014, 2013, … 2006` / `350, 349, … 341`). Arranca en `y: −90 %` (mostrando el más bajo) y va a `y: 0 %` en **3000 ms** con `ease` → **cuenta hacia arriba** 9 pasos. El sufijo `+` vive aparte en `.counter-icon-wrap` (5 copias de `+`) que va de `0 %` a `−81 %`.

```tsx
export function Odometer({ to, steps = 10 }: { to: number; steps?: number }) {
  const values = Array.from({ length: steps }, (_, i) => to - i); // descendente
  return (
    <div className="h-[66px] overflow-hidden max-md:h-[30px]">
      <motion.div initial={{ y: '-90%' }} whileInView={{ y: '0%' }} viewport={{ once: true }}
        transition={{ duration: 3, ease: [0.25, 0.1, 0.25, 1] }}>
        {values.map((v) => <h3 key={v} className="font-heading text-[56px]">{v}</h3>)}
      </motion.div>
    </div>
  );
}
```

**`a-83` — Choice Box Animation** (loop, `main` + `medium`): las 3 fotos `.cover-image-wrap.corner-one/two/three` (140 px, `border: 8px solid #fff`, rotadas −30°) entran deslizándose desde la derecha en secuencia: **two → one → three**, 800 ms cada una; tras 1500 ms se resetean y el ciclo se repite (≈ **3.9 s**). Viven dentro de `.corner-image-wrap` (`position: absolute; inset: auto 0% 5% 60%; transform: rotate(-20deg)`).

**Ojo con `a-52` "Green Circle Animation"**: es un `STYLE_SIZE` **sin valores** → no hace nada en el original. **No lo repliques.**

---

## 7. Hover states — todos verificados con ratón real

La captura automática de hovers falló porque IX2 es JS, no CSS. Los he medido con `page.hover()` + `getComputedStyle` antes/durante/después.

| Componente | Efecto medido |
|---|---|
| **`.button-white`** (a / a-2) | `.button-box`: `#ffd900 → #ffffff` (500 ms) · `.arrow-div`: `x −105% → 0` (**300 ms**), `scale .75 → 1`, `opacity 0 → 1`, `bg #ffffff → #ffd900` (500 ms). El círculo es de **52×52** (48 @≤767). Solo `main` (≥992 px): **en móvil no hay hover** y el reposo es box blanco + arrow-div amarillo visible. |
| **`.button-black`** (a-3/a-46/a-48) | `.button-box.black`: `#000 → #fff` · `.button-text.white`: `#fff → #000` **y `scale 1 → 1.09`** · `.arrow-div.white`: `x −105% → 0` (300 ms), `scale .75→1`, `opacity 0→1`, bg negro · `.button-icon`: `#000 → #fff`. **Medido en vivo.** |
| **`.project-card`** (a-11 + a-41 + a-42) | `.cover-image` **`scale 1 → 1.1`** (500 ms) · `.projects-info-box` **`#fae9ce → #000`** (300 ms) · `.h6.rotate` (texto vertical) **`#000 → #fff`** (300 ms) · `.project-mouse-move-element` **`scale 0 → 1`**: círculo de **95×95, `border: 2px solid #ffd900`**, con flecha, que **sigue al ratón** (`±10vw` / `±20vh`, smoothing 80, restingState 50). |
| **`.products-wrap`** (a-65 + a-11) | `.cover-image-wrap.products` `#fef8f0 → #fae9ce` (400 ms) · **el chip "Cart"** (`.cart-wrap`, 137×65, radius 6, padding 10/20, gap 20) `#fae9ce → #000` · su texto `#000 → #fff` · **cross-fade de dos iconos** superpuestos: `.cart-icon-home.black` `opacity 1→0` y `.cart-icon-home.white` `0→1` (300 ms) · `.cover-image` `scale 1 → 1.1`. |
| **`.service-box`** (a-55/a-56) | **inversión de colores**: la tarjeta `#fff → #fae9ce` y la caja del icono (`.service-icon-box`, 150×150, radius 14) `#fae9ce → #fff`; el icono `scale 1 → 1.1`. 300 ms. |
| **`.blogs-big-box` y demás imágenes** (a-11/a-12, 20 instancias) | patrón genérico **`.cover-image scale 1 → 1.1`**, 500 ms, dentro de un wrapper con `overflow: hidden`. |
| **Links de navbar** (a-81/a-82, 66 eventos + a-115/a-116, 22) | `.nav-line` (barra de **1.5 px** blanca, `position: absolute; inset: auto 0% 0%`, dentro de `.nav-text-box { position: relative; overflow: hidden }`): **entra desde la izquierda** (`x −100% → 0`, `display: none → block`) y **sale hacia la derecha** (`x 0 → +100%`, luego salto a −100% y `display: none`). 500 ms. Medido: `display none→block`, `width 0 → 45.5px`. |
| **`.footer-social-box`** (a-62/a-67) | círculo `#000` con borde blanco → **`#ffd900` sólido** con borde amarillo e icono negro. **200 ms.** |
| **`.link-text` del footer** (a-68/a-69) | `#fff → #ffd900`. 300 ms. |
| **`.cart-button`** de la navbar | **sin cambios en el homepage.** Los action lists `a-23/a-24/a-25` apuntan a `.cart-icon-wrap`, que tiene `display: none` en desktop. Medido en vivo: 0 diferencias. El badge amarillo del contador es estático. |

```tsx
// Botón principal — patrón reutilizable
export function ButtonPrimary({ children, href }: { children: string; href: string }) {
  return (
    <Link href={href} className="group flex items-center no-underline">
      <div className="relative z-[1] flex items-center justify-center rounded-[50px] border border-black
                      bg-[#ffd900] px-6 py-3.5 transition-colors duration-500 lg:group-hover:bg-white">
        <p className="font-text text-base">{children}</p>
      </div>
      <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white opacity-0
                      [transform:translate3d(-105%,0,0)_scale(.75)]
                      transition-[transform,opacity,background-color] duration-500
                      lg:group-hover:translate-x-0 lg:group-hover:scale-100 lg:group-hover:opacity-100
                      lg:group-hover:bg-[#ffd900]
                      max-lg:translate-x-0 max-lg:scale-100 max-lg:bg-[#ffd900] max-lg:opacity-100">
        <ArrowUpRight className="h-5 w-5" />
      </div>
    </Link>
  );
}
```

```tsx
// Círculo que sigue al cursor en las project cards
'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export function ProjectCursor({ hovered }: { hovered: boolean }) {
  const mx = useMotionValue(0.5), my = useMotionValue(0.5);
  const x = useSpring(useTransform(mx, [0, 1], ['-10vw', '10vw']), { stiffness: 60, damping: 20 });
  const y = useSpring(useTransform(my, [0, 1], ['-20vh', '20vh']), { stiffness: 60, damping: 20 });
  // el padre hace: onMouseMove={(e)=>{const r=e.currentTarget.getBoundingClientRect();
  //   mx.set((e.clientX-r.left)/r.width); my.set((e.clientY-r.top)/r.height);}}
  return (
    <motion.div
      style={{ x, y, scale: hovered ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="pointer-events-none absolute inset-0 z-10 m-auto hidden h-[95px] w-[95px]
                 items-center justify-center rounded-full border-2 border-[#ffd900] text-[#ffd900] lg:flex"
    >
      <ArrowUpRight />
    </motion.div>
  );
}
```

---

## 8. Navbar — **NO es sticky. Confirmado en vivo.**

Ejecuté un barrido de scroll con Playwright a 1440 px, midiendo `position` de **todos** los elementos del documento a `scrollY = 0 → 1200 → 5000 → 1000 → 0`:

```
scrollY 0     → fixedCount: 0   navbar.y =   23   position: relative   bg: rgba(255,255,255,0)
scrollY 1200  → fixedCount: 0   navbar.y = -1177  position: relative   bg: rgba(255,255,255,0)
scrollY 5000  → fixedCount: 0   navbar.y = -4977  position: relative   bg: rgba(255,255,255,0)
scrollY 1000↑ → fixedCount: 0   navbar.y =  -977  (no reaparece al subir)
```

**Cero elementos `fixed` o `sticky` en toda la página, a cualquier altura de scroll.** La navbar es `position: relative` con `z-index: 1000` dentro de `.hero-navbar-wrap` (que tiene `background: rgba(0,0,0,.15)` para dar contraste sobre la foto del hero) y **se va con el hero**. No cambia de fondo, ni de tamaño, ni se esconde/reaparece.

- Layout: `.navbar-layout.home` `max-width: 1700px`, `min-height: 70px`, `justify-content: space-between`, `gap: 40px`.
- Izquierda: logo `Livinor Black.svg`. Centro: `.navbar` (`w-nav`, `max-width: 515px`) con `.navbar-link-wrap.hero` (`gap: 30px`): Home · About us · Projects · Shop · **Pages** (dropdown). Derecha: botón carrito con badge amarillo.

> **Recomendación:** no añadas sticky "porque queda mejor" — el comparator lo penalizaría en todos los tiles a partir de y≈900.

---

## 9. Menú móvil

- **Breakpoint:** `data-collapse="medium"` → hamburguesa a **≤991 px**.
- **Botón:** `.menu-button.w-nav-button`, **48×48**, `padding: 12px`, esquina superior derecha (medido a 375 px: `x: 317, y: 11`). Al abrir gana `.w--open` (`background: --transperant`, `color: #000`).
- **NO es overlay a pantalla completa. NO entra desde un lateral.** Es un **panel que baja desde detrás de la navbar**, recortado por `.w-nav-overlay` (`position: absolute; top: 100%; overflow: hidden`).
- **Panel** (`.navbar-navigation.w-nav-menu`) medido abierto a 375 px: `x: 10, y: 70, w: 355, h: 280`, `background: rgb(250,233,206)` = **`--card-color` #fae9ce**, `border-radius: 12px`, `position: absolute; top: 100%`.
- **Animación:** `data-animation="default"`, `data-duration="600"`, `data-easing="ease"` → `transform: translateY(-100%) → 0` en **600 ms**.
- **Contenido:** Home · About us · Projects · Shop · **Pages** (dropdown anidado).
- **No bloquea el scroll del body** (`body.overflow` sigue en `visible`).

```tsx
'use client';
import { AnimatePresence, motion } from 'framer-motion';

export function MobileMenu({ open }: { open: boolean }) {
  return (
    <div className="absolute inset-x-0 top-full overflow-hidden">
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-[10px] rounded-[12px] bg-[#fae9ce] p-6"
          >
            {['Home', 'About us', 'Projects', 'Shop'].map((l) => <MobileLink key={l} label={l} />)}
            <MobilePagesDropdown />
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
```

---

## 10. Megamenú "Pages"

Abierto con un click real en `.megamenu-dropdown-toggle`:

- **Apertura (`a-21`):** `.dropdown-link-wrap` pasa de `height: 0` a `height: auto` en **1000 ms** con easing `inQuad` = `cubic-bezier(.55,.085,.68,.53)`; el contenedor tiene `overflow: hidden` así que es un **clip vertical**. Medido: `0px → 400px`.
- **Flecha:** `.dropdown-arrow` rota `0° → −90°` en 500 ms. Medido: `matrix(0,-1,1,0,0,0)`. ✔
- **Cierre (`a-22`):** `height: auto → 0`, mismos 1000 ms `inQuad`.
- **Panel** `.dropdown-content-wrap`: **850 × 400**, `border: 1px solid #fff`, `padding: 30px`, `display: flex`, `justify-content: space-between`, `gap: 30px`, **fondo transparente**. El `.w-dropdown-list` se ancla en `x: 304, y: 47` (850 × 430). `.dropdown-link-wrap` lleva `margin-top: 30px; right: 100px`.
- **Tiene un vídeo de fondo en loop**: `.nav-bg-video` (`position: absolute; inset: 0; overflow: hidden`) con `<video autoplay loop muted playsinline>` (`Navbar BG Video` mp4 + webm + poster jpg). Los tres assets ya están en `references/pages/home/assets/images/`.

**Contenido (4 columnas):**

| PAGES | CMS | UTILITY | E-COMMERCE |
|---|---|---|---|
| Contact Us → `/contact` | Blogs Details | Style Guide | Checkout |
| Blogs → `/blogs` | Services Details | Changelog | Checkout (Paypal) |
| Services → `/services` | Projects Details | Licenses | Order Confirmation |
| Shop → `/shop` | Products Details | Password Protected (401) | |
| Team → `/team-one` | Categories Details | 404 | |

```tsx
<motion.div
  initial={false}
  animate={{ height: open ? 'auto' : 0 }}
  transition={{ duration: 1, ease: [0.55, 0.085, 0.68, 0.53] }}
  className="relative right-[100px] mt-[30px] overflow-hidden"
>
  <div className="relative flex min-h-[400px] min-w-[850px] items-start justify-between gap-[30px] border border-white p-[30px]">
    <div className="absolute inset-0 overflow-hidden">
      <video autoPlay loop muted playsInline preload="none"
             poster="/images/shared/navbar-bg-poster.jpg"
             className="h-full w-full object-cover">
        <source src="/images/shared/navbar-bg.webm" type="video/webm" />
        <source src="/images/shared/navbar-bg.mp4" type="video/mp4" />
      </video>
    </div>
    {COLUMNS.map((c) => <MegaColumn key={c.title} {...c} />)}
  </div>
</motion.div>
```

---

## 11. Lottie (6 instancias)

Los eyebrows de sección ("About Us", "Our Projects", "Our Blogs"…) llevan delante un icono **Lottie animado**: `Livnor Icon.lottie`, `data-loop="1"`, `data-autoplay="1"`, `data-duration="0.8333"` s, renderer SVG.

**Recomendación:** usar el **SVG estático** ya extraído (`references/pages/home/assets/svgs/`) con un loop CSS sutil. Meter `lottie-web` (~250 KB) por un icono de 24 px destroza el objetivo de Lighthouse ≥ 90. Si el fixer detecta diferencia visual, la alternativa es `@lottiefiles/dotlottie-react` cargado con `next/dynamic({ ssr: false })`.

---

## 12. `prefers-reduced-motion`

El original **no lo respeta en absoluto** (Webflow IX2 lo ignora). Como la réplica sí debe hacerlo para Lighthouse/a11y:

```css
/* globals.css */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Y en JS, con `useReducedMotion()` de framer-motion:

**Desactivar:** los 4 marquees · las 2 rotaciones infinitas (anillo 10 s, estrella 6 s) · el slot machine `.bold-text` (mostrar solo "Bold Designs") · el rotador `.h2-title-counter` (renderizar directamente la 3ª palabra, gris) · el odómetro (mostrar el número final) · el zoom-on-scroll de `designcta` (dejar `scale: 1`) · el wipe de barras `.line-color` (dejarlas todas en `x: 100%` → texto negro completo) · el loop de las fotos de esquina (dejarlas en `x: 0`) · el vídeo del megamenú (sustituir por el poster) · los Lottie (frame estático).

**Mantener:** los reveals de entrada reducidos a un fade de ~150 ms sin desplazamiento · los cambios de color en hover (son estado, no movimiento) pero sin `scale` ni `translate` · el carrusel con `duration: 0` en embla (cross-fade instantáneo).

---

## 13. Dudas / avisos para los builders

1. **Ningún marquee del original hace loop seamless.** El reset de Webflow (`duration: 0`) provoca un salto visible cada 40 s / 90 s / 100 s. He especificado la versión *seamless* manteniendo **la misma velocidad en px/s**. Si el comparator captura justo el frame del salto habría diferencia — pero es un frame entre miles, y la versión seamless es la correcta.
2. **Easing de los marquees:** el original usa el `ease` por defecto de Webflow sobre 40–100 s, lo que en la práctica es indistinguible de `linear` salvo en los extremos. Recomiendo `linear`.
3. **Los dots del carrusel de testimonios no se ven nunca.** Están en el DOM pero `.slide-nav { display: none }` está en el CSS **base**, no en un media query. Si el brief pide dots, sería un añadido, no una réplica.
4. **`a-42`/`a-19`/`a-25` son animaciones `MOUSE_MOVE` continuas** (elemento que sigue al cursor con `smoothing: 80–90`, `restingState: 50`). En framer-motion se replican con `useMotionValue` + `useSpring`; `smoothing: 80` ≈ `{ stiffness: 60, damping: 20 }`. Es una **aproximación**, no un valor exacto.
5. **Reconciliación del conteo:** los "238 `data-w-id`" de `interactivity.json` son ocurrencias del atributo en el HTML crudo. El DOM renderizado tiene **168 elementos únicos** con `data-w-id`, de los cuales **120 tienen al menos un evento IX2** asociado. La diferencia son duplicados de plantillas de e-commerce (carrito) y elementos que solo existen en otras páginas del template.
6. **Action lists declarados pero SIN target en el homepage** (ignóralos): `a-93` "H1 Text Change" (`.h1-black`/`.h1-span`), `a-75`/`a-76`/`a-94` "Title Animation" (`.span-wrap` — no existe aquí), `a-70` "Stats Black Box" (`.stats-card` — no existe aquí), `a-14` "Expert Icon Rotation" (`.round-image`), `a-13` "Banner Logo Move", `a-15`/`a-20` FAQ, `a-39`/`a-40` Category Dropdown, `a-44`/`a-45`/`a-59`/`a-60`/`a-72`/`a-104`/`a-109`/`a-110` (equipo). Son del template compartido, no del home.
7. **`.services-overlay-box`** (`background: rgba(0,0,0,.3)`, `position: absolute; inset: 0`) está presente y **visible** en las project cards a desktop (555×800) — es el velo oscuro sobre la foto. No tiene animación propia pero sí afecta al color percibido de la imagen.

---

```json
{
  "marquees": [
    { "id": "hero-slider", "section": "hero", "direction": "left", "speedPxPerSec": 54.8, "setWidthPx": 1080, "durationSec": 19.7, "itemCount": 9, "uniqueItems": 3, "itemPx": 360, "gapPx": 0, "pauseOnHover": false },
    { "id": "top-slider", "section": "services", "direction": "left", "speedPxPerSec": 90.5, "setPitchPx": 2176, "durationSec": 24.05, "sets": 5, "gapPx": 30, "pauseOnHover": false },
    { "id": "bottom-slider", "section": "services", "direction": "right", "speedPxPerSec": 72.9, "setPitchPx": 2176, "durationSec": 29.85, "sets": 4, "gapPx": 30, "pauseOnHover": false },
    { "id": "design-slider", "section": "designcta", "direction": "right", "speedPxPerSec": 69.2, "setPitchPx": 1178, "durationSec": 17.03, "sets": 4, "gapPx": 10, "pauseOnHover": false }
  ],
  "carousels": [
    { "id": "testimonial-slider", "slides": 4, "autoplay": false, "loop": true, "hasArrows": true, "hasDots": false, "slidesVisible": 1, "gap": 0, "transitionMs": 500, "arrowPx": 60, "arrowBorder": "3px solid #fff", "emblaOptions": { "loop": true, "align": "start", "duration": 25, "containScroll": false } }
  ],
  "textRotators": [
    { "id": "h2-title-counter", "sections": ["projects", "advantages", "products", "blogs"], "items": 3, "translateY": "-66.666%", "wrapHeightPx": 85, "trackHeightPx": 246.2, "delayMs": 1000, "durationMs": 1000, "loop": false, "finalColor": "#8e8e8e" },
    { "id": "bold-text", "section": "advantages", "items": 5, "translateY": "-400% (4 items)", "wrapHeightPx": 60, "itemHeightPx": 62.4, "durationMs": 10000, "loop": true }
  ],
  "specialAnimations": [
    { "name": "dot-ring", "section": "advantages", "rotateDeg": 360, "durationMs": 10000, "loop": true, "sizePx": 205 },
    { "name": "star", "section": "advantages", "rotateDeg": 360, "durationMs": 6000, "loop": true, "sizePx": 43 },
    { "name": "line-wipe", "sections": ["about", "services"], "bars": 8, "barHeightPx": 50, "barColor": "#8e8e8e", "blend": "lighten", "scrollRange": [0.20, 0.60], "stepPerBar": 0.05, "desktopOnly": true },
    { "name": "designcta-scale", "section": "designcta", "from": 0.5, "to": 1, "scrollRange": [0, 0.45], "desktopOnly": true },
    { "name": "odometer", "sections": ["about", "advantages"], "items": 10, "from": "-90%", "to": "0%", "durationMs": 3000 },
    { "name": "corner-images", "section": "advantages", "order": ["two", "one", "three"], "durationMs": 800, "resetDelayMs": 1500, "loop": true }
  ],
  "navbarBehavior": { "sticky": false, "fixed": false, "changesOnScroll": "ninguno", "verifiedLive": true, "zIndex": 1000, "collapseAt": 991 },
  "mobileMenu": { "type": "dropdown-panel", "enterFrom": "top", "durationMs": 600, "widthPx": 355, "heightPx": 280, "bg": "#fae9ce", "radius": 12, "scrollLock": false },
  "megamenu": { "trigger": "click", "heightMs": 1000, "ease": "inQuad", "arrowDeg": -90, "panelPx": [850, 400], "columns": 4, "hasBackgroundVideo": true },
  "presets": {
    "fadeIn": { "opacity": [0, 1], "durationMs": 1000, "ease": "cubic-bezier(0.165,0.84,0.44,1)", "delayMs": 200 },
    "slideInBottom": { "opacity": [0, 1], "yPx": [100, 0], "durationMs": 1000, "ease": "cubic-bezier(0.165,0.84,0.44,1)", "delayMs": 200, "threshold": 0.2 },
    "growIn": { "opacity": [0, 1], "scale": [0.75, 1], "durationMs": 1000, "ease": "cubic-bezier(0.165,0.84,0.44,1)", "delayMs": 200, "mediaQuery": "<=767px" }
  },
  "hoverDurationsMs": { "buttonArrowMove": 300, "buttonColors": 500, "imageZoom": 500, "cardColors": 300, "navLine": 500, "footerSocial": 200, "footerLink": 300 }
}
```
