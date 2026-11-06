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
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        className={`bg-white border-2 p-2 rounded-md focus:outline-2 focus:outline-indigo-600 ${className}`}
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
