import React, { useState, useEffect } from 'react';

const ApiSettings: React.FC = () => {
  const [gasUrl, setGasUrl] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedUrl = localStorage.getItem('odiaTtsGasUrl');
    if (savedUrl) {
      setGasUrl(savedUrl);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('odiaTtsGasUrl', gasUrl);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold text-white mb-6">API Settings</h2>
      
      <div className="bg-[#1c1b1b] border border-white/10 rounded-xl p-6 flex flex-col gap-4">
        <div>
          <label className="block text-xs font-medium text-[#e5e2e1] mb-2 uppercase tracking-wider">
            Google Apps Script Endpoint URL
          </label>
          <input
            className="w-full bg-[#0e0e0e] border border-[#444748] rounded-md px-4 py-3 font-mono text-sm text-[#e5e2e1] focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
            placeholder="https://script.google.com/macros/s/.../exec"
            value={gasUrl}
            onChange={(e) => setGasUrl(e.target.value)}
          />
          <p className="text-zinc-500 text-xs mt-2">
            This URL is used to submit your recorded audio and metadata to your personal Google Drive and Sheets. 
            If left blank, the app will use the default VITE_GAS_API_URL environment variable.
          </p>
        </div>
        
        <div className="pt-4 flex items-center justify-between border-t border-white/10 mt-2">
          {isSaved ? (
            <span className="text-emerald-500 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              Settings saved locally
            </span>
          ) : <div/>}
          
          <button 
            onClick={handleSave}
            className="bg-white text-black px-6 py-2 rounded-md text-sm font-medium uppercase tracking-widest hover:bg-zinc-200 transition-colors"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiSettings;
