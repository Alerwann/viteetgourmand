/** @format */

export default function AvisHeader() {
  return (
    <div className="grid grid-cols-[2fr_1fr] p-3 ">
      <div>photo</div>
      <div>titre</div>
      <div className="col-span-2 text-center">note</div>
    </div>
  );
}
