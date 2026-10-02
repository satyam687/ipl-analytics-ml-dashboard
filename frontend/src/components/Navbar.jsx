import React from 'react';
import { Trophy, BarChart3, Flame, Cpu, History, Search, Calendar, Award } from 'lucide-react';

export default function Navbar({ activeYear, setActiveYear, activeTab, setActiveTab, seasonsList }) {
  const years = Array.from({ length: 19 }, (_, i) => 2008 + i);

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-gray-800 bg-gray-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 text-gray-950 shadow-lg shadow-amber-500/20 animate-pulse">
              <Trophy className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
                  IPL CHAMPIONS & ANALYTICS
                </h1>
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  2008 - 2026
                </span>
              </div>
              <p className="text-xs text-gray-400 font-medium">
                ML Powered • Django REST API • Matplotlib • React Dashboard
              </p>
            </div>
          </div>

          {/* Year Selector Control */}
          <div className="flex items-center gap-3 bg-gray-900/90 p-1.5 rounded-2xl border border-gray-800 shadow-inner">
            <div className="flex items-center gap-2 px-3 py-1 text-amber-400 text-xs font-semibold">
              <Calendar className="w-4 h-4" />
              <span>SELECT YEAR:</span>
            </div>

            <select
              value={activeYear}
              onChange={(e) => setActiveYear(Number(e.target.value))}
              className="bg-gray-800 hover:bg-gray-750 text-amber-300 text-sm font-bold rounded-xl px-3 py-1.5 border border-amber-500/30 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer shadow-sm transition"
            >
              {years.map((y) => (
                <option key={y} value={y} className="bg-gray-900 text-gray-100">
                  IPL {y}
                </option>
              ))}
            </select>

            {/* Quick Year Steppers */}
            <div className="flex items-center gap-1">
              <button
                disabled={activeYear <= 2008}
                onClick={() => setActiveYear(prev => Math.max(2008, prev - 1))}
                className="px-2.5 py-1 text-xs font-bold rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed text-gray-200 transition"
              >
                ◀ Prev
              </button>
              <button
                disabled={activeYear >= 2026}
                onClick={() => setActiveYear(prev => Math.min(2026, prev + 1))}
                className="px-2.5 py-1 text-xs font-bold rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed text-gray-200 transition"
              >
                Next ▶
              </button>
            </div>
          </div>

        </div>

        {/* Tab Navigation Menu */}
        <nav className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none border-t border-gray-800/60 pt-3">
          {[
            { id: 'overview', label: '🏆 Champion & Stats', icon: Trophy },
            { id: 'graphs', label: '📊 Interactive Graphs', icon: BarChart3 },
            { id: 'sixes_fours', label: '🏏 6s & 4s Leaders', icon: Flame },
            { id: 'matplotlib', label: '📈 Matplotlib Engine', icon: Award },
            { id: 'ml_predictor', label: '🤖 ML Match Predictor', icon: Cpu },
            { id: 'all_time', label: '📜 All-Time History', icon: History },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold rounded-xl whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 shadow-md shadow-amber-500/20 font-bold scale-[1.02]'
                    : 'text-gray-300 hover:bg-gray-800/80 hover:text-white border border-transparent hover:border-gray-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gray-950' : 'text-amber-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
