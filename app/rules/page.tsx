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
                The Brief: The Art of Sensory Escapism
              </h2>
              <p className="text-xs sm:text-sm font-semibold leading-relaxed text-[#664436]/90 mb-4">
                The assignment is not to find a beautiful place and take a beautiful picture. That is easy. Your assignment is to find a chaotic place and force it to look premium through your lens. We are testing your ability to curate reality.
              </p>
              
              <div className="flex flex-col gap-4 pl-1">
                <div>
                  <h4 className="text-xs font-bold text-[#895158] uppercase block mb-1">1. The Subject: Find the Chaos</h4>
                  <p className="text-xs font-semibold leading-relaxed text-[#664436]/90">
                    Select a location in your city (anywhere in India) that is universally considered loud, cluttered, ordinary, or &quot;ugly.&quot;
                  </p>
                  <ul className="list-disc pl-5 mt-1.5 text-[11px] sm:text-xs font-medium text-[#664436]/80 flex flex-col gap-1">
                    <li><strong className="text-[#664436]">What we want:</strong> A packed local train or transit hub, a tangled mess of overhead street wires, a crowded vegetable market, a narrow and weathered alleyway, a chaotic traffic intersection, or a rusted local tea stall.</li>
                    <li><strong className="text-[#895158]">What will disqualify you:</strong> A luxury cafe, a manicured public garden, a scenic sunset over a lake, a high-end hotel lobby. If the location is already premium or inherently beautiful, you have failed the assignment.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#895158] uppercase block mb-1">2. The Execution: Elevate the Grime</h4>
                  <p className="text-xs font-semibold leading-relaxed text-[#664436]/90">
                    Through your mastery of the camera, manipulate the viewer&apos;s perception. Use framing, lighting, and composition to make this chaotic location look like a premium, luxury lifestyle ad or a moody cinematic still.
                  </p>
                  <ul className="list-disc pl-5 mt-1.5 text-[11px] sm:text-xs font-medium text-[#664436]/80 flex flex-col gap-1">
                    <li>Use a tight crop to isolate a quiet detail in a busy crowd.</li>
                    <li>Use heavy contrast, deep shadows, and light leaks to make peeling paint and concrete look like a deliberate, high-end design choice.</li>
                    <li>Find geometry, symmetry, and stillness where there should only be noise.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#895158] uppercase block mb-1">3. The Ultimate Goal: Sensory Escapism</h4>
                  <p className="text-xs font-semibold leading-relaxed text-[#664436]/90">
                    When we look at your final image, we should not hear the honking horns or smell the street dust. We should feel a sense of calm, intimacy, and high-end isolation. You must extract a moment of Sensory Escapism from the middle of the noise.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: Boundaries */}
            <div className="pt-4 border-t-2 border-[#664436]/10">
              <h2 className="text-sm font-black uppercase tracking-widest text-[#895158] mb-1">
                The Boundaries
              </h2>
              <p className="text-[11px] sm:text-xs font-semibold mb-4 text-[#664436]/80">
                We are looking for a curator&apos;s eye, not a computer&apos;s imagination.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <li><span className="underline">AI-Generated Imagery</span>: This is a zero-tolerance policy. The use of Midjourney, DALL-E, or any AI generative tools (including Photoshop Generative Fill) will result in an instant, permanent ban from the ṚUUT community.</li>
                    <li><span className="underline">Heavy Manipulation</span>: Do not digitally add or remove physical objects from your frame. Work with the reality in front of you.</li>
                    <li><span className="underline">Plagiarism</span>: The photo must be 100% yours.</li>
                    <li><span className="underline">Trespassing</span>: Do not break the law or risk public safety to get a shot.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3: How to Enter */}
            <div className="pt-4 border-t-2 border-[#664436]/10">
              <h2 className="text-sm font-black uppercase tracking-widest text-[#895158] mb-2">
                How to Enter
              </h2>
              <p className="text-[11px] sm:text-xs font-semibold mb-4 text-[#664436]/80">
                We are looking for precision. To successfully enter the campaign, you must complete the following steps exactly as outlined. Failure to follow these steps will result in disqualification.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#EADBC8]/30 rounded-xl border border-[#664436]/10 flex flex-col gap-2">
                  <span className="text-[10px] font-black text-[#895158] uppercase tracking-wider block">1. The Official Submission (The Form - Mandatory)</span>
                  <div className="text-[11px] text-[#664436]/80 font-semibold leading-relaxed">
                    <p className="mb-1"><strong className="text-[#664436]">The Action:</strong> You must upload your final, high-resolution image to the official ṚUUT Submission Form (Link in Bio / on this site).</p>
                    <p><strong className="text-[#664436]">The Details:</strong> This is mandatory to be judged. We need the raw, uncompressed file to properly judge the quality, lighting, and editing of your work. Do not include heavy watermarks. Submissions sent via Instagram DM or email will be ignored.</p>
                  </div>
                </div>

                <div className="p-4 bg-[#EADBC8]/30 rounded-xl border border-[#664436]/10 flex flex-col gap-2">
                  <span className="text-[10px] font-black text-[#895158] uppercase tracking-wider block">2. The Social Post (Optional, but Rewarded)</span>
                  <div className="text-[11px] text-[#664436]/80 font-semibold leading-relaxed">
                    <p className="mb-1"><strong className="text-[#664436]">The Action:</strong> You can also choose to upload your image as a Post or Reel on your public Instagram profile.</p>
                    <p className="mb-1"><strong className="text-[#895158]">The Reward (The Insider&apos;s Privilege):</strong> We want to reward our loudest advocates. Every participant who publicly posts their entry with our official tags will receive a personalized, private access code for exclusive store credit toward our upcoming ṚUUT website launch. You aren&apos;t just entering a contest; you are unlocking early brand privileges.</p>
                    <p className="text-[10px] text-[#895158] font-bold">(Note: The Public Opinion vote does not happen on your personal post. The official voting will be hosted exclusively on the ṚUUT page).</p>
                  </div>
                </div>

                <div className="p-4 bg-[#EADBC8]/30 rounded-xl border border-[#664436]/10 flex flex-col gap-2">
                  <span className="text-[10px] font-black text-[#895158] uppercase tracking-wider block">3. The Mandatory Tags</span>
                  <div className="text-[11px] text-[#664436]/80 font-semibold leading-relaxed">
                    <p className="mb-1"><strong className="text-[#664436]">The Action:</strong> If you choose to post on your grid, your Instagram caption must include our official campaign hashtags so we can track the movement and send you your private access code.</p>
                    <p className="font-extrabold text-[#895158] mt-1 mb-1">#ruutcommunity, #ruutphotographycontest, and #theantiaesthetics</p>
                    <p>Ensure you also tag our official page in the image.</p>
                  </div>
                </div>

                <div className="p-4 bg-[#EADBC8]/30 rounded-xl border border-[#664436]/10 flex flex-col gap-2">
                  <span className="text-[10px] font-black text-[#895158] uppercase tracking-wider block">4. The Location Context</span>
                  <div className="text-[11px] text-[#664436]/80 font-semibold leading-relaxed">
                    <p className="mb-1"><strong className="text-[#664436]">The Action:</strong> In the submission form (and your caption, if posting), you must explicitly name your city and the specific location of the shoot (e.g., &quot;Manek Chowk, Ahmedabad&quot; or &quot;Dadar Station, Mumbai&quot;).</p>
                    <p><strong className="text-[#664436]">The Why:</strong> The judges need to know what chaotic environment you started with to properly evaluate how well you elevated it through your lens.</p>
                  </div>
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
                  <span className="text-xs font-extrabold text-[#895158] block uppercase">July 30, 2026 at 5:00 PM IST</span>
                  <span className="text-xs font-bold text-[#664436]">Submissions Close (No late entries will be accepted via the form)</span>
                </div>
                <div>
                  <span className="absolute -left-[6px] w-2.5 h-2.5 bg-[#895158] rounded-full"></span>
                  <span className="text-xs font-extrabold text-[#895158] block uppercase">July 30, 2026 at 6:00 PM IST to July 31, 2026 at 6:00 PM IST</span>
                  <span className="text-xs font-bold text-[#664436]">The Bloodbath (Public Voting): Our internal team will select the top finalists and post them on the official ṚUUT Instagram page. The photo that drives the most votes/engagement on our page during this exact 24-hour window wins the Public Opinion prize.</span>
                </div>
                <div>
                  <span className="absolute -left-[6px] w-2.5 h-2.5 bg-[#895158] rounded-full"></span>
                  <span className="text-xs font-extrabold text-[#895158] block uppercase">July 31, 2026 at 7:00 PM IST</span>
                  <span className="text-xs font-bold text-[#664436]">The Crowning (Results Announced)</span>
                </div>
              </div>
            </div>

            {/* Section 5: Prizes */}
            <div className="pt-4 border-t-2 border-[#664436]/10">
              <h2 className="text-sm font-black uppercase tracking-widest text-[#895158] mb-3 flex items-center gap-2">
                <Trophy size={16} />
                Prizes
              </h2>
              <div className="flex flex-col gap-3">
                <div className="bg-[#EADBC8]/40 border border-[#664436]/10 rounded-xl p-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <span className="text-xs font-extrabold text-[#664436] block">1. The Visionary (Judge&apos;s Choice Winner)</span>
                    <span className="text-[11px] text-[#664436]/70 block font-semibold">Selected by our Guest Judge for raw artistic merit, framing, and adherence to the theme.</span>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-xs font-extrabold text-[#895158] block uppercase">Complete ṚUUT Signature Hamper + Air Jordan 1 Lows</span>
                  </div>
                </div>

                <div className="bg-[#EADBC8]/40 border border-[#664436]/10 rounded-xl p-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <span className="text-xs font-extrabold text-[#664436] block">2. The Curator (Judge&apos;s Choice Runner-Up)</span>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-xs font-extrabold text-[#895158] block uppercase">Exclusive ṚUUT Experience Hamper</span>
                  </div>
                </div>

                <div className="bg-[#EADBC8]/40 border border-[#664436]/10 rounded-xl p-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <span className="text-xs font-extrabold text-[#664436] block">3. The People&apos;s Choice (Public Opinion Winner)</span>
                    <span className="text-[11px] text-[#664436]/70 block font-semibold font-sans">Awarded to the entry that generates the most votes on the official ṚUUT Instagram page during the tight 24-hour voting window.</span>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-xs font-extrabold text-[#895158] block uppercase">Exclusive ṚUUT Signature Hamper</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6: Fine Print */}
            <div className="pt-4 border-t-2 border-[#664436]/10 text-[11px] text-[#664436]/70 font-semibold leading-relaxed flex flex-col gap-2">
              <h3 className="text-xs font-black uppercase text-[#895158] tracking-widest">The Fine Print (Terms & Conditions)</h3>
              <p>● <strong>Rights:</strong> By submitting your image to the form and using the hashtags, you grant ṚUUT the right to repost and feature your submitted image for campaign-related marketing (you will always be credited as the artist).</p>
              <p>● <strong>Geography:</strong> Open to all residents of India. Physical hampers and gifts will be shipped pan-India free of cost.</p>
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
