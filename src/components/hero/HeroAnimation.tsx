import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Palette, 
  Globe, 
  Smartphone, 
  Search, 
  TrendingUp, 
  BarChart3, 
  Mail, 
  Share2,
  Megaphone,
  PenTool,
  Layout,
  Zap
} from "lucide-react";

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
    <div className="relative w-full h-full min-h-[480px] md:min-h-[580px] flex items-center justify-center">
      {/* Background system */}
      <BackgroundSystem phase={phase} isMobile={isMobile} />
      
      {/* Main composition - 70% of hero space */}
      <div className={`relative ${isMobile ? 'w-[360px] h-[420px]' : 'w-[700px] h-[560px]'}`}>
        
        {/* Central Brand Core */}
        <BrandCore phase={phase} isMobile={isMobile} />
        
        {/* Primary Services - Grid aligned */}
        <WebsiteCard phase={phase} isMobile={isMobile} />
        <AppCard phase={phase} isMobile={isMobile} />
        
        {/* Service Labels with Icons - Positioned on grid */}
        <ServiceLabel 
          icon={Palette} 
          label="Branding" 
          phase={phase} 
          isMobile={isMobile}
          position={isMobile ? { x: -130, y: -160 } : { x: -280, y: -200 }}
          finalPosition={isMobile ? { x: -130, y: -140 } : { x: -260, y: -170 }}
          delay={0}
        />
        <ServiceLabel 
          icon={PenTool} 
          label="Logo Design" 
          phase={phase} 
          isMobile={isMobile}
          position={isMobile ? { x: 70, y: -165 } : { x: 150, y: -210 }}
          finalPosition={isMobile ? { x: 75, y: -145 } : { x: 170, y: -175 }}
          delay={0.12}
        />
        <ServiceLabel 
          icon={Layout} 
          label="UX/UI" 
          phase={phase} 
          isMobile={isMobile}
          position={isMobile ? { x: -145, y: -60 } : { x: -300, y: -70 }}
          finalPosition={isMobile ? { x: -135, y: -45 } : { x: -275, y: -50 }}
          delay={0.24}
        />
        <ServiceLabel 
          icon={Search} 
          label="SEO" 
          phase={phase} 
          isMobile={isMobile}
          position={isMobile ? { x: 115, y: -70 } : { x: 260, y: -80 }}
          finalPosition={isMobile ? { x: 120, y: -50 } : { x: 275, y: -55 }}
          delay={0.36}
        />
        <ServiceLabel 
          icon={Megaphone} 
          label="Marketing" 
          phase={phase} 
          isMobile={isMobile}
          position={isMobile ? { x: -140, y: 50 } : { x: -290, y: 70 }}
          finalPosition={isMobile ? { x: -130, y: 65 } : { x: -265, y: 85 }}
          delay={0.48}
        />
        <ServiceLabel 
          icon={BarChart3} 
          label="Analytics" 
          phase={phase} 
          isMobile={isMobile}
          position={isMobile ? { x: 110, y: 55 } : { x: 255, y: 75 }}
          finalPosition={isMobile ? { x: 115, y: 70 } : { x: 265, y: 90 }}
          delay={0.6}
        />
        <ServiceLabel 
          icon={TrendingUp} 
          label="Growth" 
          phase={phase} 
          isMobile={isMobile}
          position={isMobile ? { x: -120, y: 130 } : { x: -250, y: 175 }}
          finalPosition={isMobile ? { x: -115, y: 145 } : { x: -235, y: 190 }}
          delay={0.72}
        />
        <ServiceLabel 
          icon={Share2} 
          label="Social" 
          phase={phase} 
          isMobile={isMobile}
          position={isMobile ? { x: 100, y: 135 } : { x: 230, y: 180 }}
          finalPosition={isMobile ? { x: 105, y: 150 } : { x: 240, y: 195 }}
          delay={0.84}
        />
        
        {/* Growth Chart */}
        <GrowthChart phase={phase} isMobile={isMobile} />
        
        {/* Central Tagline */}
        <CentralTagline phase={phase} isMobile={isMobile} />
        
        {/* Connector Lines */}
        <ConnectorLines phase={phase} isMobile={isMobile} />
      </div>
    </div>
  );
};

// Background grid and ambient effects
const BackgroundSystem = ({ phase, isMobile }: { phase: Phase; isMobile: boolean }) => {
  const showSystem = phase !== "distributed";
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ 
          opacity: phase === "living" ? 0.7 : 0.4,
          scale: phase === "living" ? 1.1 : 1,
        }}
        transition={{ duration: 1.2, ease: EASE_FLOAT }}
      >
        <div className={`${isMobile ? 'w-[400px] h-[400px]' : 'w-[700px] h-[700px]'} bg-gradient-radial from-pink/15 via-lavender/10 to-transparent rounded-full blur-3xl`} />
      </motion.div>
      
      {/* Dot grid */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.08 }}>
        <defs>
          <pattern id="heroGrid" width={isMobile ? 30 : 40} height={isMobile ? 30 : 40} patternUnits="userSpaceOnUse">
            <circle cx={isMobile ? 15 : 20} cy={isMobile ? 15 : 20} r="1.5" fill="hsl(var(--foreground))" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#heroGrid)" />
      </svg>
      
      {/* Orbital rings */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: showSystem ? 0.15 : 0,
          scale: showSystem ? 1 : 0.8,
        }}
        transition={{ duration: 0.8, ease: EASE_SMOOTH }}
      >
        <div className={`${isMobile ? 'w-[280px] h-[280px]' : 'w-[480px] h-[480px]'} rounded-full border border-dashed border-lavender/30`} />
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: showSystem ? 0.1 : 0,
          scale: showSystem ? 1 : 0.8,
        }}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE_SMOOTH }}
      >
        <div className={`${isMobile ? 'w-[340px] h-[340px]' : 'w-[600px] h-[600px]'} rounded-full border border-dashed border-purple/20`} />
      </motion.div>
    </div>
  );
};

// Connector lines from center to labels
const ConnectorLines = ({ phase, isMobile }: { phase: Phase; isMobile: boolean }) => {
  const showLines = phase === "revealed" || phase === "living";
  const containerSize = isMobile ? 360 : 700;
  const center = containerSize / 2;
  
  const connections = isMobile ? [
    { angle: -120, length: 100 },
    { angle: -60, length: 105 },
    { angle: -150, length: 90 },
    { angle: -30, length: 85 },
    { angle: 150, length: 85 },
    { angle: 30, length: 80 },
    { angle: 170, length: 95 },
    { angle: 10, length: 100 },
  ] : [
    { angle: -125, length: 180 },
    { angle: -55, length: 190 },
    { angle: -160, length: 150 },
    { angle: -20, length: 145 },
    { angle: 155, length: 150 },
    { angle: 25, length: 145 },
    { angle: 170, length: 170 },
    { angle: 10, length: 175 },
  ];

  return (
    <svg 
      className="absolute top-0 left-0 pointer-events-none"
      width={containerSize}
      height={containerSize}
      style={{ opacity: 0.25 }}
    >
      {connections.map((conn, i) => {
        const endX = center + Math.cos((conn.angle * Math.PI) / 180) * conn.length;
        const endY = center + Math.sin((conn.angle * Math.PI) / 180) * conn.length;
        
        return (
          <motion.line
            key={i}
            x1={center}
            y1={center}
            x2={endX}
            y2={endY}
            stroke="hsl(var(--lavender))"
            strokeWidth="1"
            strokeDasharray="4 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: showLines ? 1 : 0,
              opacity: showLines ? 1 : 0,
            }}
            transition={{ 
              duration: 0.6, 
              delay: 0.3 + i * 0.08,
              ease: EASE_SMOOTH 
            }}
          />
        );
      })}
    </svg>
  );
};

// Service label with icon
const ServiceLabel = ({ 
  icon: Icon, 
  label, 
  phase, 
  isMobile,
  position,
  finalPosition,
  delay,
}: { 
  icon: React.ComponentType<any>;
  label: string;
  phase: Phase;
  isMobile: boolean;
  position: { x: number; y: number };
  finalPosition: { x: number; y: number };
  delay: number;
}) => {
  const isDistributed = phase === "distributed";
  const isLiving = phase === "living";
  const showLabel = phase === "revealed" || isLiving;
  
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 z-10"
      initial={{ 
        x: position.x, 
        y: position.y, 
        opacity: 0.5,
        scale: 0.85,
      }}
      animate={{
        x: isDistributed ? position.x : finalPosition.x,
        y: isDistributed 
          ? [position.y - 4, position.y + 4, position.y - 4]
          : isLiving
            ? [finalPosition.y - 3, finalPosition.y + 3, finalPosition.y - 3]
            : finalPosition.y,
        opacity: showLabel ? 1 : isDistributed ? 0.5 : 0.7,
        scale: showLabel ? 1 : 0.85,
      }}
      transition={{
        x: { duration: 1, ease: EASE_SMOOTH },
        y: (isDistributed || isLiving)
          ? { duration: isDistributed ? 3.5 + delay : 4.5, repeat: Infinity, ease: EASE_FLOAT }
          : { duration: 1, ease: EASE_SMOOTH },
        opacity: { duration: 0.5, delay: showLabel ? delay + 0.15 : 0, ease: EASE_SMOOTH },
        scale: { duration: 0.6, delay: showLabel ? delay + 0.1 : 0, ease: EASE_SMOOTH },
      }}
    >
      <div className={`
        flex items-center gap-1.5 
        ${isMobile ? 'px-2 py-1' : 'px-3 py-1.5'} 
        rounded-full 
        bg-card/95 
        border border-border/60 
        shadow-md
        backdrop-blur-sm
      `}>
        <Icon size={isMobile ? 12 : 14} className="text-pink" />
        <span className={`
          ${isMobile ? 'text-[10px]' : 'text-xs'} 
          font-semibold 
          text-foreground
          tracking-wide
        `}>
          {label}
        </span>
      </div>
      
      {/* Anchor dot */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ 
          x: position.x > 0 ? -((isMobile ? 40 : 50) + (label.length * (isMobile ? 4 : 5))) / 2 - 8 : ((isMobile ? 40 : 50) + (label.length * (isMobile ? 4 : 5))) / 2 + 8,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: showLabel ? 1 : 0,
          opacity: showLabel ? 0.6 : 0,
        }}
        transition={{ duration: 0.4, delay: delay + 0.2, ease: EASE_SMOOTH }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-lavender" />
      </motion.div>
    </motion.div>
  );
};

// Central brand core - scales to 1.12x
const BrandCore = ({ phase, isMobile }: { phase: Phase; isMobile: boolean }) => {
  const isActive = phase !== "distributed";
  const isRevealed = phase === "revealed" || phase === "living";
  const isLiving = phase === "living";
  const size = isMobile ? 85 : 120;

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 z-20"
      initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
      animate={{
        scale: isActive ? (isRevealed ? 1.12 : 1) : 0,
        opacity: isActive ? 1 : 0,
        x: "-50%",
        y: isLiving ? ["-50%", "-52%", "-50%"] : "-50%",
      }}
      transition={{
        scale: { duration: 0.9, ease: EASE_SMOOTH },
        opacity: { duration: 0.6, ease: EASE_SMOOTH },
        y: isLiving ? { duration: 4.5, repeat: Infinity, ease: EASE_FLOAT } : { duration: 0 },
      }}
    >
      <div 
        className="rounded-2xl bg-gradient-to-br from-pink via-lavender to-purple shadow-2xl flex items-center justify-center relative overflow-hidden"
        style={{ width: size, height: size }}
      >
        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent" />
        
        {/* Shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: phase === "orchestrating" ? "100%" : "-100%" }}
          transition={{ duration: 0.9, ease: EASE_SMOOTH, delay: 0.2 }}
        />
        
        {/* Logo */}
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
        
        {/* Pulse ring */}
        {isLiving && (
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-white/30"
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: EASE_FLOAT }}
          />
        )}
      </div>
    </motion.div>
  );
};

// Website card
const WebsiteCard = ({ phase, isMobile }: { phase: Phase; isMobile: boolean }) => {
  const isDistributed = phase === "distributed";
  const isRevealed = phase === "revealed" || phase === "living";
  const isLiving = phase === "living";
  
  const distributed = isMobile 
    ? { x: -70, y: -90, rotate: -8 }
    : { x: -170, y: -110, rotate: -6 };
  
  const final = isMobile
    ? { x: -75, y: -25, rotate: 0 }
    : { x: -145, y: -35, rotate: 0 };

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 z-15"
      initial={{ ...distributed, opacity: 0.6 }}
      animate={{
        x: isDistributed ? distributed.x : final.x,
        y: isDistributed 
          ? [distributed.y - 5, distributed.y + 5, distributed.y - 5]
          : isLiving 
            ? [final.y - 4, final.y + 4, final.y - 4]
            : final.y,
        rotate: isDistributed ? distributed.rotate : final.rotate,
        opacity: 1,
        scale: isRevealed ? 1.05 : 0.95,
      }}
      transition={{
        x: { duration: 1, ease: EASE_SMOOTH },
        y: (isDistributed || isLiving) 
          ? { duration: isDistributed ? 4 : 5.2, repeat: Infinity, ease: EASE_FLOAT }
          : { duration: 1, ease: EASE_SMOOTH },
        rotate: { duration: 1, ease: EASE_SMOOTH },
        scale: { duration: 0.8, ease: EASE_SMOOTH },
      }}
    >
      {/* Label above */}
      <motion.div
        className={`absolute ${isMobile ? '-top-6' : '-top-7'} left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-card/90 border border-border/50 shadow-sm`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 8 }}
        transition={{ duration: 0.5, delay: 0.3, ease: EASE_SMOOTH }}
      >
        <Globe size={isMobile ? 10 : 12} className="text-lavender" />
        <span className={`${isMobile ? 'text-[9px]' : 'text-[11px]'} font-semibold text-foreground`}>Website</span>
      </motion.div>
      
      <div className={`${isMobile ? 'w-[110px] h-[80px]' : 'w-[150px] h-[105px]'} rounded-xl border border-border/70 bg-card/95 backdrop-blur-sm overflow-hidden shadow-xl`}>
        {/* Browser bar */}
        <div className="flex items-center gap-1.5 px-2 py-1.5 border-b border-border/50 bg-muted/50">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-pink/80" />
            <div className="w-2 h-2 rounded-full bg-lavender/80" />
            <div className="w-2 h-2 rounded-full bg-purple/80" />
          </div>
          <div className="flex-1 h-3 bg-muted/70 rounded-sm mx-1" />
        </div>
        {/* Content */}
        <div className="p-2 space-y-1.5">
          <div className="h-3 bg-gradient-to-r from-pink/25 to-lavender/25 rounded-sm" />
          <div className="flex gap-1">
            <div className="flex-1 h-6 bg-muted/60 rounded-sm" />
            <div className="flex-1 h-6 bg-muted/60 rounded-sm" />
          </div>
          <div className="h-1.5 w-3/4 bg-muted/40 rounded-sm" />
        </div>
        
        {/* Live scroll indicator */}
        {isLiving && (
          <motion.div
            className="absolute right-1 top-7 w-1 h-5 bg-muted/40 rounded-full overflow-hidden"
          >
            <motion.div
              className="w-full h-2 bg-lavender/60 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: EASE_FLOAT }}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// App card
const AppCard = ({ phase, isMobile }: { phase: Phase; isMobile: boolean }) => {
  const isDistributed = phase === "distributed";
  const isRevealed = phase === "revealed" || phase === "living";
  const isLiving = phase === "living";
  
  const distributed = isMobile
    ? { x: 60, y: -85, rotate: 10 }
    : { x: 140, y: -100, rotate: 8 };
  
  const final = isMobile
    ? { x: 55, y: -20, rotate: 0 }
    : { x: 100, y: -30, rotate: 0 };

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 z-15"
      initial={{ ...distributed, opacity: 0.6 }}
      animate={{
        x: isDistributed ? distributed.x : final.x,
        y: isDistributed
          ? [distributed.y + 4, distributed.y - 4, distributed.y + 4]
          : isLiving
            ? [final.y - 3, final.y + 3, final.y - 3]
            : final.y,
        rotate: isDistributed ? distributed.rotate : final.rotate,
        opacity: 1,
        scale: isRevealed ? 1.05 : 0.95,
      }}
      transition={{
        x: { duration: 1, ease: EASE_SMOOTH },
        y: (isDistributed || isLiving)
          ? { duration: isDistributed ? 3.8 : 4.8, repeat: Infinity, ease: EASE_FLOAT }
          : { duration: 1, ease: EASE_SMOOTH },
        rotate: { duration: 1, ease: EASE_SMOOTH },
        scale: { duration: 0.8, ease: EASE_SMOOTH },
      }}
    >
      {/* Label above */}
      <motion.div
        className={`absolute ${isMobile ? '-top-6' : '-top-7'} left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-card/90 border border-border/50 shadow-sm`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 8 }}
        transition={{ duration: 0.5, delay: 0.35, ease: EASE_SMOOTH }}
      >
        <Smartphone size={isMobile ? 10 : 12} className="text-pink" />
        <span className={`${isMobile ? 'text-[9px]' : 'text-[11px]'} font-semibold text-foreground`}>App</span>
      </motion.div>
      
      <div className={`${isMobile ? 'w-[48px] h-[75px]' : 'w-[58px] h-[95px]'} rounded-xl border border-border/70 bg-card/95 backdrop-blur-sm overflow-hidden shadow-lg`}>
        {/* Notch */}
        <div className="flex justify-center pt-1">
          <div className={`${isMobile ? 'w-6 h-1' : 'w-8 h-1'} bg-muted/70 rounded-full`} />
        </div>
        {/* Content */}
        <div className="p-1.5 space-y-1 mt-1">
          <div className="h-5 bg-gradient-to-br from-pink/25 to-lavender/25 rounded-md" />
          <div className="h-1 w-full bg-muted/50 rounded-sm" />
          <div className="h-1 w-2/3 bg-muted/40 rounded-sm" />
          <div className="flex gap-0.5 mt-1">
            <div className="flex-1 h-3 bg-muted/50 rounded-sm" />
            <div className="flex-1 h-3 bg-muted/50 rounded-sm" />
          </div>
        </div>
        {/* Bottom nav */}
        <div className="absolute bottom-1 left-1 right-1 h-2 bg-muted/40 rounded-sm flex justify-around items-center">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-1 h-1 rounded-full bg-muted-foreground/40" />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Growth chart
const GrowthChart = ({ phase, isMobile }: { phase: Phase; isMobile: boolean }) => {
  const isDistributed = phase === "distributed";
  const isRevealed = phase === "revealed" || phase === "living";
  const isLiving = phase === "living";
  
  const distributed = isMobile
    ? { x: 75, y: 75, rotate: 6 }
    : { x: 160, y: 100, rotate: 5 };
  
  const final = isMobile
    ? { x: 60, y: 55, rotate: 0 }
    : { x: 120, y: 70, rotate: 0 };

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 z-10"
      initial={{ x: distributed.x, y: distributed.y, rotate: distributed.rotate, opacity: 0.5 }}
      animate={{
        x: isDistributed ? distributed.x : final.x,
        y: isDistributed
          ? [distributed.y + 5, distributed.y - 5, distributed.y + 5]
          : isLiving
            ? [final.y - 3, final.y + 3, final.y - 3]
            : final.y,
        rotate: isDistributed ? distributed.rotate : final.rotate,
        opacity: isRevealed ? 1 : isDistributed ? 0.5 : 0.7,
        scale: isRevealed ? 1.05 : 0.9,
      }}
      transition={{
        x: { duration: 1, ease: EASE_SMOOTH },
        y: (isDistributed || isLiving)
          ? { duration: isDistributed ? 4.2 : 5, repeat: Infinity, ease: EASE_FLOAT }
          : { duration: 1, ease: EASE_SMOOTH },
        rotate: { duration: 1, ease: EASE_SMOOTH },
        opacity: { duration: 0.6, ease: EASE_SMOOTH },
        scale: { duration: 0.8, ease: EASE_SMOOTH },
      }}
    >
      <div className={`${isMobile ? 'p-2' : 'p-2.5'} rounded-lg bg-card/95 border border-border/60 shadow-lg backdrop-blur-sm`}>
        <svg 
          viewBox="0 0 70 40" 
          className={isMobile ? "w-[60px] h-[34px]" : "w-[80px] h-[45px]"}
        >
          {/* Grid lines */}
          {[10, 20, 30].map((y, i) => (
            <line key={i} x1="0" y1={y} x2="70" y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.5" />
          ))}
          
          {/* Growth line */}
          <motion.path
            d="M4 34 Q18 30 30 22 T50 12 T66 5"
            stroke="url(#growthGradient)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isRevealed ? 1 : 0 }}
            transition={{ duration: 1, ease: EASE_SMOOTH, delay: 0.4 }}
          />
          
          <defs>
            <linearGradient id="growthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--pink))" />
              <stop offset="50%" stopColor="hsl(var(--lavender))" />
              <stop offset="100%" stopColor="hsl(var(--purple))" />
            </linearGradient>
          </defs>
          
          {/* End point */}
          <motion.circle
            cx="66" cy="5" r="4"
            fill="hsl(var(--pink))"
            initial={{ scale: 0 }}
            animate={{ 
              scale: isRevealed ? 1 : 0,
              r: isLiving ? [4, 5, 4] : 4,
            }}
            transition={{ 
              scale: { duration: 0.5, ease: EASE_SMOOTH, delay: 0.7 },
              r: { duration: 2, repeat: Infinity, ease: EASE_FLOAT },
            }}
          />
        </svg>
        
        {/* Growth indicator */}
        <motion.div
          className="flex items-center justify-center gap-1 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: isRevealed ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Zap size={isMobile ? 8 : 10} className="text-emerald-500" />
          <span className={`${isMobile ? 'text-[8px]' : 'text-[10px]'} font-bold text-emerald-500`}>+127%</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Central tagline
const CentralTagline = ({ phase, isMobile }: { phase: Phase; isMobile: boolean }) => {
  const show = phase === "revealed" || phase === "living";
  const isLiving = phase === "living";

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 z-25 pointer-events-none"
      style={{ x: "-50%" }}
      initial={{ opacity: 0, y: isMobile ? 85 : 110 }}
      animate={{
        opacity: show ? 1 : 0,
        y: show 
          ? (isLiving ? [isMobile ? 80 : 105, isMobile ? 78 : 102, isMobile ? 80 : 105] : (isMobile ? 80 : 105))
          : (isMobile ? 85 : 110),
      }}
      transition={{
        opacity: { duration: 0.6, delay: 0.5, ease: EASE_SMOOTH },
        y: isLiving 
          ? { duration: 4.5, repeat: Infinity, ease: EASE_FLOAT }
          : { duration: 0.6, delay: 0.5, ease: EASE_SMOOTH },
      }}
    >
      <div className="text-center px-4 py-2 rounded-xl bg-card/80 border border-border/50 backdrop-blur-sm shadow-lg">
        <div className={`${isMobile ? 'text-[11px]' : 'text-sm'} font-bold uppercase tracking-[0.15em] text-foreground`}>
          Design · Build · Scale
        </div>
        <div className={`${isMobile ? 'text-[9px]' : 'text-[11px]'} text-muted-foreground mt-0.5`}>
          End-to-End Digital Execution
        </div>
      </div>
    </motion.div>
  );
};

// Static stable state
const StableState = ({ isMobile }: { isMobile: boolean }) => (
  <div className="relative w-full h-full min-h-[480px] flex items-center justify-center">
    <div className={`relative ${isMobile ? 'w-[340px] h-[400px]' : 'w-[640px] h-[520px]'}`}>
      {/* Background grid */}
      <div className="absolute inset-0 opacity-8">
        <svg className="w-full h-full">
          <defs>
            <pattern id="staticGrid" width="35" height="35" patternUnits="userSpaceOnUse">
              <circle cx="17.5" cy="17.5" r="1.5" fill="hsl(var(--foreground))" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#staticGrid)" />
        </svg>
      </div>
      
      {/* Orbital ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className={`${isMobile ? 'w-[260px] h-[260px]' : 'w-[450px] h-[450px]'} rounded-full border border-dashed border-lavender/20`} />
      </div>
      
      {/* Central brand */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className={`${isMobile ? 'w-[85px] h-[85px]' : 'w-[120px] h-[120px]'} rounded-2xl bg-gradient-to-br from-pink via-lavender to-purple shadow-2xl flex items-center justify-center`} style={{ transform: 'scale(1.12)' }}>
          <svg viewBox="0 0 60 60" className={isMobile ? "w-10 h-10" : "w-14 h-14"}>
            <path d="M30 8L8 30L30 52L52 30L30 8Z" stroke="white" strokeWidth="2.5" fill="white" fillOpacity="0.2" />
            <circle cx="30" cy="30" r="7" fill="white" />
          </svg>
        </div>
      </div>
      
      {/* Service labels */}
      {[
        { icon: Palette, label: "Branding", x: isMobile ? -110 : -220, y: isMobile ? -120 : -150 },
        { icon: Globe, label: "Website", x: isMobile ? -80 : -150, y: isMobile ? -20 : -25 },
        { icon: Smartphone, label: "App", x: isMobile ? 50 : 95, y: isMobile ? -15 : -20 },
        { icon: Search, label: "SEO", x: isMobile ? 90 : 200, y: isMobile ? -100 : -130 },
        { icon: BarChart3, label: "Analytics", x: isMobile ? 85 : 180, y: isMobile ? 60 : 80 },
        { icon: TrendingUp, label: "Growth", x: isMobile ? -90 : -180, y: isMobile ? 100 : 130 },
      ].map(({ icon: Icon, label, x, y }) => (
        <div 
          key={label}
          className="absolute top-1/2 left-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card/95 border border-border/60 shadow-md"
          style={{ transform: `translate(${x}px, ${y}px)` }}
        >
          <Icon size={isMobile ? 11 : 13} className="text-pink" />
          <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-semibold text-foreground`}>{label}</span>
        </div>
      ))}
      
      {/* Tagline */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 text-center px-4 py-2 rounded-xl bg-card/80 border border-border/50 shadow-lg"
        style={{ transform: `translate(-50%, ${isMobile ? 90 : 120}px)` }}
      >
        <div className={`${isMobile ? 'text-[11px]' : 'text-sm'} font-bold uppercase tracking-[0.15em] text-foreground`}>
          Design · Build · Scale
        </div>
        <div className={`${isMobile ? 'text-[9px]' : 'text-[11px]'} text-muted-foreground mt-0.5`}>
          End-to-End Digital Execution
        </div>
      </div>
    </div>
  </div>
);

export default HeroAnimation;
