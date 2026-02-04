import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import catalogueImage from "@/assets/projects/phool-dastaan/catalogue.jpg";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: "phool-dastaan",
    title: "Phool Dastaan",
    description: "Brand identity, print design, and website development.",
    image: catalogueImage,
    href: "/work/phool-dastaan",
    tags: ["Branding", "Print Design", "Web Development"],
  },
];

const Work = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.title = "Our Work | SideQuesters";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "End-to-end brand and digital execution. View our portfolio of design, development, and marketing projects.");
    }
    
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="container mx-auto max-w-[1440px]">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 tracking-tight">
              View Our Work
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              End-to-end brand and digital execution.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-6 lg:px-12">
        <div className="container mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Link
                key={project.id}
                to={project.href}
                className={`group block transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={`${project.title} project preview`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="mt-5 px-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Our Work - SideQuesters Portfolio",
            description: "End-to-end brand and digital execution. View our portfolio of design, development, and marketing projects.",
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
