import { useEffect } from "react";
import { Lightbulb, Rocket, Handshake } from "lucide-react";
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

const About = () => {
  useEffect(() => {
    document.title = "About Us | SideQuesters";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Three minds. One mission. Building digital unfair advantages. Meet the founders of SideQuesters.");
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

          {/* Founders Cards */}
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
            description: "Digital studio building digital unfair advantages through IT solutions and digital marketing.",
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
