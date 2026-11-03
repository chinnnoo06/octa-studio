import { HiExclamationCircle } from 'react-icons/hi2';

type TSpanErrorProps = {
  message?: string;
};

export const SpanError = ({ message }: TSpanErrorProps) => {
  if (!message) return null;

  return (
    <span role="alert" className="mt-1.5 flex items-center text-xs lg:text-sm text-red-700">
      <HiExclamationCircle aria-hidden="true" className="mr-1.5 inline-block size-4 lg:size-4.5" />
      {message}
    </span>
  );
};
