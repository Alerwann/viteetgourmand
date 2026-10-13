/** @format */

import { Star } from "lucide-react";

interface AvisProps {
  note: number;
  description: string;
}

export default function AvisCard({ note, description }: AvisProps) {
  const maxStars = 5;
  const validNote = Math.max(0, Math.min(note, maxStars));

  return (
    <div className="h-full w-full max-w-sm p-6 bg-white rounded-2xl shadow-md hover:shadow-xl border border-slate-100 flex flex-col justify-between gap-4 transition-all duration-300 group">
      {/* Étoiles */}
      <div className="flex items-center gap-1">
        {Array.from({ length: validNote }).map((_, i) => (
          <Star
            key={`yellow-${i}`}
            className="text-amber-400 fill-amber-400 w-5 h-5"
          />
        ))}
        {Array.from({ length: maxStars - validNote }).map((_, i) => (
          <Star
            key={`white-${i}`}
            className="text-slate-200 fill-slate-100 w-5 h-5"
          />
        ))}
      </div>

      {/* Description / Témoignage */}
      <p className="text-slate-700 text-sm leading-relaxed italic flex-grow">
        "{description}"
      </p>
    </div>
  );
}
