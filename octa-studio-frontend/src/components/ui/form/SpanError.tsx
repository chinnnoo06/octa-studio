import { FaCircleExclamation } from 'react-icons/fa6';

type TSpanErrorProps = {
  message?: string;
};

export const SpanError = ({ message }: TSpanErrorProps) => {
  if (!message) return null;

  return (
    <span role="alert" className="text-red-500 text-[10px] lg:text-xs flex items-center mt-2">
      <FaCircleExclamation aria-hidden="true" className="inline-block h-4 w-4 lg:h-5 lg:w-5 mr-1" />
      {message}
    </span>
  );
};
