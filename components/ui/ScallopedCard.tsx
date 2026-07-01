import React from 'react';

interface ScallopedCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScallopedCard({ children, className = '' }: ScallopedCardProps) {
  return (
    <div className={`relative bg-[#F9F6F0] border-4 border-[#664436] rounded-3xl p-6 sm:p-10 shadow-2xl ${className}`}>
      {/* Scalloped Corners (Vintage Ticket Cutouts) */}
      {/* Top Left */}
      <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-[#E6DED1] border-4 border-[#664436] z-10"></div>
      {/* Top Right */}
      <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-[#E6DED1] border-4 border-[#664436] z-10"></div>
      {/* Bottom Left */}
      <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-[#E6DED1] border-4 border-[#664436] z-10"></div>
      {/* Bottom Right */}
      <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-[#E6DED1] border-4 border-[#664436] z-10"></div>

      {/* Retro Inner Border */}
      <div className="absolute inset-2 border-2 border-dashed border-[#895158]/40 rounded-2xl pointer-events-none"></div>

      {/* Decorative Star/Sparkle Elements from Poster */}
      <div className="absolute top-8 left-8 text-[#895158] opacity-60">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
        </svg>
      </div>
      <div className="absolute bottom-8 right-8 text-[#895158] opacity-60">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
        </svg>
      </div>

      {/* Card Content Wrapper */}
      <div className="relative z-0">
        {children}
      </div>
    </div>
  );
}
