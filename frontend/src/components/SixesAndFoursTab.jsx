import React from 'react';
import { Flame, Target, Award, Zap, Percent, Trophy } from 'lucide-react';

export default function SixesAndFoursTab({ seasonData }) {
  if (!seasonData) return null;

  const topSixesPlayer = seasonData.top_sixes?.[0];
  const topFoursPlayer = seasonData.top_fours?.[0];
  const topRunPlayer = seasonData.top_runs?.[0];

  return (
    <div className="space-y-8">
      
      {/* Boundary Kings Highlight Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Most Sixes King Card */}
        <div className="glass-card p-6 rounded-3xl border-t-4 border-purple-500 text-center relative overflow-hidden">
          <div className="inline-p-3 rounded-full bg-purple-500/20 text-purple-400 p-3 mb-3 inline-block">
            <Flame className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest block">
            👑 MOST SIXES (6s) KING
          </span>
          <h3 className="text-2xl font-black text-white mt-1">{topSixesPlayer?.player_name || 'N/A'}</h3>
          <span className="text-xs text-gray-400 block">{topSixesPlayer?.team}</span>
          
          <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-around">
            <div>
              <span className="text-xs text-gray-400">Total Sixes</span>
              <div className="text-2xl font-black text-purple-300">{topSixesPlayer?.sixes || 0}</div>
            </div>
            <div>
              <span className="text-xs text-gray-400">Strike Rate</span>
              <div className="text-2xl font-black text-purple-300">{topSixesPlayer?.strike_rate || 0}</div>
            </div>
          </div>
        </div>

        {/* Most Fours King Card */}
        <div className="glass-card p-6 rounded-3xl border-t-4 border-emerald-500 text-center relative overflow-hidden">
          <div className="inline-p-3 rounded-full bg-emerald-500/20 text-emerald-400 p-3 mb-3 inline-block">
            <Target className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
            👑 MOST FOURS (4s) KING
          </span>
          <h3 className="text-2xl font-black text-white mt-1">{topFoursPlayer?.player_name || 'N/A'}</h3>
          <span className="text-xs text-gray-400 block">{topFoursPlayer?.team}</span>

          <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-around">
            <div>
              <span className="text-xs text-gray-400">Total Fours</span>
              <div className="text-2xl font-black text-emerald-300">{topFoursPlayer?.fours || 0}</div>
            </div>
            <div>
              <span className="text-xs text-gray-400">Runs in 4s</span>
              <div className="text-2xl font-black text-emerald-300">{(topFoursPlayer?.fours || 0) * 4}</div>
            </div>
          </div>
        </div>

        {/* Highest Run Scorer Card */}
        <div className="glass-card p-6 rounded-3xl border-t-4 border-amber-500 text-center relative overflow-hidden">
          <div className="inline-p-3 rounded-full bg-amber-500/20 text-amber-400 p-3 mb-3 inline-block">
            <Trophy className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
            👑 HIGHEST RUN SCORER
          </span>
          <h3 className="text-2xl font-black text-white mt-1">{topRunPlayer?.player_name || 'N/A'}</h3>
          <span className="text-xs text-gray-400 block">{topRunPlayer?.team}</span>

          <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-around">
            <div>
              <span className="text-xs text-gray-400">Season Runs</span>
              <div className="text-2xl font-black text-amber-300">{topRunPlayer?.runs || 0}</div>
            </div>
            <div>
              <span className="text-xs text-gray-400">Highest Score</span>
              <div className="text-2xl font-black text-amber-300">{topRunPlayer?.highest_score || '0'}</div>
            </div>
          </div>
        </div>

      </div>

      {/* Comprehensive Boundary Leaderboard Table */}
      <div className="glass-card p-6 rounded-3xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-gray-800">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>IPL {seasonData.year} Complete Boundary Power Hitters Table</span>
            </h3>
            <p className="text-xs text-gray-400">Detailed breakdown of 6s, 4s, Strike Rates, and total runs</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-900/90 text-xs uppercase text-gray-400 border-b border-gray-800">
              <tr>
                <th className="py-3.5 px-4">Rank</th>
                <th className="py-3.5 px-4">Player</th>
                <th className="py-3.5 px-4">Team</th>
                <th className="py-3.5 px-4 text-center">Sixes (6s)</th>
                <th className="py-3.5 px-4 text-center">Fours (4s)</th>
                <th className="py-3.5 px-4 text-center">Total Runs</th>
                <th className="py-3.5 px-4 text-center">Strike Rate</th>
                <th className="py-3.5 px-4 text-center">Boundary Runs %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {seasonData.player_stats?.map((player, idx) => {
                const boundaryRuns = (player.sixes * 6) + (player.fours * 4);
                const boundaryPct = player.runs > 0 ? ((boundaryRuns / player.runs) * 100).toFixed(1) : '0';
                return (
                  <tr key={idx} className="hover:bg-gray-850/60 transition">
                    <td className="py-3 px-4 font-bold text-amber-400">#{idx + 1}</td>
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      {idx === 0 && <Award className="w-4 h-4 text-amber-400 inline" />}
                      {player.player_name}
                    </td>
                    <td className="py-3 px-4 text-gray-400">{player.team}</td>
                    <td className="py-3 px-4 text-center font-extrabold text-purple-300">{player.sixes}</td>
                    <td className="py-3 px-4 text-center font-extrabold text-emerald-300">{player.fours}</td>
                    <td className="py-3 px-4 text-center font-bold text-amber-300">{player.runs}</td>
                    <td className="py-3 px-4 text-center text-gray-300 font-mono">{player.strike_rate}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        {boundaryPct}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
