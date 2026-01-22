
import React from 'react';
import { Search, Bell, ChevronDown, Calendar } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#ecf3e7] px-6 py-3">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-8">
        <div className="flex items-center gap-3 shrink-0">
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
              placeholder="브랜드, 상품, 카테고리 검색..."
              type="text"
            />
          </label>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#ecf3e7] rounded-lg cursor-pointer">
            <Calendar className="w-4 h-4 text-[#6c9a4c]" />
            <span className="text-xs font-semibold text-gray-700">2023.10.24 - 최근 24시간</span>
            <ChevronDown className="w-4 h-4 text-[#6c9a4c]" />
          </div>
          
          <div className="hidden md:flex flex-col items-end">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[#6dec13] rounded-full"></span>
              <p className="text-[11px] text-[#6c9a4c] font-bold">마지막 업데이트: 5분 전</p>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-2">
            <button className="p-2 bg-[#ecf3e7] rounded-lg hover:bg-[#6dec13]/20 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <div 
              className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-white shadow-sm"
              style={{ backgroundImage: 'url("https://picsum.photos/seed/user/100/100")' }}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
