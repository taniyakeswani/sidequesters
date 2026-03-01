import { motion } from "framer-motion";
import type { Founder } from "./founders-data";

type Props = {
  founder: Founder;
  motionSettled: boolean;
  nameDelay: number;
  isCenter?: boolean;
  floatPhase: number;
  disableFloat?: boolean;
};

const EASE_NAME: [number, number, number, number] = [0.4, 0, 0.2, 1];
const EASE_SUPERPOWER: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_DESC: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_FLOAT: [number, number, number, number] = [0.45, 0.05, 0.55, 0.95];

const NAME_DURATION = 0.32;
const SUPERPOWER_DELAY_AFTER_NAME = 0.12;
const SUPERPOWER_DURATION = 0.46;
const DESC_DELAY_AFTER_SUPERPOWER = 0.14;
const DESC_DURATION = 0.56;

export default function FounderCard({
  founder,
  motionSettled,
  nameDelay,
  isCenter,
  floatPhase,
  disableFloat = false,
}: Props) {
  const avatarSize = isCenter ? "w-56 h-56 md:w-64 md:h-64" : "w-64 h-64 md:w-72 md:h-72";
  const cardWidth = isCenter ? "w-[20rem]" : "w-[18rem]";

  const superpowerDelay = nameDelay + NAME_DURATION + SUPERPOWER_DELAY_AFTER_NAME;
  const descriptionDelay = superpowerDelay + SUPERPOWER_DURATION + DESC_DELAY_AFTER_SUPERPOWER;

  const showText = motionSettled && nameDelay < 100;

  return (
    <div className={`flex flex-col items-center ${cardWidth}`}>
      {/* Avatar with continuous floating */}
      <motion.div
        className={`relative ${avatarSize} mb-8`}
        animate={disableFloat ? {} : { y: [-6, 6, -6] }}
        transition={
          disableFloat
            ? {}
            : {
                y: {
                  duration: 3.8,
                  ease: EASE_FLOAT,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: floatPhase * 3.8,
                },
              }
        }
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink/20 via-lavender/20 to-purple/20 blur-xl opacity-70 -z-10" />
        <img
          src={founder.avatar}
          alt={founder.name}
          className="relative z-10 w-full h-full object-contain drop-shadow-lg"
          draggable={false}
        />
      </motion.div>

      {/* Text container */}
      <div className="text-center w-full">
        {/* Name */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={showText ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: nameDelay, duration: NAME_DURATION, ease: EASE_NAME }}
          className="text-xl md:text-2xl font-semibold text-foreground mb-4"
        >
          {founder.name}
        </motion.h3>

        {/* Superpower badge — wide enough for longest text in one line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showText ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: superpowerDelay, duration: 0.1, ease: EASE_SUPERPOWER }}
          className="mb-5 flex justify-center"
        >
          <div className="w-64 px-5 py-3 rounded-full bg-gradient-to-r from-pink/10 via-lavender/15 to-purple/10 border border-pink/20 relative overflow-hidden group/badge shadow-sm hover:shadow-md hover:border-pink/40 transition-all duration-300">
            {/* Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/badge:translate-x-full transition-transform duration-700" />

            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={showText ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
              transition={{ delay: superpowerDelay, duration: SUPERPOWER_DURATION, ease: EASE_SUPERPOWER }}
              className="relative z-10 text-center"
            >
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-0.5">
                Superpower:
              </div>
              <div className="text-sm md:text-base font-bold bg-gradient-to-r from-pink via-lavender to-purple bg-clip-text text-transparent whitespace-nowrap">
                {founder.superpower}
              </div>
            </motion.div>

            {/* Hover underline */}
            <span className="absolute bottom-1.5 left-5 right-5 h-0.5 bg-gradient-to-r from-pink via-lavender to-purple scale-x-0 group-hover/badge:scale-x-100 transition-transform duration-300 origin-left" />
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: descriptionDelay, duration: DESC_DURATION, ease: EASE_DESC }}
          className="text-sm md:text-base text-muted-foreground leading-relaxed px-2"
        >
          {founder.description}
        </motion.p>
      </div>
    </div>
  );
}