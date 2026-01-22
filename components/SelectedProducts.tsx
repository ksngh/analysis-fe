
import React from 'react';
import { X } from 'lucide-react';
import { Product } from '../types';

interface SelectedProductsProps {
  selectedProducts: Product[];
  onRemove: (rank: number) => void;
  onClearAll: () => void;
}

const SelectedProducts: React.FC<SelectedProductsProps> = ({ selectedProducts, onRemove, onClearAll }) => {
  if (selectedProducts.length === 0) return null;

  return (
    <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[11px] font-extrabold uppercase tracking-widest text-[#6c9a4c]">
          선택된 상품 ({selectedProducts.length})
        </h3>
        <button 
          onClick={onClearAll}
          className="text-[11px] font-bold text-gray-400 hover:text-red-500 transition-colors"
        >
          전체 해제
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedProducts.map((product) => (
          <div 
            key={product.rank}
            className="inline-flex items-center gap-1.5 bg-white border border-[#ecf3e7] pl-3 pr-2 py-1.5 rounded-xl shadow-sm group hover:border-[#6dec13] transition-all cursor-default"
          >
            <span className="text-[12px] font-bold text-gray-700">{product.name}</span>
            <button 
              onClick={() => onRemove(product.rank)}
              className="p-0.5 hover:bg-red-50 rounded-md transition-colors group-hover:text-red-500 text-gray-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedProducts;
