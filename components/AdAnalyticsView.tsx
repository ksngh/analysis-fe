
import React, { useState, useMemo } from 'react';
import { Youtube, TrendingUp, ThumbsUp, MessageCircle, Eye, Calendar, Loader2, Sparkles, Plus, ExternalLink, Play, ChevronRight, Info, Clock } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, ReferenceLine, Label } from 'recharts';

interface VideoAd {
  id: string;
  url: string;
  title: string;
  channel: string;
  views: string;
  likes: string;
  comments: string;
  uploadDate: string; // "MM.DD" or "HH:00" format depending on range
  thumbnail: string;
  index: number;
}

type TimeRange = '24h' | '7d' | '30d' | '90d';

const AdAnalyticsView: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(MOCK_PRODUCTS[0].rank);
  const [hoveredAdId, setHoveredAdId] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  
  // 광고 데이터 (업로드 날짜는 선택된 범위에 따라 매칭되도록 데모 구성)
  const [adsData, setAdsData] = useState<Record<number, VideoAd[]>>({
    1: [
      {
        id: 'yt1',
        url: 'https://www.youtube.com/watch?v=sample1',
        title: "올리브영 1위 에센스! 7일 사용 리얼 후기 (feat. COSRX)",
        channel: "뷰티로그 BeautyLog",
        views: "128,450",
        likes: "4.2k",
        comments: "856",
        uploadDate: "03.10",
        thumbnail: "https://picsum.photos/seed/yt1/640/360",
        index: 1
      },
      {
        id: 'yt2',
        url: 'https://www.youtube.com/watch?v=sample2',
        title: "환절기 필수템! 코스알엑스 스네일 라인 전제품 리뷰",
        channel: "스킨케어 마스터",
        views: "45,200",
        likes: "1.5k",
        comments: "230",
        uploadDate: "03.25",
        thumbnail: "https://picsum.photos/seed/yt2/640/360",
        index: 2
      }
    ]
  });

  const handleAnalyze = () => {
    if (!url) return;
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const currentAds = adsData[selectedProductId] || [];
      const newAd: VideoAd = {
        id: `yt-${Date.now()}`,
        url: url,
        title: "새롭게 분석된 마케팅 영상 (AI 분석 완료)",
        channel: "신규 크리에이터",
        views: "12,000",
        likes: "450",
        comments: "88",
        uploadDate: timeRange === '24h' ? "14:00" : "03.30",
        thumbnail: `https://picsum.photos/seed/${Date.now()}/640/360`,
        index: currentAds.length + 1
      };

      setAdsData(prev => ({
        ...prev,
        [selectedProductId]: [...(prev[selectedProductId] || []), newAd]
      }));
      
      setUrl('');
      setIsAnalyzing(false);
    }, 1500);
  };

  const currentAds = adsData[selectedProductId] || [];
  const selectedProduct = MOCK_PRODUCTS.find(p => p.rank === selectedProductId) || MOCK_PRODUCTS[0];

  // 시간 범위에 따른 차트 데이터 생성
  const chartData = useMemo(() => {
    switch (timeRange) {
      case '24h':
        return [
          { day: '00:00', rank: 15 }, { day: '04:00', rank: 14 }, { day: '08:00', rank: 16 }, 
          { day: '12:00', rank: 12 }, { day: '16:00', rank: 10 }, { day: '20:00', rank: 9 }, { day: '24:00', rank: 8 }
        ];
      case '7d':
        return [
          { day: '03.25', rank: 12 }, { day: '03.26', rank: 10 }, { day: '03.27', rank: 11 }, 
          { day: '03.28', rank: 9 }, { day: '03.29', rank: 7 }, { day: '03.30', rank: 6 }, { day: '03.31', rank: 5 }
        ];
      case '90d':
        return [
          { day: '01.10', rank: 45 }, { day: '02.10', rank: 30 }, { day: '03.10', rank: 15 }, 
          { day: '03.25', rank: 12 }, { day: '04.10', rank: 5 }
        ];
      default: // 30d
        return [
          { day: '03.01', rank: 18 }, { day: '03.05', rank: 17 }, { day: '03.10', rank: 15 }, 
          { day: '03.15', rank: 10 }, { day: '03.20', rank: 8 }, { day: '03.25', rank: 12 }, 
          { day: '03.30', rank: 5 }, { day: '04.05', rank: 2 }
        ];
    }
  }, [timeRange]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const eventAd = currentAds.find(ad => ad.uploadDate === label);
      return (
        <div className="bg-white p-4 rounded-3xl shadow-2xl border border-[#ecf3e7] min-w-[220px] animate-in zoom-in-95 duration-200">
          <p className="text-sm font-black text-gray-900 mb-2">{label} 분석 결과</p>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-[#6dec13]"></div>
            <p className="text-xs font-bold text-gray-600">현재 순위: <span className="text-gray-900">{payload[0].value}위</span></p>
          </div>
          {eventAd && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded">광고 [{eventAd.index}]</span>
                <span className="text-[10px] font-bold text-red-500">마케팅 시점</span>
              </div>
              <div className="flex gap-2">
                <img src={eventAd.thumbnail} className="w-14 h-10 rounded-lg object-cover border border-gray-100" />
                <div className="flex-1">
                  <p className="text-[10px] font-black text-gray-800 line-clamp-1">{eventAd.title}</p>
                  <p className="text-[9px] font-bold text-gray-400">{eventAd.channel}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 shadow-sm border border-red-100">
              <Youtube className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">광고 성과 분석관</h2>
          </div>
          <p className="text-gray-500 font-bold">광고 캠페인과 시장 순위의 명확한 상관관계를 추적합니다.</p>
        </div>

        <div className="bg-white p-2 rounded-2xl border border-[#ecf3e7] shadow-sm flex items-center gap-4">
          <div className="flex items-center gap-3 pl-4">
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">분석 상품</span>
            <select 
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(Number(e.target.value))}
              className="bg-gray-50 border-none rounded-xl text-sm font-black px-4 py-2 focus:ring-2 focus:ring-[#6dec13]/50 outline-none min-w-[200px]"
            >
              {MOCK_PRODUCTS.map(p => (
                <option key={p.rank} value={p.rank}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Ad List */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-[#ecf3e7] p-8 shadow-sm">
            <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#6dec13]" /> 캠페인 추가
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="유튜브 영상 URL..."
                className="w-full h-14 px-5 bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-[#6dec13] outline-none transition-all"
              />
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !url}
                className="w-full h-14 bg-gray-900 text-[#6dec13] font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl"
              >
                {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                데이터 매칭하기
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">등록된 캠페인 ({currentAds.length})</h3>
            {currentAds.length === 0 ? (
              <div className="bg-gray-100/50 border-2 border-dashed border-gray-200 rounded-[2rem] p-12 text-center text-gray-400 font-bold">광고 정보가 없습니다.</div>
            ) : (
              currentAds.map(ad => (
                <div 
                  key={ad.id} 
                  onMouseEnter={() => setHoveredAdId(ad.id)}
                  onMouseLeave={() => setHoveredAdId(null)}
                  className={`bg-white rounded-[2rem] border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl group relative ${hoveredAdId === ad.id ? 'border-[#6dec13] ring-4 ring-[#6dec13]/5' : 'border-[#ecf3e7]'}`}
                >
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="bg-gray-900 text-[#6dec13] text-[10px] font-black px-2.5 py-1 rounded-lg">광고 [{ad.index}]</span>
                    <span className="bg-white/90 backdrop-blur-sm text-gray-600 text-[10px] font-black px-2.5 py-1 rounded-lg border border-gray-100">{ad.uploadDate}</span>
                  </div>
                  <div className="aspect-video relative overflow-hidden">
                    <img src={ad.thumbnail} alt="thumb" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href={ad.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform"><Play className="w-6 h-6 fill-current" /></a>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-black text-gray-900 text-sm line-clamp-1 mb-1">{ad.title}</h4>
                    <p className="text-[10px] font-bold text-gray-400 mb-4">{ad.channel}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1"><Eye className="w-3 h-3 text-blue-500" /><span className="text-[11px] font-black text-gray-700">{ad.views}</span></div>
                        <div className="flex items-center gap-1"><ThumbsUp className="w-3 h-3 text-red-500" /><span className="text-[11px] font-black text-gray-700">{ad.likes}</span></div>
                      </div>
                      <a href={ad.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black text-blue-600 hover:underline flex items-center gap-1">유튜브 바로가기 <ExternalLink className="w-3 h-3" /></a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Analysis Content */}
        <div className="xl:col-span-8 space-y-6">
          <div className="bg-white rounded-[3rem] border border-[#ecf3e7] p-8 md:p-10 shadow-sm relative overflow-hidden flex flex-col h-full">
            {/* Range Selector */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-1">통합 성과 리포트</h3>
                <div className="flex items-center gap-2 text-sm font-bold text-[#6c9a4c]">
                  <Clock className="w-4 h-4" />
                  <span>분석 기간: {timeRange === '24h' ? '최근 24시간' : `최근 ${timeRange.replace('d', '일')}`}</span>
                </div>
              </div>

              <div className="flex p-1.5 bg-gray-50 rounded-2xl border border-gray-100">
                {(['24h', '7d', '30d', '90d'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setTimeRange(r)}
                    className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${timeRange === r ? 'bg-white text-gray-900 shadow-md ring-1 ring-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {r === '24h' ? '24시간' : r === '7d' ? '7일' : r === '30d' ? '30일' : '90일'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 min-h-[480px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRankAd" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6dec13" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6dec13" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#6c9a4c' }} dy={10} />
                  <YAxis reversed axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#6c9a4c' }} label={{ value: '순위', angle: -90, position: 'insideLeft', style: { fontWeight: 'black', fill: '#6c9a4c', fontSize: 12 } }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#6dec13', strokeWidth: 2, strokeDasharray: '5 5' }} />
                  
                  {currentAds.map((ad) => (
                    chartData.some(d => d.day === ad.uploadDate) && (
                      <ReferenceLine 
                        key={ad.id}
                        x={ad.uploadDate} 
                        stroke={hoveredAdId === ad.id ? '#ef4444' : '#ff9999'} 
                        strokeWidth={hoveredAdId === ad.id ? 4 : 2} 
                        strokeDasharray={hoveredAdId === ad.id ? '0' : '5 5'}
                      >
                        <Label 
                          content={({ viewBox }) => {
                            const { x, y } = viewBox as any;
                            const isHovered = hoveredAdId === ad.id;
                            return (
                              <g className="transition-all duration-300">
                                <rect 
                                  x={x - 45} y={y - 45} width={90} height={30} rx={10} 
                                  fill={isHovered ? '#ef4444' : '#ffeded'} 
                                  stroke={isHovered ? '#ef4444' : '#ff9999'} 
                                  strokeWidth={1}
                                />
                                <text 
                                  x={x} y={y - 25} textAnchor="middle" 
                                  fill={isHovered ? '#fff' : '#ef4444'} 
                                  className="text-[10px] font-black"
                                >
                                  AD [{ad.index}] - {ad.channel.split(' ')[0]}
                                </text>
                                <circle cx={x} cy={y} r={6} fill={isHovered ? '#ef4444' : '#ff9999'} />
                              </g>
                            );
                          }}
                        />
                      </ReferenceLine>
                    )
                  ))}

                  <Area type="monotone" dataKey="rank" stroke="#6dec13" strokeWidth={6} fill="url(#colorRankAd)" dot={{ r: 8, fill: '#6dec13', strokeWidth: 4, stroke: '#fff' }} activeDot={{ r: 10, strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Bottom Analysis Panel */}
            <div className="mt-10 p-8 bg-gray-900 rounded-[2.5rem] flex flex-col md:flex-row items-start md:items-center gap-8 shadow-2xl relative z-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#6dec13]/10 rounded-full blur-2xl"></div>
              <div className="w-16 h-16 bg-[#6dec13] rounded-2xl flex items-center justify-center text-gray-900 shadow-lg shrink-0">
                <TrendingUp className="w-10 h-10" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-lg font-black text-white">마케팅 캠페인 통합 성과</h4>
                  <span className="bg-[#6dec13]/20 text-[10px] font-black text-[#6dec13] px-2 py-0.5 rounded-full border border-[#6dec13]/30">AI 분석 리포트</span>
                </div>
                <p className="text-xs font-bold text-gray-400 leading-relaxed max-w-2xl">
                  {currentAds.length > 0 ? (
                    `최근 ${timeRange.replace('d', '일')} 동안의 분석 결과, 총 ${currentAds.length}건의 광고 집행이 상품 순위 상승에 긍정적인 영향을 미쳤습니다. 
                    특히 업로드 ${currentAds[0].uploadDate} 시점의 광고 [1] 이후 순위가 ${chartData[0].rank}위에서 ${chartData[chartData.length - 1].rank}위로 대폭 개선되었습니다.`
                  ) : (
                    "분석된 광고 데이터가 없습니다. 좌측 패널을 통해 마케팅 영상을 추가하면 AI가 순위 변동과의 상관관계를 분석합니다."
                  )}
                </p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <div className="flex-1 md:flex-none p-4 bg-white/5 rounded-2xl border border-white/10 text-center min-w-[100px]">
                  <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">최고 순위</p>
                  <p className="text-xl font-black text-[#6dec13]">1위</p>
                </div>
                <div className="flex-1 md:flex-none p-4 bg-white/5 rounded-2xl border border-white/10 text-center min-w-[100px]">
                  <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">효율성 점수</p>
                  <p className="text-xl font-black text-blue-400">92%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdAnalyticsView;
