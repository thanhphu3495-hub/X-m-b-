import React, { useState } from 'react';
import { getLotData } from './data';
import LotDisplay from './components/LotDisplay';

function App() {
  const [lotNumber, setLotNumber] = useState<string>('');
  const [selectedLotId, setSelectedLotId] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [isShaking, setIsShaking] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow only numbers
    if (val === '' || /^\d+$/.test(val)) {
      setLotNumber(val);
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processLotNumber(parseInt(lotNumber));
  };

  const processLotNumber = (num: number) => {
    if (!num || num < 1 || num > 100) {
      setError('Vui lòng nhập số từ 1 đến 100');
      return;
    }
    
    setIsShaking(true);
    // Simulate a "thinking" or "shaking" delay
    setTimeout(() => {
      setSelectedLotId(num);
      setIsShaking(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  const handleRandom = () => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    setLotNumber(randomNum.toString());
    processLotNumber(randomNum);
  };

  const handleReset = () => {
    setSelectedLotId(null);
    setLotNumber('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] bg-fixed flex flex-col items-center py-10 px-4 text-stone-900">
      
      {/* Header */}
      <header className="mb-12 text-center">
        <div className="inline-block p-4 border-b-4 border-double border-red-900 mb-4">
           <h1 className="text-4xl md:text-6xl font-bold text-red-900 uppercase tracking-widest font-serif drop-shadow-sm">
             Xăm Bà
           </h1>
        </div>
        <p className="text-stone-700 italic font-serif text-xl font-medium">
          Trăm quẻ xăm linh nghiệm - Thánh Mẫu
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl">
        {!selectedLotId ? (
          <div className={`transition-all duration-500 ${isShaking ? 'animate-bounce' : ''}`}>
            
            <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl border border-stone-300 max-w-lg mx-auto text-center">
              
              <div className="mb-8">
                <div className="w-24 h-24 bg-red-900 rounded-full mx-auto flex items-center justify-center shadow-inner mb-4">
                  <span className="text-5xl text-yellow-400 font-serif font-bold">
                    {lotNumber || "?"}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-stone-800 uppercase mb-2">Xin Xăm</h2>
                <p className="text-stone-600 font-medium">Nhập số quẻ bạn đã gieo được (01 - 100)</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                   <input
                    type="number"
                    min="1"
                    max="100"
                    value={lotNumber}
                    onChange={handleInputChange}
                    placeholder="Nhập số..."
                    className="w-full text-center text-4xl font-bold py-4 border-b-2 border-stone-400 focus:border-red-900 bg-transparent outline-none transition-colors placeholder:text-stone-400 placeholder:font-medium text-stone-900"
                  />
                  {error && <p className="text-red-700 font-medium text-sm mt-2 absolute w-full left-0">{error}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                   <button
                    type="button"
                    onClick={handleRandom}
                    className="py-3 px-4 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg font-bold transition-colors border border-stone-300"
                  >
                    Gieo Ngẫu Nhiên
                  </button>
                  <button
                    type="submit"
                    className="py-3 px-4 bg-red-900 hover:bg-red-950 text-yellow-50 rounded-lg font-bold shadow-md transition-transform transform active:scale-95 border border-red-900"
                  >
                    Xem Luận Giải
                  </button>
                </div>
              </form>
              
              <div className="mt-8 text-sm font-medium text-stone-500 border-t border-stone-200 pt-4 italic">
                * Thành tâm khấn nguyện trước khi gieo quẻ
              </div>
            </div>
          </div>
        ) : (
          <LotDisplay lot={getLotData(selectedLotId)} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center text-stone-600 text-sm font-serif font-medium">
        <p>© {new Date().getFullYear()} 100 Quẻ Xăm Bà. Dữ liệu sưu tầm.</p>
      </footer>
    </div>
  );
}

export default App;