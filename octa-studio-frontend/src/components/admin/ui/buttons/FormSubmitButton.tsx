import { FaFloppyDisk } from 'react-icons/fa6';

// Va en el encabezado, fuera del <form>: envia el formulario de la pagina con id="admin-form".
export const FormSubmitButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      type="submit"
      form="admin-form"
      className="border-secondary-admin bg-secondary-admin text-primary-admin inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl hover:shadow-lg border px-5 py-2.5 text-xs lg:text-sm font-semibold whitespace-nowrap transition-all duration-150 hover:-translate-y-px hover:border-secondary-admin/90 hover:bg-secondary-admin/90"
    >
      <FaFloppyDisk aria-hidden="true" className="size-4 lg:size-4.5" />
      {children}
    </button>
  );
};
