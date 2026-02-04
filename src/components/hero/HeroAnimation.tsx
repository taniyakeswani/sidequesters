import { motion } from "framer-motion";

const floatingWords = [
  { text: "SEO", top: "8%", left: "15%", delay: 0 },
  { text: "Marketing", top: "15%", right: "10%", delay: 0.3 },
  { text: "Branding", bottom: "20%", left: "8%", delay: 0.6 },
  { text: "Web Design", top: "25%", left: "5%", delay: 0.9 },
  { text: "Apps", bottom: "12%", right: "15%", delay: 1.2 },
  { text: "UX/UI", top: "5%", right: "30%", delay: 0.4 },
  { text: "Analytics", bottom: "30%", right: "5%", delay: 0.7 },
  { text: "Strategy", top: "40%", left: "2%", delay: 1 },
  { text: "Content", bottom: "8%", left: "25%", delay: 0.5 },
  { text: "Ads", top: "12%", left: "35%", delay: 0.8 },
  { text: "Social Media", bottom: "25%", right: "25%", delay: 1.1 },
  { text: "Chatbots", top: "35%", right: "2%", delay: 0.2 },
];

const HeroAnimation = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
      {/* Floating gradient orbs */}
      <motion.div
        className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-pink/30 to-lavender/20 blur-xl"
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-lavender/25 to-purple/20 blur-xl"
        style={{ left: "20%", top: "30%" }}
        animate={{
          y: [15, -15, 15],
          x: [8, -8, 8],
          scale: [1.05, 0.95, 1.05],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      
      <motion.div
        className="absolute w-24 h-24 md:w-36 md:h-36 rounded-full bg-gradient-to-bl from-purple/20 to-magenta/15 blur-xl"
        style={{ right: "15%", bottom: "25%" }}
        animate={{
          y: [-12, 18, -12],
          x: [-6, 12, -6],
          scale: [0.95, 1.08, 0.95],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Floating service words */}
      {floatingWords.map((word, i) => (
        <motion.span
          key={word.text}
          className="absolute text-xs md:text-sm font-medium text-muted-foreground/60 select-none pointer-events-none"
          style={{
            top: word.top,
            left: word.left,
            right: word.right,
            bottom: word.bottom,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            y: [-5, 5, -5],
          }}
          transition={{
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: word.delay },
            y: { duration: 5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: word.delay },
          }}
        >
          {word.text}
        </motion.span>
      ))}

      {/* Central glass card */}
      <motion.div
        className="relative z-10 w-72 md:w-96 p-8 md:p-10 rounded-2xl bg-card/60 backdrop-blur-md border border-border/50 shadow-card"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Decorative corner accents */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-pink/40 rounded-tl-lg" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-purple/40 rounded-br-lg" />
        
        {/* Content */}
        <div className="space-y-6">
          {/* Service pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {["Brand", "Product", "Growth"].map((item, i) => (
              <motion.span
                key={item}
                className="px-4 py-1.5 text-sm font-medium rounded-full bg-gradient-to-r from-pink/15 to-lavender/15 text-foreground border border-pink/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {item}
              </motion.span>
            ))}
          </div>
          
          {/* Animated bars representing services */}
          <div className="space-y-3 pt-2">
            {[
              { color: "from-pink to-pink/60", width: "85%", delay: 0.5 },
              { color: "from-lavender to-lavender/60", width: "70%", delay: 0.65 },
              { color: "from-purple to-purple/60", width: "90%", delay: 0.8 },
            ].map((bar, i) => (
              <motion.div
                key={i}
                className="h-2 rounded-full overflow-hidden bg-muted/30"
              >
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${bar.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: bar.width }}
                  transition={{
                    duration: 1,
                    delay: bar.delay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </motion.div>
            ))}
          </div>
          
          {/* Floating dots */}
          <div className="flex justify-center gap-3 pt-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-br from-pink to-purple"
                animate={{
                  y: [-3, 3, -3],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Subtle glow effect */}
        <motion.div
          className="absolute -inset-px rounded-2xl bg-gradient-to-br from-pink/10 via-transparent to-purple/10 pointer-events-none"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Floating accent shapes */}
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-pink/40"
        style={{ top: "20%", right: "25%" }}
        animate={{
          y: [-8, 8, -8],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-lavender/50"
        style={{ bottom: "30%", left: "20%" }}
        animate={{
          y: [6, -6, 6],
          x: [-4, 4, -4],
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-purple/50"
        style={{ top: "40%", left: "30%" }}
        animate={{
          y: [-5, 5, -5],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
};

export default HeroAnimation;
