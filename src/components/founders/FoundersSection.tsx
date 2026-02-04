import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import FounderCard from "./FounderCard";
import { founders } from "./founders-data";

// MANDATORY easings from spec
const EASE_SEGREGATION: [number, number, number, number] = [0.18, 0.9, 0.25, 1];
const EASE_FLOAT: [number, number, number, number] = [0.45, 0.05, 0.55, 0.95];

const SEGREGATION_DURATION_MS = 1200;
const SEGREGATION_DURATION_S = SEGREGATION_DURATION_MS / 1000;

// Slot configuration
type SlotConfig = {
  id: "left" | "center" | "right";
  delay: number; // stagger delay in seconds
  floatPhase: number; // phase offset for floating (0-1)
  clusterOffset: number; // initial X offset in cluster (px)
  finalOffset: number; // final X offset from center (px, 0 for center)
  isCenter?: boolean;
};

const slots: SlotConfig[] = [
  { id: "left", delay: 0.1, floatPhase: 0, clusterOffset: -80, finalOffset: 0, isCenter: false },
  { id: "center", delay: 0, floatPhase: 0.33, clusterOffset: 0, finalOffset: 0, isCenter: true },
  { id: "right", delay: 0.2, floatPhase: 0.66, clusterOffset: 80, finalOffset: 0, isCenter: false },
];

export default function FoundersSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(sectionRef, { amount: 0.45, once: true });
  const [animationStarted, setAnimationStarted] = useState(false);
  const [motionSettled, setMotionSettled] = useState(false);

  useEffect(() => {
    if (inView && !animationStarted) {
      setAnimationStarted(true);
      // Mark motion as settled after full segregation + last stagger
      const maxDelay = Math.max(...slots.map((s) => s.delay));
      const settleTime = (SEGREGATION_DURATION_S + maxDelay) * 1000 + 50;
      setTimeout(() => setMotionSettled(true), settleTime);
    }
  }, [inView, animationStarted]);

  // Reduced motion: static layout
  if (prefersReducedMotion) {
    return (
      <section ref={sectionRef} className="py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Meet the Founders
          </h2>
          <p className="text-muted-foreground text-lg">
            The minds building SideQuesters
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-8">
          {founders.map((founder, i) => (
            <FounderCard
              key={founder.name}
              founder={founder}
              motionSettled
              nameDelay={0}
              isCenter={i === 1}
              floatPhase={0}
              disableFloat
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-24">
      {/* Section fade-in */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={animationStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, ease: EASE_SEGREGATION }}
      >
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Meet the Founders
          </h2>
          <p className="text-muted-foreground text-lg">
            The minds building SideQuesters
          </p>
        </div>

        {/* Desktop (lg+): 3-column equidistant layout */}
        <div className="hidden lg:flex justify-between items-end max-w-6xl mx-auto px-8">
          {slots.map((cfg, idx) => {
            const founder = founders[idx];
            // Text starts only after motion settles + 150ms
            const nameDelay = motionSettled ? 0.15 : 999;

            return (
              <motion.div
                key={cfg.id}
                className="flex-1 flex justify-center"
                initial={{ opacity: 0, y: 40, x: cfg.clusterOffset }}
                animate={
                  animationStarted
                    ? { opacity: 1, y: 0, x: 0 }
                    : { opacity: 0, y: 40, x: cfg.clusterOffset }
                }
                transition={{
                  duration: SEGREGATION_DURATION_S,
                  ease: EASE_SEGREGATION,
                  delay: cfg.delay,
                  // Curved motion via spring-like easing (smooth arc feel)
                  x: { duration: SEGREGATION_DURATION_S, ease: EASE_SEGREGATION, delay: cfg.delay },
                  y: { duration: SEGREGATION_DURATION_S * 0.8, ease: EASE_SEGREGATION, delay: cfg.delay },
                }}
              >
                <FounderCard
                  founder={founder}
                  motionSettled={motionSettled}
                  nameDelay={nameDelay}
                  isCenter={cfg.isCenter}
                  floatPhase={cfg.floatPhase}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Mobile/tablet (<lg): stacked cards */}
        <div className="lg:hidden px-4">
          <div className="flex flex-col items-center gap-12">
            {founders.map((founder, index) => {
              const mobileDelay = 0.12 + index * 0.1;
              const mobileSettled = motionSettled;

              return (
                <motion.div
                  key={founder.name}
                  initial={{ opacity: 0, y: 24 }}
                  animate={animationStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.6, ease: EASE_SEGREGATION, delay: mobileDelay }}
                >
                  <FounderCard
                    founder={founder}
                    motionSettled={mobileSettled}
                    nameDelay={mobileSettled ? 0.15 : 999}
                    isCenter={index === 1}
                    floatPhase={index * 0.33}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
