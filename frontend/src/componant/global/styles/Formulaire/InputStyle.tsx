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
      <label
        htmlFor={id}
        className="text-xl font-medium text-[#2C2C2C] font-sans text-center"
      >
        {label}
      </label>
      <div className="relative w-full">
        <input
          id={id}
          className={`bg-[#FDFBF7] border border-[#EFECE6] p-3 rounded-xl w-full pr-10 text-[#2C2C2C] focus:outline-none focus:border-[#D95D39] focus:ring-1 focus:ring-[#D95D39] disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
}
