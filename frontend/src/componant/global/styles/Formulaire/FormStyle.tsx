/** @format */

interface FormLayoutProps {
  title?: string;
  onSubmit: React.SubmitEventHandler<HTMLFormElement>;
  children: React.ReactNode;
}

export default function FormStyle({
  title,
  onSubmit,
  children,
}: FormLayoutProps) {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#FDFBF7]">
      {title && (
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl mb-4">
          <h2 className="text-center text-3xl font-serif font-bold tracking-tight text-[#2C2C2C]">
            {title}
          </h2>
          <div className="w-16 h-1 bg-[#D95D39] mx-auto mt-3 rounded-full"></div>
        </div>
      )}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-[#EFECE6]">
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center gap-6 w-full"
        >
          {children}
        </form>
      </div>
    </div>
  );
}
