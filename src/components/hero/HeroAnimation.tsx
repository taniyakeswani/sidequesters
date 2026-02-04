import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Easing curves
const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;
const EASE_FLOAT = [0.45, 0.05, 0.55, 0.95] as const;

type Phase = "distributed" | "orchestrating" | "revealed" | "living";

const HeroAnimation = () => {
  const [phase, setPhase] = useState<Phase>("distributed");
  const [loopCount, setLoopCount] = useState(0);
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setPhase("living");
      return;
    }

    const runSequence = async () => {
      setPhase("distributed");
      await delay(1200);
      setPhase("orchestrating");
      await delay(1000);
      setPhase("revealed");
      await delay(1200);
      setPhase("living");
      await delay(4000);
      setLoopCount(c => c + 1);
    };

    runSequence();
  }, [loopCount, shouldReduceMotion]);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  if (shouldReduceMotion) {
    return <StableState isMobile={isMobile} />;
  }

  return (
    <div className="relative w-full h-full min-h-[450px] md:min-h-[550px] flex items-center justify-center">
      {/* Ambient glow background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: phase === "living" ? 0.6 : 0.3 }}
        transition={{ duration: 1.2, ease: EASE_FLOAT }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[650px] md:h-[650px] bg-gradient-radial from-pink/12 via-lavender/8 to-transparent rounded-full blur-3xl" />
      </motion.div>

      {/* Main composition container - fills 60-70% of hero */}
      <div className={`relative ${isMobile ? 'w-[340px] h-[380px]' : 'w-[580px] h-[480px]'}`}>
        
        {/* Central Brand Core - the nucleus everything assembles around */}
        <BrandCore phase={phase} isMobile={isMobile} />
        
        {/* Website Frame - Primary element */}
        <WebsiteFrame phase={phase} isMobile={isMobile} />
        
        {/* Mobile App Card - Docks beside website */}
        <MobileAppCard phase={phase} isMobile={isMobile} />
        
        {/* Logo Fragments - Assemble into brand mark */}
        <LogoFragments phase={phase} isMobile={isMobile} />
        
        {/* SEO/Content Blocks */}
        <ContentBlocks phase={phase} isMobile={isMobile} />
        
        {/* Growth Metrics - Wrap around the system */}
        <GrowthMetrics phase={phase} isMobile={isMobile} />
        
        {/* Social Media Tiles */}
        <SocialTiles phase={phase} isMobile={isMobile} />
      </div>
    </div>
  );
};

// Central glowing brand nucleus
const BrandCore = ({ phase, isMobile }: { phase: Phase; isMobile: boolean }) => {
  const isActive = phase !== "distributed";
  const isLiving = phase === "living";
  const size = isMobile ? 80 : 110;

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 z-20"
      initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
      animate={{
        scale: isActive ? (phase === "revealed" || isLiving ? 1.08 : 1) : 0,
        opacity: isActive ? 1 : 0,
        x: "-50%",
        y: isLiving ? ["-50%", "-52%", "-50%"] : "-50%",
      }}
      transition={{
        scale: { duration: 0.8, ease: EASE_SMOOTH },
        opacity: { duration: 0.6, ease: EASE_SMOOTH },
        y: isLiving ? { duration: 4.5, repeat: Infinity, ease: EASE_FLOAT } : { duration: 0 },
      }}
    >
      <div 
        className="rounded-2xl bg-gradient-to-br from-pink via-lavender to-purple shadow-2xl flex items-center justify-center relative overflow-hidden"
        style={{ width: size, height: size }}
      >
        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: phase === "orchestrating" ? "100%" : "-100%" }}
          transition={{ duration: 0.9, ease: EASE_SMOOTH, delay: 0.2 }}
        />
        
        {/* Logo mark */}
        <svg viewBox="0 0 60 60" className={isMobile ? "w-10 h-10" : "w-14 h-14"}>
          <motion.path
            d="M30 8L8 30L30 52L52 30L30 8Z"
            stroke="white"
            strokeWidth="2.5"
            fill="white"
            fillOpacity="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isActive ? 1 : 0 }}
            transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: 0.1 }}
          />
          <motion.circle
            cx="30" cy="30" r="7"
            fill="white"
            initial={{ scale: 0 }}
            animate={{ scale: isActive ? 1 : 0 }}
            transition={{ duration: 0.5, ease: EASE_SMOOTH, delay: 0.3 }}
          />
        </svg>
      </div>
    </motion.div>
  );
};

// Website browser frame
const WebsiteFrame = ({ phase, isMobile }: { phase: Phase; isMobile: boolean }) => {
  const isDistributed = phase === "distributed";
  const isLiving = phase === "living";
  
  const distributed = isMobile 
    ? { x: -80, y: -100, rotate: -8 }
    : { x: -180, y: -120, rotate: -6 };
  
  const final = isMobile
    ? { x: -85, y: -20, rotate: 0 }
    : { x: -155, y: -30, rotate: 0 };

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 z-10"
      initial={{ ...distributed, opacity: 0.7 }}
      animate={{
        x: isDistributed ? distributed.x : final.x,
        y: isDistributed 
          ? [distributed.y - 6, distributed.y + 6, distributed.y - 6]
          : isLiving 
            ? [final.y - 4, final.y + 4, final.y - 4]
            : final.y,
        rotate: isDistributed ? distributed.rotate : final.rotate,
        opacity: 1,
        scale: phase === "revealed" || isLiving ? 1 : 0.95,
      }}
      transition={{
        x: { duration: 1, ease: EASE_SMOOTH },
        y: (isDistributed || isLiving) 
          ? { duration: isDistributed ? 4 : 5, repeat: Infinity, ease: EASE_FLOAT }
          : { duration: 1, ease: EASE_SMOOTH },
        rotate: { duration: 1, ease: EASE_SMOOTH },
        scale: { duration: 0.8, ease: EASE_SMOOTH },
      }}
    >
      <div className={`${isMobile ? 'w-[130px] h-[95px]' : 'w-[180px] h-[130px]'} rounded-xl border border-border/60 bg-card/95 backdrop-blur-sm overflow-hidden shadow-xl`}>
        {/* Browser bar */}
        <div className="flex items-center gap-1.5 px-2 py-1.5 border-b border-border/40 bg-muted/40">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-pink/70" />
            <div className="w-2 h-2 rounded-full bg-lavender/70" />
            <div className="w-2 h-2 rounded-full bg-purple/70" />
          </div>
          <div className="flex-1 h-3 bg-muted/60 rounded-sm mx-2" />
        </div>
        {/* Website content */}
        <div className="p-2 space-y-2">
          {/* Hero section */}
          <div className="h-4 bg-gradient-to-r from-pink/20 to-lavender/20 rounded-sm" />
          {/* Content grid */}
          <div className="flex gap-1.5">
            <div className="flex-1 h-8 bg-muted/50 rounded-sm" />
            <div className="flex-1 h-8 bg-muted/50 rounded-sm" />
            {!isMobile && <div className="flex-1 h-8 bg-muted/50 rounded-sm" />}
          </div>
          {/* Text lines */}
          <div className="space-y-1">
            <div className="h-1.5 w-full bg-muted/40 rounded-sm" />
            <div className="h-1.5 w-3/4 bg-muted/30 rounded-sm" />
          </div>
        </div>
        
        {/* Living state: subtle scroll indicator */}
        {isLiving && (
          <motion.div
            className="absolute right-1 top-8 w-1 h-6 bg-muted/30 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-full h-2 bg-lavender/50 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: EASE_FLOAT }}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Mobile app card
const MobileAppCard = ({ phase, isMobile }: { phase: Phase; isMobile: boolean }) => {
  const isDistributed = phase === "distributed";
  const isLiving = phase === "living";
  
  const distributed = isMobile
    ? { x: 70, y: -80, rotate: 12 }
    : { x: 160, y: -100, rotate: 10 };
  
  const final = isMobile
    ? { x: 50, y: -10, rotate: 0 }
    : { x: 95, y: -20, rotate: 0 };

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 z-10"
      initial={{ ...distributed, opacity: 0.7 }}
      animate={{
        x: isDistributed ? distributed.x : final.x,
        y: isDistributed
          ? [distributed.y + 5, distributed.y - 5, distributed.y + 5]
          : isLiving
            ? [final.y - 3, final.y + 3, final.y - 3]
            : final.y,
        rotate: isDistributed ? distributed.rotate : final.rotate,
        opacity: 1,
        scale: phase === "revealed" || isLiving ? 1 : 0.95,
      }}
      transition={{
        x: { duration: 1, ease: EASE_SMOOTH },
        y: (isDistributed || isLiving)
          ? { duration: isDistributed ? 3.5 : 4.8, repeat: Infinity, ease: EASE_FLOAT }
          : { duration: 1, ease: EASE_SMOOTH },
        rotate: { duration: 1, ease: EASE_SMOOTH },
        scale: { duration: 0.8, ease: EASE_SMOOTH },
      }}
    >
      <div className={`${isMobile ? 'w-[55px] h-[90px]' : 'w-[70px] h-[115px]'} rounded-xl border border-border/60 bg-card/95 backdrop-blur-sm overflow-hidden shadow-lg`}>
        {/* Phone notch */}
        <div className="flex justify-center pt-1">
          <div className={`${isMobile ? 'w-8 h-1' : 'w-10 h-1.5'} bg-muted/60 rounded-full`} />
        </div>
        {/* App content */}
        <div className="p-1.5 space-y-1.5 mt-1">
          <div className="h-6 bg-gradient-to-br from-pink/25 to-lavender/25 rounded-md" />
          <div className="h-1 w-full bg-muted/40 rounded-sm" />
          <div className="h-1 w-2/3 bg-muted/30 rounded-sm" />
          <div className="flex gap-1 mt-1">
            <div className="flex-1 h-4 bg-muted/40 rounded-sm" />
            <div className="flex-1 h-4 bg-muted/40 rounded-sm" />
          </div>
        </div>
        {/* Bottom nav */}
        <div className="absolute bottom-1 left-1 right-1 h-3 bg-muted/30 rounded-sm flex justify-around items-center px-1">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-muted/60" />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Logo fragments that assemble
const LogoFragments = ({ phase, isMobile }: { phase: Phase; isMobile: boolean }) => {
  const isDistributed = phase === "distributed";
  const isActive = phase !== "distributed";
  
  const fragments = [
    { 
      distributed: isMobile ? { x: -40, y: -130 } : { x: -60, y: -180 },
      final: { x: 0, y: 0 },
      delay: 0,
    },
    { 
      distributed: isMobile ? { x: 60, y: -120 } : { x: 100, y: -160 },
      final: { x: 0, y: 0 },
      delay: 0.1,
    },
  ];

  return (
    <>
      {fragments.map((frag, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 z-5"
          initial={{ 
            x: frag.distributed.x, 
            y: frag.distributed.y, 
            opacity: 0.6,
            rotate: i === 0 ? -15 : 20,
          }}
          animate={{
            x: isDistributed ? frag.distributed.x : frag.final.x,
            y: isDistributed
              ? [frag.distributed.y - 4, frag.distributed.y + 4, frag.distributed.y - 4]
              : frag.final.y,
            opacity: isActive ? 0 : 0.6,
            rotate: isDistributed ? (i === 0 ? -15 : 20) : 0,
            scale: isDistributed ? 1 : 0,
          }}
          transition={{
            x: { duration: 0.8, ease: EASE_SMOOTH, delay: frag.delay },
            y: isDistributed
              ? { duration: 4.2, repeat: Infinity, ease: EASE_FLOAT }
              : { duration: 0.8, ease: EASE_SMOOTH, delay: frag.delay },
            opacity: { duration: 0.5, ease: EASE_SMOOTH, delay: frag.delay },
            rotate: { duration: 0.8, ease: EASE_SMOOTH, delay: frag.delay },
            scale: { duration: 0.6, ease: EASE_SMOOTH, delay: frag.delay },
          }}
        >
          <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg bg-gradient-to-br from-pink/60 to-lavender/60 flex items-center justify-center`}>
            <div className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} border-2 border-white/70 rounded-sm rotate-45`} />
          </div>
        </motion.div>
      ))}
    </>
  );
};

// SEO/Content blocks
const ContentBlocks = ({ phase, isMobile }: { phase: Phase; isMobile: boolean }) => {
  const isDistributed = phase === "distributed";
  const isLiving = phase === "living";
  const showFinal = phase === "revealed" || isLiving;
  
  const blocks = [
    { 
      label: "SEO",
      distributed: isMobile ? { x: -100, y: 40 } : { x: -220, y: 60 },
      final: isMobile ? { x: -100, y: 70 } : { x: -200, y: 80 },
      floatDelay: 0,
    },
    { 
      label: "CONTENT",
      distributed: isMobile ? { x: 90, y: 60 } : { x: 200, y: 40 },
      final: isMobile ? { x: 85, y: 75 } : { x: 175, y: 85 },
      floatDelay: 0.5,
    },
    { 
      label: "ADS",
      distributed: isMobile ? { x: -90, y: 100 } : { x: -180, y: 140 },
      final: isMobile ? { x: -70, y: 95 } : { x: -140, y: 120 },
      floatDelay: 1,
    },
  ];

  return (
    <>
      {blocks.map((block, i) => (
        <motion.div
          key={block.label}
          className="absolute top-1/2 left-1/2 z-5"
          initial={{ 
            x: block.distributed.x, 
            y: block.distributed.y,
            opacity: 0.6,
            rotate: i % 2 === 0 ? -5 : 5,
          }}
          animate={{
            x: isDistributed ? block.distributed.x : block.final.x,
            y: isDistributed
              ? [block.distributed.y - 5, block.distributed.y + 5, block.distributed.y - 5]
              : isLiving
                ? [block.final.y - 3, block.final.y + 3, block.final.y - 3]
                : block.final.y,
            opacity: showFinal ? (isLiving ? [0.7, 0.9, 0.7] : 0.85) : isDistributed ? 0.6 : 0.8,
            rotate: isDistributed ? (i % 2 === 0 ? -5 : 5) : 0,
            scale: showFinal ? 1 : 0.9,
          }}
          transition={{
            x: { duration: 1, ease: EASE_SMOOTH },
            y: (isDistributed || isLiving)
              ? { duration: isDistributed ? 3.8 + i * 0.3 : 4.5, repeat: Infinity, ease: EASE_FLOAT, delay: block.floatDelay }
              : { duration: 1, ease: EASE_SMOOTH },
            opacity: isLiving 
              ? { duration: 3, repeat: Infinity, ease: EASE_FLOAT }
              : { duration: 0.6, ease: EASE_SMOOTH },
            rotate: { duration: 1, ease: EASE_SMOOTH },
            scale: { duration: 0.8, ease: EASE_SMOOTH },
          }}
        >
          <div className={`${isMobile ? 'px-2.5 py-1' : 'px-3 py-1.5'} rounded-full bg-secondary/80 border border-border/40 shadow-sm`}>
            <span className={`${isMobile ? 'text-[9px]' : 'text-[10px]'} font-semibold text-muted-foreground tracking-wide`}>
              {block.label}
            </span>
          </div>
        </motion.div>
      ))}
    </>
  );
};

// Growth metrics that wrap around the system
const GrowthMetrics = ({ phase, isMobile }: { phase: Phase; isMobile: boolean }) => {
  const isDistributed = phase === "distributed";
  const isLiving = phase === "living";
  const showFinal = phase === "revealed" || isLiving;
  
  const distributed = isMobile
    ? { x: 80, y: 90 }
    : { x: 170, y: 100 };
  
  const final = isMobile
    ? { x: 60, y: 60 }
    : { x: 130, y: 70 };

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 z-5"
      initial={{ x: distributed.x, y: distributed.y, opacity: 0.6, rotate: 8 }}
      animate={{
        x: isDistributed ? distributed.x : final.x,
        y: isDistributed
          ? [distributed.y + 6, distributed.y - 6, distributed.y + 6]
          : isLiving
            ? [final.y - 4, final.y + 4, final.y - 4]
            : final.y,
        opacity: showFinal ? 1 : isDistributed ? 0.6 : 0.8,
        rotate: isDistributed ? 8 : 0,
        scale: showFinal ? 1 : 0.9,
      }}
      transition={{
        x: { duration: 1, ease: EASE_SMOOTH },
        y: (isDistributed || isLiving)
          ? { duration: isDistributed ? 4.2 : 5.2, repeat: Infinity, ease: EASE_FLOAT }
          : { duration: 1, ease: EASE_SMOOTH },
        opacity: { duration: 0.6, ease: EASE_SMOOTH },
        rotate: { duration: 1, ease: EASE_SMOOTH },
        scale: { duration: 0.8, ease: EASE_SMOOTH },
      }}
    >
      <div className={`${isMobile ? 'p-2' : 'p-2.5'} rounded-lg bg-card/90 border border-border/50 shadow-lg backdrop-blur-sm`}>
        <svg 
          viewBox="0 0 80 45" 
          className={isMobile ? "w-[70px] h-[40px]" : "w-[90px] h-[50px]"}
        >
          {/* Grid lines */}
          {[12, 24, 36].map((y, i) => (
            <line key={i} x1="0" y1={y} x2="80" y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.4" />
          ))}
          
          {/* Growth line */}
          <motion.path
            d="M4 38 Q20 34 35 26 T55 14 T76 6"
            stroke="url(#growthGrad)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: showFinal ? 1 : 0 }}
            transition={{ duration: 1, ease: EASE_SMOOTH, delay: 0.3 }}
          />
          
          {/* Living state: line moves upward */}
          {isLiving && (
            <motion.path
              d="M4 38 Q20 34 35 26 T55 14 T76 6"
              stroke="url(#growthGrad)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.3"
              initial={{ y: 0 }}
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity, ease: EASE_FLOAT }}
            />
          )}
          
          <defs>
            <linearGradient id="growthGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--pink))" />
              <stop offset="50%" stopColor="hsl(var(--lavender))" />
              <stop offset="100%" stopColor="hsl(var(--purple))" />
            </linearGradient>
          </defs>
          
          {/* End point */}
          <motion.circle
            cx="76" cy="6" r="4"
            fill="hsl(var(--pink))"
            initial={{ scale: 0 }}
            animate={{ 
              scale: showFinal ? 1 : 0,
              r: isLiving ? [4, 5, 4] : 4,
            }}
            transition={{ 
              scale: { duration: 0.5, ease: EASE_SMOOTH, delay: 0.6 },
              r: { duration: 2, repeat: Infinity, ease: EASE_FLOAT },
            }}
          />
        </svg>
        
        {/* Metric indicator */}
        <motion.div
          className="flex items-center gap-1 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: showFinal ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-emerald-500" />
          <span className={`${isMobile ? 'text-[8px]' : 'text-[9px]'} font-semibold text-emerald-600`}>+127%</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Social media tiles
const SocialTiles = ({ phase, isMobile }: { phase: Phase; isMobile: boolean }) => {
  const isDistributed = phase === "distributed";
  const isLiving = phase === "living";
  const showFinal = phase === "revealed" || isLiving;
  
  const tiles = [
    {
      distributed: isMobile ? { x: -110, y: -50 } : { x: -230, y: -60 },
      final: isMobile ? { x: -105, y: 30 } : { x: -210, y: 30 },
      color: "from-pink/40 to-purple/40",
    },
    {
      distributed: isMobile ? { x: 100, y: 120 } : { x: 220, y: 130 },
      final: isMobile ? { x: 90, y: 100 } : { x: 190, y: 115 },
      color: "from-lavender/40 to-pink/40",
    },
  ];

  return (
    <>
      {tiles.map((tile, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 z-5"
          initial={{ 
            x: tile.distributed.x, 
            y: tile.distributed.y, 
            opacity: 0.5,
            rotate: i === 0 ? -10 : 10,
          }}
          animate={{
            x: isDistributed ? tile.distributed.x : tile.final.x,
            y: isDistributed
              ? [tile.distributed.y - 4, tile.distributed.y + 4, tile.distributed.y - 4]
              : isLiving
                ? [tile.final.y - 3, tile.final.y + 3, tile.final.y - 3]
                : tile.final.y,
            opacity: showFinal ? 0.9 : isDistributed ? 0.5 : 0.7,
            rotate: isDistributed ? (i === 0 ? -10 : 10) : 0,
            scale: showFinal ? 1 : 0.85,
          }}
          transition={{
            x: { duration: 1, ease: EASE_SMOOTH },
            y: (isDistributed || isLiving)
              ? { duration: isDistributed ? 4.5 + i * 0.3 : 5, repeat: Infinity, ease: EASE_FLOAT }
              : { duration: 1, ease: EASE_SMOOTH },
            opacity: { duration: 0.6, ease: EASE_SMOOTH },
            rotate: { duration: 1, ease: EASE_SMOOTH },
            scale: { duration: 0.8, ease: EASE_SMOOTH },
          }}
        >
          <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg bg-gradient-to-br ${tile.color} border border-border/30 shadow-sm flex items-center justify-center`}>
            <div className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} rounded-sm bg-white/50`} />
          </div>
        </motion.div>
      ))}
    </>
  );
};

// Static stable state for reduced motion
const StableState = ({ isMobile }: { isMobile: boolean }) => (
  <div className="relative w-full h-full min-h-[450px] flex items-center justify-center">
    <div className={`relative ${isMobile ? 'w-[300px] h-[350px]' : 'w-[500px] h-[400px]'}`}>
      {/* Central brand */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className={`${isMobile ? 'w-20 h-20' : 'w-28 h-28'} rounded-2xl bg-gradient-to-br from-pink via-lavender to-purple shadow-xl flex items-center justify-center`}>
          <svg viewBox="0 0 60 60" className={isMobile ? "w-10 h-10" : "w-14 h-14"}>
            <path d="M30 8L8 30L30 52L52 30L30 8Z" stroke="white" strokeWidth="2.5" fill="white" fillOpacity="0.2" />
            <circle cx="30" cy="30" r="7" fill="white" />
          </svg>
        </div>
      </div>
      
      {/* Website */}
      <div className={`absolute ${isMobile ? 'left-2 top-1/2 -translate-y-1/2 w-[100px] h-[75px]' : 'left-4 top-1/2 -translate-y-1/2 w-[140px] h-[100px]'} rounded-xl bg-card border border-border/50 shadow-lg`}>
        <div className="h-3 border-b border-border/30 bg-muted/30 rounded-t-xl" />
        <div className="p-2 space-y-1">
          <div className="h-3 bg-gradient-to-r from-pink/20 to-lavender/20 rounded-sm" />
          <div className="flex gap-1">
            <div className="flex-1 h-5 bg-muted/40 rounded-sm" />
            <div className="flex-1 h-5 bg-muted/40 rounded-sm" />
          </div>
        </div>
      </div>
      
      {/* App */}
      <div className={`absolute ${isMobile ? 'right-4 top-1/2 -translate-y-1/2 w-[45px] h-[75px]' : 'right-8 top-1/2 -translate-y-1/2 w-[55px] h-[90px]'} rounded-xl bg-card border border-border/50 shadow-lg`}>
        <div className="pt-1 flex justify-center">
          <div className="w-6 h-1 bg-muted/50 rounded-full" />
        </div>
        <div className="p-1.5 space-y-1 mt-1">
          <div className="h-5 bg-gradient-to-br from-pink/20 to-lavender/20 rounded-md" />
          <div className="h-1 bg-muted/30 rounded-sm" />
        </div>
      </div>
      
      {/* Growth chart */}
      <div className={`absolute ${isMobile ? 'right-2 bottom-8' : 'right-4 bottom-12'} p-2 rounded-lg bg-card/80 border border-border/40`}>
        <svg viewBox="0 0 60 30" className={isMobile ? "w-[50px] h-[25px]" : "w-[70px] h-[35px]"}>
          <path d="M4 26 Q18 22 30 16 T56 4" stroke="url(#staticGrowth)" strokeWidth="2" fill="none" />
          <defs>
            <linearGradient id="staticGrowth" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--pink))" />
              <stop offset="100%" stopColor="hsl(var(--purple))" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Content badges */}
      <div className={`absolute ${isMobile ? 'left-4 bottom-10' : 'left-8 bottom-16'} flex gap-2`}>
        {["SEO", "ADS"].map(label => (
          <div key={label} className="px-2 py-0.5 rounded-full bg-secondary/70 border border-border/30">
            <span className="text-[9px] font-semibold text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HeroAnimation;
