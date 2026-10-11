import { FaCircleExclamation } from 'react-icons/fa6';

type TSpanErrorProps = {
  message?: string;
};

export const SpanError = ({ message }: TSpanErrorProps) => {
  if (!message) return null;

  return (
    <span role="alert" className="text-red-500 text-[10px] lg:text-xs flex items-center mt-2.5">
      <FaCircleExclamation aria-hidden="true" className="inline-block size-4 lg:size-4.5 mr-1.5" />
      {message}
    </span>
  );
};
