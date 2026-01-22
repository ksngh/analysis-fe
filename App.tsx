
import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RankTrendChart from './components/RankTrendChart';
import RankTable from './components/RankTable';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f8f6]">
      <Header />
      
      <div className="flex flex-1 max-w-[1600px] mx-auto w-full">
        <Sidebar />
        
        <main className="flex-1 p-8 overflow-x-hidden">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-5 rounded-2xl border border-[#ecf3e7] shadow-sm hover:shadow-md transition-shadow">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#6c9a4c]">총 상품</p>
              <div className="flex items-baseline justify-between mt-2">
                <h4 className="text-3xl font-black text-gray-900">1,284</h4>
                <span className="text-[11px] font-black text-[#6dec13] bg-[#6dec13]/10 px-2 py-0.5 rounded-full">
                  오늘 신규 12개
                </span>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#ecf3e7] shadow-sm hover:shadow-md transition-shadow">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#6c9a4c]">상위 카테고리</p>
              <div className="flex items-baseline justify-between mt-2">
                <h4 className="text-3xl font-black text-gray-900">스킨케어</h4>
                <span className="text-[11px] font-bold text-[#6c9a4c]">상위 100개 중 42%</span>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#ecf3e7] shadow-sm hover:shadow-md transition-shadow">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#6c9a4c]">시장 변동성</p>
              <div className="flex items-baseline justify-between mt-2">
                <h4 className="text-3xl font-black text-gray-900">높음</h4>
                <span className="text-[11px] font-black text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">
                  1시간 내 순위 교체 85회
                </span>
              </div>
            </div>
          </div>

          <RankTrendChart />
          
          <RankTable />

          {/* Footer / Pagination */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs font-bold text-[#6c9a4c]">총 1,284개 중 1-10개 표시</p>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-5 py-2.5 bg-white border border-[#ecf3e7] rounded-xl text-sm font-bold text-gray-400 cursor-not-allowed shadow-sm">
                <ChevronLeft className="w-4 h-4" /> 이전
              </button>
              <button className="flex items-center gap-1 px-5 py-2.5 bg-white border border-[#ecf3e7] rounded-xl text-sm font-bold text-gray-900 hover:bg-[#ecf3e7] transition-colors shadow-sm active:scale-95">
                다음 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
