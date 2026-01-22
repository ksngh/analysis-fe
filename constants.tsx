
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
    name: "[1월 올영픽/15년연속 1위] 메디힐 에센셜 마스크팩 10+1/10매 기획 7종",
    brand: "메디힐",
    category: "마스크팩",
    price: 9950,
    change: 2,
    imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0022/A00000022341489ko.png?l=ko"
  },
  {
    rank: 3,
    name: "[올영어워즈1등 크림] 에스트라 아토베리어365 크림 80ml 기획 (+하이드로 에센스25ml+세라-히알 앰플7ml)",
    brand: "에스트라",
    category: "크림",
    price: 26400,
    change: 6,
    imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0022/A00000022283321ko.jpg?l=ko"
  },
  {
    rank: 4,
    name: "[1월 올영픽] 크런틴 크런치볼 단백질쉐이크 50g 4종 택1",
    brand: "크런틴",
    category: "식품",
    price: 5900,
    change: 5,
    imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0022/A00000022741826ko.jpg?l=ko"
  },
  {
    rank: 7,
    name: "[1월올영픽][피지흡착] 한율 쑥떡팩폼 120ml (+미니 클렌징 4종 증정)",
    brand: "한율",
    category: "클렌저",
    price: 19700,
    change: 10,
    imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0020/A00000020401466ko.jpg?l=ko"
  },
  {
    rank: 10,
    name: "[1월 올영픽/한정기획] 메디힐 더마 패드 100+100매 더블 기획 7종",
    brand: "메디힐",
    category: "패드",
    price: 28400,
    change: 8,
    imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0024/A00000024295321ko.png?l=ko"
  },
  {
    rank: 13,
    name: "[종지부부 마켓특가/1등 미백앰플] 메디큐브 PDRN 핑크 앰플 30ml 리필기획 (본품+리필 50ML)",
    brand: "메디큐브",
    category: "앰플",
    price: 23200,
    change: 4,
    imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0022/A00000022649828ko.jpeg?l=ko"
  },
  {
    rank: 14,
    name: "ENHYPEN (엔하이픈) - [THE SIN : VANISH] (3종 SET)",
    brand: "ENHYPEN",
    category: "음반",
    price: 62400,
    change: 13,
    imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0024/B00000024493201ko.jpg?l=ko"
  },
  {
    rank: 16,
    name: "[여드름 기능성/피지케어] 블랑네이처 아크네 클렌징 폼 150ml",
    brand: "블랑네이처",
    category: "클렌저",
    price: 19260,
    change: 11,
    imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0018/A00000018640929ko.jpg?l=ko"
  },
  {
    rank: 17,
    name: "[1월올영픽/NO.1 미스트세럼] 달바 퍼스트 스프레이 세럼 100ml 2개 기획",
    brand: "달바",
    category: "세럼",
    price: 31900,
    change: 1,
    imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0023/A00000023272414ko.jpg?l=ko"
  },
  {
    rank: 18,
    name: "에스트라 에이시카365 흔적진정세럼 pH4.5 40ml 기획 (+세럼 20ml+크림 1ml)",
    brand: "에스트라",
    category: "세럼",
    price: 28900,
    change: 93,
    imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0022/A00000022283902ko.jpg?l=ko"
  }
];

export const MOCK_CHART_DATA: ChartDataPoint[] = [
  { time: '00:00', cosrx: 80, joseon: 110 },
  { time: '04:00', cosrx: 110, joseon: 120 },
  { time: '08:00', cosrx: 140, joseon: 130 },
  { time: '12:00', cosrx: 80, joseon: 100 },
  { time: '16:00', cosrx: 210, joseon: 60 },
  { time: '20:00', cosrx: 90, joseon: 80 },
  { time: '현재', cosrx: 170, joseon: 150 },
];
