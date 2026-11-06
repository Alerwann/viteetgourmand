/** @format */

import type React from 'react';

interface cardData {
  children: React.ReactNode;
  hoverChoice?: boolean;
  className?: string;
}

export default function CardComposant({
  children,
  hoverChoice = true,
  className = '',
}: cardData) {
  return (
    <div
      className={`p-6 rounded-2xl bg-white shadow-sm border border-[#EFECE6] ${
        hoverChoice
          ? 'hover:scale-[1.02] hover:shadow-md hover:border-[#D95D39]'
          : 'hover:scale-100'
      } transition-all duration-300 flex flex-col justify-between h-full overflow-hidden group ${className}`}
    >
      {children}
    </div>
  );
}
