
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RankTrendChart from './components/RankTrendChart';
import RankTable from './components/RankTable';
import AIChat from './components/AIChat';
import ProductDetailPanel from './components/ProductDetailPanel';
import LandingPage from './components/LandingPage';
import ProductDetailPage from './components/ProductDetailPage';
import SelectedProducts from './components/SelectedProducts';
import MyBrandView from './components/MyBrandView';
import AdAnalyticsView from './components/AdAnalyticsView';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from './types';
import { MOCK_PRODUCTS } from './constants';

export type ViewState = 'landing' | 'dashboard' | 'detail' | 'my-brand' | 'ad-analytics';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '365d'>('24h');
  
  const [selectedRanks, setSelectedRanks] = useState<number[]>([1, 3]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsPanelOpen(true);
  };

  const handleGoToDetail = (product: Product) => {
    setSelectedProduct(product);
    setIsPanelOpen(false);
    setView('detail');
    window.scrollTo(0, 0);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  const toggleSelect = (rank: number) => {
    setSelectedRanks(prev => 
      prev.includes(rank) ? prev.filter(r => r !== rank) : [...prev, rank]
    );
  };

  const handleSelectAll = (ranks: number[]) => {
    setSelectedRanks(ranks);
  };

  const selectedProductList = MOCK_PRODUCTS.filter(p => selectedRanks.includes(p.rank));

  const navigateTo = (newView: ViewState) => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  if (view === 'landing') {
    return <LandingPage onStart={() => setView('dashboard')} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f8f6]">
      <Header 
        onLogoClick={() => navigateTo('landing')} 
        onNavigate={navigateTo}
      />
      
      <div className="flex flex-1 max-w-[1600px] mx-auto w-full">
        {view !== 'detail' && <Sidebar onNavigate={navigateTo} currentView={view} />}
        
        <main className={`flex-1 p-8 overflow-x-hidden ${view === 'detail' ? 'max-w-7xl mx-auto w-full' : ''}`}>
          {view === 'dashboard' && (
            <>
              <div className="flex items-center gap-2 mb-8 bg-white p-1 rounded-2xl border border-[#ecf3e7] w-fit shadow-sm">
                {(['24h', '7d', '30d', '365d'] as const).map((id) => (
                  <button
                    key={id}
                    onClick={() => setTimeRange(id)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${
                      timeRange === id 
                        ? 'bg-[#6dec13] text-gray-900 shadow-lg shadow-[#6dec13]/20' 
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {id === '24h' ? '24시간' : id === '7d' ? '7일' : id === '30d' ? '30일' : '365일'}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-5 rounded-2xl border border-[#ecf3e7] shadow-sm">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#6c9a4c]">전체 등록 상품</p>
                  <div className="flex items-baseline justify-between mt-2">
                    <h4 className="text-3xl font-black text-gray-900">1,284</h4>
                    <span className="text-[11px] font-black text-[#6dec13] bg-[#6dec13]/10 px-2 py-0.5 rounded-full">오늘 +12개 추가</span>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-[#ecf3e7] shadow-sm">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#6c9a4c]">인기 카테고리</p>
                  <div className="flex items-baseline justify-between mt-2">
                    <h4 className="text-3xl font-black text-gray-900">스킨케어</h4>
                    <span className="text-[11px] font-bold text-[#6c9a4c]">상위 100개 중 42%</span>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-[#ecf3e7] shadow-sm">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#6c9a4c]">시장 변동성</p>
                  <div className="flex items-baseline justify-between mt-2">
                    <h4 className="text-3xl font-black text-gray-900">높음</h4>
                    <span className="text-[11px] font-black text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">85회/h 변동</span>
                  </div>
                </div>
              </div>

              <SelectedProducts 
                selectedProducts={selectedProductList}
                onRemove={toggleSelect}
                onClearAll={() => handleSelectAll([])}
              />

              <RankTrendChart />
              
              <RankTable 
                selectedRanks={selectedRanks}
                onToggleSelect={toggleSelect}
                onSelectAll={handleSelectAll}
                onProductClick={handleProductClick} 
              />

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs font-bold text-[#6c9a4c]">총 1,284개 중 1-10번 상품 표시 중</p>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 px-5 py-2.5 bg-white border border-[#ecf3e7] rounded-xl text-sm font-bold text-gray-400 cursor-not-allowed">
                    <ChevronLeft className="w-4 h-4" /> 이전
                  </button>
                  <button className="flex items-center gap-1 px-5 py-2.5 bg-white border border-[#ecf3e7] rounded-xl text-sm font-bold text-gray-900 hover:bg-[#ecf3e7] transition-colors">
                    다음 <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}

          {view === 'my-brand' && <MyBrandView onProductClick={handleProductClick} />}
          
          {view === 'ad-analytics' && <AdAnalyticsView />}

          {view === 'detail' && selectedProduct && (
            <ProductDetailPage 
              product={selectedProduct} 
              onBack={() => setView('dashboard')} 
            />
          )}
        </main>
      </div>

      <ProductDetailPanel 
        product={selectedProduct} 
        isOpen={isPanelOpen} 
        onClose={closePanel}
        onViewDetail={handleGoToDetail}
      />

      <AIChat />
    </div>
  );
};

export default App;
