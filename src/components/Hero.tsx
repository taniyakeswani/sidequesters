import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeroAnimation from "@/components/hero/HeroAnimation";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden gradient-hero-bg">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-lavender/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-[1440px] px-6 lg:px-12 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-5rem)]">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-8 max-w-xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-foreground text-balance">
              From Idea to Impact.<br />
              <span className="gradient-text">One Click.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-md">
              We design, build, and grow your business end-to-end. You focus on what matters—we handle everything else.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">Start Building</Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/work">See Our Work</Link>
              </Button>
            </div>
          </div>

          {/* Right Visual - Animated Story */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-xl">
              <HeroAnimation />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
