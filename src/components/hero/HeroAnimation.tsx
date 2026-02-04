import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Easing
const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const;
const EASE_FLOAT = [0.45, 0.05, 0.55, 0.95] as const;

type Act = "brand" | "product" | "growth" | "lock" | "living";

const HeroAnimation = () => {
  const [act, setAct] = useState<Act>("brand");
  const [loopCount, setLoopCount] = useState(0);
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setAct("living");
      return;
    }

    const runSequence = async () => {
      setAct("brand");
      await delay(700);
      setAct("product");
      await delay(900);
      setAct("growth");
      await delay(1000);
      setAct("lock");
      await delay(700);
      setAct("living");
      await delay(5500);
      setLoopCount(c => c + 1);
    };

    runSequence();
  }, [loopCount, shouldReduceMotion]);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  if (shouldReduceMotion) {
    return <StableState isMobile={isMobile} />;
  }

  const showBrand = act !== "brand" || true;
  const showProduct = act === "product" || act === "growth" || act === "lock" || act === "living";
  const showGrowth = act === "growth" || act === "lock" || act === "living";
  const isLock = act === "lock" || act === "living";
  const isLiving = act === "living";

  return (
    <div className="relative w-full h-full min-h-[480px] md:min-h-[580px] flex items-center justify-center overflow-hidden">
      {/* Background darkening on lock */}
      <motion.div
        className="absolute inset-0 bg-background pointer-events-none"
        animate={{
          backgroundColor: isLock ? "hsl(var(--background) / 0.97)" : "hsl(var(--background))",
        }}
        transition={{ duration: 0.7, ease: EASE_CINEMATIC }}
      />
      
      {/* Main system container - 80-85% width */}
      <motion.div
        className={`relative ${isMobile ? 'w-[92%] max-w-[360px]' : 'w-[85%] max-w-[700px]'}`}
        animate={{
          scale: isLock ? 1.12 : 1,
        }}
        transition={{
          scale: { duration: 0.7, ease: EASE_CINEMATIC },
        }}
      >
        {/* System frame */}
        <motion.div
          className="absolute -inset-4 md:-inset-6 rounded-2xl border-2 border-pink/20 pointer-events-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: isLock ? (isLiving ? [0.6, 0.4, 0.6] : 0.6) : 0,
            scale: isLock ? 1 : 0.95,
          }}
          transition={{
            opacity: isLiving 
              ? { duration: 4, repeat: Infinity, ease: EASE_FLOAT }
              : { duration: 0.5, ease: EASE_CINEMATIC },
            scale: { duration: 0.6, ease: EASE_CINEMATIC },
          }}
        />

        {/* Three-stage vertical system */}
        <div className={`flex flex-col ${isMobile ? 'gap-8' : 'gap-10'}`}>
          
          {/* === BRAND STAGE === */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: isLiving ? [-2, 2, -2] : 0,
            }}
            transition={{
              opacity: { duration: 0.5, ease: EASE_CINEMATIC },
              y: isLiving 
                ? { duration: 5, repeat: Infinity, ease: EASE_FLOAT }
                : { duration: 0.6, ease: EASE_CINEMATIC },
            }}
          >
            {/* Brand label */}
            <motion.h3
              className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-foreground tracking-wider text-center mb-4`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE_CINEMATIC }}
            >
              BRAND
            </motion.h3>
            
            {/* Brand line with glow */}
            <div className="relative flex justify-center mb-4">
              <motion.div
                className="h-1 bg-gradient-to-r from-pink via-lavender to-pink rounded-full"
                initial={{ width: 0 }}
                animate={{ width: isMobile ? 200 : 300 }}
                transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
              />
              {/* Glow pulse */}
              {isLiving && (
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 bg-pink/30 rounded-full blur-sm"
                  style={{ width: isMobile ? 200 : 300 }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: EASE_FLOAT }}
                />
              )}
            </div>
            
            {/* Brand visuals */}
            <motion.div
              className="flex items-center justify-center gap-4 md:gap-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: EASE_CINEMATIC }}
            >
              {/* Logo mark */}
              <div className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} rounded-xl bg-gradient-to-br from-pink/20 to-lavender/20 border border-border/50 flex items-center justify-center`}>
                <svg viewBox="0 0 24 24" className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-pink`} fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3L3 12L12 21L21 12L12 3Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              
              {/* Color strip */}
              <div className={`flex ${isMobile ? 'gap-1' : 'gap-1.5'}`}>
                {['bg-pink', 'bg-lavender', 'bg-purple'].map((color, i) => (
                  <motion.div
                    key={color}
                    className={`${isMobile ? 'w-6 h-10' : 'w-8 h-14'} rounded-lg ${color}/60`}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.3, delay: 0.25 + i * 0.08, ease: EASE_CINEMATIC }}
                  />
                ))}
              </div>
              
              {/* Typography block */}
              <div className={`${isMobile ? 'w-16' : 'w-24'} space-y-1.5`}>
                <div className="h-2 bg-foreground/20 rounded-full" />
                <div className="h-2 w-3/4 bg-foreground/15 rounded-full" />
                <div className="h-2 w-1/2 bg-foreground/10 rounded-full" />
              </div>
            </motion.div>
          </motion.div>

          {/* === CONNECTOR: Brand → Product === */}
          <div className="flex justify-center">
            <motion.div
              className="w-0.5 bg-gradient-to-b from-lavender to-purple rounded-full"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: showProduct ? (isMobile ? 40 : 56) : 0,
                opacity: showProduct ? (isLiving ? [0.4, 0.7, 0.4] : 0.6) : 0,
              }}
              transition={{
                height: { duration: 0.6, ease: EASE_CINEMATIC },
                opacity: isLiving 
                  ? { duration: 3, repeat: Infinity, ease: EASE_FLOAT }
                  : { duration: 0.4, ease: EASE_CINEMATIC },
              }}
            />
          </div>

          {/* === PRODUCT STAGE === */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: showProduct ? 1 : 0,
              y: showProduct ? (isLiving ? [1.5, -1.5, 1.5] : 0) : 30,
            }}
            transition={{
              opacity: { duration: 0.5, ease: EASE_CINEMATIC },
              y: isLiving 
                ? { duration: 5.5, repeat: Infinity, ease: EASE_FLOAT, delay: 0.3 }
                : { duration: 0.6, ease: EASE_CINEMATIC },
            }}
          >
            {/* Product label */}
            <motion.h3
              className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-foreground tracking-wider text-center mb-4`}
              initial={{ opacity: 0 }}
              animate={{ opacity: showProduct ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: EASE_CINEMATIC }}
            >
              PRODUCT
            </motion.h3>
            
            {/* Product line */}
            <div className="flex justify-center mb-4">
              <motion.div
                className="h-1 bg-gradient-to-r from-lavender via-purple to-lavender rounded-full"
                initial={{ width: 0 }}
                animate={{ width: showProduct ? (isMobile ? 240 : 380) : 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: EASE_CINEMATIC }}
              />
            </div>
            
            {/* Product visuals */}
            <motion.div
              className="flex items-center justify-center gap-4 md:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: showProduct ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: EASE_CINEMATIC }}
            >
              {/* Website frame */}
              <motion.div
                className={`${isMobile ? 'w-28 h-20' : 'w-40 h-28'} rounded-lg border border-border/60 bg-card/80 overflow-hidden shadow-lg`}
                initial={{ x: -20, opacity: 0 }}
                animate={{ 
                  x: showProduct ? 0 : -20, 
                  opacity: showProduct ? 1 : 0,
                }}
                transition={{ duration: 0.5, delay: 0.15, ease: EASE_CINEMATIC }}
              >
                {/* Browser bar */}
                <div className="h-3 bg-muted/50 flex items-center px-1.5 gap-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink/60" />
                  <div className="w-1.5 h-1.5 rounded-full bg-lavender/60" />
                  <div className="w-1.5 h-1.5 rounded-full bg-purple/60" />
                </div>
                {/* Content */}
                <div className="p-2 space-y-1.5">
                  <div className="h-3 bg-gradient-to-r from-pink/20 to-lavender/20 rounded-sm" />
                  <div className="flex gap-1">
                    <div className="flex-1 h-5 bg-muted/40 rounded-sm" />
                    <div className="flex-1 h-5 bg-muted/40 rounded-sm" />
                  </div>
                </div>
                {/* Scroll indicator for living state */}
                {isLiving && (
                  <motion.div
                    className="absolute right-0.5 top-4 w-0.5 h-3 rounded-full overflow-hidden bg-muted/30"
                  >
                    <motion.div
                      className="w-full h-1 bg-lavender/50 rounded-full"
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: EASE_FLOAT }}
                    />
                  </motion.div>
                )}
              </motion.div>
              
              {/* Mobile frame */}
              <motion.div
                className={`${isMobile ? 'w-12 h-20' : 'w-16 h-28'} rounded-xl border border-border/60 bg-card/80 overflow-hidden shadow-lg`}
                initial={{ x: 20, opacity: 0 }}
                animate={{ 
                  x: showProduct ? 0 : 20, 
                  opacity: showProduct ? 1 : 0,
                }}
                transition={{ duration: 0.5, delay: 0.25, ease: EASE_CINEMATIC }}
              >
                {/* Notch */}
                <div className="flex justify-center pt-1">
                  <div className="w-6 h-1 bg-muted/50 rounded-full" />
                </div>
                {/* Content */}
                <div className="p-1.5 space-y-1 mt-1">
                  <div className="h-4 bg-gradient-to-br from-pink/20 to-lavender/20 rounded-md" />
                  <div className="h-1 bg-muted/40 rounded-sm" />
                  <div className="h-1 w-2/3 bg-muted/30 rounded-sm" />
                </div>
              </motion.div>
              
              {/* UI blocks */}
              <motion.div
                className={`flex flex-col ${isMobile ? 'gap-1.5' : 'gap-2'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: showProduct ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.35, ease: EASE_CINEMATIC }}
              >
                {[1, 2, 3].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`${isMobile ? 'w-10 h-5' : 'w-14 h-6'} rounded-md border border-border/40 bg-card/60`}
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ x: showProduct ? 0 : 10, opacity: showProduct ? 0.8 : 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.08, ease: EASE_CINEMATIC }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* === CONNECTOR: Product → Growth === */}
          <div className="flex justify-center">
            <motion.div
              className="w-0.5 bg-gradient-to-b from-purple to-pink rounded-full"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: showGrowth ? (isMobile ? 40 : 56) : 0,
                opacity: showGrowth ? (isLiving ? [0.4, 0.7, 0.4] : 0.6) : 0,
              }}
              transition={{
                height: { duration: 0.6, ease: EASE_CINEMATIC },
                opacity: isLiving 
                  ? { duration: 3.5, repeat: Infinity, ease: EASE_FLOAT, delay: 0.5 }
                  : { duration: 0.4, ease: EASE_CINEMATIC },
              }}
            />
          </div>

          {/* === GROWTH STAGE === */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: showGrowth ? 1 : 0,
              y: showGrowth ? (isLiving ? [-1, 1, -1] : 0) : 30,
            }}
            transition={{
              opacity: { duration: 0.5, ease: EASE_CINEMATIC },
              y: isLiving 
                ? { duration: 5, repeat: Infinity, ease: EASE_FLOAT, delay: 0.6 }
                : { duration: 0.6, ease: EASE_CINEMATIC },
            }}
          >
            {/* Growth label */}
            <motion.h3
              className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-foreground tracking-wider text-center mb-4`}
              initial={{ opacity: 0 }}
              animate={{ opacity: showGrowth ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: EASE_CINEMATIC }}
            >
              GROWTH
            </motion.h3>
            
            {/* Growth line */}
            <div className="flex justify-center mb-4">
              <motion.div
                className="h-1 bg-gradient-to-r from-purple via-pink to-purple rounded-full"
                initial={{ width: 0 }}
                animate={{ width: showGrowth ? (isMobile ? 200 : 300) : 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: EASE_CINEMATIC }}
              />
            </div>
            
            {/* Growth visuals */}
            <motion.div
              className="flex items-center justify-center gap-4 md:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: showGrowth ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: EASE_CINEMATIC }}
            >
              {/* Rising graph */}
              <motion.div
                className={`${isMobile ? 'w-24 h-16' : 'w-36 h-24'} rounded-lg border border-border/50 bg-card/60 p-2 md:p-3`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: showGrowth ? 1 : 0.9, opacity: showGrowth ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: EASE_CINEMATIC }}
              >
                <svg viewBox="0 0 100 60" className="w-full h-full">
                  {/* Grid lines */}
                  {[15, 30, 45].map((y, i) => (
                    <line key={i} x1="0" y1={y} x2="100" y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.4" />
                  ))}
                  {/* Animated growth line */}
                  <motion.path
                    d="M5 52 Q25 48 40 38 T65 22 T95 8"
                    stroke="url(#growthGrad)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: showGrowth ? 1 : 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: EASE_CINEMATIC }}
                  />
                  {/* Living: line drifts upward */}
                  {isLiving && (
                    <motion.path
                      d="M5 52 Q25 48 40 38 T65 22 T95 8"
                      stroke="url(#growthGrad)"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      opacity="0.3"
                      animate={{ y: [-1, 1, -1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: EASE_FLOAT }}
                    />
                  )}
                  <defs>
                    <linearGradient id="growthGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--purple))" />
                      <stop offset="50%" stopColor="hsl(var(--pink))" />
                      <stop offset="100%" stopColor="hsl(var(--lavender))" />
                    </linearGradient>
                  </defs>
                  {/* End point */}
                  <motion.circle
                    cx="95" cy="8" r="5"
                    fill="hsl(var(--pink))"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: showGrowth ? 1 : 0,
                      r: isLiving ? [5, 6, 5] : 5,
                    }}
                    transition={{ 
                      scale: { duration: 0.4, delay: 0.6, ease: EASE_CINEMATIC },
                      r: { duration: 2, repeat: Infinity, ease: EASE_FLOAT },
                    }}
                  />
                </svg>
              </motion.div>
              
              {/* Data points / bars */}
              <motion.div
                className={`flex items-end ${isMobile ? 'gap-1.5 h-14' : 'gap-2 h-20'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: showGrowth ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.25, ease: EASE_CINEMATIC }}
              >
                {[40, 55, 45, 70, 60, 85].map((height, i) => (
                  <motion.div
                    key={i}
                    className={`${isMobile ? 'w-2' : 'w-3'} rounded-t-sm bg-gradient-to-t from-purple/60 to-pink/60`}
                    initial={{ height: 0 }}
                    animate={{ 
                      height: showGrowth ? `${height}%` : 0,
                    }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.3 + i * 0.06, 
                      ease: EASE_CINEMATIC 
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Expansion arrows */}
              <motion.div
                className="flex flex-col gap-2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ 
                  opacity: showGrowth ? (isLiving ? [0.5, 0.8, 0.5] : 0.7) : 0, 
                  x: showGrowth ? 0 : 10,
                  y: isLiving ? [-2, 2, -2] : 0,
                }}
                transition={{
                  opacity: isLiving 
                    ? { duration: 3, repeat: Infinity, ease: EASE_FLOAT }
                    : { duration: 0.4, delay: 0.35, ease: EASE_CINEMATIC },
                  x: { duration: 0.4, delay: 0.35, ease: EASE_CINEMATIC },
                  y: isLiving 
                    ? { duration: 4, repeat: Infinity, ease: EASE_FLOAT }
                    : { duration: 0 },
                }}
              >
                {[0, 1, 2].map((i) => (
                  <svg key={i} viewBox="0 0 24 24" className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-pink/60`} fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="7 17 12 12 17 17" />
                    <polyline points="7 11 12 6 17 11" />
                  </svg>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.div
          className={`absolute ${isMobile ? '-bottom-12' : '-bottom-16'} left-1/2 -translate-x-1/2 text-center`}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isLock ? 1 : 0,
            y: isLock ? 0 : 10,
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.3, ease: EASE_CINEMATIC },
            y: { duration: 0.6, delay: 0.3, ease: EASE_CINEMATIC },
          }}
        >
          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground tracking-wide`}>
            End-to-end digital execution for brands that want to scale
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Static stable state
const StableState = ({ isMobile }: { isMobile: boolean }) => (
  <div className="relative w-full h-full min-h-[480px] flex items-center justify-center">
    <div 
      className={`relative ${isMobile ? 'w-[92%] max-w-[360px]' : 'w-[85%] max-w-[700px]'}`}
      style={{ transform: 'scale(1.12)' }}
    >
      {/* Frame */}
      <div className="absolute -inset-4 md:-inset-6 rounded-2xl border-2 border-pink/20 pointer-events-none" />
      
      <div className={`flex flex-col ${isMobile ? 'gap-8' : 'gap-10'}`}>
        {/* Brand */}
        <div>
          <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-foreground tracking-wider text-center mb-4`}>BRAND</h3>
          <div className="flex justify-center mb-4">
            <div className={`h-1 bg-gradient-to-r from-pink via-lavender to-pink rounded-full`} style={{ width: isMobile ? 200 : 300 }} />
          </div>
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <div className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} rounded-xl bg-gradient-to-br from-pink/20 to-lavender/20 border border-border/50 flex items-center justify-center`}>
              <svg viewBox="0 0 24 24" className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-pink`} fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 3L3 12L12 21L21 12L12 3Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div className={`flex ${isMobile ? 'gap-1' : 'gap-1.5'}`}>
              {['bg-pink', 'bg-lavender', 'bg-purple'].map((color) => (
                <div key={color} className={`${isMobile ? 'w-6 h-10' : 'w-8 h-14'} rounded-lg ${color}/60`} />
              ))}
            </div>
            <div className={`${isMobile ? 'w-16' : 'w-24'} space-y-1.5`}>
              <div className="h-2 bg-foreground/20 rounded-full" />
              <div className="h-2 w-3/4 bg-foreground/15 rounded-full" />
              <div className="h-2 w-1/2 bg-foreground/10 rounded-full" />
            </div>
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center">
          <div className={`w-0.5 ${isMobile ? 'h-10' : 'h-14'} bg-gradient-to-b from-lavender to-purple rounded-full opacity-60`} />
        </div>

        {/* Product */}
        <div>
          <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-foreground tracking-wider text-center mb-4`}>PRODUCT</h3>
          <div className="flex justify-center mb-4">
            <div className={`h-1 bg-gradient-to-r from-lavender via-purple to-lavender rounded-full`} style={{ width: isMobile ? 240 : 380 }} />
          </div>
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <div className={`${isMobile ? 'w-28 h-20' : 'w-40 h-28'} rounded-lg border border-border/60 bg-card/80 overflow-hidden shadow-lg`}>
              <div className="h-3 bg-muted/50 flex items-center px-1.5 gap-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-pink/60" />
                <div className="w-1.5 h-1.5 rounded-full bg-lavender/60" />
                <div className="w-1.5 h-1.5 rounded-full bg-purple/60" />
              </div>
              <div className="p-2 space-y-1.5">
                <div className="h-3 bg-gradient-to-r from-pink/20 to-lavender/20 rounded-sm" />
                <div className="flex gap-1">
                  <div className="flex-1 h-5 bg-muted/40 rounded-sm" />
                  <div className="flex-1 h-5 bg-muted/40 rounded-sm" />
                </div>
              </div>
            </div>
            <div className={`${isMobile ? 'w-12 h-20' : 'w-16 h-28'} rounded-xl border border-border/60 bg-card/80 overflow-hidden shadow-lg`}>
              <div className="flex justify-center pt-1">
                <div className="w-6 h-1 bg-muted/50 rounded-full" />
              </div>
              <div className="p-1.5 space-y-1 mt-1">
                <div className="h-4 bg-gradient-to-br from-pink/20 to-lavender/20 rounded-md" />
                <div className="h-1 bg-muted/40 rounded-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center">
          <div className={`w-0.5 ${isMobile ? 'h-10' : 'h-14'} bg-gradient-to-b from-purple to-pink rounded-full opacity-60`} />
        </div>

        {/* Growth */}
        <div>
          <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-foreground tracking-wider text-center mb-4`}>GROWTH</h3>
          <div className="flex justify-center mb-4">
            <div className={`h-1 bg-gradient-to-r from-purple via-pink to-purple rounded-full`} style={{ width: isMobile ? 200 : 300 }} />
          </div>
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <div className={`${isMobile ? 'w-24 h-16' : 'w-36 h-24'} rounded-lg border border-border/50 bg-card/60 p-2 md:p-3`}>
              <svg viewBox="0 0 100 60" className="w-full h-full">
                <path d="M5 52 Q25 48 40 38 T65 22 T95 8" stroke="url(#staticGrowthGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
                <defs>
                  <linearGradient id="staticGrowthGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--purple))" />
                    <stop offset="100%" stopColor="hsl(var(--pink))" />
                  </linearGradient>
                </defs>
                <circle cx="95" cy="8" r="5" fill="hsl(var(--pink))" />
              </svg>
            </div>
            <div className={`flex items-end ${isMobile ? 'gap-1.5 h-14' : 'gap-2 h-20'}`}>
              {[40, 55, 45, 70, 60, 85].map((height, i) => (
                <div key={i} className={`${isMobile ? 'w-2' : 'w-3'} rounded-t-sm bg-gradient-to-t from-purple/60 to-pink/60`} style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <p className={`absolute ${isMobile ? '-bottom-12' : '-bottom-16'} left-1/2 -translate-x-1/2 ${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground tracking-wide text-center`}>
        End-to-end digital execution for brands that want to scale
      </p>
    </div>
  </div>
);

export default HeroAnimation;
