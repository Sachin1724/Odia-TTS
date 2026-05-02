import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
const odiaPattern = '/assets/odia_pattern.png';

const Landing: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const [footerText, setFooterText] = useState('');
  const [showToast, setShowToast] = useState<string | null>(null);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const fullFooterText = "BHASA.ODIA // V1.0";

  // Typewriter effect for footer
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullFooterText.length) {
        setFooterText(fullFooterText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Mouse parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePos({ x: clientX, y: clientY });
  };

  const bgX = useSpring((mousePos.x - window.innerWidth / 2) / 50, { stiffness: 50, damping: 30 });
  const bgY = useSpring((mousePos.y - window.innerHeight / 2) / 50, { stiffness: 50, damping: 30 });

  const { scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0.01, 0.005]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  const words = "Transforming Odisha’s Voice into a Living Digital Legacy".split(" ");

  const handleCTAClick = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  return (
    <div 
      className="bg-[#09090b] text-white font-sans antialiased selection:bg-white/20 min-h-screen overflow-x-hidden relative"
      onMouseMove={handleMouseMove}
    >
      {/* Background Micro Motion Layer */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{ 
          backgroundImage: `url(${odiaPattern})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '500px',
          opacity: bgOpacity,
          x: bgX,
          y: bgY
        }}
        animate={{
          backgroundPosition: ['0% 0%', '10% 10%'],
        }}
        transition={{
          duration: 100,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Custom Cursor Ripple (Hero Section) */}
      <AnimatePresence>
        {isHoveringHero && (
          <motion.div
            className="fixed pointer-events-none z-[100] border border-white/20 rounded-full"
            style={{ 
              left: mousePos.x, 
              top: mousePos.y,
              width: 100,
              height: 100,
              x: '-50%',
              y: '-50%'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
             <motion.div 
              className="absolute inset-0 border border-white/10 rounded-full"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
             />
          </motion.div>
        )}
      </AnimatePresence>

      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-white/10 flex justify-between items-center px-6 h-14 tracking-tight">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold tracking-widest text-white">BHASA.ODIA</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium">
          <div className="relative group cursor-pointer">
            <a className="text-white pb-1" href="#">Mission</a>
            <motion.div className="absolute bottom-0 left-0 h-[1px] bg-white w-0 group-hover:w-full transition-all duration-300" />
          </div>
          <div className="relative group cursor-pointer">
            <Link className="text-zinc-500 hover:text-white transition-colors duration-200 ease-in-out" to="/api">API</Link>
            <motion.div className="absolute bottom-0 left-0 h-[1px] bg-white w-0 group-hover:w-full transition-all duration-300" />
          </div>
          <div className="relative group cursor-pointer">
            <Link className="text-zinc-500 hover:text-white transition-colors duration-200 ease-in-out" to="/workspace/analytics">Workspace</Link>
            <motion.div className="absolute bottom-0 left-0 h-[1px] bg-white w-0 group-hover:w-full transition-all duration-300" />
          </div>
          <Link 
            to="/onboarding" 
            className="bg-white text-black px-4 py-2 rounded uppercase tracking-widest hover:bg-white/90 transition-all duration-300"
          >
            Contribute Voice
          </Link>
        </nav>
      </header>

      <main className="pt-24 pb-32 md:pb-24 px-6 md:px-8 max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <motion.section 
          ref={heroRef}
          className="flex flex-col items-start justify-center min-h-[618px] gap-6 mb-12"
          onMouseEnter={() => setIsHoveringHero(true)}
          onMouseLeave={() => setIsHoveringHero(false)}
          style={{ opacity: heroOpacity }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-zinc-800 text-xs border border-white/10"
          >
            <motion.span 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
            />
            <span className="text-red-400 font-medium drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">In collaboration with BPUT Research Lab</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl text-white max-w-4xl tracking-tighter font-semibold flex flex-wrap gap-x-3">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1 + i * 0.05,
                  ease: [0.215, 0.61, 0.355, 1]
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-base md:text-lg text-zinc-400 max-w-2xl"
          >
            An open-source, multi-dialect Text-to-Speech engine engineered specifically for the complex phonetics of the Odia language family. High-fidelity synthesis for researchers, developers, and creators.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative"
            >
              <Link 
                onClick={() => handleCTAClick("Initializing interface...")}
                className="inline-flex justify-center items-center h-12 px-8 bg-white text-black text-xs uppercase tracking-widest rounded transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
                to="/api"
              >
                Explore the API
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative"
            >
              <Link 
                onClick={() => handleCTAClick("Preparing voice capture environment...")}
                to="/onboarding" 
                className="inline-flex justify-center items-center h-12 px-8 bg-transparent text-white border border-white/10 text-xs uppercase tracking-widest rounded hover:bg-white/5 transition-all duration-300"
              >
                Become a Voice Contributor
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Solution Grid */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { 
              title: "Community-Driven Data", 
              desc: "Crowdsourced audio datasets from native speakers across 30 districts, ensuring authentic pronunciation and intonation patterns.",
              icon: "groups" 
            },
            { 
              title: "State-of-the-Art Architecture", 
              desc: "Built on advanced transformer models optimized for low-resource languages, delivering minimal latency and high naturalness scores.",
              icon: "architecture"
            },
            { 
              title: "Universal Accessibility", 
              desc: "Breaking language barriers in digital interfaces. Providing robust TTS APIs for screen readers, educational tools, and smart devices.",
              icon: "public"
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.2 }}
              whileHover={{ y: -6, borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'rgba(24,24,27,0.8)' }}
              className="p-6 border border-white/10 rounded-xl bg-[#09090b] transition-all duration-300 flex flex-col gap-4 relative group overflow-hidden backdrop-blur-sm"
            >
              <div className="absolute bottom-0 left-0 h-[2px] bg-white w-0 group-hover:w-full transition-all duration-500" />
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800 text-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all">
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <h3 className="text-white text-lg font-semibold">{item.title}</h3>
              <p className="text-zinc-400">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6 relative z-10 bg-[#09090b]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 font-mono">
            <span className="text-white">{footerText}</span>
            <motion.span 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-[8px] h-[16px] bg-white inline-block ml-1"
            />
          </div>
          <div className="flex gap-8 text-xs text-zinc-500 uppercase tracking-widest">
            <a className="hover:text-white transition-colors" href="#">GitHub</a>
            <a className="hover:text-white transition-colors" href="https://www.bput.ac.in/">BPUT</a>
            <a className="hover:text-white transition-colors" href="#">Docs</a>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-[100] bg-white text-black px-6 py-3 rounded-lg text-xs font-mono uppercase tracking-widest shadow-2xl flex items-center gap-3"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full"
            />
            {showToast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;
