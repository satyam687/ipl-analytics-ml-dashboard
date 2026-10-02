import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WinnerCongratulationsModal from './components/WinnerCongratulationsModal';
import SeasonOverviewTab from './components/SeasonOverviewTab';
import GraphsVisualizationsTab from './components/GraphsVisualizationsTab';
import SixesAndFoursTab from './components/SixesAndFoursTab';
import MatplotlibEngineTab from './components/MatplotlibEngineTab';
import MLPredictorTab from './components/MLPredictorTab';
import AllTimeAnalyticsTab from './components/AllTimeAnalyticsTab';
import { Loader2, RefreshCw } from 'lucide-react';

export async function fetchApiData(endpointPath) {
  const hosts = ['http://localhost:8000', 'http://127.0.0.1:8000'];
  let lastError = null;
  
  for (const host of hosts) {
    try {
      const res = await fetch(`${host}${endpointPath}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error("Failed to fetch from backend servers");
}

export default function App() {
  const [activeYear, setActiveYear] = useState(2026);
  const [activeTab, setActiveTab] = useState('overview');
  const [seasonData, setSeasonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSeasonData(activeYear);
  }, [activeYear]);

  const fetchSeasonData = async (year) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchApiData(`/api/seasons/${year}/`);
      setSeasonData(data);
    } catch (err) {
      console.error('Failed to fetch IPL season data:', err);
      setError(`Could not fetch data for IPL ${year}. Please ensure Django backend is running.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 flex flex-col font-sans selection:bg-amber-500 selection:text-gray-950">
      
      {/* Sticky Header Navbar */}
      <Navbar
        activeYear={activeYear}
        setActiveYear={setActiveYear}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center space-y-4 text-center">
            <Loader2 className="w-12 h-12 text-amber-400 animate-spin" />
            <div className="text-lg font-bold text-gray-200">
              Fetching IPL {activeYear} Season Analytics & Matplotlib Graphs...
            </div>
            <p className="text-xs text-gray-500 max-w-sm">
              Retrieving datasets, 6s/4s boundary stats, and ML model weights from Django SQLite backend.
            </p>
          </div>
        ) : error ? (
          <div className="p-8 rounded-3xl glass-card border border-red-500/30 text-center space-y-4">
            <div className="text-red-400 font-bold text-lg">{error}</div>
            <button
              onClick={() => fetchSeasonData(activeYear)}
              className="px-4 py-2 rounded-xl bg-amber-500 text-gray-950 font-bold text-xs inline-flex items-center gap-2 hover:bg-amber-400 transition cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" /> Retry Connection
            </button>
          </div>
        ) : (
          <div>
            {/* Winner Team Champion Hero Banner */}
            {activeTab !== 'all_time' && activeTab !== 'ml_predictor' && (
              <WinnerCongratulationsModal seasonData={seasonData} />
            )}

            {/* Render Tab Components */}
            {activeTab === 'overview' && <SeasonOverviewTab seasonData={seasonData} />}
            {activeTab === 'graphs' && <GraphsVisualizationsTab seasonData={seasonData} />}
            {activeTab === 'sixes_fours' && <SixesAndFoursTab seasonData={seasonData} />}
            {activeTab === 'matplotlib' && <MatplotlibEngineTab seasonData={seasonData} />}
            {activeTab === 'ml_predictor' && <MLPredictorTab />}
            {activeTab === 'all_time' && <AllTimeAnalyticsTab />}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="glass-card border-t border-gray-800 py-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            IPL 2008 - 2026 Champion & Performance Analytics Engine
          </div>
          <div className="flex items-center gap-4 text-gray-400 font-medium">
            <span>ML NumPy / Pandas</span> • <span>Django REST API</span> • <span>SQLite3</span> • <span>Matplotlib</span> • <span>React & TailwindCSS</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
