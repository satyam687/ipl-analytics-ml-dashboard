import React from 'react';
import { Flame, ShieldAlert, Zap, Target, User, BarChart2, Award } from 'lucide-react';

export default function SeasonOverviewTab({ seasonData }) {
  if (!seasonData) return null;

  return (
    <div className="space-y-8">
      
      {/* Top Honors (Orange Cap & Purple Cap) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Orange Cap Winner */}
        <div className="glass-card glass-card-hover p-6 rounded-3xl border-l-4 border-amber-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 text-amber-500">
            <Flame className="w-32 h-32" />
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                🍊 ORANGE CAP WINNER (HIGHEST RUNS)
              </span>
              <h3 className="text-2xl font-black text-white">{seasonData.orange_cap_player}</h3>
              <p className="text-xs text-gray-400 font-medium">{seasonData.orange_cap_team}</p>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400">Total Season Runs</span>
              <div className="text-3xl font-extrabold text-amber-300">{seasonData.orange_cap_runs}</div>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400">Award Status</span>
              <div className="text-sm font-bold text-emerald-400">Orange Cap Champion 🏆</div>
            </div>
          </div>
        </div>

        {/* Purple Cap Winner */}
        <div className="glass-card glass-card-hover p-6 rounded-3xl border-l-4 border-purple-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 text-purple-500">
            <Target className="w-32 h-32" />
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
                💜 PURPLE CAP WINNER (MOST WICKETS)
              </span>
              <h3 className="text-2xl font-black text-white">{seasonData.purple_cap_player}</h3>
              <p className="text-xs text-gray-400 font-medium">{seasonData.purple_cap_team}</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400">Total Wickets Taken</span>
              <div className="text-3xl font-extrabold text-purple-300">{seasonData.purple_cap_wickets}</div>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400">Award Status</span>
              <div className="text-sm font-bold text-purple-400">Purple Cap Champion 🎯</div>
            </div>
          </div>
        </div>

      </div>

      {/* Season Key Stat Counter Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl text-center">
          <span className="text-xs text-gray-400 font-medium block">TOTAL MATCHES</span>
          <div className="text-2xl font-black text-white mt-1">{seasonData.total_matches}</div>
          <span className="text-[10px] text-gray-500 mt-1 block">Played in IPL {seasonData.year}</span>
        </div>

        <div className="glass-card p-5 rounded-2xl text-center">
          <span className="text-xs text-amber-400 font-medium block">TOTAL RUNS SCORED</span>
          <div className="text-2xl font-black text-amber-300 mt-1">{seasonData.total_runs.toLocaleString()}</div>
          <span className="text-[10px] text-amber-500/70 mt-1 block">Runs across tournament</span>
        </div>

        <div className="glass-card p-5 rounded-2xl text-center">
          <span className="text-xs text-purple-400 font-medium block">TOTAL SIXES (6s)</span>
          <div className="text-2xl font-black text-purple-300 mt-1">{seasonData.total_sixes}</div>
          <span className="text-[10px] text-purple-400/70 mt-1 block">Over the boundary</span>
        </div>

        <div className="glass-card p-5 rounded-2xl text-center">
          <span className="text-xs text-emerald-400 font-medium block">TOTAL FOURS (4s)</span>
          <div className="text-2xl font-black text-emerald-300 mt-1">{seasonData.total_fours}</div>
          <span className="text-[10px] text-emerald-400/70 mt-1 block">Ground boundaries</span>
        </div>
      </div>

      {/* Top Players Breakdown Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Top 5 Run Scorers */}
        <div className="glass-card p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              <span>Top 5 Run Scorers (IPL {seasonData.year})</span>
            </h4>
            <span className="text-xs font-semibold text-amber-400">Orange Cap Race</span>
          </div>

          <div className="space-y-3">
            {seasonData.top_runs?.slice(0, 5).map((player, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-900/60 border border-gray-800/80 hover:border-amber-500/30 transition">
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs ${
                    idx === 0 ? 'bg-amber-500 text-gray-950' : 'bg-gray-800 text-gray-300'
                  }`}>
                    #{idx + 1}
                  </span>
                  <div>
                    <span className="text-sm font-bold text-gray-100 block">{player.player_name}</span>
                    <span className="text-xs text-gray-400">{player.team}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-amber-300 block">{player.runs} Runs</span>
                  <span className="text-xs text-gray-400">{player.sixes} 6s • {player.fours} 4s</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Wicket Takers */}
        <div className="glass-card p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" />
              <span>Top Wicket Takers (IPL {seasonData.year})</span>
            </h4>
            <span className="text-xs font-semibold text-purple-400">Purple Cap Race</span>
          </div>

          <div className="space-y-3">
            {seasonData.top_wickets?.slice(0, 5).map((player, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-900/60 border border-gray-800/80 hover:border-purple-500/30 transition">
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs ${
                    idx === 0 ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-300'
                  }`}>
                    #{idx + 1}
                  </span>
                  <div>
                    <span className="text-sm font-bold text-gray-100 block">{player.player_name}</span>
                    <span className="text-xs text-gray-400">{player.team}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-purple-300 block">{player.wickets} Wickets</span>
                  <span className="text-xs text-gray-400">Econ: {player.economy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
