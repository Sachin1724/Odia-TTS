import { Link } from 'react-router-dom';
import BackgroundOverlay from '../components/BackgroundOverlay';

const ApiDocs: React.FC = () => {
  return (
    <div className="bg-[#09090b] text-white font-sans min-h-screen selection:bg-white/20 relative">
      <BackgroundOverlay opacity={0.01} />
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#09090b] border-b border-white/10 flex justify-between items-center px-6 h-14">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="text-xs uppercase tracking-widest font-medium">Back to Home</span>
          </Link>
          <span className="text-zinc-700">|</span>
          <span className="text-lg font-bold tracking-widest text-white">ODIA.AI API</span>
        </div>
      </header>

      <main className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
        <section className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Developer Documentation</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Integrate the power of neural Odia synthesis into your applications. Our REST API provides 
            low-latency access to multi-dialect TTS models trained on high-fidelity linguistic datasets.
          </p>
        </section>

        <section className="space-y-12">
          {/* Endpoint */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b border-white/10 pb-2">Synthesis Endpoint</h2>
            <div className="bg-[#1c1b1b] rounded-lg p-4 font-mono text-sm border border-white/5 flex items-center justify-between">
              <code className="text-emerald-400">POST https://api.odia.ai/v1/synthesize</code>
              <span className="text-zinc-600 text-xs">JSON</span>
            </div>
          </div>

          {/* Authentication */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b border-white/10 pb-2">Authentication</h2>
            <p className="text-zinc-400">Include your API key in the request header:</p>
            <div className="bg-[#1c1b1b] rounded-lg p-4 font-mono text-sm border border-white/5">
              <code className="text-zinc-300">Authorization: Bearer YOUR_API_KEY</code>
            </div>
          </div>

          {/* Request Body */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b border-white/10 pb-2">Request Body</h2>
            <div className="bg-[#1c1b1b] rounded-lg p-6 font-mono text-sm border border-white/5 text-zinc-300 overflow-x-auto">
              <pre>{`{
  "text": "ନମସ୍କାର, ଆପଣ କେମିତି ଅଛନ୍ତି?",
  "dialect": "standard",
  "voice_id": "odia-male-01",
  "output_format": "mp3",
  "sample_rate": 24000
}`}</pre>
            </div>
          </div>

          {/* Dialects */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b border-white/10 pb-2">Supported Dialects</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Standard', 'Sambalpuri', 'Ganjami', 'Baleswari', 'Desiya', 'Kalahandia'].map(d => (
                <div key={d} className="bg-[#1c1b1b] p-4 rounded-lg border border-white/5 text-center">
                  <span className="text-sm font-medium">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-500 text-sm">© 2026 ODIA.AI Research Lab. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-zinc-400 uppercase tracking-widest font-medium">
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Status</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ApiDocs;
