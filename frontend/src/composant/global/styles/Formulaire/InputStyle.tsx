/** @format */

interface FormInputProps extends React.ComponentPropsWithoutRef<'input'> {
  label: string;
  id: string;
}

export function InputStyle({ label, id, ...props }: FormInputProps) {
  return (
    <div className="contents">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className="bg-white border-2 p-2 rounded-md focus:outline-2 focus:outline-indigo-600 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed "
        {...props}
      />
    </div>
  );
}
