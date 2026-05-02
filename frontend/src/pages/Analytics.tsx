import React from 'react';

const Analytics: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-white mb-2">Platform Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1c1b1b] border border-white/10 rounded-xl p-6">
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-2">Total Recordings</p>
          <p className="text-4xl font-bold text-white">1,204</p>
          <p className="text-emerald-500 text-xs mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span> +12% this week
          </p>
        </div>
        <div className="bg-[#1c1b1b] border border-white/10 rounded-xl p-6">
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-2">Hours Collected</p>
          <p className="text-4xl font-bold text-white">42.5</p>
          <p className="text-emerald-500 text-xs mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span> +5.2 hrs this week
          </p>
        </div>
        <div className="bg-[#1c1b1b] border border-white/10 rounded-xl p-6">
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-2">Active Speakers</p>
          <p className="text-4xl font-bold text-white">86</p>
          <p className="text-zinc-500 text-xs mt-2 flex items-center gap-1">
            Across 12 districts
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
