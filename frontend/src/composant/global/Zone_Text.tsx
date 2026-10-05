/** @format */

export default function ZoneText({
  textIn,
  titleIn,
}: {
  textIn: string;
  titleIn: string;
}) {
  return (
    <div className="w-80/100 p-5">
      <h3 className=" py-3  text-xl text-center ">{titleIn}</h3>
      <div className="flex mx-10 p-2 bg-[#69e68c99] shadow-[10px_10px_15px_RGBA(0,0,0,0.25)] border-2 border-[RGBA(240,175,70,1)] rounded-xl justify-center">
        <p className=" p-2  text-l text-left ">{textIn}</p>
      </div>
    </div>
  );
}
