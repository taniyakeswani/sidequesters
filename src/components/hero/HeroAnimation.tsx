import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Consistent easing throughout
const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;
const EASE_GENTLE = [0.45, 0.05, 0.55, 0.95] as const;

// Animation phases
type Phase = "idle" | "tap" | "brand" | "website" | "growth" | "complete";

const HeroAnimation = () => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [loopCount, setLoopCount] = useState(0);
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();

  // Animation sequence controller
  useEffect(() => {
    if (shouldReduceMotion) {
      setPhase("complete");
      return;
    }

    const sequence = async () => {
      // Initial delay
      await delay(800);
      setPhase("tap");
      await delay(700);
      setPhase("brand");
      await delay(800);
      setPhase("website");
      await delay(1000);
      setPhase("growth");
      await delay(1100);
      setPhase("complete");
      await delay(2500);
      // Loop
      setLoopCount(c => c + 1);
    };

    sequence();
  }, [loopCount, shouldReduceMotion]);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  if (shouldReduceMotion) {
    return <StaticHeroVisual />;
  }

  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] flex items-center justify-center">
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: phase === "complete" ? 0.6 : 0.3,
        }}
        transition={{ duration: 1.5, ease: EASE_SMOOTH }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-gradient-radial from-pink/20 via-lavender/10 to-transparent rounded-full blur-3xl" />
      </motion.div>

      {/* Main animation container */}
      <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px]">
        
        {/* STATE 1: Tap indicator */}
        <TapIndicator phase={phase} />

        {/* STATE 2: Brand/Logo node */}
        <BrandNode phase={phase} />

        {/* STATE 3: Website elements (desktop only) */}
        {!isMobile && <WebsiteElements phase={phase} />}

        {/* STATE 4: Growth indicators */}
        <GrowthIndicators phase={phase} isMobile={isMobile} />

        {/* STATE 5: Ambient particles (complete state) */}
        <AmbientParticles phase={phase} />
      </div>
    </div>
  );
};

// Tap/Click indicator
const TapIndicator = ({ phase }: { phase: Phase }) => {
  const showTap = phase === "idle" || phase === "tap";
  const isTapping = phase === "tap";

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: showTap ? 1 : 0,
        scale: showTap ? 1 : 0.6,
      }}
      transition={{ duration: 0.5, ease: EASE_SMOOTH }}
    >
      {/* Cursor/tap circle */}
      <motion.div
        className="relative"
        animate={{
          y: showTap ? [0, -4, 0] : 0,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: EASE_GENTLE,
        }}
      >
        {/* Outer ring */}
        <motion.div
          className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-pink/40 flex items-center justify-center"
          animate={{
            scale: isTapping ? [1, 1.3, 1.1] : 1,
            borderColor: isTapping ? "hsl(var(--pink))" : "hsl(var(--pink) / 0.4)",
          }}
          transition={{ duration: 0.6, ease: EASE_SMOOTH }}
        >
          {/* Inner tap point */}
          <motion.div
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-pink to-lavender shadow-lg"
            animate={{
              scale: isTapping ? [1, 0.85, 1] : 1,
            }}
            transition={{ duration: 0.4, ease: EASE_SMOOTH }}
          />
        </motion.div>

        {/* Ripple effect on tap */}
        {isTapping && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border border-pink/60"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.8, ease: EASE_SMOOTH }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-lavender/40"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1, ease: EASE_SMOOTH, delay: 0.1 }}
            />
          </>
        )}

        {/* Label */}
        <motion.span
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs md:text-sm font-medium text-muted-foreground whitespace-nowrap"
          animate={{ opacity: showTap ? 0.8 : 0 }}
          transition={{ duration: 0.3 }}
        >
          One click
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

// Brand/Logo node
const BrandNode = ({ phase }: { phase: Phase }) => {
  const showBrand = phase === "brand" || phase === "website" || phase === "growth" || phase === "complete";
  const isActive = phase === "brand";

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: showBrand ? 1 : 0,
        scale: showBrand ? 1 : 0.9,
      }}
      transition={{ duration: 0.7, ease: EASE_SMOOTH }}
    >
      <motion.div
        animate={{
          y: showBrand ? [0, -4, 0] : 0,
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: EASE_GENTLE,
          delay: 0.3,
        }}
      >
        {/* Brand circle */}
        <motion.div
          className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-pink via-lavender to-purple shadow-lg flex items-center justify-center"
          animate={{
            boxShadow: isActive 
              ? "0 0 40px 8px hsl(var(--pink) / 0.3)"
              : "0 8px 30px -8px hsl(var(--pink) / 0.2)",
          }}
          transition={{ duration: 0.8, ease: EASE_SMOOTH }}
        >
          {/* Abstract logo shape */}
          <motion.div
            className="w-8 h-8 md:w-10 md:h-10"
            initial={{ rotate: -30, opacity: 0 }}
            animate={{
              rotate: showBrand ? 0 : -30,
              opacity: showBrand ? 1 : 0,
            }}
            transition={{ duration: 0.6, ease: EASE_SMOOTH, delay: 0.2 }}
          >
            <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
              <motion.path
                d="M20 4L4 20L20 36L36 20L20 4Z"
                stroke="white"
                strokeWidth="2"
                fill="white"
                fillOpacity="0.2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: showBrand ? 1 : 0 }}
                transition={{ duration: 0.8, ease: EASE_SMOOTH }}
              />
              <circle cx="20" cy="20" r="6" fill="white" fillOpacity="0.8" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Label */}
        <motion.span
          className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs font-medium text-foreground/70 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          Brand
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

// Website wireframe elements
const WebsiteElements = ({ phase }: { phase: Phase }) => {
  const showWebsite = phase === "website" || phase === "growth" || phase === "complete";
  const isBuilding = phase === "website";

  const elements = [
    { id: "header", x: -80, y: -60, w: 100, h: 12, delay: 0 },
    { id: "hero", x: -80, y: -40, w: 100, h: 30, delay: 0.1 },
    { id: "card1", x: -80, y: 0, w: 45, h: 25, delay: 0.2 },
    { id: "card2", x: -25, y: 0, w: 45, h: 25, delay: 0.3 },
    { id: "footer", x: -80, y: 35, w: 100, h: 10, delay: 0.4 },
  ];

  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{ x: "60px", y: "-60px" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: showWebsite ? 1 : 0 }}
      transition={{ duration: 0.5, ease: EASE_SMOOTH }}
    >
      {/* Website container */}
      <motion.div
        className="relative"
        animate={{
          y: showWebsite ? [0, -3, 0] : 0,
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: EASE_GENTLE,
          delay: 0.5,
        }}
      >
        {/* Browser frame */}
        <motion.div
          className="w-[120px] h-[90px] rounded-lg border border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden shadow-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{
            scale: showWebsite ? 1 : 0.9,
            opacity: showWebsite ? 1 : 0,
          }}
          transition={{ duration: 0.6, ease: EASE_SMOOTH }}
        >
          {/* Browser dots */}
          <div className="flex gap-1 p-2 border-b border-border/40">
            <div className="w-1.5 h-1.5 rounded-full bg-pink/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-lavender/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-purple/60" />
          </div>

          {/* Content blocks */}
          <div className="p-2 space-y-1.5">
            {elements.map((el) => (
              <motion.div
                key={el.id}
                className={`rounded-sm ${el.id === "hero" ? "bg-gradient-to-r from-pink/30 to-lavender/30" : "bg-muted/60"}`}
                style={{ height: el.h * 0.4, width: el.w + "%" }}
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: showWebsite ? 1 : 0,
                  x: showWebsite ? 0 : -10,
                }}
                transition={{
                  duration: 0.5,
                  ease: EASE_SMOOTH,
                  delay: el.delay + 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Label */}
        <motion.span
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-foreground/70 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: isBuilding ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          Website
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

// Growth indicators
const GrowthIndicators = ({ phase, isMobile }: { phase: Phase; isMobile: boolean }) => {
  const showGrowth = phase === "growth" || phase === "complete";
  const isGrowing = phase === "growth";

  return (
    <motion.div
      className="absolute"
      style={{
        top: isMobile ? "60%" : "65%",
        left: isMobile ? "50%" : "35%",
        x: isMobile ? "-50%" : "0",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: showGrowth ? 1 : 0 }}
      transition={{ duration: 0.5, ease: EASE_SMOOTH }}
    >
      <motion.div
        animate={{
          y: showGrowth ? [0, -3, 0] : 0,
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: EASE_GENTLE,
          delay: 0.7,
        }}
      >
        {/* Growth chart */}
        <svg 
          width={isMobile ? "100" : "120"} 
          height={isMobile ? "50" : "60"} 
          viewBox="0 0 120 60" 
          className="overflow-visible"
        >
          {/* Grid lines */}
          {[0, 15, 30, 45].map((y, i) => (
            <motion.line
              key={i}
              x1="0"
              y1={y}
              x2="120"
              y2={y}
              stroke="hsl(var(--border))"
              strokeWidth="0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: showGrowth ? 0.3 : 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            />
          ))}

          {/* Growth line */}
          <motion.path
            d="M0 50 Q30 45 50 35 T80 20 T120 5"
            stroke="url(#growthGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: showGrowth ? 1 : 0,
              opacity: showGrowth ? 1 : 0,
            }}
            transition={{ duration: 1, ease: EASE_SMOOTH }}
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="growthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--pink))" />
              <stop offset="50%" stopColor="hsl(var(--lavender))" />
              <stop offset="100%" stopColor="hsl(var(--purple))" />
            </linearGradient>
          </defs>

          {/* Data points */}
          {[
            { x: 0, y: 50, delay: 0.3 },
            { x: 40, y: 38, delay: 0.5 },
            { x: 80, y: 20, delay: 0.7 },
            { x: 120, y: 5, delay: 0.9 },
          ].map((point, i) => (
            <motion.circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="hsl(var(--pink))"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: showGrowth ? 1 : 0,
                opacity: showGrowth ? 1 : 0,
              }}
              transition={{ delay: point.delay, duration: 0.4, ease: EASE_SMOOTH }}
            />
          ))}
        </svg>

        {/* Label */}
        <motion.span
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-medium text-foreground/70 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: isGrowing ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          Growth
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

// Ambient floating particles
const AmbientParticles = ({ phase }: { phase: Phase }) => {
  const showParticles = phase === "complete";

  const particles = [
    { x: -100, y: -80, size: 4, delay: 0 },
    { x: 100, y: -60, size: 3, delay: 0.2 },
    { x: -80, y: 60, size: 5, delay: 0.4 },
    { x: 120, y: 40, size: 3, delay: 0.6 },
    { x: -60, y: -20, size: 4, delay: 0.8 },
    { x: 80, y: 80, size: 4, delay: 1 },
  ];

  return (
    <>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 rounded-full bg-gradient-to-br from-pink/40 to-lavender/40"
          style={{
            width: p.size,
            height: p.size,
            x: p.x,
            y: p.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: showParticles ? [0.3, 0.6, 0.3] : 0,
            scale: showParticles ? 1 : 0,
            y: showParticles ? [p.y, p.y - 8, p.y] : p.y,
          }}
          transition={{
            opacity: { duration: 3, repeat: Infinity, ease: EASE_GENTLE },
            scale: { duration: 0.5, ease: EASE_SMOOTH, delay: p.delay },
            y: { duration: 4 + i * 0.5, repeat: Infinity, ease: EASE_GENTLE },
          }}
        />
      ))}
    </>
  );
};

// Static fallback for reduced motion
const StaticHeroVisual = () => (
  <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
    <div className="flex items-center gap-8">
      {/* Brand */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink via-lavender to-purple shadow-lg flex items-center justify-center">
        <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
          <path d="M20 4L4 20L20 36L36 20L20 4Z" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.2" />
          <circle cx="20" cy="20" r="6" fill="white" fillOpacity="0.8" />
        </svg>
      </div>
      {/* Arrow */}
      <div className="text-muted-foreground">→</div>
      {/* Growth */}
      <svg width="80" height="40" viewBox="0 0 80 40">
        <path d="M0 35 Q20 30 35 22 T55 12 T80 3" stroke="url(#staticGrowth)" strokeWidth="3" fill="none" />
        <defs>
          <linearGradient id="staticGrowth" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--pink))" />
            <stop offset="100%" stopColor="hsl(var(--purple))" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
);

export default HeroAnimation;
