import { FaFloppyDisk } from 'react-icons/fa6';

/** Formulario de las paginas de crear/editar: el boton del encabezado lo envia con `form`. */
export const ADMIN_FORM_ID = 'admin-form';

/**
 * "Crear blog" / "Guardar cambios" junto a "Volver", en el encabezado de la
 * pagina. Vive fuera del <form> y lo envia por su id; el doble envio lo frena
 * el hook de cada entidad.
 */
export const FormSubmitButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      type="submit"
      form={ADMIN_FORM_ID}
      className="border-secondary bg-secondary text-primary inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-[7px] border px-4 py-2.5 text-[13px] font-semibold whitespace-nowrap transition-all duration-150 hover:-translate-y-px hover:border-[#145378] hover:bg-[#145378] hover:shadow-[0_4px_12px_rgba(24,96,140,0.25)]"
    >
      <FaFloppyDisk aria-hidden="true" className="size-3.25" />
      {children}
    </button>
  );
};
