'use client';

import { useAppStore } from '@/lib/store';
import { testConnection } from '@/lib/api';

export default function FiltersBar() {
  const { filters, updateFilters, loadBestData, loading } = useAppStore();

  const handleTestConnection = async () => {
    try {
      await testConnection();
      alert('연결 테스트 성공! 콘솔을 확인하세요.');
    } catch (error) {
      alert(`연결 테스트 실패: ${error}`);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Refresh Button */}
        <button
          onClick={loadBestData}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? '로딩중...' : '새로고침'}
        </button>

        {/* Test Connection Button */}
        <button
          onClick={handleTestConnection}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          연결 테스트
        </button>

        {/* Search Input */}
        <div className="flex-1 min-w-64">
          <input
            type="text"
            placeholder="상품명 또는 브랜드 검색..."
            value={filters.searchTerm}
            onChange={(e) => updateFilters({ searchTerm: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Rank Range */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">랭킹:</label>
          <input
            type="number"
            min="1"
            max="1000"
            value={filters.rankRange[0]}
            onChange={(e) => updateFilters({ 
              rankRange: [parseInt(e.target.value) || 1, filters.rankRange[1]] 
            })}
            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
          />
          <span className="text-gray-500">~</span>
          <input
            type="number"
            min="1"
            max="1000"
            value={filters.rankRange[1]}
            onChange={(e) => updateFilters({ 
              rankRange: [filters.rankRange[0], parseInt(e.target.value) || 100] 
            })}
            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
          />
        </div>

        {/* Show Flags Toggle */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.showFlags}
            onChange={(e) => updateFilters({ showFlags: e.target.checked })}
            className="rounded"
          />
          <span className="text-sm font-medium text-gray-700">플래그 표시</span>
        </label>

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">정렬:</label>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilters({ sortBy: e.target.value as any })}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="rank_asc">랭킹 오름차순</option>
            <option value="rank_desc">랭킹 내림차순</option>
            <option value="discount_desc">할인율 높은순</option>
          </select>
        </div>
      </div>
    </div>
  );
}