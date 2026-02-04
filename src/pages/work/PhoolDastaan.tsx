import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";

// Import assets
import logoImage from "@/assets/projects/phool-dastaan/logo.png";
import businessCardImage from "@/assets/projects/phool-dastaan/business-card.png";
import catalogueImage from "@/assets/projects/phool-dastaan/catalogue.jpg";
import websiteMockupImage from "@/assets/projects/phool-dastaan/website-mockup.jpg";
import colorThemeImage from "@/assets/projects/phool-dastaan/color-theme.jpg";
import letterImage from "@/assets/projects/phool-dastaan/pd-letter-2.png";

interface WorkItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  pdfLink?: string;
}

const workItems: WorkItem[] = [
  {
    id: "logo",
    title: "Logo Design",
    description: "A handcrafted logo designed to reflect the poetic and timeless essence of Phool Dastaan.",
    image: logoImage,
    alt: "Phool Dastaan logo design featuring elegant floral motif with sage green background",
  },
  {
    id: "business-card",
    title: "Business Card",
    description: "A minimal yet expressive business card aligned with the brand's visual identity.",
    image: businessCardImage,
    alt: "Phool Dastaan business cards on cream surface with sage green design and gold floral accents",
  },
  {
    id: "color-theme",
    title: "Brand Color Theme",
    description: "A thoughtfully developed color palette inspired by florals and storytelling.",
    image: colorThemeImage,
    alt: "Phool Dastaan brand color palette showcasing sage green, cream, and gold tones on elegant stationery",
  },
  {
    id: "letter",
    title: "Thank You Letter Card",
    description: "A heartfelt note card featuring the quote 'Moments don't fade when they're held with care' — designed for personal touches with every order.",
    image: letterImage,
    alt: "Phool Dastaan thank you letter card with floral illustrations and handwritten note space",
  },
  {
    id: "catalogue",
    title: "Catalogue Design",
    description: "A visually rich catalogue layout designed to showcase products with clarity and elegance.",
    image: catalogueImage,
    alt: "Phool Dastaan product catalogue spread with floral illustrations and elegant typography",
    pdfLink: "/assets/projects/phool-dastaan/pd-catalogue-2.pdf",
  },
  {
    id: "website",
    title: "Website Design & Development",
    description: "A responsive website translating the brand identity into a seamless digital experience.",
    image: websiteMockupImage,
    alt: "Phool Dastaan responsive website design displayed on laptop and mobile devices",
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
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-background/95 backdrop-blur-md border-border/50 overflow-hidden [&>button]:hidden">
          <VisuallyHidden>
            <DialogTitle>{selectedImage?.title || "Image preview"}</DialogTitle>
            <DialogDescription>{selectedImage?.description || "Project image lightbox"}</DialogDescription>
          </VisuallyHidden>
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/80 hover:bg-background border border-border/50 transition-colors shadow-md"
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
