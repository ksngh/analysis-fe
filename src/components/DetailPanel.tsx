'use client';

import { useAppStore } from '@/lib/store';
import { RankingItemOut } from '@/types';

function formatPrice(price: number | null) {
  if (!price) return '-';
  return new Intl.NumberFormat('ko-KR').format(price) + '원';
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString('ko-KR');
}

function calculateDiscount(orgPrice: number | null, curPrice: number | null) {
  if (!orgPrice || !curPrice || orgPrice <= curPrice) return 0;
  return Math.round(((orgPrice - curPrice) / orgPrice) * 100);
}

function ProductDetail({ item }: { item: RankingItemOut }) {
  const discount = calculateDiscount(item.org_price, item.cur_price);

  return (
    <div className="space-y-4">
      {/* Product Image */}
      {item.image_url && (
        <div className="flex justify-center">
          <img
            src={item.image_url}
            alt={item.name}
            className="w-32 h-32 object-cover rounded-lg border"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Basic Info */}
      <div>
        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
        {item.brand && (
          <p className="text-gray-600 mb-1">브랜드: {item.brand}</p>
        )}
        {item.rank && (
          <p className="text-blue-600 font-medium">랭킹: #{item.rank}</p>
        )}
      </div>

      {/* Price Info */}
      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="space-y-1">
          {item.org_price && (
            <div className="flex justify-between">
              <span className="text-gray-600">정가:</span>
              <span className={item.cur_price && item.cur_price < item.org_price ? 'line-through text-gray-400' : ''}>
                {formatPrice(item.org_price)}
              </span>
            </div>
          )}
          {item.cur_price && (
            <div className="flex justify-between">
              <span className="text-gray-600">현재가:</span>
              <span className="font-semibold text-red-600">{formatPrice(item.cur_price)}</span>
            </div>
          )}
          {discount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">할인율:</span>
              <span className="font-semibold text-red-600">{discount}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Flags */}
      {item.flags.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">태그</h4>
          <div className="flex flex-wrap gap-2">
            {item.flags.map((flag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {flag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Additional Info */}
      <div className="text-sm text-gray-500 space-y-1">
        <p>수집일시: {formatDate(item.captured_at)}</p>
        {item.goods_no && <p>상품번호: {item.goods_no}</p>}
        {item.disp_cat_no && <p>카테고리: {item.disp_cat_no}</p>}
      </div>

      {/* Link */}
      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          상품 페이지 보기
        </a>
      )}
    </div>
  );
}

function BrandDetail({ brand, products }: { brand: string; products: RankingItemOut[] }) {
  const avgDiscount = products.reduce((sum, item) => {
    return sum + calculateDiscount(item.org_price, item.cur_price);
  }, 0) / products.length;

  const sortedProducts = [...products].sort((a, b) => (a.rank || 999) - (b.rank || 999));

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-lg mb-2">{brand}</h3>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>제품 수:</span>
              <span className="font-medium">{products.length}개</span>
            </div>
            <div className="flex justify-between">
              <span>평균 할인율:</span>
              <span className="font-medium text-red-600">{avgDiscount.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">제품 목록 (랭킹순)</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {sortedProducts.map((item, index) => (
            <div key={index} className="p-2 bg-gray-50 rounded text-sm">
              <div className="font-medium truncate">{item.name}</div>
              <div className="text-gray-600">
                #{item.rank || '?'} • {formatPrice(item.cur_price)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FlagDetail({ flag, products }: { flag: string; products: RankingItemOut[] }) {
  const sortedProducts = [...products].sort((a, b) => (a.rank || 999) - (b.rank || 999));

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-lg mb-2">#{flag}</h3>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm">
            <div className="flex justify-between">
              <span>해당 제품 수:</span>
              <span className="font-medium">{products.length}개</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">제품 목록 (랭킹순)</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {sortedProducts.map((item, index) => (
            <div key={index} className="p-2 bg-gray-50 rounded text-sm">
              <div className="font-medium truncate">{item.name}</div>
              <div className="text-gray-600">
                #{item.rank || '?'} • {item.brand || '브랜드 없음'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DetailPanel() {
  const { selectedNode, setSelectedNode } = useAppStore();

  if (!selectedNode) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-4">
        <div className="text-center text-gray-500">
          <p className="mb-2">노드를 클릭하여</p>
          <p>상세 정보를 확인하세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">상세 정보</h2>
        <button
          onClick={() => setSelectedNode(null)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      {selectedNode.type === 'product' && selectedNode.data.item && (
        <ProductDetail item={selectedNode.data.item} />
      )}

      {selectedNode.type === 'brand' && selectedNode.data.brand && selectedNode.data.products && (
        <BrandDetail brand={selectedNode.data.brand} products={selectedNode.data.products} />
      )}

      {selectedNode.type === 'flag' && selectedNode.data.flag && selectedNode.data.products && (
        <FlagDetail flag={selectedNode.data.flag} products={selectedNode.data.products} />
      )}
    </div>
  );
}