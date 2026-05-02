import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_GAS_API_URL || 'YOUR_GAS_ENDPOINT_URL_HERE';

const Analytics: React.FC = () => {
  const [stats, setStats] = useState({
    totalVoices: 0,
    activeSpeakers: 0,
    hoursCollected: 0,
    districts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (API_URL === 'YOUR_GAS_ENDPOINT_URL_HERE') {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(API_URL);
        const result = await response.json();
        if (result.status === 'success') {
          setStats(result.stats);
        }
      } catch (err) {
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-white mb-2">Platform Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1c1b1b] border border-white/10 rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-4xl">mic</span>
          </div>
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-2">Total Recordings</p>
          <p className="text-4xl font-bold text-white">{loading ? '...' : stats.totalVoices.toLocaleString()}</p>
          <p className="text-emerald-500 text-xs mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span> Real-time data
          </p>
        </div>

        <div className="bg-[#1c1b1b] border border-white/10 rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-4xl">schedule</span>
          </div>
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-2">Hours Collected</p>
          <p className="text-4xl font-bold text-white">{loading ? '...' : stats.hoursCollected}</p>
          <p className="text-emerald-500 text-xs mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">bolt</span> Estimated
          </p>
        </div>

        <div className="bg-[#1c1b1b] border border-white/10 rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-4xl">group</span>
          </div>
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-2">Active Speakers</p>
          <p className="text-4xl font-bold text-white">{loading ? '...' : stats.activeSpeakers.toLocaleString()}</p>
          <p className="text-zinc-500 text-xs mt-2 flex items-center gap-1">
            Across {stats.districts} districts
          </p>
        </div>
      </div>

      <div className="bg-[#1c1b1b] border border-white/10 rounded-xl p-6 h-[400px] flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-4xl text-zinc-600 mb-2">bar_chart</span>
          <p className="text-zinc-400">Detailed dialect distribution chart will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
