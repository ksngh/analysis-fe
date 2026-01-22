
import React from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const RankTable: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#ecf3e7] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f7f8f6] border-b border-[#ecf3e7]">
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-[#6c9a4c]">순위</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-[#6c9a4c]">상품명</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-[#6c9a4c]">브랜드</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-[#6c9a4c]">카테고리</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-[#6c9a4c]">가격</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-[#6c9a4c]">1시간 변동</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ecf3e7]">
            {MOCK_PRODUCTS.map((product) => (
              <tr key={product.rank} className="hover:bg-[#6dec13]/5 transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-900">{product.rank}</span>
                    {product.change > 0 && <TrendingUp className="w-4 h-4 text-[#6dec13]" />}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3 min-w-[300px]">
                    <div className="w-12 h-12 bg-[#ecf3e7] rounded-xl overflow-hidden shrink-0 shadow-inner">
                      <img className="w-full h-full object-cover" src={product.imageUrl} alt={product.name} />
                    </div>
                    <span className="font-bold text-sm text-gray-800 leading-tight">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-600">{product.brand}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-[#ecf3e7] rounded-full text-[10px] font-bold text-[#2a4519]">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-black text-gray-900">
                  ₩{product.price.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  {product.change > 0 ? (
                    <span className="text-[#6dec13] text-sm font-black flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" /> {product.change}
                    </span>
                  ) : product.change < 0 ? (
                    <span className="text-red-500 text-sm font-black flex items-center gap-1">
                      <TrendingDown className="w-4 h-4" /> {Math.abs(product.change)}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm font-black flex items-center gap-1">
                      <Minus className="w-4 h-4" />
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankTable;
