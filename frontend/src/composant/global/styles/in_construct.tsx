/** @format */
import construction from '../../../assets/construction.png';
export default function InContruct() {
  return (
    <div className="h-screen flex flex-col items-center my-20 gap-10">
      <h2 className="text-3xl text-black font-extrabold">
        Page en cours de construction
      </h2>
      <img
        src={construction}
        alt="Image représentant que le site est en construction"
        width={300}
      />
    </div>
  );
}
