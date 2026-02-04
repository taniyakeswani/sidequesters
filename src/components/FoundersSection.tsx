import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// Avatar imports
import avatarAastha from "@/assets/avatar-aastha.png";
import avatarTanya from "@/assets/avatar-tanya.png";
import avatarAarushi from "@/assets/avatar-aarushi.png";

const founders = [
  {
    name: "Aastha",
    superpower: "Clarity over complexity",
    description: "We simplify problems before solving them.",
    avatar: avatarAastha,
    position: "left" as const,
  },
  {
    name: "Tanya",
    superpower: "Built for scale",
    description: "Everything we ship is designed to grow with you.",
    avatar: avatarTanya,
    position: "center" as const,
  },
  {
    name: "Aarushi",
    superpower: "Partnership mindset",
    description: "We work with clients, not just for them.",
    avatar: avatarAarushi,
    position: "right" as const,
  },
];

const FoundersSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Animation phases based on scroll
  const headingOpacity = useTransform(scrollYProgress, [0.15, 0.22], [0, 1]);
  
  // Segregation animation (starts after heading appears)
  const segregation = useTransform(scrollYProgress, [0.22, 0.38], [0, 1]);
  
  // Avatar positions during segregation
  const leftAvatarX = useTransform(segregation, [0, 1], [0, -140]);
  const rightAvatarX = useTransform(segregation, [0, 1], [0, 140]);
  const centerAvatarScale = useTransform(segregation, [0, 0.5, 1], [1, 1.05, 1]);
  
  // Clustered state: overlapping positions
  const leftClusterX = useTransform(segregation, [0, 1], [40, 0]);
  const rightClusterX = useTransform(segregation, [0, 1], [-40, 0]);
  const leftClusterRotate = useTransform(segregation, [0, 1], [-8, 0]);
  const rightClusterRotate = useTransform(segregation, [0, 1], [8, 0]);
  
  // Z-index simulation through scale (center is always dominant)
  const leftAvatarScale = useTransform(segregation, [0, 1], [0.85, 1]);
  const rightAvatarScale = useTransform(segregation, [0, 1], [0.85, 1]);
  
  // Content reveal timing (staggered per founder)
  const leftContentReveal = useTransform(scrollYProgress, [0.38, 0.48], [0, 1]);
  const centerContentReveal = useTransform(scrollYProgress, [0.36, 0.46], [0, 1]);
  const rightContentReveal = useTransform(scrollYProgress, [0.40, 0.50], [0, 1]);
  
  // Floating animation for clustered state
  const floatY = useTransform(scrollYProgress, [0, 0.22], [0, 1]);
  const floatAnimation = useTransform(floatY, (v) => Math.sin(v * Math.PI * 4) * 4);

  if (prefersReducedMotion) {
    return (
      <section className="py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Meet the Founders
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
          {founders.map((founder) => (
            <FounderCardStatic key={founder.name} founder={founder} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-24 min-h-[150vh] relative">
      <div className="sticky top-16 md:top-24 pt-8">
        {/* Heading - Fade in only */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          style={{ opacity: headingOpacity }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Meet the Founders
          </h2>
        </motion.div>

        {/* Avatar Cluster / Founders Grid */}
        <div className="relative max-w-5xl mx-auto px-4">
          {/* Desktop: Horizontal layout */}
          <div className="hidden md:flex justify-center items-start gap-0 relative">
            {/* Left - Aastha (Blossom) */}
            <motion.div
              className="relative z-10"
              style={{
                x: useTransform(
                  [leftAvatarX, leftClusterX],
                  ([spread, cluster]) => (spread as number) + (cluster as number)
                ),
                scale: leftAvatarScale,
                rotate: leftClusterRotate,
                y: useTransform(segregation, (s) => s < 0.1 ? floatAnimation.get() : 0),
              }}
            >
              <FounderCard
                founder={founders[0]}
                contentReveal={leftContentReveal}
                segregation={segregation}
              />
            </motion.div>

            {/* Center - Tanya (Buttercup) - Dominant */}
            <motion.div
              className="relative z-20"
              style={{
                scale: centerAvatarScale,
                y: useTransform(segregation, (s) => s < 0.1 ? floatAnimation.get() - 2 : 0),
              }}
            >
              <FounderCard
                founder={founders[1]}
                contentReveal={centerContentReveal}
                segregation={segregation}
                isCenter
              />
            </motion.div>

            {/* Right - Aarushi (Bubbles) */}
            <motion.div
              className="relative z-10"
              style={{
                x: useTransform(
                  [rightAvatarX, rightClusterX],
                  ([spread, cluster]) => (spread as number) + (cluster as number)
                ),
                scale: rightAvatarScale,
                rotate: rightClusterRotate,
                y: useTransform(segregation, (s) => s < 0.1 ? floatAnimation.get() + 1 : 0),
              }}
            >
              <FounderCard
                founder={founders[2]}
                contentReveal={rightContentReveal}
                segregation={segregation}
              />
            </motion.div>
          </div>

          {/* Mobile: Vertical stack */}
          <div className="flex md:hidden flex-col items-center gap-8">
            {/* Mobile cluster state */}
            <motion.div
              className="relative flex justify-center items-center h-32"
              style={{
                opacity: useTransform(segregation, [0, 0.3], [1, 0]),
                scale: useTransform(segregation, [0, 0.3], [1, 0.8]),
              }}
            >
              <motion.img
                src={avatarAastha}
                alt="Aastha"
                className="w-20 h-20 rounded-full object-cover absolute border-2 border-background shadow-lg"
                style={{ left: -20, rotate: -8 }}
              />
              <motion.img
                src={avatarTanya}
                alt="Tanya"
                className="w-24 h-24 rounded-full object-cover absolute z-10 border-2 border-background shadow-xl"
              />
              <motion.img
                src={avatarAarushi}
                alt="Aarushi"
                className="w-20 h-20 rounded-full object-cover absolute border-2 border-background shadow-lg"
                style={{ right: -20, rotate: 8 }}
              />
            </motion.div>

            {/* Mobile individual cards */}
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                style={{
                  opacity: useTransform(
                    scrollYProgress,
                    [0.3 + index * 0.08, 0.38 + index * 0.08],
                    [0, 1]
                  ),
                  y: useTransform(
                    scrollYProgress,
                    [0.3 + index * 0.08, 0.38 + index * 0.08],
                    [40, 0]
                  ),
                }}
              >
                <FounderCardMobile founder={founder} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface FounderCardProps {
  founder: typeof founders[0];
  contentReveal: ReturnType<typeof useTransform<number, number>>;
  segregation: ReturnType<typeof useTransform<number, number>>;
  isCenter?: boolean;
}

const FounderCard = ({ founder, contentReveal, segregation, isCenter }: FounderCardProps) => {
  // Individual content animations
  const nameOpacity = useTransform(contentReveal, [0, 0.3], [0, 1]);
  const superpowerProgress = useTransform(contentReveal, [0.2, 0.6], [0, 1]);
  const superpowerClip = useTransform(superpowerProgress, (p) => `inset(0 ${100 - p * 100}% 0 0)`);
  const descriptionOpacity = useTransform(contentReveal, [0.5, 1], [0, 1]);
  const descriptionY = useTransform(contentReveal, [0.5, 1], [12, 0]);
  
  // Card width expands after segregation
  const cardWidth = useTransform(segregation, [0.8, 1], [120, 280]);

  return (
    <motion.div
      className={`flex flex-col items-center ${isCenter ? 'mx-4' : 'mx-2'}`}
      style={{ width: cardWidth }}
    >
      {/* Avatar */}
      <motion.div
        className={`relative mb-6 ${isCenter ? 'w-28 h-28 md:w-32 md:h-32' : 'w-24 h-24 md:w-28 md:h-28'}`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="absolute -inset-2 bg-gradient-to-br from-pink/30 via-lavender/30 to-purple/30 rounded-full blur-lg opacity-60" />
        <img
          src={founder.avatar}
          alt={founder.name}
          className="relative w-full h-full rounded-full object-cover border-4 border-background shadow-xl"
        />
      </motion.div>

      {/* Name - Fade in only */}
      <motion.h3
        className="text-xl md:text-2xl font-semibold text-foreground text-center mb-3"
        style={{ opacity: nameOpacity }}
      >
        {founder.name}
      </motion.h3>

      {/* Superpower - Masked reveal */}
      <motion.div
        className="text-center mb-4 overflow-hidden"
        style={{ opacity: useTransform(contentReveal, [0.2, 0.4], [0, 1]) }}
      >
        <div className="inline-block px-4 py-2 rounded-full bg-secondary/80 relative overflow-hidden group/badge">
          <motion.span
            className="text-sm block"
            style={{ clipPath: superpowerClip }}
          >
            <span className="font-normal text-muted-foreground">Superpower: </span>
            <span className="font-medium text-foreground">{founder.superpower}</span>
          </motion.span>
          {/* Hover underline */}
          <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-pink via-lavender to-purple scale-x-0 group-hover/badge:scale-x-100 transition-transform duration-300 origin-left" />
        </div>
      </motion.div>

      {/* Description - Fade + micro upward motion */}
      <motion.p
        className="text-sm md:text-base text-muted-foreground leading-relaxed text-center max-w-[240px]"
        style={{
          opacity: descriptionOpacity,
          y: descriptionY,
        }}
      >
        {founder.description}
      </motion.p>
    </motion.div>
  );
};

// Mobile card variant
const FounderCardMobile = ({ founder }: { founder: typeof founders[0] }) => (
  <div className="flex flex-col items-center w-full max-w-xs">
    {/* Avatar */}
    <div className="relative mb-4 w-24 h-24">
      <div className="absolute -inset-2 bg-gradient-to-br from-pink/30 via-lavender/30 to-purple/30 rounded-full blur-lg opacity-60" />
      <img
        src={founder.avatar}
        alt={founder.name}
        className="relative w-full h-full rounded-full object-cover border-4 border-background shadow-xl"
      />
    </div>

    <h3 className="text-xl font-semibold text-foreground text-center mb-2">
      {founder.name}
    </h3>

    <div className="text-center mb-3">
      <div className="inline-block px-4 py-2 rounded-full bg-secondary/80 relative overflow-hidden group/badge">
        <span className="text-sm">
          <span className="font-normal text-muted-foreground">Superpower: </span>
          <span className="font-medium text-foreground">{founder.superpower}</span>
        </span>
        <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-pink via-lavender to-purple scale-x-0 group-hover/badge:scale-x-100 transition-transform duration-300 origin-left" />
      </div>
    </div>

    <p className="text-sm text-muted-foreground leading-relaxed text-center">
      {founder.description}
    </p>
  </div>
);

// Static card for reduced motion
const FounderCardStatic = ({ founder }: { founder: typeof founders[0] }) => (
  <div className="flex flex-col items-center">
    <div className="relative mb-6 w-28 h-28">
      <div className="absolute -inset-2 bg-gradient-to-br from-pink/30 via-lavender/30 to-purple/30 rounded-full blur-lg opacity-60" />
      <img
        src={founder.avatar}
        alt={founder.name}
        className="relative w-full h-full rounded-full object-cover border-4 border-background shadow-xl"
      />
    </div>

    <h3 className="text-2xl font-semibold text-foreground text-center mb-3">
      {founder.name}
    </h3>

    <div className="text-center mb-4">
      <div className="inline-block px-4 py-2 rounded-full bg-secondary/80 relative overflow-hidden group/badge">
        <span className="text-sm">
          <span className="font-normal text-muted-foreground">Superpower: </span>
          <span className="font-medium text-foreground">{founder.superpower}</span>
        </span>
        <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-pink via-lavender to-purple scale-x-0 group-hover/badge:scale-x-100 transition-transform duration-300 origin-left" />
      </div>
    </div>

    <p className="text-muted-foreground leading-relaxed text-center">
      {founder.description}
    </p>
  </div>
);

export default FoundersSection;
