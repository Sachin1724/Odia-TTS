import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_GAS_API_URL || 'YOUR_GAS_ENDPOINT_URL_HERE';

const Analytics: React.FC = () => {
  const [stats, setStats] = useState({
    totalVoices: 0,
    activeSpeakers: 0,
    hoursCollected: 0,
    districts: 0,
    leaderboard: [] as {name: string, voices: number, district: string}[]
  });
  const [loading, setLoading] = useState(true);
  const [localVoices, setLocalVoices] = useState(0);

  useEffect(() => {
    const savedVoiceCount = parseInt(localStorage.getItem('odiaTtsVoiceCount') || '0', 10);
    setLocalVoices(savedVoiceCount);

    const fetchStats = async () => {
      if (API_URL === 'YOUR_GAS_ENDPOINT_URL_HERE') {
        // If no API URL, show demo data
        setStats({
          totalVoices: 1245,
          activeSpeakers: 128,
          hoursCollected: 4.5,
          districts: 12,
          leaderboard: [
            { name: "Sachin K.", voices: 412, district: "Khordha" },
            { name: "Priya M.", voices: 388, district: "Cuttack" },
            { name: "Debashish S.", voices: 245, district: "Sambalpur" },
            { name: "Ramesh P.", voices: 180, district: "Ganjam" },
            { name: "Anjali D.", voices: 156, district: "Balasore" }
          ]
        });
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(API_URL);
        const result = await response.json();
        if (result.status === 'success') {
          setStats(result.stats);
          
          try {
            const savedMetadata = localStorage.getItem('odiaTtsMetadata');
            if (savedMetadata) {
              const meta = JSON.parse(savedMetadata);
              const userName = (meta.name || meta.fullName || '').trim().toLowerCase();
              const userStat = result.stats.leaderboard.find((u: any) => u.name.toLowerCase() === userName);
              
              if (userStat && userStat.voices > savedVoiceCount) {
                setLocalVoices(userStat.voices);
                localStorage.setItem('odiaTtsVoiceCount', userStat.voices.toString());
              }
            }
          } catch(e) {
            console.error('Error syncing local voices', e);
          }
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
      {localVoices >= 52 && (
        <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/50 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in duration-500">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🏆</span>
            </div>
            <div>
              <h3 className="text-yellow-400 font-bold text-lg">Voice Pioneer Achieved!</h3>
              <p className="text-yellow-200/80 text-sm">You have contributed all 52 required voice samples.</p>
            </div>
          </div>
          <div className="px-4 py-2 bg-yellow-500 text-black font-bold uppercase tracking-widest text-xs rounded-lg shadow-[0_0_15px_rgba(234,179,8,0.4)]">
             Verified Contributor
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-1">Platform Analytics</h2>
          <p className="text-zinc-500 text-sm">Real-time statistics across the OdiaTTS ecosystem.</p>
        </div>
        <div className="flex items-center gap-2 bg-zinc-800/50 px-4 py-2 rounded-lg border border-white/5">
          <span className="text-xs text-zinc-400 uppercase tracking-widest">Your Contribution:</span>
          <span className="text-white font-mono font-bold">{localVoices} / 52</span>
        </div>
      </div>
      
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1c1b1b] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-yellow-500">leaderboard</span>
              Top Contributors
            </h3>
            <span className="text-xs text-zinc-500 uppercase tracking-widest font-mono">Live Ranking</span>
          </div>

          <div className="overflow-x-auto overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
            <table className="w-full text-left text-sm text-zinc-400">
              <thead className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-500 border-b border-white/10">
                <tr>
                  <th className="px-2 md:px-4 py-3 font-medium">Rank</th>
                  <th className="px-2 md:px-4 py-3 font-medium">Contributor</th>
                  <th className="px-2 md:px-4 py-3 font-medium">Voices</th>
                  <th className="px-2 md:px-4 py-3 font-medium">District</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                   <tr><td colSpan={4} className="py-8 text-center text-zinc-500">Loading Leaderboard...</td></tr>
                ) : (
                  <>
                    {stats.leaderboard.length === 0 ? (
                      <tr><td colSpan={4} className="py-8 text-center text-zinc-500">No contributors yet. Be the first!</td></tr>
                    ) : (
                      stats.leaderboard.map((user, index) => (
                        <tr key={index} className={`border-b border-white/5 transition-colors ${index === 0 ? 'bg-yellow-500/5 hover:bg-yellow-500/10' : index === 1 ? 'bg-zinc-100/5 hover:bg-zinc-100/10' : index === 2 ? 'bg-amber-600/5 hover:bg-amber-600/10' : 'hover:bg-white/5'}`}>
                          <td className={`px-2 md:px-4 py-3 md:py-4 ${index < 3 ? 'text-base md:text-xl' : 'font-mono text-zinc-500 text-center text-[10px] md:text-sm'}`}>
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                          </td>
                          <td className={`px-2 md:px-4 py-3 md:py-4 font-medium flex items-center gap-1 md:gap-2 text-[10px] md:text-sm leading-tight ${index === 0 ? 'text-yellow-400 font-bold' : index === 1 ? 'text-zinc-200' : index === 2 ? 'text-zinc-300' : 'text-zinc-400'}`}>
                            <span className="truncate max-w-[100px] md:max-w-[200px] inline-block">{user.name}</span>
                            {index === 0 && <span className="text-[8px] md:text-[10px] bg-yellow-500 text-black px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Top</span>}
                          </td>
                          <td className={`px-2 md:px-4 py-3 md:py-4 font-mono text-[10px] md:text-sm ${index === 0 ? 'text-yellow-400 font-bold' : 'text-zinc-200'}`}>{user.voices}</td>
                          <td className="px-2 md:px-4 py-3 md:py-4 text-[10px] md:text-sm truncate max-w-[70px] md:max-w-none">{user.district}</td>
                        </tr>
                      ))
                    )}
                    
                    {localVoices > 0 && (
                      <tr className="bg-red-500/10 border-t border-red-500/30">
                        <td className="px-2 md:px-4 py-3 md:py-4 font-mono text-red-400 text-center text-[10px] md:text-sm">#</td>
                        <td className="px-2 md:px-4 py-3 md:py-4 font-medium text-red-400 text-[10px] md:text-sm">You</td>
                        <td className="px-2 md:px-4 py-3 md:py-4 font-mono text-white font-bold text-[10px] md:text-sm">{localVoices}</td>
                        <td className="px-2 md:px-4 py-3 md:py-4 text-red-400/70 text-[10px] md:text-sm">Local</td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#1c1b1b] border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-4 self-start sticky top-6">
          <div className="w-24 h-24 rounded-full border-4 border-zinc-800 flex items-center justify-center relative">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
               <circle cx="50" cy="50" r="46" fill="none" stroke="#27272a" strokeWidth="8" />
               <circle 
                 cx="50" cy="50" r="46" 
                 fill="none" 
                 stroke={localVoices >= 52 ? "#eab308" : "#ef4444"} 
                 strokeWidth="8" 
                 strokeDasharray="289.026" 
                 strokeDashoffset={289.026 - ((Math.min(localVoices, 52) / 52) * 289.026)}
                 className="transition-all duration-1000 ease-out"
               />
            </svg>
            <span className="text-2xl font-bold font-mono text-white">{Math.round((Math.min(localVoices, 52)/52)*100)}%</span>
          </div>
          <div>
            <h3 className="text-white font-medium mb-1">Your Progress</h3>
            <p className="text-zinc-500 text-sm">
              {localVoices >= 52 
                ? "You have completed the core goal!" 
                : `Record ${52 - localVoices} more voices to unlock the Pioneer Badge.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
