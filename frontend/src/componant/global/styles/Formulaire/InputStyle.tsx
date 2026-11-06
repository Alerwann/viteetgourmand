/** @format */

interface FormInputProps extends React.ComponentPropsWithoutRef<'input'> {
  label: string;
  id: string;
  rightIcon?: React.ReactNode;
}

export function InputStyle({
  label,
  id,
  rightIcon,
  className = '',
  ...props
}: FormInputProps) {
  return (
    <div className="contents">
      <label htmlFor={id}>{label}</label>
      <div className="relative w-full">
        <input
          id={id}
          className={`bg-white border-2 p-2 rounded-md w-full pr-10 focus:outline-2 focus:outline-indigo-600 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
}
