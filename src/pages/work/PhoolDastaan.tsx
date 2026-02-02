import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

// Import assets
import logoImage from "@/assets/projects/phool-dastaan/logo.png";
import businessCardImage from "@/assets/projects/phool-dastaan/business-card.png";
import letterImage from "@/assets/projects/phool-dastaan/letter.png";
import catalogueImage from "@/assets/projects/phool-dastaan/catalogue.jpg";
import websiteMockupImage from "@/assets/projects/phool-dastaan/website-mockup.jpg";
import colorThemeImage from "@/assets/projects/phool-dastaan/color-theme.jpg";
import customizationsImage from "@/assets/projects/phool-dastaan/customizations.jpg";

interface WorkItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const workItems: WorkItem[] = [
  {
    id: "logo",
    title: "Logo Design",
    description: "A handcrafted logo designed to reflect the poetic and timeless essence of Phool Dastaan. The mark balances elegance and simplicity, ensuring strong brand recall across print and digital platforms.",
    image: logoImage,
    alt: "Phool Dastaan logo design featuring elegant floral motif with sage green background",
  },
  {
    id: "business-card",
    title: "Business Card",
    description: "A minimal yet expressive business card design aligned with the brand's visual identity. Carefully considered layout and color usage create a refined first impression.",
    image: businessCardImage,
    alt: "Phool Dastaan business cards on cream surface with sage green design and gold floral accents",
  },
  {
    id: "color-theme",
    title: "Brand Color Theme",
    description: "A thoughtfully developed color palette inspired by florals and storytelling. The palette maintains visual harmony across print and digital applications.",
    image: colorThemeImage,
    alt: "Phool Dastaan brand color palette showcasing sage green, cream, and gold tones on elegant stationery",
  },
  {
    id: "catalogue",
    title: "Catalogue Design",
    description: "A visually rich catalogue layout designed to showcase products through clean layouts and storytelling-driven visuals.",
    image: catalogueImage,
    alt: "Phool Dastaan product catalogue spread with floral illustrations and elegant typography",
  },
  {
    id: "website",
    title: "Website Design & Development",
    description: "A responsive website translating the brand identity into a seamless digital experience. Designed for clarity, smooth navigation, and performance across devices.",
    image: websiteMockupImage,
    alt: "Phool Dastaan responsive website design displayed on laptop and mobile devices",
  },
  {
    id: "customizations",
    title: "Customizations",
    description: "Bespoke visual and layout refinements crafted specifically for Phool Dastaan. Custom elements ensure consistency across brand touchpoints while preserving the project's poetic and premium identity.",
    image: customizationsImage,
    alt: "Custom design elements and floral patterns created for Phool Dastaan brand identity",
  },
];

const PhoolDastaan = () => {
  const [selectedImage, setSelectedImage] = useState<WorkItem | null>(null);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    document.title = "Phool Dastaan Brand Project | SideQuesters";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Brand identity, print design, and website development project by SideQuesters.");
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = "Brand identity, print design, and website development project by SideQuesters.";
      document.head.appendChild(meta);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    workItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="container mx-auto max-w-[1440px]">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium text-muted-foreground tracking-wider uppercase mb-4">
              Brand Identity · Print Design · Website Development
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 tracking-tight">
              Phool Dastaan
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              A thoughtfully crafted brand identity and digital presence.
            </p>
          </div>
        </div>
      </section>

      {/* Work Grid */}
      <section className="py-16 px-6 lg:px-12">
        <div className="container mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {workItems.map((item, index) => (
              <div
                key={item.id}
                id={item.id}
                className={`group cursor-pointer transition-all duration-700 ease-out ${
                  isVisible[item.id]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 group-hover:shadow-soft group-hover:-translate-y-2">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="mt-5 px-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-background/95 backdrop-blur-md border-border/50 overflow-hidden">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
          {selectedImage && (
            <div className="flex flex-col">
              <div className="relative w-full max-h-[70vh] overflow-hidden">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.alt}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 lg:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {selectedImage.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Phool Dastaan Brand Project",
            description: "Brand identity, print design, and website development project by SideQuesters.",
            creator: {
              "@type": "Organization",
              name: "SideQuesters",
              url: "https://sidequest.co",
            },
            workExample: workItems.map((item) => ({
              "@type": "CreativeWork",
              name: item.title,
              description: item.description,
            })),
          }),
        }}
      />
    </div>
  );
};

export default PhoolDastaan;
