import React, { useEffect, useState } from 'react';
import { Trophy, Flame, Target, BarChart3, Crown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { fetchApiData } from '../App';

export default function AllTimeAnalyticsTab() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchApiData('/api/analytics/')
      .then(data => setAnalytics(data))
      .catch(err => console.error('Analytics API fetch error:', err));
  }, []);

  const titlesLeaderboard = analytics?.titles_leaderboard || [
    { team: 'Mumbai Indians', titles: 5 },
    { team: 'Chennai Super Kings', titles: 5 },
    { team: 'Kolkata Knight Riders', titles: 3 },
    { team: 'Royal Challengers Bengaluru', titles: 2 },
    { team: 'Gujarat Titans', titles: 1 },
    { team: 'Sunrisers Hyderabad', titles: 1 },
    { team: 'Rajasthan Royals', titles: 1 },
    { team: 'Deccan Chargers', titles: 1 },
  ];

  const yearlyTrends = analytics?.yearly_trends || [];

  return (
    <div className="space-y-8">
      
      {/* 1. ALL-TIME CHAMPION FRANCHISES LEADERBOARD */}
      <div className="glass-card p-6 rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-gray-800 pb-3">
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-400" />
              <span>IPL Championship Titles Leaderboard (2008 - 2026)</span>
            </h3>
            <p className="text-xs text-gray-400">Total trophies won across 19 IPL seasons</p>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/30">
            19 Total IPL Champions Crowned 🏆
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {titlesLeaderboard.map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl glass-card border border-gray-800 hover:border-amber-500/40 transition flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 block">{item.team}</span>
                <span className="text-2xl font-black text-amber-300 flex items-center gap-1.5">
                  {item.titles} {item.titles === 1 ? 'Title' : 'Titles'}
                </span>
              </div>
              <div className={`p-3 rounded-xl ${
                idx === 0 || idx === 1 ? 'bg-amber-500 text-gray-950' : 'bg-gray-800 text-amber-400'
              }`}>
                <Crown className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. YEARLY SIXES & FOURS TREND CHART (2008 - 2026) */}
      <div className="glass-card p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              <span>Boundary Progression Trend Across All 19 Seasons (2008-2026)</span>
            </h3>
          </div>
        </div>

        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={yearlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.4} />
              <XAxis dataKey="year" stroke="#9CA3AF" tick={{ fill: '#E5E7EB', fontSize: 12, fontWeight: 'bold' }} />
              <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 11 }} domain={[400, 2500]} />
              <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px' }} />
              <Line type="monotone" dataKey="total_sixes" name="Total Sixes (6s)" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="total_fours" name="Total Fours (4s)" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. ALL-TIME TOP 10 SIXES & FOURS HITTERS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* All-Time Sixes */}
        <div className="glass-card p-6 rounded-3xl space-y-4">
          <h4 className="text-lg font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
            <Flame className="w-5 h-5 text-purple-400" />
            <span>All-Time Top Six Hitters (2008 - 2026)</span>
          </h4>

          <div className="space-y-3">
            {analytics?.all_time_sixes_hitters?.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-900/60 border border-gray-800 hover:border-purple-500/30 transition">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center font-black text-xs">
                    #{idx + 1}
                  </span>
                  <span className="text-sm font-bold text-white">{p.player_name}</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-purple-300 block">{p.total_sixes} Sixes</span>
                  <span className="text-xs text-gray-400">{p.total_runs} Total Runs</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All-Time Fours */}
        <div className="glass-card p-6 rounded-3xl space-y-4">
          <h4 className="text-lg font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-400" />
            <span>All-Time Top Fours Hitters (2008 - 2026)</span>
          </h4>

          <div className="space-y-3">
            {analytics?.all_time_fours_hitters?.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-900/60 border border-gray-800 hover:border-emerald-500/30 transition">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-black text-xs">
                    #{idx + 1}
                  </span>
                  <span className="text-sm font-bold text-white">{p.player_name}</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-emerald-300 block">{p.total_fours} Fours</span>
                  <span className="text-xs text-gray-400">{p.total_runs} Total Runs</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
