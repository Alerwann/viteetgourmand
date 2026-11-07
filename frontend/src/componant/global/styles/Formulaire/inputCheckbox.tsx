/** @format */

interface CheckboxStyleProps extends React.ComponentPropsWithoutRef<'input'> {
  label: string;
  id: string;
}

export function InputCheckbox({ label, id, ...props }: CheckboxStyleProps) {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor={id}
        className="text-md font-medium text-[#2C2C2C] font-sans select-none"
      >
        {label}
      </label>
      <input
        type="checkbox"
        id={id}
        className={`h-4 w-4 rounded bg-[#efe5d0]  focus:ring-[#D95D39] focus:ring-1 focus:outline-none cursor-pointer`}
        {...props}
      />
    </div>
  );
}
