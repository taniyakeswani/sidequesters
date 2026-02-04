import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Easing curves
const EASE_CHAOS = [0.25, 0.1, 0.25, 1] as const;
const EASE_SNAP = [0.22, 1, 0.36, 1] as const;
const EASE_FLOAT = [0.45, 0.05, 0.55, 0.95] as const;

type Phase = "chaos" | "snap" | "stable";

// Fragment definitions - what floats in chaos
const fragments = [
  // Logo shapes
  { id: "logo1", type: "logo", chaos: { x: -120, y: -80, rotate: -15 }, final: { x: 0, y: 0, rotate: 0 } },
  { id: "logo2", type: "logoRing", chaos: { x: 140, y: -60, rotate: 25 }, final: { x: 0, y: 0, rotate: 0 } },
  
  // UI Cards
  { id: "card1", type: "card", chaos: { x: -100, y: 60, rotate: -8 }, final: { x: -70, y: 40, rotate: 0 } },
  { id: "card2", type: "card", chaos: { x: 120, y: 80, rotate: 12 }, final: { x: 70, y: 40, rotate: 0 } },
  { id: "card3", type: "cardSmall", chaos: { x: -60, y: -100, rotate: -20 }, final: { x: -70, y: -30, rotate: 0 } },
  
  // SEO/Text blocks
  { id: "seo1", type: "text", label: "SEO", chaos: { x: 80, y: -100, rotate: 10 }, final: { x: 70, y: -30, rotate: 0 } },
  { id: "seo2", type: "text", label: "ADS", chaos: { x: -140, y: 20, rotate: -5 }, final: { x: -90, y: 70, rotate: 0 } },
  
  // App screens
  { id: "app1", type: "screen", chaos: { x: 60, y: 100, rotate: 8 }, final: { x: 0, y: 60, rotate: 0 } },
  
  // Growth graph
  { id: "graph1", type: "graph", chaos: { x: -80, y: 120, rotate: -12 }, final: { x: 90, y: 70, rotate: 0 } },
  
  // Social tiles
  { id: "social1", type: "social", chaos: { x: 100, y: 40, rotate: 15 }, final: { x: 0, y: -50, rotate: 0 } },
];

const HeroAnimation = () => {
  const [phase, setPhase] = useState<Phase>("chaos");
  const [loopCount, setLoopCount] = useState(0);
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setPhase("stable");
      return;
    }

    const runSequence = async () => {
      setPhase("chaos");
      await delay(1200);
      setPhase("snap");
      await delay(900);
      setPhase("stable");
      await delay(4000);
      setLoopCount(c => c + 1);
    };

    runSequence();
  }, [loopCount, shouldReduceMotion]);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  if (shouldReduceMotion) {
    return <StableState />;
  }

  const scale = isMobile ? 0.7 : 1;

  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] flex items-center justify-center">
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: phase === "stable" ? 0.5 : 0.2,
        }}
        transition={{ duration: 1, ease: EASE_FLOAT }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[450px] md:h-[450px] bg-gradient-radial from-pink/15 via-lavender/10 to-transparent rounded-full blur-3xl" />
      </motion.div>

      {/* Main container */}
      <div 
        className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px]"
        style={{ transform: `scale(${scale})` }}
      >
        {/* Center Logo - builds up from fragments */}
        <CenterLogo phase={phase} />

        {/* Floating fragments */}
        {fragments.map((frag, i) => (
          <Fragment key={frag.id} fragment={frag} phase={phase} index={i} />
        ))}

        {/* Final composed elements that appear after snap */}
        <ComposedWebsite phase={phase} />
        <ComposedGrowth phase={phase} />
      </div>
    </div>
  );
};

// Individual floating fragment
const Fragment = ({ 
  fragment, 
  phase, 
  index 
}: { 
  fragment: typeof fragments[0]; 
  phase: Phase; 
  index: number;
}) => {
  const isChaos = phase === "chaos";
  const isSnap = phase === "snap";
  const isStable = phase === "stable";

  // Chaos floating offset
  const floatOffset = index % 2 === 0 ? [-8, 8, -8] : [6, -6, 6];
  const floatDuration = 3 + (index * 0.3);

  // Hide most fragments after snap (they become part of composed elements)
  const hideAfterSnap = !["logo1", "logo2"].includes(fragment.id);

  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      initial={{
        x: fragment.chaos.x,
        y: fragment.chaos.y,
        rotate: fragment.chaos.rotate,
        opacity: 0.7,
      }}
      animate={{
        x: isChaos ? fragment.chaos.x : fragment.final.x,
        y: isChaos 
          ? [fragment.chaos.y + floatOffset[0], fragment.chaos.y + floatOffset[1], fragment.chaos.y + floatOffset[2]]
          : fragment.final.y,
        rotate: isChaos ? fragment.chaos.rotate : fragment.final.rotate,
        opacity: (isSnap || isStable) && hideAfterSnap ? 0 : isChaos ? 0.7 : 1,
        scale: isStable && !hideAfterSnap ? 1 : isChaos ? 0.9 : 1,
      }}
      transition={{
        x: { duration: isChaos ? 0 : 0.9, ease: EASE_SNAP },
        y: isChaos 
          ? { duration: floatDuration, repeat: Infinity, ease: EASE_FLOAT }
          : { duration: 0.9, ease: EASE_SNAP },
        rotate: { duration: 0.9, ease: EASE_SNAP },
        opacity: { duration: isSnap ? 0.4 : 0.6, ease: EASE_SNAP, delay: isSnap && hideAfterSnap ? 0.3 : 0 },
        scale: { duration: 0.9, ease: EASE_SNAP },
      }}
    >
      <FragmentContent type={fragment.type} label={(fragment as any).label} />
    </motion.div>
  );
};

// Fragment visual content
const FragmentContent = ({ type, label }: { type: string; label?: string }) => {
  switch (type) {
    case "logo":
      return (
        <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-pink to-lavender flex items-center justify-center shadow-lg">
          <div className="w-5 h-5 md:w-7 md:h-7 border-2 border-white/80 rounded-md rotate-45" />
        </div>
      );
    case "logoRing":
      return (
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-lavender/60 flex items-center justify-center">
          <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-lavender/40" />
        </div>
      );
    case "card":
      return (
        <div className="w-16 h-12 md:w-20 md:h-14 rounded-lg bg-card border border-border/50 shadow-sm p-2">
          <div className="w-full h-1.5 bg-muted rounded mb-1.5" />
          <div className="w-3/4 h-1.5 bg-muted/60 rounded" />
        </div>
      );
    case "cardSmall":
      return (
        <div className="w-10 h-8 md:w-12 md:h-10 rounded-md bg-card border border-border/40 shadow-sm p-1.5">
          <div className="w-full h-1 bg-pink/30 rounded" />
        </div>
      );
    case "text":
      return (
        <div className="px-3 py-1.5 rounded-full bg-secondary/80 border border-border/30">
          <span className="text-[10px] md:text-xs font-medium text-muted-foreground">{label}</span>
        </div>
      );
    case "screen":
      return (
        <div className="w-12 h-16 md:w-14 md:h-20 rounded-lg bg-card border border-border/50 shadow-sm overflow-hidden">
          <div className="h-2 bg-muted/60 border-b border-border/30" />
          <div className="p-1.5 space-y-1">
            <div className="w-full h-4 bg-gradient-to-r from-pink/20 to-lavender/20 rounded-sm" />
            <div className="w-full h-1 bg-muted/40 rounded" />
          </div>
        </div>
      );
    case "graph":
      return (
        <svg width="50" height="30" viewBox="0 0 50 30" className="md:w-[60px] md:h-[36px]">
          <path 
            d="M2 25 Q12 22 20 18 T35 10 T48 3" 
            stroke="hsl(var(--lavender))" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round"
          />
          <circle cx="48" cy="3" r="3" fill="hsl(var(--pink))" />
        </svg>
      );
    case "social":
      return (
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-purple/30 to-pink/30 border border-purple/20 flex items-center justify-center">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-sm bg-white/40" />
        </div>
      );
    default:
      return null;
  }
};

// Center logo that forms from fragments
const CenterLogo = ({ phase }: { phase: Phase }) => {
  const isStable = phase === "stable";

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: phase !== "chaos" ? 1 : 0,
        opacity: phase !== "chaos" ? 1 : 0,
        y: isStable ? [0, -4, 0] : 0,
      }}
      transition={{
        scale: { duration: 0.8, ease: EASE_SNAP, delay: phase === "snap" ? 0.1 : 0 },
        opacity: { duration: 0.6, ease: EASE_SNAP },
        y: isStable ? { duration: 4.5, repeat: Infinity, ease: EASE_FLOAT } : { duration: 0 },
      }}
    >
      <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-pink via-lavender to-purple shadow-xl flex items-center justify-center relative overflow-hidden">
        {/* Shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: phase === "snap" ? "100%" : "-100%" }}
          transition={{ duration: 0.8, ease: EASE_SNAP, delay: 0.3 }}
        />
        
        {/* Logo mark */}
        <svg viewBox="0 0 60 60" className="w-12 h-12 md:w-16 md:h-16">
          <motion.path
            d="M30 8L8 30L30 52L52 30L30 8Z"
            stroke="white"
            strokeWidth="2.5"
            fill="white"
            fillOpacity="0.15"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: phase !== "chaos" ? 1 : 0 }}
            transition={{ duration: 0.7, ease: EASE_SNAP, delay: 0.2 }}
          />
          <motion.circle 
            cx="30" 
            cy="30" 
            r="8" 
            fill="white" 
            fillOpacity="0.9"
            initial={{ scale: 0 }}
            animate={{ scale: phase !== "chaos" ? 1 : 0 }}
            transition={{ duration: 0.5, ease: EASE_SNAP, delay: 0.4 }}
          />
        </svg>
      </div>
    </motion.div>
  );
};

// Composed website layout (appears after snap)
const ComposedWebsite = ({ phase }: { phase: Phase }) => {
  const show = phase === "snap" || phase === "stable";
  const isStable = phase === "stable";

  return (
    <motion.div
      className="absolute"
      style={{ top: "50%", left: "50%", x: "-140px", y: "-20px" }}
      initial={{ opacity: 0, scale: 0.8, x: -160 }}
      animate={{
        opacity: show ? 1 : 0,
        scale: show ? 1 : 0.8,
        x: show ? -140 : -160,
        y: isStable ? [-20, -24, -20] : -20,
      }}
      transition={{
        opacity: { duration: 0.6, ease: EASE_SNAP, delay: 0.3 },
        scale: { duration: 0.7, ease: EASE_SNAP, delay: 0.3 },
        x: { duration: 0.7, ease: EASE_SNAP, delay: 0.3 },
        y: isStable ? { duration: 5, repeat: Infinity, ease: EASE_FLOAT } : { duration: 0 },
      }}
    >
      {/* Browser window */}
      <div className="w-[100px] h-[70px] md:w-[120px] md:h-[85px] rounded-lg border border-border/60 bg-card/90 backdrop-blur-sm overflow-hidden shadow-card">
        {/* Browser bar */}
        <div className="flex gap-1 p-1.5 border-b border-border/40 bg-muted/30">
          <div className="w-1.5 h-1.5 rounded-full bg-pink/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-lavender/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-purple/60" />
        </div>
        {/* Content */}
        <div className="p-2 space-y-1.5">
          <div className="h-2.5 bg-gradient-to-r from-pink/25 to-lavender/25 rounded-sm" />
          <div className="flex gap-1">
            <div className="flex-1 h-6 bg-muted/50 rounded-sm" />
            <div className="flex-1 h-6 bg-muted/50 rounded-sm" />
          </div>
          <div className="h-1.5 w-3/4 bg-muted/40 rounded-sm" />
        </div>
      </div>
    </motion.div>
  );
};

// Composed growth indicators (appears after snap)
const ComposedGrowth = ({ phase }: { phase: Phase }) => {
  const show = phase === "snap" || phase === "stable";
  const isStable = phase === "stable";

  return (
    <motion.div
      className="absolute"
      style={{ top: "50%", left: "50%", x: "50px", y: "20px" }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: show ? 1 : 0,
        scale: show ? 1 : 0.8,
        y: isStable ? [20, 16, 20] : 20,
      }}
      transition={{
        opacity: { duration: 0.6, ease: EASE_SNAP, delay: 0.4 },
        scale: { duration: 0.7, ease: EASE_SNAP, delay: 0.4 },
        y: isStable ? { duration: 4.8, repeat: Infinity, ease: EASE_FLOAT, delay: 0.5 } : { duration: 0 },
      }}
    >
      <div className="flex flex-col gap-2">
        {/* Growth chart */}
        <div className="bg-card/80 border border-border/50 rounded-lg p-2 shadow-sm">
          <svg width="70" height="35" viewBox="0 0 70 35" className="md:w-[85px] md:h-[42px]">
            {/* Grid */}
            {[10, 20, 30].map((y, i) => (
              <line key={i} x1="0" y1={y} x2="70" y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.5" />
            ))}
            {/* Line */}
            <motion.path
              d="M2 30 Q18 26 30 20 T50 10 T68 4"
              stroke="url(#composedGradient)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: show ? 1 : 0 }}
              transition={{ duration: 0.8, ease: EASE_SNAP, delay: 0.5 }}
            />
            <defs>
              <linearGradient id="composedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--pink))" />
                <stop offset="50%" stopColor="hsl(var(--lavender))" />
                <stop offset="100%" stopColor="hsl(var(--purple))" />
              </linearGradient>
            </defs>
            {/* End point */}
            <motion.circle
              cx="68"
              cy="4"
              r="4"
              fill="hsl(var(--pink))"
              initial={{ scale: 0 }}
              animate={{ scale: show ? 1 : 0 }}
              transition={{ duration: 0.4, ease: EASE_SNAP, delay: 0.8 }}
            />
          </svg>
        </div>

        {/* Metric badges */}
        <div className="flex gap-1.5">
          {["SEO", "ADS", "ROI"].map((label, i) => (
            <motion.div
              key={label}
              className="px-2 py-0.5 rounded-full bg-secondary/70 border border-border/30"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: show ? 1 : 0, y: show ? 0 : 10 }}
              transition={{ duration: 0.4, ease: EASE_SNAP, delay: 0.6 + i * 0.1 }}
            >
              <span className="text-[9px] md:text-[10px] font-medium text-muted-foreground">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Static stable state for reduced motion
const StableState = () => (
  <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
    <div className="relative">
      {/* Center logo */}
      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-pink via-lavender to-purple shadow-xl flex items-center justify-center mx-auto">
        <svg viewBox="0 0 60 60" className="w-14 h-14">
          <path d="M30 8L8 30L30 52L52 30L30 8Z" stroke="white" strokeWidth="2.5" fill="white" fillOpacity="0.15" />
          <circle cx="30" cy="30" r="8" fill="white" fillOpacity="0.9" />
        </svg>
      </div>
      {/* Side elements */}
      <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-20 h-16 rounded-lg bg-card border border-border/50 shadow-sm" />
      <div className="absolute -right-20 top-1/2 -translate-y-1/2">
        <svg width="70" height="35" viewBox="0 0 70 35">
          <path d="M2 30 Q18 26 30 20 T50 10 T68 4" stroke="url(#staticGrad)" strokeWidth="2.5" fill="none" />
          <defs>
            <linearGradient id="staticGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--pink))" />
              <stop offset="100%" stopColor="hsl(var(--purple))" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  </div>
);

export default HeroAnimation;
