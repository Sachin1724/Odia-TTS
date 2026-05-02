import { useNavigate, Link } from 'react-router-dom';
import SuccessPopup from '../components/SuccessPopup';
import BackgroundOverlay from '../components/BackgroundOverlay';

const API_URL = import.meta.env.VITE_GAS_API_URL || 'YOUR_GAS_ENDPOINT_URL_HERE';

const TEXT_DATA = [
  {t:"ଓଡ଼ିଆ ଭାଷା ଆମ ମାତୃଭାଷା ଏବଂ ଆମ ଗର୍ବ।",r:"Odia bhaasha aama maatru-bhaasha ebang aama garba.",c:"Daily speech",tip:"Speak naturally with pride."},
  {t:"ଆଜି ଆକାଶ ବହୁତ ସୁନ୍ଦର ଦେଖାଯାଉଛି।",r:"Aaji aakaash bahuta sundara dekhaayaauchi.",c:"Daily speech",tip:"Casual, conversational observation."},
  {t:"ବଜାରରୁ ଆଳୁ, ପିଆଜ ଓ ଟମାଟୋ ଆଣ।",r:"Baajaararu aaloo, piaaja o tamaato aana.",c:"Daily speech",tip:"List items clearly, slight pause between each."},
  {t:"ଭଲ ଲାଗୁଛି, ଧନ୍ୟବାଦ।",r:"Bhala laaguchi, dhanyabaada.",c:"Daily speech",tip:"Warm, natural gratitude."},
  {t:"ତୁ କ'ଣ ଖାଇଲୁ ଆଜି?",r:"Tu ka'na khailu aaji?",c:"Daily speech",tip:"Friendly question, rising tone at end."},
  {t:"ମୁଁ ରୋଜ ସକାଳୁ ବ୍ୟାୟାମ କରେ।",r:"Mun roja sakaalu byaayaama kare.",c:"Daily speech",tip:"Routine statement, relaxed pace."},
  {t:"ଏ ମାଛ ଅଳ୍ପ ଝାଳ ଦେ।",r:"E maacha alpa jhaala de.",c:"Daily speech",tip:"Casual kitchen instruction."},
  {t:"ତୁ ଆସ, ଆମେ ଏକଜାକ ଯିବା।",r:"Tu aasa, aame ekajaka jibaa.",c:"Daily speech",tip:"Friendly, casual invitation."},
  {t:"ଏଠାରୁ ପୁରୀ ଯିବା ପାଇଁ କେତେ ସମୟ ଲାଗିବ?",r:"Ethaaru Puri jibaa paain kete samaya laagiba?",c:"Questions",tip:"Question tone. Rise on 'kete'."},
  {t:"ଏ ବସ୍ ଷ୍ଟାଣ୍ଡ କେଉଁ ଦିଗରେ?",r:"E bas stand keun digare?",c:"Questions",tip:"Seeking direction, curious tone."},
  {t:"ତୁ ଏବେ ଠୁ କ'ଣ ପଢ଼ୁଛ?",r:"Tu ebe thoo ka'na padhucha?",c:"Questions",tip:"Friendly enquiry, relaxed."},
  {t:"ଦୋକାନ ଏବେ ଖୋଲାଛି କି?",r:"Dokaan ebe kholaa chhi ki?",c:"Questions",tip:"Simple yes/no question, slight rise at end."},
  {t:"ରଥଯାତ୍ରା ପୁରୀର ସବୁଠୁ ବଡ଼ ଉତ୍ସବ।",r:"Rathayaatraa Purira sabuthoo bada utsaba.",c:"Cultural",tip:"Celebratory, reverent tone."},
  {t:"ଜଗନ୍ନାଥ ମନ୍ଦିର ଆମ ଗର୍ବ।",r:"Jagannatha mandira aama garba.",c:"Cultural",tip:"Speak with pride and reverence."},
  {t:"ଶ୍ରୀ ଜଗନ୍ନାଥଙ୍କ ମହିମା ଅସୀମ।",r:"Shri Jagannaathanka mahimaa aseema.",c:"Cultural",tip:"Devotional tone, measured pace."},
  {t:"କଟକ ରୂପା ଗହଣା ପ୍ରସିଦ୍ଧ।",r:"Kataka roopaa gahanaa prasiddha.",c:"Cultural",tip:"Emphasise 'roopaa gahanaa'."},
  {t:"ଆମ ସଂସ୍କୃତି ଆମ ପରିଚୟ।",r:"Aama sanskriti aama parichaya.",c:"Cultural",tip:"Short and meaningful — let it land."},
  {t:"ଓଡ଼ିଶୀ ନୃତ୍ୟ ଆମ ଗୌରବ।",r:"Odissi nritya aama gaurava.",c:"Cultural",tip:"Pride in classical dance."},
  {t:"ମහାନଦୀ ଓଡ଼ିଶାର ଜୀବନ ରେଖା।",r:"Mahanadi Odishaara jeebana rekhaa.",c:"Geography",tip:"Slow, clear pronunciation of 'Mahanadi'."},
  {t:"ଚିଲିକା ହ୍ରଦ ବହୁ ପ୍ରଜାତିର ପକ୍ଷୀଙ୍କ ଆଶ୍ରୟ।",r:"Chilika hrada bahu prajaaatira pakshiinka aashraya.",c:"Geography",tip:"Nature documentary feel — slow and clear."},
  {t:"ଏ ବର୍ଷ ଧାନ ଭଲ ହୋଇଛି।",r:"E barsa dhaana bhala hoi achhi.",c:"Geography",tip:"Rural/agricultural, matter-of-fact."},
  {t:"ଏ ବର୍ଷ ବର୍ଷା ବହୁତ ଅଧିକ ହୋଇଛି।",r:"E barsa barshaa bahuta adhika hoi achhi.",c:"Weather & nature",tip:"Conversational weather observation."},
  {t:"ଗ୍ରୀଷ୍ମ ଋତୁରେ ଆମ୍ବ ମିଳୁଛି।",r:"Greeshma rituure aamba miluchi.",c:"Weather & nature",tip:"Seasonal, pleasant tone."},
  {t:"ନଦୀ କୂଳରେ ବସି ଥଣ୍ଡା ପବନ ଲାଗୁଛି।",r:"Nadi koolore basi thandaa pabana laaguchi.",c:"Weather & nature",tip:"Relaxed, descriptive, slow pace."},
  {t:"ଡାକ୍ତର ଆସିବାର ଅଛି, ଅପେକ୍ଷା କର।",r:"Daaktara aasibara achhi, apekshaa kara.",c:"Instructions",tip:"Calm and clear instruction."},
  {t:"ଦୟାକରି ଦ୍ୱାର ବନ୍ଦ କର।",r:"Dayaakari dwaara banda kara.",c:"Instructions",tip:"Polite but clear."},
  {t:"ଏହି ଔଷଧ ସକାଳୁ ଓ ସନ୍ଧ୍ୟାରେ ଖାଅ।",r:"Ehi aushadha sakaalu o sandhyaare khaa'o.",c:"Instructions",tip:"Medical — slow and very clear."},
  {t:"ଏହି ଗ୍ରାମରେ ବିଦ୍ୟୁତ ନାହିଁ।",r:"Ehi graamare bidyuta naanhin.",c:"Instructions",tip:"Problem statement, serious tone."},
  {t:"ଆଜ୍ଞା, ଆପଣ କ'ଣ ଖୋଜୁଛନ୍ତି?",r:"Aagjaa, aapana ka'na khojuchhanti?",c:"Formal speech",tip:"Respectful, formal register."},
  {t:"ଧନ୍ୟବାଦ, ଆପଣଙ୍କ ସହଯୋଗ ଅମୂଲ୍ୟ।",r:"Dhanyabaada, aapananka sahaayoga amoolya.",c:"Formal speech",tip:"Formal gratitude, measured pace."},
  {t:"ଆମ ବିଶ୍ୱବିଦ୍ୟାଳୟ ଦ୍ୱାରା ଏହି ପ୍ରକଳ୍ପ ଚଳାଯାଉଛି।",r:"Aama bishwabidyaalaya dwaara ehi prakalpaa chalayauchi.",c:"Formal speech",tip:"Institutional, clear enunciation."},
  {t:"ଓଡ଼ିଶା ସରକାର ଏହି ଯୋଜନା ଆରମ୍ଭ କଲେ।",r:"Odisha sarakaar ehi yojanaa aarambha kale.",c:"Formal speech",tip:"News announcement style."}
];

const Collect: React.FC = () => {
  const navigate = useNavigate();
  const [metadata, setMetadata] = useState<any>(null);
  const [translatedText, setTranslatedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [contributionStats, setContributionStats] = useState({ totalVoices: 0, contributorRank: 0 });

  useEffect(() => {
    const savedMetadata = localStorage.getItem('odiaTtsMetadata');
    if (savedMetadata) {
      setMetadata(JSON.parse(savedMetadata));
    } else {
      // If no metadata, redirect back to onboarding
      navigate('/onboarding');
    }
  }, [navigate]);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setAudioBlob(null);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Could not access the microphone. Please check permissions.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop all tracks to release the mic
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleSave = async () => {
    if (!audioBlob) {
      alert("Please record audio first.");
      return;
    }
    if (!translatedText) {
      alert("Please provide the translated text.");
      return;
    }

    setIsSubmitting(true);
    try {
      const base64Audio = await blobToBase64(audioBlob);

      const currentSentence = TEXT_DATA[currentIndex];
      const payload = {
        metadata: metadata,
        text: {
          standard: currentSentence.t,
          romanized: currentSentence.r,
          translated: translatedText
        },
        audio: base64Audio
      };

      if (API_URL === 'YOUR_GAS_ENDPOINT_URL_HERE') {
          console.log("Mock Payload (API not set):", payload);
          setContributionStats({ 
            totalVoices: 0, 
            contributorRank: 0 
          });
          setShowSuccess(true);
      } else {
          const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(payload),
          });
          
          const result = await response.json();
          console.log("Submitted to GAS", result);
          
          if (result.stats) {
            setContributionStats({
              totalVoices: result.stats.totalVoices,
              contributorRank: result.stats.contributorRank
            });
          }
          setShowSuccess(true);
      }
      
    } catch (err) {
      console.error('Error submitting data:', err);
      alert('Failed to save data. See console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    // Reset for next sentence
    setTranslatedText('');
    setAudioBlob(null);
    if (currentIndex < TEXT_DATA.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate('/workspace/analytics');
    }
  };

  if (!metadata) return null;

  return (
    <div className="bg-[#141313] text-[#e5e2e1] min-h-screen flex flex-col font-sans selection:bg-white/20 relative">
      <BackgroundOverlay opacity={0.01} />
      {/* TopAppBar */}
      <header className="bg-[#09090b] text-white fixed top-0 w-full z-50 border-b border-white/10 flex justify-between items-center px-4 md:px-6 h-14">
        <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
          <Link to="/" className="text-zinc-500 hover:text-white transition-colors flex items-center gap-1 mr-1 md:mr-2 flex-shrink-0">
            <span className="material-symbols-outlined text-lg">home</span>
          </Link>
          <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
            <Link to="/workspace/analytics" className="text-sm md:text-lg font-bold tracking-widest text-white hover:text-white/80 transition-colors flex-shrink-0">ODIA.AI</Link>
            <span className="text-zinc-500 text-sm">/</span>
            <span className="font-mono text-zinc-300 text-[10px] md:text-xs truncate hidden sm:inline">OdiaTTS Collection</span>
            <div className="bg-zinc-800 text-white/70 px-2 py-0.5 rounded text-[10px] font-mono uppercase border border-white/10 flex-shrink-0">
              {metadata.dialect}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="flex items-center gap-2 text-zinc-400 font-mono text-[10px] md:text-sm">
            <span className="hidden md:inline">Speaker:</span>
            <span className="text-white max-w-[80px] md:max-w-none truncate">{metadata.name}</span>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 pt-14 h-screen overflow-hidden">
        {/* Canvas */}
        <main className="flex-1 overflow-y-auto bg-[#0e0e0e] relative flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-3xl flex flex-col gap-8">
            {/* Step 1: Reference */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-zinc-500 text-[10px] md:text-xs font-medium uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm">library_books</span>
                <span>Standard Reference ({currentIndex + 1}/{TEXT_DATA.length})</span>
              </div>
              <div className="p-5 md:p-8 border border-white/10 rounded-xl bg-[#1c1b1b] flex flex-col gap-4">
                <div className="flex justify-between items-start gap-4">
                  <p className="font-sans text-white text-opacity-90 text-xl md:text-3xl leading-relaxed">{TEXT_DATA[currentIndex].t}</p>
                  <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-1 rounded whitespace-nowrap">{TEXT_DATA[currentIndex].c}</span>
                </div>
                <p className="text-zinc-400 text-sm md:text-lg italic">"{TEXT_DATA[currentIndex].r}"</p>
                <div className="flex items-center gap-2 mt-2 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                  <span className="material-symbols-outlined text-zinc-400 text-sm">lightbulb</span>
                  <p className="text-zinc-300 text-xs md:text-sm italic">{TEXT_DATA[currentIndex].tip}</p>
                </div>
              </div>
            </div>

            {/* Step 2: Input */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-white text-[10px] md:text-xs font-medium uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm">translate</span>
                <span>How do you say this naturally in your dialect?</span>
              </div>
              <div className="relative">
                <textarea
                  className="w-full bg-[#1c1b1b] border border-white/10 rounded-xl p-5 md:p-8 font-sans text-lg md:text-2xl text-white placeholder-zinc-600 focus:outline-none focus:border-white focus:ring-1 resize-none min-h-[140px]"
                  placeholder="Type the regional dialect here using English script..."
                  value={translatedText}
                  onChange={(e) => setTranslatedText(e.target.value)}
                />
              </div>
            </div>

            {/* Step 3: Recording Actions */}
            <div className="flex flex-col items-center justify-center pt-8 border-t border-white/10 gap-8 mt-4">
               {isRecording && (
                <div className="w-full h-16 flex items-center justify-center gap-1 opacity-50 animate-pulse">
                  <div className="w-1 h-4 bg-red-500 rounded-full"></div>
                  <div className="w-1 h-12 bg-red-500 rounded-full"></div>
                  <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                  <div className="w-1 h-10 bg-red-500 rounded-full"></div>
                  <span className="ml-4 text-red-500 font-mono text-sm">Recording...</span>
                </div>
              )}

              <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
                <button
                  onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                  disabled={currentIndex === 0 || isSubmitting}
                  className={`w-full md:w-auto px-6 py-3 rounded-lg text-[10px] md:text-xs font-medium uppercase flex items-center justify-center gap-2 transition-colors ${(currentIndex === 0 || isSubmitting) ? 'opacity-50 cursor-not-allowed text-zinc-600' : 'bg-transparent text-white border border-white/10 hover:bg-white/5'}`}
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  <span>Previous</span>
                </button>

                <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 w-full md:w-auto">
                  {!isRecording ? (
                  <button 
                    onClick={handleStartRecording}
                    className="w-full md:w-auto px-8 py-3 bg-red-600 text-white rounded-lg text-[10px] md:text-xs font-medium uppercase hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">mic</span>
                    {audioBlob ? "Retake Audio" : "Start Recording"}
                  </button>
                ) : (
                  <button 
                    onClick={handleStopRecording}
                    className="w-full md:w-auto px-8 py-3 bg-zinc-700 text-white rounded-lg text-[10px] md:text-xs font-medium uppercase hover:bg-zinc-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">stop_circle</span>
                    Stop Recording
                  </button>
                )}

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <button 
                    onClick={handleSave}
                    disabled={!audioBlob || !translatedText || isSubmitting}
                    className={`flex-1 md:flex-none px-8 py-3 rounded-lg text-[10px] md:text-xs font-medium uppercase flex items-center justify-center gap-2 transition-colors ${(!audioBlob || !translatedText || isSubmitting) ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-white text-black hover:bg-zinc-200'}`}
                  >
                    <span>{isSubmitting ? 'Saving...' : 'Save'}</span>
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      setTranslatedText('');
                      setAudioBlob(null);
                      setCurrentIndex(Math.min(TEXT_DATA.length - 1, currentIndex + 1));
                    }}
                    disabled={currentIndex === TEXT_DATA.length - 1 || isSubmitting}
                    className={`px-4 py-3 rounded-lg text-[10px] md:text-xs font-medium uppercase flex items-center justify-center gap-2 transition-colors ${(currentIndex === TEXT_DATA.length - 1 || isSubmitting) ? 'opacity-50 cursor-not-allowed text-zinc-600' : 'bg-transparent text-white border border-white/10 hover:bg-white/5'}`}
                    title="Skip to next sentence"
                  >
                    <span>Next</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <SuccessPopup 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        onRecordAnother={handleSuccessClose}
        contributorCount={contributionStats.contributorRank}
        totalVoices={contributionStats.totalVoices}
      />
    </div>
  );
};

export default Collect;
