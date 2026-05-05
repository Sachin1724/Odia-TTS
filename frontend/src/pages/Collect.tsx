import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SuccessPopup from '../components/SuccessPopup';
import BackgroundOverlay from '../components/BackgroundOverlay';

const API_URL = import.meta.env.VITE_GAS_API_URL || 'YOUR_GAS_ENDPOINT_URL_HERE';

const MOTIVATIONAL_STATEMENTS = [
  "ଆପଣଙ୍କ ସ୍ୱର ଓଡ଼ିଶାର ଭବିଷ୍ୟତ । (Your voice is Odisha's future.)",
  "ଛୋଟ କଣ୍ଠ… ବଡ଼ ପ୍ରଭାବ । (Small voice... big impact.)",
  "ଆମ ମାତୃଭାଷା, ଆମ ଗର୍ବ । (Our mother tongue, our pride.)",
  "ଆପଣଙ୍କ ଅବଦାନ ଅମୂଲ୍ୟ । (Your contribution is invaluable.)",
  "ଓଡ଼ିଆ ଭାଷାକୁ ଡିଜିଟାଲ୍ ରୂପ ଦେବାରେ ସାହାଯ୍ୟ କରନ୍ତୁ । (Help digitalize Odia language.)"
];

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
  {t:"ଓଡ଼ିଶା ସରକାର ଏହି ଯୋଜନା ଆରମ୍ଭ କଲେ।",r:"Odisha sarakaar ehi yojanaa aarambha kale.",c:"Formal speech",tip:"News announcement style."},
  
  // --- 1. Numbers, Dates & Currencies ---
  {t:"ମୋ ଫୋନ୍ ନମ୍ବର ହେଉଛି ୯୮୭୬୫୪୩୨୧୦।", r:"Mo phone number heuchhi naba aatha saata chha paancha chaari tini dui eka sun.", c:"Numbers & Data", tip:"Read digits clearly, one by one."},
  {t:"ଏହି ଜିନିଷର ଦାମ୍ ୪୫୦ ଟଙ୍କା।", r:"Ehi jinisara daam chaari saha pachaas tankaa.", c:"Numbers & Data", tip:"Natural commercial transaction tone."},
  {t:"ମୋ ଜନ୍ମ ମସିହା ୨୦୦୫ ଅଟେ।", r:"Mo janma masihaa dui hazaar paancha ate.", c:"Numbers & Data", tip:"Read the year naturally."},
  {t:"ଆଜି ୧୫ ଅଗଷ୍ଟ, ସ୍ୱାଧୀନତା ଦିବସ।", r:"Aaji pandara August, swadhinata dibasa.", c:"Numbers & Data", tip:"Clear, declarative tone."},

  // --- 2. Technology & English Loanwords ---
  {t:"ମୋବାଇଲ୍ ରେ ଇଣ୍ଟରନେଟ୍ ଚାଲୁନାହିଁ, ନେଟୱର୍କ ନାହିଁ।", r:"Mobile re internet chaalunaahin, network naahin.", c:"Technology", tip:"Natural frustration, clear English loanwords."},
  {t:"ହ୍ଵାଟସ୍ ଆପ୍ ରେ ମେସେଜ୍ ଟେ ପଠାଇଦେବୁ।", r:"WhatsApp re message te pathaaidebu.", c:"Technology", tip:"Casual, fast-paced instruction."},
  {t:"ଆପ୍ଲିକେସନ୍ ଡାଉନଲୋଡ୍ ହେବାକୁ ସମୟ ଲାଗୁଛି।", r:"Application download hebaaku samaya laaguchi.", c:"Technology", tip:"Neutral informative tone."},
  {t:"ପାସୱାର୍ଡ ଭୁଲ୍ ଅଛି, ଆଉ ଥରେ ଚେଷ୍ଟା କରନ୍ତୁ।", r:"Password bhul achhi, aau thare chestaa karantu.", c:"Technology", tip:"System alert, robotic but polite."},

  // --- 3. Emotions, Exclamations & Pitch Shifts ---
  {t:"ଆରେ! ତୁ କେବେ ଆସିଲୁ? କହିଲୁ ନି ତ!", r:"Aare! Tu kebe aasilu? Kahilu ni ta!", c:"Emotions", tip:"High pitch, excited surprise."},
  {t:"ନା, ମୁଁ ଏ କାମ କଦାପି କରିପାରିବି ନାହିଁ!", r:"Naa, mun e kaama kadaapi karipaaribi naahin!", c:"Emotions", tip:"Firm, angry, definitive."},
  {t:"ଓଃ! ଆଜି କି ଭୟଙ୍କର ଗରମ।", r:"Oh! Aaji ki bhayankara garama.", c:"Emotions", tip:"Exhausted, sighing tone."},
  {t:"ଦୟାକରି ମୋତେ ଟିକେ ସାହାଯ୍ୟ କରନ୍ତୁ!", r:"Dayaakari mote tike saahaajya karantu!", c:"Emotions", tip:"Pleading, desperate pitch."},

  // --- 4. Complex Phonetics & Consonant Clusters ---
  {t:"ଖଣ୍ଡଗିରିରେ ଖରାବେଳେ ଖଇ କୋଳି ଖାଇଲି।", r:"Khandagirire kharabele khai koli khaili.", c:"Phonetics", tip:"Emphasize the 'Kh' and 'L'/'L(hard)' sounds."},
  {t:"ଚଷା ଚାଷ କରେ, ଋଷି ତପସ୍ୟା କରନ୍ତି।", r:"Chashaa chaasa kare, rushi tapasyaa karanti.", c:"Phonetics", tip:"Clear distinction between different 'S/Sh' sounds."},
  {t:"ଡମ୍ବରୁ ବାଜିଲେ ବିପଦ ଦୂର ହୁଏ।", r:"Dambaru baajile bipada doora hue.", c:"Phonetics", tip:"Strong 'D' and 'R' sounds."},
  {t:"ଜ୍ଞାନୀ ଲୋକମାନେ ବିଜ୍ଞାନ ଉପରେ ବିଶ୍ୱାସ କରନ୍ତି।", r:"Gyaani lokamaane bigyaana upare bishwaasa karanti.", c:"Phonetics", tip:"Heavy focus on the 'Gya' consonant clusters."},

  // --- 5. Domain Specific (Healthcare & Governance) ---
  {t:"ରୋଗୀଙ୍କୁ ତୁରନ୍ତ ଡାକ୍ତରଖାନା ନେଇଯାଆନ୍ତୁ।", r:"Rogiinku turanta daaktarakhaanaa neijaaantu.", c:"Healthcare", tip:"Urgent but clear command."},
  {t:"ରକ୍ତଚାପ ବଢିଯାଇଛି, ବିଶ୍ରାମ ନିଅନ୍ତୁ।", r:"Raktachaapa badhijaichi, bishraama niantu.", c:"Healthcare", tip:"Calm, clinical, professional."},
  {t:"ପଞ୍ଚାୟତ ଅଫିସ୍ ରେ ଆଧାର କାର୍ଡ ଲିଙ୍କ୍ କରନ୍ତୁ।", r:"Panchaayata office re Aadhaar card link karantu.", c:"Governance", tip:"Bureaucratic, instructional."},
  {t:"ବିଦ୍ୟାଳୟରେ ମଧ୍ୟାହ୍ନ ଭୋଜନ ବ୍ୟବସ୍ଥା ଅଛି।", r:"Bidyaalayare madhyaahna bhojana byabasthaa achhi.", c:"Governance", tip:"Formal, informative announcement."}
];

const Collect: React.FC = () => {
  const navigate = useNavigate();
  const [metadata, setMetadata] = useState<any>(null);
  const [translatedText, setTranslatedText] = useState('');
  const [shuffledTextData, setShuffledTextData] = useState(TEXT_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [emotionTag, setEmotionTag] = useState('[NEUTRAL]');
  const [statementIndex, setStatementIndex] = useState(0);
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [contributionStats, setContributionStats] = useState({ totalVoices: 0, contributorRank: 0 });

  useEffect(() => {
    // Shuffle TEXT_DATA on mount
    const shuffled = [...TEXT_DATA].sort(() => Math.random() - 0.5);
    setShuffledTextData(shuffled);

    const savedMetadata = localStorage.getItem('odiaTtsMetadata');
    if (savedMetadata) {
      setMetadata(JSON.parse(savedMetadata));
    } else {
      // If no metadata, redirect back to onboarding
      navigate('/onboarding');
    }

    const interval = setInterval(() => {
      setStatementIndex((prev) => (prev + 1) % MOTIVATIONAL_STATEMENTS.length);
    }, 5000);
    return () => clearInterval(interval);
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

  const handlePlayRecording = () => {
    if (audioBlob) {
      if (isPlaying) {
        audioPlayerRef.current?.pause();
        setIsPlaying(false);
      } else {
        const url = URL.createObjectURL(audioBlob);
        if (!audioPlayerRef.current) {
          audioPlayerRef.current = new Audio(url);
        } else {
          audioPlayerRef.current.src = url;
        }
        audioPlayerRef.current.onended = () => setIsPlaying(false);
        audioPlayerRef.current.play();
        setIsPlaying(true);
      }
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
    setUploadProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev < 90) return prev + 5;
        if (prev < 98) return prev + 0.5; // Slow down but keep moving
        return prev;
      });
    }, 100);

    try {
      const base64Audio = await blobToBase64(audioBlob);

      const currentSentence = shuffledTextData[currentIndex];
      const payload = {
        metadata: metadata,
        text: {
          standard: currentSentence.t,
          romanized: currentSentence.r,
          translated: translatedText,
          emotion_tag: emotionTag
        },
        audio: base64Audio
      };

      if (API_URL === 'YOUR_GAS_ENDPOINT_URL_HERE') {
          console.log("Mock Payload (API not set):", payload);
          // Complete progress
          clearInterval(progressInterval);
          setUploadProgress(100);
          
          saveToLocalStorage(currentSentence.t, translatedText, emotionTag);
          
          setTimeout(() => {
            setContributionStats({ 
              totalVoices: parseInt(localStorage.getItem('odiaTtsVoiceCount') || '1', 10), 
              contributorRank: 128 
            });
            setShowSuccess(true);
          }, 500);
      } else {
          const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(payload),
          });
          
          const result = await response.json();
          console.log("Submitted to GAS", result);
          
          clearInterval(progressInterval);
          setUploadProgress(100);

          saveToLocalStorage(currentSentence.t, translatedText, emotionTag);

          if (result.stats) {
            setContributionStats({
              totalVoices: result.stats.totalVoices,
              contributorRank: result.stats.contributorRank
            });
          } else {
             setContributionStats({
              totalVoices: parseInt(localStorage.getItem('odiaTtsVoiceCount') || '1', 10),
              contributorRank: 128
            });
          }
          setTimeout(() => {
            setShowSuccess(true);
          }, 500);
      }
      
    } catch (err) {
      clearInterval(progressInterval);
      console.error('Error submitting data:', err);
      alert('Failed to save data. See console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveToLocalStorage = (standardText: string, transText: string, emotion: string) => {
    const savedVoicesCount = parseInt(localStorage.getItem('odiaTtsVoiceCount') || '0', 10) + 1;
    localStorage.setItem('odiaTtsVoiceCount', savedVoicesCount.toString());
    
    if (savedVoicesCount >= 52) {
      setShowCompletionBadge(true);
    }
    
    const currentRecordings = JSON.parse(localStorage.getItem('odiaTtsRecordings') || '[]');
    currentRecordings.push({
       id: Date.now(),
       text: standardText,
       translated: transText,
       emotion: emotion,
       dialect: metadata?.dialect || 'Unknown',
       date: new Date().toLocaleString(),
       duration: "00:04" // Mocked duration
    });
    localStorage.setItem('odiaTtsRecordings', JSON.stringify(currentRecordings));
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setTranslatedText('');
    setAudioBlob(null);
    
    if (showCompletionBadge) {
      navigate('/workspace/analytics');
    } else if (currentIndex < shuffledTextData.length - 1) {
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
            <Link to="/workspace/analytics" className="text-sm md:text-lg font-bold tracking-widest text-white hover:text-white/80 transition-colors flex-shrink-0">BHASA.ODIA</Link>
            <span className="text-zinc-500 text-sm">/</span>
            <span className="font-mono text-zinc-300 text-[10px] md:text-xs truncate hidden sm:inline">OdiaTTS Collection</span>
            <div className="bg-zinc-800 text-white/70 px-2 py-0.5 rounded text-[10px] font-mono uppercase border border-white/10 flex-shrink-0">
              {metadata.dialect}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link to="/workspace/analytics" className="hidden md:flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-[10px] md:text-xs uppercase tracking-widest font-medium bg-white/5 px-3 py-1.5 rounded border border-white/10">
            Workspace
            <span className="material-symbols-outlined text-sm">space_dashboard</span>
          </Link>
          <div className="flex items-center gap-2 text-zinc-400 font-mono text-[10px] md:text-sm">
            <span className="hidden md:inline">Speaker:</span>
            <span className="text-white max-w-[80px] md:max-w-none truncate">{metadata.name}</span>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 pt-14 h-screen overflow-hidden">
        {/* Canvas */}
        <main className="flex-1 overflow-y-auto bg-[#0e0e0e] relative flex flex-col md:items-center md:justify-center p-6 md:p-12 pt-10 pb-24 md:pb-12">
          
          {/* Motivational Statement Banner */}
          <div className="absolute top-4 md:top-8 left-0 w-full flex justify-center px-4 z-10 pointer-events-none">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full text-xs md:text-sm text-white/80 tracking-wide flex items-center gap-2 shadow-xl transition-all duration-1000 ease-in-out animate-fade-in-out">
              <span className="material-symbols-outlined text-red-500 text-sm animate-pulse">mic</span>
              {MOTIVATIONAL_STATEMENTS[statementIndex]}
            </div>
          </div>

          {showCompletionBadge && (
             <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                <div className="w-32 h-32 bg-yellow-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <span className="text-6xl">🏆</span>
                </div>
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 mb-4">
                  Achievement Unlocked!
                </h2>
                <p className="text-lg text-white max-w-md mb-8">
                  You have contributed all 52 voice samples. You are officially an Odia Voice Pioneer. Thank you!
                </p>
                <button 
                  onClick={() => navigate('/workspace/analytics')}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold uppercase tracking-widest rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all"
                >
                  View Your Stats
                </button>
             </div>
          )}

          <div className="w-full max-w-3xl flex flex-col gap-8 mt-12 md:mt-0">
            {/* Step 1: Reference */}
            <div className="flex flex-col gap-2">
              {parseInt(localStorage.getItem('odiaTtsVoiceCount') || '0', 10) >= shuffledTextData.length ? (
                <div className="flex items-center gap-2 text-green-500 text-[10px] md:text-xs font-medium uppercase tracking-widest bg-green-500/10 px-3 py-1.5 rounded-lg w-fit border border-green-500/20">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>Completed ({shuffledTextData.length}/{shuffledTextData.length})</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-zinc-500 text-[10px] md:text-xs font-medium uppercase tracking-widest">
                  <span className="material-symbols-outlined text-sm">library_books</span>
                  <span>Standard Reference ({currentIndex + 1}/{shuffledTextData.length})</span>
                </div>
              )}
              <div className="p-5 md:p-8 border border-white/10 rounded-xl bg-[#1c1b1b] flex flex-col gap-4">
                <div className="flex justify-between items-start gap-4">
                  <p className="font-sans text-white text-opacity-90 text-xl md:text-3xl leading-relaxed">
                    <span className="text-zinc-500 mr-2 font-mono text-sm">{emotionTag}</span>
                    {shuffledTextData[currentIndex].t}
                  </p>
                  <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-1 rounded whitespace-nowrap">{shuffledTextData[currentIndex].c}</span>
                </div>
                <p className="text-zinc-400 text-sm md:text-lg italic">"{shuffledTextData[currentIndex].r}"</p>
                <div className="flex items-center gap-2 mt-2 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                  <span className="material-symbols-outlined text-zinc-400 text-sm">lightbulb</span>
                  <p className="text-zinc-300 text-xs md:text-sm italic">
                    {emotionTag === '[GENTLE]' && 'Speak softly, warmly, and with care. '}
                    {emotionTag === '[ANGRY]' && 'Speak loudly, with frustration or sharp tone. '}
                    {emotionTag === '[FAST]' && 'Speak quickly, like you are in a rush. '}
                    {emotionTag === '[SLOW]' && 'Speak very slowly, pausing between words. '}
                    {emotionTag === '[NEUTRAL]' && shuffledTextData[currentIndex].tip}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Input */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-white text-[10px] md:text-xs font-medium uppercase tracking-widest">
                  <span className="material-symbols-outlined text-sm">translate</span>
                  <span>How do you say this naturally in your dialect?</span>
                </div>
                
                {/* Emotion Tag Selector */}
                <div className="flex items-center gap-2 bg-[#1c1b1b] p-1 rounded-lg border border-white/10 overflow-x-auto w-full md:w-auto hide-scrollbar">
                  {['[NEUTRAL]', '[GENTLE]', '[ANGRY]', '[FAST]', '[SLOW]'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setEmotionTag(tag)}
                      className={`px-3 py-1.5 rounded-md text-[10px] font-mono whitespace-nowrap transition-colors ${emotionTag === tag ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:bg-white/10 hover:text-white'}`}
                    >
                      {tag.replace('[', '').replace(']', '')}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <textarea
                  className="w-full bg-[#1c1b1b] border border-white/10 rounded-xl p-4 md:p-6 font-sans text-sm md:text-lg text-white placeholder-zinc-600 focus:outline-none focus:border-white focus:ring-1 resize-none min-h-[60px]"
                  placeholder="Type the regional dialect here using English script or copy the text if its same and paste here.. "
                  value={translatedText}
                  onChange={(e) => setTranslatedText(e.target.value)}
                />
              </div>
            </div>

            {/* Step 3: Recording Actions */}
            <div className="flex flex-col items-center justify-center pt-4 border-t border-white/10 gap-4 mt-2">
               {isRecording && (
                <div className="w-full h-16 flex items-center justify-center gap-1 opacity-50 animate-pulse">
                  <div className="w-1 h-4 bg-red-500 rounded-full"></div>
                  <div className="w-1 h-12 bg-red-500 rounded-full"></div>
                  <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                  <div className="w-1 h-10 bg-red-500 rounded-full"></div>
                  <span className="ml-4 text-red-500 font-mono text-sm">Recording...</span>
                </div>
              )}

              <div className="flex flex-col w-full gap-2 mt-0">
                {/* Row 1: Previous & Next */}
                <div className="grid grid-cols-2 gap-3 w-full">
                  <button
                    onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                    disabled={currentIndex === 0 || isSubmitting}
                    className={`px-4 py-3 rounded-lg text-[10px] md:text-xs font-medium uppercase flex items-center justify-center gap-2 transition-colors ${(currentIndex === 0 || isSubmitting) ? 'opacity-50 cursor-not-allowed text-zinc-600' : 'bg-transparent text-white border border-white/10 hover:bg-white/5'}`}
                  >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    <span>Previous</span>
                  </button>
                  <button 
                    onClick={() => {
                      if (audioBlob && !isSubmitting) {
                        handleSave();
                      } else {
                        setTranslatedText('');
                        setAudioBlob(null);
                        setCurrentIndex(Math.min(shuffledTextData.length - 1, currentIndex + 1));
                      }
                    }}
                    disabled={currentIndex === shuffledTextData.length - 1 || isSubmitting}
                    className={`px-4 py-3 rounded-lg text-[10px] md:text-xs font-medium uppercase flex items-center justify-center gap-2 transition-colors ${(currentIndex === shuffledTextData.length - 1 || isSubmitting) ? 'opacity-50 cursor-not-allowed text-zinc-600' : 'bg-transparent text-white border border-white/10 hover:bg-white/5'}`}
                    title="Skip to next sentence or auto-save"
                  >
                    <span>Next</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>

                {/* Row 2: Record */}
                {!isRecording ? (
                  <button 
                    onClick={handleStartRecording}
                    className="w-full px-8 py-3 bg-red-600 text-white rounded-lg text-[10px] md:text-xs font-medium uppercase hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
                  >
                    <span className="material-symbols-outlined text-sm">mic</span>
                    {audioBlob ? "Retake Audio" : "Start Recording"}
                  </button>
                ) : (
                  <button 
                    onClick={handleStopRecording}
                    className="w-full px-8 py-3 bg-zinc-700 text-white rounded-lg text-[10px] md:text-xs font-medium uppercase hover:bg-zinc-600 transition-colors flex items-center justify-center gap-2 animate-pulse"
                  >
                    <span className="material-symbols-outlined text-sm">stop_circle</span>
                    Stop Recording
                  </button>
                )}

                {/* Row 3: Hear (Play) */}
                {audioBlob && !isRecording && (
                  <button 
                    onClick={handlePlayRecording}
                    className={`w-full px-6 py-3 border border-white/10 rounded-lg text-[10px] md:text-xs font-medium uppercase flex items-center justify-center gap-2 transition-colors ${isPlaying ? 'bg-white text-black' : 'bg-transparent text-white hover:bg-white/5'}`}
                  >
                    <span className="material-symbols-outlined text-sm">{isPlaying ? 'stop' : 'hearing'}</span>
                    <span>{isPlaying ? 'Playing...' : 'Hear Record'}</span>
                  </button>
                )}

                {/* Row 4: Save */}
                <div className="flex flex-col gap-1.5 w-full">
                  <button 
                    onClick={handleSave}
                    disabled={!audioBlob || !translatedText || isSubmitting}
                    className={`relative overflow-hidden w-full px-8 py-3 rounded-lg text-[10px] md:text-xs font-medium uppercase flex items-center justify-center gap-2 transition-all ${(!audioBlob || !translatedText || isSubmitting) ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-white text-black hover:bg-zinc-200'}`}
                  >
                    <span className="relative z-20">{isSubmitting ? 'Saving...' : 'Save'}</span>
                    <span className="material-symbols-outlined text-sm relative z-20">check_circle</span>
                    
                    {isSubmitting && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono opacity-30 z-20">
                        {uploadProgress}%
                      </span>
                    )}
                  </button>
                  
                  {isSubmitting && (
                    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white transition-all duration-300 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  )}
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
