import { FaCircleExclamation } from 'react-icons/fa6';

type TSpanErrorProps = {
  message?: string;
};

export const SpanError = ({ message }: TSpanErrorProps) => {
  if (!message) return null;

  return (
    <span role="alert" className="mt-1.5 flex items-center text-[12px] text-red-700">
      <FaCircleExclamation aria-hidden="true" className="mr-1.25 inline-block size-3.5" />
      {message}
    </span>
  );
};
