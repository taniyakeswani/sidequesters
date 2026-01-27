import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Code, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";

const services = [
  {
    icon: Code,
    title: "IT Services",
    description: "Websites, applications, chatbots, and custom digital solutions built for performance and scale.",
    buttonText: "Explore IT Services",
    href: "/services/it",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Ads, design, SEO, and brand visibility strategies that drive real business growth.",
    buttonText: "Explore Marketing Services",
    href: "/services/marketing",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground showDots={true} blobCount={2} />
      
      <div className="relative z-10">
        <Navbar />
        
        {/* Page Title Section */}
        <section className="pt-32 pb-16 px-6 lg:px-12">
          <div className="container mx-auto max-w-[1440px] text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-6">
              What We Do
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Two focused disciplines that help businesses build and grow digitally.
            </p>
          </div>
        </section>

        {/* Service Cards Section */}
        <section className="pb-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-[1440px]">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="glass-card rounded-2xl p-8 group"
                >
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${
                      index === 0 
                        ? 'bg-gradient-to-br from-[#F6AFC5] to-[#E8C8FF]' 
                        : 'bg-gradient-to-br from-[#E6D9FF] to-[#D4B8FF]'
                    }`}>
                      <service.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-2xl font-semibold text-foreground mb-4">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      {service.description}
                    </p>
                    <Button 
                      variant="hero" 
                      size="lg"
                      className="btn-gradient"
                      asChild
                    >
                      <Link to={service.href}>{service.buttonText}</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
