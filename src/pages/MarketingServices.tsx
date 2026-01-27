import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Megaphone, Search, Image, Palette, Sparkles, Target, Layers } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";

const services = [
  {
    icon: Megaphone,
    title: "Social Media Ads",
    description: "Performance-driven ad campaigns for Meta, Google, and Instagram.",
    priceRange: "₹15,000 – ₹60,000 / month",
  },
  {
    icon: Search,
    title: "SEO (On-page & Basic Technical)",
    description: "Search optimization to improve rankings and organic visibility.",
    priceRange: "₹12,000 – ₹40,000",
  },
  {
    icon: Image,
    title: "Posters & Banner Design",
    description: "High-quality creatives for digital and print marketing.",
    priceRange: "₹1,000 – ₹5,000 / design",
  },
  {
    icon: Palette,
    title: "Branding & Business Collateral",
    description: "Business cards, brand kits, and visual identity assets.",
    priceRange: "₹3,000 – ₹25,000",
  },
];

const highlights = [
  { icon: Sparkles, text: "Strategy-first execution" },
  { icon: Target, text: "Creative + performance balance" },
  { icon: Layers, text: "Flexible engagement models" },
];

const MarketingServices = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground showDots={true} blobCount={3} />

      <div className="relative z-10">
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
              <span className="text-foreground">Digital Marketing</span>
            </div>

            {/* Title */}
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4">
                Digital Marketing
              </h1>
              <p className="text-lg text-muted-foreground">
                Strategies and creatives that help brands grow, convert, and stay visible.
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
                  className="glass-card rounded-2xl p-8 group"
                >
                  <div className="relative">
                    {/* Icon & Title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${
                          index % 2 === 0
                            ? "bg-gradient-to-br from-[#F6AFC5] to-[#E8C8FF]"
                            : "bg-gradient-to-br from-[#E6D9FF] to-[#D4B8FF]"
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
                    <Button variant="hero" size="default" className="btn-gradient" asChild>
                      <Link to="/contact">Start Project</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Note */}
            <p className="text-center text-sm text-muted-foreground mt-10">
              Final pricing depends on scope, platforms, and campaign requirements.
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
              <div className="glass-card rounded-2xl p-8">
                <div className="relative">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Ready to grow your brand?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Tell us your goals and we'll recommend the right marketing strategy.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="hero" className="btn-gradient" asChild>
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
    </div>
  );
};

export default MarketingServices;
