// API Response Types
export interface RankingItemOut {
  rank: number | null;
  goods_no: string | null;
  disp_cat_no: string | null;
  brand: string | null;
  name: string;
  url: string | null;
  image_url: string | null;
  org_price: number | null;
  cur_price: number | null;
  flags: string[];
  captured_at: string;
}

export interface SyncResult {
  count: number;
  inserted: number;
  updated: number;
}

export interface SchedulerStatus {
  last_sync_at: string | null;
  next_sync_at: string;
}

// Graph Types
export interface GraphNode {
  id: string;
  type: 'brand' | 'product' | 'flag';
  data: {
    label: string;
    item?: RankingItemOut;
    brand?: string;
    flag?: string;
    products?: RankingItemOut[];
  };
  position: { x: number; y: number };
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
}

// Filter Types
export interface FilterState {
  searchTerm: string;
  rankRange: [number, number];
  showFlags: boolean;
  sortBy: 'rank_asc' | 'rank_desc' | 'discount_desc';
}

// Store Types
export interface AppState {
  items: RankingItemOut[];
  loading: boolean;
  error: string | null;
  selectedNode: GraphNode | null;
  filters: FilterState;
  schedulerStatus: SchedulerStatus | null;
}