'use client';

import { useMemo } from 'react';
import { useAppStore } from '@/lib/store';
import { filterItems } from '@/lib/graph';
import { RankingItemOut } from '@/types';

function formatPrice(price: number | null) {
  if (!price) return '-';
  return new Intl.NumberFormat('ko-KR').format(price) + '원';
}

function calculateDiscount(orgPrice: number | null, curPrice: number | null) {
  if (!orgPrice || !curPrice || orgPrice <= curPrice) return 0;
  return Math.round(((orgPrice - curPrice) / orgPrice) * 100);
}

interface ProductItemProps {
  item: RankingItemOut;
  onClick: () => void;
}

function ProductItem({ item, onClick }: ProductItemProps) {
  const discount = calculateDiscount(item.org_price, item.cur_price);

  return (
    <div
      onClick={onClick}
      className="p-3 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-sm cursor-pointer transition-all"
    >
      <div className="flex gap-3">
        {/* Image */}
        {item.image_url && (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-12 h-12 object-cover rounded flex-shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h4 className="font-medium text-sm truncate pr-2">{item.name}</h4>
            {item.rank && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex-shrink-0">
                #{item.rank}
              </span>
            )}
          </div>

          {item.brand && (
            <p className="text-xs text-gray-600 mb-1">{item.brand}</p>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              {item.cur_price && (
                <span className="font-semibold text-red-600">
                  {formatPrice(item.cur_price)}
                </span>
              )}
              {discount > 0 && (
                <span className="ml-2 text-xs text-red-600">
                  {discount}% 할인
                </span>
              )}
            </div>

            {item.flags.length > 0 && (
              <div className="flex gap-1">
                {item.flags.slice(0, 2).map((flag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded"
                  >
                    {flag}
                  </span>
                ))}
                {item.flags.length > 2 && (
                  <span className="text-xs text-gray-500">+{item.flags.length - 2}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductList() {
  const { items, filters, setSelectedNode } = useAppStore();

  const filteredItems = useMemo(() => {
    return filterItems(items, filters);
  }, [items, filters]);

  const handleItemClick = (item: RankingItemOut) => {
    // Create a product node to match the graph structure
    const productId = item.goods_no || `product-${item.name.replace(/\s+/g, '-')}`;
    const productNode = {
      id: `product:${productId}`,
      type: 'product' as const,
      data: {
        label: item.name,
        item,
      },
      position: { x: 0, y: 0 },
    };
    setSelectedNode(productNode);
  };

  if (items.length === 0) {
    return (
      <div className="w-80 bg-white border-r border-gray-200 p-4">
        <div className="text-center text-gray-500">
          <p>데이터를 불러와주세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-lg mb-2">제품 목록</h2>
        <p className="text-sm text-gray-600">
          {filteredItems.length}개 제품 (전체 {items.length}개)
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredItems.map((item, index) => (
          <ProductItem
            key={`${item.goods_no || item.name}-${index}`}
            item={item}
            onClick={() => handleItemClick(item)}
          />
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p>필터 조건에 맞는</p>
            <p>제품이 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}