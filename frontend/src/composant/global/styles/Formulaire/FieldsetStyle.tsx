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
  const filesetAsset =
    'border-2 grid grid-cols-2 items-center w-full text-center p-4 mt-4 gap-4 bg-[rgba(245,245,245,0.7)]';

  return (
    <fieldset className={`${filesetAsset} ${className}`}>
      <legend className="px-2 font-semibold text-gray-800">{legend}</legend>
      {children}
    </fieldset>
  );
}
