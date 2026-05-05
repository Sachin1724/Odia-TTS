import React, { useEffect, useState } from 'react';

const Library: React.FC = () => {
  const [recordings, setRecordings] = useState<any[]>([]);
  const [userName, setUserName] = useState<string>('My');

  useEffect(() => {
    const saved = localStorage.getItem('odiaTtsRecordings');
    if (saved) {
      setRecordings(JSON.parse(saved).reverse());
    }
    
    const meta = localStorage.getItem('odiaTtsMetadata');
    if (meta) {
      try {
        const parsedMeta = JSON.parse(meta);
        if (parsedMeta.name) {
          setUserName(`${parsedMeta.name}'s`);
        }
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleDelete = (id: number) => {
    const updated = recordings.filter(rec => rec.id !== id);
    setRecordings(updated);
    
    const fromStorage = JSON.parse(localStorage.getItem('odiaTtsRecordings') || '[]');
    const newStorage = fromStorage.filter((rec: any) => rec.id !== id);
    localStorage.setItem('odiaTtsRecordings', JSON.stringify(newStorage));
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-white mb-2">{userName} Recordings</h2>
      
      <div className="bg-[#1c1b1b] border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="bg-[#0e0e0e] text-xs uppercase tracking-widest text-zinc-500 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 font-medium">Text Reference</th>
              <th className="px-6 py-4 font-medium w-32">Duration</th>
              <th className="px-6 py-4 font-medium w-48">Timestamp</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recordings.map((rec) => (
              <tr key={rec.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <p className="font-sans text-white text-lg">{rec.text}</p>
                  {rec.emotion && <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1 block">{rec.emotion} • {rec.dialect}</span>}
                </td>
                <td className="px-6 py-4 font-mono">{rec.duration || "00:00"}</td>
                <td className="px-6 py-4 font-mono text-xs">{rec.date}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-zinc-800 rounded text-white hover:bg-zinc-700 transition-colors" title="Play functionality coming soon">
                      <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                    </button>
                    <button 
                      onClick={() => handleDelete(rec.id)}
                      className="p-2 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 transition-colors"
                      title="Delete recording"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {recordings.length === 0 && (
          <div className="p-12 text-center text-zinc-500 flex flex-col items-center gap-4">
            <span className="material-symbols-outlined text-4xl opacity-50">mic_off</span>
            <p>No recordings found. Head to the Voice Recorder to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
