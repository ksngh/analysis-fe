
import React, { useEffect } from 'react';
import { X, TrendingUp, TrendingDown, ExternalLink, FileText } from 'lucide-react';
import { Product } from '../types';
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip } from 'recharts';

interface ProductDetailPanelProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onViewDetail?: (product: Product) => void;
}

const detailChartData = [
  { time: '00:00', rank: 5 },
  { time: '04:00', rank: 4 },
  { time: '08:00', rank: 6 },
  { time: '12:00', rank: 3 },
  { time: '16:00', rank: 4 },
  { time: '20:00', rank: 3 },
  { time: 'NOW', rank: 3 },
];

// Fixed typo: ProductDetailPanelPanelProps -> ProductDetailPanelProps
const ProductDetailPanel: React.FC<ProductDetailPanelProps> = ({ product, isOpen, onClose, onViewDetail }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!product) return null;

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[110] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div className={`fixed top-0 right-0 h-full w-full max-w-[480px] bg-white z-[120] shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">상품 요약 정보</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="aspect-[4/3] w-full rounded-2xl bg-gray-50 overflow-hidden shadow-inner border border-gray-100">
            <img 
              src={product.imageUrl.replace('100/100', '600/450')}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <p className="text-[#6c9a4c] text-xs font-bold uppercase tracking-wider mb-1">{product.brand}</p>
            <h3 className="text-2xl font-bold text-gray-900 leading-tight">{product.name}</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">현재 순위</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-gray-900">#{product.rank}</span>
                {product.change > 0 && (
                  <span className="text-xs font-bold text-[#6dec13] flex items-center">
                    <TrendingUp className="w-3 h-3 mr-0.5" /> 2%
                  </span>
                )}
              </div>
            </div>
            <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">24시간 변동</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-gray-900">
                  {product.change > 0 ? `+${product.change}` : product.change}
                </span>
                <span className="text-xs font-bold text-gray-400 uppercase">순위</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-gray-900">최근 순위 변화</h4>
              <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">실시간</span>
            </div>
            <div className="h-40 w-full bg-white rounded-2xl border border-gray-50 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={detailChartData}>
                  <Line 
                    type="monotone" 
                    dataKey="rank" 
                    stroke="#6dec13" 
                    strokeWidth={3} 
                    dot={{ fill: '#6dec13', strokeWidth: 2, r: 4, stroke: '#fff' }}
                    activeDot={{ r: 6 }}
                  />
                  <YAxis hide reversed domain={['dataMin - 1', 'dataMax + 1']} />
                  <XAxis dataKey="time" hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    labelStyle={{ fontWeight: 'bold' }}
                    formatter={(value) => [`${value}위`, '순위']}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex flex-col gap-3">
          <button 
            onClick={() => onViewDetail && onViewDetail(product)}
            className="w-full py-4 bg-gray-900 text-[#6dec13] font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl shadow-gray-200"
          >
            <FileText className="w-5 h-5" /> 상품 설명 자세히 보기
          </button>
          <button className="w-full py-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
             올리브영 쇼핑몰 이동 <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPanel;
