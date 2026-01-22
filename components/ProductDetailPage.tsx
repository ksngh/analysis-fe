
import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Package, Truck, Info, Star, Calendar } from 'lucide-react';
import { Product } from '../types';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onBack }) => {
  const [chartRange, setChartRange] = useState<'24h' | '7d' | '30d' | '365d'>('24h');

  // 기간별 더미 데이터 생성 로직 (시각적 차이를 위해 기간별로 살짝 다르게)
  const getHistoryData = (range: string) => {
    const base = [
      { label: '6단계 전', rank: 12 },
      { label: '5단계 전', rank: 8 },
      { label: '4단계 전', rank: 10 },
      { label: '3단계 전', rank: 5 },
      { label: '2단계 전', rank: 3 },
      { label: '1단계 전', rank: 2 },
      { label: '현재', rank: product.rank },
    ];
    
    // 단순 데모용: 기간에 따라 데이터를 약간 변형
    if (range === '24h') return base.map(d => ({ ...d, label: d.label.replace('단계 전', '시간 전') }));
    if (range === '7d') return base.map(d => ({ ...d, label: d.label.replace('단계 전', '일 전'), rank: d.rank + 2 }));
    if (range === '30d') return base.map(d => ({ ...d, label: d.label.replace('단계 전', '일 전'), rank: Math.max(1, d.rank + 5) }));
    return base.map(d => ({ ...d, label: d.label.replace('단계 전', '개월 전'), rank: Math.max(1, d.rank + 10) }));
  };

  const currentData = getHistoryData(chartRange);

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#6c9a4c] font-black text-sm mb-12 hover:-translate-x-1 transition-transform"
        >
          <ArrowLeft className="w-4 h-4" /> 목록으로 돌아가기
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Image & Quick Stats */}
          <div className="space-y-8">
            <div className="aspect-square bg-[#f7f8f6] rounded-[3rem] overflow-hidden shadow-2xl border border-[#ecf3e7]">
              <img 
                src={product.imageUrl.replace('100/100', '800/800')} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#f7f8f6] p-6 rounded-3xl text-center">
                <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2 fill-yellow-400" />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">평점</p>
                <p className="text-xl font-black text-gray-900">4.8 / 5.0</p>
              </div>
              <div className="bg-[#f7f8f6] p-6 rounded-3xl text-center">
                <Package className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">누적 판매</p>
                <p className="text-xl font-black text-gray-900">1.2만+</p>
              </div>
              <div className="bg-[#f7f8f6] p-6 rounded-3xl text-center">
                <Truck className="w-6 h-6 text-[#6dec13] mx-auto mb-2" />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">무료 배송</p>
                <p className="text-xl font-black text-gray-900">오늘드림</p>
              </div>
            </div>
          </div>

          {/* Right: Info & Analytics */}
          <div className="flex flex-col">
            <div className="mb-4 flex items-center gap-2">
              <span className="px-3 py-1 bg-[#6dec13]/10 text-[#2a4519] rounded-full text-[10px] font-black uppercase tracking-wider border border-[#6dec13]/20">
                {product.category}
              </span>
              <span className="text-xs font-bold text-gray-300">|</span>
              <span className="text-xs font-bold text-gray-400">{product.brand}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-10">
              <p className="text-4xl font-black text-gray-900">₩{product.price.toLocaleString()}</p>
              <div className="h-8 w-px bg-gray-100 mx-2"></div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">현재 순위</p>
                <p className="text-2xl font-black text-[#6dec13]">{product.rank}위</p>
              </div>
            </div>

            <div className="space-y-10">
              {/* Description */}
              <div className="bg-white border-l-4 border-[#6dec13] pl-6 py-2">
                <h4 className="text-sm font-black text-gray-900 flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-[#6dec13]" /> 상품 핵심 정보
                </h4>
                <p className="text-gray-500 font-medium leading-relaxed">
                  이 제품은 {product.brand}의 베스트셀러로, {product.category} 카테고리에서 독보적인 점유율을 기록하고 있습니다. 
                  고객들의 실제 리뷰 데이터 분석 결과, "발림성"과 "가성비" 측면에서 가장 높은 만족도를 보이고 있으며, 
                  데이터 엔진 분석 결과 향후 순위권 유지가 매우 유력합니다.
                </p>
              </div>

              {/* Weekly Trend Chart with Tabs */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#6dec13]" /> 순위 변동 추이
                  </h4>
                  <div className="flex p-1 bg-gray-100 rounded-xl">
                    {(['24h', '7d', '30d', '365d'] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setChartRange(r)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                          chartRange === r ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        {r === '24h' ? '24시간' : r === '7d' ? '7일' : r === '30d' ? '30일' : '365일'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-48 w-full bg-[#f7f8f6] rounded-[2rem] p-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={currentData}>
                      <defs>
                        <linearGradient id="colorRankDetail" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6dec13" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#6dec13" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="label" hide />
                      <YAxis hide reversed domain={['dataMin - 5', 'dataMax + 5']} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        labelStyle={{ fontWeight: 'black', color: '#111' }}
                        formatter={(value) => [`${value}위`, '순위']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="rank" 
                        stroke="#6dec13" 
                        strokeWidth={4} 
                        fillOpacity={1} 
                        fill="url(#colorRankDetail)" 
                        dot={{ r: 4, fill: '#6dec13', strokeWidth: 2, stroke: '#fff' }}
                        animationDuration={800}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-8 flex flex-col sm:flex-row gap-4">
                <button className="flex-1 py-5 bg-gray-900 text-white font-black rounded-3xl flex items-center justify-center gap-3 shadow-2xl hover:bg-black transition-colors">
                  올리브영 바로가기 <ExternalLink className="w-5 h-5" />
                </button>
                <button className="px-10 py-5 bg-white border border-gray-200 text-gray-600 font-black rounded-3xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors">
                  관심목록 추가
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
