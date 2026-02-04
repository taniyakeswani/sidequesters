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
      {/* Background grid and connection paths */}
      <BackgroundElements phase={phase} isMobile={isMobile} />
      
      {/* Ambient glow background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: phase === "living" ? 0.6 : 0.3 }}
        transition={{ duration: 1.2, ease: EASE_FLOAT }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[650px] md:h-[650px] bg-gradient-radial from-pink/12 via-lavender/8 to-transparent rounded-full blur-3xl" />
      </motion.div>

      {/* Main composition container */}
      <div className={`relative ${isMobile ? 'w-[340px] h-[400px]' : 'w-[620px] h-[520px]'}`}>
        
        {/* Central Brand Core */}
        <BrandCore phase={phase} isMobile={isMobile} />
        
        {/* Central Anchor Text */}
        <CentralAnchorText phase={phase} isMobile={isMobile} />
        
        {/* Website Frame */}
        <WebsiteFrame phase={phase} isMobile={isMobile} />
        
        {/* Mobile App Card */}
        <MobileAppCard phase={phase} isMobile={isMobile} />
        
        {/* Logo Fragments */}
        <LogoFragments phase={phase} isMobile={isMobile} />
        
        {/* SEO/Content Blocks with labels */}
        <ContentBlocks phase={phase} isMobile={isMobile} />
        
        {/* Growth Metrics */}
        <GrowthMetrics phase={phase} isMobile={isMobile} />
        
        {/* Social Media Tiles */}
        <SocialTiles phase={phase} isMobile={isMobile} />
        
        {/* Additional service elements for density */}
        <ServiceElements phase={phase} isMobile={isMobile} />
      </div>
    </div>
  );
};

// Background grid, nodes, and connection paths
const BackgroundElements = ({ phase, isMobile }: { phase: Phase; isMobile: boolean }) => {
  const showConnections = phase === "orchestrating" || phase === "revealed" || phase === "living";
  const isLiving = phase === "living";
  
  const gridSize = isMobile ? 40 : 50;
  const containerSize = isMobile ? 340 : 620;
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Subtle dot grid */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
        <defs>
          <pattern id="dotGrid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
            <circle cx={gridSize/2} cy={gridSize/2} r="1" fill="hsl(var(--muted-foreground))" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotGrid)" />
      </svg>
      
      {/* Connection paths that appear during orchestration */}
      <motion.svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        width={containerSize}
        height={containerSize}
        viewBox={`0 0 ${containerSize} ${containerSize}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: showConnections ? 0.2 : 0 }}
        transition={{ duration: 0.8, ease: EASE_SMOOTH }}
      >
        {/* Radial connection lines from center */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const centerX = containerSize / 2;
          const centerY = containerSize / 2;
          const length = isMobile ? 100 : 180;
          const endX = centerX + Math.cos((angle * Math.PI) / 180) * length;
          const endY = centerY + Math.sin((angle * Math.PI) / 180) * length;
          
          return (
            <motion.line
              key={angle}
              x1={centerX}
              y1={centerY}
              x2={endX}
              y2={endY}
              stroke="hsl(var(--lavender))"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: showConnections ? 1 : 0 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: EASE_SMOOTH }}
            />
          );
        })}
        
        {/* Orbital ring */}
        <motion.circle
          cx={containerSize / 2}
          cy={containerSize / 2}
          r={isMobile ? 120 : 200}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          strokeDasharray="8 8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: showConnections ? 0.3 : 0,
            scale: showConnections ? 1 : 0.8,
            rotate: isLiving ? 360 : 0,
          }}
          transition={{ 
            opacity: { duration: 0.6, ease: EASE_SMOOTH },
            scale: { duration: 0.8, ease: EASE_SMOOTH },
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
          }}
        />
      </motion.svg>
      
      {/* Floating background nodes */}
      {!isMobile && [
        { x: "15%", y: "25%", delay: 0 },
        { x: "85%", y: "30%", delay: 0.5 },
        { x: "10%", y: "70%", delay: 1 },
        { x: "90%", y: "65%", delay: 1.5 },
        { x: "25%", y: "85%", delay: 2 },
        { x: "75%", y: "80%", delay: 2.5 },
      ].map((node, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-lavender/30"
          style={{ left: node.x, top: node.y }}
          animate={{
            y: [0, -8, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.3,
            repeat: Infinity,
            delay: node.delay,
            ease: EASE_FLOAT,
          }}
        />
      ))}
    </div>
  );
};

// Floating label component
const FloatingLabel = ({ 
  label, 
  position, 
  phase, 
  delay = 0,
  isMobile,
}: { 
  label: string; 
  position: "top" | "bottom" | "left" | "right";
  phase: Phase;
  delay?: number;
  isMobile: boolean;
}) => {
  const showLabel = phase === "revealed" || phase === "living";
  const isLiving = phase === "living";
  
  const positionStyles = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-1",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-1",
    left: "right-full top-1/2 -translate-y-1/2 mr-1.5",
    right: "left-full top-1/2 -translate-y-1/2 ml-1.5",
  };

  return (
    <motion.div
      className={`absolute ${positionStyles[position]} whitespace-nowrap`}
      initial={{ opacity: 0, y: position === "top" ? 5 : position === "bottom" ? -5 : 0, x: position === "left" ? 5 : position === "right" ? -5 : 0 }}
      animate={{
        opacity: showLabel ? 0.7 : 0,
        y: showLabel ? (isLiving ? [0, -2, 0] : 0) : (position === "top" ? 5 : position === "bottom" ? -5 : 0),
        x: showLabel ? 0 : (position === "left" ? 5 : position === "right" ? -5 : 0),
      }}
      transition={{
        opacity: { duration: 0.4, delay: delay + 0.15, ease: EASE_SMOOTH },
        y: isLiving 
          ? { duration: 4, repeat: Infinity, ease: EASE_FLOAT }
          : { duration: 0.4, delay: delay + 0.15, ease: EASE_SMOOTH },
        x: { duration: 0.4, delay: delay + 0.15, ease: EASE_SMOOTH },
      }}
    >
      <span className={`${isMobile ? 'text-[7px]' : 'text-[9px]'} font-medium uppercase tracking-wider text-muted-foreground/80`}>
        {label}
      </span>
    </motion.div>
  );
};

// Central anchor text
const CentralAnchorText = ({ phase, isMobile }: { phase: Phase; isMobile: boolean }) => {
  const show = phase === "revealed" || phase === "living";
  const isLiving = phase === "living";

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 z-30 pointer-events-none"
      style={{ x: "-50%", y: isMobile ? "70px" : "90px" }}
      initial={{ opacity: 0, y: isMobile ? 80 : 100 }}
      animate={{
        opacity: show ? 1 : 0,
        y: show ? (isLiving ? [isMobile ? 70 : 90, isMobile ? 68 : 88, isMobile ? 70 : 90] : (isMobile ? 70 : 90)) : (isMobile ? 80 : 100),
      }}
      transition={{
        opacity: { duration: 0.6, delay: 0.4, ease: EASE_SMOOTH },
        y: isLiving 
          ? { duration: 4.5, repeat: Infinity, ease: EASE_FLOAT }
          : { duration: 0.6, delay: 0.4, ease: EASE_SMOOTH },
      }}
    >
      <div className="text-center">
        <motion.div
          className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-semibold uppercase tracking-[0.2em] text-foreground/60`}
          initial={{ letterSpacing: "0.3em" }}
          animate={{ letterSpacing: show ? "0.2em" : "0.3em" }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE_SMOOTH }}
        >
          Design · Build · Scale
        </motion.div>
        <motion.div
          className={`${isMobile ? 'text-[8px]' : 'text-[10px]'} text-muted-foreground/50 mt-1 tracking-wide`}
          initial={{ opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: EASE_SMOOTH }}
        >
          End-to-End Digital Execution
        </motion.div>
      </div>
    </motion.div>
  );
};

// Central glowing brand nucleus
const BrandCore = ({ phase, isMobile }: { phase: Phase; isMobile: boolean }) => {
  const isActive = phase !== "distributed";
  const isLiving = phase === "living";
  const size = isMobile ? 75 : 100;

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
      {/* Brand Identity label */}
      <FloatingLabel label="Brand Identity" position="top" phase={phase} delay={0.2} isMobile={isMobile} />
      
      <div 
        className="rounded-2xl bg-gradient-to-br from-pink via-lavender to-purple shadow-2xl flex items-center justify-center relative overflow-hidden"
        style={{ width: size, height: size }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: phase === "orchestrating" ? "100%" : "-100%" }}
          transition={{ duration: 0.9, ease: EASE_SMOOTH, delay: 0.2 }}
        />
        
        <svg viewBox="0 0 60 60" className={isMobile ? "w-9 h-9" : "w-12 h-12"}>
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
      
      {/* Logo Design label */}
      <FloatingLabel label="Logo Design" position="bottom" phase={phase} delay={0.3} isMobile={isMobile} />
    </motion.div>
  );
};

// Website browser frame
const WebsiteFrame = ({ phase, isMobile }: { phase: Phase; isMobile: boolean }) => {
  const isDistributed = phase === "distributed";
  const isLiving = phase === "living";
  const showLabel = phase === "revealed" || isLiving;
  
  const distributed = isMobile 
    ? { x: -75, y: -110, rotate: -8 }
    : { x: -200, y: -130, rotate: -6 };
  
  const final = isMobile
    ? { x: -90, y: -30, rotate: 0 }
    : { x: -175, y: -40, rotate: 0 };

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
      {/* Website label */}
      <motion.div
        className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: showLabel ? 0.7 : 0, y: showLabel ? 0 : 5 }}
        transition={{ duration: 0.4, delay: 0.2, ease: EASE_SMOOTH }}
      >
        <span className={`${isMobile ? 'text-[7px]' : 'text-[9px]'} font-medium uppercase tracking-wider text-muted-foreground/80`}>
          Website Development
        </span>
      </motion.div>
      
      <div className={`${isMobile ? 'w-[120px] h-[85px]' : 'w-[165px] h-[115px]'} rounded-xl border border-border/60 bg-card/95 backdrop-blur-sm overflow-hidden shadow-xl`}>
        <div className="flex items-center gap-1.5 px-2 py-1.5 border-b border-border/40 bg-muted/40">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-pink/70" />
            <div className="w-2 h-2 rounded-full bg-lavender/70" />
            <div className="w-2 h-2 rounded-full bg-purple/70" />
          </div>
          <div className="flex-1 h-3 bg-muted/60 rounded-sm mx-2" />
        </div>
        <div className="p-2 space-y-2">
          <div className="h-4 bg-gradient-to-r from-pink/20 to-lavender/20 rounded-sm" />
          <div className="flex gap-1.5">
            <div className="flex-1 h-8 bg-muted/50 rounded-sm" />
            <div className="flex-1 h-8 bg-muted/50 rounded-sm" />
            {!isMobile && <div className="flex-1 h-8 bg-muted/50 rounded-sm" />}
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-full bg-muted/40 rounded-sm" />
            <div className="h-1.5 w-3/4 bg-muted/30 rounded-sm" />
          </div>
        </div>
        
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
      
      {/* UX & UI label */}
      <motion.div
        className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: showLabel ? 0.6 : 0, y: showLabel ? 0 : -5 }}
        transition={{ duration: 0.4, delay: 0.35, ease: EASE_SMOOTH }}
      >
        <span className={`${isMobile ? 'text-[6px]' : 'text-[8px]'} font-medium uppercase tracking-wider text-muted-foreground/70`}>
          UX & UI Design
        </span>
      </motion.div>
    </motion.div>
  );
};

// Mobile app card
const MobileAppCard = ({ phase, isMobile }: { phase: Phase; isMobile: boolean }) => {
  const isDistributed = phase === "distributed";
  const isLiving = phase === "living";
  const showLabel = phase === "revealed" || isLiving;
  
  const distributed = isMobile
    ? { x: 65, y: -90, rotate: 12 }
    : { x: 175, y: -110, rotate: 10 };
  
  const final = isMobile
    ? { x: 55, y: -20, rotate: 0 }
    : { x: 115, y: -30, rotate: 0 };

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
      {/* App label */}
      <motion.div
        className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: showLabel ? 0.7 : 0, y: showLabel ? 0 : 5 }}
        transition={{ duration: 0.4, delay: 0.25, ease: EASE_SMOOTH }}
      >
        <span className={`${isMobile ? 'text-[7px]' : 'text-[9px]'} font-medium uppercase tracking-wider text-muted-foreground/80`}>
          App Development
        </span>
      </motion.div>
      
      <div className={`${isMobile ? 'w-[50px] h-[80px]' : 'w-[60px] h-[100px]'} rounded-xl border border-border/60 bg-card/95 backdrop-blur-sm overflow-hidden shadow-lg`}>
        <div className="flex justify-center pt-1">
          <div className={`${isMobile ? 'w-7 h-1' : 'w-8 h-1.5'} bg-muted/60 rounded-full`} />
        </div>
        <div className="p-1.5 space-y-1.5 mt-1">
          <div className="h-5 bg-gradient-to-br from-pink/25 to-lavender/25 rounded-md" />
          <div className="h-1 w-full bg-muted/40 rounded-sm" />
          <div className="h-1 w-2/3 bg-muted/30 rounded-sm" />
          <div className="flex gap-1 mt-1">
            <div className="flex-1 h-3 bg-muted/40 rounded-sm" />
            <div className="flex-1 h-3 bg-muted/40 rounded-sm" />
          </div>
        </div>
        <div className="absolute bottom-1 left-1 right-1 h-2.5 bg-muted/30 rounded-sm flex justify-around items-center px-1">
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
      distributed: isMobile ? { x: -35, y: -140 } : { x: -50, y: -190 },
      final: { x: 0, y: 0 },
      delay: 0,
    },
    { 
      distributed: isMobile ? { x: 55, y: -135 } : { x: 90, y: -175 },
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
          <div className={`${isMobile ? 'w-7 h-7' : 'w-9 h-9'} rounded-lg bg-gradient-to-br from-pink/60 to-lavender/60 flex items-center justify-center`}>
            <div className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} border-2 border-white/70 rounded-sm rotate-45`} />
          </div>
        </motion.div>
      ))}
    </>
  );
};

// SEO/Content blocks with labels
const ContentBlocks = ({ phase, isMobile }: { phase: Phase; isMobile: boolean }) => {
  const isDistributed = phase === "distributed";
  const isLiving = phase === "living";
  const showFinal = phase === "revealed" || isLiving;
  
  const blocks = [
    { 
      label: "SEO",
      fullLabel: "Search Optimization",
      distributed: isMobile ? { x: -105, y: 50 } : { x: -240, y: 70 },
      final: isMobile ? { x: -105, y: 80 } : { x: -220, y: 95 },
      floatDelay: 0,
    },
    { 
      label: "CONTENT",
      fullLabel: "Content Strategy",
      distributed: isMobile ? { x: 95, y: 70 } : { x: 225, y: 55 },
      final: isMobile ? { x: 90, y: 85 } : { x: 195, y: 100 },
      floatDelay: 0.5,
    },
    { 
      label: "ADS",
      fullLabel: "Performance Marketing",
      distributed: isMobile ? { x: -95, y: 110 } : { x: -195, y: 155 },
      final: isMobile ? { x: -75, y: 105 } : { x: -155, y: 140 },
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
          <div className="relative">
            <div className={`${isMobile ? 'px-2.5 py-1' : 'px-3.5 py-1.5'} rounded-full bg-secondary/80 border border-border/40 shadow-sm`}>
              <span className={`${isMobile ? 'text-[9px]' : 'text-[11px]'} font-semibold text-muted-foreground tracking-wide`}>
                {block.label}
              </span>
            </div>
            {/* Full label below */}
            <motion.div
              className="absolute top-full left-1/2 -translate-x-1/2 mt-0.5 whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: showFinal ? 0.5 : 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1, ease: EASE_SMOOTH }}
            >
              <span className={`${isMobile ? 'text-[6px]' : 'text-[8px]'} text-muted-foreground/60 tracking-wide`}>
                {block.fullLabel}
              </span>
            </motion.div>
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
    ? { x: 85, y: 100 }
    : { x: 190, y: 120 };
  
  const final = isMobile
    ? { x: 65, y: 70 }
    : { x: 145, y: 85 };

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
      {/* Analytics label */}
      <motion.div
        className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: showFinal ? 0.7 : 0, y: showFinal ? 0 : 5 }}
        transition={{ duration: 0.4, delay: 0.35, ease: EASE_SMOOTH }}
      >
        <span className={`${isMobile ? 'text-[7px]' : 'text-[9px]'} font-medium uppercase tracking-wider text-muted-foreground/80`}>
          Analytics & Growth
        </span>
      </motion.div>
      
      <div className={`${isMobile ? 'p-2' : 'p-2.5'} rounded-lg bg-card/90 border border-border/50 shadow-lg backdrop-blur-sm`}>
        <svg 
          viewBox="0 0 80 45" 
          className={isMobile ? "w-[65px] h-[36px]" : "w-[85px] h-[48px]"}
        >
          {[12, 24, 36].map((y, i) => (
            <line key={i} x1="0" y1={y} x2="80" y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.4" />
          ))}
          
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
      distributed: isMobile ? { x: -115, y: -60 } : { x: -250, y: -70 },
      final: isMobile ? { x: -110, y: 40 } : { x: -230, y: 45 },
      color: "from-pink/40 to-purple/40",
      label: "Social",
    },
    {
      distributed: isMobile ? { x: 105, y: 130 } : { x: 240, y: 145 },
      final: isMobile ? { x: 95, y: 115 } : { x: 210, y: 135 },
      color: "from-lavender/40 to-pink/40",
      label: "Engage",
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
          <div className="relative">
            <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg bg-gradient-to-br ${tile.color} border border-border/30 shadow-sm flex items-center justify-center`}>
              <div className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} rounded-sm bg-white/50`} />
            </div>
            {/* Micro label */}
            <motion.div
              className="absolute top-full left-1/2 -translate-x-1/2 mt-0.5 whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: showFinal ? 0.5 : 0 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1, ease: EASE_SMOOTH }}
            >
              <span className={`${isMobile ? 'text-[6px]' : 'text-[7px]'} text-muted-foreground/50 tracking-wide`}>
                {tile.label}
              </span>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

// Additional service elements for density
const ServiceElements = ({ phase, isMobile }: { phase: Phase; isMobile: boolean }) => {
  const isDistributed = phase === "distributed";
  const isLiving = phase === "living";
  const showFinal = phase === "revealed" || isLiving;
  
  if (isMobile) return null; // Skip on mobile for cleaner layout
  
  const elements = [
    {
      type: "email",
      distributed: { x: -280, y: -10 },
      final: { x: -260, y: 0 },
      label: "Email",
    },
    {
      type: "analytics",
      distributed: { x: 270, y: -30 },
      final: { x: 250, y: -20 },
      label: "Metrics",
    },
    {
      type: "automation",
      distributed: { x: -250, y: 120 },
      final: { x: -235, y: 110 },
      label: "Automation",
    },
  ];

  return (
    <>
      {elements.map((el, i) => (
        <motion.div
          key={el.type}
          className="absolute top-1/2 left-1/2 z-3"
          initial={{ 
            x: el.distributed.x, 
            y: el.distributed.y, 
            opacity: 0.4,
            scale: 0.8,
          }}
          animate={{
            x: isDistributed ? el.distributed.x : el.final.x,
            y: isDistributed
              ? [el.distributed.y - 3, el.distributed.y + 3, el.distributed.y - 3]
              : isLiving
                ? [el.final.y - 2, el.final.y + 2, el.final.y - 2]
                : el.final.y,
            opacity: showFinal ? 0.7 : isDistributed ? 0.4 : 0.5,
            scale: showFinal ? 0.95 : 0.8,
          }}
          transition={{
            x: { duration: 1, ease: EASE_SMOOTH },
            y: (isDistributed || isLiving)
              ? { duration: 5 + i * 0.4, repeat: Infinity, ease: EASE_FLOAT }
              : { duration: 1, ease: EASE_SMOOTH },
            opacity: { duration: 0.6, ease: EASE_SMOOTH },
            scale: { duration: 0.8, ease: EASE_SMOOTH },
          }}
        >
          <div className="relative flex flex-col items-center">
            <div className="w-7 h-7 rounded-md bg-muted/50 border border-border/30 flex items-center justify-center">
              {el.type === "email" && (
                <div className="w-4 h-3 rounded-sm border border-muted-foreground/30" />
              )}
              {el.type === "analytics" && (
                <div className="flex gap-0.5 items-end">
                  <div className="w-1 h-2 bg-muted-foreground/30 rounded-sm" />
                  <div className="w-1 h-3 bg-muted-foreground/40 rounded-sm" />
                  <div className="w-1 h-2.5 bg-muted-foreground/35 rounded-sm" />
                </div>
              )}
              {el.type === "automation" && (
                <div className="w-3 h-3 rounded-full border-2 border-muted-foreground/30 border-dashed" />
              )}
            </div>
            <motion.span
              className="text-[7px] text-muted-foreground/40 mt-0.5 tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: showFinal ? 0.5 : 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
            >
              {el.label}
            </motion.span>
          </div>
        </motion.div>
      ))}
    </>
  );
};

// Static stable state for reduced motion
const StableState = ({ isMobile }: { isMobile: boolean }) => (
  <div className="relative w-full h-full min-h-[450px] flex items-center justify-center">
    <div className={`relative ${isMobile ? 'w-[300px] h-[360px]' : 'w-[540px] h-[440px]'}`}>
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="staticGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="hsl(var(--muted-foreground))" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#staticGrid)" />
        </svg>
      </div>
      
      {/* Central brand */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="text-center">
          <div className={`${isMobile ? 'text-[7px]' : 'text-[9px]'} font-medium uppercase tracking-wider text-muted-foreground/60 mb-2`}>
            Brand Identity
          </div>
          <div className={`${isMobile ? 'w-18 h-18' : 'w-24 h-24'} rounded-2xl bg-gradient-to-br from-pink via-lavender to-purple shadow-xl flex items-center justify-center mx-auto`}>
            <svg viewBox="0 0 60 60" className={isMobile ? "w-9 h-9" : "w-12 h-12"}>
              <path d="M30 8L8 30L30 52L52 30L30 8Z" stroke="white" strokeWidth="2.5" fill="white" fillOpacity="0.2" />
              <circle cx="30" cy="30" r="7" fill="white" />
            </svg>
          </div>
          <div className={`${isMobile ? 'text-[9px]' : 'text-xs'} font-semibold uppercase tracking-[0.15em] text-foreground/60 mt-4`}>
            Design · Build · Scale
          </div>
          <div className={`${isMobile ? 'text-[7px]' : 'text-[10px]'} text-muted-foreground/50 mt-1`}>
            End-to-End Digital Execution
          </div>
        </div>
      </div>
      
      {/* Website */}
      <div className={`absolute ${isMobile ? 'left-2 top-[35%] w-[95px] h-[70px]' : 'left-6 top-[35%] w-[130px] h-[95px]'} rounded-xl bg-card border border-border/50 shadow-lg`}>
        <div className="h-3 border-b border-border/30 bg-muted/30 rounded-t-xl" />
        <div className="p-2 space-y-1">
          <div className="h-3 bg-gradient-to-r from-pink/20 to-lavender/20 rounded-sm" />
          <div className="flex gap-1">
            <div className="flex-1 h-4 bg-muted/40 rounded-sm" />
            <div className="flex-1 h-4 bg-muted/40 rounded-sm" />
          </div>
        </div>
        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${isMobile ? 'text-[6px]' : 'text-[8px]'} text-muted-foreground/50 tracking-wide`}>
          Website
        </div>
      </div>
      
      {/* App */}
      <div className={`absolute ${isMobile ? 'right-3 top-[35%] w-[42px] h-[68px]' : 'right-8 top-[35%] w-[52px] h-[85px]'} rounded-xl bg-card border border-border/50 shadow-lg`}>
        <div className="pt-1 flex justify-center">
          <div className="w-5 h-1 bg-muted/50 rounded-full" />
        </div>
        <div className="p-1.5 space-y-1 mt-1">
          <div className="h-4 bg-gradient-to-br from-pink/20 to-lavender/20 rounded-md" />
          <div className="h-1 bg-muted/30 rounded-sm" />
        </div>
        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${isMobile ? 'text-[6px]' : 'text-[8px]'} text-muted-foreground/50 tracking-wide`}>
          App
        </div>
      </div>
      
      {/* Growth chart */}
      <div className={`absolute ${isMobile ? 'right-3 bottom-12' : 'right-10 bottom-16'} p-2 rounded-lg bg-card/80 border border-border/40`}>
        <svg viewBox="0 0 60 30" className={isMobile ? "w-[48px] h-[24px]" : "w-[65px] h-[32px]"}>
          <path d="M4 26 Q18 22 30 16 T56 4" stroke="url(#staticGrowth)" strokeWidth="2" fill="none" />
          <defs>
            <linearGradient id="staticGrowth" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--pink))" />
              <stop offset="100%" stopColor="hsl(var(--purple))" />
            </linearGradient>
          </defs>
        </svg>
        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${isMobile ? 'text-[6px]' : 'text-[8px]'} text-muted-foreground/50 tracking-wide whitespace-nowrap`}>
          Analytics
        </div>
      </div>
      
      {/* Content badges */}
      <div className={`absolute ${isMobile ? 'left-3 bottom-14' : 'left-8 bottom-20'} flex flex-col gap-1.5`}>
        {["SEO", "ADS", "CONTENT"].map((label, i) => (
          <div key={label} className="px-2 py-0.5 rounded-full bg-secondary/70 border border-border/30">
            <span className={`${isMobile ? 'text-[8px]' : 'text-[10px]'} font-semibold text-muted-foreground`}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HeroAnimation;
