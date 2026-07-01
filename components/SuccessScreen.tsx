import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Check, Share2, Copy, MessageCircle } from 'lucide-react';
import ScallopedCard from './ui/ScallopedCard';

interface SuccessScreenProps {
  submissionId: string;
  fullName: string;
  onReset: () => void;
}

export default function SuccessScreen({ submissionId, fullName, onReset }: SuccessScreenProps) {
  useEffect(() => {
    // Confetti explosion
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#895158', '#EADBC8', '#664436', '#4A3324'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#895158', '#EADBC8', '#664436', '#4A3324'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    alert('Contest link copied to clipboard!');
  };

  const shareText = `I just entered the "The Anti Aesthetic" photography contest by ṚUUT! Submit your entry now!`;
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const shareWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      '_blank'
    );
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 animate-fade-in">
      <ScallopedCard className="text-center overflow-hidden">
        {/* Scalloped Card background circles andInner Border is defined internally */}
        
        {/* Success Icon */}
        <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center border-4 border-green-200 mb-6 scale-in">
          <Check size={40} className="stroke-[3]" />
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#664436] tracking-tight mb-2 uppercase select-none">
          Submission Successful
        </h2>
        <p className="text-sm font-semibold text-[#895158] uppercase tracking-widest mb-6">
          Theme: The Anti Aesthetic
        </p>

        {/* Thank You Box */}
        <div className="bg-[#EADBC8]/40 border border-[#D1C7B7]/50 rounded-2xl p-5 mb-6 text-left">
          <p className="text-[#664436] font-medium mb-3">
            Thank you, <strong className="text-[#4A3324] font-bold">{fullName}</strong>! Your entry has been successfully recorded in our system.
          </p>
          <div className="border-t border-[#D1C7B7]/40 pt-3 flex flex-col gap-1.5 text-xs text-[#664436]/80">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="font-bold uppercase tracking-wider">Submission ID:</span>
              <code className="bg-[#F9F6F0] border border-[#D1C7B7] text-[#4A3324] px-2 py-1 rounded font-mono font-bold select-all break-all text-[11px] sm:text-xs">
                {submissionId}
              </code>
            </div>
            <div className="flex justify-between items-center mt-2 border-t border-[#D1C7B7]/20 pt-2">
              <span>Status:</span>
              <span className="font-semibold text-green-700 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
                Submitted
              </span>
            </div>
          </div>
        </div>

        {/* Contest Updates */}
        <div className="mb-8">
          <h4 className="text-sm font-extrabold uppercase text-[#664436] tracking-wider mb-2">
            What happens next?
          </h4>
          <p className="text-xs text-[#664436]/80 leading-relaxed max-w-md mx-auto">
            Our curators will review the entries. Shortlisted photos will be featured in the community gallery, and winners will be announced via email and our social handles. Stay tuned!
          </p>
        </div>

        {/* Social Share Buttons */}
        <div className="border-t border-b border-[#D1C7B7]/40 py-5 mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#664436] mb-3 flex items-center justify-center gap-1.5">
            <Share2 size={12} />
            Share with your friends
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={shareTwitter}
              className="p-3 bg-[#664436] text-[#F9F6F0] rounded-full hover:bg-[#895158] transition-all hover:scale-110 flex items-center justify-center"
              title="Share on Twitter"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>
            <button
              onClick={shareWhatsApp}
              className="p-3 bg-[#664436] text-[#F9F6F0] rounded-full hover:bg-[#895158] transition-all hover:scale-110"
              title="Share on WhatsApp"
            >
              <MessageCircle size={18} />
            </button>
            <button
              onClick={handleCopyLink}
              className="p-3 bg-[#664436] text-[#F9F6F0] rounded-full hover:bg-[#895158] transition-all hover:scale-110"
              title="Copy Link"
            >
              <Copy size={18} />
            </button>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onReset}
          className="w-full py-4 bg-[#664436] text-[#F9F6F0] rounded-xl font-extrabold text-sm uppercase tracking-widest hover:bg-[#4A3324] active:scale-95 transition-all shadow-md"
        >
          Submit Another Entry
        </button>
      </ScallopedCard>
    </div>
  );
}
