
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { MOCK_CHART_DATA, COLORS } from '../constants';

const RankTrendChart: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#ecf3e7] shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-bold text-gray-900">순위 트렌드</h3>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#6dec13] rounded-full"></span>
            <span className="text-xs font-bold text-gray-600">코스알엑스 스네일 에센스</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 border-b-2 border-dashed border-[#60a5fa]"></div>
            <span className="text-xs font-bold text-gray-600">조선미녀 선크림</span>
          </div>
        </div>
      </div>
      
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_CHART_DATA}>
            <defs>
              <linearGradient id="colorCosrx" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.1}/>
                <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 700, fill: COLORS.accent }}
              dy={10}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            />
            <Area 
              type="monotone" 
              dataKey="cosrx" 
              stroke={COLORS.primary} 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorCosrx)" 
            />
            <Line 
              type="monotone" 
              dataKey="joseon" 
              stroke={COLORS.secondary} 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RankTrendChart;
