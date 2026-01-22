
import React from 'react';
import { Layers, Award, Tag, BarChart3, ChevronDown } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 shrink-0 border-r border-[#ecf3e7] p-6 hidden lg:flex flex-col gap-8 bg-white/50">
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#6c9a4c] mb-4">필터</h3>
        <div className="space-y-1">
          <div className="flex items-center justify-between p-2.5 bg-[#6dec13]/10 text-[#2a4519] rounded-lg text-sm font-bold">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>카테고리</span>
            </div>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between p-2.5 hover:bg-[#ecf3e7] rounded-lg text-sm font-medium text-gray-600 transition-colors cursor-pointer">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>브랜드</span>
            </div>
            <span className="text-[10px] bg-[#ecf3e7] px-1.5 py-0.5 rounded font-bold">12</span>
          </div>
          <div className="flex items-center justify-between p-2.5 hover:bg-[#ecf3e7] rounded-lg text-sm font-medium text-gray-600 transition-colors cursor-pointer">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span>가격대</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-2.5 hover:bg-[#ecf3e7] rounded-lg text-sm font-medium text-gray-600 transition-colors cursor-pointer">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span>순위 범위</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#6c9a4c] mb-4">정렬</h3>
        <div className="relative">
          <select className="w-full bg-[#ecf3e7] border-none rounded-lg text-sm font-semibold text-gray-700 py-2.5 pl-3 pr-8 appearance-none focus:ring-2 focus:ring-[#6dec13]/50">
            <option>현재 순위</option>
            <option>상승 TOP</option>
            <option>하락 TOP</option>
            <option>가격: 낮은 순</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6c9a4c] pointer-events-none" />
        </div>
      </div>

      <div className="mt-auto space-y-2">
        <button className="w-full py-3 bg-[#6dec13] text-gray-900 font-bold rounded-xl shadow-lg shadow-[#6dec13]/20 hover:opacity-90 transition-all active:scale-95">
          필터 적용
        </button>
        <button className="w-full py-2 text-[#6c9a4c] text-xs font-bold hover:underline">
          전체 초기화
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
