/** @format */

export default function ZoneText({
  textIn,
  titleIn,
}: {
  textIn: string;
  titleIn: string;
}) {
  return (
    <div className="w-[80%] p-5 mx-auto">
      <h3 className="py-3 text-2xl font-serif text-center font-semibold text-[#2C2C2C]">
        {titleIn}
      </h3>
      <div className="flex mx-4 sm:mx-10 p-4 bg-white shadow-[10px_10px_15px_rgba(0,0,0,0.06)] border border-[#EFECE6] rounded-xl justify-center transition-all hover:border-[#D95D39]">
        <p className="p-2 text-base text-left text-[#555555] font-sans leading-relaxed">
          {textIn}
        </p>
      </div>
    </div>
  );
}
