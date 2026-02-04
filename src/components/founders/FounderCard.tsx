import { motion } from "framer-motion";
import type { Founder } from "./founders-data";

type Props = {
  founder: Founder;
  started: boolean;
  /** Delay (seconds) for when the name reveal begins */
  nameDelay: number;
  isCenter?: boolean;
};

const EASE_NAME: [number, number, number, number] = [0.4, 0, 0.2, 1];
const EASE_SUPERPOWER: [number, number, number, number] = [0.25, 0.8, 0.25, 1];
const EASE_DESC: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function FounderCard({ founder, started, nameDelay, isCenter }: Props) {
  const avatarSize = isCenter ? "w-48 h-48 md:w-52 md:h-52" : "w-44 h-44 md:w-48 md:h-48";
  const cardWidth = isCenter ? "w-[20rem]" : "w-[18rem]";

  // Timeline (MANDATORY)
  // Name: starts at nameDelay
  // Superpower: + (name duration 0.3) + 0.1
  // Description: + (superpower duration 0.42) + 0.12
  const superpowerDelay = nameDelay + 0.3 + 0.1;
  const descriptionDelay = superpowerDelay + 0.42 + 0.12;

  return (
    <div className={`flex flex-col items-center ${cardWidth}`}>
      {/* Avatar */}
      <div className={`relative ${avatarSize} mb-6`}>{/* no negative margins */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink/20 via-lavender/20 to-purple/20 blur-xl opacity-70" />
        <img
          src={founder.avatar}
          alt={founder.name}
          className="relative z-10 w-full h-full object-contain drop-shadow-lg"
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* Text (never overlaps avatar: stacked, no absolute positioning) */}
      <div className="text-center w-full">
        <motion.h3
          initial={{ opacity: 0, scale: 0.95 }}
          animate={started ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ delay: nameDelay, duration: 0.3, ease: EASE_NAME }}
          className="text-xl md:text-2xl font-semibold text-foreground mb-3"
        >
          {founder.name}
        </motion.h3>

        <motion.div
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: superpowerDelay, duration: 0.12, ease: EASE_SUPERPOWER }}
          className="mb-4 overflow-hidden"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-secondary/80 relative overflow-hidden group/badge">
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={started ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
              transition={{ delay: superpowerDelay, duration: 0.42, ease: EASE_SUPERPOWER }}
              className="text-sm"
            >
              <span className="font-normal text-muted-foreground">Superpower: </span>
              <span className="font-medium text-foreground">{founder.superpower}</span>
            </motion.div>
            <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-pink via-lavender to-purple scale-x-0 group-hover/badge:scale-x-100 transition-transform duration-300 origin-left" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ delay: descriptionDelay, duration: 0.52, ease: EASE_DESC }}
          className="text-sm md:text-base text-muted-foreground leading-relaxed px-2"
        >
          {founder.description}
        </motion.p>
      </div>
    </div>
  );
}
