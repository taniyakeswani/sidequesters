import { Button } from "@/components/ui/button";
import heroAbstract from "@/assets/hero-abstract.png";
import AnimatedBackground from "@/components/AnimatedBackground";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated background with blobs and dots */}
      <AnimatedBackground showDots={true} blobCount={3} />

      <div className="container mx-auto max-w-[1440px] px-6 lg:px-12 pt-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-5rem)]">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-8 max-w-xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-foreground text-balance">
              Your digital<br />
              <span className="text-foreground">unfair advantage</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-md">
              We help businesses build technology and grow visibility through smart IT solutions and digital marketing.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button variant="hero" size="xl" className="btn-gradient">
                View Our Work
              </Button>
              <Button variant="heroOutline" size="xl">
                Get in Touch
              </Button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-xl">
              {/* Main abstract image */}
              <img
                src={heroAbstract}
                alt="Abstract 3D shapes representing digital innovation"
                className="w-full h-auto animate-float drop-shadow-2xl"
              />
              
              {/* Subtle glow behind image */}
              <div className="absolute inset-0 -z-10 blur-3xl opacity-30 gradient-bg rounded-full scale-75" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
