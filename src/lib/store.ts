import { create } from 'zustand';
import { AppState, RankingItemOut, GraphNode } from '@/types';
import { getBest, getSchedulerStatus } from './api';

interface AppActions {
  loadBestData: () => Promise<void>;
  loadSchedulerStatus: () => Promise<void>;
  setSelectedNode: (node: GraphNode | null) => void;
  updateFilters: (filters: Partial<AppState['filters']>) => void;
  clearError: () => void;
}

export const useAppStore = create<AppState & AppActions>((set, get) => ({
  // State
  items: [],
  loading: false,
  error: null,
  selectedNode: null,
  schedulerStatus: null,
  filters: {
    searchTerm: '',
    rankRange: [1, 100],
    showFlags: false, // Default to false to avoid complexity
    sortBy: 'rank_asc',
  },

  // Actions
  loadBestData: async () => {
    console.log('🔄 loadBestData 호출됨');
    set({ loading: true, error: null });
    try {
      const items = await getBest();
      console.log('✅ 데이터 로드 성공:', items.length, '개 아이템');
      set({ items, loading: false });
    } catch (error) {
      console.error('❌ 데이터 로드 실패:', error);
      set({ 
        error: error instanceof Error ? error.message : '데이터를 불러오는데 실패했습니다.',
        loading: false 
      });
    }
  },

  loadSchedulerStatus: async () => {
    set({ loading: true, error: null });
    try {
      const schedulerStatus = await getSchedulerStatus();
      set({ schedulerStatus, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : '스케줄러 상태를 불러오는데 실패했습니다.',
        loading: false 
      });
    }
  },

  setSelectedNode: (node) => {
    set({ selectedNode: node });
  },

  updateFilters: (newFilters) => {
    const currentFilters = get().filters;
    set({ filters: { ...currentFilters, ...newFilters } });
  },

  clearError: () => {
    set({ error: null });
  },
}));