
import React, { useState } from 'react';
import { Store, Package, ChevronRight, Settings2, PlusCircle, Filter, Clock } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';

interface MyBrandViewProps {
  onProductClick: (product: Product) => void;
}

const MyBrandView: React.FC<MyBrandViewProps> = ({ onProductClick }) => {
  // 브랜드 목록
  const availableBrands = Array.from(new Set(MOCK_PRODUCTS.map(p => p.brand)));
  // 기본 선택 브랜드를 데이터 기반으로 초기화하여 빈 화면이 나오지 않게 함
  const [myBrand, setMyBrand] = useState<string>(availableBrands[0] ?? '');
  
  // 현재 내 브랜드의 상품들만 필터링
  const myProducts = MOCK_PRODUCTS.filter(p => p.brand === myBrand);
  
  return (
    <div className="animate-in fade-in duration-500">
      {/* Brand Selection Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center text-[#6dec13] shadow-2xl relative">
            <Store className="w-8 h-8" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#6dec13] rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">{myBrand} 브랜드 대시보드</h2>
              <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors group">
                <Settings2 className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              </button>
            </div>
            <p className="text-sm font-bold text-[#6c9a4c]">브랜드의 전체 상품 라인업과 개별 성과를 한눈에 관리하세요.</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-[#ecf3e7] shadow-sm">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">분석 브랜드</span>
            <select 
              value={myBrand}
              onChange={(e) => setMyBrand(e.target.value)}
              className="bg-transparent border-none rounded-lg text-sm font-black focus:ring-0 outline-none min-w-[120px] cursor-pointer"
            >
              {availableBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-[#6dec13] font-black rounded-xl text-sm hover:scale-105 transition-all active:scale-95 shadow-xl shadow-gray-200">
            <PlusCircle className="w-4 h-4" /> 신규 상품 등록
          </button>
        </div>
      </div>

      {/* Simplified Highlight Section */}
      <div className="mb-10">
        <div className="bg-white p-8 rounded-[2.5rem] border border-[#ecf3e7] shadow-sm flex items-center justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#6dec13]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-[#6dec13]/10 transition-colors"></div>
          
          <div className="flex items-center gap-8 relative z-10">
            <div className="w-20 h-20 bg-[#6dec13]/10 rounded-3xl flex items-center justify-center text-[#6dec13] shadow-inner">
              <Package className="w-10 h-10" />
            </div>
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6dec13]"></div>
                등록 상품 현황
              </p>
              <h4 className="text-4xl font-black text-gray-900 tracking-tighter">
                총 {myProducts.length}개의 상품 <span className="text-lg font-bold text-[#6c9a4c] ml-2">분석 중</span>
              </h4>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 relative z-10 pr-4">
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">데이터 동기화</p>
              <div className="flex items-center gap-2 justify-end">
                <Clock className="w-3 h-3 text-[#6dec13]" />
                <p className="text-sm font-black text-gray-900">실시간 매칭 완료</p>
              </div>
            </div>
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 shadow-sm">
              <div className="w-2 h-2 bg-[#6dec13] rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </div>

      {/* My Products Table */}
      <div className="bg-white rounded-[3rem] border border-[#ecf3e7] shadow-sm overflow-hidden mb-12">
        <div className="p-8 border-b border-[#ecf3e7] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/20">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-black text-gray-900">전체 상품 리스트</h3>
            <span className="bg-gray-100 text-gray-400 text-[10px] font-black px-2 py-0.5 rounded-lg border border-gray-200">Total {myProducts.length}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#ecf3e7] rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
              <Filter className="w-3.5 h-3.5 text-[#6c9a4c]" /> 스마트 필터
            </button>
            <button className="text-sm font-bold text-[#6c9a4c] hover:underline flex items-center gap-1 px-2">
              성과 리포트 추출 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white">
                <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">순위</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">상품 정보</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">카테고리</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">판매 가격</th>
                <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">성과 변동</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f6ef]">
              {myProducts.length > 0 ? (
                myProducts.map((product) => (
                  <tr 
                    key={product.rank} 
                    className="hover:bg-[#6dec13]/5 transition-all cursor-pointer group"
                    onClick={() => onProductClick(product)}
                  >
                    <td className="px-10 py-7">
                      <span className="text-2xl font-black text-gray-900 tracking-tighter group-hover:text-[#6dec13] transition-colors">#{product.rank}</span>
                    </td>
                    <td className="px-8 py-7">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-gray-100 shadow-md bg-white shrink-0 group-hover:scale-110 transition-transform duration-500">
                          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-gray-900 group-hover:text-black transition-colors leading-snug max-w-[320px]">{product.name}</span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{product.brand}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-7">
                      <span className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-black text-gray-500 group-hover:bg-white transition-colors">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-8 py-7">
                      <p className="text-sm font-black text-gray-900">₩{product.price.toLocaleString()}</p>
                    </td>
                    <td className="px-10 py-7 text-right">
                      <span className={`text-sm font-black inline-flex items-center px-3 py-1.5 rounded-xl ${
                        product.change > 0 ? 'text-[#6dec13] bg-[#6dec13]/10' : 
                        product.change < 0 ? 'text-red-500 bg-red-50' : 
                        'text-gray-400 bg-gray-50'
                      }`}>
                        {product.change > 0 ? `↑ ${product.change}` : product.change === 0 ? '-' : `↓ ${Math.abs(product.change)}`}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                        <Package className="w-10 h-10 text-gray-200" />
                      </div>
                      <p className="text-gray-400 font-bold">등록된 브랜드 상품이 없습니다.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBrandView;
