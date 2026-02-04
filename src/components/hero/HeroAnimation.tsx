import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Easing
const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;
const EASE_FLOAT = [0.45, 0.05, 0.55, 0.95] as const;

type Phase = "line" | "expand" | "lock" | "living";

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
  const isExpand = phase === "expand";
  const isLock = phase === "lock" || phase === "living";
  const isLiving = phase === "living";

  return (
    <div className="relative w-full h-full min-h-[350px] md:min-h-[420px] flex items-center justify-center">
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
          className="absolute inset-0 rounded-xl border-2 border-pink/30 pointer-events-none"
          style={{ 
            margin: isMobile ? "-20px -30px" : "-28px -50px",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: isLock ? 1 : 0,
            scale: isLock ? 1 : 0.95,
          }}
          transition={{
            opacity: { duration: 0.5, ease: EASE_SMOOTH },
            scale: { duration: 0.6, ease: EASE_SMOOTH },
          }}
        >
          {/* Subtle pulse on living state */}
          {isLiving && (
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-pink/20"
              animate={{
                opacity: [0.5, 0, 0.5],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: EASE_FLOAT,
              }}
            />
          )}
        </motion.div>

        {/* The origin line */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-pink via-lavender to-purple rounded-full"
          style={{
            height: isMobile ? 4 : 5,
          }}
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: isLine ? (isMobile ? 120 : 180) : 0,
            opacity: isLine ? 1 : 0,
          }}
          transition={{
            width: { duration: 0.5, ease: EASE_SMOOTH },
            opacity: { duration: isLine ? 0.3 : 0.2, ease: EASE_SMOOTH },
          }}
        />

        {/* Three components that emerge from the line */}
        <div className={`flex flex-col ${isMobile ? 'gap-5' : 'gap-7'}`}>
          {/* Brand */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, y: 0, scaleX: 0 }}
            animate={{
              opacity: !isLine ? 1 : 0,
              y: isLiving ? [-2, 2, -2] : 0,
              scaleX: !isLine ? 1 : 0,
            }}
            transition={{
              opacity: { duration: 0.4, delay: isExpand ? 0 : 0, ease: EASE_SMOOTH },
              y: isLiving 
                ? { duration: 4.5, repeat: Infinity, ease: EASE_FLOAT }
                : { duration: 0.5, ease: EASE_SMOOTH },
              scaleX: { duration: 0.6, ease: EASE_SMOOTH },
            }}
          >
            <div className="flex items-center gap-3">
              <motion.div 
                className="h-[3px] bg-gradient-to-r from-pink to-lavender rounded-full"
                style={{ width: isMobile ? 24 : 36 }}
                initial={{ width: 0 }}
                animate={{ width: !isLine ? (isMobile ? 24 : 36) : 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: EASE_SMOOTH }}
              />
              <span className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-foreground tracking-wide`}>
                Brand
              </span>
              <motion.div 
                className="h-[3px] bg-gradient-to-l from-pink to-lavender rounded-full"
                style={{ width: isMobile ? 24 : 36 }}
                initial={{ width: 0 }}
                animate={{ width: !isLine ? (isMobile ? 24 : 36) : 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: EASE_SMOOTH }}
              />
            </div>
          </motion.div>

          {/* Product */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: !isLine ? 1 : 0,
              y: isLiving ? [1, -1, 1] : 0,
              scaleX: !isLine ? 1 : 0,
            }}
            transition={{
              opacity: { duration: 0.4, delay: isExpand ? 0.12 : 0, ease: EASE_SMOOTH },
              y: isLiving 
                ? { duration: 5, repeat: Infinity, ease: EASE_FLOAT, delay: 0.5 }
                : { duration: 0.5, ease: EASE_SMOOTH },
              scaleX: { duration: 0.6, delay: 0.08, ease: EASE_SMOOTH },
            }}
          >
            <div className="flex items-center gap-3">
              <motion.div 
                className="h-[3px] bg-gradient-to-r from-lavender to-purple rounded-full"
                style={{ width: isMobile ? 32 : 48 }}
                initial={{ width: 0 }}
                animate={{ width: !isLine ? (isMobile ? 32 : 48) : 0 }}
                transition={{ duration: 0.5, delay: 0.18, ease: EASE_SMOOTH }}
              />
              <span className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-foreground tracking-wide`}>
                Product
              </span>
              <motion.div 
                className="h-[3px] bg-gradient-to-l from-lavender to-purple rounded-full"
                style={{ width: isMobile ? 32 : 48 }}
                initial={{ width: 0 }}
                animate={{ width: !isLine ? (isMobile ? 32 : 48) : 0 }}
                transition={{ duration: 0.5, delay: 0.18, ease: EASE_SMOOTH }}
              />
            </div>
          </motion.div>

          {/* Growth */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: !isLine ? 1 : 0,
              y: isLiving ? [-1.5, 1.5, -1.5] : 0,
              scaleX: !isLine ? 1 : 0,
            }}
            transition={{
              opacity: { duration: 0.4, delay: isExpand ? 0.24 : 0, ease: EASE_SMOOTH },
              y: isLiving 
                ? { duration: 4.8, repeat: Infinity, ease: EASE_FLOAT, delay: 1 }
                : { duration: 0.5, ease: EASE_SMOOTH },
              scaleX: { duration: 0.6, delay: 0.16, ease: EASE_SMOOTH },
            }}
          >
            <div className="flex items-center gap-3">
              <motion.div 
                className="h-[3px] bg-gradient-to-r from-purple to-pink rounded-full"
                style={{ width: isMobile ? 24 : 36 }}
                initial={{ width: 0 }}
                animate={{ width: !isLine ? (isMobile ? 24 : 36) : 0 }}
                transition={{ duration: 0.5, delay: 0.26, ease: EASE_SMOOTH }}
              />
              <span className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-foreground tracking-wide`}>
                Growth
              </span>
              <motion.div 
                className="h-[3px] bg-gradient-to-l from-purple to-pink rounded-full"
                style={{ width: isMobile ? 24 : 36 }}
                initial={{ width: 0 }}
                animate={{ width: !isLine ? (isMobile ? 24 : 36) : 0 }}
                transition={{ duration: 0.5, delay: 0.26, ease: EASE_SMOOTH }}
              />
            </div>
          </motion.div>
        </div>

        {/* Tagline - fades in once after lock */}
        <motion.div
          className={`absolute ${isMobile ? '-bottom-14' : '-bottom-16'} left-1/2 -translate-x-1/2 whitespace-nowrap`}
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

// Static stable state for reduced motion
const StableState = ({ isMobile }: { isMobile: boolean }) => (
  <div className="relative w-full h-full min-h-[350px] flex items-center justify-center">
    <div className="relative flex flex-col items-center justify-center" style={{ transform: 'scale(1.06)' }}>
      {/* Frame */}
      <div 
        className="absolute inset-0 rounded-xl border-2 border-pink/30 pointer-events-none"
        style={{ margin: isMobile ? "-20px -30px" : "-28px -50px" }}
      />
      
      {/* Three components */}
      <div className={`flex flex-col ${isMobile ? 'gap-5' : 'gap-7'}`}>
        {/* Brand */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div 
              className="h-[3px] bg-gradient-to-r from-pink to-lavender rounded-full"
              style={{ width: isMobile ? 24 : 36 }}
            />
            <span className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-foreground tracking-wide`}>
              Brand
            </span>
            <div 
              className="h-[3px] bg-gradient-to-l from-pink to-lavender rounded-full"
              style={{ width: isMobile ? 24 : 36 }}
            />
          </div>
        </div>

        {/* Product */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div 
              className="h-[3px] bg-gradient-to-r from-lavender to-purple rounded-full"
              style={{ width: isMobile ? 32 : 48 }}
            />
            <span className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-foreground tracking-wide`}>
              Product
            </span>
            <div 
              className="h-[3px] bg-gradient-to-l from-lavender to-purple rounded-full"
              style={{ width: isMobile ? 32 : 48 }}
            />
          </div>
        </div>

        {/* Growth */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div 
              className="h-[3px] bg-gradient-to-r from-purple to-pink rounded-full"
              style={{ width: isMobile ? 24 : 36 }}
            />
            <span className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-foreground tracking-wide`}>
              Growth
            </span>
            <div 
              className="h-[3px] bg-gradient-to-l from-purple to-pink rounded-full"
              style={{ width: isMobile ? 24 : 36 }}
            />
          </div>
        </div>
      </div>

      {/* Tagline */}
      <p className={`absolute ${isMobile ? '-bottom-14' : '-bottom-16'} left-1/2 -translate-x-1/2 ${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground tracking-wide whitespace-nowrap`}>
        End-to-end digital execution
      </p>
    </div>
  </div>
);

export default HeroAnimation;
