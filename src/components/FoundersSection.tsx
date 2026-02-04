import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// Powerpuff Girls avatars
import avatarAastha from "@/assets/avatar-aastha.png"; // Blossom
import avatarTanya from "@/assets/avatar-tanya.png";   // Buttercup (center)
import avatarAarushi from "@/assets/avatar-aarushi.png"; // Bubbles

const founders = [
  {
    name: "Aastha",
    superpower: "Clarity over complexity",
    description: "We simplify problems before solving them.",
    avatar: avatarAastha,
  },
  {
    name: "Tanya",
    superpower: "Built for scale",
    description: "Everything we ship is designed to grow with you.",
    avatar: avatarTanya,
  },
  {
    name: "Aarushi",
    superpower: "Partnership mindset",
    description: "We work with clients, not just for them.",
    avatar: avatarAarushi,
  },
];

const FoundersSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Section entry animation (fade + upward motion)
  const sectionOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const sectionY = useTransform(scrollYProgress, [0.05, 0.15], [24, 0]);

  // Heading animations
  const headingOpacity = useTransform(scrollYProgress, [0.12, 0.18], [0, 1]);
  const subheadingOpacity = useTransform(scrollYProgress, [0.15, 0.22], [0, 0.7]);

  // Segregation animation (starts after section entry)
  const segregation = useTransform(scrollYProgress, [0.20, 0.38], [0, 1]);

  // Avatar cluster positions (tight cluster → spread apart with more space)
  const leftAvatarX = useTransform(segregation, [0, 1], [80, -200]);
  const rightAvatarX = useTransform(segregation, [0, 1], [-80, 200]);
  const leftRotate = useTransform(segregation, [0, 1], [-15, 0]);
  const rightRotate = useTransform(segregation, [0, 1], [15, 0]);
  
  // Center avatar stays dominant
  const centerScale = useTransform(segregation, [0, 0.5, 1], [1.15, 1.2, 1]);
  const sideScale = useTransform(segregation, [0, 1], [0.8, 1]);
  
  // Z-index visual (center in front during cluster)
  const centerZ = useTransform(segregation, [0, 0.5], [30, 20]);

  // Content reveal timing (staggered per founder, after segregation)
  const leftReveal = useTransform(scrollYProgress, [0.36, 0.50], [0, 1]);
  const centerReveal = useTransform(scrollYProgress, [0.34, 0.48], [0, 1]);
  const rightReveal = useTransform(scrollYProgress, [0.38, 0.52], [0, 1]);

  // Subtle floating for cluster state
  const floatPhase = useTransform(scrollYProgress, (p) => Math.sin(p * Math.PI * 8) * 3);

  if (prefersReducedMotion) {
    return (
      <section className="py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Meet the Founders
          </h2>
          <p className="text-muted-foreground text-lg">
            The minds building SideQuesters
          </p>
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
    <section ref={sectionRef} className="py-24 min-h-[160vh] relative">
      <motion.div 
        className="sticky top-20 md:top-24"
        style={{ opacity: sectionOpacity, y: sectionY }}
      >
        {/* Heading - Fade in only */}
        <motion.div className="text-center mb-16 md:mb-20">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            style={{ opacity: headingOpacity }}
          >
            Meet the Founders
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg"
            style={{ opacity: subheadingOpacity }}
          >
            The minds building SideQuesters
          </motion.p>
        </motion.div>

        {/* Desktop: Avatar cluster → Founder cards */}
        <div className="hidden md:block relative max-w-6xl mx-auto px-4">
          <div className="flex justify-center items-start gap-0 relative min-h-[400px]">
            {/* Left - Aastha (Blossom) */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                x: leftAvatarX,
                rotate: leftRotate,
                scale: sideScale,
                y: useTransform(segregation, (s) => s < 0.3 ? floatPhase.get() : 0),
                zIndex: 10,
              }}
            >
              <FounderCard
                founder={founders[0]}
                contentReveal={leftReveal}
                segregation={segregation}
              />
            </motion.div>

            {/* Center - Tanya (Buttercup) - Dominant */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                scale: centerScale,
                y: useTransform(segregation, (s) => s < 0.3 ? floatPhase.get() - 2 : 0),
                zIndex: centerZ,
              }}
            >
              <FounderCard
                founder={founders[1]}
                contentReveal={centerReveal}
                segregation={segregation}
                isCenter
              />
            </motion.div>

            {/* Right - Aarushi (Bubbles) */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                x: rightAvatarX,
                rotate: rightRotate,
                scale: sideScale,
                y: useTransform(segregation, (s) => s < 0.3 ? floatPhase.get() + 1 : 0),
                zIndex: 10,
              }}
            >
              <FounderCard
                founder={founders[2]}
                contentReveal={rightReveal}
                segregation={segregation}
              />
            </motion.div>
          </div>
        </div>

        {/* Mobile: Vertical stack with scroll reveals */}
        <div className="md:hidden px-4">
          {/* Cluster preview - Larger mobile avatars */}
          <motion.div
            className="relative flex justify-center items-center h-36 mb-8"
            style={{
              opacity: useTransform(segregation, [0, 0.4], [1, 0]),
              scale: useTransform(segregation, [0, 0.4], [1, 0.8]),
            }}
          >
            <motion.img
              src={avatarAastha}
              alt="Aastha"
              className="w-20 h-20 object-contain absolute"
              style={{ left: "calc(50% - 60px)", rotate: -12, zIndex: 1 }}
            />
            <motion.img
              src={avatarTanya}
              alt="Tanya"
              className="w-24 h-24 object-contain absolute z-10"
              style={{ left: "calc(50% - 48px)" }}
            />
            <motion.img
              src={avatarAarushi}
              alt="Aarushi"
              className="w-20 h-20 object-contain absolute"
              style={{ left: "calc(50% + 16px)", rotate: 12, zIndex: 1 }}
            />
          </motion.div>

          {/* Individual mobile cards */}
          <div className="flex flex-col items-center gap-10">
            {founders.map((founder, index) => {
              const revealStart = 0.32 + index * 0.08;
              const revealEnd = revealStart + 0.12;
              
              return (
                <motion.div
                  key={founder.name}
                  style={{
                    opacity: useTransform(scrollYProgress, [revealStart, revealEnd], [0, 1]),
                    y: useTransform(scrollYProgress, [revealStart, revealEnd], [30, 0]),
                  }}
                >
                  <FounderCardMobile founder={founder} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
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
  const nameOpacity = useTransform(contentReveal, [0, 0.25], [0, 1]);
  const nameScale = useTransform(contentReveal, [0, 0.25], [0.95, 1]);
  
  const superpowerOpacity = useTransform(contentReveal, [0.15, 0.45], [0, 1]);
  const superpowerClip = useTransform(contentReveal, [0.15, 0.45], [0, 100]);
  
  const descriptionOpacity = useTransform(contentReveal, [0.4, 0.85], [0, 1]);
  const descriptionY = useTransform(contentReveal, [0.4, 0.85], [10, 0]);
  
  // Card expands after segregation
  const cardOpacity = useTransform(segregation, [0.6, 1], [0.3, 1]);

  return (
    <motion.div
      className={`flex flex-col items-center ${isCenter ? 'w-80' : 'w-72'}`}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* Avatar - Larger sizes */}
      <motion.div
        className={`relative mb-6 ${isCenter ? 'w-44 h-44 md:w-52 md:h-52' : 'w-36 h-36 md:w-44 md:h-44'}`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div 
          className="absolute -inset-4 bg-gradient-to-br from-pink/20 via-lavender/20 to-purple/20 rounded-full blur-xl"
          style={{ opacity: cardOpacity }}
        />
        <img
          src={founder.avatar}
          alt={founder.name}
          className="relative w-full h-full object-contain drop-shadow-lg"
        />
      </motion.div>

      {/* Content container */}
      <motion.div 
        className="text-center w-full"
        style={{ opacity: cardOpacity }}
      >
        {/* Name - Fade + scale */}
        <motion.h3
          className="text-xl md:text-2xl font-semibold text-foreground mb-3"
          style={{ 
            opacity: nameOpacity,
            scale: nameScale,
          }}
        >
          {founder.name}
        </motion.h3>

        {/* Superpower - Left to right reveal */}
        <motion.div
          className="mb-4 overflow-hidden"
          style={{ opacity: superpowerOpacity }}
        >
          <div className="inline-block px-4 py-2 rounded-full bg-secondary/80 relative overflow-hidden group/badge">
            <motion.div
              className="text-sm"
              style={{ 
                clipPath: useTransform(superpowerClip, (v) => `inset(0 ${100 - v}% 0 0)`)
              }}
            >
              <span className="font-normal text-muted-foreground">Superpower: </span>
              <span className="font-medium text-foreground">{founder.superpower}</span>
            </motion.div>
            {/* Hover underline */}
            <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-pink via-lavender to-purple scale-x-0 group-hover/badge:scale-x-100 transition-transform duration-300 origin-left" />
          </div>
        </motion.div>

        {/* Description - Fade + micro upward */}
        <motion.p
          className="text-sm md:text-base text-muted-foreground leading-relaxed px-2"
          style={{
            opacity: descriptionOpacity,
            y: descriptionY,
          }}
        >
          {founder.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

// Mobile card - Larger avatars
const FounderCardMobile = ({ founder }: { founder: typeof founders[0] }) => (
  <div className="flex flex-col items-center w-full max-w-xs group">
    <div className="relative mb-5 w-32 h-32">
      <div className="absolute -inset-3 bg-gradient-to-br from-pink/20 via-lavender/20 to-purple/20 rounded-full blur-lg opacity-60" />
      <img
        src={founder.avatar}
        alt={founder.name}
        className="relative w-full h-full object-contain drop-shadow-lg"
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

// Static fallback - Larger avatars
const FounderCardStatic = ({ founder }: { founder: typeof founders[0] }) => (
  <div className="flex flex-col items-center">
    <div className="relative mb-6 w-40 h-40">
      <div className="absolute -inset-3 bg-gradient-to-br from-pink/20 via-lavender/20 to-purple/20 rounded-full blur-lg opacity-60" />
      <img
        src={founder.avatar}
        alt={founder.name}
        className="relative w-full h-full object-contain drop-shadow-lg"
      />
    </div>

    <h3 className="text-2xl font-semibold text-foreground text-center mb-3">
      {founder.name}
    </h3>

    <div className="text-center mb-4">
      <div className="inline-block px-4 py-2 rounded-full bg-secondary/80">
        <span className="text-sm">
          <span className="font-normal text-muted-foreground">Superpower: </span>
          <span className="font-medium text-foreground">{founder.superpower}</span>
        </span>
      </div>
    </div>

    <p className="text-muted-foreground leading-relaxed text-center">
      {founder.description}
    </p>
  </div>
);

export default FoundersSection;
