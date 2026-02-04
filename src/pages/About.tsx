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
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three minds. One mission. Building digital unfair advantages.
            </p>
          </div>

          {/* SEO Paragraph Section */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-pink/10 via-lavender/10 to-purple/10 blur-3xl -z-10" />
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Who We Are
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong className="text-foreground">SideQuesters</strong> is a founder-led digital studio based in India, 
                specializing in end-to-end digital solutions that help businesses compete and win in the modern marketplace. 
                From custom <strong className="text-foreground">website development</strong> and <strong className="text-foreground">mobile app creation</strong> to 
                strategic <strong className="text-foreground">SEO optimization</strong> and high-performance <strong className="text-foreground">digital marketing campaigns</strong>, 
                we combine technical expertise with creative strategy to deliver measurable results.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Unlike traditional agencies, we operate as an extension of your team — offering transparent pricing, 
                flexible engagement models, and direct access to the people building your product. Whether you're a startup 
                looking to establish your digital presence or an established brand seeking to scale, we bring the same 
                level of dedication and craftsmanship to every project.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our approach is simple: understand deeply, execute precisely, and iterate constantly. We believe that 
                great digital products aren't just built — they're cultivated through partnership, feedback, and a 
                relentless focus on what actually moves the needle for your business.
              </p>
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
