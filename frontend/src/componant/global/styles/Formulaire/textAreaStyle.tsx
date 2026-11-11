/** @format */

interface FormtextAreaProps extends React.ComponentPropsWithoutRef<'textarea'> {
  label: string;
  id: string;
}

export function TextAreaStyle({
  label,
  id,
  className = '',
  ...props
}: FormtextAreaProps) {
  return (
    <div className="contents">
      <label
        htmlFor={id}
        className="text-xl font-medium text-[#2C2C2C] font-sans"
      >
        {label}
      </label>
      <div className="relative w-full">
        <textarea
          name={id}
          id={id}
          rows={5}
          cols={50}
          className={`bg-[#FDFBF7] border border-[#EFECE6] p-3 rounded-xl w-full pr-10 text-[#2C2C2C] focus:outline-none focus:border-[#D95D39] focus:ring-1 focus:ring-[#D95D39] disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all ${className}`}
          required
          {...props}
        ></textarea>
      </div>
    </div>
  );
}
