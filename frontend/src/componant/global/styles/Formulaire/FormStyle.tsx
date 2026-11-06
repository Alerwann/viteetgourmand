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
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {title && (
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h2>
        </div>
      )}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-2xl">
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center gap-5 mb-4"
        >
          {children}
        </form>
      </div>
    </div>
  );
}
