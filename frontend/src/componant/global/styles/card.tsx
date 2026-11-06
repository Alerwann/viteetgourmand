/** @format */

import type React from 'react';

/** @format */
interface cardData {
  children: React.ReactNode;
  hoverChoice?: boolean;
}
export default function CardComposant({
  children,
  hoverChoice = true,
}: cardData) {
  return (
    <div
      className={`p-4 rounded-2xl bg-[#69e68c99] shadow-xl border-2 border-[RGB(240,175,70)] ${hoverChoice ? 'hover:scale-105 hover:shadow-2xl' : 'hover:scale-100'} transition-all duration-300 flex flex-col justify-between h-full overflow-hidden group`}
    >
      {children}
    </div>
  );
}
