
import React from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { TrendingUp, TrendingDown, Minus, Check } from 'lucide-react';
import { Product } from '../types';

interface RankTableProps {
  selectedRanks: number[];
  onToggleSelect: (rank: number) => void;
  onSelectAll: (allRanks: number[]) => void;
  onProductClick: (product: Product) => void;
}

const RankTable: React.FC<RankTableProps> = ({ selectedRanks, onToggleSelect, onSelectAll, onProductClick }) => {
  const allRanks = MOCK_PRODUCTS.map(p => p.rank);
  const isAllSelected = selectedRanks.length === allRanks.length;

  const handleHeaderCheckbox = () => {
    if (isAllSelected) {
      onSelectAll([]);
    } else {
      onSelectAll(allRanks);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#ecf3e7] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f7f8f6] border-b border-[#ecf3e7]">
              <th className="px-6 py-4 w-12 text-center">
                <div 
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${
                    isAllSelected ? 'bg-[#6dec13] border-[#6dec13]' : 'bg-white border-gray-300'
                  }`}
                  onClick={handleHeaderCheckbox}
                >
                  {isAllSelected && <Check className="w-3.5 h-3.5 text-white stroke-[4]" />}
                </div>
              </th>
              <th className="px-2 py-4 text-[10px] font-bold uppercase tracking-wider text-[#6c9a4c]">순위</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-[#6c9a4c]">상품명</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-[#6c9a4c]">브랜드</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-[#6c9a4c]">카테고리</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-[#6c9a4c]">가격</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-[#6c9a4c] text-right">변동</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ecf3e7]">
            {MOCK_PRODUCTS.map((product) => {
              const isSelected = selectedRanks.includes(product.rank);
              return (
                <tr 
                  key={product.rank} 
                  className={`transition-colors group cursor-pointer ${
                    isSelected ? 'bg-[#6dec13]/5' : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-5 text-center">
                    <div 
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${
                        isSelected ? 'bg-[#6dec13] border-[#6dec13]' : 'bg-white border-gray-200 group-hover:border-gray-400'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSelect(product.rank);
                      }}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[4]" />}
                    </div>
                  </td>
                  <td className="px-2 py-5" onClick={() => onProductClick(product)}>
                    <span className="text-xl font-black text-gray-900 leading-none">{product.rank}</span>
                  </td>
                  <td className="px-6 py-5" onClick={() => onProductClick(product)}>
                    <div className="flex items-center gap-4 min-w-[300px]">
                      <div className="w-12 h-12 bg-white rounded-xl overflow-hidden shrink-0 shadow-inner border border-gray-100">
                        <img className="w-full h-full object-cover" src={product.imageUrl} alt={product.name} />
                      </div>
                      <span className="font-bold text-sm text-gray-800 leading-tight">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-semibold text-gray-600" onClick={() => onProductClick(product)}>
                    {product.brand}
                  </td>
                  <td className="px-6 py-5" onClick={() => onProductClick(product)}>
                    <span className="px-3 py-1 bg-white border border-gray-100 rounded-lg text-[10px] font-bold text-gray-500">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-black text-gray-900" onClick={() => onProductClick(product)}>
                    ₩{product.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-5 text-right" onClick={() => onProductClick(product)}>
                    {product.change > 0 ? (
                      <span className="text-[#6dec13] text-sm font-black flex items-center justify-end gap-0.5">
                        <TrendingUp className="w-4 h-4" /> {product.change}
                      </span>
                    ) : product.change < 0 ? (
                      <span className="text-red-500 text-sm font-black flex items-center justify-end gap-0.5">
                        <TrendingDown className="w-4 h-4" /> {Math.abs(product.change)}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm font-black">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankTable;
