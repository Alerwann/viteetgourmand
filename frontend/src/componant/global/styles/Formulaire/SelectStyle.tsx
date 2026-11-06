/** @format */

interface OptionType {
  value: string | number;
  label: string;
}

interface SelectStyleProps extends React.ComponentPropsWithoutRef<'select'> {
  label: string;
  id: string;
  options: OptionType[];
  defaultOptionText?: string;
}

export function SelectStyle({
  label,
  id,
  options,
  defaultOptionText = '-- Sélectionner --',
  className = '',
  ...props
}: SelectStyleProps) {
  return (
    <div className="contents">
      <label
        htmlFor={id}
        className="text-sm font-medium text-[#2C2C2C] font-sans"
      >
        {label}
      </label>
      <select
        id={id}
        className={`bg-[#FDFBF7] border border-[#EFECE6] p-3 rounded-xl text-[#2C2C2C] focus:outline-none focus:border-[#D95D39] focus:ring-1 focus:ring-[#D95D39] w-full transition-all ${className}`}
        {...props}
      >
        <option value="">{defaultOptionText}</option>
        {options.map((opt) => (
          <option value={opt.value} key={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
