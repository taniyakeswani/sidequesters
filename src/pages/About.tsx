import { useEffect, useState } from "react";
import { Lightbulb, Rocket, Handshake, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoundersSection from "@/components/FoundersSection";

const services = [
  "Logo Creation",
  "Design Systems",
  "Websites",
  "Apps",
  "SEO",
  "Social Media Growth",
];

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.title = "About Us | SideQuesters - Digital Studio India";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "At SideQuesters, we turn ideas into fully-fledged digital businesses. Logo, design, websites, apps, SEO, and social media growth, all in one place."
      );
    }
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto max-w-[1440px] px-6 lg:px-12">

          {/* Hero Section */}
          <section className="mb-32">
            <div className="max-w-5xl mx-auto text-center">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink/10 border border-pink/20 mb-8 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <Sparkles className="w-4 h-4 text-pink" />
                <span className="text-sm font-medium text-pink">About SideQuesters</span>
              </div>

              <h1
                className={`text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight transition-all duration-700 delay-100 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                We turn ideas into{" "}
                <span className="gradient-text">digital businesses</span>
              </h1>

              <p
                className={`text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed transition-all duration-700 delay-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                At <strong className="text-foreground">SideQuesters</strong>, we turn ideas into fully-fledged digital businesses.
                From logo creation and complete design systems to websites, apps, SEO, and social media growth, everything happens in one place.
              </p>

              <div
                className={`relative inline-block transition-all duration-700 delay-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-pink via-lavender to-purple rounded-2xl blur-xl opacity-30 animate-pulse" />
                  <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl px-8 py-6 shadow-lg">
                    <p className="text-xl md:text-2xl font-semibold">
                      <span className="text-muted-foreground">You focus on the business.</span>
                      <br className="md:hidden" />
                      <span className="relative ml-2">
                        <span className="gradient-text animate-pulse">We take care of the rest.</span>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink via-lavender to-purple animate-[shimmer_2s_ease-in-out_infinite]" />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Founders Section — comes right after hero */}
          <FoundersSection />

          {/* Services Pills — BELOW founders, ABOVE value props */}
          <section className="mt-24 mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8">
                Everything in One Place
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {services.map((service, index) => (
                  <div
                    key={service}
                    className={`group relative transition-all duration-500 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink to-purple rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
                    <div className="relative px-6 py-3 bg-card border border-border/50 rounded-full shadow-sm group-hover:border-transparent transition-all duration-300">
                      <span className="text-sm font-medium text-foreground">
                        {service}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Value Props — at the bottom */}
          <section className="mb-32">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-pink/5 to-pink/10 rounded-3xl p-8 border border-pink/20 hover:border-pink/40 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink to-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">End-to-End Solutions</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    From concept to launch and beyond. We handle design, development, marketing, and growth, all under one roof.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-lavender/5 to-lavender/10 rounded-3xl p-8 border border-lavender/20 hover:border-lavender/40 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-lavender to-purple flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Built for Growth</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Everything we ship is designed to scale with you. No band-aid fixes, just solid foundations for long-term success.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple/5 to-purple/10 rounded-3xl p-8 border border-purple/20 hover:border-purple/40 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple to-magenta flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Handshake className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">True Partnership</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We work with you, not just for you. Transparent communication, fair pricing, and shared goals every step of the way.
                  </p>
                </div>
              </div>
            </div>
          </section>

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
            description:
              "At SideQuesters, we turn ideas into fully-fledged digital businesses. Logo, design, websites, apps, SEO, and social media growth, all in one place.",
            foundingDate: "2024",
            areaServed: "India",
            serviceType: [
              "Logo Design",
              "Design Systems",
              "Web Development",
              "Mobile App Development",
              "SEO",
              "Social Media Marketing",
            ],
            founders: [
              { "@type": "Person", name: "Aastha" },
              { "@type": "Person", name: "Tanya" },
              { "@type": "Person", name: "Aarushi" },
            ],
          }),
        }}
      />

      <style>{`
        @keyframes shimmer {
          0% { transform: scaleX(0); transform-origin: left; }
          50% { transform: scaleX(1); transform-origin: left; }
          50.1% { transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
      `}</style>
    <Footer />
    </div>
  );
};

export default About;