import React, { useState, useEffect } from 'react';

const SpeakerProfile: React.FC = () => {
  const [metadata, setMetadata] = useState<any>(null);

  useEffect(() => {
    const savedMetadata = localStorage.getItem('odiaTtsMetadata');
    if (savedMetadata) {
      setMetadata(JSON.parse(savedMetadata));
    }
  }, []);

  if (!metadata) {
    return (
      <div className="text-zinc-400">
        No speaker profile found. Please complete the onboarding process first.
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold text-white mb-6">Speaker Profile</h2>
      
      <div className="bg-[#1c1b1b] border border-white/10 rounded-xl p-6 flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest mb-1">Full Name</p>
            <p className="text-white font-mono text-lg">{metadata.name}</p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest mb-1">Gender</p>
            <p className="text-white font-mono text-lg">{metadata.gender}</p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest mb-1">Age Group</p>
            <p className="text-white font-mono text-lg">{metadata.age}</p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest mb-1">Primary Dialect</p>
            <p className="text-emerald-400 font-mono text-lg">{metadata.dialect}</p>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 grid grid-cols-2 gap-6">
          <div>
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest mb-1">District</p>
            <p className="text-white font-mono text-lg">{metadata.district}</p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest mb-1">Sub-Area / Village</p>
            <p className="text-white font-mono text-lg">{metadata.subArea}</p>
          </div>
        </div>
        
        <div className="pt-4 flex justify-end border-t border-white/10 mt-2">
          <button 
            className="bg-zinc-800 text-white px-6 py-2 rounded-md text-sm font-medium uppercase tracking-widest hover:bg-zinc-700 transition-colors"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeakerProfile;
