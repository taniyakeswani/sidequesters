import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Globe, 
  Smartphone, 
  Bot, 
  Search, 
  TrendingUp, 
  Mail, 
  Palette, 
  Briefcase,
  Sparkles,
  Users,
  Shield
} from "lucide-react";

interface ServiceItem {
  name: string;
  price: string;
}

interface ServiceCategory {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  items: ServiceItem[];
  gradient: string;
}

const itServices: ServiceCategory[] = [
  {
    icon: Globe,
    title: "Website Design & Development",
    gradient: "from-pink to-primary/80",
    items: [
      { name: "Website UI Design", price: "Starting at ₹6,000" },
      { name: "Landing Page (Design + Dev)", price: "Starting at ₹8,000" },
      { name: "Static Website (Up to 5 Pages)", price: "Starting at ₹12,000" },
      { name: "Business Website (6–8 Pages + basic SEO)", price: "Starting at ₹20,000" },
      { name: "Website Development (Per Page)", price: "Starting at ₹2,000 / page" },
      { name: "Website Redesign", price: "Starting at ₹10,000" },
    ],
  },
  {
    icon: Smartphone,
    title: "Web & App Development",
    gradient: "from-lavender to-purple",
    items: [
      { name: "Web App (Basic MVP)", price: "Starting at ₹50,000" },
      { name: "Advanced Web App", price: "Starting at ₹1,00,000" },
      { name: "Mobile App (Basic)", price: "Starting at ₹70,000" },
      { name: "Mobile App (Advanced)", price: "Starting at ₹1,30,000" },
    ],
  },
  {
    icon: Bot,
    title: "Chatbots & Automation",
    gradient: "from-purple to-magenta",
    items: [
      { name: "Website Chatbot", price: "Starting at ₹8,000" },
      { name: "WhatsApp Chatbot", price: "Starting at ₹12,000" },
      { name: "Advanced Automation", price: "Starting at ₹25,000" },
    ],
  },
];

const marketingServices: ServiceCategory[] = [
  {
    icon: Search,
    title: "SEO",
    gradient: "from-pink to-primary/80",
    items: [
      { name: "SEO Setup", price: "Starting at ₹10,000" },
      { name: "SEO Monthly (Starter)", price: "Starting at ₹12,000 / month" },
      { name: "SEO Monthly (Growth)", price: "Starting at ₹20,000 / month" },
    ],
  },
  {
    icon: TrendingUp,
    title: "Ads & Growth",
    gradient: "from-lavender to-purple",
    items: [
      { name: "Ads Setup (One-time)", price: "Starting at ₹6,000" },
      { name: "Ads Management", price: "Starting at ₹12,000 / month" },
      { name: "Performance Marketing", price: "Starting at ₹25,000 / month" },
    ],
  },
  {
    icon: Mail,
    title: "Cold Mailing & Outreach",
    gradient: "from-purple to-magenta",
    items: [
      { name: "Cold Email Setup", price: "Starting at ₹6,000" },
      { name: "Cold Email Copywriting", price: "Starting at ₹4,000" },
      { name: "Cold Email Campaign", price: "Starting at ₹12,000 / month" },
    ],
  },
];

const designServices: ServiceCategory[] = [
  {
    icon: Palette,
    title: "Marketing & Social Media",
    gradient: "from-pink to-primary/80",
    items: [
      { name: "Poster Design", price: "Starting at ₹800" },
      { name: "Banner Design", price: "Starting at ₹1,200" },
      { name: "Social Media Post", price: "Starting at ₹800" },
      { name: "YouTube Thumbnail", price: "Starting at ₹600" },
      { name: "Ad Creative Design", price: "Starting at ₹1,200" },
    ],
  },
  {
    icon: Briefcase,
    title: "Branding & Business Collateral",
    gradient: "from-lavender to-purple",
    items: [
      { name: "Business Card Design", price: "Starting at ₹1,200" },
      { name: "Letterhead / Invoice", price: "Starting at ₹800" },
      { name: "Brand Kit (Logo, Colors)", price: "Starting at ₹6,000" },
      { name: "Complete Branding Package", price: "Starting at ₹15,000" },
    ],
  },
];

const highlights = [
  { icon: Sparkles, text: "Transparent pricing" },
  { icon: Users, text: "Founder-led execution" },
  { icon: Shield, text: "No long-term lock-ins" },
];

const ServiceCard = ({ category }: { category: ServiceCategory }) => (
  <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-40 h-40 opacity-20 blur-3xl pointer-events-none bg-pink" />
    
    <div className="relative">
      <div className="flex items-center gap-3 mb-5">
        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${category.gradient}`}>
          <category.icon className="w-5 h-5 text-primary-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          {category.title}
        </h3>
      </div>
      
      <div className="space-y-3">
        {category.items.map((item) => (
          <div key={item.name} className="flex justify-between items-start gap-4">
            <span className="text-sm text-muted-foreground">{item.name}</span>
            <span className="text-sm font-medium text-foreground whitespace-nowrap">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Services = () => {
  useEffect(() => {
    document.title = "Services & Pricing | SideQuesters";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "IT development, digital marketing, and design services with transparent pricing. Web apps, mobile apps, SEO, ads, and branding.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page Title Section */}
      <section className="pt-32 pb-12 px-6 lg:px-12">
        <div className="container mx-auto max-w-[1440px] text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-6">
            What We Do
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing for every service. All prices are starting estimates — final cost depends on scope and requirements.
          </p>
        </div>
      </section>

      {/* IT & Development Services */}
      <section className="pb-16 px-6 lg:px-12">
        <div className="container mx-auto max-w-[1440px]">
          <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">
            IT & Development Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {itServices.map((category) => (
              <ServiceCard key={category.title} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Digital Marketing Services */}
      <section className="pb-16 px-6 lg:px-12">
        <div className="container mx-auto max-w-[1440px]">
          <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Digital Marketing Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {marketingServices.map((category) => (
              <ServiceCard key={category.title} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Design Services */}
      <section className="pb-16 px-6 lg:px-12">
        <div className="container mx-auto max-w-[1440px]">
          <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Design Services
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {designServices.map((category) => (
              <ServiceCard key={category.title} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Why SideQuesters + CTA Section */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="container mx-auto max-w-[1440px]">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
            {/* Why SideQuesters */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink" />
                Why clients choose SideQuesters
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

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "SideQuesters",
            url: "https://sidequesters.in",
            description: "Digital studio offering IT development, digital marketing, and design services.",
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "INR",
              offerCount: "30+",
              lowPrice: "600",
              highPrice: "130000",
            },
          }),
        }}
      />
    </div>
  );
};

export default Services;
