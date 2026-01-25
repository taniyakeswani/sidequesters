import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Code, TrendingUp } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "IT Services",
    description: "Websites, applications, chatbots, and custom digital solutions built for performance and scale.",
    buttonText: "Explore IT Services",
    href: "#it-services",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Ads, design, SEO, and brand visibility strategies that drive real business growth.",
    buttonText: "Explore Marketing Services",
    href: "#marketing-services",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen gradient-soft-bg">
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
                className="bg-card rounded-2xl p-8 shadow-card hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
              >
                {/* Subtle gradient accent overlay */}
                <div 
                  className={`absolute top-0 right-0 w-48 h-48 opacity-30 blur-3xl pointer-events-none ${
                    index === 0 ? 'bg-pink' : 'bg-lavender'
                  }`}
                />
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${
                    index === 0 
                      ? 'bg-gradient-to-br from-pink to-primary/80' 
                      : 'bg-gradient-to-br from-lavender to-purple'
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
                    className="group-hover:shadow-button transition-shadow"
                  >
                    {service.buttonText}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
