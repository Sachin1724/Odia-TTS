import React from 'react';
import { motion, useSpring, useScroll, useTransform } from 'framer-motion';

interface BackgroundOverlayProps {
  interactive?: boolean;
  opacity?: number | [number, number];
}

const BackgroundOverlay: React.FC<BackgroundOverlayProps> = ({ 
  interactive = false, 
  opacity = 0.01 
}) => {
  const odiaPattern = '/assets/odia_pattern.png';
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (!interactive) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  const bgX = useSpring((mousePos.x - window.innerWidth / 2) / 50, { stiffness: 50, damping: 30 });
  const bgY = useSpring((mousePos.y - window.innerHeight / 2) / 50, { stiffness: 50, damping: 30 });

  const { scrollYProgress } = useScroll();
  
  // Handle both single number and range for opacity
  const finalOpacity = Array.isArray(opacity) 
    ? useTransform(scrollYProgress, [0, 0.5], opacity)
    : opacity;

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ 
        backgroundImage: `url(${odiaPattern})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '500px',
        opacity: finalOpacity,
        x: interactive ? bgX : 0,
        y: interactive ? bgY : 0
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
  );
};

export default BackgroundOverlay;
