import React from 'react';

const Library: React.FC = () => {
  const dummyRecordings = [
    { id: 1, text: "ଆଜି ଆକାଶ ବହୁତ ସୁନ୍ଦର ଦେଖାଯାଉଛି।", duration: "00:04", date: "2026-04-30 10:23 AM" },
    { id: 2, text: "ଓଡ଼ିଆ ଭାଷା ଆମ ମାତୃଭାଷା ଏବଂ ଆମ ଗର୍ବ।", duration: "00:06", date: "2026-04-30 10:25 AM" },
    { id: 3, text: "ତୁ କ'ଣ ଖାଇଲୁ ଆଜି?", duration: "00:02", date: "2026-04-30 10:28 AM" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-white mb-2">My Recordings</h2>
      
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
            {dummyRecordings.map((rec) => (
              <tr key={rec.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4 font-sans text-white text-lg">{rec.text}</td>
                <td className="px-6 py-4 font-mono">{rec.duration}</td>
                <td className="px-6 py-4 font-mono text-xs">{rec.date}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-zinc-800 rounded text-white hover:bg-zinc-700 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                    </button>
                    <button className="p-2 bg-zinc-800 rounded text-white hover:bg-zinc-700 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">download</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {dummyRecordings.length === 0 && (
          <div className="p-12 text-center text-zinc-500">
            No recordings found. Head to the Voice Recorder to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
