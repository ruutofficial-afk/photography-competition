'use.client'; // This will be handled by a client component file if needed, but we can do it directly in page.tsx by adding 'use client' at the top.
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Camera, Calendar, Trophy, ChevronDown, Sparkles } from 'lucide-react';
import SubmissionForm from '../components/SubmissionForm';
import SuccessScreen from '../components/SuccessScreen';

export default function Home() {
  const [submittedData, setSubmittedData] = useState<{
    id: string;
    fullName: string;
  } | null>(null);

  const handleSuccess = (submissionId: string, fullName: string) => {
    setSubmittedData({ id: submissionId, fullName });
    // Smooth scroll back to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSubmittedData(null);
  };

  const scrollToForm = () => {
    const element = document.getElementById('submission-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col bg-[#E6DED1] overflow-x-hidden font-sans">
      
      {/* 1. BRAND HEADER */}
      <header className="relative w-full py-5 px-6 flex justify-between items-center border-b-4 border-[#664436] bg-[#F9F6F0] z-20 shadow-sm select-none">
        <div className="flex items-center gap-3">
          {/* ṚUUT Logo Image */}
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
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#664436]">
          <span className="hidden sm:inline border-2 border-[#664436] px-4 py-1.5 rounded-full bg-[#EADBC8]/30">
            Contest Theme: The Anti Aesthetic
          </span>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative w-full min-h-[70vh] flex flex-col justify-center items-center py-16 px-4 bg-sunburst bg-halftone border-b-4 border-[#664436]">
        {/* Dark overlays to ensure text readability */}
        <div className="absolute inset-0 bg-[#664436]/10 pointer-events-none"></div>

        {/* Vintage Poster-Style Frame */}
        <div className="relative max-w-4xl w-full bg-[#F9F6F0] border-4 border-[#664436] rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col items-center text-center animate-fade-in mx-auto z-10">
          
          {/* Scalloped corner overlays */}
          <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-[#cc3a27] border-4 border-[#664436] z-10"></div>
          <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-[#cc3a27] border-4 border-[#664436] z-10"></div>
          <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-[#cc3a27] border-4 border-[#664436] z-10"></div>
          <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-[#cc3a27] border-4 border-[#664436] z-10"></div>

          {/* Dash border inside */}
          <div className="absolute inset-2 border-2 border-dashed border-[#895158]/35 rounded-2xl pointer-events-none"></div>

          {/* Logo Badge */}
          <div className="flex flex-col items-center gap-2 mb-4 select-none">
            {/* ṚUUT Logo Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/favicon-192x192.png"
              alt="ṚUUT Logo"
              className="w-16 h-16 object-contain"
            />
            <span className="text-xs font-bold uppercase tracking-widest text-[#895158]">
              ṚUUT Community Presents
            </span>
          </div>

          {/* Main Titles */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase text-[#664436] tracking-tight leading-none text-shadow-heavy select-none font-heading mb-2">
            PHOTOGRAPHY
            <br />
            CONTEST
          </h1>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-script text-[#e28d1c] text-shadow-orange select-none mt-2 rotate-[-2deg]">
            The anti aesthetic
          </h2>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#895158] mt-2 mb-6">
            "Make a Chaotic Spot Look Premium."
          </p>

          {/* Double Lines with Side Stripes */}
          <div className="flex items-center justify-between w-full max-w-lg mb-8 gap-4 select-none">
            <div className="w-16 h-8 bg-stripes-diagonal border-2 border-[#664436] rounded-md hidden sm:block"></div>
            <div className="flex-1 border-t-2 border-b-2 border-[#664436] py-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#895158]">
                Open For Submissions
              </span>
            </div>
            <div className="w-16 h-8 bg-stripes-diagonal border-2 border-[#664436] rounded-md hidden sm:block"></div>
          </div>

          {/* Brief / Description */}
          <p className="max-w-xl text-[#664436] font-semibold text-sm sm:text-base leading-relaxed mb-8">
            Reject standard lighting, symmetrical rules, and polished filters. Show us the beauty in awkward angles, weird crops, raw environments, and grainy compositions. Give us your best "anti-aesthetic" shot.
          </p>

          {/* Info grid (Prizes and Deadlines) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mb-8">
            
            {/* Prizes Card */}
            <div className="bg-[#EADBC8]/40 border-2 border-[#664436] rounded-2xl p-4 flex items-center gap-4 text-left select-none shadow-sm">
              <div className="p-3 bg-[#664436] text-[#F9F6F0] rounded-xl">
                <Trophy size={20} />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-[#895158] uppercase tracking-wider block">
                  Prizes & Awards
                </span>
                <span className="font-extrabold text-[#664436] text-sm sm:text-base leading-tight">
                  Jordan Shoes
                </span>
                <span className="text-xs text-[#664436]/70 block">
                  For the best Anti-Aesthetic entry
                </span>
              </div>
            </div>

            {/* Deadline Card */}
            <div className="bg-[#EADBC8]/40 border-2 border-[#664436] rounded-2xl p-4 flex items-center gap-4 text-left select-none shadow-sm">
              <div className="p-3 bg-[#664436] text-[#F9F6F0] rounded-xl">
                <Calendar size={20} />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-[#895158] uppercase tracking-wider block">
                  Submission Deadline
                </span>
                <span className="font-extrabold text-[#664436] text-sm sm:text-base leading-tight">
                  July 31, 2026
                </span>
                <span className="text-xs text-[#664436]/70 block">
                  Entries close 11:59 PM IST
                </span>
              </div>
            </div>

          </div>

          {/* CTA Button */}
          {!submittedData && (
            <button
              onClick={scrollToForm}
              className="py-4 px-10 bg-[#664436] text-[#F9F6F0] rounded-xl font-extrabold text-sm uppercase tracking-widest hover:bg-[#4A3324] active:scale-95 transition-all shadow-md flex items-center gap-2 hover:gap-3"
            >
              <span>Submit Your Entry</span>
              <ChevronDown size={16} />
            </button>
          )}


        </div>
      </section>

      {/* 2.5 RULES AND GUIDELINES SECTION */}
      <section className="relative w-full py-8 px-4 flex flex-col items-center justify-center z-10 max-w-4xl mx-auto select-none">
        <div className="w-full bg-[#F9F6F0] border-4 border-[#664436] rounded-3xl p-6 sm:p-8 shadow-md">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b-2 border-dashed border-[#664436]/20 pb-4 mb-6 gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#664436] font-heading">
                Rules & Guidelines
              </h2>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#895158]">
                Read carefully before submitting
              </p>
            </div>
            <Link
              href="/rules"
              className="text-xs font-black uppercase tracking-widest text-[#895158] hover:text-[#e28d1c] transition-colors border-2 border-[#895158] px-4 py-1.5 rounded-full hover:bg-[#895158] hover:text-[#F9F6F0] w-fit"
            >
              Open Full Rules Page
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#664436] font-semibold">
            {/* The Brief / Allowed */}
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-[#895158] mb-1">
                  The Brief
                </h3>
                <p className="text-xs leading-relaxed text-[#664436]/90 font-semibold">
                  Find an ordinary, chaotic, or "ugly" location in your city (e.g. packed street market, narrow alleyway, tea stall) and capture it using framing and lighting to make it look like a premium, luxury escape.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-[#895158] mb-1">
                  What is Allowed
                </h3>
                <ul className="list-disc pl-4 text-xs flex flex-col gap-1 text-[#664436]/90 font-bold">
                  <li>Photography from any device (Smartphone, DSLR, Film).</li>
                  <li>Lightroom color grading, exposure, crop adjustments.</li>
                </ul>
              </div>
            </div>

            {/* Timelines / Banned */}
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-[#895158] mb-1">
                  Strictly Prohibited
                </h3>
                <ul className="list-disc pl-4 text-xs flex flex-col gap-1 text-red-700 font-bold">
                  <li>AI-Generated Imagery: Zero-tolerance policy (Midjourney, generative fill, etc.).</li>
                  <li>Digital Manipulation: Do not add or remove physical objects.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-[#895158] mb-1">
                  Prizes
                </h3>
                <p className="text-xs leading-relaxed text-[#664436]/90 font-semibold">
                  **Grand Winner**: Jordan Shoes + ṚUUT Signature Hamper + permanent digital feature. **Runner-Up & Public Choice**: ṚUUT Signature Hampers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SUBMISSION FORM SECTION */}
      <section
        id="submission-section"
        className="relative w-full flex-1 py-16 px-4 bg-[#E6DED1] border-b-4 border-[#664436] z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none"></div>

        {submittedData ? (
          <SuccessScreen
            submissionId={submittedData.id}
            fullName={submittedData.fullName}
            onReset={handleReset}
          />
        ) : (
          <SubmissionForm onSuccess={handleSuccess} />
        )}
      </section>

      {/* 4. FOOTER */}
      <footer className="w-full py-10 px-6 bg-[#664436] text-[#F9F6F0] flex flex-col items-center justify-center text-center border-t-4 border-[#4A3324] select-none z-10 gap-4">
        <div className="flex items-center gap-3">
          {/* ṚUUT Logo Image */}
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
        <p className="text-[11px] text-[#F9F6F0]/60 max-w-md leading-relaxed">
          &copy; 2026 ṚUUT Inc. All rights reserved. Submissions are subject to terms of use and community guidelines. Creative ownership remains with the artist.
        </p>
      </footer>

    </main>
  );
}
