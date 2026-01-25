import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Globe, Smartphone, Bot, LayoutDashboard, Sparkles, Users, Shield } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description: "Custom, responsive websites built for performance and scale.",
    priceRange: "₹15,000 – ₹80,000",
  },
  {
    icon: LayoutDashboard,
    title: "Web App Development",
    description: "Dynamic, scalable web applications tailored to business workflows.",
    priceRange: "₹60,000 – ₹2,00,000+",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Cross-platform mobile apps for startups and growing businesses.",
    priceRange: "₹80,000 – ₹3,00,000+",
  },
  {
    icon: Bot,
    title: "Chatbots & Automation",
    description: "WhatsApp and website chatbots to automate communication and support.",
    priceRange: "₹10,000 – ₹50,000",
  },
];

const highlights = [
  { icon: Sparkles, text: "Transparent pricing" },
  { icon: Users, text: "Founder-led execution" },
  { icon: Shield, text: "No long-term lock-ins" },
];

const ITServices = () => {
  return (
    <div className="min-h-screen gradient-soft-bg">
      <Navbar />

      {/* Page Intro Section */}
      <section className="pt-32 pb-12 px-6 lg:px-12">
        <div className="container mx-auto max-w-[1440px]">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/services" className="hover:text-foreground transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-foreground">IT Services</span>
          </div>

          {/* Title */}
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4">
              IT Services
            </h1>
            <p className="text-lg text-muted-foreground">
              Scalable digital solutions built for real business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services & Pricing Grid */}
      <section className="pb-12 px-6 lg:px-12">
        <div className="container mx-auto max-w-[1440px]">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="bg-card rounded-2xl p-8 shadow-card hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
              >
                {/* Decorative gradient */}
                <div
                  className={`absolute top-0 right-0 w-40 h-40 opacity-30 blur-3xl pointer-events-none ${
                    index % 2 === 0 ? "bg-pink" : "bg-lavender"
                  }`}
                />

                <div className="relative">
                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${
                        index % 2 === 0
                          ? "bg-gradient-to-br from-pink to-primary/80"
                          : "bg-gradient-to-br from-lavender to-purple"
                      }`}
                    >
                      <service.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-1">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <span className="text-foreground font-medium">
                      {service.priceRange}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <Button variant="hero" size="default" asChild>
                    <Link to="/contact">Start Project</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Note */}
          <p className="text-center text-sm text-muted-foreground mt-10">
            Final pricing depends on project scope and requirements.
          </p>
        </div>
      </section>

      {/* Why SideQuest + CTA Section */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="container mx-auto max-w-[1440px]">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
            {/* Why SideQuest */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink" />
                Why clients choose SideQuest
              </h3>
              <div className="space-y-3">
                {highlights.map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-pink/20 flex items-center justify-center">
                      <item.icon className="w-3.5 h-3.5 text-pink" />
                    </div>
                    <span className="text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-card rounded-2xl p-8 shadow-card relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 opacity-20 blur-3xl pointer-events-none bg-lavender" />
              <div className="relative">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Not sure what you need?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Tell us about your business and we'll suggest the right solution.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" asChild>
                    <Link to="/contact">Get a Free Consultation</Link>
                  </Button>
                  <Button variant="heroOutline" asChild>
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ITServices;
