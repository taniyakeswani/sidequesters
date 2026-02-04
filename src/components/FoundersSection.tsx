import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { Lightbulb, Rocket, Handshake } from "lucide-react";

const founders = [
  {
    name: "Aastha",
    superpower: "Clarity over complexity",
    description: "We simplify problems before solving them.",
    icon: Lightbulb,
    gradient: "from-pink/20 to-lavender/20",
    iconGradient: "from-pink to-primary/80",
    accentColor: "pink",
  },
  {
    name: "Tanya",
    superpower: "Built for scale",
    description: "Everything we ship is designed to grow with you.",
    icon: Rocket,
    gradient: "from-lavender/20 to-purple/20",
    iconGradient: "from-lavender to-purple",
    accentColor: "lavender",
  },
  {
    name: "Aarushi",
    superpower: "Partnership mindset",
    description: "We work with clients, not just for them.",
    icon: Handshake,
    gradient: "from-purple/20 to-magenta/20",
    iconGradient: "from-purple to-magenta",
    accentColor: "purple",
  },
];

const FoundersSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Animation progress values
  const sectionEntry = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const segregation = useTransform(scrollYProgress, [0.2, 0.45], [0, 1]);

  // Card spread transforms
  const leftCardX = useTransform(segregation, [0, 1], [0, -60]);
  const rightCardX = useTransform(segregation, [0, 1], [0, 60]);
  const centerCardY = useTransform(segregation, [0, 1], [0, 20]);

  // Content reveal timing based on segregation
  const nameReveal = useTransform(segregation, [0.3, 0.5], [0, 1]);
  const superpowerReveal = useTransform(segregation, [0.45, 0.65], [0, 1]);
  const descriptionReveal = useTransform(segregation, [0.6, 0.85], [0, 1]);

  // Pre-compute transforms for cards
  const sectionEntryY = useTransform(sectionEntry, [0, 1], [24, 0]);
  const subheadingOpacity = useTransform(sectionEntry, [0.3, 1], [0, 0.7]);
  const iconScale = useTransform(segregation, [0, 0.3], [0.9, 1]);
  const iconOpacity = useTransform(segregation, [0, 0.2], [0.7, 1]);
  const nameScale = useTransform(nameReveal, [0, 1], [0.95, 1]);
  const superpowerX = useTransform(superpowerReveal, [0, 1], [-100, 100]);
  const descriptionY = useTransform(descriptionReveal, [0, 1], [8, 0]);

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {founders.map((founder) => (
            <FounderCardStatic key={founder.name} founder={founder} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-24 min-h-[120vh] relative">
      <div className="sticky top-24">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          style={{
            opacity: sectionEntry,
            y: sectionEntryY,
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Meet the Founders
          </h2>
          <motion.p
            className="text-muted-foreground text-lg"
            style={{
              opacity: subheadingOpacity,
            }}
          >
            The minds building SideQuesters
          </motion.p>
        </motion.div>

        {/* Founders Grid */}
        <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-6 md:gap-8 max-w-5xl mx-auto px-4">
          {founders.map((founder, index) => {
            const xTransform = index === 0 ? leftCardX : index === 2 ? rightCardX : undefined;
            const yTransform = index === 1 ? centerCardY : undefined;

            return (
              <FounderCard
                key={founder.name}
                founder={founder}
                index={index}
                sectionEntry={sectionEntry}
                xTransform={xTransform}
                yTransform={yTransform}
                nameReveal={nameReveal}
                superpowerReveal={superpowerReveal}
                descriptionReveal={descriptionReveal}
                iconScale={iconScale}
                iconOpacity={iconOpacity}
                nameScale={nameScale}
                superpowerX={superpowerX}
                descriptionY={descriptionY}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface FounderCardProps {
  founder: typeof founders[0];
  index: number;
  sectionEntry: MotionValue<number>;
  xTransform?: MotionValue<number>;
  yTransform?: MotionValue<number>;
  nameReveal: MotionValue<number>;
  superpowerReveal: MotionValue<number>;
  descriptionReveal: MotionValue<number>;
  iconScale: MotionValue<number>;
  iconOpacity: MotionValue<number>;
  nameScale: MotionValue<number>;
  superpowerX: MotionValue<number>;
  descriptionY: MotionValue<number>;
}

const FounderCard = ({
  founder,
  sectionEntry,
  xTransform,
  yTransform,
  nameReveal,
  superpowerReveal,
  descriptionReveal,
  iconScale,
  iconOpacity,
  nameScale,
  superpowerX,
  descriptionY,
}: FounderCardProps) => {
  return (
    <motion.div
      className={`
        relative group w-full md:w-80
        bg-gradient-to-br ${founder.gradient} bg-card 
        rounded-3xl p-8 
        border border-border/30
        transition-shadow duration-300
        hover:shadow-lg hover:-translate-y-1
      `}
      style={{
        opacity: sectionEntry,
        x: xTransform ?? 0,
        y: yTransform ?? 0,
      }}
      whileHover={{
        boxShadow: "0 20px 40px -12px hsla(var(--primary), 0.15)",
      }}
    >
      {/* Abstract Icon Container */}
      <motion.div
        className="flex justify-center mb-6"
        style={{
          scale: iconScale,
          opacity: iconOpacity,
        }}
      >
        <div
          className={`
            w-24 h-24 rounded-2xl 
            bg-gradient-to-br ${founder.iconGradient} 
            flex items-center justify-center 
            transform transition-transform duration-300 
            group-hover:scale-105 group-hover:rotate-3
          `}
        >
          <founder.icon className="w-10 h-10 text-white" />
        </div>
      </motion.div>

      {/* Name Animation */}
      <motion.div
        className="text-center"
        style={{
          opacity: nameReveal,
          scale: nameScale,
        }}
      >
        <h3 className="text-2xl font-semibold text-foreground mb-3">
          {founder.name}
        </h3>
      </motion.div>

      {/* Superpower Animation - Left to right reveal */}
      <motion.div
        className="text-center mb-4 overflow-hidden"
        style={{
          opacity: superpowerReveal,
        }}
      >
        <div className="inline-block px-4 py-2 rounded-full bg-secondary/80 relative overflow-hidden group/badge">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              x: superpowerX,
            }}
          />
          <span className="text-sm">
            <span className="font-normal text-muted-foreground">Superpower: </span>
            <span className="font-medium text-foreground">{founder.superpower}</span>
          </span>
          {/* Hover underline effect */}
          <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-pink via-lavender to-purple scale-x-0 group-hover/badge:scale-x-100 transition-transform duration-300 origin-left" />
        </div>
      </motion.div>

      {/* Description Animation */}
      <motion.p
        className="text-muted-foreground leading-relaxed text-center"
        style={{
          opacity: descriptionReveal,
          y: descriptionY,
        }}
      >
        {founder.description}
      </motion.p>
    </motion.div>
  );
};

// Static card for reduced motion preference
const FounderCardStatic = ({ founder }: { founder: typeof founders[0] }) => (
  <div
    className={`
      relative group
      bg-gradient-to-br ${founder.gradient} bg-card 
      rounded-3xl p-8 
      border border-border/30
      transition-all duration-300
      hover:shadow-lg hover:-translate-y-1
    `}
  >
    <div className="flex justify-center mb-6">
      <div
        className={`
          w-24 h-24 rounded-2xl 
          bg-gradient-to-br ${founder.iconGradient} 
          flex items-center justify-center 
          transform transition-transform duration-300 
          group-hover:scale-105 group-hover:rotate-3
        `}
      >
        <founder.icon className="w-10 h-10 text-white" />
      </div>
    </div>

    <div className="text-center">
      <h3 className="text-2xl font-semibold text-foreground mb-3">
        {founder.name}
      </h3>
    </div>

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
