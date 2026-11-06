/** @format */

interface titleSection {
  title: string;
}
export default function TitleCommandeSection({ title }: titleSection) {
  return (
    <h2 className="text-4xl font-bold underline underline-offset-4 decoration-solid decoration-black decoration-2 text-center ">
      {title}
    </h2>
  );
}
