import type { TProcessStep } from '@/types/content';
import ImgStep1 from "@/assets/media/stock/ImgStock1.webp"
import ImgStep2 from "@/assets/media/renders/ImgRender1.webp"
import ImgStep3 from "@/assets/media/stands/ImgStand5.webp"
import ImgStep4 from "@/assets/media/stands/ImgStand6.webp"
import ImgStep5 from "@/assets/media/stands/ImgStand16.webp"
import ImgStep6 from "@/assets/media/stands/ImgStand11.webp"

export const PROCESS_STEPS: TProcessStep[] = [
  {
    step: 'Paso 01',
    title: 'Atención y briefing',
    description: 'Escuchamos tu espacio, tus productos y tu presupuesto.',
    img: ImgStep1,
    alt: 'Reunión de briefing con el cliente',
  },
  {
    step: 'Paso 02',
    title: 'Diseño y render',
    description: 'Te mostramos tu stand en render antes de fabricarlo.',
    img: ImgStep2,
    alt: 'Render tridimensional de un stand',
  },
  {
    step: 'Paso 03',
    title: 'Fabricación',
    description: 'Producimos cada pieza en nuestro taller.',
    img: ImgStep3,
    alt: 'Fabricación de estructuras en taller',
  },
  {
    step: 'Paso 04',
    title: 'Montaje',
    description: 'Armamos todo en el recinto, listo para recibir visitantes.',
    img: ImgStep4,
    alt: 'Equipo montando un stand en el recinto',
  },
  {
    step: 'Paso 05',
    title: 'Disfruta tu evento',
    description: 'Tú atiendes a tus clientes; nosotros seguimos pendientes por si algo hace falta.',
    img: ImgStep5,
    alt: 'Stand terminado e iluminado durante la feria',
  },
  {
    step: 'Paso 06',
    title: 'Desmontaje',
    description: 'Retiramos todo al cerrar el evento. Tú no te ocupas de nada.',
    img: ImgStep6,
    alt: 'Desmontaje de stand al finalizar el evento',
  },
];