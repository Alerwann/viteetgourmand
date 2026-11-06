/** @format */

interface FormFieldsetProps {
  legend: string;
  children: React.ReactNode;
  className?: string;
}

export function FieldsetStyle({
  legend,
  children,
  className = '',
}: FormFieldsetProps) {
  const fieldset =
    'p-6 rounded-2xl bg-white shadow-sm border border-[#EFECE6] grid grid-cols-1 md:grid-cols-2 items-center gap-6 w-full mt-4 transition-all hover:border-[#D95D39]/50';

  return (
    <fieldset className={`${fieldset} ${className}`}>
      <legend className="px-3 font-serif font-semibold text-lg text-[#2C2C2C] bg-[#FDFBF7] border border-[#EFECE6] rounded-lg py-1">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}
