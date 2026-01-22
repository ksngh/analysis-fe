
import { Product, ChartDataPoint } from './types';

export const COLORS = {
  primary: '#6dec13',
  secondary: '#60a5fa',
  accent: '#6c9a4c',
  bg: '#f7f8f6',
};

export const MOCK_PRODUCTS: Product[] = [
  {
    rank: 1,
    name: "Advanced Snail 96 Mucin Power Essence",
    brand: "COSRX",
    category: "Essence",
    price: 16800,
    change: 2,
    imageUrl: "https://picsum.photos/seed/cosrx/100/100"
  },
  {
    rank: 2,
    name: "Daily Mild Sunscreen SPF50+",
    brand: "Innisfree",
    category: "Sun Care",
    price: 12000,
    change: 0,
    imageUrl: "https://picsum.photos/seed/innisfree/100/100"
  },
  {
    rank: 3,
    name: "Lip Sleeping Mask Berry",
    brand: "Laneige",
    category: "Lip Care",
    price: 22000,
    change: -1,
    imageUrl: "https://picsum.photos/seed/laneige/100/100"
  },
  {
    rank: 4,
    name: "Relief Sun : Rice + Probiotics",
    brand: "Beauty of Joseon",
    category: "Sun Care",
    price: 18000,
    change: 5,
    imageUrl: "https://picsum.photos/seed/joseon/100/100"
  },
  {
    rank: 5,
    name: "Birch Juice Moisturizing Cream",
    brand: "Round Lab",
    category: "Moisturizer",
    price: 24000,
    change: -2,
    imageUrl: "https://picsum.photos/seed/roundlab/100/100"
  },
  {
    rank: 6,
    name: "Anua Heartleaf 77% Soothing Toner",
    brand: "Anua",
    category: "Toner",
    price: 19500,
    change: 1,
    imageUrl: "https://picsum.photos/seed/anua/100/100"
  },
  {
    rank: 7,
    name: "Skin1004 Madagascar Centella",
    brand: "Skin1004",
    category: "Ampoule",
    price: 17000,
    change: 0,
    imageUrl: "https://picsum.photos/seed/skin1004/100/100"
  },
  {
    rank: 8,
    name: "Torriden Dive-In Serum",
    brand: "Torriden",
    category: "Serum",
    price: 18000,
    change: 4,
    imageUrl: "https://picsum.photos/seed/torriden/100/100"
  },
  {
    rank: 9,
    name: "Manyo Pure Cleansing Oil",
    brand: "Manyo Factory",
    category: "Cleanser",
    price: 14900,
    change: -3,
    imageUrl: "https://picsum.photos/seed/manyo/100/100"
  },
  {
    rank: 10,
    name: "Mediheal Tea Tree Mask",
    brand: "Mediheal",
    category: "Mask",
    price: 2000,
    change: 1,
    imageUrl: "https://picsum.photos/seed/mediheal/100/100"
  }
];

export const MOCK_CHART_DATA: ChartDataPoint[] = [
  { time: '00:00', cosrx: 80, joseon: 110 },
  { time: '04:00', cosrx: 110, joseon: 120 },
  { time: '08:00', cosrx: 140, joseon: 130 },
  { time: '12:00', cosrx: 80, joseon: 100 },
  { time: '16:00', cosrx: 210, joseon: 60 },
  { time: '20:00', cosrx: 90, joseon: 80 },
  { time: 'NOW', cosrx: 170, joseon: 150 },
];
