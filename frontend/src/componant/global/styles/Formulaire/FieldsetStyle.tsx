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
    'p-4 rounded-2xl bg-[RGB(205,240,200)] shadow-xl border-2 border-[RGB(240,175,70)] grid grid-cols-2 items-center text-center gap-4 w-full mt-4';

  return (
    <fieldset className={`${fieldset} ${className}`}>
      <legend className="px-2 font-extrabold text-gray-800">{legend}</legend>
      {children}
    </fieldset>
  );
}
