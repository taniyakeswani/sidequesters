import { useEffect } from "react";
import { Lightbulb, Rocket, Handshake, Code, TrendingUp, Palette, Users } from "lucide-react";
import Navbar from "@/components/Navbar";

const founders = [
  {
    name: "Aastha",
    superpower: "Clarity over complexity",
    description: "We simplify problems before solving them.",
    icon: Lightbulb,
    gradient: "from-pink/20 to-lavender/20",
    iconGradient: "from-pink to-primary/80",
  },
  {
    name: "Tanya",
    superpower: "Built for scale",
    description: "Everything we ship is designed to grow with you.",
    icon: Rocket,
    gradient: "from-lavender/20 to-purple/20",
    iconGradient: "from-lavender to-purple",
  },
  {
    name: "Aarushi",
    superpower: "Partnership mindset",
    description: "We work with clients, not just for them.",
    icon: Handshake,
    gradient: "from-purple/20 to-magenta/20",
    iconGradient: "from-purple to-magenta",
  },
];

const capabilities = [
  { icon: Code, label: "Development" },
  { icon: TrendingUp, label: "Marketing" },
  { icon: Palette, label: "Design" },
  { icon: Users, label: "Strategy" },
];

const About = () => {
  useEffect(() => {
    document.title = "About Us | SideQuesters - Digital Studio India";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "SideQuesters is a founder-led digital studio in India specializing in web development, mobile apps, SEO, and digital marketing. Meet our team.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Main Content */}
      <main className="pt-32 pb-24">
        <div className="container mx-auto max-w-[1440px] px-6 lg:px-12">
          {/* Page Title Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three minds. One mission. Building digital unfair advantages.
            </p>
          </div>

          {/* Who We Are - New Editorial Layout */}
          <div className="max-w-6xl mx-auto mb-24">
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
              {/* Left Column - Title & Capabilities */}
              <div className="lg:col-span-2 lg:sticky lg:top-32">
                <div className="space-y-8">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-pink/10 text-pink text-sm font-medium mb-4">
                      Our Story
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                      Who We Are
                    </h2>
                  </div>
                  
                  {/* Capability Pills */}
                  <div className="flex flex-wrap gap-3">
                    {capabilities.map((cap) => (
                      <div 
                        key={cap.label}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/50 shadow-sm"
                      >
                        <cap.icon className="w-4 h-4 text-pink" />
                        <span className="text-sm font-medium text-foreground">{cap.label}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Decorative Element */}
                  <div className="hidden lg:block">
                    <div className="w-24 h-1 bg-gradient-to-r from-pink via-lavender to-purple rounded-full" />
                  </div>
                </div>
              </div>
              
              {/* Right Column - Content */}
              <div className="lg:col-span-3">
                <div className="space-y-6">
                  {/* Main Card */}
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink/20 via-lavender/20 to-purple/20 rounded-3xl blur-xl opacity-50" />
                    <div className="relative bg-card rounded-2xl p-8 border border-border/30 shadow-card">
                      <p className="text-lg text-foreground leading-relaxed mb-6">
                        <span className="text-3xl font-bold text-pink leading-none">"</span>
                        At <strong>SideQuesters</strong>, we turn ideas into fully-fledged digital businesses. From logo creation and complete design systems to websites, apps, SEO, and social media growth—everything happens in one place. You focus on the business. We take care of the rest.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        From custom <span className="text-foreground font-medium">website development</span> and{" "}
                        <span className="text-foreground font-medium">mobile app creation</span> to strategic{" "}
                        <span className="text-foreground font-medium">SEO optimization</span> and high-performance{" "}
                        <span className="text-foreground font-medium">digital marketing campaigns</span>, 
                        we combine technical expertise with creative strategy to deliver measurable results.
                      </p>
                    </div>
                  </div>
                  
                  {/* Secondary Cards - Two Column */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-lavender/10 to-purple/10 rounded-2xl p-6 border border-border/30">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lavender to-purple flex items-center justify-center mb-4">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Your Extended Team</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Unlike traditional agencies, we operate as an extension of your team — offering transparent pricing and direct access to the people building your product.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-pink/10 to-primary/10 rounded-2xl p-6 border border-border/30">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink to-primary flex items-center justify-center mb-4">
                        <Rocket className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Our Approach</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Understand deeply, execute precisely, and iterate constantly. Great digital products are cultivated through partnership and focus.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Founders Cards */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-foreground">
              Meet the Founders
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {founders.map((founder, index) => (
              <div
                key={founder.name}
                className={`bg-gradient-to-br ${founder.gradient} bg-card rounded-3xl p-8 shadow-card hover:shadow-lg transition-all duration-300 border border-border/30 group`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Abstract Icon */}
                <div className="flex justify-center mb-6">
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${founder.iconGradient} flex items-center justify-center transform transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3`}>
                    <founder.icon className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Name */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    {founder.name}
                  </h3>
                  
                  {/* Superpower Badge */}
                  <div className="inline-block px-4 py-2 rounded-full bg-secondary/80 mb-4">
                    <span className="text-sm font-medium text-foreground">
                      Superpower: {founder.superpower}
                    </span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {founder.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "SideQuesters",
            url: "https://sidequesters.in",
            description: "Founder-led digital studio in India specializing in web development, mobile apps, SEO, and digital marketing.",
            foundingDate: "2024",
            areaServed: "India",
            serviceType: ["Web Development", "Mobile App Development", "SEO", "Digital Marketing", "Branding"],
            founders: founders.map((founder) => ({
              "@type": "Person",
              name: founder.name,
            })),
          }),
        }}
      />
    </div>
  );
};

export default About;
