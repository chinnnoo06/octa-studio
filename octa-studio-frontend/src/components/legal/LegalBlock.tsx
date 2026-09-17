type TLegalBlockProps = {
  title: string;
  children: React.ReactNode;
};

export const LegalBlock = ({ title, children }: TLegalBlockProps) => {
  return (
    <div className="border-fourth/30 flex flex-col gap-5 border-t pt-10">
      <h2 className="text-secondary text-xl lg:text-2xl font-semibold uppercase">{title}</h2>
      <div className="text-fourth/75 flex flex-col gap-5 text-base lg:text-lg">{children}</div>
    </div>
  );
};
