import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from 'recharts';
import { BarChart3, TrendingUp, Flame, Target } from 'lucide-react';

export default function GraphsVisualizationsTab({ seasonData }) {
  if (!seasonData) return null;

  const runProgressionData = seasonData.run_progression || [];
  const topSixes = seasonData.top_sixes || [];
  const topFours = seasonData.top_fours || [];
  const topRuns = seasonData.top_runs || [];

  return (
    <div className="space-y-8">
      
      {/* 1. MATCH-BY-MATCH RUN PROGRESSION GRAPH */}
      <div className="glass-card p-6 rounded-3xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 border-b border-gray-800">
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <span>IPL {seasonData.year} Match-by-Match Run Progression Graph</span>
            </h3>
            <p className="text-xs text-gray-400">Interactive Visualization of match totals and team scores</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20">
            {runProgressionData.length} Key Matches Plotted
          </span>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={runProgressionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.5} />
              <XAxis dataKey="match" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} domain={[100, 450]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px', color: '#fff' }}
                formatter={(value, name) => [value, name === 'total_match_runs' ? 'Total Match Runs' : name]}
              />
              <Legend wrapperStyle={{ color: '#E5E7EB' }} />
              <Line type="monotone" dataKey="team1_runs" name="Team 1 Score" stroke="#3B82F6" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="team2_runs" name="Team 2 Score" stroke="#EF4444" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="total_match_runs" name="Total Match Runs" stroke="#F59E0B" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. TOP SIXES (6s) AND FOURS (4s) GRAPH COMPARISON */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Sixes Leaderboard Chart */}
        <div className="glass-card p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-800">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-purple-400" />
              <span>Most Sixes (6s) Hitters Chart</span>
            </h4>
            <span className="text-xs text-purple-400 font-semibold">Max Sixes</span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topSixes.slice(0, 7)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis type="number" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                <YAxis dataKey="player_name" type="category" stroke="#9CA3AF" width={110} tick={{ fill: '#E5E7EB', fontSize: 11, fontWeight: 'bold' }} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px' }} />
                <Bar dataKey="sixes" name="Sixes (6s)" fill="#8B5CF6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fours Leaderboard Chart */}
        <div className="glass-card p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-800">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" />
              <span>Most Fours (4s) Hitters Chart</span>
            </h4>
            <span className="text-xs text-emerald-400 font-semibold">Max Fours</span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topFours.slice(0, 7)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis type="number" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                <YAxis dataKey="player_name" type="category" stroke="#9CA3AF" width={110} tick={{ fill: '#E5E7EB', fontSize: 11, fontWeight: 'bold' }} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px' }} />
                <Bar dataKey="fours" name="Fours (4s)" fill="#10B981" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 3. ORANGE CAP HIGHEST RUN SCORERS COMPARISON */}
      <div className="glass-card p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-400" />
              <span>Orange Cap Race - Top 8 Highest Run Scorers Comparison</span>
            </h3>
          </div>
        </div>

        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topRuns.slice(0, 8)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.4} />
              <XAxis dataKey="player_name" stroke="#9CA3AF" tick={{ fill: '#E5E7EB', fontSize: 11, fontWeight: 'bold' }} />
              <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px' }} />
              <Bar dataKey="runs" name="Runs Scored" fill="#F59E0B" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
