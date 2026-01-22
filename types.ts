
export interface Product {
  rank: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  change: number;
  imageUrl: string;
}

export interface ChartDataPoint {
  time: string;
  cosrx: number;
  joseon: number;
}
