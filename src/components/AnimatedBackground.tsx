import { useMemo } from "react";

interface AnimatedBackgroundProps {
  className?: string;
  showDots?: boolean;
  blobCount?: number;
}

const AnimatedBackground = ({ 
  className = "", 
  showDots = true,
  blobCount = 3 
}: AnimatedBackgroundProps) => {
  // Generate random dot positions
  const dots = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 9}s`,
      size: Math.random() > 0.5 ? 2 : 1,
    }));
  }, []);

  const blobs = [
    { 
      className: "blob blob-pink blob-animate-1", 
      style: { width: "400px", height: "400px", top: "5%", left: "10%" } 
    },
    { 
      className: "blob blob-lavender blob-animate-2", 
      style: { width: "350px", height: "350px", top: "50%", right: "5%" } 
    },
    { 
      className: "blob blob-pink blob-animate-3", 
      style: { width: "300px", height: "300px", bottom: "10%", left: "30%" } 
    },
  ].slice(0, blobCount);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient-bg" />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay" />
      
      {/* Floating blobs */}
      {blobs.map((blob, index) => (
        <div
          key={index}
          className={blob.className}
          style={blob.style}
        />
      ))}
      
      {/* Dot pattern */}
      {showDots && (
        <div className="dot-pattern">
          {dots.map((dot) => (
            <div
              key={dot.id}
              className="dot"
              style={{
                left: dot.left,
                top: dot.top,
                animationDelay: dot.delay,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimatedBackground;
