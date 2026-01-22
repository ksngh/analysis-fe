
import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onLogoClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#ecf3e7] px-6 py-3">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-8">
        <div 
          className="flex items-center gap-3 shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={onLogoClick}
        >
          <div className="w-8 h-8 bg-[#6dec13] rounded-lg flex items-center justify-center text-white">
             <span className="font-bold text-xs">O</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">OliveRank</h1>
        </div>

        <div className="flex-1 max-w-xl">
          <label className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-[#6c9a4c]" />
            <input
              className="w-full h-10 pl-12 pr-4 bg-[#ecf3e7] border-none rounded-lg focus:ring-2 focus:ring-[#6dec13]/50 placeholder-[#6c9a4c] text-sm"
              placeholder="브랜드, 상품명 또는 카테고리를 검색하세요..."
              type="text"
            />
          </label>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[#6dec13] rounded-full animate-pulse"></span>
              <p className="text-[11px] text-[#6c9a4c] font-bold">실시간 분석 엔진 가동 중</p>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-2 border-l border-[#ecf3e7] pl-6">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div 
                className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-white shadow-sm group-hover:border-[#6dec13] transition-all"
                style={{ backgroundImage: 'url("https://picsum.photos/seed/user/100/100")' }}
              ></div>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
