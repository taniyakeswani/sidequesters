import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import FounderCard from "./FounderCard";
import { founders } from "./founders-data";

type Slot = "left" | "center" | "right";

type MotionSlotConfig = {
  slot: Slot;
  delay: number;
  isCenter?: boolean;
  clusterX: string;
  finalX: string;
  midY: string;
  zIndex: number;
};

// MANDATORY easing / timing
const EASE_CLUSTER: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SEGREGATION_DURATION_S = 0.9;

export default function FoundersSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(sectionRef, { amount: 0.35, once: true });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView) setStarted(true);
  }, [inView]);

  const slots = useMemo<MotionSlotConfig[]>(() => {
    // Keep the unified cluster non-overlapping by design.
    // Cluster spacing: minimum ~24px between avatar bounding boxes (via x offsets).
    // Final spacing: equal columns with more air, clamped to viewport.
    // Tuned for lg+ only (we stack on md to avoid collisions).
    const CLUSTER_X = "232px";
    const FINAL_X = "clamp(360px, 28vw, 560px)";

    return [
      {
        slot: "left",
        delay: 0.08,
        clusterX: `calc(${CLUSTER_X} * -1)`,
        finalX: `calc(${FINAL_X} * -1)`,
        midY: "-22px",
        zIndex: 10,
      },
      {
        slot: "center",
        delay: 0,
        isCenter: true,
        clusterX: "0px",
        finalX: "0px",
        midY: "14px",
        zIndex: 20,
      },
      {
        slot: "right",
        delay: 0.16,
        clusterX: CLUSTER_X,
        finalX: FINAL_X,
        midY: "-18px",
        zIndex: 10,
      },
    ];
  }, []);

  if (prefersReducedMotion) {
    return (
      <section ref={sectionRef} className="py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet the Founders</h2>
          <p className="text-muted-foreground text-lg">The minds building SideQuesters</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-4">
          {founders.map((founder, i) => (
            <FounderCard
              key={founder.name}
              founder={founder}
              started
              nameDelay={0}
              isCenter={i === 1}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, ease: EASE_CLUSTER }}
      >
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Meet the Founders</h2>
          <p className="text-muted-foreground text-lg">The minds building SideQuesters</p>
        </div>

        {/* Desktop (lg+): unified system → segregates once (no scroll-scrub) */}
        <div className="hidden lg:block relative max-w-6xl mx-auto px-4">
          <div className="relative min-h-[560px]">
            {slots.map((cfg, idx) => {
              const founder = founders[idx];
              const clusterScale = cfg.isCenter ? 1.02 : 1;

              // Text begins only after avatar settles (+120ms)
              const nameDelay = cfg.delay + SEGREGATION_DURATION_S + 0.12;

              return (
                <motion.div
                  key={cfg.slot}
                  className="absolute left-1/2 top-0 -translate-x-1/2"
                  style={{ zIndex: cfg.zIndex, willChange: "transform" }}
                  initial={{ x: cfg.clusterX, y: "0px", scale: clusterScale }}
                  animate={
                    started
                      ? {
                          // Curved path (x moves out, y arcs, then settles)
                          x: [cfg.clusterX, cfg.finalX, cfg.finalX],
                          y: ["0px", cfg.midY, "0px"],
                          scale: [clusterScale, clusterScale, 1],
                        }
                      : { x: cfg.clusterX, y: "0px", scale: clusterScale }
                  }
                  transition={{
                    duration: SEGREGATION_DURATION_S,
                    ease: EASE_CLUSTER,
                    delay: cfg.delay,
                    times: [0, 0.72, 1],
                  }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <FounderCard
                    founder={founder}
                    started={started}
                    nameDelay={nameDelay}
                    isCenter={cfg.isCenter}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile/tablet (<lg): stacked cards (no overlap) */}
        <div className="lg:hidden px-4">
          <div className="flex flex-col items-center gap-12">
            {founders.map((founder, index) => {
              // Gentle stagger so it still feels intentional on mobile.
              const mobileDelay = 0.12 + index * 0.1;

              return (
                <motion.div
                  key={founder.name}
                  initial={{ opacity: 0, y: 18 }}
                  animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                  transition={{ duration: 0.5, ease: EASE_CLUSTER, delay: mobileDelay }}
                >
                  <FounderCard founder={founder} started={started} nameDelay={mobileDelay + 0.1} isCenter={index === 1} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
