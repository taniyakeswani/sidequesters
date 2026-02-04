import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Easing
const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;
const EASE_FLOAT = [0.45, 0.05, 0.55, 0.95] as const;

type Phase = "line" | "expand" | "signals" | "lock" | "living";

const HeroAnimation = () => {
  const [phase, setPhase] = useState<Phase>("line");
  const [loopCount, setLoopCount] = useState(0);
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setPhase("living");
      return;
    }

    const runSequence = async () => {
      setPhase("line");
      await delay(600);
      setPhase("expand");
      await delay(900);
      setPhase("signals");
      await delay(600);
      setPhase("lock");
      await delay(700);
      setPhase("living");
      await delay(5000);
      setLoopCount(c => c + 1);
    };

    runSequence();
  }, [loopCount, shouldReduceMotion]);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  if (shouldReduceMotion) {
    return <StableState isMobile={isMobile} />;
  }

  const isLine = phase === "line";
  const showContent = phase !== "line";
  const showSignals = phase === "signals" || phase === "lock" || phase === "living";
  const isLock = phase === "lock" || phase === "living";
  const isLiving = phase === "living";

  return (
    <div className="relative w-full h-full min-h-[380px] md:min-h-[450px] flex items-center justify-center">
      {/* Main container */}
      <motion.div
        className="relative flex flex-col items-center justify-center"
        animate={{
          scale: isLock ? 1.06 : 1,
        }}
        transition={{
          scale: { duration: 0.7, ease: EASE_SMOOTH },
        }}
      >
        {/* The frame that appears on lock */}
        <motion.div
          className="absolute rounded-2xl border-2 border-pink/25 pointer-events-none"
          style={{ 
            inset: isMobile ? "-24px -20px" : "-32px -40px",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: isLock ? (isLiving ? [0.8, 0.6, 0.8] : 0.8) : 0,
            scale: isLock ? 1 : 0.95,
          }}
          transition={{
            opacity: isLiving 
              ? { duration: 4, repeat: Infinity, ease: EASE_FLOAT }
              : { duration: 0.5, ease: EASE_SMOOTH },
            scale: { duration: 0.6, ease: EASE_SMOOTH },
          }}
        />

        {/* The origin line */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-pink via-lavender to-purple rounded-full"
          style={{
            height: isMobile ? 4 : 5,
          }}
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: isLine ? (isMobile ? 140 : 200) : 0,
            opacity: isLine ? 1 : 0,
          }}
          transition={{
            width: { duration: 0.5, ease: EASE_SMOOTH },
            opacity: { duration: isLine ? 0.3 : 0.15, ease: EASE_SMOOTH },
          }}
        />

        {/* Three rows with signals */}
        <div className={`flex flex-col ${isMobile ? 'gap-6' : 'gap-8'}`}>
          
          {/* Brand Row */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: showContent ? 1 : 0,
              y: isLiving ? [-2, 2, -2] : 0,
              scaleX: showContent ? 1 : 0,
            }}
            transition={{
              opacity: { duration: 0.4, ease: EASE_SMOOTH },
              y: isLiving 
                ? { duration: 4.5, repeat: Infinity, ease: EASE_FLOAT }
                : { duration: 0.5, ease: EASE_SMOOTH },
              scaleX: { duration: 0.6, ease: EASE_SMOOTH },
            }}
          >
            <div className="flex items-center gap-3">
              {/* Left signals - Logo mark */}
              <SignalIcon show={showSignals} delay={0} isLiving={isLiving} isMobile={isMobile}>
                <LogoMarkIcon size={isMobile ? 16 : 20} />
              </SignalIcon>
              
              {/* Left line */}
              <motion.div 
                className="h-[3px] bg-gradient-to-r from-pink to-lavender rounded-full"
                initial={{ width: 0 }}
                animate={{ width: showContent ? (isMobile ? 20 : 28) : 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: EASE_SMOOTH }}
              />
              
              <span className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-foreground tracking-wide`}>
                Brand
              </span>
              
              {/* Right line */}
              <motion.div 
                className="h-[3px] bg-gradient-to-l from-pink to-lavender rounded-full"
                initial={{ width: 0 }}
                animate={{ width: showContent ? (isMobile ? 20 : 28) : 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: EASE_SMOOTH }}
              />
              
              {/* Right signals - Color palette */}
              <SignalIcon show={showSignals} delay={0.08} isLiving={isLiving} isMobile={isMobile}>
                <ColorPaletteIcon size={isMobile ? 16 : 20} />
              </SignalIcon>
            </div>
          </motion.div>

          {/* Product Row */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: showContent ? 1 : 0,
              y: isLiving ? [1.5, -1.5, 1.5] : 0,
              scaleX: showContent ? 1 : 0,
            }}
            transition={{
              opacity: { duration: 0.4, delay: 0.1, ease: EASE_SMOOTH },
              y: isLiving 
                ? { duration: 5, repeat: Infinity, ease: EASE_FLOAT, delay: 0.3 }
                : { duration: 0.5, ease: EASE_SMOOTH },
              scaleX: { duration: 0.6, delay: 0.08, ease: EASE_SMOOTH },
            }}
          >
            <div className="flex items-center gap-3">
              {/* Left signals - Website frame */}
              <SignalIcon show={showSignals} delay={0.16} isLiving={isLiving} isMobile={isMobile}>
                <WebsiteFrameIcon size={isMobile ? 16 : 20} />
              </SignalIcon>
              
              <motion.div 
                className="h-[3px] bg-gradient-to-r from-lavender to-purple rounded-full"
                initial={{ width: 0 }}
                animate={{ width: showContent ? (isMobile ? 28 : 40) : 0 }}
                transition={{ duration: 0.5, delay: 0.18, ease: EASE_SMOOTH }}
              />
              
              <span className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-foreground tracking-wide`}>
                Product
              </span>
              
              <motion.div 
                className="h-[3px] bg-gradient-to-l from-lavender to-purple rounded-full"
                initial={{ width: 0 }}
                animate={{ width: showContent ? (isMobile ? 28 : 40) : 0 }}
                transition={{ duration: 0.5, delay: 0.18, ease: EASE_SMOOTH }}
              />
              
              {/* Right signals - Mobile screen */}
              <SignalIcon show={showSignals} delay={0.24} isLiving={isLiving} isMobile={isMobile}>
                <MobileScreenIcon size={isMobile ? 16 : 20} />
              </SignalIcon>
            </div>
          </motion.div>

          {/* Growth Row */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: showContent ? 1 : 0,
              y: isLiving ? [-1, 1, -1] : 0,
              scaleX: showContent ? 1 : 0,
            }}
            transition={{
              opacity: { duration: 0.4, delay: 0.2, ease: EASE_SMOOTH },
              y: isLiving 
                ? { duration: 4.8, repeat: Infinity, ease: EASE_FLOAT, delay: 0.6 }
                : { duration: 0.5, ease: EASE_SMOOTH },
              scaleX: { duration: 0.6, delay: 0.16, ease: EASE_SMOOTH },
            }}
          >
            <div className="flex items-center gap-3">
              {/* Left signals - Trend line */}
              <SignalIcon show={showSignals} delay={0.32} isLiving={isLiving} isMobile={isMobile}>
                <TrendLineIcon size={isMobile ? 16 : 20} />
              </SignalIcon>
              
              <motion.div 
                className="h-[3px] bg-gradient-to-r from-purple to-pink rounded-full"
                initial={{ width: 0 }}
                animate={{ width: showContent ? (isMobile ? 20 : 28) : 0 }}
                transition={{ duration: 0.5, delay: 0.26, ease: EASE_SMOOTH }}
              />
              
              <span className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-foreground tracking-wide`}>
                Growth
              </span>
              
              <motion.div 
                className="h-[3px] bg-gradient-to-l from-purple to-pink rounded-full"
                initial={{ width: 0 }}
                animate={{ width: showContent ? (isMobile ? 20 : 28) : 0 }}
                transition={{ duration: 0.5, delay: 0.26, ease: EASE_SMOOTH }}
              />
              
              {/* Right signals - Analytics */}
              <SignalIcon show={showSignals} delay={0.4} isLiving={isLiving} isMobile={isMobile}>
                <AnalyticsIcon size={isMobile ? 16 : 20} />
              </SignalIcon>
            </div>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.div
          className={`absolute ${isMobile ? '-bottom-16' : '-bottom-20'} left-1/2 -translate-x-1/2 whitespace-nowrap`}
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: isLock ? 1 : 0,
            y: isLock ? 0 : 8,
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.3, ease: EASE_SMOOTH },
            y: { duration: 0.6, delay: 0.3, ease: EASE_SMOOTH },
          }}
        >
          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground tracking-wide`}>
            End-to-end digital execution
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Signal icon wrapper with animation
const SignalIcon = ({ 
  children, 
  show, 
  delay, 
  isLiving,
  isMobile,
}: { 
  children: React.ReactNode; 
  show: boolean; 
  delay: number;
  isLiving: boolean;
  isMobile: boolean;
}) => (
  <motion.div
    className="flex items-center justify-center text-muted-foreground"
    initial={{ opacity: 0, x: -4 }}
    animate={{
      opacity: show ? (isLiving ? [0.6, 0.8, 0.6] : 0.7) : 0,
      x: show ? 0 : -4,
      scale: isLiving ? [1, 1.05, 1] : 1,
    }}
    transition={{
      opacity: isLiving 
        ? { duration: 3, repeat: Infinity, ease: EASE_FLOAT, delay: delay }
        : { duration: 0.4, delay, ease: EASE_SMOOTH },
      x: { duration: 0.4, delay, ease: EASE_SMOOTH },
      scale: isLiving 
        ? { duration: 4, repeat: Infinity, ease: EASE_FLOAT, delay: delay + 0.5 }
        : { duration: 0 },
    }}
  >
    {children}
  </motion.div>
);

// Custom line-based icons - consistent stroke width
const LogoMarkIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3L3 12L12 21L21 12L12 3Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ColorPaletteIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <circle cx="17.5" cy="17.5" r="3.5" />
  </svg>
);

const WebsiteFrameIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <line x1="2" y1="8" x2="22" y2="8" />
    <circle cx="5" cy="6" r="0.5" fill="currentColor" />
    <circle cx="7.5" cy="6" r="0.5" fill="currentColor" />
    <circle cx="10" cy="6" r="0.5" fill="currentColor" />
  </svg>
);

const MobileScreenIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="2" width="12" height="20" rx="2" />
    <line x1="9" y1="5" x2="15" y2="5" />
    <line x1="10" y1="19" x2="14" y2="19" />
  </svg>
);

const TrendLineIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 18 9 12 13 16 21 6" />
    <polyline points="17 6 21 6 21 10" />
  </svg>
);

const AnalyticsIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="12" width="4" height="8" rx="1" />
    <rect x="10" y="8" width="4" height="12" rx="1" />
    <rect x="16" y="4" width="4" height="16" rx="1" />
  </svg>
);

// Static stable state
const StableState = ({ isMobile }: { isMobile: boolean }) => (
  <div className="relative w-full h-full min-h-[380px] flex items-center justify-center">
    <div className="relative flex flex-col items-center justify-center" style={{ transform: 'scale(1.06)' }}>
      {/* Frame */}
      <div 
        className="absolute rounded-2xl border-2 border-pink/25 pointer-events-none"
        style={{ inset: isMobile ? "-24px -20px" : "-32px -40px" }}
      />
      
      {/* Three rows */}
      <div className={`flex flex-col ${isMobile ? 'gap-6' : 'gap-8'}`}>
        {/* Brand */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="text-muted-foreground opacity-70">
              <LogoMarkIcon size={isMobile ? 16 : 20} />
            </div>
            <div className="h-[3px] bg-gradient-to-r from-pink to-lavender rounded-full" style={{ width: isMobile ? 20 : 28 }} />
            <span className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-foreground tracking-wide`}>Brand</span>
            <div className="h-[3px] bg-gradient-to-l from-pink to-lavender rounded-full" style={{ width: isMobile ? 20 : 28 }} />
            <div className="text-muted-foreground opacity-70">
              <ColorPaletteIcon size={isMobile ? 16 : 20} />
            </div>
          </div>
        </div>

        {/* Product */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="text-muted-foreground opacity-70">
              <WebsiteFrameIcon size={isMobile ? 16 : 20} />
            </div>
            <div className="h-[3px] bg-gradient-to-r from-lavender to-purple rounded-full" style={{ width: isMobile ? 28 : 40 }} />
            <span className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-foreground tracking-wide`}>Product</span>
            <div className="h-[3px] bg-gradient-to-l from-lavender to-purple rounded-full" style={{ width: isMobile ? 28 : 40 }} />
            <div className="text-muted-foreground opacity-70">
              <MobileScreenIcon size={isMobile ? 16 : 20} />
            </div>
          </div>
        </div>

        {/* Growth */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="text-muted-foreground opacity-70">
              <TrendLineIcon size={isMobile ? 16 : 20} />
            </div>
            <div className="h-[3px] bg-gradient-to-r from-purple to-pink rounded-full" style={{ width: isMobile ? 20 : 28 }} />
            <span className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-foreground tracking-wide`}>Growth</span>
            <div className="h-[3px] bg-gradient-to-l from-purple to-pink rounded-full" style={{ width: isMobile ? 20 : 28 }} />
            <div className="text-muted-foreground opacity-70">
              <AnalyticsIcon size={isMobile ? 16 : 20} />
            </div>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <p className={`absolute ${isMobile ? '-bottom-16' : '-bottom-20'} left-1/2 -translate-x-1/2 ${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground tracking-wide whitespace-nowrap`}>
        End-to-end digital execution
      </p>
    </div>
  </div>
);

export default HeroAnimation;
