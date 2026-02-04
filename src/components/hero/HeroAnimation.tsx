import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Easing
const EASE_FLOW = [0.22, 1, 0.36, 1] as const;
const EASE_FLOAT = [0.45, 0.05, 0.55, 0.95] as const;

type Stage = "brand" | "connector1" | "product" | "connector2" | "growth" | "complete" | "idle";

const HeroAnimation = () => {
  const [stage, setStage] = useState<Stage>("brand");
  const [loopCount, setLoopCount] = useState(0);
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setStage("idle");
      return;
    }

    const runSequence = async () => {
      setStage("brand");
      await delay(700);
      setStage("connector1");
      await delay(400);
      setStage("product");
      await delay(900);
      setStage("connector2");
      await delay(400);
      setStage("growth");
      await delay(1000);
      setStage("complete");
      await delay(600);
      setStage("idle");
      await delay(5000);
      setLoopCount(c => c + 1);
    };

    runSequence();
  }, [loopCount, shouldReduceMotion]);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  if (shouldReduceMotion) {
    return <StableState isMobile={isMobile} />;
  }

  // Stage visibility logic
  const showBrand = true;
  const showConnector1 = stage !== "brand";
  const showProduct = ["product", "connector2", "growth", "complete", "idle"].includes(stage);
  const showConnector2 = ["connector2", "growth", "complete", "idle"].includes(stage);
  const showGrowth = ["growth", "complete", "idle"].includes(stage);
  const isComplete = stage === "complete" || stage === "idle";
  const isIdle = stage === "idle";

  return (
    <div className="relative w-full h-full min-h-[500px] md:min-h-[520px] flex items-center justify-center overflow-hidden px-4">
      {/* Main roadmap container - 80-85% width */}
      <motion.div
        className={`relative w-full ${isMobile ? 'max-w-[360px]' : 'max-w-[1000px]'}`}
        animate={{
          scale: isComplete ? 1.08 : 1,
        }}
        transition={{
          scale: { duration: 0.6, ease: EASE_FLOW },
        }}
      >
        {/* Subtle guide frame on complete */}
        <motion.div
          className={`absolute ${isMobile ? '-inset-3' : '-inset-6'} rounded-2xl border border-border/30 pointer-events-none`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isComplete ? (isIdle ? [0.3, 0.5, 0.3] : 0.4) : 0 }}
          transition={{
            opacity: isIdle 
              ? { duration: 4, repeat: Infinity, ease: EASE_FLOAT }
              : { duration: 0.5, ease: EASE_FLOW },
          }}
        />

        {/* Roadmap layout - horizontal on desktop, vertical on mobile */}
        <div className={`flex ${isMobile ? 'flex-col gap-4' : 'flex-row items-stretch gap-0'}`}>
          
          {/* === STAGE 1: BRAND === */}
          <motion.div
            className={`${isMobile ? 'w-full' : 'flex-1'} relative`}
            initial={{ opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? -20 : 0 }}
            animate={{
              opacity: 1,
              x: 0,
              y: isIdle ? (isMobile ? [-2, 2, -2] : 0) : 0,
            }}
            transition={{
              opacity: { duration: 0.5, ease: EASE_FLOW },
              x: { duration: 0.6, ease: EASE_FLOW },
              y: isIdle ? { duration: 5, repeat: Infinity, ease: EASE_FLOAT } : { duration: 0 },
            }}
          >
            <div className={`${isMobile ? 'p-4' : 'p-6'} rounded-xl bg-card/50 border border-border/40 backdrop-blur-sm`}>
              {/* Stage number */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-pink/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-pink">1</span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-pink/40 to-transparent" />
              </div>
              
              {/* Heading */}
              <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-foreground tracking-wide mb-2`}>
                BRAND
              </h3>
              
              {/* Sub-labels */}
              <div className="flex flex-wrap gap-2 mb-4">
                {["Identity", "Design", "Positioning"].map((label, i) => (
                  <motion.span
                    key={label}
                    className="text-sm font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + i * 0.08, ease: EASE_FLOW }}
                  >
                    {label}
                  </motion.span>
                ))}
              </div>
              
              {/* Supporting visuals */}
              <div className="flex items-center gap-3">
                {/* Logo mark */}
                <motion.div
                  className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-lg bg-gradient-to-br from-pink/20 to-lavender/20 border border-pink/30 flex items-center justify-center`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3, ease: EASE_FLOW }}
                >
                  <svg viewBox="0 0 24 24" className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-pink`} fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 3L3 12L12 21L21 12L12 3Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </motion.div>
                
                {/* Color strip */}
                <div className="flex gap-1">
                  {['bg-pink', 'bg-lavender', 'bg-purple'].map((color, i) => (
                    <motion.div
                      key={color}
                      className={`${isMobile ? 'w-4 h-8' : 'w-5 h-10'} rounded-md ${color}/70`}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.3, delay: 0.35 + i * 0.06, ease: EASE_FLOW }}
                      style={{ originY: 1 }}
                    />
                  ))}
                </div>
                
                {/* Typography sample */}
                <div className="flex-1 space-y-1">
                  <div className="h-2 bg-foreground/15 rounded-full w-full" />
                  <div className="h-2 bg-foreground/10 rounded-full w-3/4" />
                </div>
              </div>
              
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-px rounded-xl bg-gradient-to-br from-pink/10 to-transparent pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isIdle ? [0.3, 0.6, 0.3] : 0.4 }}
                transition={{
                  opacity: isIdle 
                    ? { duration: 3, repeat: Infinity, ease: EASE_FLOAT }
                    : { duration: 0.5, ease: EASE_FLOW },
                }}
              />
            </div>
          </motion.div>

          {/* === CONNECTOR 1: BRAND → PRODUCT === */}
          <div className={`${isMobile ? 'flex justify-center py-2' : 'flex items-center px-2'}`}>
            <svg 
              className={isMobile ? 'w-8 h-12' : 'w-16 h-24'}
              viewBox={isMobile ? "0 0 32 48" : "0 0 64 96"}
            >
              {/* Curved connector path */}
              <motion.path
                d={isMobile 
                  ? "M16 4 Q16 24 16 44" 
                  : "M4 48 Q32 48 60 48"
                }
                stroke="url(#connector1Grad)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: showConnector1 ? 1 : 0,
                  opacity: showConnector1 ? (isIdle ? [0.5, 0.8, 0.5] : 0.7) : 0,
                }}
                transition={{
                  pathLength: { duration: 0.4, ease: EASE_FLOW },
                  opacity: isIdle 
                    ? { duration: 3.5, repeat: Infinity, ease: EASE_FLOAT }
                    : { duration: 0.3, ease: EASE_FLOW },
                }}
              />
              {/* Arrow head */}
              <motion.polygon
                points={isMobile ? "12,40 16,48 20,40" : "54,44 64,48 54,52"}
                fill="hsl(var(--lavender))"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: showConnector1 ? 0.8 : 0,
                  scale: showConnector1 ? 1 : 0,
                }}
                transition={{ duration: 0.3, delay: 0.2, ease: EASE_FLOW }}
              />
              <defs>
                <linearGradient id="connector1Grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--pink))" />
                  <stop offset="100%" stopColor="hsl(var(--lavender))" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* === STAGE 2: PRODUCT === */}
          <motion.div
            className={`${isMobile ? 'w-full' : 'flex-1'} relative`}
            initial={{ opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? -20 : 0 }}
            animate={{
              opacity: showProduct ? 1 : 0,
              x: showProduct ? 0 : (isMobile ? 0 : -30),
              y: showProduct ? (isIdle ? (isMobile ? [2, -2, 2] : 0) : 0) : (isMobile ? -20 : 0),
            }}
            transition={{
              opacity: { duration: 0.5, ease: EASE_FLOW },
              x: { duration: 0.6, ease: EASE_FLOW },
              y: isIdle ? { duration: 5.5, repeat: Infinity, ease: EASE_FLOAT, delay: 0.3 } : { duration: 0.5, ease: EASE_FLOW },
            }}
          >
            <div className={`${isMobile ? 'p-4' : 'p-6'} rounded-xl bg-card/50 border border-border/40 backdrop-blur-sm`}>
              {/* Stage number */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-lavender/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-lavender">2</span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-lavender/40 to-transparent" />
              </div>
              
              {/* Heading */}
              <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-foreground tracking-wide mb-2`}>
                PRODUCT
              </h3>
              
              {/* Sub-labels */}
              <div className="flex flex-wrap gap-2 mb-4">
                {["Website", "App", "UX/UI"].map((label, i) => (
                  <motion.span
                    key={label}
                    className="text-sm font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: showProduct ? 1 : 0, y: showProduct ? 0 : 5 }}
                    transition={{ duration: 0.3, delay: 0.15 + i * 0.08, ease: EASE_FLOW }}
                  >
                    {label}
                  </motion.span>
                ))}
              </div>
              
              {/* Supporting visuals */}
              <div className="flex items-center gap-3">
                {/* Website frame */}
                <motion.div
                  className={`${isMobile ? 'w-20 h-14' : 'w-28 h-20'} rounded-lg border border-border/60 bg-card/80 overflow-hidden shadow-md`}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: showProduct ? 0 : -10, opacity: showProduct ? 1 : 0 }}
                  transition={{ duration: 0.4, delay: 0.2, ease: EASE_FLOW }}
                >
                  <div className="h-2.5 bg-muted/60 flex items-center px-1 gap-0.5">
                    <div className="w-1 h-1 rounded-full bg-pink/60" />
                    <div className="w-1 h-1 rounded-full bg-lavender/60" />
                    <div className="w-1 h-1 rounded-full bg-purple/60" />
                  </div>
                  <div className="p-1.5 space-y-1">
                    <div className="h-2 bg-gradient-to-r from-lavender/20 to-purple/20 rounded-sm" />
                    <div className="flex gap-0.5">
                      <div className="flex-1 h-4 bg-muted/40 rounded-sm" />
                      <div className="flex-1 h-4 bg-muted/40 rounded-sm" />
                    </div>
                  </div>
                  {/* Scroll indicator */}
                  {isIdle && (
                    <motion.div className="absolute right-0.5 top-3 w-0.5 h-2 rounded-full overflow-hidden bg-muted/30">
                      <motion.div
                        className="w-full h-0.5 bg-lavender/50 rounded-full"
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: EASE_FLOAT }}
                      />
                    </motion.div>
                  )}
                </motion.div>
                
                {/* Mobile frame */}
                <motion.div
                  className={`${isMobile ? 'w-8 h-14' : 'w-10 h-18'} rounded-lg border border-border/60 bg-card/80 overflow-hidden shadow-md`}
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: showProduct ? 0 : 10, opacity: showProduct ? 1 : 0 }}
                  transition={{ duration: 0.4, delay: 0.3, ease: EASE_FLOW }}
                >
                  <div className="flex justify-center pt-0.5">
                    <div className="w-4 h-0.5 bg-muted/50 rounded-full" />
                  </div>
                  <div className="p-1 space-y-0.5 mt-0.5">
                    <div className="h-3 bg-gradient-to-br from-lavender/20 to-purple/20 rounded" />
                    <div className="h-0.5 bg-muted/30 rounded" />
                  </div>
                </motion.div>
                
                {/* UI blocks */}
                <div className="flex flex-col gap-1">
                  {[1, 2].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`${isMobile ? 'w-8 h-4' : 'w-10 h-5'} rounded border border-border/40 bg-muted/30`}
                      initial={{ x: 10, opacity: 0 }}
                      animate={{ x: showProduct ? 0 : 10, opacity: showProduct ? 0.7 : 0 }}
                      transition={{ duration: 0.3, delay: 0.35 + i * 0.08, ease: EASE_FLOW }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* === CONNECTOR 2: PRODUCT → GROWTH === */}
          <div className={`${isMobile ? 'flex justify-center py-2' : 'flex items-center px-2'}`}>
            <svg 
              className={isMobile ? 'w-8 h-12' : 'w-16 h-24'}
              viewBox={isMobile ? "0 0 32 48" : "0 0 64 96"}
            >
              {/* Thicker connector path */}
              <motion.path
                d={isMobile 
                  ? "M16 4 Q16 24 16 44" 
                  : "M4 48 Q32 48 60 48"
                }
                stroke="url(#connector2Grad)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: showConnector2 ? 1 : 0,
                  opacity: showConnector2 ? (isIdle ? [0.5, 0.8, 0.5] : 0.7) : 0,
                }}
                transition={{
                  pathLength: { duration: 0.4, ease: EASE_FLOW },
                  opacity: isIdle 
                    ? { duration: 4, repeat: Infinity, ease: EASE_FLOAT, delay: 0.5 }
                    : { duration: 0.3, ease: EASE_FLOW },
                }}
              />
              {/* Arrow head */}
              <motion.polygon
                points={isMobile ? "11,40 16,48 21,40" : "53,43 64,48 53,53"}
                fill="hsl(var(--purple))"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: showConnector2 ? 0.8 : 0,
                  scale: showConnector2 ? 1 : 0,
                }}
                transition={{ duration: 0.3, delay: 0.2, ease: EASE_FLOW }}
              />
              <defs>
                <linearGradient id="connector2Grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--lavender))" />
                  <stop offset="100%" stopColor="hsl(var(--purple))" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* === STAGE 3: GROWTH === */}
          <motion.div
            className={`${isMobile ? 'w-full' : 'flex-1'} relative`}
            initial={{ opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? -20 : 0 }}
            animate={{
              opacity: showGrowth ? 1 : 0,
              x: showGrowth ? 0 : (isMobile ? 0 : -30),
              y: showGrowth ? (isIdle ? (isMobile ? [-1, 1, -1] : 0) : 0) : (isMobile ? -20 : 0),
            }}
            transition={{
              opacity: { duration: 0.5, ease: EASE_FLOW },
              x: { duration: 0.6, ease: EASE_FLOW },
              y: isIdle ? { duration: 5, repeat: Infinity, ease: EASE_FLOAT, delay: 0.6 } : { duration: 0.5, ease: EASE_FLOW },
            }}
          >
            <div className={`${isMobile ? 'p-4' : 'p-6'} rounded-xl bg-card/50 border border-border/40 backdrop-blur-sm`}>
              {/* Stage number */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-purple/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-purple">3</span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-purple/40 to-transparent" />
              </div>
              
              {/* Heading */}
              <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-foreground tracking-wide mb-2`}>
                GROWTH
              </h3>
              
              {/* Sub-labels */}
              <div className="flex flex-wrap gap-2 mb-4">
                {["SEO", "Marketing", "Analytics"].map((label, i) => (
                  <motion.span
                    key={label}
                    className="text-sm font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: showGrowth ? 1 : 0, y: showGrowth ? 0 : 5 }}
                    transition={{ duration: 0.3, delay: 0.15 + i * 0.08, ease: EASE_FLOW }}
                  >
                    {label}
                  </motion.span>
                ))}
              </div>
              
              {/* Supporting visuals */}
              <div className="flex items-center gap-3">
                {/* Growth graph */}
                <motion.div
                  className={`${isMobile ? 'w-20 h-12' : 'w-28 h-16'} rounded-lg border border-border/50 bg-card/60 p-1.5`}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: showGrowth ? 1 : 0.9, opacity: showGrowth ? 1 : 0 }}
                  transition={{ duration: 0.4, delay: 0.2, ease: EASE_FLOW }}
                >
                  <svg viewBox="0 0 80 40" className="w-full h-full">
                    {/* Grid */}
                    {[10, 20, 30].map((y, i) => (
                      <line key={i} x1="0" y1={y} x2="80" y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
                    ))}
                    {/* Animated line */}
                    <motion.path
                      d="M4 34 Q20 30 35 22 T55 12 T76 4"
                      stroke="url(#growthLineGrad)"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: showGrowth ? 1 : 0 }}
                      transition={{ duration: 0.6, delay: 0.3, ease: EASE_FLOW }}
                    />
                    {/* Idle drift */}
                    {isIdle && (
                      <motion.path
                        d="M4 34 Q20 30 35 22 T55 12 T76 4"
                        stroke="url(#growthLineGrad)"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        opacity="0.3"
                        animate={{ y: [-1, 1, -1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: EASE_FLOAT }}
                      />
                    )}
                    <defs>
                      <linearGradient id="growthLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--purple))" />
                        <stop offset="100%" stopColor="hsl(var(--pink))" />
                      </linearGradient>
                    </defs>
                    {/* End point */}
                    <motion.circle
                      cx="76" cy="4" r="4"
                      fill="hsl(var(--pink))"
                      initial={{ scale: 0 }}
                      animate={{ scale: showGrowth ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: 0.5, ease: EASE_FLOW }}
                    />
                  </svg>
                </motion.div>
                
                {/* Data bars */}
                <div className={`flex items-end gap-1 ${isMobile ? 'h-10' : 'h-14'}`}>
                  {[35, 50, 42, 65, 55, 80].map((h, i) => (
                    <motion.div
                      key={i}
                      className={`${isMobile ? 'w-1.5' : 'w-2'} rounded-t bg-gradient-to-t from-purple/60 to-pink/60`}
                      initial={{ height: 0 }}
                      animate={{ height: showGrowth ? `${h}%` : 0 }}
                      transition={{ duration: 0.4, delay: 0.25 + i * 0.05, ease: EASE_FLOW }}
                    />
                  ))}
                </div>
                
                {/* Expansion arrows */}
                <motion.div
                  className="flex flex-col gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: showGrowth ? 0.6 : 0,
                    y: isIdle ? [-2, 2, -2] : 0,
                  }}
                  transition={{
                    opacity: { duration: 0.4, delay: 0.4, ease: EASE_FLOW },
                    y: isIdle ? { duration: 3, repeat: Infinity, ease: EASE_FLOAT } : { duration: 0 },
                  }}
                >
                  {[0, 1].map((i) => (
                    <svg key={i} viewBox="0 0 16 16" className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-purple/60`} fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="4 10 8 6 12 10" />
                    </svg>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.div
          className={`text-center ${isMobile ? 'mt-6' : 'mt-8'}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isComplete ? 1 : 0, y: isComplete ? 0 : 10 }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE_FLOW }}
        >
          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground tracking-wide`}>
            A complete digital roadmap — from brand to scale
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Static stable state
const StableState = ({ isMobile }: { isMobile: boolean }) => (
  <div className="relative w-full h-full min-h-[500px] flex items-center justify-center px-4">
    <div 
      className={`relative w-full ${isMobile ? 'max-w-[360px]' : 'max-w-[1000px]'}`}
      style={{ transform: 'scale(1.08)' }}
    >
      {/* Guide frame */}
      <div className={`absolute ${isMobile ? '-inset-3' : '-inset-6'} rounded-2xl border border-border/30 pointer-events-none`} />
      
      <div className={`flex ${isMobile ? 'flex-col gap-4' : 'flex-row items-stretch gap-0'}`}>
        {/* Brand */}
        <div className={`${isMobile ? 'w-full' : 'flex-1'} p-4 md:p-6 rounded-xl bg-card/50 border border-border/40`}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-pink/20 flex items-center justify-center">
              <span className="text-xs font-bold text-pink">1</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-pink/40 to-transparent" />
          </div>
          <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-foreground tracking-wide mb-2`}>BRAND</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {["Identity", "Design", "Positioning"].map((l) => (
              <span key={l} className="text-sm font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md">{l}</span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-lg bg-gradient-to-br from-pink/20 to-lavender/20 border border-pink/30 flex items-center justify-center`}>
              <svg viewBox="0 0 24 24" className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-pink`} fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 3L3 12L12 21L21 12L12 3Z" /><circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div className="flex gap-1">
              {['bg-pink', 'bg-lavender', 'bg-purple'].map((c) => (
                <div key={c} className={`${isMobile ? 'w-4 h-8' : 'w-5 h-10'} rounded-md ${c}/70`} />
              ))}
            </div>
          </div>
        </div>

        {/* Connector */}
        <div className={`${isMobile ? 'flex justify-center py-2' : 'flex items-center px-2'}`}>
          <svg className={isMobile ? 'w-8 h-12' : 'w-16 h-24'} viewBox={isMobile ? "0 0 32 48" : "0 0 64 96"}>
            <path d={isMobile ? "M16 4 Q16 24 16 44" : "M4 48 Q32 48 60 48"} stroke="url(#c1)" strokeWidth="3" fill="none" opacity="0.7" />
            <polygon points={isMobile ? "12,40 16,48 20,40" : "54,44 64,48 54,52"} fill="hsl(var(--lavender))" opacity="0.8" />
            <defs><linearGradient id="c1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="hsl(var(--pink))" /><stop offset="100%" stopColor="hsl(var(--lavender))" /></linearGradient></defs>
          </svg>
        </div>

        {/* Product */}
        <div className={`${isMobile ? 'w-full' : 'flex-1'} p-4 md:p-6 rounded-xl bg-card/50 border border-border/40`}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-lavender/20 flex items-center justify-center">
              <span className="text-xs font-bold text-lavender">2</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-lavender/40 to-transparent" />
          </div>
          <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-foreground tracking-wide mb-2`}>PRODUCT</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {["Website", "App", "UX/UI"].map((l) => (
              <span key={l} className="text-sm font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md">{l}</span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className={`${isMobile ? 'w-20 h-14' : 'w-28 h-20'} rounded-lg border border-border/60 bg-card/80 overflow-hidden`}>
              <div className="h-2.5 bg-muted/60" />
              <div className="p-1.5 space-y-1">
                <div className="h-2 bg-lavender/20 rounded-sm" />
                <div className="flex gap-0.5"><div className="flex-1 h-4 bg-muted/40 rounded-sm" /><div className="flex-1 h-4 bg-muted/40 rounded-sm" /></div>
              </div>
            </div>
            <div className={`${isMobile ? 'w-8 h-14' : 'w-10 h-18'} rounded-lg border border-border/60 bg-card/80`} />
          </div>
        </div>

        {/* Connector */}
        <div className={`${isMobile ? 'flex justify-center py-2' : 'flex items-center px-2'}`}>
          <svg className={isMobile ? 'w-8 h-12' : 'w-16 h-24'} viewBox={isMobile ? "0 0 32 48" : "0 0 64 96"}>
            <path d={isMobile ? "M16 4 Q16 24 16 44" : "M4 48 Q32 48 60 48"} stroke="url(#c2)" strokeWidth="4" fill="none" opacity="0.7" />
            <polygon points={isMobile ? "11,40 16,48 21,40" : "53,43 64,48 53,53"} fill="hsl(var(--purple))" opacity="0.8" />
            <defs><linearGradient id="c2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="hsl(var(--lavender))" /><stop offset="100%" stopColor="hsl(var(--purple))" /></linearGradient></defs>
          </svg>
        </div>

        {/* Growth */}
        <div className={`${isMobile ? 'w-full' : 'flex-1'} p-4 md:p-6 rounded-xl bg-card/50 border border-border/40`}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-purple/20 flex items-center justify-center">
              <span className="text-xs font-bold text-purple">3</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-purple/40 to-transparent" />
          </div>
          <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-foreground tracking-wide mb-2`}>GROWTH</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {["SEO", "Marketing", "Analytics"].map((l) => (
              <span key={l} className="text-sm font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md">{l}</span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className={`${isMobile ? 'w-20 h-12' : 'w-28 h-16'} rounded-lg border border-border/50 bg-card/60 p-1.5`}>
              <svg viewBox="0 0 80 40" className="w-full h-full">
                <path d="M4 34 Q20 30 35 22 T55 12 T76 4" stroke="url(#g)" strokeWidth="2.5" fill="none" />
                <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="hsl(var(--purple))" /><stop offset="100%" stopColor="hsl(var(--pink))" /></linearGradient></defs>
                <circle cx="76" cy="4" r="4" fill="hsl(var(--pink))" />
              </svg>
            </div>
            <div className={`flex items-end gap-1 ${isMobile ? 'h-10' : 'h-14'}`}>
              {[35, 50, 42, 65, 55, 80].map((h, i) => (
                <div key={i} className={`${isMobile ? 'w-1.5' : 'w-2'} rounded-t bg-gradient-to-t from-purple/60 to-pink/60`} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <p className={`text-center ${isMobile ? 'mt-6 text-xs' : 'mt-8 text-sm'} text-muted-foreground tracking-wide`}>
        A complete digital roadmap — from brand to scale
      </p>
    </div>
  </div>
);

export default HeroAnimation;
