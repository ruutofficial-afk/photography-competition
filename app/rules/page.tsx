import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, AlertOctagon, Trophy, Calendar, Sparkles } from 'lucide-react';
import ScallopedCard from '../../components/ui/ScallopedCard';

export const metadata = {
  title: 'Rules & Guidelines | The Anti Aesthetic Photography Contest',
  description: 'Official rules, timelines, parameters, and prize details for the ṚUUT Anti-Aesthetic photography contest.',
};

export default function RulesPage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col bg-[#E6DED1] overflow-x-hidden font-sans pb-12">
      {/* Sunburst background */}
      <div className="absolute inset-0 bg-sunburst opacity-[0.06] pointer-events-none z-0"></div>

      {/* HEADER */}
      <header className="relative w-full py-5 px-6 flex justify-between items-center border-b-4 border-[#664436] bg-[#F9F6F0] z-20 shadow-sm select-none">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/favicon-192x192.png"
            alt="ṚUUT Logo"
            className="w-9 h-9 object-contain"
          />
          <span className="font-extrabold tracking-widest text-lg uppercase text-[#664436] font-serif">
            ṚUUT
          </span>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#664436] hover:text-[#895158] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Submit</span>
        </Link>
      </header>

      {/* CONTENT BODY */}
      <div className="relative w-full max-w-4xl mx-auto px-4 mt-8 z-10 flex flex-col gap-8">
        
        {/* Decorative badge */}
        <div className="text-center">
          <span className="bg-[#895158] text-[#F9F6F0] text-[10px] font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full border-2 border-[#664436] shadow-sm select-none">
            Official Campaign Rules
          </span>
        </div>

        <ScallopedCard>
          <div className="p-2 sm:p-6 text-[#664436] flex flex-col gap-8">
            
            {/* Title Block */}
            <div className="text-center border-b-4 border-dashed border-[#664436]/30 pb-6">
              <h1 className="text-3xl sm:text-5xl font-extrabold uppercase font-heading tracking-tight leading-none mb-3">
                THE ANTI-AESTHETIC
              </h1>
              <p className="text-sm sm:text-md font-bold uppercase tracking-wider text-[#895158]">
                A ṚUUT Photography Campaign
              </p>
              <p className="max-w-xl mx-auto mt-4 text-xs sm:text-sm font-semibold leading-relaxed text-[#664436]/90">
                India is not a quiet country. It is loud, chaotic, and aggressively unrefined. Your challenge is to change the lens. We are challenging the country’s best visual curators to find the most mundane, chaotic, or overlooked corners of their city and shoot them like a high-fashion editorial. Find the glamour in the grime. Curate the chaos. This is a test of visual taste.
              </p>
            </div>

            {/* Section 1: The Brief */}
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-[#895158] mb-3 flex items-center gap-2">
                <Sparkles size={16} />
                The Brief
              </h2>
              <ul className="list-decimal pl-5 text-sm font-semibold flex flex-col gap-2">
                <li>Find a location in your city that is universally considered chaotic, ordinary, or "ugly" (e.g., a packed street market, an old transit hub, a narrow, cluttered alleyway, a local tea stall).</li>
                <li>Using framing, lighting, and composition, capture a photograph that makes this location look like a premium, luxury escape.</li>
                <li>You are capturing **Sensory Escapism** in the middle of the noise.</li>
              </ul>
            </div>

            {/* Section 2: Boundaries (Allowed vs Banned) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t-2 border-[#664436]/10">
              {/* Allowed */}
              <div className="bg-green-50/50 border-2 border-green-800/20 rounded-2xl p-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-green-800 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 size={16} />
                  What is Allowed
                </h3>
                <ul className="list-disc pl-4 text-xs font-bold text-green-900/80 flex flex-col gap-2">
                  <li>Photography from any device (Smartphone, Mirrorless, DSLR, Film).</li>
                  <li>Standard post-processing and color grading (e.g., Lightroom, Capture One).</li>
                  <li>Cropping, dodging, burning, and exposure adjustments.</li>
                </ul>
              </div>

              {/* Strict Not Allowed */}
              <div className="bg-red-50/50 border-2 border-red-800/20 rounded-2xl p-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-red-800 mb-3 flex items-center gap-1.5">
                  <AlertOctagon size={16} />
                  What is Strictly Not Allowed
                </h3>
                <ul className="list-disc pl-4 text-xs font-bold text-red-900/80 flex flex-col gap-2">
                  <li><span className="underline">AI-Generated Imagery</span>: Zero-tolerance policy. Use of Midjourney, DALL-E, or AI generative tools (including Photoshop Generative Fill) results in an instant, permanent ban.</li>
                  <li><span className="underline">Heavy Manipulation</span>: Do not digitally add or remove physical objects. Work with the reality in front of you.</li>
                  <li><span className="underline">Plagiarism</span>: The photo must be 100% yours.</li>
                  <li><span className="underline">Trespassing</span>: Do not break the law or risk public safety to get a shot.</li>
                </ul>
              </div>
            </div>

            {/* Section 3: How to Enter */}
            <div className="pt-4 border-t-2 border-[#664436]/10">
              <h2 className="text-sm font-black uppercase tracking-widest text-[#895158] mb-4">
                How to Enter
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#EADBC8]/30 rounded-xl border border-[#664436]/10">
                  <span className="text-[10px] font-black text-[#895158] uppercase tracking-wider block mb-1">Step 1</span>
                  <span className="text-xs font-extrabold text-[#664436] block">The Official Entry (The Form):</span>
                  <p className="text-[11px] text-[#664436]/80 mt-1 font-semibold">
                    You must upload your final, high-resolution image to the official ṚUUT Submission Form on the main page. This is mandatory to be judged.
                  </p>
                </div>
                <div className="p-4 bg-[#EADBC8]/30 rounded-xl border border-[#664436]/10">
                  <span className="text-[10px] font-black text-[#895158] uppercase tracking-wider block mb-1">Step 2</span>
                  <span className="text-xs font-extrabold text-[#664436] block">The Social Flex (Public Vote):</span>
                  <p className="text-[11px] text-[#664436]/80 mt-1 font-semibold">
                    To be eligible for the Public Opinion prize, upload your raw vs final image to your Instagram Grid or Reel.
                  </p>
                </div>
                <div className="p-4 bg-[#EADBC8]/30 rounded-xl border border-[#664436]/10">
                  <span className="text-[10px] font-black text-[#895158] uppercase tracking-wider block mb-1">Step 3</span>
                  <span className="text-xs font-extrabold text-[#664436] block">The Tags:</span>
                  <p className="text-[11px] text-[#664436]/80 mt-1 font-semibold">
                    Your Instagram caption must include: **#ruutcommunity**, **#ruutphotographycontest**, and **#theantiaesthetics**.
                  </p>
                </div>
                <div className="p-4 bg-[#EADBC8]/30 rounded-xl border border-[#664436]/10">
                  <span className="text-[10px] font-black text-[#895158] uppercase tracking-wider block mb-1">Step 4</span>
                  <span className="text-xs font-extrabold text-[#664436] block">The Location:</span>
                  <p className="text-[11px] text-[#664436]/80 mt-1 font-semibold">
                    Clearly name your city and the specific location of your shoot inside your caption.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4: Timeline */}
            <div className="pt-4 border-t-2 border-[#664436]/10">
              <h2 className="text-sm font-black uppercase tracking-widest text-[#895158] mb-3 flex items-center gap-2">
                <Calendar size={16} />
                The Timeline
              </h2>
              <div className="relative border-l-2 border-[#664436]/20 pl-4 ml-2 flex flex-col gap-4">
                <div>
                  <span className="absolute -left-[6px] w-2.5 h-2.5 bg-[#895158] rounded-full"></span>
                  <span className="text-xs font-extrabold text-[#895158] block uppercase">July 2, 2026</span>
                  <span className="text-xs font-bold text-[#664436]">Submissions Open</span>
                </div>
                <div>
                  <span className="absolute -left-[6px] w-2.5 h-2.5 bg-[#895158] rounded-full"></span>
                  <span className="text-xs font-extrabold text-[#895158] block uppercase">July 30, 2026 @ 5:00 PM IST</span>
                  <span className="text-xs font-bold text-[#664436]">Submissions Close (No late entries accepted via the form)</span>
                </div>
                <div>
                  <span className="absolute -left-[6px] w-2.5 h-2.5 bg-[#895158] rounded-full"></span>
                  <span className="text-xs font-extrabold text-[#895158] block uppercase">July 30 @ 6:00 PM - July 31 @ 6:00 PM IST</span>
                  <span className="text-xs font-bold text-[#664436]">The Bloodbath (Public Voting on ṚUUT Instagram Stories)</span>
                </div>
                <div>
                  <span className="absolute -left-[6px] w-2.5 h-2.5 bg-[#895158] rounded-full"></span>
                  <span className="text-xs font-extrabold text-[#895158] block uppercase">July 31, 2026 @ 7:00 PM IST</span>
                  <span className="text-xs font-bold text-[#664436]">The Crowning (Winners announced)</span>
                </div>
              </div>
            </div>

            {/* Section 5: Prizes */}
            <div className="pt-4 border-t-2 border-[#664436]/10">
              <h2 className="text-sm font-black uppercase tracking-widest text-[#895158] mb-3 flex items-center gap-2">
                <Trophy size={16} />
                Prizes & Recognition
              </h2>
              <div className="flex flex-col gap-3">
                <div className="bg-[#EADBC8]/40 border border-[#664436]/10 rounded-xl p-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <span className="text-xs font-extrabold text-[#664436] block">1. The Visionary (Judge's Choice Winner)</span>
                    <span className="text-[11px] text-[#664436]/70 block font-semibold">Selected by Guest Judge for raw artistic merit.</span>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-xs font-extrabold text-[#895158] block uppercase">Jordan Shoes</span>
                    <span className="text-[10px] text-[#664436]/70 block font-semibold">+ ṚUUT Signature Hamper & feature</span>
                  </div>
                </div>

                <div className="bg-[#EADBC8]/40 border border-[#664436]/10 rounded-xl p-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <span className="text-xs font-extrabold text-[#664436] block">2. The Curator (Judge's Choice Runner-Up)</span>
                    <span className="text-[11px] text-[#664436]/70 block font-semibold">Selected by Guest Judge for second place.</span>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-xs font-extrabold text-[#895158] block uppercase">ṚUUT Signature Hamper</span>
                  </div>
                </div>

                <div className="bg-[#EADBC8]/40 border border-[#664436]/10 rounded-xl p-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <span className="text-xs font-extrabold text-[#664436] block">3. The People's Choice (Public Opinion Winner)</span>
                    <span className="text-[11px] text-[#664436]/70 block font-semibold">Awarded for the most authentic Instagram engagement.</span>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-xs font-extrabold text-[#895158] block uppercase">ṚUUT Signature Hamper</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6: Fine Print */}
            <div className="pt-4 border-t-2 border-[#664436]/10 text-[11px] text-[#664436]/70 font-semibold leading-relaxed flex flex-col gap-2">
              <h3 className="text-xs font-black uppercase text-[#895158] tracking-widest">The Fine Print (T&C)</h3>
              <p>● **Rights**: By submitting your image to the form and using the hashtags, you grant ṚUUT the right to repost and feature your submitted image for campaign-related marketing (you will always be credited as the artist).</p>
              <p>● **Geography**: Open to all residents of India. Physical hampers and gifts will be shipped pan-India free of cost.</p>
            </div>

          </div>
        </ScallopedCard>

        {/* Action button */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block py-4 px-10 bg-[#664436] text-[#F9F6F0] rounded-xl font-extrabold text-sm uppercase tracking-widest hover:bg-[#4A3324] active:scale-95 transition-all shadow-md"
          >
            Go to Submission Form
          </Link>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="w-full py-10 px-6 bg-[#664436] text-[#F9F6F0] flex flex-col items-center justify-center text-center border-t-4 border-[#4A3324] select-none z-10 gap-4 mt-auto">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ruut-logo-D6BD9F.png"
            alt="ṚUUT Logo"
            className="h-10 object-contain"
          />
          <span className="font-extrabold tracking-widest text-sm uppercase font-serif">
            ṚUUT
          </span>
        </div>
        <p className="text-[10px] text-[#F9F6F0]/60 tracking-wider font-semibold uppercase">
          © 2026 ṚUUT. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
