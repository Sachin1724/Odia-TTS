import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, PlusCircle, Users, Heart, Loader2 } from 'lucide-react';
import { toBlob } from 'html-to-image';

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onRecordAnother: () => void;
  contributorCount?: number;
  totalVoices?: number;
  contributorName?: string;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({
  isOpen,
  onClose,
  onRecordAnother,
  contributorCount = 128,
  totalVoices = 1245,
  contributorName = ''
}) => {
  const [showContent, setShowContent] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (!popupRef.current || isSharing) return;

    setIsSharing(true);

    try {
      // html-to-image supports modern CSS color spaces (oklab, oklch) unlike html2canvas
      const blob = await toBlob(popupRef.current, {
        pixelRatio: 2,
        backgroundColor: '#18181b', // matches zinc-900
        filter: (node) => {
          // Exclude elements marked to be ignored in the screenshot
          return !node.dataset?.html2canvasIgnore && node.getAttribute?.('data-html2canvas-ignore') !== 'true';
        },
      });

      if (!blob) throw new Error('Failed to generate image blob');

      const file = new File([blob], 'odia-tts-contribution.png', { type: 'image/png' });

      // Try native file share (works on mobile / supported browsers)
      const canShareFiles =
        typeof navigator.share === 'function' &&
        typeof navigator.canShare === 'function' &&
        navigator.canShare({ files: [file] });

      if (canShareFiles) {
        try {
          await navigator.share({
            title: 'Odia-TTS Contribution',
            text: "I just contributed my voice to Odisha's digital future! Join me at Odia-TTS.",
            files: [file],
          });
        } catch (error) {
          // Only download if the user didn't intentionally cancel
          if ((error as Error).name !== 'AbortError') {
            downloadFile(blob);
          }
        }
      } else {
        // Desktop fallback: download the screenshot directly
        downloadFile(blob);
      }
    } catch (error) {
      console.error('Error generating screenshot:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const downloadFile = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'odia-tts-contribution.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (isOpen) {
      setShowContent(false);
      // Wait for the initial animation before showing content
      const timer = setTimeout(() => setShowContent(true), 800);
      
      // Auto close after 3 seconds of content being shown
      const closeTimer = setTimeout(() => {
        // Only auto close if still open
        // onClose();
      }, 4000);

      return () => {
        clearTimeout(timer);
        clearTimeout(closeTimer);
      };
    }
  }, [isOpen]);

  const waveformVariants = {
    initial: {
      pathLength: 0,
      opacity: 0,
      d: "M10 50 L20 30 L30 70 L40 40 L50 60 L60 20 L70 80 L80 50 L90 50"
    },
    animate: {
      pathLength: 1,
      opacity: 1,
      d: [
        "M10 50 L20 30 L30 70 L40 40 L50 60 L60 20 L70 80 L80 50 L90 50",
        "M10 50 L20 50 L30 50 L40 50 L50 50 L60 50 L70 50 L80 50 L90 50",
        "M20 50 L40 70 L80 30"
      ],
      transition: {
        duration: 1.2,
        times: [0, 0.4, 1],
        ease: "easeInOut"
      }
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) {
                onClose();
              }
            }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur-xl touch-none"
            ref={popupRef}
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-red-600/20 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-orange-600/20 blur-3xl" />

            <div className="relative flex flex-col items-center text-center">
              {/* Morphing Animation */}
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-inner">
                <svg viewBox="0 0 100 100" className="h-16 w-16 fill-none stroke-red-500 stroke-[6]" strokeLinecap="round" strokeLinejoin="round">
                  <motion.path
                    variants={waveformVariants}
                    initial="initial"
                    animate="animate"
                  />
                </svg>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 10 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
                  🎙️ Voice Received!
                </h2>
                
                <p className="mb-1 text-lg font-medium text-white/90">
                  ଧନ୍ୟବାଦ ❤️
                </p>
                <p className="mb-4 text-sm text-zinc-400">
                  Your voice is now part of Odisha’s digital future.
                  <span className="block mt-2 font-medium text-white/90">
                    Thank you, {contributorName || 'Contributor'}, for contributing!
                  </span>
                </p>

                <div className="mb-6 flex flex-col items-center gap-1">
                  <p className="text-xs italic text-zinc-500">
                    "ଛୋଟ କଣ୍ଠ… ବଡ଼ ପ୍ରଭାବ।"
                  </p>
                  <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
                </div>

                {/* Impact Feedback */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mb-8 rounded-2xl bg-white/5 border border-white/10 p-4"
                >
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1 text-red-400 mb-1">
                        <Users size={14} />
                        <span className="text-[10px] uppercase tracking-wider font-bold">Contributor</span>
                      </div>
                      <span className="text-xl font-mono text-white">#{contributorCount}</span>
                    </div>
                    <div className="h-8 w-px bg-white/10" />
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1 text-orange-400 mb-1">
                        <Heart size={14} className="animate-pulse" />
                        <span className="text-[10px] uppercase tracking-wider font-bold">Voices</span>
                      </div>
                      <span className="text-xl font-mono text-white">{totalVoices.toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>

                {/* CTAs */}
                <div className="flex flex-col gap-3" data-html2canvas-ignore="true">
                  <button
                    onClick={onRecordAnother}
                    className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition-all hover:bg-zinc-200 active:scale-95"
                  >
                    <PlusCircle size={18} />
                    Record Another Dialect
                  </button>
                  <button
                    onClick={handleShare}
                    disabled={isSharing}
                    className="flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSharing ? <Loader2 size={18} className="animate-spin" /> : <Share2 size={18} />}
                    {isSharing ? 'Sharing...' : 'Share with a friend'}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              data-html2canvas-ignore="true"
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SuccessPopup;
