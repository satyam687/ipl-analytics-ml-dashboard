import React from 'react';
import { Award, Image as ImageIcon, Download, RefreshCw, BarChart2 } from 'lucide-react';

export default function MatplotlibEngineTab({ seasonData }) {
  if (!seasonData) return null;

  const charts = seasonData.matplotlib_charts || {};

  return (
    <div className="space-y-8">
      
      {/* Header Info */}
      <div className="glass-card p-6 rounded-3xl border border-amber-500/20 bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold mb-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>PYTHON MATPLOTLIB & NUMPY SERVER-SIDE GRAPH ENGINE</span>
          </div>
          <h2 className="text-2xl font-black text-white">
            Matplotlib Rendered Visualizations for IPL {seasonData.year}
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Dynamic high-resolution charts generated server-side using NumPy data matrices & Matplotlib.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-gray-800 text-xs font-mono text-emerald-400 border border-gray-700">
            Backend: Python 3.13 + Matplotlib 3.10 + NumPy 2.3
          </span>
        </div>
      </div>

      {/* Grid of Matplotlib Generated Base64 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 1. Run Progression Graph */}
        <div className="glass-card p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-amber-400" />
              <span>Matplotlib Runs Graph</span>
            </h3>
            <span className="text-xs text-amber-400 font-mono">base64/png</span>
          </div>

          {charts.runs_progression_graph ? (
            <div className="relative group rounded-2xl overflow-hidden border border-gray-800 bg-gray-950 p-2">
              <img
                src={`data:image/png;base64,${charts.runs_progression_graph}`}
                alt="Matplotlib Runs Graph"
                className="w-full h-auto rounded-xl object-contain shadow-lg"
              />
              <div className="absolute inset-0 bg-gray-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <a
                  href={`data:image/png;base64,${charts.runs_progression_graph}`}
                  download={`ipl_${seasonData.year}_runs_graph.png`}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-gray-950 font-bold text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition"
                >
                  <Download className="w-4 h-4" /> Download PNG
                </a>
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500 text-sm">
              Rendering Matplotlib Runs Graph...
            </div>
          )}
        </div>

        {/* 2. Sixes & Fours Leaderboard Graph */}
        <div className="glass-card p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-purple-400" />
              <span>Matplotlib 6s & 4s Leaderboard</span>
            </h3>
            <span className="text-xs text-purple-400 font-mono">base64/png</span>
          </div>

          {charts.sixes_fours_graph ? (
            <div className="relative group rounded-2xl overflow-hidden border border-gray-800 bg-gray-950 p-2">
              <img
                src={`data:image/png;base64,${charts.sixes_fours_graph}`}
                alt="Matplotlib Sixes & Fours Graph"
                className="w-full h-auto rounded-xl object-contain shadow-lg"
              />
              <div className="absolute inset-0 bg-gray-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <a
                  href={`data:image/png;base64,${charts.sixes_fours_graph}`}
                  download={`ipl_${seasonData.year}_sixes_fours_graph.png`}
                  className="px-4 py-2 rounded-xl bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition"
                >
                  <Download className="w-4 h-4" /> Download PNG
                </a>
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500 text-sm">
              Rendering Matplotlib 6s & 4s Graph...
            </div>
          )}
        </div>

      </div>

      {/* 3. Orange Cap High Runs Matplotlib Graph */}
      <div className="glass-card p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <span>Matplotlib Orange Cap Leaderboard (High Run Scorers Bar Chart)</span>
          </h3>
          <span className="text-xs text-emerald-400 font-mono">base64/png</span>
        </div>

        {charts.high_runs_graph ? (
          <div className="relative group rounded-2xl overflow-hidden border border-gray-800 bg-gray-950 p-2">
            <img
              src={`data:image/png;base64,${charts.high_runs_graph}`}
              alt="Matplotlib High Runs Graph"
              className="w-full h-auto rounded-xl object-contain shadow-lg"
            />
            <div className="absolute inset-0 bg-gray-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <a
                href={`data:image/png;base64,${charts.high_runs_graph}`}
                download={`ipl_${seasonData.year}_orange_cap_graph.png`}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-gray-950 font-bold text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition"
              >
                <Download className="w-4 h-4" /> Download PNG
              </a>
            </div>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-500 text-sm">
            Rendering Matplotlib High Runs Graph...
          </div>
        )}
      </div>

    </div>
  );
}
