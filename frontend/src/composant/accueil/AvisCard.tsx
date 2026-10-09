/** @format */
import { useState } from "react";
import { Star } from "lucide-react";

interface AvisProps {
  note: number;
  description: string;
}

export default function AvisCard({ note, description }: AvisProps) {
  const maxStars = 5;
  const validNote = Math.max(0, Math.min(note, maxStars));

  return (
    <div className="flex flex-col w-100 bg-[RGBA(105,230,140,0.2)] border-2 rounded-2xl border-[RGBA(240,175,70,1)]">
      <div className="col-span-2 text-center">{note}</div>
      <div className="flex justify-center gap-1">
        {/* Étoiles jaunes (pleines) */}
        {Array.from({ length: validNote }).map((_, i) => (
          <Star
            key={`yellow-${i}`}
            className="text-yellow-400 fill-yellow-400 w-5 h-5"
          />
        ))}

        {/* Étoiles blanches (vides) */}
        {Array.from({ length: maxStars - validNote }).map((_, i) => (
          <Star
            key={`white-${i}`}
            className="text-gray-300 fill-white w-5 h-5"
          />
        ))}
      </div>
      <p>{description}</p>
    </div>
  );
}
