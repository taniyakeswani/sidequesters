import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import logoImg from "@/assets/projects/phool-dastaan/phool_dastaan_logo.png";
import businessCardImg from "@/assets/projects/phool-dastaan/phool_dastaan_buisness_card.jpeg";
import brandColorImg from "@/assets/projects/phool-dastaan/brand_color_theme.png";
import letterImg from "@/assets/projects/phool-dastaan/phool_dastaan_letter.png";
import catalogueImg from "@/assets/projects/phool-dastaan/catalogue.png";
import webpage1Img from "@/assets/projects/phool-dastaan/webpage1.png";
import webpage2Img from "@/assets/projects/phool-dastaan/webpage2.png";
import webpage3Img from "@/assets/projects/phool-dastaan/webpage3.png";

interface WorkItem {
  images: string[];
  title: string;
  description: string;
}

const phoolDastaanWork: WorkItem[] = [
  {
    images: [logoImg],
    title: "Logo Design",
    description:
      "A handcrafted logo designed to reflect the poetic and timeless essence of Phool Dastaan.",
  },
  {
    images: [businessCardImg],
    title: "Business Card",
    description:
      "A minimal yet expressive business card aligned with the brand's visual identity.",
  },
  {
    images: [brandColorImg],
    title: "Brand Color Theme",
    description:
      "A thoughtfully developed color palette inspired by florals and storytelling.",
  },
  {
    images: [letterImg],
    title: "Thank You Letter Card",
    description:
      "A heartfelt note card featuring the quote 'Moments don't fade when they're held with care' — designed for personal touches with every order.",
  },
  {
    images: [catalogueImg],
    title: "Catalogue Design",
    description:
      "A visually rich catalogue layout designed to showcase products with clarity and elegance.",
  },
  {
    images: [webpage1Img, webpage2Img, webpage3Img],
    title: "Website Design & Development",
    description:
      "A responsive website translating the brand identity into a seamless digital experience.",
  },
];

// Lightbox Component
const Lightbox = ({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) => {
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((p) => (p + 1) % images.length);
      if (e.key === "ArrowLeft")
        setCurrent((p) => (p - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [images.length, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-3xl font-light hover:text-pink transition-colors"
        >
          ✕
        </button>

        <img
          src={images[current]}
          alt={`Preview ${current + 1}`}
          className="w-full max-h-[80vh] object-contain rounded-xl"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrent((p) => (p - 1 + images.length) % images.length)
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            >
              ‹
            </button>
            <button
              onClick={() => setCurrent((p) => (p + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            >
              ›
            </button>
            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === current ? "bg-pink" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Work = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lightbox, setLightbox] = useState<{
    images: string[];
    index: number;
  } | null>(null);

  useEffect(() => {
    document.title = "Our Work | SideQuesters";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Below is a curated selection of our work. View our portfolio of design, development, and marketing projects."
      );
    }
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="container mx-auto max-w-[1440px]">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 tracking-tight">
              View Our Work
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Below is a curated selection of our work.
            </p>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section className="py-8 pb-24 px-6 lg:px-12">
        <div className="container mx-auto max-w-[1440px]">

          {/* Project Header — no "Phool Dastaan" title, just tags */}
          <div
            className={`text-center mb-12 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-base font-bold text-black mb-3 tracking-widest uppercase">
              Brand Identity · Print Design · Website Development
            </p>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              From initial concept to full digital presence, we built Phool Dastaan from the ground up.
            </p>
          </div>

          {/* Work Grid — 3 columns, uniform card size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {phoolDastaanWork.map((item, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className="relative overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-zoom-in"
                  onClick={() =>
                    setLightbox({ images: item.images, index: 0 })
                  }
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {item.images.length > 1 && (
                    <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                      {item.images.length} pages
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
                      {item.images.length > 1 ? "View all pages" : "View full size"}
                    </span>
                  </div>
                </div>

                <div className="mt-4 px-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Our Work - SideQuesters Portfolio",
            description:
              "Below is a curated selection of our work. View our portfolio of design, development, and marketing projects.",
            publisher: {
              "@type": "Organization",
              name: "SideQuesters",
              url: "https://sidequesters.in",
            },
          }),
        }}
      />
    </div>
  );
};

export default Work;