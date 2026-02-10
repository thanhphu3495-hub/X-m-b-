import React from 'react';
import { Lot } from '../types';

interface LotDisplayProps {
  lot: Lot;
  onReset: () => void;
}

const LotDisplay: React.FC<LotDisplayProps> = ({ lot, onReset }) => {
  const isGoodLuck = lot.luckLevel.includes("Thượng");
  const isBadLuck = lot.luckLevel.includes("Hạ");
  
  let borderColor = "border-stone-400";
  let titleColor = "text-stone-900";
  let badgeColor = "bg-stone-200 text-stone-800";

  if (isGoodLuck) {
    borderColor = "border-yellow-600";
    titleColor = "text-red-900";
    badgeColor = "bg-yellow-100 text-yellow-900";
  } else if (isBadLuck) {
    borderColor = "border-stone-500";
    titleColor = "text-stone-700";
    badgeColor = "bg-stone-200 text-stone-700";
  } else {
    // Trung Binh
    borderColor = "border-amber-700/50";
    titleColor = "text-amber-900";
    badgeColor = "bg-amber-100 text-amber-900";
  }

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
      <div className={`bg-[#fffbf0] rounded-lg shadow-xl overflow-hidden border-4 ${borderColor} relative`}>
        {/* Decorative corner patterns (simulated with CSS borders) */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-red-900/30 rounded-tl-lg pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-red-900/30 rounded-tr-lg pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-red-900/30 rounded-bl-lg pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-red-900/30 rounded-br-lg pointer-events-none"></div>

        <div className="p-8 text-center">
          <span className={`inline-block px-5 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4 ${badgeColor} border border-current opacity-90`}>
            {lot.luckLevel}
          </span>
          
          <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${titleColor} uppercase font-serif tracking-widest drop-shadow-sm`}>
            {lot.title}
          </h2>

          {/* Poems Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-8 text-left">
            {/* Chinese & Hán Việt */}
            <div className="bg-white/60 p-6 rounded-lg border border-stone-300 shadow-sm">
              <h3 className="text-stone-600 text-xs font-bold uppercase tracking-widest mb-4 text-center border-b border-stone-200 pb-2">Chữ Hán & Phiên Âm</h3>
              <div className="space-y-5">
                {lot.chinesePoem.map((line, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-2xl chinese-text text-black font-medium mb-1">{line}</p>
                    <p className="text-base text-stone-700 italic font-serif font-semibold">{lot.hanVietPoem[idx] || ""}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Translation */}
            <div className="bg-white/60 p-6 rounded-lg border border-stone-300 shadow-sm flex flex-col justify-center">
               <h3 className="text-stone-600 text-xs font-bold uppercase tracking-widest mb-4 text-center border-b border-stone-200 pb-2">Dịch Thơ</h3>
               <div className="space-y-3">
                {lot.translationPoem.map((line, idx) => (
                  <p key={idx} className="text-lg text-stone-900 font-serif text-center leading-relaxed font-semibold">
                    {line}
                  </p>
                ))}
               </div>
            </div>
          </div>

          <div className="h-px w-2/3 mx-auto bg-stone-300 mb-8"></div>

          {/* Interpretation */}
          <div className="mb-8 text-left bg-stone-50 p-6 rounded-lg border border-stone-300 shadow-sm">
             <h3 className="text-red-900 text-lg font-bold uppercase mb-4 flex items-center">
               <span className="w-1.5 h-6 bg-red-800 mr-3 block rounded-sm"></span>
               Giải Nghĩa
             </h3>
             <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                {lot.interpretation.map((item, idx) => (
                  <li key={idx} className="flex items-start text-stone-800 font-medium text-lg">
                    <span className="text-red-800 mr-2 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
             </ul>
          </div>

          {/* Commentary */}
          <div className="text-left bg-yellow-50/80 p-6 rounded-lg border border-yellow-200 shadow-sm">
             <h3 className="text-red-900 text-lg font-bold uppercase mb-4 flex items-center">
               <span className="w-1.5 h-6 bg-yellow-600 mr-3 block rounded-sm"></span>
               Lời Bàn
             </h3>
             <p className="text-stone-900 leading-8 text-justify font-serif font-medium text-lg">
               {lot.commentary}
             </p>
          </div>

          <div className="mt-12">
            <button 
              onClick={onReset}
              className="px-8 py-3 bg-red-900 hover:bg-red-950 text-white font-bold rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center mx-auto border-2 border-red-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Gieo Quẻ Khác
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LotDisplay;